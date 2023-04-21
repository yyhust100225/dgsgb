<template>
  <a-modal 
    :visible="visible"
    :closable="false"
    width="1000px"
    cancelText="取消"
    okText="确认"
    :title="modelTitle"
    @ok="okHandle(form)"
    @cancel="() => { $emit('close') }"
    :bodyStyle="{ paddingBottom: 0 }"
  >
    <a-form 
      class="form" 
      ref="formRef"
      :model="form"
      :rules="rules"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 18 }"
    >
      <a-form-item label="错误信息代码" name="name" >
        <a-input v-model:value="this.form.errorCode" placeholder="请输入错误信息代码" />
      </a-form-item>

      <a-form-item label="警告内容" name="alarmContent">
        <a-textarea v-model:value="form.alarmContent" placeholder="请输入警告内容" />
      </a-form-item>

      <a-form-item label="警告内容(中文)" name="alarmContent_CH">
          <a-textarea v-model:value="form.alarmContent_CH" placeholder="请输入警告内容(中文)" />
      </a-form-item>
      
      <a-form-item label="错误类型" name="errorType" has-feedback>
        <a-select v-model:value="form.errorType" placeholder="错误类型">
          <a-select-option value="1">技术职</a-select-option>
          <a-select-option value="2">机台端</a-select-option>
          <a-select-option value="3">作业员</a-select-option>
          <a-select-option value="4">换片</a-select-option>
          <a-select-option value="5">无效code</a-select-option>
        </a-select>
      </a-form-item>

    </a-form>
  </a-modal>
</template>

<script lang="ts">

import {defineComponent, reactive, ref, UnwrapRef} from 'vue';
import { FormInstance, message } from 'ant-design-vue';
import { ErrorMessageFormParams } from '@/type/error-message-service/FormState'

import "vue3-colorpicker/style.css";

export default defineComponent({
  components: {

  },
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    model: {
      type: Object,
      required: true
    }
  },
  created() {
    this.$watch('model', (mdl) => {
      // 新增
      if (typeof mdl.id === 'undefined') {
        this.modelTitle = "新增错误信息";
        this.form.id = 0;
        this.form.errorCode = '';
        this.form.alarmContent = '';
        this.form.alarmContent_CH = '';
        this.form.errorType = "1";
      }
      // 编辑
      else {
        this.modelTitle = "编辑错误信息";
        this.form.id = mdl.id;
        this.form.errorCode = mdl.errorCode;
        this.form.alarmContent = mdl.alarmContent;
        this.form.alarmContent_CH = mdl.alarmContent_CH;
        this.form.errorType = mdl.errorType;
      }
    });
  },
  setup(props,{emit}) {
    const preview = ref<string>('');
    const modelTitle = ref<string>('新增错误信息');
    const form:UnwrapRef<ErrorMessageFormParams> = reactive({
      id: 0,
      errorCode: "",
      alarmContent: "",
      alarmContent_CH: "",
      errorType: "0"
    });

    const okHandle = (form: ErrorMessageFormParams) => {
      const values = formRef.value?.validateFields(['errorCode']);
      values?.then(() => {
        emit('submit', form)
      }).catch(e => {
        message.error(e.errorFields[0].errors[0])
      });
    }

    const formRef = ref<FormInstance>();

    const rules = {
      errorCode: [{ required: true, message: '异常代码' }],
    }

    return {
      preview,
      modelTitle,
      form,
      rules,
      formRef,
      okHandle
    };
  },
});  
</script>

<style scoped>
  .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }
</style>