<script setup>
import { fetchData } from "@/hooks/fetchData";
import { ref, onBeforeMount, defineProps } from "vue";

const props = defineProps({ theme: { type: Boolean, required: true } });
const theme = props.theme;

const quote = ref({});

// Get a random quote from the json file
onBeforeMount(async () => {
	try {
		const quotes = await fetchData("quotes");
		quote.value = quotes[Math.floor(Math.random() * quotes.length)]; // random quote
	} catch (error) {
		console.log(error);
		quote.value = {
			author: "Yan Arthus Bertrand",
			quote: "A ecologia deve estar inscrita no ADN de tudo o que fazemos diariamente e ainda não entrou nos costumes",
		};
		console.log("There was an error fetching the quote. Using default quote instead.");
	}
});
</script>

<template>
	<div
		class="d-flex flex-column align-items-center justify-content-center mb-5 w-75 mx-auto"
	>
		<div v-if="!quote.content || !quote.author">
			<b-spinner variant="success" label="Carregando..."></b-spinner>
		</div>
		<div v-else class="text-center" :class="!theme ? 'light-text' : 'dark-text'">
			<p class="content mb-0">"{{ quote.content }}"</p>
			<span class="author mt-0">{{ quote.author }}</span>
		</div>
	</div>
</template>

<style lang="scss" scoped>
$primary-color: #f8f9fa;
$secondary-color: #333333;

.content {
	font-family: "Panton", sans-serif;
	font-size: 1.7rem;
	font-weight: 700;
}

.author {
	font-family: "Panton", sans-serif;
	font-size: 1.1rem;
	font-weight: 500;
	opacity: 0.7;
}

.light-text {
	color: $secondary-color;
}

.dark-text {
	color: $primary-color;
}
</style>
