// @flow

type Field = {
  error?: string,
  isValid?: Function,
  name: string,
};

/**
 * Validates object properties based on rules defined for each field. Returns
 * an error object with a message for each property that fails validation.
 */
export function validate(obj: Object, fields: Array<Field>): Object {
  const errors = {};
  fields.forEach(({ error, isValid, name }) => {
    if (isValid && !isValid(obj[name])) {
      errors[name] = error;
    }
  });
  return errors;
}

/**
 * Tests whether a string is empty or contains only spaces.
 */
export function notBlank(str: string): bool {
  return !!(str && str.trim());
}
