# MyMovieList

MyMovieList is a simple database web app where users can search for movies and review and rate movies, and admins can add, update, or delete movies.

<b>Website: </b> <a href="https://mymovielist.up.railway.app">https://mymovielist.up.railway.app</a>

<b>Home Page</b>
<img width="1438" alt="screenshot" src="images/home_page.png">
</br>
<b>Movie Info Page</b>
<img width="1438" alt="screenshot" src="images/movie_info_page.png">

<h2>Installation</h2>

Setup the project and install the packages by running:

```bash
npm run setup
```

Run project with command:

```bash
npm run dev
```

<h2>Built with</h2>
<ul>
    <li><b>FrontEnd:</b> React.JS, Bootstrap, HTML/CSS </li>
    <li><b>Backend:</b> Node.JS, Express.JS, Passport.JS, Bcrypt </li>
    <li><b>Database:</b> MongoDB, Mongoose </li>
</ul>

<h2> Features </h2>
<ul>
    <li> User Registration, Login, and Logout.</li>
    <li> Search movies using title/genre/rating filters.</li>
    <li> Rate or review movies.</li>
    <li> Add, update, or delete movies.</li>
</ul>

<h2> API </h2>
<h4> Users </h4>
<ul>
  <li> <b>POST</b> /api/user/register </li>
  <li> <b>POST</b>  /api/user/signin  </li>
  <li> <b>GET</b>  /api/user/signout </li>
  <li> <b>GET</b>  /api/user/checkAuth </li>
  <li> <b>GET</b>  /api/user/checkAdmin </li>
</ul>

<h4> Movies </h4>
<ul>
  <li> <b>POST</b> /api/movies/new </li>
  <li> <b>GET</b> /api/movies </li>
  <li> <b>GET</b> /api/movies/:id </li>
  <li> <b>GET</b> /api/movies/rating/:id </li>
  <li> <b>DELETE</b> /api/movies/:id </li>
  <li> <b>PUT</b> /api/movies/:id </li>
</ul>

<h4> Reviews </h4>
<ul>
  <li> <b>GET</b> /api/review/movie/:id </li>
  <li> <b>POST</b> /api/review/new </li>
</ul>

<h4> Genres </h4>
<ul>
  <li> <b>GET</b> /api/genre </li>
</ul>

## TODOS

-   [x] Home Page (Movies)

    -   [x] Genre Filter
    -   [x] Rating Filter
    -   [x] Search Filter
    -   [x] Movie Grid
        -   [x] MovieCardS
        -   [x] Pagination

-   [x] Add Movie Page

    -   [x] Form
    -   [x] Create Movie

-   [x] Movie Page

    -   [x] Movie Information
    -   [x] Create/Fetch Reviews
    -   [x] Create/Fetch Ratings
    -   [x] Edit Movie
    -   [x] Delete Movie

-   [x] Login/Register Page

    -   [x] Form
    -   [x] Create New User
    -   [x] User Authentication
    -   [x] Admin Authentication

-   [x] Admin features

    -   [x] Create movies
    -   [x] Delete movies
    -   [x] Edit movies

-   [x] User Features
    -   [x] Review movies
    -   [x] Rate movies
