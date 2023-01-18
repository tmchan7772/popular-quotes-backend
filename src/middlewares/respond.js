/**
 * Patch response with a 'respond' function to simplify successful execution
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
function patchResponse(req, res, next) {
  res.respond = (data = {}, success = true) => {
    res.json({
      success,
      data,
    });
  };

  next();
}

export default patchResponse;
