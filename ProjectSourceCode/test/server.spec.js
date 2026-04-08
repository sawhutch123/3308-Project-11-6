const server = require('../src/index');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Testing Register API', () => {

    // i. positive test case
    it('positive : /register. Success on valid input', done => {
      chai
        .request(server)
        .post('/register')
        .send({
            first_name: 'Ralphie',
            last_name: 'Buffalo',
            email: 'ralphie@colorado.edu', 
            password: 'password123',
            confirm_password: 'password123'
        })
        .end((err, res) => {
          // Chai automatically follows the redirect to /home, giving us a 200 success!
          expect(res).to.have.status(200);
          done();
        });
    });

    // ii. negative test case
    it('Negative : /register. Fail on missing password', done => {
      chai
        .request(server)
        .post('/register')
        .send({
            first_name: 'Ralphie',
            last_name: 'Buffalo',
            email: 'badralphie@colorado.edu'
        }) // Missing the password fields!
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
});