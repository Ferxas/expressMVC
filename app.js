const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('')

const app = express();

app.use(bodyParser.json());

const userRoutes = require('./routes/users');
const taskRoutes = require('./routes/tasks');

app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);


sequelize.sync().then(() => {
    console.log('Database and tables created');
});

const PORT = 4000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



