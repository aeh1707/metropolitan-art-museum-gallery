const getItemData = async (ObjectID) => {
  const URLrequest = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${ObjectID}`;
  const response = await fetch(URLrequest, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  const object = await response.json();
  const itemData = await {
    title: object.title,
    primaryImage: object.primaryImage,
    objectName: object.objectName,
    department: object.department,
    culture: object.culture,
    period: object.period,
  };
  return itemData;
};

const createLike = async (item) => {
  const response = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/uMLznOnNgrHL3E5Ojiko/likes', {
    method: 'POST',
    body: JSON.stringify({
      item_id: `like${item}`,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  const object = await response.text();
  return object;
};

const getLike = async (item) => {
  const response = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/uMLznOnNgrHL3E5Ojiko/likes', {
    method: 'GET',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  const object = await response.json();
  const id = `like${item}`;
  for (let i = 0; i < object.length; i += 1) {
    if (object[i].item_id === id) {
      return object[i].likes;
    }
  }
  return 0;
};

const countItems = (items) => items.length;

const createComment = async (itemId, username, comment) => {
  const date = new Date();
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let dt = date.getDate();

  if (dt < 10) {
    dt = `0${dt}`;
  }

  if (month < 10) {
    month = `0${month}`;
  }

  const creationDate = `${year}-${month}-${dt}`;
  const object = {
    creationDate,
    username,
    comment,
  };
  await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/uMLznOnNgrHL3E5Ojiko/comments', {
    method: 'POST',
    body: JSON.stringify({
      itemId,
      username,
      comment,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  return object;
};

const getComments = async (itemId) => {
  const response = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/uMLznOnNgrHL3E5Ojiko/comments?item_id=${itemId}`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  const object = await response.json();
  return object;
};

module.exports = {
  getItemData, createLike, getLike, countItems, createComment, getComments,
};