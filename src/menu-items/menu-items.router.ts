/**
 * Required External Modules and Interfaces
 */

import express, { Request, Response } from "express";
import * as MenuItemService from "./menu-items.service";
import { MenuItem } from "./menu-item.interface";
import { MenuItems } from "./menu-items.interface";

import { checkJwt } from "../middleware/auth.middleware";

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

    console.log(process.env);

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

menuItemsRouter.post("/", async (req: Request, res: Response) => {
  try {
    const menuItem: MenuItem = req.body.menuItem;

    await MenuItemService.create(menuItem);

    res.sendStatus(201);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

// PUT items/

menuItemsRouter.put("/", async (req: Request, res: Response) => {
  try {
    const menuItem: MenuItem = req.body.item;

    await MenuItemService.update(menuItem);

    res.sendStatus(200);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// DELETE items/:id

menuItemsRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    await MenuItemService.remove(id);

    res.sendStatus(200);
  } catch (e) {
    res.status(500).send(e.message);
  }
});
