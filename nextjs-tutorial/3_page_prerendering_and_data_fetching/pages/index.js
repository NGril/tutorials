import { promises as fs } from "fs";
import path from "path";

import Link from "next/link";

function HomePage(props) {
  const { products } = props;

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <Link href={`/products/${product.id}`}>{product.title}</Link>
        </li>
      ))}
    </ul>
  );
}

// this code will never be visible on the client side
// it is ran first (on the server side - during build time) and it prepares the props for our component
// that means that that data will be visible in the page source - instead of it being loaded dynamically
export async function getStaticProps(context) {
  // process.cws() places us in the root project directory
  console.log("re-generating....");
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  if (!data) {
    return {
      redirect: {
        destination: "/no-data",
      },
    };
  }

  if (data.products.length === 0) {
    return { notFound: true };
  }

  return {
    props: {
      products: data.products,
    },
    revalidate: 10,
  };
}

export default HomePage;
