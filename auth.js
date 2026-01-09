/**
 * Authentication Middleware
 * Mock authentication - in production, this would validate JWT tokens
 */
function mockAuth(req, res, next) {
  // For this assignment, we'll use a hardcoded user ID
  // In a real system, this would extract and validate a JWT token from headers
  const authHeader = req.headers.authorization;
  
  if (authHeader) {
    // Extract user ID from token (mock)
    // Format: "Bearer user123" or just "user123"
    const token = authHeader.replace('Bearer ', '');
    req.userId = token || 'user123'; // Default user ID
  } else {
    // Default user for testing
    req.userId = 'user123';
  }
  
  next();
}

module.exports = mockAuth;
