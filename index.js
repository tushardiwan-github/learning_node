const express = require('express');
const Joi = require('joi');
const app = express();

app.use(express.json());//enable json parsing

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

    const result = validateCourse(req.body);
    
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
    console.log(courses);
});

app.put('/api/courses/:id',(req,res) =>{
    //check if id exists
    //return 404 if not found
    let course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send('The course with given id is not found');

    //const result = validateCourse(req.body);
    const {error} = validateCourse(req.body);
    
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }

    //update the id
    //Return updated course
    course.name = req.body.name;
    res.send(course);
});

app.delete('/api/courses/:id',(req,res)=>{
    //check if id exists
    //return 404 if not found
    let course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send('The course with given id is not found');

    const index = courses.indexOf(course);
    courses.splice(index,1);
    
    res.send(course);
});

function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    }   
    //use validate method to compare res.body against joi schema defined
    return Joi.validate(course,schema);
}

const port = process.env.PORT || 3000;
app.listen(port,()=>{console.log(`Listening to port ${port}...`)});
