import chai from 'chai';
import validateRequiredFields from '../../../src/utils/validation.js';

const { expect } = chai;

describe('Utils.validation', () => {
  it('validateRequiredFields should return empty array', () => {
    const obj = { propA: 123 };

    const result = validateRequiredFields(obj, ['propA']);

    expect(result.length).to.equal(0);
  });

  it('validateRequiredFields should return array for undefined props', () => {
    const obj = { propA: undefined };
    const expectedResult = ['propA', 'propB'];

    const result = validateRequiredFields(obj, ['propA', 'propB']);

    expect(result).to.deep.equal(expectedResult);
  });

  it('validateRequiredFields should return array for null props', () => {
    const obj = { propA: null };
    const expectedResult = ['propA'];

    const result = validateRequiredFields(obj, ['propA']);

    expect(result).to.deep.equal(expectedResult);
  });

  it('validateRequiredFields should not return array for prop === 0', () => {
    const obj = { propA: 0 };

    const result = validateRequiredFields(obj, ['propA']);

    expect(result.length).to.equal(0);
  });
});
