import { validate } from './MessageResponse';

test('MessageResponse validation function returns success when message is valid', () => {
  const message = {
    message: 'This is a message.',
  };
  const { success, errors } = validate(message);
  expect(success).toBe(true);
  expect(errors).toBe(null);
});

test('MessageResponse validation function returns errors when message is not an object', () => {
  const message = 'This is a message.';
  const { success, errors } = validate(message);
  expect(success).toBe(false);
  expect(errors).not.toBe(null);
});

test('MessageResponse validation function returns errors when message is missing', () => {
  const message = {
    message: '',
  };
  const { success, errors } = validate(message);
  expect(success).toBe(false);
  expect(errors).not.toBe(null);
});

test('MessageResponse validation function returns errors when message is not a string', () => {
  const message = {
    message: 1,
  };
  const { success, errors } = validate(message);
  expect(success).toBe(false);
  expect(errors).not.toBe(null);
});