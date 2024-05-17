import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { getPosts } from "services/user";
import { getCookie } from "utils/cookie";
import Loader from "components/modules/Loader";
import toast from "react-hot-toast";

import styles from "./PostList.module.css";

function PostList() {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const queryClient = useQueryClient();

  const deletePost = async (id) => {
    const token = getCookie("accessToken");

    await axios
      .delete(`${import.meta.env.VITE_BASE_URL}post/delete/${id}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      .then(() => toast.success("آگهی شما حذف شد"))
      .catch(() => toast.error("آگهی شما حذف نشد!!"));
  };

  const { data, isPending } = useQuery({
    queryKey: ["myPostList"],
    queryFn: getPosts,
  });

  const { mutate } = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries(["myPostList"]);
    },
  });

  const handleDelete = (postId) => {
    mutate(postId);
  };

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
              <button onClick={() => handleDelete(post._id)}>حذف</button>
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
