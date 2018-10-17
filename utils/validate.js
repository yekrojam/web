/**
 * Validates object properties based on rules defined for each field. Returns
 * an error object with a message for each property that fails validation.
 */
export default function validate(obj, fields) {
  const errors = {};
  Object.keys(fields).forEach((name) => {
    const field = fields[name];
    if (typeof field.isValid === 'function' && !field.isValid(obj[name])) {
      errors[name] = field.error;
    }
  });
  return errors;
}
