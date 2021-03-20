import path from "path";
import express, { Express, NextFunction, Request, response, Response } from "express";
// application imports
import { serverInfo } from "./serverInfo";
import * as IMAP from "./IMAP";
import * as SMTP from "./SMTP";
import * as Contacts from "./Contacts";
import { IContact } from "./Contacts"
import { send } from "node:process";
import SMTPConnection from "nodemailer/lib/smtp-connection";

const app: Express = express();

// middleware to parse incoming request json objects
app.use(express.json())

// to serve static site held in the client dist folder
app.use('/', express.static(path.join(__dirname, "../../client/dist")))

app.use((request: Request, response: Response, next: NextFunction) => {
    response.header("Access-Control-Allow-Origin", "*")
    response.header("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTSIONS")
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,Content-Type,Accept")
    next()
})

// REST Endpoint: List Mailboxes
app.get("/mailboxes", async (request:Request, response:Response) => {
        try {
            const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo)
            const mailboxes: IMAP.IMailbox[] = await imapWorker.listMailboxes();
            response.json(mailboxes);
        } catch (error) {
            response.send("error")
        }
    }
);

app.get("/mailboxes/:mailbox", async (request: Request, response: Response) => {
    try {
        const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo)
        const messages: IMAP.IMessages[] = await imapWorker.listMessages({
            mailbox: request.params.mailbox
        })
        response.json(messages)
    }
    catch(error) {
        response.send("error")
    }
})

app.get("/mailboxes/:mailbox/:id", async (request: Request, reponse:Response) => {
    
    try {

        const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo)
        const messageBody: string = await imapWorker.getMessageBody({
            mailbox: request.params.mailbox,
            id: parseInt(request.params.id, 10)
        })
        response.json(messageBody)
    } 
    catch(error) {
        response.send("error")
    }
    
})

app.delete("/mailboxes/:mailbox/:id", async (request: Request, response: Response) => {
    try {
        const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo)
        await imapWorker.deleteMessage({
            mailbox: request.params.mailbox,
            id: parseInt(request.params.id, 10)
        })
        response.send("ok")
    } catch(error) {
        response.send("error")
    }
})

app.post("/messages", async (request: Request, response: Response) => {
    try {
        const smtpWorker: SMTP.Worker = new SMTP.Worker(serverInfo)
        await smtpWorker.sendMessage(request.body)
        response.send("ok")

    } catch(error) {
        response.send("error")
    }
})

app.get("/contacts", async(request: Request, response: Response) => {
    try {
        const contacstsWorker: SMTP.Worker = new Contacts.Worker(serverInfo)
        const contacts: IContact[] = await contacstsWorker.listContacts()
        response.json(contacts)
    } catch (error) {
        response.send('error')
    }

})

app.post("/contacts", async (request: Request, response: Response) => {
    try {
        const contactsWorker: SMTP.Worker = new Contacts.Worker(serverInfo)
        const contact: IContact[] = contactsWorker.addContact(request.body)
        response.json(contact)
    } catch(error) {
        response.send("error")
    }
})

app.delete("/contacts/id", async (request: Request, response: Response) => {
    try {
        const contactsWorker: SMTP.Worker = new Contacts.Worker(serverInfo)
        await contactsWorker.deleteContact(request.params.id)
        response.send("ok")
    } catch(error) {
        response.send("error")
    }
})