const router = require('express').Router();
const Todo = require('./model/todo');

router.get('/', async (req, res) => {
    res.send(await Todo.findAll().exec());
});

router.get('/:id', async (req, res) => {
    res.send(await Todo.findById(req.params.id).exec());
});

router.post('/', async (req, res) => {
    res.send(await Todo.create(req.body));
});

router.put('/:id', async (req, res) => {
    res.send(await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true }).exec());
});

router.delete('/:id', async (req, res) => {
    res.send(await Todo.findByIdAndDelete(req.params.id).exec());
})

module.exports = router;