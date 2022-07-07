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
  const response = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/vvWs1Ixtvq0jjWqoMEOc/likes', {
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
  const response = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/vvWs1Ixtvq0jjWqoMEOc/likes', {
    method: 'GET',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  const object = await response.json();
  // console.log(object);
  const id = `like${item}`;
  for (let i = 0; i < object.length; i += 1) {
    if (object[i].item_id === id) {
      return object[i].likes;
    }
  }
  return 0;
};

module.exports = { getItemData, createLike, getLike };