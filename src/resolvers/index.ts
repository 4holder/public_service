export const itWorks = (
	parent: any,
	args: any,
	context: any,
) => "Yes, it works!";

export const resolvers = {
	Query: {
		itWorks,
	},
};