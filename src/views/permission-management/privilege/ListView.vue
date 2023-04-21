<template>
  <div>
    <div class="table-operations">
      <a-form layout="inline">
        <a-form-item>
          <a-input v-model:value="queryParams.name" :allowClear="true" placeholder="权限名称" />
        </a-form-item>
        <a-form-item>
          <a-input v-model:value="queryParams.code" :allowClear="true" placeholder="权限代码" />
        </a-form-item>
        <a-form-item>
          <a-button @click="tableSearchHandle">查询</a-button>
        </a-form-item>
      </a-form>
      <div class="table-buttons">
        <a-button @click="addHandle">新增权限</a-button>
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
          <a-tag v-if="record.status === 3" color="red">关闭</a-tag>
          <a-tag v-if="record.status === 2" color="blue">权限验证</a-tag>
          <a-tag v-if="record.status === 1" color="green">开放</a-tag>
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
import { getPrivilegeList, addPrivilege, editPrivilege, deletePrivilege } from '@/apis/privilege';
import { PrivilegeFormParams } from '@/type/privilege/FormState'
import AddOrUpdateView from './AddOrUpdateView.vue';
import { message } from 'ant-design-vue';

export default defineComponent({
  components: {
    AddOrUpdateView
  },
  methods: {
    asyncTableData() {
      this.loading = true;
      getPrivilegeList(this.queryParams).then(resp => {
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
      deletePrivilege(id).then(() => {
        message.success("删除权限成功");
        this.asyncTableData();
      });
    },
    submitHandle(form: PrivilegeFormParams) { 
      // 新增
      if (form.privilege_id === 0) {
        addPrivilege(form).then(() => {
          message.success("新增权限成功");
          this.visible = false;
          this.model = {};
          this.asyncTableData();
        });
      }
      // 编辑
      else { 
        editPrivilege(form).then(() => {
          message.success("编辑权限成功");
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
        code: "",
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
        width: 150,
      },
      {
        align: 'center',
        title: '权限代码',
        dataIndex: 'code',
        width: 150,
      },
      {
        align: 'center',
        title: '描述',
        dataIndex: 'description',
        width: 200,
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