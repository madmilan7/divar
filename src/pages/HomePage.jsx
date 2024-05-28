import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import Main from "components/templates/Main";
import Sidebar from "components/templates/Sidebar";
import Loader from "components/modules/Loader";
import { getAllPosts } from "services/user";
import { getCategory } from "services/admin";

const style = { display: "flex" };

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category");

  const { data: posts, isPending: postsLoading } = useQuery({
    queryKey: ["postLists", category],
    queryFn: () => getAllPosts(category),
  });

  const { data: categories, isPending: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategory,
  });

  const handleCategoryClick = (category) => {
    if (category === "all") {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  };

  return (
    <>
      {postsLoading || categoriesLoading ? (
        <Loader />
      ) : (
        <div style={style}>
          <Sidebar
            categories={categories}
            onCategoryClick={handleCategoryClick}
          />
          <Main posts={posts} />
        </div>
      )}
    </>
  );
}

export default HomePage;
