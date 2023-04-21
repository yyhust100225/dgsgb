<template>
  <div>
    <div class="table-operations">
      <a-form layout="inline">
        <a-form-item>
          <a-input v-model:value="queryParams.name" :allowClear="true" placeholder="角色名称" />
        </a-form-item>
        <a-form-item>
          <a-button @click="tableSearchHandle">查询</a-button>
        </a-form-item>
      </a-form>
      <div class="table-buttons">
        <a-button @click="addHandle">新增角色</a-button>
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
        <template v-if="column.dataIndex === 'operation'">
          <div v-if="record.id !== 1" class="editable-row-operations">
            <a @click="editHandle(record)">编辑</a>
            <a-divider type="vertical" />
            <a-popconfirm v-if="dataSource.length" title="确认删除这条数据吗?" @confirm="deleteHandle(record.id)">
              <a>删除</a>
            </a-popconfirm>
          </div>
          <div v-else class="editable-row-operations">
            <a disabled="disabled">编辑</a>
            <a-divider type="vertical" />
            <a disabled="disabled">删除</a>
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
import { getRoleList, addRole, editRole, deleteRole } from '@/apis/role';
import AddOrUpdateView from './AddOrUpdateView.vue';
import { message } from 'ant-design-vue';
import { getRoleListParams, RoleFormParams } from '@/type/role/FormState'

export default defineComponent({
  components: {
    AddOrUpdateView
  },
  methods: {
    asyncTableData() {
      this.loading = true;
      getRoleList(this.queryParams).then(resp => {
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
      deleteRole(id).then(() => {
        message.success("删除角色成功");
        this.asyncTableData();
      });
    },
    submitHandle(form: RoleFormParams) { 
      // 新增
      if (form.role_id === 0) {
        addRole(form).then(() => {
          message.success("新增角色成功");
          this.visible = false;
          this.model = {};
          this.asyncTableData();
        });
      }
      // 编辑
      else { 
        editRole(form).then(() => {
          message.success("编辑角色成功");
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
      } as getRoleListParams,
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
        title: '备注',
        dataIndex: 'remark',
        width: 150,
        ellipsis: true,
      },
      {
        align: 'center',
        title: '权限',
        dataIndex: 'privileges_str',
        width: 200,
        ellipsis: true
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