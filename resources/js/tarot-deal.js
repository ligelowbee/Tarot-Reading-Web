const imageDir = 'resources/images/'

const cardDecks = [
  '1760_Nicolas_Conver',
  '1880_Carlo_Dellarocca',
  '1909_Rider-Waite-Smith',
  '2010_Yoav_Ben-Dov',
];

const cardCodes = [
    'B01', 'B02', 'B03', 'B04', 'B05', 'B06', 'B07',
    'B08', 'B09', 'B10', 'B11', 'B12', 'B13', 'B14',
    'C01', 'C02', 'C03', 'C04', 'C05', 'C06', 'C07',
    'C08', 'C09', 'C10', 'C11', 'C12', 'C13', 'C14',
    'D01', 'D02', 'D03', 'D04', 'D05', 'D06', 'D07',
    'D08', 'D09', 'D10', 'D11', 'D12', 'D13', 'D14',
    'S01', 'S02', 'S03', 'S04', 'S05', 'S06', 'S07',
    'S08', 'S09', 'S10', 'S11', 'S12', 'S13', 'S14',
    'T00', 'T01', 'T02', 'T03', 'T04', 'T05', 'T06',
    'T07', 'T08', 'T09', 'T10', 'T11', 'T12', 'T13',
    'T14', 'T15', 'T16', 'T17', 'T18', 'T19', 'T20',
    'T21'
];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    };
};

function getRandomCards(count) {
    shuffleArray(cardCodes);
    return cardCodes.slice(0, count);
};

function getRandomDeck() {
    shuffleArray(cardDecks);
    return cardDecks[0];
};

function dealCard(cardDiv) {
    const backingRect = cardBacking.getBoundingClientRect();
    const cardRect = cardDiv.getBoundingClientRect();
    var xdiff = backingRect.left - cardRect.left;
    var ydiff = backingRect.top - cardRect.top; 
    cardDiv.animate([{
        transformOrigin: 'top left',
        transform: `translate(${xdiff}px, ${ydiff}px)`
    }, {
        transformOrigin: 'left center',
        transform: 'rotateY(60deg)'
    }, {
        transformOrigin: 'top left',
        transform: 'none'
    }], {
        duration: 600,
    });
};

var cardNum = 1
function showCard() {
    if (cardNum == numCards+2) { location.reload(); };
    if (cardNum == numCards+1) { 
        cardBacking.style.opacity = "0.6"; 
        cardNum++; 
        return;
    };
    var cardCode = selectedCardCodes[cardNum-1];
    const cardDiv = document.getElementById('card-'+cardNum);

    const cardInnerDiv = document.createElement('div');
    cardInnerDiv.classList.add('card-inner');
    cardInnerDiv.addEventListener('click', function () {
        cardInnerDiv.classList.toggle('is-flipped');
    });

    const cardFrontDiv = document.createElement('div');
    cardFrontDiv.classList.add('card-front');

    const cardBackDiv = document.createElement('div');
    cardBackDiv.classList.add('card-back');

    const image = document.createElement('img');
    if (Math.random() < 0.5 ) {
        image.style.transform = "rotate(180deg)";
    }
    image.src = imageDir + selectedDeck + '/' + cardCode + '.jpg';
    image.alt = image.src;
    switch (selectedDeck) {
        case '1909_Rider-Waite-Smith':
            cardBackDiv.innerHTML = waiteMeanings[cardCode];
            break;
        case '1943_Crowley-Harris_Thoth':
            cardBackDiv.innerHTML = crowleyMeanings[cardCode];
            break;
        default:
            cardBackDiv.innerHTML = bendovTdmMeanings[cardCode];
            break;
    }
    cardFrontDiv.appendChild(image);
    cardInnerDiv.appendChild(cardFrontDiv);
    cardInnerDiv.appendChild(cardBackDiv);
    cardDiv.appendChild(cardInnerDiv);
    dealCard(cardDiv); 
    cardNum++;
};

const selectedDeck = getRandomDeck();

const deckTitle = document.getElementById('deck-title');
deckTitle.innerHTML = selectedDeck.replace(/_/g,' ');
deckTitle.innerHTML = deckTitle.innerHTML.replace(/priv-/g,'');

const backingImage = document.getElementById('backing-image');
const cardBacking = document.getElementById('card-backing')
backingImage.src = imageDir + selectedDeck + '/XBA.jpg';
backingImage.alt = backingImage.src;
backingImage.addEventListener('click', function () {showCard();} );

switch (document.title.split(' - ')[1]) {
    case 'Celtic Cross':
        var numCards = 10;
        break;
    default:
        var numCards = 1;
        break;
};
const selectedCardCodes = getRandomCards(numCards);

