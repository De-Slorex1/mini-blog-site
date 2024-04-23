const express = require("express");  //Import Express
const {connectdb} = require("./database/db"); //Import Database
const BlogModel = require("./model/dbmodel"); //Import Database Model
const methodOverride = require("method-override")

const port = 3000; //Server Port
const app = express(); //Express Server 

//middleware
app.use(express.json()) //TO USE JSON FORMAT
app.set('view engine', 'ejs') //TO USE EJS ENGINE
app.use(express.static("public")) //TO USE CSS
app.use(express.urlencoded({extended: true})) //TO ACCEPT REQUEST CONTENT COMING FROM THE CLIENT TO THE SERVER
app.use(methodOverride("_method"))

app.get("/", (req, res) => { //HOME PAGE MIDDLEWARE
    try {
        res.status(200).render('home', {title: "home"})
    }
    catch(err) {
        console.log(err)
    }
})

app.get("/about", (req, res) => { //ABOUT PAGE MIDDLEWARE
    try {
        res.status(200).render('about', {title: "About"})
    }
    catch(err) {
        console.log(err)
    }
})

app.get("/make-post", (req, res) => { //POST BLOG PAGE MIDDLEWARE
    try {
        res.status(200).render("post", {title: "Post Blog"})
    }
    catch(err) {
        console.log(err.message)
    }
})

app.get("/view-post", async (req, res) => { //VIEW BLOG PAGE MIDDLEWARE
    try {
        const blogs = await BlogModel.find()
        res.status(200).render("viewblog", {title: "View Blog", blogs: blogs})
    }
    catch(err) {
        console.log(err.message)
    }
})

app.get("/single-view/:id", async (req, res) => { //SINGLE BLOG VIEW MIDDLEWARE
    const {id} = req.params
    console.log(id)
    const blog = await BlogModel.findById(id)
    res.status(200).render("singleview", {title: "Blog", blog: blog})
})

app.get("/update-view/:id", async (req, res) => {
    try {
        const {id} = req.params
        console.log(id)
        const blog = await BlogModel.findById(id)
        res.status(200).render("updateview", {title: "Update Blog", blog: blog})
    }
    catch(err) {
        console.log(err)
    }
})

//CREATE - POST

app.post('/blogs', async (req, res) => { // POST MIDDLEWARE
    try {
        const {name, email, subject, message} = req.body
        console.log(req.body)
        const newBodyDetails = new BlogModel({
            name: name, 
            email: email, 
            subject: subject, 
            message: message
        })
        const savedBlog = await newBodyDetails.save()
        res.status(201).redirect('/view-post')
    }
    catch(err){
        console.log(err)
    }
})

// UPDATE - PUT
app.put("/update-views/:id", async (req, res) => {
    try {
        const {id} = req.params
        console.log(id)
        const {name, email, subject, message} = req.body
        const updatedblog = await BlogModel.findByIdAndUpdate(id, {
            name: name, email: email, subject: subject, message: message
        })
        res.status(200).redirect('/view-post')
    }
    catch(err) {
        console.log(err)
    }
})

app.get("*",(req, res) => {
    try {
        res.status(404).render("error", {title: "404 Page"})
    }
    catch(err) {
        console.log(err)
    }
})


async function handledb() {
    await connectdb()
    app.listen(port, () => console.log("server is running on port 3000"))
}

handledb()

