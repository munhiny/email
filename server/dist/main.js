"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var body_parser_1 = __importDefault(require("body-parser"));
// application imports
var ServerInfo_1 = require("./ServerInfo");
var IMAP = __importStar(require("./IMAP"));
var SMTP = __importStar(require("./SMTP"));
var Contacts = __importStar(require("./Contacts"));
var app = express_1.default();
// middleware to parse incoming request json objects
app.use(express_1.default.json());
app.use(cors_1.default({
    origin: "http://localhost:3000"
}));
app.use(body_parser_1.default.json());
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
app.get("/", function (request, response) {
    response.status(200).send("hello world");
});
app.get("/mailboxes", function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var imapWorker, mailboxes, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("GET /mailboxes (1)");
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                imapWorker = new IMAP.Worker(ServerInfo_1.serverInfo);
                return [4 /*yield*/, imapWorker.listMailboxes()];
            case 2:
                mailboxes = _a.sent();
                response.status(200).json(mailboxes);
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                response.status(500).send("error");
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.get("/mailboxes/:mailbox", function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var imapWorker, messages, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                imapWorker = new IMAP.Worker(ServerInfo_1.serverInfo);
                return [4 /*yield*/, imapWorker.listMessages({
                        mailbox: request.params.mailbox
                    })];
            case 1:
                messages = _a.sent();
                response.status(200).json(messages);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                response.status(500).send("error");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.get("/mailboxes/:mailbox/:id", function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var imapWorker, messageBody, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                imapWorker = new IMAP.Worker(ServerInfo_1.serverInfo);
                return [4 /*yield*/, imapWorker.getMessageBody({
                        mailbox: request.params.mailbox,
                        id: parseInt(request.params.id, 10)
                    })];
            case 1:
                messageBody = _a.sent();
                response.status(200).json(messageBody);
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                response.status(500).send("error");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.delete("/mailboxes/:mailbox/:id", function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var imapWorker, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                imapWorker = new IMAP.Worker(ServerInfo_1.serverInfo);
                return [4 /*yield*/, imapWorker.deleteMessage({
                        mailbox: request.params.mailbox,
                        id: parseInt(request.params.id, 10)
                    })];
            case 1:
                _a.sent();
                response.status(200).send("Mail deleted");
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                response.status(500).send("error");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.post("/messages", function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var smtpWorker, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                smtpWorker = new SMTP.Worker(ServerInfo_1.serverInfo);
                return [4 /*yield*/, smtpWorker.sendMessage(request.body)];
            case 1:
                _a.sent();
                response.status(201).send("ok");
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                response.status(500).send("error");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.get("/contacts", function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var contacstsWorker, contacts, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                contacstsWorker = new Contacts.Worker();
                return [4 /*yield*/, contacstsWorker.listContacts()];
            case 1:
                contacts = _a.sent();
                response.status(200).json(contacts);
                return [3 /*break*/, 3];
            case 2:
                error_6 = _a.sent();
                response.status(500).send("error");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.get("/contacts/:id", function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var contactsWorker, contact, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                contactsWorker = new Contacts.Worker();
                return [4 /*yield*/, contactsWorker.listContact(request.params.id)];
            case 1:
                contact = _a.sent();
                if (contact === null) {
                    response.status(500).json(contact);
                }
                response.status(200).json(contact);
                return [3 /*break*/, 3];
            case 2:
                error_7 = _a.sent();
                response.status(500).send("error");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.post("/contacts", function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var contactsWorker, contact, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                contactsWorker = new Contacts.Worker();
                return [4 /*yield*/, contactsWorker.addContact(request.body)];
            case 1:
                contact = _a.sent();
                response.status(201).json(contact);
                return [3 /*break*/, 3];
            case 2:
                error_8 = _a.sent();
                response.status(500).send("error");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.put("/contacts/:id", function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var contactsWorker, error_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                contactsWorker = new Contacts.Worker();
                return [4 /*yield*/, contactsWorker.updateContact(request.params.id, request.body)];
            case 1:
                _a.sent();
                response.status(200).send("Updated");
                return [3 /*break*/, 3];
            case 2:
                error_9 = _a.sent();
                response.status(500).send("error");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.delete("/contacts/:id", function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var contactsWorker, deleted, error_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                contactsWorker = new Contacts.Worker();
                return [4 /*yield*/, contactsWorker.deleteContact(request.params.id)
                    // response.status(200).send("Contact deleted")
                ];
            case 1:
                deleted = _a.sent();
                // response.status(200).send("Contact deleted")
                console.log(deleted);
                response.json(deleted);
                return [3 /*break*/, 3];
            case 2:
                error_10 = _a.sent();
                response.status(500).send("error");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.listen(80);
