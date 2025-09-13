"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TacheController = void 0;
const TacheRepository_1 = require("../repositories/TacheRepository");
const TacheService_1 = require("../services/TacheService");
class TacheController {
    constructor() {
        this.tacheRepository = new TacheRepository_1.TacheRepository();
        this.tacheService = new TacheService_1.TacheService(this.tacheRepository);
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tache = yield this.tacheService.createTache(req.body);
                res.status(201).json(tache);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    getTaches(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const taches = yield this.tacheService.getTaches();
            res.json(taches);
        });
    }
    getTache(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const tache = yield this.tacheService.getTache(Number(id));
            if (tache) {
                res.json(tache);
            }
            else {
                res.status(404).json({ error: "Tâche non trouvée" });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const updated = yield this.tacheService.updateTache(Number(id), req.body);
            if (updated) {
                res.json(updated);
            }
            else {
                res.status(404).json({ error: "Tâche non trouvée" });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const deleted = yield this.tacheService.deleteTache(Number(id));
            if (deleted) {
                res.status(204).send();
            }
            else {
                res.status(404).json({ error: "Tâche non trouvée" });
            }
        });
    }
}
exports.TacheController = TacheController;
