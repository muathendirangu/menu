/**
 *
 * import data model interfaces
 *
 */

import { Item } from './item.interface';
import { Items } from './items.interface';

/**
 *
 * define the in-memory data store
 *
 */

let items: Items = {
    1: {
        id: 1,
        name: "Burger",
        price: 599,
        description: "Tasty",
        image: "https://cdn.auth0.com/blog/whatabyte/burger-sm.png"
      },
      2: {
        id: 2,
        name: "Pizza",
        price: 299,
        description: "Cheesy",
        image: "https://cdn.auth0.com/blog/whatabyte/pizza-sm.png"
      },
      3: {
        id: 3,
        name: "Tea",
        price: 199,
        description: "Informative",
        image: "https://cdn.auth0.com/blog/whatabyte/tea-sm.png"
      }
};

/**
 *
 * define the service methods(items business logic)
 *
 */

export const findAllItems = async(): Promise<Item[]> => Object.values(items)

export const findItem = async(id: number): Promise<Item> => items[id];

export const createItem = async (newItem: Item): Promise<Item> => {
    const id = Date.now();
    items[id] = newItem;
    return items[id];
}

export const updateItem = async (id: number, updatedItem: Item): Promise<Item | null> =>{
    const item = findItem(id);
    if (!item) return null;
    items[id] = updatedItem;
    return items[id];
}

const removeItem = async (id: number): Promise<null | void> => {
    const item = findItem(id);
    if (!item) return null;
    delete items[id];
}
