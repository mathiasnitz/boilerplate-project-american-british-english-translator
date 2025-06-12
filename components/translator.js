const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {

    constructor() {
        this.americanOnly = americanOnly;
        this.britishOnly = britishOnly;
        this.americanToBritishSpelling = americanToBritishSpelling;
        this.britishToAmericanSpelling = invertDict(americanToBritishSpelling);
        this.americanToBritishTitles = americanToBritishTitles;
        this.britishToAmericanTitles = invertDict(americanToBritishTitles);
    }

    translate(text, locale) {
        let translation = text;

        if(locale === 'american-to-british') {
            translation = this.replaceWords(translation, this.americanOnly);
            translation = this.replaceWords(translation, this.americanToBritishSpelling);
            translation = this.replaceWords(translation, this.americanToBritishTitles, true);
        } else if(locale === 'british-to-american') {
            translation = this.replaceWords(translation, this.britishOnly);
            translation = this.replaceWords(translation, this.britishToAmericanSpelling);
            translation = this.replaceWords(translation, this.britishToAmericanTitles, true);
        }

        return translation;
    }

}

module.exports = Translator;