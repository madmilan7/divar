import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { addCategory } from "services/admin";

import styles from "./CategoryForm.module.css";

function CategoryForm() {
  const [form, setForm] = useState({ name: "", slug: "", icon: "" });

  const { mutate, data, isPending, error } = useMutation({
    mutationFn: addCategory,
  });
  console.log({ data, isPending, error });

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.name || !form.slug || !form.icon) return;

    mutate(form);
  };

  return (
    <form
      onChange={handleChange}
      onSubmit={handleSubmit}
      className={styles.form}
    >
      <h3>دسته بندی جدید</h3>
      {!!error && <p>مشکلی وجود دارد</p>}
      {data?.status === 201 && <p>با موفقیت اضافه شد</p>}
      <label htmlFor="name">اسم دسته بندی</label>
      <input type="text" name="name" id="neme" />
      <label htmlFor="slug">اسلاگ</label>
      <input type="text" name="slug" id="slug" />
      <label htmlFor="icon">ایکون</label>
      <input type="text" name="icon" id="icon" />
      <button type="submit" disabled={isPending}>
        ایجاد
      </button>
    </form>
  );
}

export default CategoryForm;
