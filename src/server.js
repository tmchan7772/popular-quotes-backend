import app from './app.js';

const port = process.env.SERVER_PORT || 8000;

app.listen(port, (err) => {
  if (err) {
    console.log('Server start is failed');
    process.exit(1);
  }

  console.log('Server is started');
});
