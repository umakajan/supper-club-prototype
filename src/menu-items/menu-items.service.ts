/**
 * Data Model Interfaces
 */

import { MenuItem } from "./menu-item.interface";
import { MenuItems } from "./menu-items.interface";

/**
 * In-Memory Store
 * It's important to note that anytime that you reset the server, the in-memory
 * store is wiped. However, since you are using webpack's Hot-Module Replacement,
 * that only happens when you make changes to the service module file.
 */

const menuItems: MenuItems = {
  1: {
    id: 1,
    name: "Burger",
    price: 5.99,
    description: "Tasty",
    image: "https://cdn.auth0.com/blog/whatabyte/burger-sm.png"
  },
  2: {
    id: 2,
    name: "Pizza",
    price: 2.99,
    description: "Cheesy",
    image: "https://cdn.auth0.com/blog/whatabyte/pizza-sm.png"
  },
  3: {
    id: 3,
    name: "Tea",
    price: 1.99,
    description: "Informative",
    image: "https://cdn.auth0.com/blog/whatabyte/tea-sm.png"
  }
};

/**
 * Service Methods
 */

export const findAll = async (): Promise<MenuItems> => {
  return menuItems;
};

export const find = async (id: number): Promise<MenuItem> => {
  const record: MenuItem = menuItems[id];

  if (record) {
    return record;
  }

  throw new Error("No Record Record!");
};

export const create = async (newMenuItem: MenuItem): Promise<void> => {
  const id = new Date().valueOf();

  menuItems[id] = {
    ...newMenuItem,
    id
  };
};

export const update = async (updatedMenuItem: MenuItem): Promise<void> => {
  if (menuItems[updatedMenuItem.id]) {
    menuItems[updatedMenuItem.id] = updatedMenuItem;
    return;
  }

  throw new Error("No record found to update");
};

export const remove = async (id: number): Promise<void> => {
  const record: MenuItem = menuItems[id];

  if (record) {
    delete menuItems[id];
    return;
  }

  throw new Error("No record found to delete");
};
