import styles from "./Sidebar.module.css";

function Sidebar({ categories }) {
  return (
    <div className={styles.sidebar}>
      <h3>دسته بندی ها</h3>
      <ul>
        {categories.data.map((category) => (
          <li key={category._id}>
            <img src={`${category.icon}.svg`} />
            <p>{category.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
