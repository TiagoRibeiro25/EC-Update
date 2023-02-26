import { defineStore } from "pinia";
import { ref } from "vue";
import { fetchData } from "../hooks/fetchData";
import { setLocalStorage } from "../hooks/localStorage";

function convertName(name) {
	// convert to lowercase, capitalize first letter and replace spaces with 1 space
	return name
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.toLowerCase()
		.replace(/\b[a-z]/g, (letter) => letter.toUpperCase())
		.replace(/\s+/g, " ")
		.trim();
}

export const useThemesStore = defineStore("themes", () => {
	const themes = ref([]);

	//* Fetch data
	async function fetchThemes() {
		const data = await fetchData("themes");
		themes.value = data;
	}

	//* Getters
	const getThemes = () => themes.value;

	const getThemeById = (themeId) => themes.value.find((theme) => theme.id === themeId);

	const getActiveThemes = () => themes.value.filter((theme) => theme.status === "active");

	const addTheme = (newTheme) => {
		newTheme = convertName(newTheme);

		// Check if theme already exists
		const themeExists = themes.value.find((theme) => theme.name === newTheme);
		if (themeExists) themeExists.status = "active";
		else {
			themes.value.push({
				id: (themes.value.length === 0
					? 1
					: parseInt(themes.value.at(-1).id) + 1
				).toString(),
				name: newTheme,
				status: "active", // active: can be used, inactive: can't be used anymore
			});
		}

		setLocalStorage("themes", themes.value);
	};

	const disableTheme = (themeID) => {
		const theme = themes.value.find((theme) => theme.id === themeID);
		theme.status = "inactive";

		setLocalStorage("themes", themes.value);
	};

	return { getThemes, getThemeById, getActiveThemes, addTheme, disableTheme, fetchThemes };
});
