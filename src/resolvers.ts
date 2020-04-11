import {
	signupUser,
	userAuth0Profile,
	userProfile
} from './user_profile/resolvers';

export const resolvers = {
	Query: {
		userProfile,
		userAuth0Profile,
	},
	Mutation: {
		signupUser,
	},
};