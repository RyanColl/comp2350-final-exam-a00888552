const database = include('/databaseConnection');


function grabRestaurants(callback) {
	let sqlQuery = "SELECT restaurant_id, name, description FROM restaurant";
	database.query(sqlQuery, (err, results, fields) => {
		if (err) {
			callback(err, null);
		}
		else {
			console.log(results);
			callback(null, results);
		}		
	});
}
function addReview(postData, callback) {
	let sqlInsert = `INSERT INTO review (restaurant_id, reviewer_name, details, rating)
						 VALUES (:restaurant_id, :reviewer_name, :details, :rating);`;
	console.log(postData.restaurant_id);
	let params = {
		reviewer_name : postData.reviewer_name,
		restaurant_id: revId,
		details: postData.details,
		rating: postData.rating
	};
	
	database.query(sqlInsert, params, (err, results, fields) => {
		if (err) {
			console.log(err);
			callback(err, null); 
		}
		else {
			console.log(results);
			callback(null, results);
		}
	});
}
function deleteReview(reviewId, callback) {
	let sqlDeleteReview = "DELETE FROM review WHERE review_id = :revID";
	let params = {
		revID: reviewId
	};
	console.log(sqlDeleteReview);
	database.query(sqlDeleteReview, params, (err, results, fields) => {
		if (err) {
			callback(err, null);
		}
		else {
			console.log(results);
			callback(null, results);
		}
	});
}
var revId;
function showReviews(reviewId, callback) {
	revId = reviewId;
	let sqlQuery = `SELECT * FROM review WHERE restaurant_id = :revID`;
	let params = {
		revID: reviewId
	};
	database.query(sqlQuery, params, (err, results, fields) => {
		if (err) {
			callback(err, null);
		}
		else {
			console.log(results);
			callback(null, results);
		}		
	});
}
function addRestaurant(postData, callback) {
	let sqlInsert = `INSERT INTO restaurant (name, description)
						 VALUES (:restaurant_name, :description);`;
	let params = {
		restaurant_name: postData.restaurant_name,
		description: postData.description,
	};
	console.log(sqlInsert);
	database.query(sqlInsert, params, (err, results, fields) => {
		if (err) {
			console.log(err);
			callback(err, null); 
		}
		else {
			console.log(results);
			callback(null, results);
		}
	});
}
function deleteRestaurant(restaurantId, callback) {
	let sqlDeleteRestaurant = "DELETE FROM restaurant WHERE restaurant_id = :restID";
	let params = {
		restID: restaurantId
	};
	console.log(sqlDeleteRestaurant);
	database.query(sqlDeleteRestaurant, params, (err, results, fields) => {
		if (err) {
			callback(err, null);
		}
		else {
			console.log(results);
			callback(null, results);
		}
	});
}
	


module.exports = {grabRestaurants, addRestaurant, deleteRestaurant, showReviews, deleteReview, addReview}
