	const router = require('express').Router();
const database = include('databaseConnection');
const dbModel = include('databaseAccessLayer');

router.get('/', (req, res) => {
	console.log("page hit");
	database.getConnection(function (err, dbConnection) {
		if (err) {
			res.render('error', {message: 'Error connecting to MySQL'});
			console.log("Error connecting to mysql");
			console.log(err);
		}
		else {
			
			dbModel.grabRecipes((err, result) => {
				if (err) {
					res.render('error', {message: 'Error reading from MySQL'});
					console.log("Error reading from mysql");
					console.log(err);
				}
				else { //success
					res.render('index', {allRecipes: result});

					//Output the results of the query to the Heroku Logs
					console.log(result);
				}
			});
			dbConnection.release();
		}
	});

});

router.get('/deleteRecipe', (req, res) => {
		console.log("delete recipe");
		database.getConnection(function (err, dbConnection) {
			if (err) {
				res.render('error', { message: 'Error connecting to MySQL' });
				console.log("Error connecting to mysql");
				console.log(err);
			}
			else {
				console.log(req.query);
				let recipeID = req.query.id;
				if (recipeID) {
					dbModel.deleteRecipe(recipeID, (err, result) => {
						if (err) {
							res.render('error', { message: 'Error writing to MySQL' });
							console.log("Error writing to mysql");
							console.log(err);
						}
						else { //success
							res.redirect("/");
							//Output the results of the query to the Heroku Logs
							console.log(result);
						}
					});
				}
				else {
					res.render('error', { message: 'Error on Delete' });
				}
	
				dbConnection.release();
			}
		});
	});

	router.post('/addRecipe', (req, res) => {
			console.log("form submit");
			database.getConnection(function (err, dbConnection) {
				if (err) {
					res.render('error', { message: 'Error connecting to MySQL' });
					console.log("Error connecting to mysql");
					console.log(err);
				}
				else {
					console.log(req.body);
					dbModel.addRecipe(req.body, (err, result) => {
						if (err) {
							res.render('error', { message: 'Error writing to MySQL' });
							console.log("Error writing to mysql");
							console.log(err);
						}
						else { //success
							res.redirect("/");
							//Output the results of the query to the Heroku Logs
							console.log(result);
						}
					});
		
					dbConnection.release();
				}
			});
		});

		
		router.get('/showIngredients', (req, res) => {
	console.log("page hit");
	database.getConnection(function (err, dbConnection) {
		if (err) {
			res.render('error', {message: 'Error connecting to MySQL'});
			console.log("Error connecting to mysql");
			console.log(err);
		}
		else {
			let recipeQueryId = req.query.id;
			dbModel.showIngredients(recipeQueryId, (err, result) => {
				if (err) {
					res.render('error', {message: 'Error reading from MySQL'});
					console.log("Error reading from mysql");
					console.log(err);
				}
				else { //success
					res.render('ingredients', {allIngredients: result});

					//Output the results of the query to the Heroku Logs
					console.log(result);
				}
			});
			dbConnection.release();
		}
	});

});

router.get('/deleteIngredient', (req, res) => {
	console.log("delete review");
	database.getConnection(function (err, dbConnection) {
		if (err) {
			res.render('error', { message: 'Error connecting to MySQL' });
			console.log("Error connecting to mysql");
			console.log(err);
		}
		else {
			console.log(req.query);
			let ingredientID = req.query.id;
			if (ingredientID) {
				dbModel.deleteIngredient(ingredientID, (err, result) => {
					if (err) {
						res.render('error', { message: 'Error writing to MySQL' });
						console.log("Error writing to mysql");
						console.log(err);
					}
					else { //success
						res.redirect("/");
						//Output the results of the query to the Heroku Logs
						console.log(result);
					}
				});
			}
			else {
				res.render('error', { message: 'Error on Delete' });
			}

			dbConnection.release();
		}
	});
});

router.post('/addIngredients', (req, res) => {
	console.log("form submit");
	database.getConnection(function (err, dbConnection) {
		if (err) {
			res.render('error', { message: 'Error connecting to MySQL' });
			console.log("Error connecting to mysql");
			console.log(err);
		}
		else {
			console.log(req.body);
			dbModel.addIngredient(req.body, (err, result) => {
				if (err) {
					res.render('error', { message: 'Error writing to MySQL' });
					console.log("Error writing to mysql");
					console.log(err);
				}
				else { //success
					res.redirect("/");
					//Output the results of the query to the Heroku Logs
					console.log(result);
				}
			});

			dbConnection.release();
		}
	});
});

//const dbModel = include('staticData');
// router.get('/deleteRestaurant', (req, res) => {
// 	console.log("delete user");
// 	database.getConnection(function (err, dbConnection) {
// 		if (err) {
// 			res.render('error', { message: 'Error connecting to MySQL' });
// 			console.log("Error connecting to mysql");
// 			console.log(err);
// 		}
// 		else {
// 			console.log(req.query);
// 			let restaurantId = req.query.id;
// 			if (restaurantId) {
// 				dbModel.deleteRestaurant(restaurantId, (err, result) => {
// 					if (err) {
// 						res.render('error', { message: 'Error writing to MySQL' });
// 						console.log("Error writing to mysql");
// 						console.log(err);
// 					}
// 					else { //success
// 						res.redirect("/");
// 						//Output the results of the query to the Heroku Logs
// 						console.log(result);
// 					}
// 				});
// 			}
// 			else {
// 				res.render('error', { message: 'Error on Delete' });
// 			}

// 			dbConnection.release();
// 		}
// 	});
// });


// router.post('/addRestaurants', (req, res) => {
// 	console.log("form submit");
// 	database.getConnection(function (err, dbConnection) {
// 		if (err) {
// 			res.render('error', { message: 'Error connecting to MySQL' });
// 			console.log("Error connecting to mysql");
// 			console.log(err);
// 		}
// 		else {
// 			console.log(req.body);
// 			dbModel.addRestaurant(req.body, (err, result) => {
// 				if (err) {
// 					res.render('error', { message: 'Error writing to MySQL' });
// 					console.log("Error writing to mysql");
// 					console.log(err);
// 				}
// 				else { //success
// 					res.redirect("/");
// 					//Output the results of the query to the Heroku Logs
// 					console.log(result);
// 				}
// 			});

// 			dbConnection.release();
// 		}
// 	});
// });
// router.post('/addReview', (req, res) => {
// 	console.log("form submit");
// 	database.getConnection(function (err, dbConnection) {
// 		if (err) {
// 			res.render('error', { message: 'Error connecting to MySQL' });
// 			console.log("Error connecting to mysql");
// 			console.log(err);
// 		}
// 		else {
// 			console.log(req.body);
// 			dbModel.addReview(req.body, (err, result) => {
// 				if (err) {
// 					res.render('error', { message: 'Error writing to MySQL' });
// 					console.log("Error writing to mysql");
// 					console.log(err);
// 				}
// 				else { //success
// 					res.redirect("/");
// 					//Output the results of the query to the Heroku Logs
// 					console.log(result);
// 				}
// 			});

// 			dbConnection.release();
// 		}
// 	});
// });
// router.get('/', (req, res) => {
// 	console.log("page hit");
// 	database.getConnection(function (err, dbConnection) {
// 		if (err) {
// 			res.render('error', {message: 'Error connecting to MySQL'});
// 			console.log("Error connecting to mysql");
// 			console.log(err);
// 		}
// 		else {
			
// 			dbModel.grabRestaurants((err, result) => {
// 				if (err) {
// 					res.render('error', {message: 'Error reading from MySQL'});
// 					console.log("Error reading from mysql");
// 					console.log(err);
// 				}
// 				else { //success
// 					res.render('index', {allRestaurants: result});

// 					//Output the results of the query to the Heroku Logs
// 					console.log(result);
// 				}
// 			});
// 			dbConnection.release();
// 		}
// 	});

// });

// router.get('/showReviews', (req, res) => {
// 	console.log("page hit");
// 	database.getConnection(function (err, dbConnection) {
// 		if (err) {
// 			res.render('error', {message: 'Error connecting to MySQL'});
// 			console.log("Error connecting to mysql");
// 			console.log(err);
// 		}
// 		else {
// 			let reviewQueryId = req.query.id;
// 			dbModel.showReviews(reviewQueryId, (err, result) => {
// 				if (err) {
// 					res.render('error', {message: 'Error reading from MySQL'});
// 					console.log("Error reading from mysql");
// 					console.log(err);
// 				}
// 				else { //success
// 					res.render('reviews', {allReviews: result});

// 					//Output the results of the query to the Heroku Logs
// 					console.log(result);
// 				}
// 			});
// 			dbConnection.release();
// 		}
// 	});

// });

// router.get('/deleteReview', (req, res) => {
// 	console.log("delete review");
// 	database.getConnection(function (err, dbConnection) {
// 		if (err) {
// 			res.render('error', { message: 'Error connecting to MySQL' });
// 			console.log("Error connecting to mysql");
// 			console.log(err);
// 		}
// 		else {
// 			console.log(req.query);
// 			let reviewId = req.query.id;
// 			if (reviewId) {
// 				dbModel.deleteReview(reviewId, (err, result) => {
// 					if (err) {
// 						res.render('error', { message: 'Error writing to MySQL' });
// 						console.log("Error writing to mysql");
// 						console.log(err);
// 					}
// 					else { //success
// 						res.redirect("/");
// 						//Output the results of the query to the Heroku Logs
// 						console.log(result);
// 					}
// 				});
// 			}
// 			else {
// 				res.render('error', { message: 'Error on Delete' });
// 			}

// 			dbConnection.release();
// 		}
// 	});
// });

module.exports = router;
