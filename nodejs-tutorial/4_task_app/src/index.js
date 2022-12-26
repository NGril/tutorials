// APP entry point where we are running the express server, separate from app definition for testing purposes
const app = require("./app");

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
