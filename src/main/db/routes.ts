// db/dbManager.js
import { PrismaClient } from '@prisma/client';

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

  try {
    const items = await prisma.items.findMany();
    switch (action){
        case"get":
            return items
        break;
    }
  } catch (error) {}
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
  }
}

module.exports = {
  login,
  getItems,
  getTables,
};
