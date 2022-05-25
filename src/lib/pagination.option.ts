import { CountElement } from "./database.operations";
import { Db } from "mongodb";
export async function pagination(
  db: Db,
  collection: string,
  page: number = 1,
  itemsPage: number = 20,
  filter : object = {}
) {
  //  ->  Comprobar numero de items por Pagina
  if (itemsPage < 1 || itemsPage > 20) {
    itemsPage = 20;
  }

  if (page < 1) {
    page = 1;
  }
  const total = await CountElement(db, collection, filter);

  const pages = Math.ceil(total / itemsPage);

  return {
    page,
    skip: (page - 1) * itemsPage,
    itemsPage,
    total,
    pages,
  };
}