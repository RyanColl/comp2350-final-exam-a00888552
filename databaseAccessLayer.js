const database = include('/databaseConnection');

function grabRecipes(callback) {
		let sqlQuery = "SELECT recipe_id, name, description, cook_time FROM recipe";
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

	function deleteRecipe(recipeID, callback) {
			let sqlDeleteRecipe = "DELETE FROM recipe WHERE recipe_id = :revID";
			let params = {
				revID: recipeID
			};
			console.log(sqlDeleteRecipe);
			database.query(sqlDeleteRecipe, params, (err, results, fields) => {
				if (err) {
					callback(err, null);
				}
				else {
					console.log(results);
					callback(null, results);
				}
			});
		}

		function addRecipe(postData, callback) {
				let sqlInsert = `INSERT INTO recipe (name, description, cook_time)
									 VALUES (:recipe_name, :description, :cook_time);`;
				let params = {
					recipe_name: postData.recipe_name,
					description: postData.description,
					cook_time: postData.cook_time
				};
				console.log()
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
			var revId;
			function showIngredients(recipeID, callback) {
					revId = recipeID;
					let sqlQuery = `SELECT * FROM ingredient WHERE recipe_id = :revID`;
					let params = {
						revID: recipeID
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

function deleteIngredient(IngredientID, callback) {
	let sqlDeleteIngredient = "DELETE FROM ingredient WHERE ingredient_id = :revID";
	let params = {
		revID: IngredientID
	};
	console.log(sqlDeleteIngredient);
	database.query(sqlDeleteIngredient, params, (err, results, fields) => {
		if (err) {
			callback(err, null);
		}
		else {
			console.log(results);
			callback(null, results);
		}
	});
}


function addIngredient(postData, callback) {
		let sqlInsert = `INSERT INTO ingredient (recipe_id, name, description, quantity)
							 VALUES (:recipe_id, :ingredient_name, :description, :quantity);`;
		console.log("------------------------------");
		console.log(revId);
		console.log("------------------------------");
		let params = {
			ingredient_name : postData.ingredient_name,
			recipe_id: revId,
			description: postData.description,
			quantity: postData.quantity
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


module.exports = {grabRecipes, deleteRecipe, addRecipe, showIngredients, deleteIngredient, addIngredient}
