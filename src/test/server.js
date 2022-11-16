import express from "../main.js";

const app = express();
app.use((req, res, next) => {
  console.log("Middleware");
  next();
});

app.get("/", (req, res) => {
  res.end("Hello World");
});

const router = app.Router();
router.use((req, res, next) => {
  console.log("subRoute Middleware");
  next();
});

router
  .route("/")
  .get((req, res) => {
    res.end("GET");
  })
  .post((req, res) => {
    res.end("POST");
  });

app.use("/test", router);
app.all(".*", (req, res) => {
  res.end("404");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
