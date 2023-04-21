<template>
  <div id="box">
    <a-form 
      :model="formState" 
      :label-col="labelCol" 
      :wrapper-col="wrapperCol"
    >

      <a-form-item label="用户名">
        <a-input v-model:value="formState.username" />
      </a-form-item>

      <a-form-item label="密码">
        <a-input v-model:value="formState.password" />
      </a-form-item>

      <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmit">登陆</a-button>
      </a-form-item>

    </a-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, UnwrapRef } from 'vue';
import { login } from '@/apis/auth';
import { goHomePage } from '@/common/functions';

interface FormState {
  username: string;
  password: string;
}
export default defineComponent({
  setup() {
    const formState: UnwrapRef<FormState> = reactive({
      username: '',
      password: '',
    });
    const onSubmit = () => {
      login(formState).then(resp => {
        localStorage.setItem('administrator', JSON.stringify(resp.data.user));
        localStorage.setItem("accessToken", resp.data.token);
        goHomePage();
      });
    };
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 16 },
      formState,
      onSubmit,
    };
  },
});
</script>

<style scoped>
  #box {
    padding: 20%;
  }
</style>

