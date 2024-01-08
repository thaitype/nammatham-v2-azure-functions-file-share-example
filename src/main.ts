import { expressPlugin } from '@nammatham/express';
import { app } from './nammatham';
import hello from './functions/hello';

app.addFunctions(hello);

app.register(
  expressPlugin({
    allowAllFunctionsAccessByHttp: true,
  })
);
app.start();
