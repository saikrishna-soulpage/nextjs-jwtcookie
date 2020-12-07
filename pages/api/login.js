import jwt from "jsonwebtoken";

export default async (req, res) => {
  const { username } = await req.body;
  const url = `https://api.github.com/users/${username}`;

  try {
    const response = await fetch(url);

    if (response.ok) {
      const user = await response.json();

      const token = jwt.sign({ userID: user.id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      //   console.log(user);
      //   console.log(token);
      return res.status(200).json({ token, user });
    } else {
      // https://github.com/developit/unfetch#caveats
      const error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  } catch (error) {
    const { response } = error;
    return response
      ? res.status(response.status).json({ message: response.statusText })
      : res.status(400).json({ message: error.message });
  }
};
