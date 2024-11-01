const express = require('express');
const routes = require('./routes/routes');
const app = express();

app.use(express.json())
app.use(routes);
app.get("/", (req, res) => {
    return res.json({ message: "Hello World" });
});

app.listen(3001, () => {
    console.log("Server is running on port 3000");
});