const excludeItems = <T extends { name: string }>(
	data: T[],
	filterByWord?: string | string[]
) => {
	const lowerCaseFilter = Array.isArray(filterByWord)
		? filterByWord.map((item) => item.toLowerCase())
		: filterByWord
			? [filterByWord.toLowerCase()]
			: [];

	return data.filter(
		(item) => !lowerCaseFilter.includes(item.name.toLowerCase())
	);
};

export default excludeItems;
