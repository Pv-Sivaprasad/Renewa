import DocSlotModel, { DocSlot, DateSlot } from '../../models/slotModel'
import { DocSlotDto, Slot } from '../../dto/slotDto';
import { sendDocSlotData } from '../../events/publishers/docSlotPublisher';

export class SlotRepository {

  async upsertSlots(docSlotDto: DocSlotDto): Promise<DocSlot> {
    try {
      console.log('the slotDto in the repo is ',docSlotDto);
      const { docId, dates,docName } = docSlotDto;
      
    
      const updatedDoc = await DocSlotModel.findOneAndUpdate(
        { docId },
        
        { 
          $set: { docName },
          $setOnInsert: { docId }
      },
        { upsert: true, new: true }
      );
  
      for (const dateSlot of dates) {
     
        const existingDate = updatedDoc.dates.find((d: DateSlot) => d.date === dateSlot.date);
  
        if (existingDate) {
         
          const newSlots = dateSlot.slots.filter(newSlot => 
            !existingDate.slots.some(existingSlot => 
              existingSlot.startTime === newSlot.startTime && 
              existingSlot.endTime === newSlot.endTime
            )
          );
          existingDate.slots.push(...newSlots);
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


  async getSlotsByDoctorId(docId: string, date: string): Promise<Slot[] | null> {
    console.log('Reached the slot repo for getting slot');
    
    try {
      const formattedDate = date.trim().replace(/^:/, '');  
      console.log('Formatted date:', formattedDate);
  
     
      const docDatas = await DocSlotModel.findOne({ docId });
      console.log('Full document from DB:', JSON.stringify(docDatas, null, 2));
      
      
      const dataNeeded = docDatas?.dates;
      if (dataNeeded) {
        console.log('Data from dates field:', dataNeeded);
      
      }
  
      const slotInRepo = await DocSlotModel.findOne(
        {
          docId,
          "dates.date": formattedDate  
        },
        { "dates.$": 1 }  
      );
  
      console.log('Result from DB:', JSON.stringify(slotInRepo, null, 2));
     
      if (slotInRepo && slotInRepo.dates.length > 0) {
        console.log('&^%&*()(*&^*',slotInRepo);
        await sendDocSlotData(slotInRepo)
        
        return slotInRepo.dates[0].slots;
      }

    
      return null;  
    } catch (error) {
      console.error('Error fetching slots for doctor:', error);
      throw error;
    }
  }
  
  
  
  

}

