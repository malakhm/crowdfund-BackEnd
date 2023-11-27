import jwt from 'jsonwebtoken'

class Verification{

static async  verify(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  let token_split = token.split(" ");

  jwt.verify(token_split[1], process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {

    if (err) {
        console.log(err)
      return res.status(403).json({ message: 'Failed to authenticate token' });
    }
    req.id = decoded.id;
    next();
  });
}
}

export default Verification