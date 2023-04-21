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
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 14 }"
    >
      <a-form-item label="角色名称" name="name" >
        <a-input v-model:value="form.name" />
      </a-form-item>
      
      <a-form-item label="角色备注" name="remark" >
        <a-input v-model:value="form.remark" />
      </a-form-item>
      
      <a-form-item label="角色权限" name="privileges" >
        <a-transfer 
          v-model:target-keys="form.privileges" 
          v-model:selected-keys="selectedKeys" 
          :data-source="privileges"
          :titles="['权限', '已选择']" 
          :render="(item: any) => item.title"
        />
      </a-form-item>

    </a-form>
  </a-modal>
</template>

<script lang="ts">

import type { Rule } from 'ant-design-vue/es/form';
import { defineComponent, ref } from 'vue';
import { getAllPrivileges } from '@/apis/privilege';
import { FormInstance, message } from 'ant-design-vue';
import { RoleFormParams } from '@/type/role/FormState'

interface privilegeOptions { 
  key: string,
  title: string,
  disabled: boolean
}

export default defineComponent({
  methods: {
    okHandle(form: RoleFormParams) {
      const values = this.formRef?.validateFields(['name', 'privileges']);
      values?.then(() => {
        this.$emit('submit', form)
      }).catch(e => {
        message.error(e.errorFields[0].errors[0])
      });      
    },
  },
  data() { 
    return {
      modelTitle: "新增角色",
      form: {
        role_id: 0,
        name: "",
        remark: "",
        privileges: [] as string[]
      } as RoleFormParams,
      privileges: [] as privilegeOptions[],
      targetKeys: [] as number[],
      selectedKeys: [] as number[]
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
    getAllPrivileges().then(resp => {
      resp.data.forEach((v: {id: number, name: string}) => {
        this.privileges.push({
          key: v.id + "",
          title: v.name,
          disabled: false
        });
      });
    });
    this.$watch('model', (mdl) => {
      // 新增
      if (typeof mdl.id === 'undefined') {
        this.modelTitle = "新增角色";
        this.form = {
          role_id: 0,
          name: "",
          remark: "",
          privileges: []
        }
      }
      // 编辑
      else { 
        this.modelTitle = "编辑角色";
        this.form = {
          role_id: mdl.id,
          name: mdl.name,
          remark: mdl.remark,
          privileges: []
        }
        mdl.privileges.forEach((v: number) => { 
          this.form.privileges.push(v + "")
        })
      }
    });
  },
  setup() {

    const formRef = ref<FormInstance>();

    let validatePrivileges = async (_rule: Rule, value: string[]) => {
      if(value.length === 0) {
        return Promise.reject("请至少选择一项角色权限");
      } else
        return Promise.resolve();
    };

    const rules = {
      name: [{ required: true, message: '请输入角色名称' }],
      privileges: [{ validator: validatePrivileges }],
    }

    return {
      rules,
      formRef,
      validatePrivileges
    };
  },
});  
</script>

<style scoped>

</style>