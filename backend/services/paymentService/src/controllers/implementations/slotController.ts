import { IDocSlotService }from "../../services/interface/IDocSlotService";
import { IDocSlot} from "../../models/slotModel";
import { Request,Response,NextFunction } from "express";
import { HttpStatus } from "../../enums/httpStatus";


export class DocSlotController {
    private slotService:IDocSlotService

    constructor(slotService:IDocSlotService){
        this.slotService=slotService
    }


    async handleUpsertSlot(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.slotService.upsertSlot(req.body);
            return res.status(200).json({ success: true, data: result });
        } catch (error) {
            next(error);
        }
    }

}