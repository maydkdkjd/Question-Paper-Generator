const express = require("express")
const path = require("path")
const questions = require("./Questions.json")
const app = express();

const p = path.join(__dirname, "/public")
console.log(p);

app.use(express.static(p));

// Designing the API
app.get("/questions", (req, res) => {
    res.send(JSON.stringify(questions))
})

app.listen(5500, () => {
    console.log("Port is running at 5500");
})