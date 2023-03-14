const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Recipe, conn } = require('../../src/db.js');

const agent = session(app);
/// los datos no debe ser nulos
const recipe = {
    name: 'Milanea a la napolitana',
    summary: "Quisque in nibh sit amet erat luctus",
    nivel: "18"
};

describe('Recipe routes', () => {
    before(() => conn.authenticate()
        .catch((err) => {
            console.error('Unable to connect to the database:', err);
        }));
    beforeEach(() => Recipe.sync({ force: true })
        .then(() => Recipe.create(recipe)));
    describe('GET /recipes/1', () => {
        it('should get 200', () =>
            agent.get('/recipes/1').expect(200)
        );
    });
    describe(' WRONG GET /recipes/1234', () => {
        it('should get 200', () =>
            agent.get('/recipes/1234').expect(500)
        );
    });
});