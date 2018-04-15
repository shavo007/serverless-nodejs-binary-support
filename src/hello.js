import axios from 'axios';

const hello = async (event, context, callback) => {
  const response = await axios({
    method: 'get',
    url: 'http://i.stack.imgur.com/PIFN0.jpg',
    responseType: 'arraybuffer',
  });
  // res.set('Content-Disposition', 'attachment; filename=image1.jpg');
  // res.set('Content-Type', 'image/jpeg')
  const base = Buffer.from(response.data, 'binary').toString('base64');

  /* some boring work generating data string */
  return callback(null, {
    statusCode: 200,
    // body: response.data, // base64 encoded string
    body: base,
    isBase64Encoded: true,
    headers: {
      'Content-Type': 'image/jpeg',
    },
  });
};

export default hello;
