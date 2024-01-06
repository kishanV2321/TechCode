const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Set the views directory
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Use the blog route
app.use('/', require('./routes/blogserver'));

app.listen(port, () => {
    console.log(`Blog app listening on http://localhost:${port}`);
});
