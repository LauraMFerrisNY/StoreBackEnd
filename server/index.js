const {
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
} = require('./db');
const express = require('express');
const { seedDatabases } = require('./dbSeed');
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

app.post('/api/items', async(req, res, next)=> {
  try {
    res.send(await createProduct(req.body));
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
    res.send(await fetchProduct(req.params.itemId));
  }
  catch(ex){
    next(ex);
  }
});

app.get('/api/items/:itemId/reviews', async(req, res, next)=> {
  try {
    res.send(await fetchProductReviews(req.params.itemId));
  }
  catch(ex){
    next(ex);
  }
});

app.get('/api/items/:itemId/reviews/:reviewId', async(req, res, next)=> {
  try {
    res.send(await fetchProductReview({ product_id: req.params.itemId, id: req.params.reviewId }));
  }
  catch(ex){
    next(ex);
  }
});

app.get('/api/items/:itemId/reviews/:reviewId/comments', async(req, res, next)=> {
  try {
    res.send(await fetchReviewComments({ product_id: req.params.itemId, review_id: req.params.reviewId }));
  }
  catch(ex){
    next(ex);
  }
});

app.post('/api/items/:itemId/reviews', isLoggedIn, async(req, res, next)=> {
  try {
    if(req.body.user_id !== req.user.id){
      const error = Error('not authorized');
      error.status = 401;
      throw error;
    }
    res.status(201).send(await createReview({ user_id: req.body.user_id, product_id: req.params.itemId, written_rating: req.body.written_rating, score_rating: req.body.score_rating}));
  }
  catch(ex){
    next(ex);
  }
});

app.get('/api/reviews/me', isLoggedIn, async(req, res, next)=> {
  try {
    if(req.body.user_id !== req.user.id){
      const error = Error('not authorized');
      error.status = 401;
      throw error;
    }
    res.send(await fetchUserReviews(req.body.user_id));
  }
  catch(ex){
    next(ex);
  }
});

app.put('/api/users/:userId/reviews/:reviewId', isLoggedIn, async(req, res, next)=> {
  try {
    if(req.params.userId !== req.user.id){
      const error = Error('not authorized');
      error.status = 401;
      throw error;
    }
    res.send(await updateReview({ written_rating: req.body.written_rating, score_rating: req.body.score_rating, id: req.params.reviewId, user_id: req.params.userId }));
  }
  catch(ex){
    next(ex);
  }
});

app.post('/api/items/:itemId/reviews/:reviewId/comments', isLoggedIn, async(req, res, next)=> {
  try {
    if(req.body.user_id !== req.user.id){
      const error = Error('not authorized');
      error.status = 401;
      throw error;
    }
    res.status(201).send(await createComment({ review_id: req.params.reviewId, user_id: req.body.user_id, product_id: req.params.itemId, comment: req.body.comment }));
  }
  catch(ex){
    next(ex);
  }
});

app.get('/api/comments/me', isLoggedIn, async(req, res, next)=> {
  try {
    if(req.body.user_id !== req.user.id){
      const error = Error('not authorized');
      error.status = 401;
      throw error;
    }
    res.send(await fetchUserComments(req.body.user_id));
  }
  catch(ex){
    next(ex);
  }
});

app.put('/api/users/:userId/comments/:commentId', isLoggedIn, async(req, res, next)=> {
  try {
    if(req.params.userId !== req.user.id){
      const error = Error('not authorized');
      error.status = 401;
      throw error;
    }
    res.send(await updateComment({ comment: req.body.comment, id: req.params.commentId, user_id: req.params.userId }));
  }
  catch(ex){
    next(ex);
  }
});

app.delete('/api/users/:userId/comments/:commentId', isLoggedIn, async(req, res, next)=> {
  try {
    if(req.params.userId !== req.user.id){
      const error = Error('not authorized');
      error.status = 401;
      throw error;
    }
    await deleteComment({ user_id: req.params.userId, id: req.params.commentId });
    res.sendStatus(204);
  }
  catch(ex){
    next(ex);
  }
});

app.delete('/api/users/:userId/reviews/:reviewId', isLoggedIn, async(req, res, next)=> {
  try {
    if(req.params.userId !== req.user.id){
      const error = Error('not authorized');
      error.status = 401;
      throw error;
    }
    await deleteComments(req.params.reviewId);
    await deleteReview({ user_id: req.params.userId, id: req.params.reviewId });
    res.sendStatus(204);
  }
  catch(ex){
    next(ex);
  }
});

app.use((err, req, res, next)=> {
  console.log(err);
  res.status(err.status || 500).send({ error: err.message ? err.message : err });
});

const init = async()=> {
  const port = process.env.PORT || 3000;
  await client.connect();
  console.log('connected to database');

  await createTables();
  console.log('tables created');

  //Seed Databases here

  await seedDatabases();
  console.log('databases seeded');

  app.listen(port, ()=> console.log(`listening on port ${port}`));
};

init();