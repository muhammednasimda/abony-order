import create from "zustand";

let useStore = (set, get) => ({
  orders: [],
  setOrders: (ordersArray) => {
    set((state) => ({ orders: [...ordersArray] }));
  },
  updateOrders: (ordersArray) => {
    set((state) => ({ orders: [...state.orders, ...ordersArray] }));
  },
  orders_searched: [],
  setSearchedOrders: (ordersArray) => {
    set((state) => ({ orders_searched: [...ordersArray] }));
  },
  search_value: "",
  setSearchValue: (value) => {
    set((state) => ({ search_value: value }));
  },
});

useStore = create(useStore);

export default useStore;
