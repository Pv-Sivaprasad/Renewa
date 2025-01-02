import { IDocSlotRepository } from "../interface/IDocSlotRepository";
import { DocSlotModel,IDocSlot } from "../../models/slotModel";
import { UpdateSlotDto } from "../../dto/slotDto";
import { Types } from "mongoose";
export class DocSlotRepository implements IDocSlotRepository{
    

    async getSlotByDocId(docId: string): Promise<IDocSlot | null> {
        return await DocSlotModel.findOne({ docId });
    }
    
    async upsert(slotData: IDocSlot): Promise<IDocSlot> {
        try {
            let existingDoc = await DocSlotModel.findOne({ docId: slotData.docId });

            if (existingDoc) {
                slotData.dates.forEach((incomingDate) => {
                    const existingDateIndex = existingDoc.dates.findIndex(
                        (date) => date.date === incomingDate.date
                    );

                    if (existingDateIndex !== -1) {
                        existingDoc.dates[existingDateIndex].slots = incomingDate.slots;
                    } else {
                        existingDoc.dates.push(incomingDate);
                    }
                });

                if (slotData.consultationFee) {
                    existingDoc.consultationFee = slotData.consultationFee;
                }

                await existingDoc.save();
                return existingDoc;
            } else {
                return await DocSlotModel.create(slotData);
            }
        } catch (error) {
            console.error('❌ Repository Upsert Error:', error);
            throw error;
        }
    }

    async findSlot(docId: string): Promise<IDocSlot | null> {
        console.log('the doc Id is',docId);
        
        return await DocSlotModel.findOne({docId})
    }

    async updateSlotAvailability(updateData: UpdateSlotDto): Promise<any> {
        const slotId=updateData.slotId
        const docId=updateData.docId
        const date=updateData.date
        const isAvailable=updateData.isAvailable
        return await DocSlotModel.updateOne(
            { 
                docId, 
                'dates.date': date, 
                'dates.slots._id': new Types.ObjectId(slotId) 
            },
            { 
                $set: { 'dates.$[date].slots.$[slot].isAvailable': isAvailable } 
            },
            { 
                arrayFilters: [
                    { 'date.date': date },
                    { 'slot._id': new Types.ObjectId(slotId) }
                ]
            }
        )
    }
}