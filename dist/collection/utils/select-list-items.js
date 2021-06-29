import { createElsaClient } from "../services/elsa-client";
async function fetchRuntimeItems(serverUrl, options) {
  const elsaClient = createElsaClient(serverUrl);
  return await elsaClient.designerApi.runtimeSelectItemsApi.get(options.runtimeSelectListItemsProviderType, options.context || {});
}
export async function getSelectListItems(serverUrl, propertyDescriptor) {
  const options = propertyDescriptor.options;
  let items = [];
  if (!!options && options.runtimeSelectListItemsProviderType) {
    items = await fetchRuntimeItems(serverUrl, options);
  }
  else {
    items = options || [];
  }
  return items || [];
}
