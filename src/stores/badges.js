import { defineStore } from "pinia";
import { ref } from "vue";
import { fetchData } from "../hooks/fetchData";

export const useBadgesStore = defineStore("badges", () => {
	const badges = ref([]);

	// //* Fetch data
	async function fetchBadges() {
		const data = await fetchData("badges");
		badges.value = data;
	}

	//* Getters
	const getBadges = () => badges.value;

	const getBadgeById = (badgeId) => badges.value.find((badge) => badge.id === badgeId);

	return { getBadges, getBadgeById, fetchBadges };
});
