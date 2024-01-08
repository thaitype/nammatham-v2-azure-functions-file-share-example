import { func } from '../nammatham';

export default func
  .httpGet('hello')
  .handler(async ({ trigger, context }) => {
    context.info('Hello World');
    return {
      body: 'Hello World'
    }
  });
