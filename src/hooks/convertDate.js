// convert date number (ex: date.now()) to dd-mm-yyyy format
export function convertDateToString(date) {
	const newDate = new Date(date);
	const day = newDate.getDate();
	const month = newDate.getMonth() + 1;
	const year = newDate.getFullYear();
	return `${day}-${month}-${year}`;
}

// convert date (dd-mm-yyyy) to number (ex: date.now())
export function convertDateToNumber(date) {
	const newDate = new Date(date);
	return newDate.getTime();
}
