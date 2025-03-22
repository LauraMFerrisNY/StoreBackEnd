const {
  client,
  createTables,
  createUser,
  createProduct,
  createReview,
  createComment,
  // fetchUsers,
  fetchProducts,
  fetchProduct,
  fetchProductReviews,
  fetchProductReview,
  fetchUserReviews,
  fetchReviewComments,
  fetchUserComments,
  deleteReview,
  deleteComment,
  authenticate,
  findUserWithToken,
  updateReview,
  updateComment
} = require('./db');
const express = require('express');
const app = express();
app.use(express.json());

const isLoggedIn = async(req, res, next)=> {
  try {
    req.user = await findUserWithToken(req.headers.authorization);
    next();
  }
  catch(ex){
    next(ex);
  }
};

app.post('/api/auth/login', async(req, res, next)=> {
  try {
    res.send(await authenticate(req.body));
  }
  catch(ex){
    next(ex);
  }
});

app.post('/api/auth/register', async(req, res, next)=> {
  try {
    res.send(await createUser(req.body));
  }
  catch(ex){
    next(ex);
  }
});

app.get('/api/auth/me', isLoggedIn, async(req, res, next)=> {
  try {
    res.send(req.user);
  }
  catch(ex){
    next(ex);
  }
});

// app.get('/api/users', async(req, res, next)=> {
//   try {
//     res.send(await fetchUsers());
//   }
//   catch(ex){
//     next(ex);
//   }
// });

app.get('/api/items', async(req, res, next)=> {
  try {
    res.send(await fetchProducts());
  }
  catch(ex){
    next(ex);
  }
});

app.get('/api/items/:itemId', async(req, res, next)=> {
  try {
    res.send(await fetchProducts({ id: req.params.itemId }));
  }
  catch(ex){
    next(ex);
  }
});

app.get('/api/items/:itemId/reviews', async(req, res, next)=> {
  try {
    res.send(await fetchProductReviews({ product_id: req.params.itemId }));
  }
  catch(ex){
    next(ex);
  }
});

app.get('/api/items/:itemId/reviews/:reviewId', async(req, res, next)=> {
  try {
    res.send(await fetchProductReview({ product_id: req.params.itemId, reviewId: req.params.reviewId }));
  }
  catch(ex){
    next(ex);
  }
});