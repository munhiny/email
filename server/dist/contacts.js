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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Worker = void 0;
var path = __importStar(require("path"));
var Datastore = require("nedb");
var Worker = /** @class */ (function () {
    function Worker() {
        this.db = new Datastore({
            filename: path.join(__dirname, "contacts.db"),
            autoload: true
        });
    }
    Worker.prototype.listContacts = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.db.find({}, function (error, docs) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(docs);
                }
            });
        });
    };
    Worker.prototype.listContact = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.db.findOne({ _id: id }, function (error, doc) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(doc);
                }
            });
        });
    };
    Worker.prototype.addContact = function (contact) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.db.insert(contact, function (error, newDoc) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(newDoc);
                }
            });
        });
    };
    Worker.prototype.updateContact = function (id, contact) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.db.update({ _id: id }, { $set: contact }, {}, function (error, numUpdated) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve("");
                }
            });
        });
    };
    Worker.prototype.deleteContact = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.db.remove({ _id: id }, {}, function (error, numRemoved) {
                if (error) {
                    reject(error);
                }
                else {
                    if (numRemoved === 0) {
                        resolve("No member Found");
                    }
                    resolve(numRemoved);
                }
            });
        });
    };
    return Worker;
}());
exports.Worker = Worker;
