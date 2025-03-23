const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL || 'postgresql://lauraunix:xinu2413@localhost:5432/store_db');
const uuid = require('uuid');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT = process.env.JWT || 'shhh';

const createTables = async()=> {
  const SQL = `
    DROP TABLE IF EXISTS comments;
    DROP TABLE IF EXISTS reviews;
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS products;
    CREATE TABLE users(
      id UUID PRIMARY KEY,
      username VARCHAR(20) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL
    );
    CREATE TABLE products(
      id UUID PRIMARY KEY,
      name VARCHAR(50) NOT NULL UNIQUE
    );
    CREATE TABLE reviews(
      id UUID PRIMARY KEY,
      user_id UUID REFERENCES users(id) NOT NULL,
      product_id UUID REFERENCES products(id) NOT NULL,
      CONSTRAINT unique_user_id_product_id UNIQUE (user_id, product_id),
      written_rating VARCHAR(1000) NOT NULL,
      score_rating VARCHAR(5) NOT NULL
    );
    CREATE TABLE comments(
      id UUID PRIMARY KEY,
      review_id UUID REFERENCES reviews(id) NOT NULL,
      user_id UUID REFERENCES users(id) NOT NULL,
      product_id UUID REFERENCES products(id) NOT NULL,
      comment VARCHAR(500) NOT NULL
    );
  `;
  await client.query(SQL);
};

const createUser = async({ username, password})=> {
  const SQL = `
    INSERT INTO users(id, username, password) 
    VALUES($1, $2, $3) 
    RETURNING *
  `;
  const response = await client.query(SQL, [uuid.v4(), username, await bcrypt.hash(password, 5)]);
  return response.rows[0];
};

const createProduct = async({ name })=> {
  const SQL = `
    INSERT INTO products(id, name) 
    VALUES($1, $2) 
    RETURNING *
  `;
  const response = await client.query(SQL, [uuid.v4(), name]);
  return response.rows[0];
};

const createReview = async({ user_id, product_id, written_rating, score_rating })=> {
  const SQL = `
    INSERT INTO reviews(id, user_id, product_id, written_rating, score_rating) 
    VALUES($1, $2, $3, $4, $5) 
    RETURNING *
  `;
  const response = await client.query(SQL, [uuid.v4(), user_id, product_id, written_rating, score_rating]);
  return response.rows[0];
};

const createComment = async({ review_id, user_id, product_id, comment })=> {
  const SQL = `
    INSERT INTO comments(id, review_id, user_id, product_id, comment) 
    VALUES($1, $2, $3, $4, $5) 
    RETURNING *
  `;
  const response = await client.query(SQL, [uuid.v4(), review_id, user_id, product_id, comment]);
  return response.rows[0];
};

const deleteReview = async({ user_id, id })=> {
  const SQL = `
    DELETE FROM reviews 
    WHERE user_id=$1 AND id=$2
  `;
  await client.query(SQL, [user_id, id]);
};

const deleteComments = async(review_id)=> {
  const SQL = `
    DELETE FROM comments 
    WHERE review_id=$1
  `;
  await client.query(SQL, [review_id]);
};

const deleteComment = async({ user_id, id })=> {
  const SQL = `
    DELETE FROM comments 
    WHERE user_id=$1 AND id=$2
  `;
  await client.query(SQL, [user_id, id]);
};

const authenticate = async({ username, password })=> {
  const SQL = `
    SELECT id, password 
    FROM users 
    WHERE username=$1;
  `;
  const response = await client.query(SQL, [username]);
  if(!response.rows.length || (await bcrypt.compare(password, response.rows[0].password)) === false){
    const error = Error('not authorized');
    error.status = 401;
    throw error;
  }
  const token = await jwt.sign({ id: response.rows[0].id}, JWT);
  return { token };
};

const findUserWithToken = async(token)=> {
  let id;
  try {
    const payload = await jwt.verify(token, JWT);
    id = payload.id;
  } catch (ex) {
    const error = Error('not authorized');
    error.status = 401;
    throw error;
  }
  const SQL = `
    SELECT id, username 
    FROM users 
    WHERE id=$1;
  `;
  const response = await client.query(SQL, [id]);
  if(!response.rows.length){
    const error = Error('not authorized');
    error.status = 401;
    throw error;
  }
  return response.rows[0];
};

const fetchProducts = async()=> {
  const SQL = `
    SELECT * FROM products;
  `;
  const response = await client.query(SQL);
  return response.rows;
};

const fetchProduct = async(id)=> {
  const SQL = `
    SELECT * FROM products WHERE id = $1;
  `;
  const response = await client.query(SQL, [id]);
  return response.rows;
};

const fetchProductReviews = async(product_id)=> {
  const SQL = `
    SELECT * FROM reviews WHERE product_id = $1
  `;
  const response = await client.query(SQL, [product_id]);
  return response.rows;
};

const fetchProductReview = async({product_id, id})=> {
  const SQL = `
    SELECT * FROM reviews WHERE product_id = $1 AND id = $2
  `;
  const response = await client.query(SQL, [product_id, id]);
  return response.rows;
};

const fetchUserReviews = async(user_id)=> {
  const SQL = `
    SELECT * FROM reviews WHERE user_id = $1
  `;
  const response = await client.query(SQL, [user_id]);
  return response.rows;
};

const fetchReviewComments = async({product_id, review_id})=> {
  const SQL = `
    SELECT * FROM comments WHERE product_id=$1 AND review_id = $2
  `;
  const response = await client.query(SQL, [product_id, review_id]);
  return response.rows;
};

const fetchUserComments = async(user_id)=> {
  const SQL = `
    SELECT * FROM comments WHERE user_id = $1
  `;
  const response = await client.query(SQL, [user_id]);
  return response.rows;
};

const updateReview = async({ written_rating, score_rating, id, user_id })=> {
  const SQL = `
    UPDATE reviews 
    SET  written_rating=$1, score_rating=$2
    WHERE id=$3 AND user_id=$4 RETURNING *
  `; 
  const response = await client.query(SQL, [written_rating, score_rating, id, user_id]);
  return response.rows;
};

const updateComment = async({ comment, id, user_id })=> {
  const SQL = `
    UPDATE comments 
    SET  comment=$1
    WHERE id=$2 AND user_id=$3 RETURNING *
  `; 
  const response = await client.query(SQL, [comment, id, user_id]);
  return response.rows;
};

module.exports = {
  client,
  createTables,
  createUser,
  createProduct,
  createReview,
  createComment,
  fetchProducts,
  fetchProduct,
  fetchProductReviews,
  fetchProductReview,
  fetchUserReviews,
  fetchReviewComments,
  fetchUserComments,
  deleteReview,
  deleteComments,
  deleteComment,
  authenticate,
  findUserWithToken,
  updateReview,
  updateComment
};
