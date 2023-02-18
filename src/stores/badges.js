import { useUsersStore } from "@/stores/users";
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

	const getPercentageOfUsersWithBadge = (badgeId) => {
		const users = useUsersStore().getUsers();
		const usersWithBadge = users.filter((user) => user.badges.includes(badgeId));
		return Math.round((usersWithBadge.length / users.length) * 100);
	};

	return { getBadges, getBadgeById, fetchBadges, getPercentageOfUsersWithBadge };
});
