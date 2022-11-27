/**
 * ----- ORDER OF CONJUGATIONS -----
 * 0 - yo
 * 1 - nosotros/nosotras
 * 2 - tú
 * 3 - vosotros/vosotras
 * 4 - él/ella/usted
 * 5 - ellos/ellas/ustedes
 * ---------------------------------
 */

const pronouns = document.getElementsByClassName('conjugation');
const tenseSelector = document.getElementsByTagName('select')[0];

const verbEndings = ['ar', 'er', 'ir'];
const getStem = (word) => word.slice(0, -2);
const getEndingIndex = (word) => verbEndings.indexOf(word.slice(-2));

const indicativoPresente = [
  ['o', 'o', 'o'],
  ['amos', 'emos', 'imos'],
  ['as', 'es', 'es'],
  ['áis', 'éis', 'ís'],
  ['a', 'e', 'e'],
  ['an', 'en', 'en']
];

const indicativoPreterito = [
  ['é', 'í', 'í'],
  ['amos', 'imos', 'imos'],
  ['aste', 'iste', 'iste'],
  ['asteis', 'isteis', 'isteis'],
  ['ó', 'ió', 'ió'],
  ['aron', 'ieron', 'ieron']
];

const indicativoImperfecto = [
  ['aba', 'ía', 'ía'],
  ['ábamos', 'íamos', 'íamos'],
  ['abas', 'ías', 'ías'],
  ['abais', 'íais', 'íais'],
  ['aba', 'ía', 'ía'],
  ['aban', 'ían', 'ían']
];

const indicativoFuturo = [
  ['aré', 'eré', 'iré'],
  ['aremos', 'eremos', 'iremos'],
  ['arás', 'erás', 'irás'],
  ['aréis', 'eréis', 'iréis'],
  ['ará', 'erá', 'irá'],
  ['arán', 'erán', 'irán']
];

const subjunctivoPresente = [
  ['e', 'a', 'a'],
  ['emos', 'amos', 'amos'],
  ['es', 'as', 'as'],
  ['éis', 'áis', 'áis'],
  ['e', 'a', 'a'],
  ['en', 'an', 'an']
];

function conjugate() {
  const phrase = document.getElementById('phrase').value.toLowerCase();
  const words = phrase.split(' ');

  let conjugations;

  // Get the conjugations of the selected tense
  switch (tenseSelector.value) {
    case '0':
      conjugations = indicativoPresente;
      break;
    case '1':
      conjugations = indicativoPreterito;
      break;
    case '2':
      conjugations = indicativoImperfecto;
      break;
    case '3':
      conjugations = indicativoFuturo;
      break;
    case '4':
      conjugations = subjunctivoPresente;
  }

  // Accumulate the conjugated phrase
  const conjugatedPhrases = ['', '', '', '', '', ''];

  // Loop through each word in the phrase
  for (let wordIndex = 0; wordIndex < words.length; wordIndex++) {
    const word = words[wordIndex];

    const stem = getStem(word);
    const endingIndex = getEndingIndex(word);

    // Loop through each pronoun
    for (let pronounIndex = 0; pronounIndex < pronouns.length; pronounIndex++) {
      conjugatedPhrases[pronounIndex] +=
        endingIndex === -1
          ? // If the word is not a verb, add it to the conjugation
            word
          : // Otherwise, add the conjugated verb
            stem + conjugations[pronounIndex][endingIndex];

      // Add a space if it's not the last word
      if (wordIndex < pronouns.length - 1)
        conjugatedPhrases[pronounIndex] += ' ';
    }
  }

  // Update the conjugations in the table
  for (let i = 0; i < conjugatedPhrases.length; i++) {
    pronouns[i].innerHTML = conjugatedPhrases[i];
  }
}
