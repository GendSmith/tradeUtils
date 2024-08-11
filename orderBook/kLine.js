import  {subscribeCoinAnkWS}  from "./request.js";

const orderType ="kline@BTCUSDT@Binance@1m";

subscribeCoinAnkWS(orderType, (data) => {
    console.log(JSON.stringify(data));
 });


