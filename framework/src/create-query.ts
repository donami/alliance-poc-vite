import { AppContext, Query, QueryInputArgs } from './types';

export const createQuery = (input: QueryInputArgs, ctx: AppContext): Query => {
  return {
    request: async () => {
      const capabilities = ctx.framework.capabilitiesByKey('sys.fetch', input);
      const promises = capabilities.map((capability) => {
        return capability([]);
      });

      const result = await Promise.all(promises);

      return result
        .map((capabilityResponse) => capabilityResponse.response)
        .flat();
    },
    watch: (fn: (updatedResponse: any) => Function) => {},
  };
};
