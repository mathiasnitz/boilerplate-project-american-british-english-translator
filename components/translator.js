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

        if(locale === 'american-to-british') {
            translation = translation.replace(/\b(\d{1,2}):(\d{2})\b/g, (match, h, m) => {
                return `<span class="highlight">${h}.${m}</span>`;
            });
        } else if(locale === 'british-to-american') {
            translation = translation.replace(/\b(\d{1,2})\.(\d{2})\b/g, (match, h, m) => {
                return `<span class="highlight">${h}:${m}</span>`;
            });
        }

        if(text === translation){
            return "Everything looks good to me!";
        } else {
            return translation;
        }

        
    }

    replaceWords(text, dictionary, isTitle = false) {
        for (const [key, value] of Object.entries(dictionary)) {
            let re;

            if(isTitle) {
                re = new RegExp(`${escapeRegex(key)}`, 'gi');
            } else {
                re = new RegExp(`\\b${escapeRegex(key)}\\b`, 'gi');
            }

            text = text.replace(re, (match) => {
                const replacement = isTitle ? this.capitalize(value) : value;
                return `<span class="highlight">${replacement}</span>`;
            });
        }
        return text;
    }

    capitalize(word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

}

function escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function invertDict(obj){
    const inverted = {};
    for(const key in obj) {
        if(obj.hasOwnProperty(key)) {
            inverted[obj[key]] = key;
        }
    }
    return inverted;
}

module.exports = Translator;