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
      <a-form-item label="权限名称" name="name" >
        <a-input v-model:value="form.name" />
      </a-form-item>

      <a-form-item label="权限代码" name="code">
        <a-input v-model:value="form.code" />
      </a-form-item>
      
      <a-form-item label="权限状态" name="status" has-feedback>
        <a-select v-model:value="form.status" placeholder="请选择权限状态">
          <a-select-option value="3">关闭</a-select-option>
          <a-select-option value="2">权限验证</a-select-option>
          <a-select-option value="1">开放</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="权限说明" name="description" >
        <a-textarea v-model:value="form.description" />
      </a-form-item>

    </a-form>
  </a-modal>
</template>

<script lang="ts">

import { defineComponent, ref } from 'vue';
import { FormInstance, message } from 'ant-design-vue';
import { PrivilegeFormParams } from '@/type/privilege/FormState'

export default defineComponent({
  methods: {
    okHandle(form: PrivilegeFormParams) {      
      const values = this.formRef?.validateFields(['name', 'code', 'status']);
      values?.then(() => {
        this.$emit('submit', form)
      }).catch(e => {
        message.error(e.errorFields[0].errors[0])
      });      
    },
  },
  data() { 
    return {
      modelTitle: "新增权限",
      form: {
        privilege_id: 0,
        name: "",
        code: "",
        description: "",
        status: undefined
      } as PrivilegeFormParams
    };
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
        this.modelTitle = "新增权限";
        this.form = {
          privilege_id: 0,
          name: "",
          code: "",
          description: "",
          status: undefined,
        }
      }
      // 编辑
      else { 
        this.modelTitle = "编辑权限";
        this.form = {
          privilege_id: mdl.id,
          name: mdl.name,
          code: mdl.code,
          description: mdl.description,
          status: mdl.status + ''
        }
      }
    });
  },
  setup() {

    const formRef = ref<FormInstance>();

    const rules = {
      name: [{ required: true, message: '请输入权限名称' }],
      code: [{ required: true, message: '请输入权限代码' }],
      status: [{ required: true, message: '请选择权限状态' }]
    }

    return {
      rules,
      formRef
    };
  },
});  
</script>

<style scoped>

</style>