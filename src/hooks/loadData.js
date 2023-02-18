import { useActivitiesStore } from "@/stores/activities";
import { useBadgesStore } from "@/stores/badges";
import { useMeetingsStore } from "@/stores/meetings";
import { useNewsStore } from "@/stores/news";
import { useSchoolsStore } from "@/stores/schools";
import { useThemesStore } from "@/stores/themes";
import { useUsersStore } from "@/stores/users";
import { useSeedsStore } from "../stores/seeds";

export async function loadAllUserData() {
	await useUsersStore().fetchAllData();
}

export async function loadBadgesData() {
	await useBadgesStore().fetchBadges();
}

export async function loadActivitiesData() {
	await useActivitiesStore().fetchActivities();
}

export async function loadMeetingsData() {
	await useMeetingsStore().fetchMeetings();
}

export async function loadNewsData() {
	await useNewsStore().fetchNews();
}

export async function loadSchoolsData() {
	await useSchoolsStore().fetchSchools();
}

export async function loadThemesData() {
	await useThemesStore().fetchThemes();
}

export async function loadSeedsData() {
	await useSeedsStore().fetchSeeds();
}
