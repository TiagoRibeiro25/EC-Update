<script setup>
import ActivityContent from "./ActivityContent.vue";

const props = defineProps({
	theme: { type: Boolean, required: true },
	activity: { type: Object, required: true },
});

const theme = props.theme;
const activity = props.activity;
</script>

<template>
	<div class="mt-5">
		<div class="row">
			<div class="col-4 left-content px-0 pt-5">
				<ActivityContent :theme="theme" side="left" />
				<ActivityContent
					:theme="theme"
					side="left"
					title="Diagnóstico"
					:content="activity.diagnostic"
				/>
				<ActivityContent :theme="theme" />
				<ActivityContent
					:theme="theme"
					side="left"
					title="Recursos"
					:content="activity.resources"
				/>
				<ActivityContent :theme="theme" />
				<ActivityContent
					:theme="theme"
					side="left"
					title="Indicadores de avaliação"
					:content="activity.evaluationIndicator"
					:pad="true"
				/>
				<ActivityContent :theme="theme" />
			</div>
			<div class="col-4 plant px-0">
				<img
					class="img-fluid plant-img h-100 w-100"
					loading="lazy"
					src="@/assets/images/activityDetail-illustration.png"
					alt=""
				/>
			</div>
			<div class="col-4 right-content px-0 pt-5">
				<ActivityContent
					:theme="theme"
					title="Objetivos"
					:content="activity.objective"
				/>
				<ActivityContent :theme="theme" />
				<ActivityContent :theme="theme" title="Metas" :content="activity.meta" />
				<ActivityContent :theme="theme" />
				<ActivityContent
					:theme="theme"
					title="Participantes"
					:content="activity.participants"
					:pad="true"
				/>
				<ActivityContent :theme="theme" />
				<ActivityContent
					:theme="theme"
					title="Instrumentos de avaliação"
					:content="activity.evaluationIndicator"
					:pad="true"
				/>
				<ActivityContent :theme="theme" />
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.plant {
	min-height: 800px;
	animation: plant 1s ease-in-out;
}

.plant-img {
	object-fit: cover;
}

.left-content {
	animation: left-content 1.5s ease-in-out;
}

.right-content {
	animation: right-content 1.5s ease-in-out;
}

@keyframes plant {
	0% {
		transform: translateY(100vh);
		opacity: 0;
	}
	100% {
		transform: translateY(0);
		opacity: 1;
	}
}

@keyframes left-content {
	0% {
		transform: translateX(-100vw);
		opacity: 0;
	}
	100% {
		transform: translateX(0);
		opacity: 1;
	}
}

@keyframes right-content {
	0% {
		transform: translateX(100vw);
		opacity: 0;
	}
	100% {
		transform: translateX(0);
		opacity: 1;
	}
}
</style>
