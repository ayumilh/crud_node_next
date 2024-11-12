const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// C
router.post('/todos', async (req, res) => {
    const {name} = req.body;
    try{
        if(!name){
            return res.status(400).json({error: "Name is required"})
        }

        const todo = await prisma.todo.create({
            data: {
                name: name,
                status: false
            }
        });
        return res.status(201).json(todo);
    } catch (error){
        return res.status(500).json({error: "Internal Server Error"});
    }
})

// R
router.get('/todos', async (req, res) => {
    const todos = await prisma.todo.findMany();
    return res.status(201).json(todos);
});

// U 
router.put("/todos", async (req, res) => {
    const {id, status, name} = req.body;
    try{
        if(!id) return res.status(400).json({error: "Id are required"});

        const todoAlreadyExists = await prisma.todo.findUnique({
            where: {
                id: id
            }
        });

        if(!todoAlreadyExists) return res.status(400).json({error: "Todo not found"});

        const todo = await prisma.todo.update({
            where: { id: id },
            data: {
                name: name,
                status: status
            }
        });
        return res.status(201).json(todo);
    } catch (error){
        return res.status(500).json({error: "Internal Server Error"});
    }
})

// D
router.delete("/todos/:id", async (req, res) => {
    const {id} = req.params;
    const intId = parseInt(id);
    try{
        if(!intId) return res.status(400).json({error: "Id are required"});

        const todoAlreadyExists = await prisma.todo.findUnique({ where: { id: intId }});

        if(!todoAlreadyExists) return res.status(400).json({error: "Todo not found"});

        await prisma.todo.delete({ where: { id: intId } });

        return res.status(201).json({message: "Todo deleted"});
    } catch (error){
        return res.status(500).json({error: "Internal Server Error"});
    }
})

module.exports = router;