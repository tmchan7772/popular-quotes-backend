// eslint-disable-next-line no-unused-vars
function useErrorHandler(err, _req, res, _next) {
  // err stack should be stored somewhere with unique id
  const errorId = `${Math.random()}`;
  // eslint-disable-next-line no-console
  console.error(errorId + err.stack);

  const errMessage = err.isCustom
    ? err.message
    : `Error occured. Please send this code to administrator to fix: ${errorId}`;

  res.status(err.status || 500).json({
    success: false,
    message: errMessage,
  });
}

export default useErrorHandler;
