<template>
  <div>
    <div class="table-operations">
      <a-form layout="inline">
        <a-form-item>
          <a-input v-model:value="queryParams.username" :allowClear="true" placeholder="用户名" />
        </a-form-item>
        <a-form-item>
          <a-button @click="tableSearchHandle">查询</a-button>
        </a-form-item>
      </a-form>
      <div class="table-buttons">
        <a-button @click="addHandle">新增账户</a-button>
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
          <a-tag v-if="record.status == 0" color="red">CLOSE</a-tag>
          <a-tag v-if="record.status == 1" color="green">OPEN</a-tag>
        </template>

        <template v-if="column.dataIndex === 'avatar'">
          <a-avatar size="small" :src="record.avatar" />
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
import { getAdministratorList, addAdministrator, editAdministrator, deleteAdministrator } from '@/apis/administrator';
import { AdministratorFormParams, AdministratorListParams } from '@/type/administrator/FormState'
import AddOrUpdateView from './AddOrUpdateView.vue';
import { message } from 'ant-design-vue';

export default defineComponent({
  components: {
    AddOrUpdateView
  },
  methods: {
    asyncTableData() {
      this.loading = true;
      getAdministratorList(this.queryParams).then(resp => {
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
      deleteAdministrator(id).then(() => {
        message.success("删除账户成功");
        this.asyncTableData();
      });
    },
    submitHandle(form: AdministratorFormParams) { 
      // 新增
      if (form.administrator_id === 0) {
        addAdministrator(form).then(() => {
          message.success("新增账户成功");
          this.visible = false;
          this.model = {};
          this.asyncTableData();
        });
      }
      // 编辑
      else { 
        editAdministrator(form).then(() => {
          message.success("编辑账户成功");
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
        username: "",
        page: 1,
        page_size: 10
      } as AdministratorListParams,
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
        title: '用户名',
        dataIndex: 'username',
        width: 150,
      },
      {
        align: 'center',
        title: '昵称',
        dataIndex: 'nickname',
        width: 150,
      },
      {
        align: 'center',
        title: '邮箱',
        dataIndex: 'email',
        width: 200,
      },
      {
        align: 'center',
        title: '头像',
        dataIndex: 'avatar',
        width: 50,
      },
      {
        align: 'center',
        title: '状态',
        dataIndex: 'status',
        width: 50,
      },
      {
        align: 'center',
        title: '创建时间',
        dataIndex: 'created_at',
        width: 150,
      },
      {
        align: 'center',
        title: '操作',
        width: 120,
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