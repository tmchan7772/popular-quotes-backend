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
