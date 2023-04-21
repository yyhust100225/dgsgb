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
      <a-form-item label="社区名称" name="name" >
        <a-input v-model:value="this.form.name" />
      </a-form-item>

      <a-form-item label="社区简介" name="description">
        <a-textarea v-model:value="form.description" />
      </a-form-item>

     <a-form-item label="社区图标" name="icon">
       <upload-image v-model:preview="preview" @uploadDown="uploadDownHandle" />
     </a-form-item>

      <a-form-item label="主题颜色" name="theme_color">
        <color-picker v-model:pureColor="form.theme_color" format="hex6" shape="circle" useType="pure" />
      </a-form-item>
      
      <a-form-item label="社区状态" name="status" has-feedback>
        <a-select v-model:value="form.status" placeholder="请选择社区状态">
          <a-select-option value="1">开放</a-select-option>
          <a-select-option value="0">关闭</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="社区说明" name="standard" >
        <a-textarea v-model:value="form.standard" />
      </a-form-item>

    </a-form>
  </a-modal>
</template>

<script lang="ts">

import {defineComponent, reactive, ref, UnwrapRef} from 'vue';
import { FormInstance, message } from 'ant-design-vue';
import { CommunityFormParams } from '@/type/community/FormState'
import { FileInfo } from "@/type/upload/FileState";

import { ColorPicker } from "vue3-colorpicker";
import "vue3-colorpicker/style.css";

import UploadImage from "@/components/utils/UploadImage.vue";

export default defineComponent({
  components: {
    ColorPicker,
    UploadImage
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
        this.form.community_id = 0;
        this.modelTitle = "新增社区";
        this.form.name = '';
        this.form.description = '';
        this.form.icon = '';
        this.form.theme_color = '#e83cce';
        this.form.standard = '';
        this.form.status = undefined;
        this.preview = '';
      }
      // 编辑
      else {
        this.modelTitle = "编辑社区";
        this.form.community_id = mdl.id;
        this.form.name = mdl.name;
        this.form.description = mdl.description;
        this.form.icon = mdl.icon;
        this.form.theme_color = mdl.theme_color;
        this.form.standard = mdl.standard;
        this.form.status = mdl.status + '';
        this.preview = mdl.icon;
      }
    });
  },
  setup(props,{emit}) {
    const preview = ref<string>('');
    const modelTitle = ref<string>('新增社区');
    const form:UnwrapRef<CommunityFormParams> = reactive({
      community_id: 0,
      name: "",
      description: "",
      icon: "",
      theme_color: "",
      standard: "",
      status: undefined
    });

    const okHandle = (form: CommunityFormParams) => {
      const values = formRef.value?.validateFields(['name', 'status', 'icon']);
      values?.then(() => {
        emit('submit', form)
      }).catch(e => {
        message.error(e.errorFields[0].errors[0])
      });
    }

    const uploadDownHandle = (info: FileInfo) => {
      form.icon = info.file.response?.data.image_url;
    }

    const formRef = ref<FormInstance>();

    const rules = {
      name: [{ required: true, message: '请输入社区名称' }],
      icon: [{ required: true, message: '请上传社区icon' }],
      status: [{ required: true, message: '请选择社区状态' }]
    }

    return {
      preview,
      modelTitle,
      form,
      rules,
      formRef,
      okHandle,
      uploadDownHandle
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