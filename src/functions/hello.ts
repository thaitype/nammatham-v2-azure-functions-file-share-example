import { addTransaction } from '../add-transaction';
import { func } from '../nammatham';
import { queryData } from '../query-data';

const stringifyError = (err: unknown) => {
  if (err instanceof Error) return err.message;
  if (typeof err === 'object') return JSON.stringify(err);
  return String(err);
};

export default func.httpGet('hello').handler(async ({ trigger, context }) => {
  try {
    // // Write a file to the mounted share
    // await fs.writeFile(`${mountPath}/hello.txt`, 'Hello World!', 'utf-8');
    // // List files in the mounted share
    // const files = await fs.readdir(mountPath);

    // const users = await testSqlite(path.join(mountPath, 'sqlite-v2.db'));

    await addTransaction();

    const data = await queryData();

    return {
      jsonBody: { data },
    };
  } catch (err) {
    return {
      statusCode: 500,
      jsonBody: { error: stringifyError(err) },
    };
  }
});
