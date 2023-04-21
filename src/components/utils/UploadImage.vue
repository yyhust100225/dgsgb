<template>
  <a-upload
    v-model:file-list="fileList"
    name="image"
    list-type="picture-card"
    class="avatar-uploader"
    :show-upload-list="false"
    :action="uploadUrl"
    :data="{'Authorization': accessToken, 'from': 'backend'}"
    :before-upload="beforeUpload"
    @change="handleChange"
  >
    <img width="100" height="100" v-if="imageUrl" :src="imageUrl" alt="image" />
    <div v-else>
      <loading-outlined v-if="loading"></loading-outlined>
      <plus-outlined v-else></plus-outlined>
      <div class="ant-upload-text">Upload</div>
    </div>
  </a-upload>
</template>

<script lang="ts">
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue';
import {FileInfo, FileItem} from "@/type/upload/FileState";
import {getBase64, goLoginPage} from "@/common/functions";
import {message} from "ant-design-vue";
import {defineComponent, ref} from "vue";

export default defineComponent({
  name: "UploadImage",
  components: {
    PlusOutlined,
    LoadingOutlined
  },
  props: {
    preview: {
      type: String,
      required: false
    }
  },
  created() {
    if(typeof this.preview !== 'undefined')
      this.imageUrl = this.preview;
    this.$watch('preview', (preview) => {
      this.imageUrl = preview;
    })
  },
  setup(props, {emit}) {
    const fileList = ref([]);
    const loading = ref<boolean>(false);
    const imageUrl = ref<string>('');
    const uploadUrl = ref<string>(process.env.VUE_APP_BASE_COMMON_URL).value + 'upload/image';

    const accessToken = ref<string|null>(localStorage.getItem("accessToken"));
    if(accessToken.value === null) {
      message.error("鉴权失败, 请重新登录", 2, ()=>{
        goLoginPage();
        return;
      })
    }

    const handleChange = (info: FileInfo) => {
      if (info.file.status === 'uploading') {
        loading.value = true;
        return;
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (base64Url: string) => {
          imageUrl.value = base64Url;
          loading.value = false;
        });
        console.log('imageUrl', imageUrl);
        emit('uploadDown', info);
      }
      if (info.file.status === 'error') {
        loading.value = false;
        message.error('upload error');
      }
    };

    const beforeUpload = (file: FileItem) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        message.error('You can only upload JPG file!');
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
      }
      return isJpgOrPng && isLt2M;
    };

    return {
      uploadUrl,
      accessToken,
      fileList,
      loading,
      imageUrl,
      handleChange,
      beforeUpload,
    };
  }
});
</script>

<style scoped>

</style>