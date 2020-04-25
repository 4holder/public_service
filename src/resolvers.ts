import {
	importAuth0UserResolver,
	userProfileResolver
} from './user_profile/resolvers';
import {
	baseCLTContractResolver
} from "./income_management/resolvers";

export const resolvers = {
	Query: {
		userProfile: userProfileResolver,
		baseCLTContract: baseCLTContractResolver,
	},
	Mutation: {
		importAuth0User: importAuth0UserResolver,
	},
};