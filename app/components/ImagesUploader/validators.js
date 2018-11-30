import isEmpty from 'lodash/isEmpty';

const validator = (rule, value, callback) => {
  if (rule.required) {
    if (!isEmpty(value)) {
      callback();
      return;
    }
    callback('Image is required');
  }
  callback();
};

export default validator;
