const { countItems } = require('./interactivityAPI.js');

describe('countItems function testing with array numbers', () => {
  test('Expect to return 5', () => {
    expect(countItems([12, 14, 500, 78, 12])).toEqual(5);
  });
  test('Expect to return 4', () => {
    expect(countItems([12, 14, 500, 12])).toEqual(4);
  });
  test('Expect to return 0', () => {
    expect(countItems([])).toEqual(0);
  });
  test('Expect to return 8', () => {
    expect(countItems([12, 14, 500, 78, 14, 75, 789, 20])).toEqual(8);
  });
});

describe('countItems function testing with array objects', () => {
  test('Expect to return 2', () => {
    expect(countItems([
      {
        comment: 'This is nice!',
        creation_date: '2021-01-10',
        username: 'John',
      },
      {
        comment: 'Great content!',
        creation_date: '2021-02-10',
        username: 'Jane',
      },
    ])).toEqual(2);
  });
  test('Expect to return 4', () => {
    expect(countItems([
      {
        comment: 'This is nice!',
        creation_date: '2021-01-10',
        username: 'John',
      },
      {
        comment: 'Great content!',
        creation_date: '2021-02-10',
        username: 'Jane',
      },
      {
        comment: 'This is nice!',
        creation_date: '2021-01-10',
        username: 'John',
      },
      {
        comment: 'Great content!',
        creation_date: '2021-02-10',
        username: 'Jane',
      },
    ])).toEqual(4);
  });
  test('Expect to return 6', () => {
    expect(countItems([{
      comment: 'This is nice!',
      creation_date: '2021-01-10',
      username: 'John',
    },
    {
      comment: 'Great content!',
      creation_date: '2021-02-10',
      username: 'Jane',
    }, {
      comment: 'This is nice!',
      creation_date: '2021-01-10',
      username: 'John',
    },
    {
      comment: 'Great content!',
      creation_date: '2021-02-10',
      username: 'Jane',
    },
    {
      comment: 'This is nice!',
      creation_date: '2021-01-10',
      username: 'John',
    },
    {
      comment: 'Great content!',
      creation_date: '2021-02-10',
      username: 'Jane',
    }])).toEqual(6);
  });
});