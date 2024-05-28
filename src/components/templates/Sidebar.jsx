import styles from "./Sidebar.module.css";

function Sidebar({ categories, onCategoryClick }) {
  const allCategory = {
    _id: "all",
    name: "همه",
    slug: "all",
    icon: "all",
  };

  const updatedCategories = [allCategory, ...categories.data];

  return (
    <div className={styles.sidebar}>
      <h3>دسته بندی ها</h3>
      <ul>
        {updatedCategories?.map((category) => (
          <li key={category._id} onClick={() => onCategoryClick(category.slug)}>
            <img src={`${category.icon}.svg`} />
            <p>{category.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
