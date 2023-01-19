function notFoundHandler(req, res) {
  res.status(404).json('Not found');
}

export default notFoundHandler;
