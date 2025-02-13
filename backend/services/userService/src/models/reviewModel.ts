import mongoose,{Schema,Document} from 'mongoose'

export interface IRating extends Document{
    userId: string
    doc: string
    rating: number;
    review: string;
}


const RatingSchema : Schema = new Schema({

    userId: 
    { 
        type: String, 
       
    },
    docId: 
    { 
        type: String, 
        
    },
    rating: 
    { 
        type: Number,
        required: true, min: 1, max: 5 
    },
    review: 
    { 
        type: String, 
        required: true 
    },
  

},  
{timestamps:true}
)

export default mongoose.model<IRating>("Rating",RatingSchema)
