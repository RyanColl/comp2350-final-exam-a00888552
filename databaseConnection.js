const mysql = require('mysql2');

const is_heroku = process.env.IS_HEROKU || false;

const dbConfigHeroku = {
	host: "us-cdbr-east-03.cleardb.com",
	user: "b10e85cf4bbc43",
	password: "0fb37aaa",
	database: "heroku_ab918eac2c30a40",
	multipleStatements: false,
	namedPlaceholders: true
};

const dbConfigLocal = {
	host: "localhost",
	user: "root",
	password: "rootUserIsMe856#!MyselfandSQL5894#!",
	database: "restaurant_review",
	multipleStatements: false,
	namedPlaceholders: true
};

if (is_heroku == 1) {
	var database = mysql.createPool(dbConfigHeroku);
}
else {
	var database = mysql.createPool(dbConfigLocal);
}

module.exports = database;
		