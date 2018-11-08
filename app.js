/*
think from the begining of this file to end there is a pipe line. so things flow towards it
and 
app.use((req,res,next)=>{
if we not interfire to this part it will pass the reqiest tp  next() controller
so what we do is we intrupt the flow and filter it through our Middleware    
*/
/*App Imports  ****************************************************** */
const expressx = require('express');
const app = expressx();
const Joi = require('joi');
var compression = require('compression'); //to compress every response to minimize data
var helmet = require('helmet'); //For prevent known vulnerabilities

/*Imports  Routes ****************************************************** */
var securityRouter = require('./controls/Security/Security.module'); //Import routes for "catalog" area of site
const CourseRouter = require('./controls/courses.controls');

/*Middleware Usage area ****************************************************** */
app.use(expressx.json()); 
app.use(expressx.static('public'));
app.use((req,res,next)=>{
    console.log(`${new Date().toString() }  -  ${req.originalUrl} `)
    next()
});


app.use(compression()); //Compress all routes
app.use(helmet());

// app.use((req,res,next)=>{
//     res.status(404).send("Are you lost?");
// });

/*Route Config area ****************************************************** */

app.use(CourseRouter);
app.use('/security', securityRouter);  // Add catalog routes to middleware chain. [security] = route Prefix



//console.log(process.env);

//this will look for env variable call PORT and you have to set otherwise it will be port 5000
const port = process.env.PORT || 5000;


app.listen(port, () => {
    console.log(`App server is listining to port ${port}.........`)
});