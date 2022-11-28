const body = document.querySelector('body');
const cards = document.querySelector('.cards');
const line = document.querySelector('.line');
const buttonAdd = document.querySelector('.button__add');
const scroll = document.querySelector('.scroll');
let activeButtonFill = false;
let numberCard = 0;

const loaderCard = () => {
  buttonAdd.disabled = true;

  if ((window.outerWidth >= 744 && window.outerWidth < 1200 && cards.children.length >= 2) || (window.outerWidth >= 1200 && cards.children.length >= 4)) {
    line.insertAdjacentHTML('beforeend', `
      <img class="loader" src="./images/loader.jpg" alt="loader">
    `)
  } else {
    cards.insertAdjacentHTML('beforeend', `
      <img class="loader" src="./images/loader.jpg" alt="loader">
    `)
  }
}

const addCard = () => {
  setTimeout(() => {
    document.querySelector('.loader').remove();
    if ((window.outerWidth >= 744 && window.outerWidth < 1200 && cards.children.length >= 2) || (window.outerWidth >= 1200 && cards.children.length >= 4)) {
      line.insertAdjacentHTML('beforeend', `
      <div class="card card-${numberCard}" id='${numberCard}'>
        <div class="card__info">
          <h1 class="card__info-title">Заголовок ${numberCard}</h1>
          <p class="card__info-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ex mi, lacinia sit amet nisi non, facilisis condimentum enim. Duis ac quam auctor, vulputate est id, vulputate orci. Cras semper congue nibh, at aliquet sem sagittis nec. Sed dignissim nulla sit amet eleifend sagittis. Phasellus nec leo ac orci varius ultricies. Cras mollis facilisis enim. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
        <div class="card__control">
          <a href="#menu" class="button__card button__card--detail">Подробнее</a>
          <button class="button__card button__card--delete">Удалить</button>
        </div>
      </div>
    `)
    } else {
      cards.insertAdjacentHTML('beforeend', `
      <div class="card card-${numberCard}" id='${numberCard}'>
        <div class="card__info">
          <h1 class="card__info-title">Заголовок ${numberCard}</h1>
          <p class="card__info-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ex mi, lacinia sit amet nisi non, facilisis condimentum enim. Duis ac quam auctor, vulputate est id, vulputate orci. Cras semper congue nibh, at aliquet sem sagittis nec. Sed dignissim nulla sit amet eleifend sagittis. Phasellus nec leo ac orci varius ultricies. Cras mollis facilisis enim. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
        <div class="card__control">
          <a href="#menu" class="button__card button__card--detail">Подробнее</a>
          <button class="button__card button__card--delete">Удалить</button>
        </div>
      </div>
    `)
    }
    buttonAdd.disabled = false;
  }, 3000);
}

const addCardToLine = (amountCard) => {
  loaderCard();
    addCard();
    numberCard++;
  let quantityCards = setInterval(() => {
    loaderCard();
    addCard();
    numberCard++;
  }, 3050);
  setTimeout(() => {
    clearInterval(quantityCards)
  }, amountCard * 3050);
}


const findAmountCard = () => {
  let amountCard = cards.children.length + line.children.length;
  let findCorrectAmountCard = amountCard;
  let checkedCorrectAmountCard;

  if (window.outerWidth >= 1200) {
    while (checkedCorrectAmountCard !== 0) {
      findCorrectAmountCard++;
      checkedCorrectAmountCard = findCorrectAmountCard % 4;
    }
    return findCorrectAmountCard - 1;
  }

  if (window.outerWidth < 1200 && window.outerWidth >= 744) {
    while (checkedCorrectAmountCard !== 0) {
      findCorrectAmountCard++;
      checkedCorrectAmountCard = findCorrectAmountCard % 2;
    }
    console.log(findCorrectAmountCard - 1);
    return findCorrectAmountCard - 1;
  }

  if (window.outerWidth < 744) {
    return 1;
  }
}

const startAddCard = (activeButtonFill) => {
  if (activeButtonFill && numberCard <= findAmountCard() && window.outerWidth >= 1200) {
    addCardToLine(findAmountCard() - numberCard);
  } else if (activeButtonFill && numberCard < findAmountCard() && window.outerWidth < 1200 && window.outerWidth >= 744) {
    addCardToLine(findAmountCard() - numberCard);
  } else if (window.outerWidth < 744) {
    addCardToLine(findAmountCard());
  }
}

body.addEventListener('click', (e) => {
  const closeDetail = e.target.classList.contains('cross');
  let card = [...document.querySelectorAll('.card')];
  let lastCard = card.slice(-1)[0];

  switch (e.target.classList[1]) {
    case 'button__add':
      findAmountCard();
      loaderCard();
      addCard();
      numberCard++;
      break;
    
    case 'button__delete':
      if (card.length > 0) {
        document.getElementById(lastCard.id).remove();
        numberCard = card.length - 1;
      }
      break;
    
    case 'button__clear':
      card.forEach(ownCard => {
        if (!ownCard.classList.contains('card-1')) {
          ownCard.remove();
          numberCard = 1;
        }
      });
      activeButtonFill = false;
      break;
    
    case 'button__card--delete':
      const findId = e.target.parentNode.parentNode.id;
      document.getElementById(findId).remove();
      break;
    
    case 'button__fill':
      activeButtonFill = !activeButtonFill;
      startAddCard(activeButtonFill);
      findAmountCard();
      break;
    
    case 'button__card--detail':
      const cardInfoTitle = e.target.parentElement.parentElement.firstElementChild.firstElementChild.innerHTML;
      const cardInfoText = e.target.parentElement.parentElement.firstElementChild.lastElementChild.innerHTML;
    
      body.insertAdjacentHTML('beforeend', `
        <div class="container" id="menu">
          <div class="details">
            <a href="#" class="cross"></a>
            <div class="details__title">${cardInfoTitle}</div>
            <div class="details__text">${cardInfoText}</div>
          </div>
        </div>
      `)
      break;

    default:
      break;
  }

  if (closeDetail) {
    document.querySelector('.container').remove();
  }

  window.addEventListener('wheel', () => {
    if (activeButtonFill) {
      startAddCard(activeButtonFill);
      findAmountCard();
    }
  })
})
