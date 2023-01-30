const jwt = require("jsonwebtoken");

const tokenExtractor = (handler) => {
  return async (req, res) => {
    const authorization = req.headers.authorization;

    if (authorization && authorization.startsWith("Bearer ")) {
      const token = authorization.split(" ")[1];
      try {
        const decodedToken = jwt.verify(token, process.env.SECRET);
        console.log("decodedToken");
        req.user = decodedToken;
      } catch {
        return res.status(401).json({ error: "token invalid" });
      }
    }
    return handler(req, res);
  };
};
export default tokenExtractor;
