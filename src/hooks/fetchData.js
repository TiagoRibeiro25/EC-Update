import { getLocalStorage } from "./localStorage";

export async function fetchData(type) {
	const data = getLocalStorage(type);
	if (data) return data;

	try {
		const res = await fetch(`../../data/json/${type}.json`);
		const data = await res.json();
		return data;
	} catch (err) {
		console.log(err);
		return [];
	}
}
