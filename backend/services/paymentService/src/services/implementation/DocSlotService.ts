import { IDocSlotService } from "../interface/IDocSlotService";
import { IDocSlotRepository } from "../../repositories/interface/IDocSlotRepository";
import { IDocSlot } from "../../models/slotModel";


export class DocSlotService implements IDocSlotService{

    private slotRepository : IDocSlotRepository;

    constructor(slotRepository:IDocSlotRepository){
        this.slotRepository=slotRepository
    }

    async findSlotByDocId(docId: string): Promise<IDocSlot | null> {
        return await this.slotRepository.getSlotByDocId(docId)
    }

    async upsertSlot(slotData: IDocSlot): Promise<IDocSlot> {
        return await this.slotRepository.upsert(slotData);
    }

    // async findSlot(slotId: string): Promise<IDocSlot | null> {
    //     return await this.slotRepository.findSlot(slotId)
    // }

}