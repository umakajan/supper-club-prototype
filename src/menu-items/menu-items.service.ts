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
    name: "Pork & Tomato Dip",
    description: "Thai version of a chili dip, served with cucumber and carrots"
  },
  2: {
    id: 2,
    name: "Steak Salad",
    description:
      "Steak cooked medium rare tossed with herbs, soy sauce, fish sauce, and lime"
  },
  3: {
    id: 3,
    name: "Green Curry (Chicken)",
    description: "Thai green curry"
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

  console.log(menuItems);
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
