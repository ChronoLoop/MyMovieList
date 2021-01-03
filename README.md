# MyMovieList
MyMovieList is a simple database web app where users can search for movies with plot summaries, ratings, and reviews, and admins can add new movies to the database.

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
    <li>FrontEnd: <b> React.JS, Bootstrap, HTML/CSS </b></li>
    <li>Backend:  <b> Node.JS, Express.JS</b> </li>
    <li>Database: <b> MongoDB, Mongoose </b> </li>
</ul>

<h2> Features </h2>
<ul>
    <li> User Registration, Login, and Logout.</li>
    <li> Search movies using genre/rating filters.</li>
    <li> Rate or review movies.</li>
    <li> Add new movies to the database.</li>
</ul>

<h2> Heroku </h2>
This web app is hosted on Heroku. "The Heroku filesystem is ephemeral - that means that any changes to the filesystem whilst the dyno is running only last until that dyno is shut down or restarted" (<a href="https://help.heroku.com/K1PPS2WM/why-are-my-file-uploads-missing-deleted">Source</a>). As a result, images can not be stored in a filesystem without it being deleted after a server shut down or restart. A solution to this problem is to store the images on MongoDB. This is not ideal, but it is the easiest free solution to this problem.

## TODOS

- [ ] Home Page (Movies)
  - [ ] Genre Filter
  - [ ] Rating Filter
  - [ ] Search Filter
  - [x] Movie Grid
    - [x] MovieCard
    - [ ] Pagination

- [ ] Add Movie Page
  - [ ] Admin authenication
  - [x] Form
  - [x] Create Movie

- [ ] Movie Page
  - [ ] Movie Information
  - [ ] Create/Read Reviews
  - [ ] Create/Read Ratings

- [x] Login/Register Page
  - [x] Form
  - [x] Create New User
  - [x] User Authentication

- [ ] User roles