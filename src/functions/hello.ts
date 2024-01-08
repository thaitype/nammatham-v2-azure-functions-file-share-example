import { func } from '../nammatham';
import fs from 'fs/promises';

const mountPath = process.env.STORAGE_FILE_SHARE_MOUNT_PATH ?? '';

const stringifyError = (err: unknown) => {
  if (err instanceof Error) return err.message;
  if (typeof err === 'object') return JSON.stringify(err);
  return String(err);
};

export default func.httpGet('hello').handler(async ({ trigger, context }) => {
  try {
    // Write a file to the mounted share
    await fs.writeFile(`${mountPath}/hello.txt`, 'Hello World!', 'utf-8');
    // List files in the mounted share
    const files = await fs.readdir(mountPath);
    return {
      jsonBody: { files },
    };
  } catch (err) {
    return {
      statusCode: 500,
      jsonBody: { error: stringifyError(err) },
    };
  }
});
