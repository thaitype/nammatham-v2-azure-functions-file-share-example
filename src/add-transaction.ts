
import { TableClient, TableTransaction } from '@azure/data-tables';
import dayjs from 'dayjs';
import { faker } from '@faker-js/faker';

const tableClient = TableClient.fromConnectionString(process.env.AZURE_TABLE_CONNECTION_STRING ?? '', 'resource');

function randomArray(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export async function addTransaction() {
  await tableClient.createTable();
  const transaction = new TableTransaction();
  const month = faker.date.month({ abbreviated: true }).toLowerCase();
  const partitionKey = `${2023}-${month}`;

  for (let i = 0; i < 15; i++) {
    // Add actions to the transaction
    transaction.createEntity({
      partitionKey,
      rowKey: faker.string.uuid(),
      item: faker.music.songName(),
      genre: faker.music.genre(),
      state: randomArray(['sold', 'available', 'pending']),
      date: faker.date.past({
        years: 1
      }),
      artist: `${faker.person.firstName()} ${faker.person.lastName()}`,
      view: faker.number.int({ max: 10 }),
    });
  }

  // Submit the transaction using the actions list built by the helper
  return await tableClient.submitTransaction(transaction.actions);
}
