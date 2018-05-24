var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('./gold_medals.sqlite');

/*
Returns a SQL query string that will create the Country table with four columns: name (required), code (required), gdp, and population.
*/
const createCountryTable = () => {
  return `CREATE TABLE Country (
    name TEXT NOT NULL,
    code TEXT NOT NULL,
    gdp INTEGER,
    population INTEGER);`;
};

/*
Returns a SQL query string that will create the GoldMedal table with ten columns (all required): id, year, city, season, name, country, gender, sport, discipline, and event.
*/
const createGoldMedalTable = () => {
  return `CREATE TABLE GoldMedal (
    id INTEGER PRIMARY KEY,
    year INTEGER NOT NULL,
    city TEXT NOT NULL,
    season TEXT NOT NULL,
    name TEXT NOT NULL,
    country TEXT NOT NULL,
    gender TEXT NOT NULL,
    sport TEXT NOT NULL,
    discipline TEXT NOT NULL,
    event TEXT NOT NULL);`;
};

/*
Returns a SQL query string that will find the number of gold medals for the given country.
*/
/*
Takes an argument, the name of a country. Returns the SQL command that will retrieve the number of gold medals that country has won in all Olympic games, aliased to the name count.
*/
const goldMedalNumber = country => {
    //return `SELECT COUNT(*) AS count FROM GoldMedal WHERE country = '${country}';`;
    return `SELECT COUNT(*) AS 'count' FROM GoldMedal WHERE country = '${country}';`;
};

/*
Returns a SQL query string that will find the year where the given country 
won the most summer medals, along with the number of medals aliased to 'count'.
*/
/*
Takes an argument, the name of a country. Returns the SQL command that will retrieve the number of gold medals that country has won only in Summer games, aliased to the name count.
*/
/*
const mostSeasonWins = (season, country) => {
  if (['Summer', 'Winter'].includes(season)) {
    return `SELECT year, COUNT(*) AS count FROM GoldMedal WHERE country = '${country}' AND season = '${season}' GROUP BY year ORDER BY COUNT(*) DESC LIMIT 1;`;
  }
  return null;
};
*/

const mostSummerWins = country => {
  return `SELECT year, COUNT(*) AS 'count' FROM GoldMedal WHERE country = '${country}' AND season = 'Summer' GROUP BY year ORDER BY COUNT(*) DESC LIMIT 1;`;
};

/*
Returns a SQL query string that will find the year where the given country 
won the most winter medals, along with the number of medals aliased to 'count'.
*/

const mostWinterWins = country => {
  return `SELECT year, COUNT(*) AS 'count' FROM GoldMedal WHERE country = '${country}' AND season = 'Winter' GROUP BY year ORDER BY COUNT(*) DESC LIMIT 1;`;
};

/*
Returns a SQL query string that will find the year where the given country 
won the most medals, along with the number of medals aliased to 'count'.
*/
/*
Takes an argument, the name of a country. Returns the SQL command that will retrieve the year that country won the most Olympic medals, and how many medals were won, aliased to the name count.
*/

const bestYear = country => {
  return `SELECT year, COUNT(*) AS 'count' FROM GoldMedal WHERE country = '${country}' GROUP BY year ORDER BY COUNT(*) DESC LIMIT 1`;
};

/*
Returns a SQL query string that will find the discipline this country has 
won the most medals, along with the number of medals aliased to 'count'.
*/

const bestDiscipline = country => {
  return `SELECT discipline, COUNT(*) AS 'count' FROM GoldMedal WHERE country = '${country}' GROUP BY discipline ORDER BY COUNT(*) DESC LIMIT 1`;
};

/*
Returns a SQL query string that will find the sport this country has 
won the most medals, along with the number of medals aliased to 'count'.
*/

const bestSport = country => {
  return `SELECT sport, COUNT(*) AS 'count' FROM GoldMedal WHERE country = '${country}' GROUP BY sport ORDER BY COUNT(*) DESC LIMIT 1`;
};

/*
Returns a SQL query string that will find the event this country has 
won the most medals, along with the number of medals aliased to 'count'.
*/

const bestEvent = country => {
  return `SELECT event, COUNT(*) AS 'count' FROM GoldMedal WHERE country = '${country}' GROUP BY event ORDER BY COUNT(*) DESC LIMIT 1`;
};

/*
Returns a SQL query string that will find the number of male medalists.
*/
/*
Takes an argument, the name of a country. Returns the SQL command that will retrieve the number of men who have won Olympic medals for that country, aliased to the name count.
 */
const numberMenMedalists = country => {
  return `SELECT gender, COUNT(DISTINCT name) AS 'count' FROM GoldMedal WHERE country = '${country}' AND gender = 'Men' GROUP BY country ORDER BY COUNT(*) DESC`;
};

/*
Returns a SQL query string that will find the number of female medalists.
*/

const numberWomenMedalists = country => {
  return `SELECT gender, COUNT(DISTINCT name) AS 'count' FROM GoldMedal WHERE country = '${country}' AND gender = 'Women' GROUP BY country ORDER BY COUNT(*) DESC`;
};

/*
Returns a SQL query string that will find the athlete with the most medals.
*/
/*
Takes an argument, the name of a country. returns the sql command that will retrieve the name of the athlete who won olympic medals for that country, aliased to the name count.
 */

const mostMedaledAthlete = country => {
  return `SELECT name, COUNT(*) AS 'count' FROM GoldMedal WHERE country = '${country}' GROUP BY name ORDER BY COUNT(*) DESC LIMIT 1`;
  // better below... but not because missing alias
  // return `SELECT name FROM GoldMedal WHERE country = '${country}' GROUP BY name ORDER BY COUNT(*) DESC LIMIT 1`;
};

/*
Returns a SQL query string that will find the medals a country has won
optionally ordered by the given field in the specified direction.
*/
/*
Takes three arguments, the name of the country and, optionally, a field to sort the results by and a boolean representing the direction the sort should go in. This function should return a SQL query that returns all fields for every Olympic medal won by the given country. When the field argument is present, the function should return a SQL query that orders the results by that field -- ascending if the direction is true and descending if the direction is false.
 */

const orderedMedals = (country, field, sortAscending) => {
  let orderingString = '';
  let isAscending = 'ASC';
  if (field) {
    if (isAscending) {
      orderingString = `ORDER BY ${field} ASC`;
    } else {
      orderingString = `ORDER BY ${field} DESC`;
    }
  }
  return `SELECT * FROM GoldMedal WHERE country = '${country}' ${orderingString};`;
};

/*
Returns a SQL query string that will find the sports a country has
won medals in. It should include the number of medals, aliased as 'count',
as well as the percentage of this country's wins the sport represents,
aliased as 'percent'. Optionally ordered by the given field in the specified direction.
*/
/*
Takes three arguments, the name of the country and, optionally, a field to sort the results by and a boolean representing the direction the sort should go in. This function should return a SQL query that retrieves all the sports that country has received a Gold Medal in, additionally the query returned should return the number of times the given country received a medal in that sport, aliased to the name count, furthermore the query should calculate, as a percentage, how much of the country's Olympic gold medals were in that sport, aliased to the name 'percent'. When the field argument is present, the function should return a SQL query that orders the results by that field -- ascending if the direction is true and descending if the direction is false.
 */

const orderedSports = (country, field, sortAscending) => {
  let orderingString = '';
  let isAscending = 'ASC';
  if (field) {
    if (isAscending) {
      orderingString = `ORDER BY ${field} ASC`;
    } else {
      orderingString = `ORDER BY ${field} DESC`;
    }
  }
  return `SELECT sport, COUNT(sport) AS count, (COUNT(sport) * 100 / (select COUNT(*) FROM GoldMedal WHERE country = '${country}')) AS percent FROM GoldMedal WHERE country = '${country}' GROUP BY sport ${orderingString};`;
};

module.exports = {
  createCountryTable,
  createGoldMedalTable,
  goldMedalNumber,
  mostSummerWins,
  mostWinterWins,
  bestDiscipline,
  bestSport,
  bestYear,
  bestEvent,
  numberMenMedalists,
  numberWomenMedalists,
  mostMedaledAthlete,
  orderedMedals,
  orderedSports
};