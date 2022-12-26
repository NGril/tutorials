import UserProfile from "../components/profile/user-profile";
import { getSession } from "next-auth/client";

function ProfilePage() {
  return <UserProfile />;
}

// SERVER SIDE ROUTE GUARD
export async function getServerSideProps(context) {
  // by passing the request into the getSession object it will automatically look into it and extract the data it needs (session token cookie)
  const session = await getSession({
    req: context.req,
  });

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default ProfilePage;
