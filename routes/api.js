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

      console.log("locale: " + locale);

      if (locale !== "american-to-british" && locale !== "british-to-american"){
        return res.json({ error: "Invalid value for locale field" });
      } else  {
        const translation = translator.translate(text, locale);
        res.json({ translation });
      }
      
    });
};
