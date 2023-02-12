import { fetchData } from "@/hooks/fetchData";
import { setLocalStorage } from "@/hooks/localStorage";
import { defineStore } from "pinia";
import { ref } from "vue";

function orderNewsByDate(news) {
	return news.sort((a, b) => {
		return b.date - a.date;
	});
}

export const useNewsStore = defineStore("news", () => {
	const news = ref([]);

	// //* Fetch data
	async function fetchNews() {
		const data = await fetchData("news");
		news.value = data;
	}

	//* Getters
	const getNews = () => orderNewsByDate(news.value);

	const getNewById = (newId) => news.value.find((newItem) => newItem.id === newId);

	const searchNews = (search) => {
		const newsFiltered = news.value.filter((newItem) => {
			return newItem.title.toLowerCase().includes(search.toLowerCase());
		});

		return newsFiltered.map((newItem) => {
			return { id: newItem.id, title: newItem.title, type: "new" };
		});
	};

	//* Actions
	const addNew = (newNew) => {
		news.value.push({
			id: (news.value.length === 0 ? 1 : parseInt(news.value.at(-1).id) + 1).toString(),
			date: Date.now(),
			...newNew,
		});
		setLocalStorage("news", news.value);
	};

	const removeNew = (newId) => {
		news.value = news.value.filter((newItem) => newItem.id !== newId);
		setLocalStorage("news", news.value);
	};

	const removeNewsCreatedByUser = (userId) => {
		news.value = news.value.filter((newItem) => newItem.userId !== userId);
		setLocalStorage("news", news.value);
	};

	return {
		getNews,
		getNewById,
		searchNews,
		addNew,
		removeNew,
		removeNewsCreatedByUser,
		fetchNews,
	};
});
