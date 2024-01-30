import jwt from "jsonwebtoken";

class Verification {
  static async verifyCreator(req, res, next) {
    const login_token = req.headers["authorization"];

    if (!login_token) {
      return res.status(401).json({ message: "No login token provided" });
    }

    let login_token_split = login_token.split(" ");

    jwt.verify(
      login_token_split[1],
      process.env.ACCESS_TOKEN_SECRET,
      (err, decoded) => {
        if (err) {
          console.log(err);
          return res
            .status(403)
            .json({ message: "Failed to authenticate login token" });
        }
        // else if (decoded.isCreator !== true || decoded.isAdmin !== true) {
        else if (!decoded.isCreator && !decoded.isAdmin) {
          return res
            .status(403)
            .json({ message: "Forbidden: Insufficient permissions" });
        }
        req.id = decoded.id;
        next();
      }
    );
  }

  static async verifyDonor(req, res, next) {
    const login_token = req.headers["authorization"];

    if (!login_token) {
      return res.status(401).json({ message: "No login token provided" });
    }

    let login_token_split = login_token.split(" ");

    jwt.verify(
      login_token_split[1],
      process.env.ACCESS_TOKEN_SECRET,
      (err, decoded) => {
        if (err) {
          console.log(err);
          return res
            .status(403)
            .json({ message: "Failed to authenticate login token" });
        } else if (!decoded.isDonor && !decoded.isAdmin) {
          return res
            .status(403)
            .json({ message: "Forbidden: Insufficient permissions" });
        }

        req.id = decoded.id;
        next();
      }
    );
  }

  static async verifyAdmin(req, res, next) {
    const admin_token = req.headers["authorization"];

    if (!admin_token) {
      return res.status(401).json({ message: "No token provided" });
    }

    let admin_token_split = admin_token.split(" ");

    jwt.verify(
      admin_token_split[1],
      process.env.ACCESS_TOKEN_SECRET,
      (err, decoded) => {
        if (err) {
          console.log(err);
          return res
            .status(403)
            .json({ message: "Failed to authenticate admin token" });
        } else if (!decoded.isAdmin) {
          return res
            .status(403)
            .json({ message: "Forbidden: Insufficient permissions" });
        }
        req.id = decoded.id;
        next();
      }
    );
  }

  static async verifyLogin(req, res, next) {
    const token = req.headers["authorization"];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    let token_split = token.split(" ");

    jwt.verify(
      token_split[1],
      process.env.ACCESS_TOKEN_SECRET,
      (err, decoded) => {
        if (err) {
          console.log(err);
          return res
            .status(403)
            .json({ message: "Failed to authenticate admin token" });
        }
        req.id = decoded.id;
        next();
      }
    );
  }
}

export default Verification;
