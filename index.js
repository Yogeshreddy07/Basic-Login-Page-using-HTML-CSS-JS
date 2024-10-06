const express = require("express"); 
const app = express();
const path = require("path");
const hbs = require("hbs");
const collection = require("./mongodb");

// Serve static files (make sure your CSS, images, etc. are in the "public" folder)
app.use(express.static(path.join(__dirname, "../public")));

// Set path for Handlebars views
const templatePath = path.join(__dirname, "../templates");

// Middleware to parse incoming JSON and URL-encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set Handlebars as the view engine
app.set("view engine", "hbs");
app.set("views", templatePath);

// Route for home page (GET)
app.get("/", (req, res) => {
    res.render("home");  // Renders home.hbs from /templates
});

// Route to render home page for '/home' (GET)
app.get('/home', (req, res) => {
    console.log("Home route accessed");  // Debugging to ensure this route is hit
    res.render('home');  // Renders home.hbs from /templates
});

// Route for handling Sign Up (POST)
app.post("/signup", async (req, res) => {
    const data = {
        Name: req.body.name,
        Email: req.body.email,
        Password: req.body.password,
    };

    try {
        await collection.insertMany([data]);
        res.render("dashboard", { message: "Signup Successful!" });
    } catch (err) {
        console.log(err);
        res.render("home", { message: "Signup Failed. Please try again!" });
    }
});

// Route for handling Sign In (POST)
app.post("/signin", async (req, res) => {
    try {
        const user = await collection.findOne({ Email: req.body.email }); // Match by email
        if (user && user.Password === req.body.password) { // Check password
            res.render("dashboard", { message: "Login Successful!" }); // Redirect to dashboard on success
        } else {
            res.send("Wrong email or password."); // Error message for incorrect credentials
        }
    } catch (err) {
        console.log(err);
        res.send("An error occurred. Please try again.");
    }
});

// Start server on port 3000
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
