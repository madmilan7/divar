import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";
import { getCategory } from "services/admin";
import { getCookie } from "utils/cookie";

import styles from "./AddPost.module.css";
import toast from "react-hot-toast";

function AddPost() {
  const [form, setForm] = useState({
    title: "",
    content: "",
    amount: null,
    city: "",
    category: "",
    images: null,
  });

  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategory,
  });

  const handleChange = (event) => {
    const name = event.target.name;

    if (name === "images") {
      setForm({ ...form, [name]: event.target.files[0] });
    } else {
      setForm({ ...form, [name]: event.target.value });
    }
  };

  const handleAdd = (event) => {
    event.preventDefault();

    const formData = new FormData();
    for (let i in form) {
      formData.append(i, form[i]);
    }

    const token = getCookie("accessToken");
    axios
      .post(`${import.meta.env.VITE_BASE_URL}post/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `bearer ${token}`,
        },
      })
      .then((res) => toast.success(res.data.message))
      .catch(() => toast.error("مشکلی وجود دارد"));
  };

  return (
    <form onChange={handleChange} className={styles.form}>
      <h3>افزودن آگهی</h3>
      {/* title */}
      <label htmlFor="title">عنوان</label>
      <input type="text" name="title" id="title" />
      {/* content */}
      <label htmlFor="content">توضیحات</label>
      <textarea name="content" id="content" />
      {/* amount */}
      <label htmlFor="amount">قیمت</label>
      <input type="number" name="amount" id="amount" />
      {/* city */}
      <label htmlFor="city">شهر</label>
      <input type="text" name="city" id="city" />
      {/* category */}
      <label htmlFor="category">دسته بندی</label>
      <select name="category" id="category">
        {data?.data.map((item) => (
          <option key={item._id} value={item._id}>
            {item.name}
          </option>
        ))}
      </select>
      {/* image */}
      <label htmlFor="images">عکس</label>
      <input type="file" name="images" id="images" />
      <button onClick={handleAdd}>ایجاد</button>
    </form>
  );
}

export default AddPost;
