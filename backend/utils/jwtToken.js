export const generateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken();

  let cookieName;

  if (user.role === "Admin") {
    cookieName = "adminToken";
  } else if (user.role === "Doctor") {
    cookieName = "doctorToken";
  } else {
    cookieName = "patientToken";
  }

  res
    .status(statusCode)
    .cookie(cookieName, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite:
        process.env.NODE_ENV === "production" ? "none" : "lax",
      expires: new Date(
        Date.now() +
          Number(process.env.COOKIE_EXPIRE) *
            24 *
            60 *
            60 *
            1000
      ),
    })
    .json({
      success: true,
      message,
      user,
    });
};