import { SortByKeyPipe } from './sort-by-key.pipe';

describe('SortByKeyPipe', () => {
  let pipe;

  beforeEach(() => {
    pipe = new SortByKeyPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should alphabetically sort the object values using the keys', () => {
    const map = {
      c: 20,
      A: 40,
      a: 10,
      g: 15,
      e: 2,
    };
    const expected = [40, 10, 20, 2, 15];

    const results = pipe.transform(map);
    expect(results).toEqual(expected);
  });

  it('should return an empty array given a null or empty object', () => {
    let results = pipe.transform(null);
    expect(results).toEqual([]);

    results = pipe.transform({});
    expect(results).toEqual([]);

    results = pipe.transform();
    expect(results).toEqual([]);
  });
});
