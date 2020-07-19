import {
	importAuth0UserResolver,
	userProfileResolver
} from './user_profile/resolvers';
import {
	baseCLTContractResolver,
	getIncomeResumesResolver,
	registerNewFinancialContractResolver,
	getIncomeProjectionsResolver,
	removeFinancialContractResolver,
} from "./income_management/resolvers";

export const resolvers = {
	Query: {
		userProfile: userProfileResolver,
		baseCLTContract: baseCLTContractResolver,
		getIncomeResumes: getIncomeResumesResolver,
		getIncomeProjections: getIncomeProjectionsResolver,
	},
	Mutation: {
		importAuth0User: importAuth0UserResolver,
		registerNewFinancialContract: registerNewFinancialContractResolver,
		removeFinancialContract: removeFinancialContractResolver,
	},
};