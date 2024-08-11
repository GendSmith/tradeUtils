// 告警模块封装
import nodemailer from "nodemailer";
import { SMTP_QQ_CODE, MAIL_LIST} from "./config.js";

const transporterConfig = {
    host: 'smtp.qq.com',
    port: 465,
    secure: true,
    auth: {
        user: '1439786496@qq.com',
        pass: SMTP_QQ_CODE,
    }
}

let transporter = nodemailer.createTransport(transporterConfig);

// 定义transport对象并发送邮件
let mailInfo = {
    from:'TradeAlert <1439786496@qq.com>',
    to: MAIL_LIST, // 邮箱接受者的账号
    subject:"【TradeAlert】厚单墙告警----测试测试测试",
    text: "【测试测试测试测试】BTC 61000 新增一个厚单墙，请及时关注", // 文本内容
};


function sendMail() {
    transporter.sendMail(mailInfo, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    })
}

sendMail();