import { create } from "zustand";
import {
  createUser,
  deleteUser,
  editUser,
  getUsers,
} from "../actions/useUserActions";

const initialState = {
  loading: false,
  users: [],
  pagination: {},
  page: 1,
  limit: 5,
  search: "",
};

export const useUserStore = create((set) => ({
  ...initialState,

  setUsers: (data) => {
    set(() => ({
      users: data.data,
      pagination: data.pagination,
    }));
  },

  setPage: ({ page, limit, search = "" }) => {
    set((state) => ({
      page: page ?? state.page,
      limit: limit ?? state.limit,
      search,
    }));
  },

  setLoading: (load) => {
    set(() => ({ loading: load }));
  },

  loadUsers: async (query) => {
    set(() => ({ loading: true }));
    getUsers(query)
      .then((res) =>
        set(() => ({
          users: res.data,
          pagination: res.pagination,
        }))
      )
      .finally(() => set(() => ({ loading: false })));
  },

  newUser: async (user) => {
    set(() => ({ loading: true }));
    createUser(user)
      .then((res) => {
        set(({ pagination, users }) => ({
          users: [res.data, ...users],
          pagination: { ...pagination, total: pagination.total + 1 },
        }));
      })
      .finally(() => set(() => ({ loading: false })));
  },

  updateUser: async (user) => {
    set(() => ({ loading: true }));
    editUser(user)
      .then(() =>
        set(({ users }) => ({
          users: [user, ...users.filter((a) => a._id != user._id)],
        }))
      )
      .finally(() => set(() => ({ loading: false })));
  },

  delUser: async (id) => {
    set(() => ({ loading: true }));
    deleteUser(id)
      .then(() =>
        set(({ pagination, users }) => ({
          users: users.filter((a) => a._id != id),
          pagination: { ...pagination, total: pagination.total - 1 },
        }))
      )
      .finally(() => set(() => ({ loading: false })));
  },
}));
