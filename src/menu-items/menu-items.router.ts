/**
 * Required External Modules and Interfaces
 */

import express, { Request, Response } from "express";
import * as MenuItemService from "./menu-items.service";
import { MenuItem } from "./menu-item.interface";
import { MenuItems } from "./menu-items.interface";

import { checkJwt } from "../middleware/auth.middleware";
import { checkPermissions } from "../middleware/rbac.middleware";
import { MenuItemPermissions } from "./menu-item-permissions";

/**
 * Router Definition
 */

export const menuItemsRouter = express.Router();

/**
 * Controller Definitions
 */

// GET items/

menuItemsRouter.get("/", async (req: Request, res: Response) => {
  try {
    const menuItems: MenuItems = await MenuItemService.findAll();

    res.status(200).send(menuItems);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

// GET items/:id

menuItemsRouter.get("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    const menuItem: MenuItem = await MenuItemService.find(id);

    res.status(200).send(menuItem);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

// Mount authorization middleware

menuItemsRouter.use(checkJwt);

// POST items/
// Since you are now adding two middleware functions on each write
// controller, you need to bundle them in an array.
menuItemsRouter.post(
  "/",
  [checkJwt, checkPermissions(MenuItemPermissions.CreateMenuItems)],
  async (req: Request, res: Response) => {
    try {
      const menuItem: MenuItem = req.body.item;

      await MenuItemService.create(menuItem);

      res.sendStatus(201);
    } catch (e) {
      res.status(404).send(e.message);
    }
  }
);

// PUT items/

menuItemsRouter.put(
  "/",
  [checkJwt, checkPermissions(MenuItemPermissions.UpdateMenuItems)],
  async (req: Request, res: Response) => {
    try {
      const menuItem: MenuItem = req.body.item;

      await MenuItemService.update(menuItem);

      res.sendStatus(200);
    } catch (e) {
      res.status(500).send(e.message);
    }
  }
);

// DELETE items/:id

menuItemsRouter.delete(
  "/:id",
  [checkJwt, checkPermissions(MenuItemPermissions.DeleteMenuItems)],
  async (req: Request, res: Response) => {
    try {
      const id: number = parseInt(req.params.id, 10);
      await MenuItemService.remove(id);

      res.sendStatus(200);
    } catch (e) {
      res.status(500).send(e.message);
    }
  }
);
