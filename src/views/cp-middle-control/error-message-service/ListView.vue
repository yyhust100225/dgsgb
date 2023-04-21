<template>
  <div>
    <div class="table-operations">
      <a-form layout="inline">
        <a-form-item>
          <a-input v-model:value="queryParams.errorCode" :allowClear="true" placeholder="错误代码" />
        </a-form-item>
        <a-form-item>
          <a-button @click="tableSearchHandle">查询</a-button>
        </a-form-item>
      </a-form>
      <div class="table-buttons">
        <a-button @click="addHandle">新增</a-button>
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

        <template v-if="column.dataIndex === 'errorType'">
          <a-tag v-if="record.status === 1">技术职</a-tag>
          <a-tag v-if="record.status === 2">机台端</a-tag>
          <a-tag v-if="record.status === 3">作业员</a-tag>
          <a-tag v-if="record.status === 4">换片</a-tag>
          <a-tag v-if="record.status === 5">无效code</a-tag>
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
import { getErrorMessageList, getErrorMessageById, getErrorMessageByErrorCode, addErrorMessage, editErrorMessage, deleteErrorMessage } from '@/apis/error-message-service';
import { ErrorMessageFormParams } from '@/type/error-message-service/FormState'
import AddOrUpdateView from './AddOrUpdateView.vue';
import { message } from 'ant-design-vue';

export default defineComponent({
  components: {
    AddOrUpdateView
  },
  methods: {
    asyncTableData() {
      this.loading = true;
      getErrorMessageList(this.queryParams).then(resp => {
        console.log("查询结果:", resp);
        this.dataSource = resp.data.list;
        this.pagination.pageSize = this.queryParams.MaxResultCount
        this.pagination.total = resp.data.totalCount
        this.pagination.current = this.queryParams.SkipCount
        this.loading = false;
      });
    },
    pageChangeHandle(page: { current: number, pageSize: number }) {
      this.queryParams.SkipCount = page.current;
      this.queryParams.MaxResultCount = page.pageSize;
      this.asyncTableData();
    },
    tableSearchHandle() {
      this.queryParams.SkipCount = 1;
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
    deleteHandle(id: string) {
      deleteErrorMessage(id).then(() => {
        message.success("删除错误消息成功");
        this.asyncTableData();
      });
    },
    submitHandle(form: ErrorMessageFormParams) {
      // 新增
      if (form.id === 0) {
        addErrorMessage(form).then(() => {
          message.success("新增错误消息成功");
          this.visible = false;
          this.model = {};
          this.asyncTableData();
        });
      }
      // 编辑
      else {
        editErrorMessage(form).then(() => {
          message.success("编辑错误消息成功");
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
        id: "",
        errorCode: "",
        Sorting: "0",
        SkipCount: 0,
        MaxResultCount: 10,
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
        width: 100
      },
      {
        align: 'center',
        title: '错误编码',
        dataIndex: 'errorCode',
        width: 200,
      },
      {
        align: 'center',
        title: '警告内容',
        dataIndex: 'alarmContent',
        width: 200,
      },
      {
        align: 'center',
        title: '警告内容(中文)',
        dataIndex: 'alarmContent_CH',
        width: 200,
        ellipsis: true
      },
      {
        align: 'center',
        title: '状态',
        dataIndex: 'errorType',
        width: 50,
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