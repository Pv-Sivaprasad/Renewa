import DocSlotModel, { DocSlot, DateSlot } from '../../models/slotModel'
import { DocSlotDto } from '../../dto/slotDto';

export class SlotRepository {
  async upsertSlots(docSlotDto: DocSlotDto): Promise<DocSlot> {
    try {
      const { docId, dates } = docSlotDto;

      
      const updatedDoc = await DocSlotModel.findOneAndUpdate(
        { docId },
        {
          $setOnInsert: { docId }, 
        },
        { upsert: true, new: true }
      );

    
      for (const dateSlot of dates) {
        const existingDate = updatedDoc.dates.find((d: DateSlot) => d.date === dateSlot.date);
        if (existingDate) {
        
          existingDate.slots.push(...dateSlot.slots);
        } else {
       
          updatedDoc.dates.push(dateSlot);
        }
      }

      await updatedDoc.save();
      return updatedDoc;
    } catch (error) {
      console.error('Error upserting slots:', error);
      throw error;
    }
  }

  async getSlotsByDoctorId(docId: string): Promise<DocSlot | null> {
    try {
      return await DocSlotModel.findOne({ docId });
    } catch (error) {
      console.error('Error fetching slots for doctor:', error);
      throw error;
    }
  }
}

