import './index.css';

const {
  getItemData, createLike, getLike, countItems, createComment, getComments,
} = require('./modules/interactivityAPI.js');

const items = [500, 501, 499, 498, 496, 1000, 1010, 1020];
const main = document.querySelector('main');
const popupsContainer = document.querySelector('.popups-container');
const likeBtns = [];
const commentBtns = [];
const popups = [];
const xBtns = [];
const submitBtns = [];
const inputUsers = [];
const inputComments = [];
const commentsContainers = [];
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
                <div class="comments-container${items[i]}">
                    <article class="comment"></article>
                </div>
                <h3>Add a comment</h3>
                <form action="">
                    <input type="text" id="username${items[i]}" name="usernme" placeholder="Usernme" required>
                    <textarea type="text" id="commentpop${items[i]}" name="comment" rows="4" cols="50" placeholder="Comment" required></textarea>
                    <button id='submitComment${items[i]}' type="submit">Comment</button>
                </form>
            </section>
        </article>`;
    popupsContainer.appendChild(popup);
    commentBtns[i] = document.querySelector(`#comment${items[i]}`);
    commentsContainers[i] = document.querySelector(`.comments-container${items[i]}`);
    xBtns[i] = document.querySelector(`.fa${items[i]}`);
    submitBtns[i] = document.querySelector(`#submitComment${items[i]}`);
    inputUsers[i] = document.querySelector(`#username${items[i]}`);
    inputComments[i] = document.querySelector(`#commentpop${items[i]}`);
    popups[i] = document.querySelector(`.popup${items[i]}`);
    commentBtns[i].addEventListener('click', () => {
      popups[i].classList.remove('hide');
      xBtns[i].addEventListener('click', () => {
        popups[i].classList.add('hide');
      });
      //
      getComments(items[i]).then((comments) => {
        for (let j = 0; j < comments.length; j += 1) {
          const commentPop = comments[j];
          const cmnt = document.createElement('article');
          cmnt.classList.add('comment');
          cmnt.innerHTML = `${commentPop.creationDate}, ${commentPop.username}: ${commentPop.comment}`;
          commentsContainers[i].appendChild(cmnt);
        }
      });
      //
      submitBtns[i].addEventListener('click', (e) => {
        e.preventDefault();
        createComment(items[i], inputUsers[i].value, inputComments[i].value).then((comment) => {
          const comment1 = comment;
          const cmnt1 = document.createElement('article');
          cmnt1.classList.add('comment');
          cmnt1.innerHTML = `${comment1.creationDate}, ${comment1.username}: ${comment1.comment}`;
          commentsContainers[i].appendChild(cmnt1);
        });
      });
    });
  });
}

itemsCountsFiled.textContent = itesmsCount;