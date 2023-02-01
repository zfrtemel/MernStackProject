const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', require('./src/Routes/UserRoutes'));
app.use('/api/goals', require('./src/Routes/GoalRoutes'));

app.listen(8080, () => {
    console.log(`Server started on port ${port}`)
});