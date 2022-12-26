import { useRouter } from "next/router";

function SelectedClientProjectPage() {
  const router = useRouter();

  // this will print out the full inferred path
  console.log(router.pathname);

  // this will print out both of the query parameter values
  console.log(router.query);

  return (
    <div>
      <h1>The project page for a specific project for a specific client</h1>
    </div>
  );
}

export default SelectedClientProjectPage;
