/**
 * Patch response with a 'respond' function to simplify successful execution
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
function patchResponse(req, res, next) {
  res.respond = (data = {}, success = true, status = 200) => {
    res.status(status);
    res.json({
      success,
      data,
    });
  };

  next();
}

export default patchResponse;
