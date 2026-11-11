const http = require('http');

const postData = JSON.stringify({
  name: 'Test Client',
  city: 'Karachi',
  weddingDate: '2026-12-25',
  notes: 'Testing phone update'
});

const req = http.request({
  hostname: 'localhost',
  port: 5000,
  path: '/api/inquire',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
}, (res) => {
  let body = '';
  res.on('data', c => body += c);
  res.on('end', () => {
    try {
      const data = JSON.parse(body);
      console.log('Inquiry Response WhatsApp URL:', data.whatsappUrl);
      if (data.whatsappUrl && data.whatsappUrl.includes('923226324881')) {
        console.log('SUCCESS: WhatsApp inquiry URL points to 923226324881!');
      } else {
        console.log('Server needs restart or returned:', data);
      }
    } catch (e) {
      console.log('Response body:', body);
    }
    process.exit(0);
  });
});

req.on('error', (e) => {
  console.log('Server not responding or error:', e.message);
  process.exit(0);
});

req.write(postData);
req.end();