const { add, sub, mul, div } = require('../calculator');

describe('Calculator functions', () => {
  describe('Addition', () => {
    test('2 + 3 = 5', () => {
      expect(add([2, 3])).toBe(5);
    });

    test('multiple operands', () => {
      expect(add([1, 2, 3, 4])).toBe(10);
    });

    test('string numbers', () => {
      expect(add(['2', '3'])).toBe(5);
    });
  });

  describe('Subtraction', () => {
    test('10 - 4 = 6', () => {
      expect(sub([10, 4])).toBe(6);
    });

    test('left-to-right multiple', () => {
      expect(sub([20, 5, 3])).toBe(12); // 20 - 5 - 3 = 12
    });

    test('single operand returns the operand', () => {
      expect(sub([7])).toBe(7);
    });
  });

  describe('Multiplication', () => {
    test('45 * 2 = 90', () => {
      expect(mul([45, 2])).toBe(90);
    });

    test('multiple operands', () => {
      expect(mul([2, 3, 4])).toBe(24);
    });
  });

  describe('Division', () => {
    test('20 / 5 = 4', () => {
      expect(div([20, 5])).toBe(4);
    });

    test('left-to-right multiple', () => {
      expect(div([100, 2, 5])).toBe(10); // 100 / 2 / 5 = 10
    });

    test('division by zero throws', () => {
      expect(() => div([10, 0])).toThrow('Division by zero');
    });

    test('string numbers', () => {
      expect(div(['20', '5'])).toBe(4);
    });
  });
});
