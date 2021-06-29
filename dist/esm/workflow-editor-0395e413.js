import { c as createProviderConsumer } from './state-tunnel-04c0b67a.js';
import { h } from './index-efd13af9.js';

const Tunnel = createProviderConsumer({
  workflowDefinitionId: null,
  serverUrl: null
}, (subscribe, child) => (h("context-consumer", { subscribe: subscribe, renderer: child })));

export { Tunnel as T };
