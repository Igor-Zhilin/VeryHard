const port = 3000;
const express = require("express");
const { SequelizeCreate } = require("./models/config.js");
const index_router = require("./routes/index_router");
const admin_router = require("./routes/admin_router");
const auth_router = require("./routes/auth_router");
const bodyParser = require("body-parser");
const session = require("express-session");
const app = express();

app.use(
    session({
        secret: "my-secret",
        resave: false,
        name: "my-session-name",
        saveUninitialized: true,
        cookie: { maxAge: 86400000 },
        store: new session.MemoryStore({
            checkPeriod: 86400000,
        }),
        maxContentLength: "50mb",
    })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", index_router);
app.use("/admin", admin_router);
app.use("/auth", auth_router);
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.static("public"));

// app.use(bodyParser.json());

app.listen(port, async () => {
    await SequelizeCreate.sync({ force: false });
    console.log(`Server started on port ${port}`);
});
