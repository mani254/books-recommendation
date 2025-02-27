
const jwt = require('jsonwebtoken')

const userAuthorisation = async (req, res, next) => {
   const token = req.cookies?.authToken;


   if (!token) {
      return res.status(401).json({ error: 'UnAuthorized access' });
   }
   try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (decoded.userId) {
         req.userId = decoded.userId
         return next()
      }

      else {
         return res.status(404).json({ error: 'Not authorized to access data' });
      }

   } catch (error) {
      if (error.name === 'TokenExpiredError') {
         return res.status(404).json({ error: 'Token expired, please log in again' });
      }

      return res.status(401).json({ error: 'Invalid token' });
   }

}

module.exports = userAuthorisation
