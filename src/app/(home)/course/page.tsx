import { getServerSession } from 'next-auth/next';
import { authOptions } from "@/lib/authOptions";

export default async function Courses() {
  const session = await getServerSession(authOptions);
  return (
    <h1>course 


      {
        session?.user?.email ? <p>{session.user.email}</p> : <p>not logged in</p>
      }
    </h1>
  );
};