import {
	importAuth0UserResolver,
	userProfileResolver
} from './user_profile/resolvers';
import {
	baseCLTContractResolver,
	getFinancialContractsResolver,
	registerNewFinancialContractResolver,
} from "./income_management/resolvers";

export const resolvers = {
	Query: {
		userProfile: userProfileResolver,
		baseCLTContract: baseCLTContractResolver,
		getFinancialContracts: getFinancialContractsResolver,
	},
	Mutation: {
		importAuth0User: importAuth0UserResolver,
		registerNewFinancialContract: registerNewFinancialContractResolver,
	},
};