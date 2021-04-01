import path from "path";
import express, { Express, NextFunction, Request, response, Response } from "express";
import cors from "cors"
import bodyParser from 'body-parser'
// application imports
import { serverInfo } from "./ServerInfo";
import * as IMAP from "./IMAP";
import * as SMTP from "./SMTP";
import * as Contacts from "./Contacts";
import { IContact } from "./Contacts"





const app: Express = express();

// middleware to parse incoming request json objects
app.use(express.json())

app.use(cors({
    origin: "http://localhost:3000"
}))

app.use(bodyParser.json())

// to serve static site held in the client dist folder
// app.use('/', express.static(path.join(__dirname, "../../client/dist")))

// app.use((request: Request, response: Response, next: NextFunction) => {
//     response.header("Access-Control-Allow-Origin", "*")
//     response.header("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS")
//     response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
//     next()
// })

// app.use(cors())
// REST Endpoint: List Mailboxes

app.get("/", (request:Request, response: Response) => {
    response.status(200).send("hello world")
})


app.get("/mailboxes", async (request:Request, response:Response) => {
    console.log("GET /mailboxes (1)")    
    try {
            const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo)
            const mailboxes: IMAP.IMailbox[] = await imapWorker.listMailboxes();
            response.status(200).json(mailboxes);
        } catch (error) {
            response.status(500).send("error")
        }
    }
);

app.get("/mailboxes/:mailbox", async (request: Request, response: Response) => {
    
    try {
        const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo)
        const messages: IMAP.IMessage[] = await imapWorker.listMessages({
            mailbox: request.params.mailbox
        })
        response.status(200).json(messages)
    }
    catch(error) {
        response.status(500).send("error")
    }
})

app.get("/mailboxes/:mailbox/:id", async (request: Request, response:Response) => {
 
    try {

        const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo)
        const messageBody: string | undefined = await imapWorker.getMessageBody({
            mailbox: request.params.mailbox,
            id: parseInt(request.params.id, 10)
        })
        response.status(200).json(messageBody)
    } 
    catch(error) {
        response.status(500).send("error")
    }
    
})

app.delete("/mailboxes/:mailbox/:id", async (request: Request, response: Response) => {

    try {
        const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo)
        await imapWorker.deleteMessage({
            mailbox: request.params.mailbox,
            id: parseInt(request.params.id, 10)
        })
        response.status(200).send("Mail deleted")
    } catch(error) {
        response.status(500).send("error")
    }
})

app.post("/messages", async (request: Request, response: Response) => {
    try {
        const smtpWorker: SMTP.Worker = new SMTP.Worker(serverInfo)
        await smtpWorker.sendMessage(request.body)
        response.status(201).send("ok")

    } catch(error) {
        response.status(500).send("error")
    }
})

app.get("/contacts", async (request: Request, response: Response) => {
    try {
        const contacstsWorker: Contacts.Worker = new Contacts.Worker()
        const contacts: IContact[] = await contacstsWorker.listContacts()
        response.status(200).json(contacts)
    } catch (error) {
        response.status(500).send("error")
    }

})

app.get("/contacts/:id", async (request: Request, response: Response) => {
    try {
        const contactsWorker: Contacts.Worker = new Contacts.Worker()
        const contact: IContact = await contactsWorker.listContact(request.params.id)
        if(contact === null) {
            response.status(500).json(contact)
        }
        response.status(200).json(contact)
    } catch (error) {
        response.status(500).send("error")
    }
} )

app.post("/contacts", async (request: Request, response: Response) => {
    try {
        const contactsWorker: Contacts.Worker = new Contacts.Worker()
        const contact: IContact = await contactsWorker.addContact(request.body)
        response.status(201).json(contact)
    } catch(error) {
        response.status(500).send("error")
    }
})

app.put("/contacts/:id", async (request: Request, response: Response) => {
    try {
        const contactsWorker: Contacts.Worker = new Contacts.Worker()
        await contactsWorker.updateContact(request.params.id,request.body)
        response.status(200).send("Updated")
    } catch(error) {
        response.status(500).send("error")
    }
})

app.delete("/contacts/:id", async (request: Request, response: Response) => {
    try {
        const contactsWorker: Contacts.Worker = new Contacts.Worker()
        const deleted: number | string = await contactsWorker.deleteContact(request.params.id)
        // response.status(200).send("Contact deleted")
        console.log(deleted)
        response.json(deleted)
    } catch(error) {
        response.status(500).send("error")
    }
})

app.listen(80);