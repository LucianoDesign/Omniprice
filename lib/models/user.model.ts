import { Schema, model, models } from "mongoose";

export interface IUser {
    sid: string
    productsList: Array<Schema.Types.ObjectId>;
  }

const userSchema = new Schema<IUser>({
    sid: { type: String, required: true, unique: true },
    productsList:[{ type: Schema.Types.ObjectId, ref: "Product"}]
    
})

export default models.Users || model<IUser>("Users" , userSchema)

