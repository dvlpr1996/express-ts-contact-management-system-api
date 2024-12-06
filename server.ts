import app from './src/app';

const PORT = process.env.PORT || 8000;
const APP_URL = process.env.APP_URL || "localhost";

app.listen(PORT, () => {
  console.log(`Server is running on port ${APP_URL}:${PORT}`);
});
