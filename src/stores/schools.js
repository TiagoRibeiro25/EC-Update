import { useActivitiesStore } from "@/stores/activities";
import { useMeetingsStore } from "@/stores/meetings";
import { useUsersStore } from "@/stores/users";
import { defineStore } from "pinia";
import { ref } from "vue";
import { fetchData } from "../hooks/fetchData";
import { setLocalStorage } from "../hooks/localStorage";

export const useSchoolsStore = defineStore("schools", () => {
	const schools = ref([]);

	// //* Fetch data
	async function fetchSchools() {
		const data = await fetchData("schools");
		schools.value = data;
	}

	//* Getters
	const getSchools = () => schools.value;

	const getSchoolById = (schoolId) => {
		return schools.value.find((school) => school.id === schoolId);
	};

	const addSchool = (newSchoolName) => {
		schools.value.push({
			id: schools.value.length === 0 ? 1 : schools.value.at(-1).id + 1,
			name: newSchoolName,
		});
		setLocalStorage("schools", schools.value);
	};

	const editSchool = (schoolID, newSchoolName) => {
		const school = schools.value.find((school) => school.id === schoolID);
		school.name = newSchoolName;
		setLocalStorage("schools", schools.value);
	};

	const deleteSchool = (schoolID) => {
		const usersStore = useUsersStore();
		const activitiesStore = useActivitiesStore();
		const meetingsStore = useMeetingsStore();

		// Delete users from this school
		usersStore.deleteUsersFromSchool(schoolID);
		// Delete activities from this school
		activitiesStore.removeActivitiesFromSchool(schoolID);
		// Delete meetings from this school
		meetingsStore.removeMeetingsBySchool(schoolID);
		// Delete school
		schools.value = schools.value.filter((school) => school.id !== schoolID);

		setLocalStorage("schools", schools.value);
	};

	return { getSchools, getSchoolById, addSchool, editSchool, deleteSchool, fetchSchools };
});
