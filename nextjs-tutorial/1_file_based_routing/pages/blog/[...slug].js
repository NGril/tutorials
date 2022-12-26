import { useRouter } from "next/router";

function BlogPostsPage() {
  const router = useRouter();

  // for example if we go to the path /blog/write/whatever/you/want this will print { slug: ['write', 'whatever', 'you', 'want'] }
  console.log(router.query);

  return (
    <div>
      <h1>Blog Posts Page</h1>
    </div>
  );
}

export default BlogPostsPage;
