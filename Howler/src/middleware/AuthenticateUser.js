const crypto = require("crypto");
const { Buffer } = require("buffer");

function base64urlDecode(string) {
  return Buffer.from(string, "base64url").toString("utf8");
}

function base64urlEncode(string) {
  return Buffer.from(string, "utf8").toString("base64url");
}

const TOKEN_COOKIE_NAME = "HowlerToken";
const API_SECRET = "SECRETKEY";

exports.AuthenticateUser = (req, res, next) => {
  let token = null;
  if (req.cookies[TOKEN_COOKIE_NAME]) {
    token = req.cookies[TOKEN_COOKIE_NAME];
  } else {
    const authHeader = req.get("Authorization");
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1].trim();
    }
  }

  if (!token) {
    res.status(401).json({ error: "Not Authenticated" });
    return;
  }

  try {
    const encodedHeader = token.split(".")[0];
    const encodedPayload = token.split(".")[1];
    const signature = token.split(".")[2];

    const payload = JSON.parse(base64urlDecode(encodedPayload));
    const otherSignature = crypto
      .createHmac("sha256", API_SECRET)
      .update(`${encodedHeader}.${encodedPayload}`)
      .digest("base64url");

    if (signature !== otherSignature) {
      throw new Error("Invalid token");
    }

    if (payload.exp < Date.now() / 1000) {
      throw new Error("Invalid token");
    }

    req.user = payload.user;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

exports.initializeSession = (req, res, user) => {
  let header = {
    alg: "HS256",
    typ: "JWT",
  };
  let payload = {
    user: user,
    exp: Math.floor(Date.now() / 1000) + 60 * 60,
  };

  const encodedHeader = base64urlEncode(JSON.stringify(header));
  const encodedPayload = base64urlEncode(JSON.stringify(payload));
  const signature = crypto
    .createHmac("sha256", API_SECRET)
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest("base64url");

  const token = `${encodedHeader}.${encodedPayload}.${signature}`;
  res.cookie(TOKEN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: true,
    maxAge: 360000
  });
};

exports.removeSession = (req, res) => {
  res.cookie(TOKEN_COOKIE_NAME, "", {
    secure: true,
    httpOnly: true,
    maxAge: -360000,
  });
};
