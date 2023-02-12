import DashboardView from "@/pages/DashboardView.vue";
import HomeView from "@/pages/HomeView.vue";
import AccountView from "@/pages/account/AccountView.vue";
import AuthenticateView from "@/pages/account/AuthenticateView.vue";
import ActivitiesView from "@/pages/activities/ActivitiesView.vue";
import ManageView from "@/pages/manage/ManageView.vue";
import NewsView from "@/pages/news/NewsView.vue";
import { useUsersStore } from "@/stores/users.js";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),

	routes: [
		{
			path: "/",
			name: "Home",
			component: HomeView,
		},
		{
			path: "/news",
			name: "News",
			component: NewsView,
		},
		{
			path: "/news/:id",
			name: "NewsDetails",
			component: () => import("@/pages/news/NewsDetailView.vue"),
		},
		{
			path: "/news/create",
			name: "NewsCreate",
			component: () => import("@/pages/news/NewsCreateView.vue"),
		},
		{
			path: "/activities",
			name: "Activities",
			component: ActivitiesView,
		},
		{
			path: "/activities/create",
			name: "ActivitiesCreate",
			component: () => import("@/pages/activities/ActivitiesCreateView.vue"),
		},
		{
			path: "/activities/:id",
			name: "ActivitiesDetails",
			component: () => import("@/pages/activities/ActivitiesDetailView.vue"),
		},
		{
			path: "/dashboard",
			name: "Dashboard",
			component: DashboardView,
			beforeEnter(to, from, next) {
				if (useUsersStore().isUserLogged()) next();
				else next({ name: "Authenticate" });
			},
		},
		{
			path: "/manage",
			name: "Manage",
			component: ManageView,
			beforeEnter(to, from, next) {
				if (useUsersStore().isUserLogged()) {
					if (useUsersStore().getUserLogged().role === "admin") next();
					else next({ name: "Account" });
				} else next({ name: "Authenticate" });
			},
		},
		{
			path: "/manage/admin",
			name: "AdminMenu",
			component: () => import("@/pages/manage/AdminMenuView.vue"),
			beforeEnter(to, from, next) {
				if (useUsersStore().isUserLogged()) {
					if (useUsersStore().getUserLogged().role === "admin") next();
					else next({ name: "NotFound" });
				} else next({ name: "Authenticate" });
			},
		},
		{
			path: "/account/:id",
			name: "Account",
			component: AccountView,
		},
		{
			path: "/authenticate",
			name: "Authenticate",
			component: AuthenticateView,
			beforeEnter(to, from, next) {
				if (useUsersStore().isUserLogged()) next({ name: "Account" });
				else next();
			},
		},
		{
			path: "/:pathMatch(.*)*",
			name: "NotFound",
			component: () => import("@/pages/NotFoundView.vue"),
		},
	],
});

export default router;
