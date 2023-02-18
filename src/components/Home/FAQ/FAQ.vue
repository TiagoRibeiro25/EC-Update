<script setup>
import FAQquestion from "@/components/Home/FAQ/FAQquestion.vue";
import { fetchData } from "@/hooks/fetchData";
import { ref, onBeforeMount } from "vue";

const props = defineProps({
	theme: { type: Boolean, required: true },
});
const theme = props.theme;

const FAQ = ref([]);

onBeforeMount(async () => {
	FAQ.value = await fetchData("faq");
});
</script>

<template>
	<div class="FAQ-section pt-4" :class="{ 'FAQ-bg-light': !theme, 'FAQ-bg-dark': theme }">
		<div class="faq my-5">
			<h2
				class="title text-center"
				:class="{ 'title-text-light': !theme, 'title-text-dark': theme }"
			>
				PERGUNTAS FREQUENTES
			</h2>
			<div v-if="FAQ.length > 0" class="accordion" role="tablist">
				<FAQquestion v-for="question in FAQ" :key="question.id" :question="question" />
			</div>
			<div v-else>
				<div class="text-center pt-5">
					<b-spinner variant="success" label="Carregando..."></b-spinner>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
$primary-color: #343e3d;
$secondary-color: #aedcc0;

.FAQ-section {
	background-repeat: no-repeat;
	background-position: center;
	background-position-y: -170px;
	min-height: 550px;

	& .faq {
		width: 65%;
		max-width: 905px;
		margin: 0 auto;
		min-height: 200px;
	}
}

.FAQ-bg-light {
	background-image: url("@/assets/images/illustrationFAQ.png");
	background-color: $secondary-color;
}

.FAQ-bg-dark {
	background-image: url("@/assets/images/illustrationFAQ-dark-theme.png");
}

.title {
	font-family: "Alkes", sans-serif;
	font-weight: bold;
	font-size: 35px;
	margin-top: -20px;
	margin-bottom: 80px;
}

.title-text-light {
	color: $primary-color;
}

.title-text-dark {
	color: $secondary-color;
}

.accordion {
	background-color: $primary-color;
	color: $secondary-color;
	border-radius: 5px;
	padding: 10px;
	border: none;
}
</style>
