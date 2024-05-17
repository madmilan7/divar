import { useQuery } from "@tanstack/react-query";
import Loader from "components/modules/Loader";
import { getPosts } from "services/user";

import styles from "./PostList.module.css";

function PostList() {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const { data, isPending } = useQuery({
    queryKey: ["myPostList"],
    queryFn: getPosts,
  });

  return (
    <div className={styles.list}>
      {isPending ? (
        <Loader />
      ) : (
        <>
          <h3>آگهی های شما</h3>
          {data.data.posts.map((post) => (
            <div key={post._id} className={styles.post}>
              <img src={`${baseURL}${post.images[0]}`} />
              <div>
                <p>{post.options.title}</p>
                <span>{post.options.content}</span>
              </div>
              <div className={styles.price}>
                <p>{new Date(post.createdAt).toLocaleDateString("fa-IR")}</p>
                <span>{post.amount.toLocaleString("fa-IR")}</span>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default PostList;
