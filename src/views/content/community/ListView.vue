<template>
  <div>
    <div class="table-operations">
      <a-form layout="inline">
        <a-form-item>
          <a-input v-model:value="queryParams.name" :allowClear="true" placeholder="社区名称" />
        </a-form-item>
        <a-form-item>
          <a-button @click="tableSearchHandle">查询</a-button>
        </a-form-item>
      </a-form>
      <div class="table-buttons">
        <a-button @click="addHandle">新增社区</a-button>
      </div>
    </div>

    <a-table 
      :columns="tableColumns" 
      :data-source="dataSource" 
      :loading="loading"
      :pagination="pagination" 
      @change="pageChangeHandle"
    >
      <template #bodyCell="{ record, column }">

        <template v-if="column.dataIndex === 'status'">
          <a-tag v-if="record.status === 0" color="red">关闭</a-tag>
          <a-tag v-if="record.status === 1" color="green">开放</a-tag>
        </template>

        <template v-if="column.dataIndex === 'theme_color'">
          <span :style="{color: record.theme_color}">{{ record.theme_color }}</span>
        </template>

        <template v-if="column.dataIndex === 'icon'">
          <a-image :width="25" :height="25" :src="record.icon"/>
        </template>

        <template v-if="column.dataIndex === 'operation'">
          <div class="editable-row-operations">
            <a @click="editHandle(record)">编辑</a>
            <a-divider type="vertical" />
            <a-popconfirm v-if="dataSource.length" title="确认删除这条数据吗?" @confirm="deleteHandle(record.id)">
              <a>删除</a>
            </a-popconfirm>
          </div>
        </template>
      </template>

    </a-table>

    <add-or-update-view 
      :visible="visible"
      v-model:model="model"
      @submit="submitHandle"
      @close="closeHandle"
    />
  </div>

</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { getCommunityList, addCommunity, editCommunity, deleteCommunity } from '@/apis/community';
import { CommunityFormParams } from '@/type/community/FormState'
import AddOrUpdateView from './AddOrUpdateView.vue';
import { message } from 'ant-design-vue';

export default defineComponent({
  components: {
    AddOrUpdateView
  },
  methods: {
    asyncTableData() {
      this.loading = true;
      getCommunityList(this.queryParams).then(resp => {
        this.dataSource = resp.data.list;
        this.pagination.pageSize = resp.data.page_size
        this.pagination.total = resp.data.total_count
        this.pagination.current = resp.data.curr_page
        this.loading = false;
      });
    },
    pageChangeHandle(page: { current: number, pageSize: number }) {
      this.queryParams.page = page.current;
      this.queryParams.page_size = page.pageSize;
      this.asyncTableData();
    },
    tableSearchHandle() { 
      this.queryParams.page = 1;
      this.asyncTableData();
    },
    addHandle() { 
      this.model = {};
      this.visible = true;
    },
    editHandle(record: object) {
      this.model = { ...record };
      this.visible = true;
    },
    deleteHandle(id: number) {
      deleteCommunity(id).then(() => {
        message.success("删除社区成功");
        this.asyncTableData();
      });
    },
    submitHandle(form: CommunityFormParams) {
      // 新增
      if (form.community_id === 0) {
        addCommunity(form).then(() => {
          message.success("新增社区成功");
          this.visible = false;
          this.model = {};
          this.asyncTableData();
        });
      }
      // 编辑
      else { 
        editCommunity(form).then(() => {
          message.success("编辑社区成功");
          this.visible = false;
          this.model = {};
          this.asyncTableData();
        });
      }
    },
    closeHandle() {
      this.visible = false;
      this.model = {};
    }
  },
  mounted() {
    this.asyncTableData();
  },
  data() {
    return {
      dataSource: [],
      queryParams: {
        name: "",
        page: 1,
        page_size: 10
      },
      loading: false,
      pagination: {
        position: ['bottomRight'],
        defaultPageSize: 10,
        pageSize: 10,
        total: 0,
        current: 1,
        showSizeChanger: true,
        pageSizeOptions: ['2', '10', '50']
      },
      visible: false,
      model: {}
    }
  },
  setup() {
    const tableColumns = [
      {
        align: 'center',
        title: 'ID',
        dataIndex: 'id',
        width: 40
      },
      {
        align: 'center',
        title: '名称',
        dataIndex: 'name',
        width: 100,
      },
      {
        align: 'center',
        title: 'ICON',
        dataIndex: 'icon',
        width: 50,
      },
      {
        align: 'center',
        title: '描述',
        dataIndex: 'description',
        width: 250,
        ellipsis: true
      },
      {
        align: 'center',
        title: '状态',
        dataIndex: 'status',
        width: 50,
      },
      {
        align: 'center',
        title: '主题颜色',
        dataIndex: 'theme_color',
        width: 60,
      },
      {
        align: 'center',
        title: '创建时间',
        dataIndex: 'created_at',
        width: 100,
      },
      {
        align: 'center',
        title: '操作',
        width: 80,
        dataIndex: 'operation',
      }
    ];

    return {
      tableColumns
    };
  }
});
</script>

<style scoped>
.table-buttons {
  margin: 15px 0;
}
</style>