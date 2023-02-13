import { getLocalStorage, setLocalStorage } from "@/hooks/localStorage";

export function subscribeToNewsLetter(email) {
	const subscribers = getLocalStorage("newsLetterSubscribers") || [];

	if (subscribers.includes(email)) return false;

	const newSubscribers = [...subscribers, email];
	setLocalStorage("newsLetterSubscribers", newSubscribers);

	return true;
}
