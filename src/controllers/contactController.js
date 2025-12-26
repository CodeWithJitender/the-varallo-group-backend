import Contact from "../models/contactModel.js";
import { uploadToCloudinary } from "../utils/cloudinaryUpload.js";
import Joi from "joi";

const contactSchema = Joi.object({
  First_Name: Joi.string().allow(""),
  Attorney_Name: Joi.string().allow(""),
  Contact_Number: Joi.string().allow(""),
  Contact_Name: Joi.string().allow(""),
  Contact_Email: Joi.string().email().required(),
  Preferred_Date: Joi.string().allow(""),
  Preferred_Time: Joi.string().allow(""),
  State: Joi.string().allow(""),
  City: Joi.string().allow(""),
  Witnesses: Joi.string().allow(""),
  estimated_duration: Joi.string().allow(""),
  Services_Needed: Joi.any(), // array/multi-select may come as string or array
});

export const createContact = async (req, res) => {
  try {
    // Handle multipart/form-data file via multer
    let file = req.file || null;
    // support multer.fields() which populates req.files as an object
    if (!file && req.files) {
      if (Array.isArray(req.files) && req.files.length > 0) {
        file = req.files[0];
      } else if (typeof req.files === 'object') {
        const keys = Object.keys(req.files);
        if (keys.length > 0 && Array.isArray(req.files[keys[0]]) && req.files[keys[0]].length > 0) {
          file = req.files[keys[0]][0];
        }
      }
    }

    // Parse body fields - support both form-data and JSON
    const body = { ...(req.body || {}) };

    // If Services_Needed is stringified JSON or comma list, normalize
    let services = body.Services_Needed;
    if (typeof services === "string") {
      const trimmed = services.trim();
      // try JSON.parse, attempt to sanitize escaped quotes
      try {
        const parsed = JSON.parse(trimmed);
        services = Array.isArray(parsed) ? parsed : [parsed];
      } catch (err) {
        try {
          const sanitized = trimmed.replace(/\\+/g, '');
          const parsed = JSON.parse(sanitized);
          services = Array.isArray(parsed) ? parsed : [parsed];
        } catch (err2) {
          // comma separated fallback
          services = trimmed.split(",").map((s) => s.trim()).filter(Boolean);
        }
      }
    }

    // Validate required fields (Contact_Email required)
    const { error } = contactSchema.validate(body, { allowUnknown: true });
    if (error) {
      return res.status(400).json({ message: "Validation error", details: error.details });
    }

    const contactData = {
      firstName: body.First_Name || "",
      attorneyName: body.Attorney_Name || "",
      contactNumber: body.Contact_Number || "",
      contactName: body.Contact_Name || "",
      contactEmail: body.Contact_Email || "",
      preferredDate: body.Preferred_Date || "",
      preferredTime: body.Preferred_Time || "",
      state: body.State || "",
      city: body.City || "",
      witnesses: body.Witnesses || "",
      estimatedDuration: body.estimated_duration || "",
      servicesNeeded: services || [],
      notes: body.notes || "",
    };

    // If a file was uploaded, upload to Cloudinary
    if (file) {
      const folder = "varallo/contact";
      const uploadResult = await uploadToCloudinary(file, folder, `contact-${Date.now()}`);
      if (!uploadResult.success) {
        return res.status(500).json({ message: "File upload failed", error: uploadResult.error });
      }
      contactData.file = {
        url: uploadResult.url,
        publicId: uploadResult.publicId,
        originalName: file.originalname,
      };
    }

    const contact = await Contact.create(contactData);

    return res.status(201).json({ message: "Contact created", data: contact });
  } catch (error) {
    console.error("Create Contact Error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getContacts = async (req, res) => {
  try {
    const { page = 1, limit = 50 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [total, contacts] = await Promise.all([
      Contact.countDocuments(),
      Contact.find().sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit)).lean(),
    ]);

    return res.status(200).json({ message: "Contacts fetched", data: { total, contacts } });
  } catch (error) {
    console.error("Get Contacts Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getContactById = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findById(id).lean();
    if (!contact) return res.status(404).json({ message: "Contact not found" });
    return res.status(200).json({ message: "Contact fetched", data: contact });
  } catch (error) {
    console.error("Get Contact Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const payload = req.body || {};

    // Parse Services_Needed if string
    if (payload.Services_Needed && typeof payload.Services_Needed === "string") {
      try {
        payload.servicesNeeded = JSON.parse(payload.Services_Needed);
      } catch (err) {
        payload.servicesNeeded = payload.Services_Needed.split(",").map((s) => s.trim()).filter(Boolean);
      }
    }

    const allowed = {
      firstName: payload.First_Name || payload.firstName,
      attorneyName: payload.Attorney_Name || payload.attorneyName,
      contactNumber: payload.Contact_Number || payload.contactNumber,
      contactName: payload.Contact_Name || payload.contactName,
      contactEmail: payload.Contact_Email || payload.contactEmail,
      preferredDate: payload.Preferred_Date || payload.preferredDate,
      preferredTime: payload.Preferred_Time || payload.preferredTime,
      state: payload.State || payload.state,
      city: payload.City || payload.city,
      witnesses: payload.Witnesses || payload.witnesses,
      estimatedDuration: payload.estimated_duration || payload.estimatedDuration,
      servicesNeeded: payload.servicesNeeded || payload.servicesNeeded || [],
      notes: payload.notes || payload.Notes || undefined,
      status: payload.status,
    };

    const updated = await Contact.findByIdAndUpdate(id, { $set: allowed }, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: "Contact not found" });
    return res.status(200).json({ message: "Contact updated", data: updated });
  } catch (error) {
    console.error("Update Contact Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Contact.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Contact not found" });
    return res.status(200).json({ message: "Contact deleted" });
  } catch (error) {
    console.error("Delete Contact Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
