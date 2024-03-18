const express = require('express');
const path = require('path');
const EventEmitter = require('events');

const app = express();
const PORT = process.env.PORT || 3000;
const emitter = new EventEmitter();
emitter.setMaxListeners(20);

app.use(express.static(path.join(__dirname, 'client/dist')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('./routes/htmlRoutes')(app);

app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));
