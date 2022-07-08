import './index.css';

const {
  getItemData, createLike, getLike, countItems,
} = require('./modules/interactivityAPI.js');

const items = [500, 501, 499, 498, 496, 1000, 1010, 1020];
const main = document.querySelector('main');
const popupsContainer = document.querySelector('.popups-container');
const likeBtns = [];
const commentBtns = [];
const popups = [];
const xBtns = [];
const nLikesStat = {};
const itesmsCount = countItems(items);
const itemsCountsFiled = document.querySelector('header .items-count span');
main.innerHTML = '';
popupsContainer.innerHTML = '';

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

    const popup = document.createElement('div');
    popup.innerHTML = `
    <article class="popup popup${items[i]} hide">
            <i class="fa-solid fa-x fa-2xl fa${items[i]}"></i>
            <img src="${itemData.primaryImage}" alt="">
            <section>
                <h2>${itemData.title}</h2>
                <ul>
                    <li>Tags: ${itemData.objectName}</li>
                    <li>Departement: ${itemData.department}</li>
                </ul>
            </section>
            <section>
                <h3>Comments (<span></span>)</h3>
                <div class="comments-container">
                    <article class="comment">comment 1</article>
                    <article class="comment">comment 2</article>
                </div>
                <h3>Add a comment</h3>
                <form action="">
                    <input type="text" id="username" name="usernme" placeholder="Usernme" required>
                    <textarea type="text" id="comment" name="comment" rows="4" cols="50" placeholder="Comment" required></textarea>
                    <button type="submit">Comment</button>
                </form>
            </section>
        </article>`;
    popupsContainer.appendChild(popup);
    commentBtns[i] = document.querySelector(`#comment${items[i]}`);
    xBtns[i] = document.querySelector(`.fa${items[i]}`);
    popups[i] = document.querySelector(`.popup${items[i]}`);
    commentBtns[i].addEventListener('click', () => {
      popups[i].classList.remove('hide');
      xBtns[i].addEventListener('click', () => {
        popups[i].classList.add('hide');
      });
    });
  });
}

itemsCountsFiled.textContent = itesmsCount;