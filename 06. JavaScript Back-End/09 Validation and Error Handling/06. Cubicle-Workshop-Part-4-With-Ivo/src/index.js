const express = require("express");
const cookieParser = require("cookie-parser");

const routes = require("./routes");
const config = require("./config");
const errorHandler = require("./middlewares/errorHandlerMiddleware");
const authMiddleware = require("./middlewares/authMiddleware");
const setupViewEngine = require("./config/viewEngine");
const initDatabase = require("./config/databaseInit");

const app = express();
setupViewEngine(app);
//require("./config/viewEngine")(app);

app.use(express.static("src/public"));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false })); //return middleware which create cube
app.use(authMiddleware.authentication);
app.use(routes);
app.use(errorHandler);

initDatabase()
  .then(() =>
    app.listen(config.PORT, () =>
      console.log(`Server is running on port ${config.PORT}...`)
    )
  )
  .catch((err) => console.error(err.message));
