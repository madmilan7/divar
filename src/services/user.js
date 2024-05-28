import api from "configs/api";

const getProfile = () => api.get("user/whoami").then((res) => res || false);

const getPosts = () => api.get("post/my");

const getAllPosts = async (category) => {
  try {
    let url = "";
    if (category) {
      url = `?category=${category}`;
    }

    const response = await api.get(url);

    if (response && response.data) {
      return response.data;
    } else {
      throw new Error("No posts data in response");
    }
  } catch (error) {
    throw new Error("Failed to fetch posts");
  }
};

export { getProfile, getPosts, getAllPosts };
