import { c as createElsaClient } from './elsa-client-e01ed0bb.js';

async function fetchRuntimeItems(serverUrl, options) {
  const elsaClient = createElsaClient(serverUrl);
  return await elsaClient.designerApi.runtimeSelectItemsApi.get(options.runtimeSelectListItemsProviderType, options.context || {});
}
async function getSelectListItems(serverUrl, propertyDescriptor) {
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

export { getSelectListItems as g };
