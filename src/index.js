import './index.css';

const {
  getItemData, createLike, getLike, countItems,
} = require('./modules/interactivityAPI.js');

const items = [500, 501, 499, 498, 496, 1000, 1010, 1020];
const main = document.querySelector('main');
const likeBtns = [];
const nLikesStat = {};
const itesmsCount = countItems(items);
const itemsCountsFiled = document.querySelector('header .items-count span');
main.innerHTML = '';

for (let i = 0; i < items.length; i += 1) {
  getItemData(items[i]).then((itemData) => {
    const article = document.createElement('article');
    article.innerHTML = `<img src="${itemData.primaryImage}" alt="">
    <div class="card-body">
      <div class="card-head">
        <h2>${itemData.title}</h2>
        <div class="likes">
          <i id="like${items[i]}" class="fa-solid fa-heart"></i>
          <div id='nLikes${items[i]}'>0</div>
        </div>
      </div>
      <div class="card-content">
        <button id='comment${items[i]}' type="menu">Comments</button>
      </div>
    </div>
    `;
    main.appendChild(article);
    likeBtns[i] = document.querySelector(`#like${items[i]}`);
    nLikesStat[`like${items[i]}`] = document.querySelector(`#nLikes${items[i]}`);
    likeBtns[i].addEventListener('click', (e) => {
      e.preventDefault();
      createLike(items[i]);
      // updating the like
      getLike(items[i]).then((likes) => {
        nLikesStat[`like${items[i]}`].textContent = likes;
      });
    });
    // inititialzing
    getLike(items[i]).then((likes) => {
      nLikesStat[`like${items[i]}`].textContent = likes;
    });
  });
}

itemsCountsFiled.textContent = itesmsCount;