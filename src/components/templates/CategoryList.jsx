import { useQuery } from "@tanstack/react-query";
import Loader from "components/modules/Loader";
import { getCategory } from "services/admin";

import styles from "./CategoryList.module.css";

function CategoryList() {
  const { data, isPending } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategory,
  });

  return (
    <div className={styles.list}>
      {isPending ? (
        <Loader />
      ) : (
        data?.data.map((item) => (
          <div key={item._id}>
            <img src={`${item.icon}.svg`} />
            <h5>{item.name}</h5>
            <p>slug: {item.slug}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default CategoryList;
