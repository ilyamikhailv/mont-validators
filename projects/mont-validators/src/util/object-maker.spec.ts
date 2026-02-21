import { toValidationError, nullError } from './object-maker';

describe('object-maker', () => {
  describe('toValidationError', () => {
    it('should create error with key and message', () => {
      const result = toValidationError('email', { message: 'Invalid' }, []);
      expect(result.email).toBeDefined();
      expect(result.email?.message).toBe('Invalid');
      expect(result.email?.refValues).toEqual([]);
    });

    it('should replace {{0}} placeholder with first value', () => {
      const result = toValidationError('minNumber', { message: 'Min is {{0}}' }, [10]);
      expect(result.minNumber?.message).toBe('Min is 10');
      expect(result.minNumber?.refValues).toEqual([10]);
    });

    it('should replace {{0}} and {{1}} placeholders', () => {
      const result = toValidationError(
        'choice',
        { message: 'Between {{0}} and {{1}}' },
        [2, 5]
      );
      expect(result.choice?.message).toBe('Between 2 and 5');
      expect(result.choice?.refValues).toEqual([2, 5]);
    });

    it('should handle Date values with toISOString', () => {
      const date = new Date('2025-01-15T12:00:00.000Z');
      const result = toValidationError('date', { message: 'Date: {{0}}' }, [date]);
      expect(result.date?.message).toBe('Date: 2025-01-15T12:00:00.000Z');
      expect(result.date?.refValues).toEqual([date]);
    });

    it('should handle undefined message', () => {
      const result = toValidationError('test', {}, ['value']);
      expect(result.test?.message).toBe('');
      expect(result.test?.refValues).toEqual(['value']);
    });

    it('should handle null/undefined in values', () => {
      const result = toValidationError('test', { message: '{{0}}' }, [null]);
      expect(result.test?.message).toBe('');
      expect(result.test?.refValues).toEqual([null]);
    });
  });

  describe('nullError', () => {
    it('should return null', () => {
      expect(nullError()).toBeNull();
    });
  });
});
