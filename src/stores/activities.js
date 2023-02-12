import { defineStore } from "pinia";
import { ref } from "vue";
import { fetchData } from "../hooks/fetchData";
import { setLocalStorage } from "../hooks/localStorage";

export const useActivitiesStore = defineStore("activities", () => {
	const activities = ref([]);

	// //* Fetch data
	async function fetchActivities() {
		const data = await fetchData("activities");
		activities.value = data;
	}

	//* Getters
	const getActivities = () => activities.value;

	const getUnfinishedActivities = () => {
		return activities.value.filter((activity) => activity.status === "unfinished");
	};

	const getActivityById = (activityId) => {
		return activities.value.find((activity) => activity.id === activityId);
	};

	const searchActivities = (search) => {
		const activitiesFiltered = activities.value.filter((activity) => {
			return (
				activity.title.toLowerCase().includes(search.toLowerCase()) &&
				activity.status === "unfinished"
			);
		});

		return activitiesFiltered.map((activity) => {
			return { id: activity.id, title: activity.title, type: "activity" };
		});
	};

	//* Actions
	const addActivity = (newActivity) => {
		activities.value.push({
			id: (activities.value.length === 0
				? 1
				: parseInt(activities.value.at(-1).id) + 1
			).toString(),
			report: {},
			status: "unfinished",
			...newActivity,
		});
		setLocalStorage("activities", activities.value);
	};

	const removeActivity = (activityId) => {
		activities.value = activities.value.filter((activity) => activity.id !== activityId);
		setLocalStorage("activities", activities.value);
	};

	const removeActivitiesFromSchool = (schoolID) => {
		activities.value = activities.value.filter(
			(activity) => activity.schoolId !== schoolID
		);
		setLocalStorage("activities", activities.value);
	};

	const finishActivity = (activityId) => {
		activities.value.find((activity) => activity.id === activityId).status = "finished";
		setLocalStorage("activities", activities.value);
	};

	const addReport = (activityId, report) => {
		activities.value.find((activity) => activity.id === activityId).report = report;
		setLocalStorage("activities", activities.value);
	};

	return {
		getActivities,
		getUnfinishedActivities,
		getActivityById,
		searchActivities,
		addActivity,
		removeActivity,
		removeActivitiesFromSchool,
		finishActivity,
		addReport,
		fetchActivities,
	};
});
