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

// Change this when adding images to the public/images folder
const NUMBER_OF_IMAGES = 4;

// --------------------------------------------------
const pronouns = document.getElementsByClassName('conjugation');

const tenseSelector = document.getElementById('tense-selector');
const vosotrosCheckbox = document.getElementById('vosotros-checkbox');

const conjugationTable = document.getElementById('conjugation-table');
const phraseInput = document.getElementById('phrase-input');

const modal = document.getElementById('modal');
const screenshot = document.getElementById('screenshot');
const downloadLink = document.getElementById('download-link');

const toggleModal = () => modal.classList.toggle('show-modal');
window.addEventListener('click', (e) => {
  if (e.target === modal) toggleModal();
});

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

function getConjugations() {
  // Get the conjugations of the selected tense
  switch (tenseSelector.value) {
    case '0':
      return indicativoPresente;
    case '1':
      return indicativoPreterito;
    case '2':
      return indicativoImperfecto;
    case '3':
      return indicativoFuturo;
    case '4':
      return subjunctivoPresente;
  }
}

function replaceVosotros() {
  const vosotrosCell = pronouns[3];
  const fileNumber = Math.floor(Math.random() * NUMBER_OF_IMAGES);

  vosotrosCell.innerHTML = `<img src="public/images/${fileNumber}.png" class="goofy-img"/>`;
  vosotrosCell.style.padding = '0';
}

function conjugate() {
  const phrase = phraseInput.value.toLowerCase();
  const words = phrase.split(' ');

  const useVosotros = vosotrosCheckbox.checked;

  const conjugations = getConjugations();

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

  // Replace vosotros/as with a goofy image if checkbox is unchecked
  if (!useVosotros) replaceVosotros();
}

function saveAsImage() {
  // ! value of phraseInput is rendered weirdly in the screenshot

  // Show the modal
  toggleModal();

  // Save an image and display it in the modal (with download link)
  html2canvas(conjugationTable).then((canvas) => {
    const uri = canvas.toDataURL();

    screenshot.src = uri;
    downloadLink.href = uri;
  });
}
