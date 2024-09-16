require("dotenv").config();

require("./database/client").checkConnection();

const app = require("./app/config");

const port = process.env.APP_PORT;

app
  .listen(port, () => {
    console.info(`Server is listening on port ${port}`);
  })
  .on("error", (err) => {
    console.error("Error:", err.message);
  });
