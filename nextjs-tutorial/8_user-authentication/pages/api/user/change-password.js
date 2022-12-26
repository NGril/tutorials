import { getSession } from "next-auth/client";
import { connectToDatabase } from "../../../lib/db";
import { hashPassword, verifyPassword } from "../../../lib/auth";

async function handler(req, res) {
  if (req.method !== "PATCH") {
    return;
  }

  // API guard
  // NextJS tries to extract the cookie from the request object, and if it doesn't find it it doesn't return a session object
  const session = await getSession({ req });
  if (!session) {
    res.status(401).json({ message: "Not authentiicated!" });
    return;
  }

  // we can access the email because we included it in the session object in [...nextauth].js
  const userEmail = session.user.email;
  const { oldPassword, newPassword } = req.body;

  const client = await connectToDatabase();
  const usersCollection = client.db().collection("users");
  const user = await usersCollection.findOne({ email: userEmail });

  if (!user) {
    res.status(404).json({ message: "User not found!" });
    client.close();
    return;
  }

  const currentPassword = user.password;

  const passwordsAreEqual = await verifyPassword(oldPassword, currentPassword);

  if (!passwordsAreEqual) {
    client.close();
    res.status(403).json({ message: "Invalid password provided!" });
    return;
  }

  const hashedPassword = await hashPassword(newPassword);

  await usersCollection.updateOne(
    { email: userEmail },
    {
      $set: {
        password: hashedPassword,
      },
    }
  );

  client.close();
  res.status(200).json({ message: "Password updated" });
}

export default handler;
