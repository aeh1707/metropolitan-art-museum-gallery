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

module.exports = { getItemData };