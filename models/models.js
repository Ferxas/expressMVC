const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql',

});

const User = sequelize.define('user', {
    username: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
});

const Task = sequelize.define('task', {
    title: Sequelize.STRING,
    description: Sequelize.STRING,
    completed: Sequelize.BOOLEAN,
});

const Category = sequelize.define('category', {
    name: Sequelize.STRING,
    description: Sequelize.STRING,
});

// define relations

User.hasMany(Task);
Task.belongsTo(User);

Task.belongsToMany(Category, { through: 'TaskCategory' });
Category.belongsToMany(Task,  { thorugh: 'TaskCategory' });

module.exports = { User, Task, Category, sequelize };