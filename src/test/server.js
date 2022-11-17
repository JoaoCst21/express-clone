import express from "../main.js";

const app = express();
app.use((req, res) => {
  res.end("Hello World");
});

app.all("/test", (req, res) => {
  res.end("Hello World All");
});

const router = app.Router();

router
  .route("/test/:id")
  .get((req, res) => {
    res.end("Hello World Router");
  })
  .post((req, res) => {
    res.end("Hello World Router Post");
  });

app.use("/test", router);

app.use("/test", (req, res) => {
  res.end("Hello World 2");
});

// console.log(app.arrayMiddlewares);
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
