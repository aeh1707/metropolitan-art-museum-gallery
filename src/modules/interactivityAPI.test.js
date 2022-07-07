const { countItems } = require('./interactivityAPI.js');

describe('countItems function testing', () => {
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