const router = require('express').Router();
const Todo = require('./model/todo');

router.get('/', (req, res) => {
    Todo.findAll()
        .then((todos) => {
            res.send(todos);
        });
});
router.get('/:id', (req, res) => {
    Todo.findById(req.params.id)
        .then(todo => res.send(todo))
});

router.post('/', (req, res) => {
    Todo.create(req.body)
        .then(todo => res.send(todo));
});

router.put('/:id', (req, res) => {
    Todo.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(todo => res.send(todo));
});

router.delete('/:id', (req, res) => {
    Todo.findByIdAndDelete(req.params.id).then(todo => { console.log(todo); res.send(todo); });
})

module.exports = router;