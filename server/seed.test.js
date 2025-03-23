const db = require('./db');
const request = require('supertest');
const { describe } = require('yargs');
const { afterEach } = require('node:test');

jest.mock('./db');

describe('Get /api/items', () => {
  afterEach(() => {
    jest.clearAllMocks();
  })
})