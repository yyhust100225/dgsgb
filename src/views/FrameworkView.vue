<!--
 * @Description:
 * @Author:GI
 * @Date:2022-12-14 09:35:58
 * @LastEditors:GI
 * @LastEditTime:2022-12-14 09:58:04
-->
<template>
	<a-layout>
		<!-- 侧边导航栏 -->
		<a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
			<div class="logo" />
			<sider-view></sider-view>
		</a-layout-sider>
		<a-layout>
			<!-- 顶部导航栏 -->
			<a-layout-header style="background: #fff; padding: 0">
				<header-view @flod="(collapsed) => { menuFlod(collapsed) }"></header-view>
			</a-layout-header>
			<!-- 内容栏 -->
			<a-breadcrumb style="margin: 16px 0 0 16px">
				<a-breadcrumb-item>{{ rootBreadcrumb }}</a-breadcrumb-item>
				<a-breadcrumb-item>{{ middleBreadcrumb }}</a-breadcrumb-item>
				<a-breadcrumb-item v-if="!topBreadcrumbDisabled">{{ topBreadcrumb }}</a-breadcrumb-item>
			</a-breadcrumb>
			<a-layout-content :style="{ margin: '16px 16px', padding: '16px', background: '#fff'}">
				<main-view></main-view>
			</a-layout-content>
		</a-layout>
	</a-layout>
</template>
<script lang="ts">
import {
	
} from '@ant-design/icons-vue';
import { defineComponent, watch, ref } from 'vue';
import HeaderView from '@/components/layouts/HeaderView.vue';
import SiderView from '@/components/layouts/SiderView.vue';
import MainView from '@/components/layouts/MainView.vue';
import router from '@/router';
import { goHomePage } from '@/common/functions';

export default defineComponent({
	components: {
		SiderView,
		HeaderView,
		MainView
	},
	data() { 
		return {
			rootBreadcrumb: "后台管理" as string,
			middleBreadcrumb: "" as string|undefined,
			topBreadcrumb: "" as string | undefined,
			topBreadcrumbDisabled: false as boolean
		}
	},
	mounted() { 
		watch(() => router.currentRoute.value, (currentRoute) => {
			if (currentRoute.path != '/' && currentRoute.matched.length != 2)
				goHomePage();
			if (currentRoute.matched.length == 1) {
				this.middleBreadcrumb = currentRoute.matched[0].name?.toString();
				this.topBreadcrumbDisabled = true;
			} else if (currentRoute.matched.length == 2) {
				this.middleBreadcrumb = currentRoute.matched[0].name?.toString();
				this.topBreadcrumb = currentRoute.matched[1].name?.toString();
				this.topBreadcrumbDisabled = false;
			} else {
				this.middleBreadcrumb = "undefined";
				this.topBreadcrumbDisabled = true;
			}
		}, { immediate: true })
	},
	setup() {
		return {
			selectedKeys: ref<string[]>(['1']),
			collapsed: ref<boolean>(false),
		};
	},
	methods: {
		menuFlod(collapsed: boolean) {
			this.collapsed = collapsed;
		},
	},
});
</script>
<style>
.trigger {
	font-size: 18px;
	line-height: 64px;
	padding: 0 24px;
	cursor: pointer;
	transition: color 0.3s;
}

.trigger:hover {
	color: #1890ff;
}

.logo {
	height: 32px;
	background: rgba(255, 255, 255, 0.3);
	margin: 16px;
}

.site-layout .site-layout-background {
	background: #fff;
}

.ant-layout {
	height: 100vh;
	overflow: hidden;
}
.ant-layout-content {
	overflow-y: auto;
}
</style>
