import {
	importAuth0UserResolver,
	userProfileResolver
} from './user_profile/resolvers';

export const resolvers = {
	Query: {
		userProfile: userProfileResolver,
	},
	Mutation: {
		importAuth0User: importAuth0UserResolver,
	},
};