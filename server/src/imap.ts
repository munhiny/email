const ImapClient = require ("emailjs-imap-client");
import { ParsedMail, simpleParser } from "mailparser";
import { IServerInfo } from "./ServerInfo";

export interface ICallOptions {
    mailbox: string,
    id?: number
}

export interface IMessage {
    id: string, 
    date: string,
    from: string,
    subject: string,
    body?: string
}

export interface IMailbox { 
    name: string,
    path: string
}

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export class Worker {
    private static serverInfo: IServerInfo;
    constructor(inServerInfo: IServerInfo) {
        Worker.serverInfo = inServerInfo;
    }
    private async conntectToServer(): Promise<any> {
        const client: any = new ImapClient.default(
            Worker.serverInfo.imap.host,
            Worker.serverInfo.imap.port,
            {auth : Worker.serverInfo.imap.auth}
        );
        client.logLevel = client.LOG_LEVEL_NONE;
        client.onerror = (error: Error) => {
            console.log(
                "IMAP.Worker.listMailboxes(): Connection error",
                error
            )
        }
        await client.connect()
        return client;
    }
    public async listMailboxes(): Promise<IMailbox[]> {
        const client: any = await this.conntectToServer();
        const mailboxes: any = await client.listMailboxes();
        await client.close();
        const finalMailboxes: IMailbox[] = []
        // TODO: console log all these when server is up, break and fix
        const iterateChildren: Function = 
        (inArray: any[]): void => {
            inArray.forEach((inValue: any) => {
                finalMailboxes.push({
                    name: inValue.name,
                    path: inValue.path
                })
                iterateChildren(inValue.children)
            })
        }
        iterateChildren(mailboxes.children);
        return finalMailboxes;
    }

    public async listMessages(callOptions: ICallOptions):
    Promise<IMessage[]> {
        const client: any = await this.conntectToServer();
        const mailbox: any = await client.selectMailbox(callOptions)
        if (mailbox.exists === 0) {
            await client.close();
            return [];
        }
        const messages: any[] = await client.listMessages(
            callOptions.mailbox, "1:*", ["uid", "envelope"]
        )
        await client.close()
        const finalMessages: IMessage[] = [];
        messages.forEach((value: any) => {
            finalMessages.push({
                id : value.uid,
                date: value.evelope.date,
                from: value.envelope.from[0].address,
                subject: value.envelope.subject
            })
        })
        return finalMessages
    }

    public async getMessageBody(callOptions: ICallOptions):
    Promise<string | undefined> {
        const client: any = await this.conntectToServer();
        const messages: any[] = await client.listMessages(
            callOptions.mailbox, callOptions.id,
            ["body[]"], { byUid: true }
        )
        const parsed: ParsedMail = await simpleParser(messages[0]["body[]"])
        await client.close();
        return parsed.text;
    }

    public async deleteMessage(callOptions: ICallOptions):
    Promise<any> {
        const client: any = await this.conntectToServer();
        await client.deleteMessages(
            callOptions.mailbox, callOptions.id, { byUid: true }
        )
        await client.close()
    }
}

