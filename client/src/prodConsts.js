const prodUrl = "https://url.com";
const dashboardPassword =
  "$2a$12$6F7Z1GNjO.HOOYihtnD76uPsSLnonJxgsxIYfpm1cqfDFou/L/sqi"; // "changeit" encrypted with bcrypt
const dashboardUsername = "admin";

module.exports = {
  dashboardPassword: dashboardPassword,
  prodUrl: prodUrl,
  dashboardUsername: dashboardUsername,
};
