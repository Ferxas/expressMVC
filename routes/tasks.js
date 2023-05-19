const express = require('express');
const router = express.Router();
const { Task, Category } = require('../models');

router.post('/', async (req, res) => {
    try {
        const task = await Task.create(req.body);
        req.json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:userId', async (req, res) => {
    try {
        const tasks = await Task.findAll({
            where: { userId: req.params.userId },
            include: [Category],
            
        });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.put('/:taskId', async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.taskId);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        task.completed = !task.completed;
        await task.save();
        res.json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.delete('/:taskId', async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.taskId);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        await task.destroy();
        res.sendStatus(204);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});