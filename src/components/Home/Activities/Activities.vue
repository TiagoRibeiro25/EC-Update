<script setup>
import Activity from "@/components/Home/Activities/Activity.vue";

const props = defineProps({
	theme: { type: Boolean, required: true },
	activities: { type: Array, required: true },
});

const theme = props.theme;
let activities = props.activities;
</script>

<template>
	<div class="cards" v-for="activity in activities" :key="activity.id">
		<div class="mx-4">
			<Activity :theme="theme" :activity="activity" />
		</div>
	</div>
</template>

<style lang="scss" scoped>
@media screen and (max-width: 965px) {
	.cards {
		&:nth-child(3) {
			display: none;
		}
	}
}

@media screen and (max-width: 665px) {
	.cards {
		&:nth-child(2) {
			display: none;
		}
	}
}
</style>
