import Mail from "nodemailer/lib/mailer";
import * as nodemailer from "nodemailer";
import { SendMailOptions, SentMessageInfo } from "nodemailer";
import { IServerInfo } from "./ServerInfo"


// TODO test private stat info with method to alert
export class Worker {
    private static serverInfo: IServerInfo;
    constructor(inServerInfo: IServerInfo) {
        Worker.serverInfo = inServerInfo;
    }
    public sendMessage(options: SendMailOptions): Promise<string> {
        return new Promise((resolve, reject) => {
            const transport: Mail = nodemailer.createTransport(Worker.serverInfo.smtp)
            transport.sendMail(options, (error: Error | null, info: SentMessageInfo) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(info);
                }
            })
        })
    }
}
