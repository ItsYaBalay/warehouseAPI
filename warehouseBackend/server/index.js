const { app } = require("../src/share");
const PORT = process.env.PORT || 3001;

const cors = require("cors");
app.use(cors());

app.listen(PORT, () => {
  console.log(`I am listening on PORT number ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Does this work");
});

const routes = require("../src/routes/routes");
app.use("/api/products", routes);