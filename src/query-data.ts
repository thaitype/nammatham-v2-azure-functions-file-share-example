import 'dotenv/config';
import pl from "nodejs-polars";
import { TableClient } from '@azure/data-tables';
import dayjs from 'dayjs';

const tableClient = TableClient.fromConnectionString(process.env.AZURE_TABLE_CONNECTION_STRING ?? '', 'resource');

export async function queryData() {
  const startDate = dayjs(new Date()).subtract(3, 'month');
  const endDate = dayjs(new Date()).subtract(1, 'month');
  const entities = tableClient.listEntities({
    queryOptions: {
      // filter: `PartitionKey eq '2023-apr' and view eq 0`,
      filter: `date gt datetime'${startDate.toISOString()}' and date lt datetime'${endDate.toISOString()}'`,
    },
  });

  const data: Record<string, unknown>[] = [];
  for await (const entity of entities) {
    data.push(entity);
  }

  console.log(data.length);
  const df = pl.readRecords(data);

  return df.select(
    // "partitionKey",
    "genre",
    // "item",
    // "date",
    "state",
    "view",
    pl.col('view').mean().over('genre').alias('mean_view'),
    pl.col('view').std().over('genre').alias('std_view'),
    pl.col('view').max().over('genre').alias('max_view'),
    pl.col('view').min().over('genre').alias('min_view'),
    pl.col('view').count().over('genre').alias('count_view'),
  ).toRecords();
}
