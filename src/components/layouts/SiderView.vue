<template>
  <a-menu
    class="scroll"
    :open-keys="openKeys"
    v-model:selectedKeys="selectedKeys"
    mode="inline"
    theme="dark"
    @click="(item: any) => { menuClick(item) }"
    @openChange="onOpenChange"
  >

    <template v-for="router in staticRouters">
      <template v-if="router.menuShow">        
        <a-sub-menu :key="router.path">
          <template #icon>
            <component :is="router.icon" />
          </template>
          <template #title>{{ router.name }}</template>
            <a-menu-item :class="selectItem(router.path, subRouter.path)" v-for="subRouter in router.children" :key="router.path + '/' + subRouter.path">
              {{ subRouter.name }}
            </a-menu-item>
        </a-sub-menu>
      </template>
    </template>

  </a-menu>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue"
import router from "@/router"
import staticRouters from "@/store/static-routers";
import { sliceRootPath } from "@/common/functions";

export default defineComponent({
  setup() {

    const currRoute = localStorage.getItem('currRoute') === null ? '/app/homepage' : localStorage.getItem('currRoute') as string;
    
    const state = reactive({
      rootSubmenuKeys: ['/app', '/permission_management', '/content'],
      selectedKeys: [],
      openKeys: [sliceRootPath(currRoute)],
      selectedClassPath: currRoute
    });

    const selectItem = (rootPath: string, subPath: string) => {
      return (rootPath + '/' + subPath) === state.selectedClassPath ? "ant-menu-item-selected" : '';
    }

    const menuClick = (item: { key: string, keyPath: Array<string>, item: object }) => {
      state.selectedClassPath = item.key;
      router.push(item.key)
    };

    const onOpenChange = (openKeys: string[]) => {
      const latestOpenKey = openKeys.find(key => {
        return state.openKeys.indexOf(key) === -1
      });
      if (state.rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
        state.openKeys = openKeys;
      } else {
        state.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    };

    return {
      ...toRefs(state),
      menuClick,
      onOpenChange,
      selectItem,
      staticRouters: staticRouters.routes,
      PieChartOutlined: 'PieChartOutlined'
    };
  },
});

</script>

<style scoped>
.scroll {
  height: calc(100vh - 64px);
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: auto;
}

/* 定义滚动条样式 */
::-webkit-scrollbar {
  width: 5px;
  background-color: #041527;
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 0 #072e97;
  border-radius: 10px;
  background-color: #041527;
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 0 rgba(240, 240, 240, 0.5);
  background-color: rgba(240, 240, 240, 0.5);
}
</style>
