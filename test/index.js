'use strict';

// Load modules

const Lab = require('@hapi/lab');
const Hapi = require('@hapi/hapi');

const Prometheus = require('..');


// Declare internals

const internals = {};


// Test shortcuts

const { describe, it, expect } = exports.lab = Lab.script();


describe('prometheus', () => {

    it('should register with default options', async () => {

        const server = Hapi.server();
        await server.register(Prometheus);
    });
});
