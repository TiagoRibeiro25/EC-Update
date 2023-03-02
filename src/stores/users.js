import { fetchData } from "@/hooks/fetchData";
import { getLocalStorage, removeLocalStorage, setLocalStorage } from "@/hooks/localStorage";
import { useNewsStore } from "@/stores/news";
import { defineStore } from "pinia";
import { ref } from "vue";

function loadDarkModeSetting() {
	return getLocalStorage("darkMode") === null
		? !!(window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches)
		: getLocalStorage("darkMode");
}

export const useUsersStore = defineStore("users", () => {
	const users = ref([]);
	const roles = ref([]);
	const loggedUserId = ref(getLocalStorage("loggedUser") || null);
	const darkMode = ref(loadDarkModeSetting());

	//* Fetch data
	async function fetchAllData() {
		const usersData = await fetchData("users");
		const rolesData = await fetchData("roles");

		users.value = usersData;
		roles.value = rolesData;
	}

	//* Getters
	// Users
	const getUsers = () => users.value;

	const getUserById = (id) => users.value.find((user) => user.id === id);

	const getUsersByRole = (role) => users.value.filter((user) => user.role === role);

	const getUsersBySchool = (schoolID, role = null) => {
		// filter by role is optional
		return users.value
			.filter((user) => user.schoolId === schoolID)
			.filter((user) => {
				if (role) return user.role === role;
				return true;
			});
	};

	const isUserLogged = () => loggedUserId.value !== null;

	const getUserLogged = () => getUserById(loggedUserId.value);

	const doesEmailExist = (email) => users.value.some((user) => user.email === email);

	const doesUserExist = (userId) => users.value.some((user) => user.id === userId);

	const getFilteredUsers = (filterName, filterEmail, filterRole) => {
		return users.value.filter((user) => {
			const isMatchingName = user.name.toLowerCase().includes(filterName.toLowerCase());
			const isMatchingEmail = user.email
				.toLowerCase()
				.includes(filterEmail.toLowerCase());
			const isMatchingRole =
				user.role.toLowerCase() === filterRole.toLowerCase() || filterRole === "all";

			return isMatchingName && isMatchingEmail && isMatchingRole;
		});
	};

	// Roles
	const getRoles = () => roles.value;

	// Theme
	const isDarkMode = () => darkMode.value;

	//* Actions
	const changeUserInfo = (newEmail, newPassword, newInternalId, newCourse, newYear) => {
		const user = getUserLogged();
		user.email = newEmail;
		user.password = newPassword;
		user.internalId = newInternalId;
		user.course = newCourse;
		user.year = newYear;
		setLocalStorage("users", users.value);
	};

	const changeUserRole = (userID, newRole) => {
		users.value.find((user) => user.id === userID).role = newRole;
		setLocalStorage("users", users.value);
	};

	const updateHighlightedBadge = (badgeId) => {
		users.value.find((user) => user.id === loggedUserId.value).highlightedBadge = badgeId;
		setLocalStorage("users", users.value);
	};

	const unlockBadge = (badgeId) => {
		badgeId = badgeId.toString();
		const userBadges = users.value.find((user) => user.id === loggedUserId.value).badges;
		if (userBadges.includes(badgeId)) return;
		userBadges.push(badgeId);
		users.value.find((user) => user.id === loggedUserId.value).badges = userBadges;
		setLocalStorage("users", users.value);
	};

	const logIn = (email, password) => {
		const user = users.value.find(
			(user) => user.email === email && user.password === password
		);
		if (!user) return false;
		loggedUserId.value = user.id;
		setLocalStorage("loggedUser", user.id);
		return true;
	};

	const signOut = () => {
		loggedUserId.value = null;
		removeLocalStorage("loggedUser");
	};

	const createNewUser = (newUser) => {
		// check if the user already exists
		if (users.value.some((user) => user.email === newUser.email)) return false;

		// add the new user
		const urlImgParam = newUser.name.replace(/\s/g, "").toLowerCase();

		// create the new user
		users.value.push({
			id: (users.value.length === 0 ? 1 : parseInt(users.value.at(-1).id) + 1).toString(),
			role: "unsigned",
			badges: [],
			highlightedBadge: null,
			photo: `https://api.dicebear.com/5.x/personas/svg?seed${urlImgParam}`,
			meetingsCreated: 0,
			activitiesCreated: 0,
			...newUser,
		});

		// save the new user
		setLocalStorage("users", users.value);
		return true;
	};

	const deleteUsersFromSchool = (schoolID) => {
		const newsStore = useNewsStore();
		const usersFromSchool = getUsersBySchool(schoolID);
		// Delete every New created by the users from the school
		usersFromSchool.forEach((user) => newsStore.deleteNewsCreatedByUser(user.id));
		// Delete the users from the school
		users.value = users.value.filter((user) => user.schoolId !== schoolID);
		setLocalStorage("users", users.value);
	};

	const addRole = (newRole) => {
		// check if the role already exists
		if (roles.value.some((role) => role.toLowerCase() === newRole.toLowerCase))
			return false;
		// add the new role
		roles.value.push(newRole);
		setLocalStorage("roles", roles.value);
	};

	const increaseMeetingsCreated = () => {
		const user = getUserById(loggedUserId.value);
		user.meetingsCreated++;

		setLocalStorage("users", users.value);
	};

	const increaseActivitiesCreated = () => {
		const user = getUserById(loggedUserId.value);
		user.activitiesCreated++;
		setLocalStorage("users", users.value);
	};

	const toggleDarkMode = () => {
		darkMode.value = !darkMode.value;
		setLocalStorage("darkMode", darkMode.value);
	};

	return {
		getUsers,
		getUserById,
		getUsersByRole,
		doesEmailExist,
		doesUserExist,
		getUsersBySchool,
		getFilteredUsers,
		getRoles,
		isUserLogged,
		getUserLogged,
		changeUserRole,
		updateHighlightedBadge,
		unlockBadge,
		logIn,
		signOut,
		createNewUser,
		deleteUsersFromSchool,
		addRole,
		increaseMeetingsCreated,
		increaseActivitiesCreated,
		fetchAllData,
		toggleDarkMode,
		isDarkMode,
		changeUserInfo,
	};
});
