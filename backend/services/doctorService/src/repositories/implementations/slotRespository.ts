import DocSlotModel, { DocSlot, DateSlot } from '../../models/slotModel'
import { DocSlotDto, Slot } from '../../dto/slotDto';
import { sendDocSlotData } from '../../events/publishers/docSlotPublisher';

export class SlotRepository {


  async getSlotsByDoctorId(docId: string, date: string): Promise<Slot[] | null> {    
    try {
      // const formattedDate = date.trim().replace(/^:/, '');  
      const formattedDate = date.trim().replace(/^:/, '');
      console.log('Formatted Date:', formattedDate);  

      const docDatas = await DocSlotModel.findOne({ docId }); 
      const dataNeeded = docDatas?.dates;
      if (dataNeeded) {
        console.log('Data from dates field:', dataNeeded);
      
      }
  
      // const slotInRepo = await DocSlotModel.findOne(
      //   {
      //     docId,
      //     "dates.date": formattedDate  
      //   },
      //   { "dates.$": 1 }  
      // );
      // if (slotInRepo && slotInRepo.dates.length > 0) {
      //   await sendDocSlotData(slotInRepo)  
      //   return slotInRepo.dates[0].slots;
      // }
      const slotInRepo = await DocSlotModel.findOne(
        {
          docId,
          "dates.date": formattedDate,
        },
        { "dates.$": 1 }
      );
      
      if (!slotInRepo) {
        console.error('slotInRepo is null. Check if the query matches the database schema.');
      } else if (slotInRepo.dates.length === 0) {
        console.error('No matching dates found in the slotInRepo result.');
      } else {
        console.log('slotInRepo fetched successfully:', slotInRepo);
        const slots = slotInRepo.dates[0].slots;
        await sendDocSlotData(slotInRepo);  
        return slots;

      }
      

      return null;  
    }
    catch (error) {
      console.error('Error fetching slots in getSlotsByDoctorId:', error);
      throw new Error('Failed to fetch slots. Please try again later.');
    }
    
    //  catch (error) {
    //   console.error('Error fetching slots for doctor:', error);
    //   throw error;
    // }
  }

  async upsertSlots(docSlotDto: DocSlotDto): Promise<DocSlot> {
    try {
      const { docId, dates, docName, consultationFee } = docSlotDto;
      // console.log(
      //   `docId: ${docId}, dates: ${JSON.stringify(
      //     dates
      //   )}, docName: ${docName}, consultationFee: ${consultationFee}`
      // );
  
      // Update doctor document
      const updatedDoc = await DocSlotModel.findOneAndUpdate(
        { docId },
        {
          $set: { docName, consultationFee }, // Ensure consultationFee is included
          $setOnInsert: { docId },
        },
        { upsert: true, new: true }
      );
  
      for (const dateSlot of dates) {
        const existingDate = updatedDoc.dates.find(
          (d: DateSlot) => d.date === dateSlot.date
        );
  
        if (existingDate) {
          // Add new slots without duplicating
          const newSlots = dateSlot.slots.filter(
            (newSlot) =>
              !existingDate.slots.some(
                (existingSlot) =>
                  existingSlot.startTime === newSlot.startTime &&
                  existingSlot.endTime === newSlot.endTime
              )
          );
          existingDate.slots.push(...newSlots);
        } else {
          // Add new dateSlot entry
          updatedDoc.dates.push(dateSlot);
        }
      }
  
      await updatedDoc.save();
      // console.log('Updated Doc:', updatedDoc);
      return updatedDoc;
    } catch (error) {
      console.error('Error upserting slots:', error);
      throw error;
    }
  }
  

  async editDocSlots(date: string, docSlotDto: DocSlotDto): Promise<DocSlot> {
    try {
      const { docId, dates, docName } = docSlotDto;
      // console.log(docId, 'as', docName, 'of', dates);
  
      // Find or create the document
      const updatedDoc = await DocSlotModel.findOneAndUpdate(
        { docId },
        {
          $set: { docName },
          $setOnInsert: { docId }
        },
        { upsert: true, new: true }
      );
  
      // console.log('The updatedDoc before slot updates:', updatedDoc);
  
      for (const dateSlot of dates) {
        const existingDateIndex = updatedDoc.dates.findIndex(
          (d: DateSlot) => d.date === dateSlot.date
        );
  
        if (existingDateIndex !== -1) {
          // Replace the entire slots array for the existing date
          updatedDoc.dates[existingDateIndex].slots = dateSlot.slots;
        } else {
          // Push the new dateSlot if it doesn't exist
          updatedDoc.dates.push(dateSlot);
        }
      }
  
      await updatedDoc.save();
      // console.log('The updatedDoc after slot updates:', updatedDoc);
      return updatedDoc;
    } catch (error) {
      console.error('Error in editDocSlots:', error);
      throw new Error('Failed to update doctor slots');
    }
  }
  


  async updatingSlots(docId:string,date:string,updatedSlot:any){
      
  }
  

}

