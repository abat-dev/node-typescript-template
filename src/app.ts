require('./module-alias').default();
import express from 'express';
import mongoose from 'mongoose';

let mongoUri: string;

switch (process.env.NODE_ENV) {
  case 'development':
    require('dotenv-expand')(require('dotenv').config());
    mongoUri = process.env.MONGODB_URI_LOCAL;
    break;
  case 'production':
    mongoUri = process.env.MONGODB_URI;
    break;

  default:
    mongoUri = process.env.MONGODB_URI;
    break;
}

(async () => {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.log(
      `MongoDB connection error. Please make sure MongoDB is running. ${error}`
    );
    process.exit();
  }
})();

// Creating node-express app
const app = express();

app.use(express.json());

import indexRoute from '@routes/index';
import errorHandler from '@controllers/error';

app.use(indexRoute);
app.use(errorHandler);

// Express configuration
app.set('port', process.env.PORT || 3000);

const server = app.listen(app.get('port'), () => {
  console.log(
    'App is running at http://localhost:%d in %s mode',
    app.get('port'),
    app.get('env')
  );
  console.log('Press CTRL-C to stop\n');
});

export default server;
