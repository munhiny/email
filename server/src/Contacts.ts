import * as path from "path";
const Datastore = require("nedb");

export interface IContact {
    _id?: number,
    name: string,
    email: string
}

export class Worker {
    private db: Nedb;
    constructor() {
        this.db = new Datastore({
            filename: path.join(__dirname, "contacts.db"),
            autoload: true
        })
    }

    public listContacts(): Promise<IContact[]> {
        return new Promise((resolve, reject) => {
            this.db.find({ },
                (error: Error, docs: IContact[]) => {
                    if (error) {
                        reject(error)
                    } else {
                        resolve(docs)
                    }
                }
                
            )
        })
    }

    public listContact(id:string): Promise<IContact> {
        return new Promise((resolve, reject) => {
            this.db.findOne({_id : id}, (error: Error | null, doc:IContact) => {
                if(error) {
                    reject(error)
                } else {
                    console.log('doc: ', doc)
                    resolve(doc)
                }

            })
        })
    }

    public addContact(contact: IContact): Promise<IContact> {
        return new Promise((resolve, reject) => {
            this.db.insert(contact,
                (error: Error | null, newDoc:IContact) => {
                    if (error) {
                        reject(error)
                    } else {
                        resolve(newDoc)
                    }
                }
            )
        })
    }

    public updateContact(id: string, contact: IContact): Promise<string> {
        return new Promise((resolve, reject) => {
            this.db.update({_id: id},{$set:contact}, {}, (error: Error | null, numUpdated:number) => {
                if(error) {
                    reject(error)
                } else {
                    resolve("")
                }
            })
        })
    }

    public deleteContact(id: string): Promise<number |string> {
        return new Promise((resolve, reject) => {
            this.db.remove({_id: id}, { }, 
                (error:Error | null, numRemoved: number | string) => {
                    if (error) {
                        reject(error)
                    } else {
                        if (numRemoved === 0) {
                            resolve("No member Found")
                        }
                        resolve(numRemoved)
                    }
                })
        })
    }
}