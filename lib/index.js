'use strict';

const { Counter, Registry, Gauge, Summary, Histogram } = require('prom-client');

const internals = {};

internals.getRootRealm = (realm) => {

    while (realm.parent) {
        realm = realm.parent;
    }

    return realm;
};

internals.getState = (realm) => {

    realm.plugins.prometheus = realm.plugins.prometheus || {};

    return realm.plugins.prometheus;
};

internals.metricsRoute = (server) => ({
    id: `${server.realm.plugin}/metrics`,
    handler: (request, h) => {

        return h.response(server.plugins.prometheus.registry.metrics());
    }
});

exports.plugin = {
    name: 'prometheus',
    pkg: require('../package.json'),
    multiple: true,
    requirements: {
        hapi: '>=17.7.0'
    },
    register: (server) => {

        const rootRealm = internals.getRootRealm(server.realm);
        const rootState = internals.getState(rootRealm);

        if (!rootState.initialized) {

            server.expose('registry', new Registry());
            server.route({
                path: '/metrics',
                method: 'GET',
                options: internals.metricsRoute
            });

            rootState.initialized = true;
        }
    }
};
