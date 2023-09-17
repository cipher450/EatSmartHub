// db/dbManager.js
import { PrismaClient } from '@prisma/client';
import { getFormatedDate } from '../util';
const prisma = new PrismaClient();

async function login(args) {
  try {
    const { role, password } = args;

    const user = await prisma.users.findMany({
      where: {
        role: role,
        password: password,
      },
    });

    if (user.length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
}
async function getItems(action, payload) {
  const items = await prisma.items.findMany({
    include: {
      categories: {
        select: {
          name: true,
        },
      },
    },
  });

  switch (action) {
    case 'get':
      console.log('items', items);
      return items;
      break;
    case 'getOne':
      const selectedItem = await prisma.items.findUnique({
        where: {
          item_id: payload,
        },
      });
      return selectedItem;
      break;
    case 'filtre':
      const where = {};
      if (
        payload.categorie == undefined ||
        payload.name == undefined ||
        payload.price == undefined
      ) {
        return items;
      }
      if (payload.name) {
        where.name = {
          contains: payload.name,
        };
      }

      if (payload.categorie) {
        where.category_id = payload.categorie;
      }

      if (payload.price) {
        where.price = payload.price;
      }
      console.log(where);
      const filteredItems = await prisma.items.findMany({
        where: where,
        include: {
          categories: {
            select: {
              name: true,
            },
          },
        },
      });

      return filteredItems;
      break;

    case 'update':
      const updatedItem = await prisma.items.update({
        where: {
          item_id: payload.item_id,
        },
        data: payload,
      });
      return updatedItem;
      break;
    case 'delete':
      await prisma.items.delete({
        where: {
          item_id: payload.item_id,
        },
      });

      break;
  }
}

async function getTables(action, payload) {
  const tables = await prisma.tablz.findMany();
  switch (action) {
    case 'get':
      return tables;
      break;

    case 'add':
      const tableCount = await prisma.tablz.count();
      const table = await prisma.tablz.create({
        data: {
          number: tableCount + 1,
          status: 'libre',
        },
      });

      return tables;
      break;
    case 'delete':
      const tableTodel = await prisma.tablz.delete({
        where: {
          table_id: payload.table_id,
          number: payload.number,
        },
      });
      return tables;
      break;
    case 'check':
      const tableStatus = await prisma.tablz.findUnique({
        where: {
          table_id: payload,
        },
        select: {
          status: true,
        },
      });

      return tableStatus;
    case 'update':
      const updated = await prisma.tablz.update({
        where: {
          table_id: payload.table_id,
        },
        data: {
          status: payload.status,
        },
      });
      console.log(updated);
      return updated;
      break;
  }
}
async function getCategories(action, payload) {
  const categories = await prisma.categories.findMany();

  switch (action) {
    case 'get':
      return categories;
      break;
    case 'add':
      await prisma.categories.create({
        data: {
          name: payload,
        },
      });
      break;
      return categories;
    case 'delete':
      await prisma.categories.delete({
        where: {
          category_id: payload,
        },
      });
      return categories;
      break;
    case 'update':
      console.log('the payload', payload);
      await prisma.categories.update({
        where: {
          category_id: payload.category_id,
        },
        data: {
          name: payload.name,
        },
      });
      return categories;
      break;
  }
}

async function handleOrders(action, payload) {
  const orders = await prisma.orders.findMany();

  switch (action) {
    case 'get':
      return orders;
      break;
    case 'getOne':
      const order = await prisma.orders.findUnique({
        where: {
          order_id: payload,
        },
      });
      break;
    case 'getByTable':
      const CurrentOrder = await prisma.orders.findFirst({
        where: {
          table_number: payload,
          status: 'pending',
        },
      });
      return CurrentOrder;
      break;
    case 'create':
      const created = await prisma.orders.create({
        data: {
          table_number: payload,
          order_date: getFormatedDate(),
          status: 'pending',
        },
      });

      return created;
      break;
  }
}

async function handleOrderItems(action, payload) {
  const OrderItems = await prisma.orderitems.findMany({
    where: {
      order_id: payload.order_id,
    },
    select: {
      order_item_id:true,
      quantity: true,
      items: {
        select: {
          name: true,
          price: true,
        },
      },
    },
  });

  switch (action) {
    case 'add':
      await prisma.orderitems.create({
        data: {
          
          order_id: payload.order_id,
          quantity: payload.quantity,
          item: payload.item,
        },
        select: {
          order_item_id:true,
          quantity: true,
          items: {
            select: {
              name: true,
              price: true,
            },
          },
        },
      });

      return OrderItems;
      break;
    case 'get':
      return OrderItems;
      break;
  }
}
module.exports = {
  login,
  getItems,
  getTables,
  getCategories,
  handleOrders,
  handleOrderItems,
};
