import { create } from "zustand";

const useUserStore = create((set, get) => ({
  users: [],
  total: 0,
  loading: false,
  search: "",
  page: 0,
  limit: 10,

  // Fetch users with caching
  fetchUsers: async () => {
    const { page, limit, search, users } = get();

    // Simple cache: reuse data if already fetched and no search
    if (users.length > 0 && !search) {
      return;
    }

    set({ loading: true });

    const skip = page * limit;
    const url = search
      ? `https://dummyjson.com/users/search?q=${search}`
      : `https://dummyjson.com/users?limit=${limit}&skip=${skip}`;

    const res = await fetch(url);
    const data = await res.json();

    set({
      users: data.users || [],
      total: data.total || 0,
      loading: false,
    });
  },

  // Update search
  setSearch: (value) => set({ search: value, page: 0 }),

  // Update page
  setPage: (value) => set({ page: value }),
}));

export default useUserStore;
