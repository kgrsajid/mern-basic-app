import mongoose from "mongoose";

const revokedTokenSchema = new mongoose.Schema({
    token: { type: String, required: true, unique: true },
    createdAt: { 
      type: Date, 
      expires: 3600, // Auto-delete after 1 hour (matches JWT expiration)
      default: Date.now 
    }
  });


export default mongoose.model('RevokedToken', revokedTokenSchema);