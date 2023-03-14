const { Diets, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('modelo dietas', () => {
    before(() => conn.authenticate()
        .catch((err) => {
            console.error('Unable to connect to the database:', err);
        }));
    describe('Validators', () => {
        beforeEach(() => Diets.sync({ force: true }));
        describe('name', () => {
            it('should throw an error if name is null', (done) => {
                Diets.create({})
                    .then(() => done(new Error('It requires a valid name')))
                    .catch(() => done());
            });
            it('should work when its a valid name', () => {
                Diets.create({ name: 'poco saludable' });
            });
        });
    });
});