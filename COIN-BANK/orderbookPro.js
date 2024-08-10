const WebSocket = require('ws');
const url = require('url');
const http = require('http');

const wsUrl = 'wss://coinank.com/wsKline/wsKline';

const headers = {
  'Pragma': 'no-cache',
  'Origin': 'https://coinank.com',
  'Accept-Language': 'zh,en;q=0.9,zh-TW;q=0.8,zh-CN;q=0.7',
  'Sec-WebSocket-Key': 'ueX5KOh6rXErmPCL3EFHfQ==',
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
  'Upgrade': 'websocket',
  'Cache-Control': 'no-cache',
  'Connection': 'Upgrade',
  'Sec-WebSocket-Version': '13',
  'Sec-WebSocket-Extensions': 'permessage-deflate; client_max_window_bits',
};

const options = {
  headers,
  origin: url.parse('https://coinank.com').hostname,
};

const ws = new WebSocket(wsUrl, options);

ws.on('open', () => {
  console.log('Connected to WebSocket server');
  const message = {
    op: 'subscribe',
    args: 'depthV2@BTCUSDT@Binance@SWAP',
  };

  ws.send(JSON.stringify(message));
});

ws.on('message', (data) => {
    // 使用TextDecoder将字节流转换为字符串
    const decoder = new TextDecoder();
    const decodedData = decoder.decode(data);
    console.log('Received data:', decodedData);
  });

ws.on('close', () => {
  console.log('Disconnected from WebSocket server');
});

ws.on('error', (error) => {
  console.error('WebSocket error:', error);
});