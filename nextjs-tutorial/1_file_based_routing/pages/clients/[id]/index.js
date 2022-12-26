import { useRouter } from "next/router";

function ClientsProjectsPage() {
  const router = useRouter();

  console.log(router.query);

  function loadProjectHandler() {
    // load data, do some business logic...

    // syntax 1
    // router.push("/clients/Max/projectA");

    // syntax 2
    router.push({
      pathname: "/clients/[id]/[clientProjectId]",
      query: { id: "Max", clientProjectId: "projectA" },
    });
  }

  return (
    <div>
      <h1>The Projects of a given client</h1>
      <button onClick={loadProjectHandler}>Load Project A</button>
    </div>
  );
}

export default ClientsProjectsPage;
