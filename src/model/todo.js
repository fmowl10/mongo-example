const mongoose = require('mongoose');

const Todo = new mongoose.Schema({
    task: { type: String, required: true },
    isDone: { type: Boolean, default: false }
}, { versionKey: false });

Todo.statics.create = function (payload) {
    const todo = new this(payload);
    return todo.save();
};

Todo.statics.findAll = function () {
    return this.find({});
};


module.exports = mongoose.model("Todo", Todo);