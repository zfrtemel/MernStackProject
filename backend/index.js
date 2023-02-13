const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./src/Models')


db.mongoose
.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Connected to the database!");
})
.catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
});

app.use(cors({
    origin: '*'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', require('./src/Routes/UserRoutes'));
app.use('/api/goals', require('./src/Routes/GoalRoutes'));

app.listen(8080, () => {
    console.log(`Server started on port 8080`);
});
