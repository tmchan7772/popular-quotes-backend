/**
 * Validate required fields of source object
 * @param  {object} srcObject
 * @param  {Array<string>} requiredFields array of required fields
 * @returns {Array<string>} array of fields which do not pass validation
 */
function validateRequiredFields(srcObject, requiredFields) {
  return requiredFields.reduce((emptyFields, field) => {
    // check for undefined|null|''
    if (!srcObject[field] && srcObject[field] !== 0) {
      emptyFields.push(field);
    }

    return emptyFields;
  }, []);
}

export default validateRequiredFields;
