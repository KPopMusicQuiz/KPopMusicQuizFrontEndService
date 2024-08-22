/**
 * Publicly accessible routes
 * They do not require authentication
 * @type {string[]}
 */
export const publicRoutes = [
  "/",
  "/profile",
  "/leaderboard",
  "/forum",
  "/help",
  "/new-verification",
];


/**
 * Authentication routes
 * They will redirect users to /settings
 * @type {string[]}
 */
export const authRoutes = [
  "/login",
  "/register",
  "/error",
  "/reset",
  "/new-password",
];


/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API
 * authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

export const DEFAULT_LOGIN_REDIRECT = "/";