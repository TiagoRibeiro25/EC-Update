import { defineStore } from "pinia";
import { ref } from "vue";
import { fetchData } from "../hooks/fetchData";

export const useSeedsStore = defineStore("seeds", () => {
	const seeds = ref([]);

	// //* Fetch data
	async function fetchSeeds() {
		const data = await fetchData("seeds");
		seeds.value = data;
	}

	//* Getters
	const getUserSeeds = (userID, filterByMonth = false) => {
		let userSeeds = 0;
		seeds.value.forEach((seed) => {
			if (seed.userId === userID) userSeeds += +seed.seeds;
		});

		if (!filterByMonth) return userSeeds;

		// Get seeds from current month
		const currentMonth = new Date().getMonth();
		const currentYear = new Date().getFullYear();
		let seedsFromCurrentMonth = 0;

		seeds.value.forEach((seed) => {
			if (seed.userId === userID) {
				const seedDate = new Date(seed.date);
				const seedMonth = seedDate.getMonth();
				const seedYear = seedDate.getFullYear();

				if (seedMonth === currentMonth && seedYear === currentYear) {
					seedsFromCurrentMonth += +seed.seeds;
				}
			}
		});

		return seedsFromCurrentMonth;
	};

	const addSeeds = (seeds) => {
		// add to the current logged user
		const user = getUserById(loggedUserId.value);
		const newSeedData = {
			id: seeds.value.length === 0 ? 1 : seeds.value.at(-1).id + 1,
			userId: user.id,
			seeds: seeds,
			date: Date.now(),
		};

		seeds.value.push(newSeedData);
		setLocalStorage("seeds", seeds.value);
	};

	return { seeds, fetchSeeds, getUserSeeds, addSeeds };
});
