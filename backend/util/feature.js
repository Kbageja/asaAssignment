const jwt = require("jsonwebtoken");

const sendcookie = (user, res, message) => {
  const token = jwt.sign({ id: user.id }, "jkkkk", { expiresIn: "10m" }); // Include expiry

  res
    .status(200)
    .cookie("token", token, {
      maxAge: 10 * 60 * 1000, // 10 minutes
      httpOnly: true,
      sameSite: "strict", // Adjust based on your environment
      secure: false, // Use `true` in production with HTTPS
      path: "/",
    })
    .json({
      success: true,
      message,
    });
};

module.exports = { sendcookie };
