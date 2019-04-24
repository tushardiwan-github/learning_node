const express = require('express');

const app = express();

app.use(express.json());

const courses = [
{id: 1 , name: 'JavaScript'},
{id: 2 , name: 'NodeJS'},
{id: 3 , name: 'Java'}
]

app.get('/', function(req,res){
    //code block
    res.send('Hello Node JS World!!!!');
});

app.get('/api/courses', function(req,res){
    //code block
    res.send(courses);
});


app.get('/api/courses/:id', function(req,res){
    let course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send('The course with given id is not found');
    res.send(course);
});

app.post('/api/courses', (req,res)=>{
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.listen(3000,()=>{console.log('Listening to port 3000...')})