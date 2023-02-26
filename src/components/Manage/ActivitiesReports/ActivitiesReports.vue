<script setup>
import Header from "@/components/Manage/Header.vue";
import Activities from "@/components/Manage/ActivitiesReports/Activities.vue";
import NoActivities from "@/components/Manage/ActivitiesReports/NoActivities.vue";
import { useActivitiesStore } from "@/stores/activities";
import { useUsersStore } from "@/stores/users";

const props = defineProps({ theme: { type: Boolean, required: true } });

const theme = props.theme;
const userLogged = useUsersStore().getUserLogged();

const activities = useActivitiesStore().getFinishedActivities(false, userLogged.schoolId);
</script>

<template>
	<div class="row mx-5 mt-5 pt-4">
		<Header
			title="LISTA DE RELATÓRIO DE ATIVIDADES"
			description="clique numa atividade para visualizar o relatório da mesma"
			:theme="theme"
		/>

		<div class="row w-100 mt-5 mx-auto">
			<Activities v-if="activities.length > 0" :activities="activities" :theme="theme" />
			<NoActivities v-else :theme="theme" />
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
