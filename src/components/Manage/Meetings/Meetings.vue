<script setup>
import Header from "@/components/Manage/Header.vue";
import MeetingsList from "@/components/Manage/Meetings/MeetingsList.vue";
import CreateNewMeeting from "@/components/Manage/Meetings/CreateNewMeeting.vue";

const props = defineProps({ theme: { type: Boolean, required: true } });

const theme = props.theme;
</script>

<template>
	<div class="row mx-5 mt-5">
		<Header
			title="REUNIÕES"
			description="crie reuniões ou registe as reuniões do conselho adicionando a respetiva ata"
			:theme="theme"
		/>

		<div class="row mt-5 w-100 mx-auto">
			<div class="col-xl-6 pl-0 pr-xl-5 pr-0">
				<MeetingsList :theme="theme" />
			</div>
			<div class="col-xl-6 px-0">
				<CreateNewMeeting :theme="theme" />
			</div>
		</div>
	</div>
</template>
