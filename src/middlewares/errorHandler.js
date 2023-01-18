/**
 * Global error handler
 * Respond with status 500 if not specified.
 * Show default error message if err.message is not specified
 * @param  {} err
 * @param  {} _req
 * @param  {} res
 * @param  {} _next
 */
function useErrorHandler(err, _req, res, _next) {
  const errMessage = err.isCustom
    ? err.message
    : 'Some error occured. Please try again';

  res.status(err.status || 500).json({
    success: false,
    message: errMessage,
  });
}

export default useErrorHandler;
