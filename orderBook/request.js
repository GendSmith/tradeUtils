import WebSocket from 'ws';
import url from 'url';

const wsUrl = 'wss://coinank.com/wsKline/wsKline';
const handlers = {};
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
let isWebSocketReady = false;

ws.on('close', () => {
    console.log('Disconnected from WebSocket server');
});

ws.on('error', (error) => {
    console.error('WebSocket error:', error);
});

ws.on('open', () => {
    console.log('Connected to WebSocket server');
    isWebSocketReady = true;
});

function onMessage(event) {
    const decodedData = JSON.parse(event.data);
    const handler = handlers[decodedData.args];
    // 原始数据格式可以参考testData.js的testData案例
    if (handler && decodedData.op === 'push' && decodedData.success === true) {
        handler.success(decodedData);
    }
}

ws.onmessage = onMessage;

export function subscribeCoinAnkWS(orderType, successFunc) {
    const message = {
        op: 'subscribe',
        args: orderType,
    };
    handlers[orderType] = {
        "success": successFunc
    };
    if (isWebSocketReady) {
        ws.send(JSON.stringify(message));
    } else {
        ws.on('open', () => {
            console.log('Connected to WebSocket server');
            isWebSocketReady = true;
            ws.send(JSON.stringify(message));
        });
        console.log("WebSocket is not ready");
    }
}