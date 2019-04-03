'use strict';

const Pkg = require('../package.json');

exports.plugin = {
    name: 'prometheus',
    version: Pkg.version,
    register: async (server, options) => {

    }
};
