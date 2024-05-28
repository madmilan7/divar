import styles from "./Main.module.css";

function Main({ posts }) {
  const baseURL = import.meta.env.VITE_BASE_URL;

  // Check if the posts array is empty
  if (posts.posts.length === 0) {
    return <div>پستی وجود ندارد!</div>;
  }

  return (
    <div className={styles.container}>
      {posts?.posts.map((post) => (
        <div key={post._id} className={styles.card}>
          <div className={styles.info}>
            <p>{post.options?.title}</p>
            <div>
              <p>{post.amount.toLocaleString("fa-IR")}</p>
              <span>{post.options?.city}</span>
            </div>
          </div>
          <img src={`${baseURL}${post.images[0]}`} />
        </div>
      ))}
    </div>
  );
}

export default Main;
