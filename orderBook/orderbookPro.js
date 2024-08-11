import  {subscribeCoinAnkWS}  from "./request.js";

const orderType = 'depthV2@BTCUSDT@Binance@SWAP';

subscribeCoinAnkWS(orderType, (data) => {
   console.log(JSON.stringify(data));
});