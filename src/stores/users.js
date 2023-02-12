import { fetchData } from "@/hooks/fetchData";
import { getLocalStorage, removeLocalStorage, setLocalStorage } from "@/hooks/localStorage";
import { useNewsStore } from "@/stores/news";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUsersStore = defineStore("users", () => {
	const users = ref([]);
	const roles = ref([]);
	const seeds = ref([]);
	const loggedUserId = ref(getLocalStorage("loggedUser") || null);
	const darkMode = ref(getLocalStorage("darkMode") || false);

	// //* Fetch data
	async function fetchAllData() {
		const usersData = await fetchData("users");
		const rolesData = await fetchData("roles");
		const seedsData = await fetchData("seeds");

		users.value = usersData;
		roles.value = rolesData;
		seeds.value = seedsData;
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

	// Roles
	const getRoles = () => roles.value;

	// Seeds
	const getUserSeeds = (userID, filterByMonth = false) => {
		let userSeeds = 0;
		seeds.value.forEach((seed) => {
			if (seed.userId === userID) userSeeds += seed.seeds;
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
					seedsFromCurrentMonth += seed.seeds;
				}
			}
		});

		return seedsFromCurrentMonth;
	};

	// Theme
	const isDarkMode = () => darkMode.value;

	//* Actions
	const changeUserRole = (userID, newRole) => {
		users.value.find((user) => user.id === userID).role = newRole;
		setLocalStorage("users", users.value);
	};

	const updateHighlightedBadge = (badgeId) => {
		users.value.find((user) => user.id === this.loggedUserId.value).highlightedBadge =
			badgeId;
		setLocalStorage("users", users.value);
	};

	const unlockBadge = (badgeId) => {
		const userBadges = users.value.find(
			(user) => user.id === this.loggedUserId.value
		).badges;
		if (userBadges.includes(badgeId)) return;
		userBadges.push(badgeId);
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
		this.loggedUserId.value = null;
		removeLocalStorage("loggedUser");
	};

	const createNewUser = (newUser) => {
		// check if the user already exists
		if (users.value.some((user) => user.email === newUser.email)) return false;

		// add the new user
		const urlImgParam = newUser.name.replace(/\s/g, "").toLowerCase();

		// create the new user
		users.value.push({
			id: users.value.length === 0 ? 1 : users.value.at(-1).id + 1,
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
		getUsersBySchool,
		getRoles,
		getUserSeeds,
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
		addSeeds,
		increaseMeetingsCreated,
		increaseActivitiesCreated,
		fetchAllData,
		toggleDarkMode,
		isDarkMode,
	};
});
