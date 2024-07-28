import mongoose, {Schema } from "mongoose";

const paymentSchema = new Schema({
   name: {
         type: String,
         required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    email : {  
        type: String,
        required: true,
    },
    catagory: { 
        type: String,
        // required: true,
    },
},{timestamps: true});

const Payment = mongoose.models.Payment || mongoose.model('Payment', paymentSchema);

export default Payment;