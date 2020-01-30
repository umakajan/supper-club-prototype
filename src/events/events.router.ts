/**
 * Required External Modules and Interfaces
 */

import express, { Request, Response } from "express";
import * as eventService from "./events.service";
import { Event } from "./event.interface";
import { Events } from "./events.interface";

import { checkJwt } from "../middleware/auth.middleware";
import { checkPermissions } from "../middleware/rbac.middleware";
import { EventPermissions } from "./event.permissions";

/**
 * Router Definition
 */

export const eventsRouter = express.Router();

/**
 * Controller Definitions
 */

// GET events/

eventsRouter.get("/", async (req: Request, res: Response) => {
  try {
    const events: Events = await eventService.findAll();

    res.status(200).send(events);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

// GET events/:id

eventsRouter.get("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    const event: Event = await eventService.find(id);

    res.status(200).send(event);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

// Mount authorization middleware

eventsRouter.use(checkJwt);

// POST events/

eventsRouter.post(
  "/",
  [checkJwt, checkPermissions(EventPermissions.CreateEvents)],
  async (req: Request, res: Response) => {
    try {
      const event: Event = req.body.item;

      await eventService.create(event);

      res.sendStatus(201);
    } catch (e) {
      res.status(404).send(e.message);
    }
  }
);

// PUT events/

eventsRouter.put(
  "/",
  [checkJwt, checkPermissions(EventPermissions.UpdateEvents)],
  async (req: Request, res: Response) => {
    try {
      const event: Event = req.body.item;

      await eventService.update(event);

      res.sendStatus(200);
    } catch (e) {
      res.status(500).send(e.message);
    }
  }
);

// DELETE events/:id

eventsRouter.delete(
  "/:id",
  [checkJwt, checkPermissions(EventPermissions.DeleteEvents)],
  async (req: Request, res: Response) => {
    try {
      const id: number = parseInt(req.params.id, 10);
      await eventService.remove(id);

      res.sendStatus(200);
    } catch (e) {
      res.status(500).send(e.message);
    }
  }
);
