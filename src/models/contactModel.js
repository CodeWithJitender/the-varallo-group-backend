import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    firstName: { type: String, trim: true },
    attorneyName: { type: String, trim: true },
    contactNumber: { type: String, trim: true },
    contactName: { type: String, trim: true },
    contactEmail: { type: String, trim: true, lowercase: true },
    preferredDate: { type: String },
    preferredTime: { type: String },
    state: { type: String, trim: true },
    city: { type: String, trim: true },
    witnesses: { type: String },
    estimatedDuration: { type: String },
    servicesNeeded: { type: [String], default: [] },
    file: {
      url: { type: String },
      publicId: { type: String },
      originalName: { type: String },
    },
    notes: { type: String },
    status: { type: String, enum: ["new", "pending", "closed"], default: "new" },
  },
  { timestamps: true }
);

const Contact = mongoose.model("Contact", contactSchema);
export default Contact;
