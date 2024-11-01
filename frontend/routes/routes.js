const express = require('express');
const router = express.Router();

const allTodos = [{nome: "Chegando na raiz", status: false}]

// C
router.post('/create', (req, res) => {
    return res.json({ message: "Create" });
}); 

router.post('/todos', (req, res) => {
    const {name} = req.body;
    allTodos.push({name, status: false});
    return res.status(201).json(allTodos);
})

// R
router.get('/todos', (req, res) => {
    return res.status(201).json(allTodos);
});
// U 
// D
module.exports = router;