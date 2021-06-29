'use strict';

const stateTunnel = require('./state-tunnel-786a62ce.js');
const index = require('./index-ca95b980.js');

const Tunnel = stateTunnel.createProviderConsumer({
  workflowDefinitionId: null,
  serverUrl: null
}, (subscribe, child) => (index.h("context-consumer", { subscribe: subscribe, renderer: child })));

exports.Tunnel = Tunnel;
