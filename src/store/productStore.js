import { create } from "zustand";

const useProductStore = create((set, get) => ({
  products: [],
  total: 0,
  loading: false,
  page: 0,
  limit: 10,
  search: "",
  category: "",

  fetchProducts: async () => {
    const { page, limit, search, category } = get();
    set({ loading: true });

    const skip = page * limit;
    let url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;

    if (search) {
      url = `https://dummyjson.com/products/search?q=${search}`;
    }

    if (category) {
      url = `https://dummyjson.com/products/category/${category}`;
    }

    const res = await fetch(url);
    const data = await res.json();

    set({
      products: data.products || [],
      total: data.total || 0,
      loading: false,
    });
  },

  setSearch: (value) => set({ search: value, page: 0 }),
  setCategory: (value) => set({ category: value, page: 0 }),
  setPage: (value) => set({ page: value }),
}));

export default useProductStore;
