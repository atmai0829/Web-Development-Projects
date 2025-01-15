const express = require("express");
const app = express();

const apiRouter = require("./APIRoutes");
app.use(apiRouter);

const PORT = process.env.PORT || 3000;
// As our server to listen for incoming connections
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
