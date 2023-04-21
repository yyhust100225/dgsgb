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
      <a-form-item label="内容分类名称" name="name" >
        <a-input v-model:value="this.form.name" />
      </a-form-item>

      <a-form-item label="内容分类简称" name="simple_name" >
        <a-input v-model:value="this.form.simple_name" />
      </a-form-item>

      <a-form-item label="内容分类简介" name="description">
        <a-textarea v-model:value="form.description" />
      </a-form-item>
      
      <a-form-item label="内容分类状态" name="status" has-feedback>
        <a-select v-model:value="form.status" placeholder="请选择内容分类状态">
          <a-select-option value="1">开放</a-select-option>
          <a-select-option value="0">关闭</a-select-option>
        </a-select>
      </a-form-item>

    </a-form>
  </a-modal>
</template>

<script lang="ts">

import {defineComponent, reactive, ref, UnwrapRef} from 'vue';
import { FormInstance, message } from 'ant-design-vue';
import { CategoryFormParams } from '@/type/category/FormState'

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
        this.form.category_id = 0;
        this.modelTitle = "新增内容分类";
        this.form.name = '';
        this.form.simple_name = '';
        this.form.description = '';
        this.form.status = undefined;
      }
      // 编辑
      else {
        this.modelTitle = "编辑内容分类";
        this.form.category_id = mdl.id;
        this.form.name = mdl.name;
        this.form.simple_name = mdl.simple_name;
        this.form.description = mdl.description;
        this.form.status = mdl.status + '';
      }
    });
  },
  setup(props,{emit}) {
    const modelTitle = ref<string>('新增内容分类');
    const form:UnwrapRef<CategoryFormParams> = reactive({
      category_id: 0,
      name: "",
      simple_name: "",
      description: "",
      status: undefined
    });

    const okHandle = (form: CategoryFormParams) => {
      const values = formRef.value?.validateFields(['name', 'status', 'simple_name']);
      values?.then(() => {
        emit('submit', form)
      }).catch(e => {
        message.error(e.errorFields[0].errors[0])
      });
    }

    const formRef = ref<FormInstance>();

    const rules = {
      name: [{ required: true, message: '请输入内容分类名称' }],
      simple_name: [{ required: true, message: '请输入内容分类简称' }],
      status: [{ required: true, message: '请选择内容分类状态' }]
    }

    return {
      modelTitle,
      form,
      rules,
      formRef,
      okHandle,
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