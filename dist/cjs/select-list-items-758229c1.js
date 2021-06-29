'use strict';

const elsaClient = require('./elsa-client-90ac335e.js');

async function fetchRuntimeItems(serverUrl, options) {
  const elsaClient$1 = elsaClient.createElsaClient(serverUrl);
  return await elsaClient$1.designerApi.runtimeSelectItemsApi.get(options.runtimeSelectListItemsProviderType, options.context || {});
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

exports.getSelectListItems = getSelectListItems;
