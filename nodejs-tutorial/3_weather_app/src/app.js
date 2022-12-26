const path = require("path");
const express = require("express");
const hbs = require("hbs");

const { geocode } = require("./utils/geocode");
const { forecast } = require("./utils/forecast");

// the express function returns our app (server) which we can then configure further
const app = express();

// setting up the port for heroku and local development
const port = process.env.PORT || 3000;

// Defining paths for our Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// setting up our templating engine
app.set("view engine", "hbs");
// customizing the path to our dynamic templates
app.set("views", viewsPath);
// registering a path to our partials
hbs.registerPartials(partialsPath);
// serving up static assets
app.use(express.static(publicDirectoryPath));

// setting up a dynamic route for our home page
app.get("/", (req, res) => {
  // this will automatically find the 'index.hbs' view and serve it
  res.render("index", {
    title: "Weather",
    name: "Niko Gril",
  });
});

// setting up a dynamic route for our about page
app.get("/about", (req, res) => {
  // this will automatically find the 'index.hbs' view and serve it
  res.render("about", {
    title: "About me",
    name: "Niko Gril",
  });
});

// setting up a dynamic route for our help page
app.get("/help", (req, res) => {
  // this will automatically find the 'index.hbs' view and serve it
  res.render("help", {
    title: "Help",
    name: "Niko Gril",
    helpText: "Example help message",
  });
});

// API route: '/weather'
app.get("/weather", (req, res) => {
  const address = req.query.address;

  if (!address) {
    res.send({ error: "You have to provide an address" });
    return;
  }

  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      res.send({ error });
      return;
    }

    forecast(latitude, longitude, (error, { weather_descriptions, temperature } = {}) => {
      if (error) {
        res.send({ error });
        return;
      }

      res.send({ location, weather_descriptions, temperature });
    });
  });
});

// setting up a 404 pages, this needs to come at the end since we are matching everything
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404 - Not found",
    name: "Niko Gril",
    error_message: "Help article not found!",
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    title: "404 - Not found",
    name: "Niko Gril",
    error_message: "Page not found",
  });
});

// listen on env var port (production) or 3000 (local), on start callback
app.listen(port, () => {
  console.log(`Server is up on port ${port}...`);
});
