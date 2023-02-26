const responseAccountHandler = (
  success,
  data,
  statusCode,
  errorTypeEmail,
  errorTypeSelect,
  errorTypePhoneNumber,
) => ({
  successStatus: success,
  data,
  statusCode,
  messageErrorEmail: errorTypeEmail || null,
  messageErrorSelect: errorTypeSelect || null,
  messageErrorPhone: errorTypePhoneNumber || null,
});

module.exports = { responseAccountHandler };
