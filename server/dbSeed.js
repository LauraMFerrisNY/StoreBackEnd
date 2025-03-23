const {
  createUser,
  createProduct,
  createReview,
  createComment
} = require('./db');

const seedDatabases = async() => {
  const currentUsers = await Promise.all([
    createUser({ username: 'John', password: 'john_pw'}),
    createUser({ username: 'Laura', password: 'laura_pw'}),
    createUser({ username: 'Ben', password: 'ben_pw'}),
    createUser({ username: 'Emma', password: 'emma_pw'}),
    createUser({ username: 'Vivian', password: 'vivian_pw'}),
    createUser({ username: 'Jake', password: 'jake_pw'}),
    createUser({ username: 'Blake', password: 'blake_pw'}),
    createUser({ username: 'Nick', password: 'nick_pw'}),
    createUser({ username: 'Julia', password: 'julia_pw'}),
    createUser({ username: 'Kelly', password: 'kelly_pw'}),
    createUser({ username: 'Ethan', password: 'ethan_pw'}),
    createUser({ username: 'Henry', password: 'henry_pw'})
  ]);

  const currentProducts = await Promise.all([
    createProduct({ name: 'Paperclips' }),
    createProduct({ name: 'Pilot G2 Black Pens' }),
    createProduct({ name: 'Prismacolor Colored Pencils' }),
    createProduct({ name: 'Expo Markers' }),
    createProduct({ name: 'B5 270 page Notebook' }),
    createProduct({ name: 'Uniball Signo Gel Pens' }),
    createProduct({ name: 'Mildliners' }),
    createProduct({ name: 'Loose Leaf College Rule Paper' }),
    createProduct({ name: 'Staples' }),
    createProduct({ name: 'Hole Punch' }),
    createProduct({ name: 'Post-it Notes' }),
    createProduct({ name: 'Binder Clips' })
  ]);

  const currentReviews = await Promise.all([
    createReview({ user_id: currentUsers[0].id, product_id: currentProducts[3].id, written_rating: 'Expo markers are okay for basic use, but they dry out quickly and the tips wear down faster than expected. They work well initially, but don’t last as long as I’d hoped.', score_rating: '5/10' }),
    createReview({ user_id: currentUsers[0].id, product_id: currentProducts[6].id, written_rating: 'Overall, these are great highlighters. Just be careful when using the darker colors, as they may blend in with the text a little too closely.', score_rating: '6/10' }),
    createReview({ user_id: currentUsers[1].id, product_id: currentProducts[1].id, written_rating: 'The Pilot G2 Black Pen is hands down the best pen I’ve ever used! The gel ink flows so smoothly that writing feels effortless, and the rich black color is bold and vibrant, making every word stand out. The comfortable grip makes it easy to write for extended periods without any strain, and the retractable design is both convenient and stylish. Whether I’m taking notes, journaling, or signing important documents, this pen never skips or smudges. It’s reliable, long-lasting, and a must-have for anyone who values high-quality writing tools. Highly recommend!', score_rating: '10/10' }),
    createReview({ user_id: currentUsers[1].id, product_id: currentProducts[8].id, written_rating: 'Nice sturdy staples.', score_rating: '8/10' }),
    createReview({ user_id: currentUsers[2].id, product_id: currentProducts[0].id, written_rating: 'These paperclips are a game-changer for organizing my documents! The sturdy metal ensures they don’t bend or warp, even with thicker stacks of paper. Plus, the smooth finish prevents any snags or tears. I also love the variety of sizes—they’re perfect for everything from small notes to larger reports. Affordable, reliable, and a must-have for any office or home workspace!', score_rating: '9/10' }),
    createReview({ user_id: currentUsers[2].id, product_id: currentProducts[9].id, written_rating: 'This hole puncher is a reliable tool! It punches clean, precise holes every time and handles multiple sheets with ease. The sturdy build and comfortable grip make it perfect for both home and office use.', score_rating: '9/10' }),
    createReview({ user_id: currentUsers[3].id, product_id: currentProducts[4].id, written_rating: 'This notebook is fantastic for all my writing needs! The paper is smooth and high-quality, preventing any ink bleed-through, even with gel pens. The sturdy cover and durable binding ensure it holds up well, whether I’m jotting down notes on the go or sketching at my desk. It’s the perfect balance of functionality and style. Highly recommended for students, professionals, or anyone who loves to write!', score_rating: '9/10' }),
    createReview({ user_id: currentUsers[3].id, product_id: currentProducts[7].id, written_rating: 'This paper is nice. Nothing special about it though.', score_rating: '7/10' }),
    createReview({ user_id: currentUsers[4].id, product_id: currentProducts[1].id, written_rating: 'Fantastic pens! I would buy them again.', score_rating: '8/10' }),
    createReview({ user_id: currentUsers[4].id, product_id: currentProducts[11].id, written_rating: 'These were horrible! 3 of mine snapped on the first use. Do not buy these. ', score_rating: '0/10' }),
    createReview({ user_id: currentUsers[5].id, product_id: currentProducts[5].id, written_rating: 'The white pen is very opaque and the metallic colors have a nice sheen. The ink runs smoothly, but does take some time to dry.', score_rating: '7/10' }),
    createReview({ user_id: currentUsers[5].id, product_id: currentProducts[2].id, written_rating: 'Prismacolor Colored Pencils are an absolute dream for artists of all levels. The vibrant colors are richly pigmented and blend beautifully, allowing for seamless gradients and creative color combinations. The soft cores make shading and layering effortless, while the pencils glide smoothly across the paper. I’m especially impressed by how durable and long-lasting they are—perfect for detailed work or bold creations. Whether you’re a beginner or a professional, these pencils are a must-have for bringing your artistic vision to life!', score_rating: '8/10' }),
    createReview({ user_id: currentUsers[6].id, product_id: currentProducts[8].id, written_rating: 'These staples are great! There were so many in the package, I donated some to my child’s teacher.', score_rating: '9/10' }),
    createReview({ user_id: currentUsers[6].id, product_id: currentProducts[10].id, written_rating: 'These Post-it Notes were underwhelming. The adhesive doesn’t stick well to certain surfaces and often loses its grip after a short time. The paper quality feels thin, and the notes tear too easily when removing them. For the price, I expected better performance.', score_rating: '1/10' }),
    createReview({ user_id: currentUsers[7].id, product_id: currentProducts[4].id, written_rating: 'The paper in this notebook was not as thick as I expected. My markers bled through several pages.', score_rating: '4/10' }),
    createReview({ user_id: currentUsers[7].id, product_id: currentProducts[6].id, written_rating: 'Mildliners are a game-changer for highlighting and creative journaling! The dual tips offer versatility, and the pastel colors are both unique and soothing. They don’t bleed through pages, making them perfect for notes, planners, or art projects. Absolutely love them!', score_rating: '9/10' }),
    createReview({ user_id: currentUsers[8].id, product_id: currentProducts[9].id, written_rating: 'This hole puncher is alright. It can only punch through about 10 sheets of paper which is fine for shorter assignments.', score_rating: '5/10' }),
    createReview({ user_id: currentUsers[8].id, product_id: currentProducts[3].id, written_rating: 'These markers deliver bold colors and smooth application, making them perfect for whiteboards. They are reliable and erase cleanly every time!', score_rating: '9/10' }),
    createReview({ user_id: currentUsers[9].id, product_id: currentProducts[7].id, written_rating: 'The paper is way too thin. The pages rip way too easily.', score_rating: '2/10' }),
    createReview({ user_id: currentUsers[9].id, product_id: currentProducts[0].id, written_rating: 'These paperclips are alright, but nothing special. They work fine for small batches of papers, but they don’t feel very sturdy and sometimes slip off if you’re not careful. They’re inexpensive, which is nice, but you’re definitely getting what you pay for. They’re okay for basic use, but don’t expect premium quality.', score_rating: '5/10' }),
    createReview({ user_id: currentUsers[10].id, product_id: currentProducts[11].id, written_rating: 'These clips were nice.  One of mine broke but the rest have held up well.', score_rating: '7/10' }),
    createReview({ user_id: currentUsers[10].id, product_id: currentProducts[5].id, written_rating: 'These pens have been great for my bullet journals. They have been my go-to pens for adding decorative accents.', score_rating: '10/10' }),
    createReview({ user_id: currentUsers[11].id, product_id: currentProducts[10].id, written_rating: 'I love all the colors! I wish they had some blue ones though.', score_rating: '8/10' }),
    createReview({ user_id: currentUsers[11].id, product_id: currentProducts[2].id, written_rating: 'Not worth the money. Stick to Crayola.', score_rating: '3/10' })
  ]);

  const currentComments = await Promise.all([
    createComment({ review_id: currentReviews[0].id, user_id: currentUsers[11].id, product_id: currentProducts[3].id, comment: 'Not sure how long you expected dry erase markers to last for, but they were fine for me.' }),
    createComment({ review_id: currentReviews[1].id, user_id: currentUsers[7].id, product_id: currentProducts[6].id, comment: 'Thank you for letting us know to be careful about highlighting with the darker colors. I found those darker colors to work well under a white gel pen.' }),
    createComment({ review_id: currentReviews[2].id, user_id: currentUsers[10].id, product_id: currentProducts[1].id, comment: 'You convinced me to buy these pens and so far I’m impressed.' }),
    createComment({ review_id: currentReviews[4].id, user_id: currentUsers[0].id, product_id: currentProducts[0].id, comment: 'I have to agree. These paper clips have lasted for years for me.' }),
    createComment({ review_id: currentReviews[5].id, user_id: currentUsers[9].id, product_id: currentProducts[9].id, comment: 'Did the grip hold up for you? The rubber wore off mine but I think mine may have been exposed to too much heat.' }),
    createComment({ review_id: currentReviews[5].id, user_id: currentUsers[2].id, product_id: currentProducts[9].id, comment: 'Yeah I have not had any issues with the grip on mine.' }),
    createComment({ review_id: currentReviews[6].id, user_id: currentUsers[5].id, product_id: currentProducts[4].id, comment: 'That is really good to know that ink does not bleed through the paper' }),
    createComment({ review_id: currentReviews[7].id, user_id: currentUsers[1].id, product_id: currentProducts[7].id, comment: 'I agree. This isn’t the best paper, but it works for my classes.' }),
    createComment({ review_id: currentReviews[8].id, user_id: currentUsers[6].id, product_id: currentProducts[1].id, comment: 'Good to know!' }),
    createComment({ review_id: currentReviews[9].id, user_id: currentUsers[8].id, product_id: currentProducts[11].id, comment: 'Oof, guess I’ll stay away from these.' }),
    createComment({ review_id: currentReviews[10].id, user_id: currentUsers[3].id, product_id: currentProducts[5].id, comment: 'I’ve been looking for a new white gel pen to try. I’ll have to give these ones a try.' }),
    createComment({ review_id: currentReviews[11].id, user_id: currentUsers[4].id, product_id: currentProducts[2].id, comment: 'I agree. These have been perfect for my art classes. The colors are rich and I think these are well worth the price.' }),
    createComment({ review_id: currentReviews[12].id, user_id: currentUsers[2].id, product_id: currentProducts[8].id, comment: 'Do you think there will be enough staples to last throughout my college years?' }),
    createComment({ review_id: currentReviews[12].id, user_id: currentUsers[6].id, product_id: currentProducts[8].id, comment: 'I think so.  Most stuff gets turned in online now anyways.' }),
    createComment({ review_id: currentReviews[13].id, user_id: currentUsers[4].id, product_id: currentProducts[10].id, comment: 'I think I will avoid these ones now.' }),
    createComment({ review_id: currentReviews[14].id, user_id: currentUsers[5].id, product_id: currentProducts[4].id, comment: 'Hmm, I see this product has mixed reviews. This product is cheap enough though, so I don’t mind giving it a try.' }),
    createComment({ review_id: currentReviews[15].id, user_id: currentUsers[0].id, product_id: currentProducts[6].id, comment: 'Yeah these are my favorite highlighters for my journals.' }),
    createComment({ review_id: currentReviews[16].id, user_id: currentUsers[10].id, product_id: currentProducts[9].id, comment: 'Maybe you got a bad hole puncher.  Mine works well and can go through more sheets than that.' }),
    createComment({ review_id: currentReviews[17].id, user_id: currentUsers[7].id, product_id: currentProducts[3].id, comment: 'I love these markers too!' }),
    createComment({ review_id: currentReviews[18].id, user_id: currentUsers[3].id, product_id: currentProducts[7].id, comment: 'I disagree. I think this paper is fine. Loose leaf paper isn’t supposed to be very thick.' }),
    createComment({ review_id: currentReviews[19].id, user_id: currentUsers[8].id, product_id: currentProducts[0].id, comment: 'Did these come in a container? I’m not sure if I need to buy a storage box.' }),
    createComment({ review_id: currentReviews[19].id, user_id: currentUsers[9].id, product_id: currentProducts[0].id, comment: 'I would get a separate container. These come in a flimsy plastic container.' }),
    createComment({ review_id: currentReviews[20].id, user_id: currentUsers[1].id, product_id: currentProducts[11].id, comment: 'Eh, I think I’ll stay away from these' }),
    createComment({ review_id: currentReviews[21].id, user_id: currentUsers[6].id, product_id: currentProducts[5].id, comment: 'I absolutely love them!' }),
    createComment({ review_id: currentReviews[22].id, user_id: currentUsers[7].id, product_id: currentProducts[10].id, comment: 'Aw there’s no blue ones? That’s disappointing.' }),
    createComment({ review_id: currentReviews[23].id, user_id: currentUsers[3].id, product_id: currentProducts[2].id, comment: 'Nah, Crayola pencils are much worse. You should expect to pay more for better pencils.' }),
    createComment({ review_id: currentReviews[3].id, user_id: currentUsers[11].id, product_id: currentProducts[8].id, comment: 'Sweet. I’ll add these to my cart.' }),
    createComment({ review_id: currentReviews[9].id, user_id: currentUsers[1].id, product_id: currentProducts[11].id, comment: 'Did your clips arrived cracked or something? I haven’t run into any constant issues with these clips.' }),
    createComment({ review_id: currentReviews[9].id, user_id: currentUsers[4].id, product_id: currentProducts[11].id, comment: 'These clips were not cracked at all. I’m not even very strong so I don’t know why they snapped.' }),
    createComment({ review_id: currentReviews[2].id, user_id: currentUsers[9].id, product_id: currentProducts[1].id, comment: 'Wow I’ll have to give these a try.' }),
    createComment({ review_id: currentReviews[11].id, user_id: currentUsers[0].id, product_id: currentProducts[2].id, comment: 'These are my favorite pencils too!' }),
    createComment({ review_id: currentReviews[6].id, user_id: currentUsers[11].id, product_id: currentProducts[4].id, comment: 'Does the notebook come with a bookmark?' }),
    createComment({ review_id: currentReviews[6].id, user_id: currentUsers[3].id, product_id: currentProducts[4].id, comment: 'No it does not.' })
    
  ]);
}


module.exports = {seedDatabases};