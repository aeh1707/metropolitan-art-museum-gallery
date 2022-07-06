import './index.css';

const { getItemData } = require('./modules/interactivityAPI.js');

const items = [500, 501, 499, 498, 496, 1000, 1010, 1020];
const main = document.querySelector('main');
main.innerHTML = '';

for (let i = 0; i < items.length; i += 1) {
  getItemData(items[i]).then((itemData) => {
    main.innerHTML += `
      <article>
        <img src="${itemData.primaryImage}" alt="">
        <div class="card-body">
          <div class="card-head">
            <h2>${itemData.title}</h2>
            <i class="fa-regular fa-heart"></i>
          </div>
          <div class="card-content">
            <button type="menu">Comments</button>
          </div>
        </div>
      </article>`;
  });
}
