import { validate } from './ErrorResponse';

test('ErrorResponse', () => {
  const testVal = 'testVal';
  const validErrorResponses = [
    {
      message: 'This is a valid message.',
    },
    {
      message: 'This is another valid message.',
    },
    {
      message: 'This is a valid message, too.',
    },
    {
      message: `Let's test template strings. ${testVal}`,
    },
    {
      message: 'This is a valid message ' + 'with concatenation.',
    },
  ];

  const invalidErrorResponses = [
    {
      message: '',
    },
    {
      wrongKey: 'This is an invalid message.',
    },
    {
      message: 1,
    },
    'This is not even an object.',
    1,
    true,
    null,
    undefined,
  ];

  for (const valid of validErrorResponses) {
    const result = validate(valid);
    expect(result.success).toBe(true);
    expect(result.errors).toBeNull();
  }

  for (const invalid of invalidErrorResponses) {
    const result = validate(invalid);
    expect(result.success).toBe(false);
    expect(result.errors).not.toBeNull();
  }
});