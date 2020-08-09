import {
	importAuth0UserResolver,
	userProfileResolver
} from './user_profile/resolvers';
import {
	baseCLTContractResolver,
	getIncomeResumesResolver,
	getFinancialContractDetailsResolver,
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
		getFinancialContractDetails: getFinancialContractDetailsResolver,
	},
	Mutation: {
		importAuth0User: importAuth0UserResolver,
		registerNewFinancialContract: registerNewFinancialContractResolver,
		removeFinancialContract: removeFinancialContractResolver,
	},
};