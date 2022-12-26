import { useRouter } from "next/router";

function PortfolioProjectPage() {
  const router = useRouter();

  // this will print out /portfolio/[projectId]
  console.log(router.pathname);

  // this will print out { projectId: "1" } (or any concrete value it matches)
  console.log(router.query);

  return (
    <div>
      <h1>The Portfolio Project Page</h1>
    </div>
  );
}

export default PortfolioProjectPage;
