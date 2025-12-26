import express from "express";
import multer from "multer";
import {
  createContact,
  getContacts,
  getContactById,
  updateContact,
  deleteContact,
} from "../controllers/contactController.js";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
});

// Public - submit contact form
router.post(
  "/",
  // accept any of: File (legacy), file, or image
  upload.fields([
    { name: 'File', maxCount: 1 },
    { name: 'file', maxCount: 1 },
    { name: 'image', maxCount: 1 },
  ]),
  createContact
);

// Admin routes - currently public; add verifyToken middleware later
router.get("/", getContacts);
router.get("/:id", getContactById);
router.patch("/:id", updateContact);
router.delete("/:id", deleteContact);

export default router;
