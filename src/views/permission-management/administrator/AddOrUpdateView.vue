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
      <a-form-item label="用户名" name="username" >
        <a-input v-model:value="form.username" />
      </a-form-item>

      <a-form-item label="用户昵称" name="nickname">
        <a-input v-model:value="form.nickname" />
      </a-form-item>

      <a-form-item label="邮箱" name="email">
        <a-input v-model:value="form.email" />
      </a-form-item>
        
      <a-form-item label="手机号" name="phone_number">
        <a-input v-model:value="form.phone_number" />
      </a-form-item>

      <a-form-item label="头像" name="avatar">
        <a-input v-model:value="form.avatar" />
      </a-form-item>

      <a-form-item label="账户状态" name="status" has-feedback>
        <a-select v-model:value="form.status" placeholder="请选择账户状态">
          <a-select-option value="0">停用</a-select-option>
          <a-select-option value="1">开启</a-select-option>
        </a-select>
      </a-form-item>
      
      <a-form-item label="账户角色" name="role_id" >
        <a-select v-model:value="form.role" placeholder="请选择账户角色">
          <a-select-option v-for="role in roles" :key="role.id" :value="role.id">{{ role.name }}</a-select-option>
        </a-select>
      </a-form-item>

    </a-form>
  </a-modal>
</template>

<script lang="ts">

import { defineComponent, ref } from 'vue';
import { FormInstance, message } from 'ant-design-vue';
import { AdministratorFormParams, RoleOptions } from '@/type/administrator/FormState';
import { getAllRoles } from '@/apis/role';


export default defineComponent({
  methods: {
    okHandle(form: AdministratorFormParams) {      
      const values = this.formRef?.validateFields(['username', 'nickname', 'role', 'status']);
      values?.then(() => {
        this.$emit('submit', form)
      }).catch(e => {
        message.error(e.errorFields[0].errors[0])
      });      
    },
  },
  data() { 
    return {
      modelTitle: "新增账户",
      roles: [] as RoleOptions[],
      form: {
        administrator_id: 0,
        username: '',
        nickname: '',
        email: '',
        phone_number: '',
        avatar: '',
        status: undefined,
        role: undefined
      } as AdministratorFormParams,
    }
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
    getAllRoles().then(resp => {
      resp.data.forEach((v: { id: number, name: string }) => {
        this.roles.push({
          id: v.id,
          name: v.name
        });
      });
    });

    this.$watch('model', (mdl) => {
      // 新增
      if (typeof mdl.id === 'undefined') {
        this.modelTitle = "新增账户";
        this.form = {
          administrator_id: 0,
          username: '',
          nickname: '',
          email: '',
          phone_number: '',
          avatar: '',
          status: undefined,
          role: undefined
        }
      }
      // 编辑
      else { 
        this.modelTitle = "编辑账户";
        this.form = {
          administrator_id: mdl.id,
          username: mdl.username,
          nickname: mdl.nickname,
          email: mdl.email,
          phone_number: mdl.phone_number,
          avatar: mdl.avatar,
          status: mdl.status + '',
          role: mdl.role_id,
        }
      }
    });
  },
  setup() {

    const formRef = ref<FormInstance>();

    const rules = {
      username: [{ required: true, message: '请输入用户名' }],
      nickname: [{ required: true, message: '请输入账户昵称' }],
      status: [{ required: true, message: '请选择账户状态' }],
      role: [{ required: true, message: '请选择账户角色' }],
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