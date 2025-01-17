import { IDocSlotRepository } from "../interface/IDocSlotRepository";
import { DocSlotModel,IDocSlot } from "../../models/slotModel";
import { ChangeeSlotDto, UpdateSlotDto } from "../../dto/slotDto";
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

    
    async updateSlotAvailability(updateData: UpdateSlotDto): Promise<void> {
        const { docId, date, startTime, isBlocked } = updateData;
        
        let data= await DocSlotModel.updateOne(
            {
                docId,
                'dates.date': date,
                'dates.slots.startTime': startTime
            },
            {
                $set: { 'dates.$[date].slots.$[slot].isBlocked': isBlocked }
            },
            {
                arrayFilters: [
                    { 'date.date': date },
                    { 'slot.startTime': startTime }
                ]
            }
        );
        console.log(data,'the updated is ')
         
    } 


    async changeSlotAvailability(updateData: ChangeeSlotDto): Promise<void> {
        const { docId, date, startTime, isAvailable } = updateData;
        
        let data= await DocSlotModel.updateOne(
            {
                docId,
                'dates.date': date,
                'dates.slots.startTime': startTime
            },
            {
                $set: { 'dates.$[date].slots.$[slot].isAvailable':  isAvailable}
            },
            {
                arrayFilters: [
                    { 'date.date': date },
                    { 'slot.startTime': startTime }
                ]
            }
        );
        console.log(data,'the updated is ')
         
    } 
}