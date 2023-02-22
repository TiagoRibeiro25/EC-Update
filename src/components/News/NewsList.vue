<script setup>
import New from "@/components/News/New.vue";
import { useNewsStore } from "@/stores/news";
import { ref, watchEffect } from "vue";

const props = defineProps({ theme: { type: Boolean, required: true } });
const theme = props.theme;
const news = useNewsStore().getNews();
const delayedNews = ref([]);

watchEffect(() => {
	let index = 0;
	const interval = setInterval(() => {
		delayedNews.value.push(news[index]);
		index++;
		if (index >= news.length) clearInterval(interval);
	}, 200);
}, []);
</script>

<template>
	<div v-if="news.length > 0">
		<div v-for="newItem in delayedNews" :key="newItem.id">
			<New :theme="theme" :newItem="newItem" />
		</div>
	</div>
	<div v-else class="row" style="height: 190px">
		<div class="col-12 d-flex justify-content-center align-items-center">
			<h2
				class="error-title mt-5 pt-5 text-center"
				:class="theme ? 'error-title-dark' : 'error-title-light'"
			>
				Nenhuma notícia encontrada :(
			</h2>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.error-title {
	font-family: "Panton", sans-serif;
	font-size: 2rem;
	font-weight: 600;
}

.error-title-light {
	color: #333333;
}

.error-title-dark {
	color: #f8f9fa;
}
</style>
