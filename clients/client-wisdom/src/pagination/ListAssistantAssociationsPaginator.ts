import { Paginator } from "@aws-sdk/types";

import {
  ListAssistantAssociationsCommand,
  ListAssistantAssociationsCommandInput,
  ListAssistantAssociationsCommandOutput,
} from "../commands/ListAssistantAssociationsCommand";
import { Wisdom } from "../Wisdom";
import { WisdomClient } from "../WisdomClient";
import { WisdomPaginationConfiguration } from "./Interfaces";

/**
 * @private
 */
const makePagedClientRequest = async (
  client: WisdomClient,
  input: ListAssistantAssociationsCommandInput,
  ...args: any
): Promise<ListAssistantAssociationsCommandOutput> => {
  // @ts-ignore
  return await client.send(new ListAssistantAssociationsCommand(input), ...args);
};
/**
 * @private
 */
const makePagedRequest = async (
  client: Wisdom,
  input: ListAssistantAssociationsCommandInput,
  ...args: any
): Promise<ListAssistantAssociationsCommandOutput> => {
  // @ts-ignore
  return await client.listAssistantAssociations(input, ...args);
};
export async function* paginateListAssistantAssociations(
  config: WisdomPaginationConfiguration,
  input: ListAssistantAssociationsCommandInput,
  ...additionalArguments: any
): Paginator<ListAssistantAssociationsCommandOutput> {
  // ToDo: replace with actual type instead of typeof input.nextToken
  let token: typeof input.nextToken | undefined = config.startingToken || undefined;
  let hasNext = true;
  let page: ListAssistantAssociationsCommandOutput;
  while (hasNext) {
    input.nextToken = token;
    input["maxResults"] = config.pageSize;
    if (config.client instanceof Wisdom) {
      page = await makePagedRequest(config.client, input, ...additionalArguments);
    } else if (config.client instanceof WisdomClient) {
      page = await makePagedClientRequest(config.client, input, ...additionalArguments);
    } else {
      throw new Error("Invalid client, expected Wisdom | WisdomClient");
    }
    yield page;
    token = page.nextToken;
    hasNext = !!token;
  }
  // @ts-ignore
  return undefined;
}
