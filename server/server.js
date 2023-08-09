import 'dotenv/config';
import express from 'express';
import errorMiddleware from './lib/error-middleware.js';
import pg from 'pg';
import cors from 'cors';

// eslint-disable-next-line no-unused-vars -- Remove when used
const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(errorMiddleware);

// Create paths for static directories
const reactStaticDir = new URL('../client/build', import.meta.url).pathname;
const uploadsStaticDir = new URL('public', import.meta.url).pathname;

app.use(express.static(reactStaticDir));
// Static directory for file uploads server/public/
app.use(express.static(uploadsStaticDir));
app.use(express.json());

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

// get all restaurants
app.get('/api/v1/restaurants', async (req, res) => {
  try {
    const results = await db.query(
      'SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*),TRUNC(AVG(rating),1) AS average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id=reviews.restaurant_id ORDER BY restaurants.id;'
    );

    const responseObj = {
      status: 'success',
      results: results.rows.length,
      data: {
        restaurants: results.rows,
      },
    };
    res.status(200).json(responseObj);
  } catch (error) {
    console.log(error);
  }
});

// get a restaurant
app.get('/api/v1/restaurants/:id', async (req, res) => {
  try {
    const params = [req.params.id];
    const restaurant = await db.query(
      `SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*),TRUNC(AVG(rating),1) AS average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id=reviews.restaurant_id WHERE id=$1;`,
      params
    );

    const reviews = await db.query(
      `select * from reviews where restaurant_id=$1`,
      params
    );
    const responseObj = {
      status: 'success',
      data: restaurant.rows[0],
      reviews: reviews.rows,
    };
    res.status(200).json(responseObj);
  } catch (error) {
    console.log(error);
  }
});

// create a restaurant
app.post('/api/v1/restaurants', async (req, res) => {
  try {
    const params = [req.body.name, req.body.location, req.body.price_range];
    const results = await db.query(
      'insert into restaurants (name, location, price_range) values ($1,$2,$3) returning *',
      params
    );
    res.status(201).json({
      status: 'success',
      data: results.rows[0],
    });
  } catch (error) {
    console.log(error);
  }
});

// update a restaurant - error handling needed for invalid iputs
app.put('/api/v1/restaurants/:id', async (req, res) => {
  try {
    const params = [
      req.body.name,
      req.body.location,
      req.body.price_range,
      req.params.id,
    ];
    const results = await db.query(
      `UPDATE restaurants SET "name"=$1, "location"=$2, "price_range"=$3
    WHERE "id"=$4 RETURNING *`,
      params
    );
    res.status(200).json({
      status: 'success',
      data: results.rows[0],
    });
  } catch (error) {
    console.log(error);
  }
});

// delete a restaurant, need error handling
app.delete('/api/v1/restaurants/:id', async (req, res) => {
  try {
    const params = [req.params.id];
    await db.query(
      `DELETE FROM reviews WHERE "restaurant_id"=$1 RETURNING *;`,
      params
    );
    await db.query(
      `DELETE FROM restaurants WHERE "id"=$1 RETURNING *;`,
      params
    );
    res.status(204).json({
      status: 'success',
    });
  } catch (error) {
    console.log(error);
  }
});

// Store and Calculate the average rating reviews
app.post('/api/v1/restaurants/:id/addReview', async (req, res) => {
  try {
    const params = [
      req.params.id,
      req.body.name,
      req.body.review,
      req.body.rating,
    ];
    const results = await db.query(
      'INSERT INTO reviews ("restaurant_id", "name", "review", "rating") VALUES ($1,$2,$3,$4) RETURNING *;',
      params
    );
    console.log(results);
    res.status(201).json({
      status: 'success',
      data: results.rows[0],
    });
  } catch (error) {
    console.log(error);
  }
});

/**
 * Serves React's index.html if no api route matches.
 *
 * Implementation note:
 * When the final project is deployed, this Express server becomes responsible
 * for serving the React files. (In development, the Create React App server does this.)
 * When navigating in the client, if the user refreshes the page, the browser will send
 * the URL to this Express server instead of to React Router.
 * Catching everything that doesn't match a route and serving index.html allows
````````````` * React Router to manage the routing.
 */
app.get('*', (req, res) => res.sendFile(`${reactStaticDir}/index.html`));

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
