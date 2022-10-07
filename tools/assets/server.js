import express from 'express';
const app = express();
const port = 1337;

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.listen(port, () => {
    console.log(`Server just started on port ${port}`);
})
