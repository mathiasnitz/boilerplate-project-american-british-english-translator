const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');

suite('Functional Tests', () => {

    test('Translation with text and locale fields: POST request to /api/translate', (done) => {
        chai.request(server)
        .post('/api/translate')
        .send({ text: "Mangoes are my favorite fruit.", locale: "american-to-british" })
        .end((err, res) => {
            assert.equal(res.status, 200);
            assert.property(res.body, 'translation');
            assert.include(res.body.translation, '<span class="highlight">favourite</span>');
            done();
        });
    });

    test('Translation with text and invalid locale field: POST request to /api/translate', (done) => {
        chai.request(server)
          .post('/api/translate')
          .send({ text: "Hello!", locale: "german-to-spanish" })
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.deepEqual(res.body, { error: "Invalid value for locale field" });
            done();
          });
      });

    test('Translation with missing text field: POST request to /api/translate', (done) => {
        chai.request(server)
          .post('/api/translate')
          .send({ locale: "american-to-british" })
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.deepEqual(res.body, { error: "Required field(s) missing" });
            done();
          });
      });
    
    test('Translation with missing locale field: POST request to /api/translate', (done) => {
        chai.request(server)
          .post('/api/translate')
          .send({ text: "Hello there!" })
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.deepEqual(res.body, { error: "Required field(s) missing" });
            done();
          });
      });

    test('Translation with empty text: POST request to /api/translate', (done) => {
        chai.request(server)
          .post('/api/translate')
          .send({ text: "", locale: "british-to-american" })
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.deepEqual(res.body, { error: "No text to translate" });
            done();
          });
      });

    test('Translation with text that needs no translation: POST request to /api/translate', (done) => {
        chai.request(server)
          .post('/api/translate')
          .send({ text: "Hello!", locale: "american-to-british" })
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.deepEqual(res.body, { text: "Hello!", translation: "Everything looks good to me!" });
            done();
          });
      });
});
