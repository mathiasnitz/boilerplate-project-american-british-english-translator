'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {

      const { text, locale } = req.body;

      if (!text) {
        return res.json({ error: "No text to translate" });
      }


      console.log(text);
      const translation = translator.translate(text, locale);

      

      res.json({ translation });
    });
};
