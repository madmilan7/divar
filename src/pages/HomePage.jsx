import { useQuery } from "@tanstack/react-query";

import Main from "components/templates/Main";
import Sidebar from "components/templates/Sidebar";
import Loader from "components/modules/Loader";
import { getAllPosts } from "services/user";
import { getCategory } from "services/admin";

const style = { display: "flex" };

function HomePage() {
  const { data: posts, isPending: postsLoading } = useQuery({
    queryKey: ["postLists"],
    queryFn: getAllPosts,
  });

  const { data: categories, isPending: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategory,
  });

  return (
    <>
      {postsLoading || categoriesLoading ? (
        <Loader />
      ) : (
        <div style={style}>
          <Sidebar categories={categories} />
          <Main posts={posts} />
        </div>
      )}
    </>
  );
}

export default HomePage;
