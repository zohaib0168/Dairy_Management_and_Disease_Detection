const express = require('express');
const dbConnect = require('./database/index');
const {PORT} = require('./config/index');
const router = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');
const cookieParser = require('cookie-parser');
const cors = require('cors');



const app = express();

app.use(cookieParser());
app.use(
    cors({
      origin: function (origin, callback) {
        return callback(null, true);
      },
      optionsSuccessStatus: 200,
      credentials: true,
    })
  );

// app.use(upload.single('product_image'));
app.use(express.json());

app.use(router);


dbConnect();

app.use('/storage', express.static('storage'));

app.use(errorHandler);

app.listen(PORT, console.log(`App is running on port: ${PORT}`));