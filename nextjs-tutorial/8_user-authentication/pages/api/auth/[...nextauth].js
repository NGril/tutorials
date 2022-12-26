import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { connectToDatabase } from "../../../lib/db";
import { verifyPassword } from "../../../lib/auth";

// notice this export where we call the function
// this is because NextAuth(); returns the handler function we need
// see the next-auth docs to dive deeper into the different configuration options
export default NextAuth({
  // for credential based providers we need to have jwt enabled
  session: {
    jwt: true,
  },
  // logic for our credentials
  providers: [
    Providers.Credentials({
      credentials: {
        async authorize(credentials) {
          const client = connectToDatabase();

          const usersCollection = client.db().collection("users");

          const user = await usersCollection.findOne({
            email: credentials.email,
          });

          if (!user) {
            client.close();
            throw new Error("No user found!");
          }

          const isValid = await verifyPassword(
            credentials.password,
            user.password
          );

          if (!isValid) {
            client.close();
            throw new Error("Could not log you in!");
          }

          client.close();

          // the returned object here will be included in the session object
          // because of that we don't want to include the password here (even though it's hashed)
          return {
            email: user.email,
          };
        },
      },
    }),
  ],
});
