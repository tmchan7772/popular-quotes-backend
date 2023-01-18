function generateToken() {
  // TODO; implmement
  const now = new Date();
  now.setHours(now.getHours() + 1);

  return {
    value: 'abcd',
    expiredIn: now.getTime(),
  };
}

export default generateToken;
