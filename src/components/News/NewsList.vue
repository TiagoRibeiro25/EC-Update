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
});
</script>

<template>
	<div>
		<div v-for="newItem in delayedNews" :key="newItem.id">
			<New :theme="theme" :newItem="newItem" />
		</div>
	</div>
</template>
