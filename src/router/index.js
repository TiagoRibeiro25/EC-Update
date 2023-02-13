import HomeView from "@/pages/HomeView.vue";
import AuthenticateView from "@/pages/account/AuthenticateView.vue";
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
			component: () => import("@/pages/news/NewsView.vue"),
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
			beforeEnter(to, from, next) {
				if (useUsersStore().isUserLogged()) {
					if (useUsersStore().getUserLogged().role === "admin") next();
					else next({ name: "News" });
				} else next({ name: "Authenticate" });
			},
		},
		{
			path: "/activities",
			name: "Activities",
			component: () => import("@/pages/activities/ActivitiesView.vue"),
		},
		{
			path: "/activities/create",
			name: "ActivitiesCreate",
			component: () => import("@/pages/activities/ActivitiesCreateView.vue"),
			beforeEnter(to, from, next) {
				if (useUsersStore().isUserLogged()) {
					if (useUsersStore().getUserLogged().role !== "unsigned") next();
					else next({ name: "Activities" });
				} else next({ name: "Authenticate" });
			},
		},
		{
			path: "/activities/:id",
			name: "ActivitiesDetails",
			component: () => import("@/pages/activities/ActivitiesDetailView.vue"),
		},
		{
			path: "/dashboard",
			name: "Dashboard",
			component: () => import("@/pages/DashboardView.vue"),
			beforeEnter(to, from, next) {
				if (useUsersStore().isUserLogged()) next();
				else next({ name: "Authenticate" });
			},
		},
		{
			path: "/manage",
			name: "Manage",
			component: () => import("@/pages/manage/ManageView.vue"),
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
			component: () => import("@/pages/account/AccountView.vue"),
		},
		{
			path: "/authenticate",
			name: "Authenticate",
			component: AuthenticateView,
			beforeEnter(to, from, next) {
				if (useUsersStore().isUserLogged()) next({ name: "Home" });
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
