import { Paginator } from "@aws-sdk/types";

import { AlexaForBusiness } from "../AlexaForBusiness";
import { AlexaForBusinessClient } from "../AlexaForBusinessClient";
import {
  SearchNetworkProfilesCommand,
  SearchNetworkProfilesCommandInput,
  SearchNetworkProfilesCommandOutput,
} from "../commands/SearchNetworkProfilesCommand";
import { AlexaForBusinessPaginationConfiguration } from "./Interfaces";

/**
 * @private
 */
const makePagedClientRequest = async (
  client: AlexaForBusinessClient,
  input: SearchNetworkProfilesCommandInput,
  ...args: any
): Promise<SearchNetworkProfilesCommandOutput> => {
  // @ts-ignore
  return await client.send(new SearchNetworkProfilesCommand(input), ...args);
};
/**
 * @private
 */
const makePagedRequest = async (
  client: AlexaForBusiness,
  input: SearchNetworkProfilesCommandInput,
  ...args: any
): Promise<SearchNetworkProfilesCommandOutput> => {
  // @ts-ignore
  return await client.searchNetworkProfiles(input, ...args);
};
export async function* paginateSearchNetworkProfiles(
  config: AlexaForBusinessPaginationConfiguration,
  input: SearchNetworkProfilesCommandInput,
  ...additionalArguments: any
): Paginator<SearchNetworkProfilesCommandOutput> {
  // ToDo: replace with actual type instead of typeof input.NextToken
  let token: typeof input.NextToken | undefined = config.startingToken || undefined;
  let hasNext = true;
  let page: SearchNetworkProfilesCommandOutput;
  while (hasNext) {
    input.NextToken = token;
    input["MaxResults"] = config.pageSize;
    if (config.client instanceof AlexaForBusiness) {
      page = await makePagedRequest(config.client, input, ...additionalArguments);
    } else if (config.client instanceof AlexaForBusinessClient) {
      page = await makePagedClientRequest(config.client, input, ...additionalArguments);
    } else {
      throw new Error("Invalid client, expected AlexaForBusiness | AlexaForBusinessClient");
    }
    yield page;
    token = page.NextToken;
    hasNext = !!token;
  }
  // @ts-ignore
  return undefined;
}
