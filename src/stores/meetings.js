import { defineStore } from "pinia";
import { ref } from "vue";
import { fetchData } from "../hooks/fetchData";
import { setLocalStorage } from "../hooks/localStorage";

export const useMeetingsStore = defineStore("meetings", () => {
	const meetings = ref([]);

	// //* Fetch data
	async function fetchMeetings() {
		const data = await fetchData("meetings");
		meetings.value = data;
	}

	//* Getters
	const getMeetings = () => meetings.value;

	const getMeetingById = (meetingId) => {
		return meetings.value.find((meeting) => meeting.id === meetingId);
	};

	//* Actions
	const addNewMeeting = (newMeeting) => {
		newMeeting.id = (
			meetings.value.length === 0 ? 1 : parseInt(meetings.value.at(-1).id) + 1
		).toString();
		meetings.value.push(newMeeting);
		setLocalStorage("meetings", meetings.value);
	};

	const addAta = (meetingId, ata) => {
		const meeting = meetings.value.find((meeting) => meeting.id === meetingId);
		meeting.ata = ata;
		setLocalStorage("meetings", meetings.value);
	};

	const removeMeetingsBySchool = (schoolID) => {
		meetings.value = meetings.value.filter((meeting) => meeting.schoolId !== schoolID);
		setLocalStorage("meetings", meetings.value);
	};

	return {
		getMeetings,
		getMeetingById,
		addNewMeeting,
		addAta,
		removeMeetingsBySchool,
		fetchMeetings,
	};
});
