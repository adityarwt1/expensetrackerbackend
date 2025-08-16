import mongoose, { Schema, Document } from "mongoose";

interface Expense extends Document {
  userid: mongoose.Types.ObjectId;
  title: string;
  amount: string;
  type?: "credited" | "debited"
  currency?: "us-dollar" | "inr";
}

const ExpenseSchema: Schema<Expense> = new Schema(
  {
    userid: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      enum: ["us-dollar", "inr"], // only two allowed values
      required: true,
    },
    type:{
      type: String,
      default: "inr",
      enum: ["credited", "debited"]
    }
  },
  {
    timestamps: true,
  }
);

ExpenseSchema.index({ userid: 1 });
ExpenseSchema.index({ userid: 1 });

const Expense =
  mongoose.models.Expense || mongoose.model<Expense>("Expense", ExpenseSchema);

export default Expense;
