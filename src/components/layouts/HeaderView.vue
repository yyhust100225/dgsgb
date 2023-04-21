<template>
  <a-row type="flex">
    <a-col :flex="5">
      <div class="flod">
        <menu-unfold-outlined v-if="collapsed" class="trigger" @click="menuFlod()" />
        <menu-fold-outlined v-else class="trigger" @click="menuFlod()" />
      </div>
    </a-col>
    <a-col :flex="5">
      <div class="header-nav">
        <a-avatar :src="avatar" size="large" class="header-avatar" />

        <a-dropdown>
          <a class="ant-dropdown-link" @click.prevent>
            <span style="padding-right: 5px">{{ username }}</span>
          </a>
          <template #overlay>
            <a-menu style="padding: 10px">
              <a-menu-item style="margin-bottom: 5px" key="userinfo-setting">
                <setting-outlined />
                个人设置
              </a-menu-item>
              <a-menu-item style="margin-bottom: 5px" key="prefenerces-setting">
                <aim-outlined />
                偏好设置
              </a-menu-item>
              <a-menu-divider style="margin-bottom: 5px" />
              <a-menu-item key="logout" @click="logout">
                <export-outlined />
                退出登陆
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </a-col>
  </a-row>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { MenuUnfoldOutlined, MenuFoldOutlined, SettingOutlined, AimOutlined, ExportOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { logout } from '@/apis/auth';
import { goLoginPage } from '@/common/functions';

export default defineComponent({
  components: {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    SettingOutlined,
    AimOutlined,
    ExportOutlined
  },
  setup() {
    const current = ref<string[]>(['mail']);
    let administrator = null;
    let json = localStorage.getItem('administrator');
    if(json == null) {
      goLoginPage();
      return {
        current,
        collapsed: ref<boolean>(false),
        username: '',
        avatar: ''
      };
    }
    else {
      administrator = JSON.parse(json);
      return {
        current,
        collapsed: ref<boolean>(false),
        username: administrator.nickname,
        avatar: administrator.avatar
      };
    }
  },
  methods: {
    menuFlod() {
      this.collapsed = !this.collapsed;
      this.$emit('flod', this.collapsed);
    },
    logout() { 
      message.info("正在退出登陆...", 1, () => { 
        logout().then(() => {
          localStorage.setItem('accessToken', '');
          message.success("退出登陆成功", 0.8, () => {
            goLoginPage();
          });
        });
      });
    }
  }
});
</script>

<style scoped>
.flod {
  width: 64px;
}

.header-nav {
  float: right;
  padding-right: 5px;
}

.header-avatar {
  margin-right: 10px;
}
</style>
