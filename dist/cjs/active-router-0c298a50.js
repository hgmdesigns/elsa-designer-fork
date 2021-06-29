'use strict';

const index = require('./index-ca95b980.js');
const stateTunnel = require('./state-tunnel-786a62ce.js');

const ActiveRouter = stateTunnel.createProviderConsumer({
    historyType: 'browser',
    location: {
        pathname: '',
        query: {},
        key: ''
    },
    titleSuffix: '',
    root: '/',
    routeViewsUpdated: () => { }
}, (subscribe, child) => (index.h("context-consumer", { subscribe: subscribe, renderer: child })));

exports.ActiveRouter = ActiveRouter;
