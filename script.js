// yo, nosotros, tu, vosotros, el, ellos
const pronouns = document.getElementsByTagName('td');

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

function conjugate() {
  const word = document.getElementById('word').value.toLowerCase();

  const stem = getStem(word);
  const endingIndex = getEndingIndex(word);

  if (endingIndex === -1) return;

  for (let i = 0; i < pronouns.length; ++i) {
    pronouns[i].innerHTML = stem + indicativoPresente[i][endingIndex];
  }
}
