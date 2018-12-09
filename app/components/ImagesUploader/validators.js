import isEmpty from 'lodash/isEmpty';

const validator = (rule, value, callback) => {
  if (rule.required) {
    if (!isEmpty(value)) {
      callback();
      return;
    }
    callback('Es requerida al menos una imagen');
  }
  callback();
};

export default validator;
