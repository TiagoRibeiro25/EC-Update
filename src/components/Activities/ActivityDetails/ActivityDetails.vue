<script setup>
import ImgSlider from "@/components/ImgSlider.vue";
import ActivityHeader from "@/components/Activities/ActivityDetails/ActivityHeader.vue";

const props = defineProps({
	theme: { type: Boolean, required: true },
	activity: { type: Object, required: true },
});

const theme = props.theme;
const activity = props.activity;
</script>

<template>
	<div class="mt-3 mx-1">
		<ImgSlider :images="activity.images" />
		<ActivityHeader :activity="activity" :theme="theme" />
	</div>
</template>
