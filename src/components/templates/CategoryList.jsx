import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loader from "components/modules/Loader";
import { getCategory } from "services/admin";
import { deleteCategory } from "services/admin";

import styles from "./CategoryList.module.css";

function CategoryList() {
  const { data, isPending } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategory,
  });

  const queryClient = useQueryClient();

  const deleteCategoryMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries("categories");
    },
  });

  const handleDelete = async (categoryId) => {
    try {
      await deleteCategoryMutation.mutateAsync(categoryId);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <div className={styles.list}>
      {isPending ? (
        <Loader />
      ) : (
        data?.data.map((item) => (
          <div key={item._id}>
            <img src={`${item.icon}.svg`} />
            <h5>{item.name}</h5>
            <button onClick={() => handleDelete(item._id)}>حذف</button>
            <p>slug: {item.slug}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default CategoryList;
