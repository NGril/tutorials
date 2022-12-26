import Link from "next/link";

function ClientsPage() {
  const cleints = [
    { id: 1, name: "Max" },
    { id: 2, name: "Manu" },
  ];

  return (
    <div>
      <h1>The Clients page</h1>
      <ul>
        {cleints.map((client) => (
          <li key={client.id}>
            <Link
              href={{
                pathname: "/clients/[id]",
                query: { id: client.id },
              }}
            >
              {client.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ClientsPage;
