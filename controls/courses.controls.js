const expressx = require('express');
const router = expressx.Router();
var courses = require('../src/Models/bigdata')
/*
1. you cannot send res.send multiple times only first one get hits
2. if same signatured two routes the first one get hits
3. you can use req.params and req.params.<name> to get path values
4. to get query values you have to use req.query
5. in post you cant use status bfore send or it would been a error Can't set headers after they are sent.
*/

// const courses = [{
//     Id: 1,
//     Name: "Angular 6 crash course"
// },
// {
//     Id: 2,
//     Name: "Node Js crash course"
// },
// {
//     Id: 3,
//     Name: "Express JS crash course"
// },
// {
//     Id: 4,
//     Name: "VB.net crash course"
// },

// ]


router.get('/', (req, res) => {
    res.send("Simple express server......");
});

router.get('/api/customers', (req, res) => {
    res.send([1, 2, 3, 4, 5, 6, 7, 8, 9]);
});



router.get('/api/customers/:id', (req, res) => {
    res.send(req.params.id);
})

router.get('/api/customers/:id/:month', (req, res) => {
    res.send(req.params); //http://localhost:5000/api/customers/1/6  /1 and /6 is id and month witch is reqired
    res.send(req.query); //http://localhost:5000/api/customers/3/1?ss=1  output is {"ss":"1"}

})

router.get('/api/Allcourses', (req, res) => {
    res.send(courses).status(200);
});


router.get('/api/courses/:id', (req, res) => {
    var course = courses.find(x => x.Id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send(`Course not found for id: ${req.params.id}`);
    } else {
        res.send(course);
    }

});

router.post('/api/courses', (req, res) => {

    var result = Validate(req.body);
    if (result.error) {
        console.log(result.error.details[0].message);
        return res.status(400).send(result.error.details[0].message);

    } else {
        console.log(result.value);
        const course = {
            Id: courses.length + 1,
            Name: result.value.Name
        };
        courses.push(course);
        res.status(200).send(course);
    }
    console.log("Point 1");
});

function Validate(courseinut) {
    console.log(courseinut);
    /* you have to configure all the properties of the incomming object.other wise it will be an error
       Property names are case sensitive

     */

    const Courseschema = Joi.object().keys({
        Name: Joi.string().alphanum().min(3).max(50).required(),
        Id: Joi.number()
    });

    return Joi.validate(courseinut, Courseschema);
}

module.exports = router;