/**
 * Validates object properties based on rules defined for each field. Returns
 * an error object with a message for each property that fails validation.
 */
export function validate(obj, fields) {
  const errors = {};
  Object.keys(fields).forEach((name) => {
    const field = fields[name];
    if (typeof field.isValid === 'function' && !field.isValid(obj[name])) {
      errors[name] = field.error;
    }
  });
  return errors;
}

/**
 * Tests whether a string is empty or contains only spaces.
 */
export function notBlank(str) {
  return !!(str && str.trim());
}
