import 'dotenv/config';
import { expressPlugin } from 'nammatham';
import { app } from './nammatham';
import hello from './functions/hello';

app.addFunctions(hello);


const dev = process.env.NODE_ENV === 'development';
app.register(
  expressPlugin({
    dev,
    allowAllFunctionsAccessByHttp: true,
  })
);
app.start();
