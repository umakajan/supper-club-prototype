/**
 * Data Model Interfaces
 */

import { Event } from "./event.interface";
import { Events } from "./events.interface";

/**
 * In-Memory Store
 * It's important to note that anytime that you reset the server, the in-memory
 * store is wiped. However, since you are using webpack's Hot-Module Replacement,
 * that only happens when you make changes to the service module file.
 */

const events: Events = {
  1: {
    id: 1,
    date: "2019-06-24",
    description: "First Event",
    cuisine: "Thai"
  },
  2: {
    id: 2,
    date: "2019-06-29",
    description: "Second Event",
    cuisine: "Thai"
  },
  3: {
    id: 3,
    date: "2019-07-06",
    description: "Third Event",
    cuisine: "Thai"
  }
};

/**
 * Service Methods
 */

export const findAll = async (): Promise<Events> => {
  return events;
};

export const find = async (id: number): Promise<Event> => {
  const record: Event = events[id];

  if (record) {
    return record;
  }

  throw new Error("No Record Record!");
};

export const create = async (newEvent: Event): Promise<void> => {
  const id = new Date().valueOf();

  events[id] = {
    ...newEvent,
    id
  };
};

export const update = async (updatedEvent: Event): Promise<void> => {
  if (events[updatedEvent.id]) {
    events[updatedEvent.id] = updatedEvent;
    return;
  }

  throw new Error("No record found to update");
};

export const remove = async (id: number): Promise<void> => {
  const record: Event = events[id];

  if (record) {
    delete events[id];
    return;
  }

  throw new Error("No record found to delete");
};
