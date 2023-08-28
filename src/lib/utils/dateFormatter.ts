export const dateFormatter = (dateStr: Date): string => {
	const date = new Date(dateStr);
	const dayOfMonth = date.getDate();
	const suffix = getDayOfMonthSuffix(dayOfMonth);
	const monthName = date.toLocaleString('default', { month: 'long' });
	const year = date.getFullYear();

	return `${dayOfMonth}${suffix} ${monthName}, ${year}`;
};

const getDayOfMonthSuffix = (dayOfMonth: number): string => {
	if (dayOfMonth >= 11 && dayOfMonth <= 13) {
		return 'th';
	}

	switch (dayOfMonth % 10) {
		case 1:
			return 'st';
		case 2:
			return 'nd';
		case 3:
			return 'rd';
		default:
			return 'th';
	}
};
