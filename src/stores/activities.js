import { defineStore } from "pinia";
import { ref } from "vue";
import { convertDateToString } from "../hooks/convertDate";
import { fetchData } from "../hooks/fetchData";
import { setLocalStorage } from "../hooks/localStorage";

function filterActivitiesFromCurrentYear(activities) {
	const currentYear = new Date().getFullYear();
	return activities.filter((activity) => {
		const activityYear = convertDateToString(activity.finalDate).split("-")[2];
		return activityYear === currentYear.toString();
	});
}

function orderActivitiesFromNewest(activities) {
	return activities.sort((a, b) => {
		return new Date(b.finalDate) - new Date(a.finalDate);
	});
}

export const useActivitiesStore = defineStore("activities", () => {
	const activities = ref([]);

	//* Fetch data
	async function fetchActivities() {
		const data = await fetchData("activities");
		activities.value = data;
	}

	//* Getters
	const getActivities = () => activities.value;

	const getActivitiesFromCurrentYear = () => {
		const currentYear = new Date().getFullYear();
		return activities.value.filter((activity) => {
			const activityYear = convertDateToString(activity.finalDate).split("-")[2];
			return activityYear === currentYear.toString();
		});
	};

	const getUnfinishedActivities = (filterByYear = false, schoolID = null) => {
		let result = [];
		if (schoolID === null) {
			result = activities.value.filter((activity) => activity.status === "unfinished");
		} else {
			result = activities.value.filter(
				(activity) => activity.status === "unfinished" && activity.schoolId === schoolID
			);
		}

		if (!filterByYear) return result;

		result = filterActivitiesFromCurrentYear(result);
		return orderActivitiesFromNewest(result);
	};

	const getFinishedActivities = (filterByYear = false, schoolID = null) => {
		let result = [];
		if (schoolID === null) {
			result = activities.value.filter((activity) => activity.status === "finished");
		} else {
			result = activities.value.filter(
				(activity) => activity.status === "finished" && activity.schoolId === schoolID
			);
		}

		if (!filterByYear) return result;

		result = filterActivitiesFromCurrentYear(result);
		return orderActivitiesFromNewest(result);
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
		getActivitiesFromCurrentYear,
		getUnfinishedActivities,
		getFinishedActivities,
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
