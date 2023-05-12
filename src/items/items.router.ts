/**
 * import the required external modules and interfaces
 */

import express, {Router, Request, Response} from 'express';
import * as ItemService from './items.service';
import { Item } from './item.interface';

/**
 * Router Definition
 */

export const itemsRouter: Router = express.Router();

/**
 * request handlers definitions
 */

// GET items

itemsRouter.get('/',async (req: Request, res: Response) => {
    try {
        const items: Item[] = await ItemService.findAllItems();
        res.status(200).send(items);
    } catch (error) {
        res.status(500).send(error);
    }
});

// GET items/:id

itemsRouter.get('/:id',async (req: Request, res: Response) => {
    const id : number = parseInt(req.params.id, 10);

    try {
        const item : Item = await ItemService.findItem(id);
        if (item) {
            res.status(200).send(item);
        }
        res.status(404).send("item not found");
    } catch (error) {
        res.status(500).send(error);
    }
});

// POST items

itemsRouter.post('/', async (req: Request, res: Response)=>{
    try {
        const item: Item = req.body;
        const newItem: Item = await ItemService.createItem(item);
        res.status(201).send(newItem);
    } catch (error) {
        res.status(500).send(error);
    }
});

// PUT items/:id

itemsRouter.put("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    try {
      const itemUpdate: Item = req.body;
      const existingItem: Item = await ItemService.findItem(id);

      if (existingItem) {
        const updatedItem = await ItemService.updateItem(id, itemUpdate);
        return res.status(200).json(updatedItem);
      }

      const newItem = await ItemService.createItem(itemUpdate);
      res.status(201).json(newItem);
    } catch (error) {
      res.status(500).send(error);
    }
  });


// DELETE items/:id

itemsRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
      const id: number = parseInt(req.params.id, 10);
      await ItemService.removeItem(id);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).send(error);
    }
  });
