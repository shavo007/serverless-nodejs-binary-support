// wiki.js - Wiki route module.
// import fs from 'fs'
import fs from 'fs';
import axios from 'axios';
import request from 'request';

import express from 'express';
import logger from './logger';

const router = express.Router();

// Home page route.
router.get('/', (req, res) => {
  fs.writeFile('/tmp/message.txt', 'Hello Node.js', err => {
    if (err) throw err;
    logger.info('The file has been saved!');
    res.download('/tmp/message.txt', 'message.txt');
  });
  // res.send('Wiki home page');
});

router.get('/image', (req, res) => {
  res.set('Content-Disposition', 'attachment; filename=PIFN0.jpg');

  request('http://i.stack.imgur.com/PIFN0.jpg').pipe(res);
});

router.get('/image1', async (req, res) => {
  const response = await axios({
    method: 'get',
    url: 'http://i.stack.imgur.com/PIFN0.jpg',
    responseType: 'arraybuffer',
  });
  res.set('Content-Disposition', 'attachment; filename=image1.jpg');
  res.set('Content-Type', 'image/jpeg');
  const base = Buffer.from(response.data, 'binary');
  // .toString('base64')
  // const base = response.data.toString('base64')
  res.send(base);
  // response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
});

// About page route.
router.get('/about', (req, res) => {
  logger.info(`about...`);
  res.send('About this wiki');
});

router.post('/', (req, res) => {
  console.log(`body is ${req.body}`);
  res.status(201).json({ status: 'created' });
});

export default router;
