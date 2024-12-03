import DocSlotModel, { DocSlot, DateSlot } from '../../models/slotModel'
import { DocSlotDto, Slot } from '../../dto/slotDto';

export class SlotRepository {

  // async upsertSlots(docSlotDto: DocSlotDto): Promise<DocSlot> {
  //   try {
  //     const { docId, dates } = docSlotDto;    
  //     const updatedDoc = await DocSlotModel.findOneAndUpdate(
  //       { docId },
  //       {
  //         $setOnInsert: { docId }, 
  //       },
  //       { upsert: true, new: true }
  //     );  
  //     for (const dateSlot of dates) {
  //       const existingDate = updatedDoc.dates.find((d: DateSlot) => d.date === dateSlot.date);
  //       if (existingDate) {
        
  //         existingDate.slots.push(...dateSlot.slots);
  //       } else {
       
  //         updatedDoc.dates.push(dateSlot);
  //       }
  //     }

  //     await updatedDoc.save();
  //     return updatedDoc;
  //   } catch (error) {
  //     console.error('Error upserting slots:', error);
  //     throw error;
  //   }
  // }

  async upsertSlots(docSlotDto: DocSlotDto): Promise<DocSlot> {
    try {
      const { docId, dates } = docSlotDto;
  
      // Find or create the document
      const updatedDoc = await DocSlotModel.findOneAndUpdate(
        { docId },
        { $setOnInsert: { docId } },
        { upsert: true, new: true }
      );
  
      for (const dateSlot of dates) {
        // Check if the date exists in the existing document
        const existingDate = updatedDoc.dates.find((d: DateSlot) => d.date === dateSlot.date);
  
        if (existingDate) {
          // Avoid adding duplicate slots
          const newSlots = dateSlot.slots.filter(newSlot => 
            !existingDate.slots.some(existingSlot => 
              existingSlot.startTime === newSlot.startTime && 
              existingSlot.endTime === newSlot.endTime
            )
          );
          existingDate.slots.push(...newSlots);
        } else {
          // Add the entire new dateSlot if it doesn't exist
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
  
  // async getSlotsByDoctorId(docId: string,date:string): Promise<DocSlot | null> {
  //   try {
  //     let slotInRepo= await DocSlotModel.findOne({ docId ,date});
  //     console.log('slotInRepo',slotInRepo);
      
  //     return slotInRepo
  //   } catch (error) {
  //     console.error('Error fetching slots for doctor:', error);
  //     throw error;
  //   }
  // }
  // async getSlotsByDoctorId(docId: string, date: string): Promise<Slot[] | null> {
  //   console.log('Reached the slot repo for getting slot');
  //   try {
  //     // Query using $elemMatch to ensure correct matching
  //     let docDatas=await DocSlotModel.findOne({docId})
  //     console.log('the doc Datas is',docDatas);
      
  //     const slotInRepo = await DocSlotModel.findOne(
  //       {
  //         docId,
  //         dates: { $elemMatch: { date } }, // Match array element with date
  //       },
  //       { "dates.$": 1 } // Project only the matching date
  //     );
  
  //     console.log('Result from DB:', JSON.stringify(slotInRepo, null, 2));
  
  //     // If document is found and dates array is not empty
  //     if (slotInRepo && slotInRepo.dates.length > 0) {
  //       return slotInRepo.dates[0].slots; // Return slots of the matched date
  //     }
  //     return null; // No matching slots found
  //   } catch (error) {
  //     console.error('Error fetching slots for doctor:', error);
  //     throw error;
  //   }
  // }
 

  async getSlotsByDoctorId(docId: string, date: string): Promise<Slot[] | null> {
    console.log('Reached the slot repo for getting slot');
    
    try {
      const formattedDate = date.trim().replace(/^:/, '');  // Ensure the date is trimmed
      console.log('Formatted date:', formattedDate);
  
      // Simplify the query to check the entire document first
      const docDatas = await DocSlotModel.findOne({ docId });
      console.log('Full document from DB:', JSON.stringify(docDatas, null, 2));
      
      // Ensure we have the dates field
      const dataNeeded = docDatas?.dates;
      if (dataNeeded) {
        console.log('Data from dates field:', dataNeeded);
      
      }
  
      // Look for the correct date within the dates array
      const slotInRepo = await DocSlotModel.findOne(
        {
          docId,
          "dates.date": formattedDate  // Matching the date
        },
        { "dates.$": 1 }  // Project only the matching date
      );
  
      console.log('Result from DB:', JSON.stringify(slotInRepo, null, 2));
  
      // If slots are found for the matching date, return them
      if (slotInRepo && slotInRepo.dates.length > 0) {
        return slotInRepo.dates[0].slots;
      }
      
      return null;  // If no matching slots are found
    } catch (error) {
      console.error('Error fetching slots for doctor:', error);
      throw error;
    }
  }
  
  
  
  

}

