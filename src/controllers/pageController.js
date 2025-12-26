import Page from "../models/pageModel.js";
import Section from "../models/sectionModel.js";
import { uploadToCloudinary, deleteFromCloudinary } from "../utils/cloudinaryUpload.js";

// Update section content with optional image upload
export const updateSection = async (req, res) => {
  try {
    const { pageSlug, sectionKey } = req.params;
    const imageFile = req.file; // From multer
    const { imageFieldPath, ...contentDataRaw } = req.body;

    // Parse JSON strings in form fields (so multipart/form-data can send nested objects as JSON strings)
    const contentData = {};
    for (const [k, v] of Object.entries(contentDataRaw || {})) {
      if (typeof v === 'string') {
        const trimmed = v.trim();
        if ((trimmed.startsWith('{') && trimmed.endsWith('}')) || (trimmed.startsWith('[') && trimmed.endsWith(']'))) {
          try {
            contentData[k] = JSON.parse(trimmed);
            continue;
          } catch (err) {
            // not valid JSON, leave as string
          }
        }
      }
      contentData[k] = v;
    }

    // Validate required params
    if (!pageSlug || !sectionKey) {
      return res.status(400).json({
        message: "Page slug and section key are required",
      });
    }

    // Validate content
    if ((!contentData || Object.keys(contentData).length === 0) && !imageFile) {
      return res.status(400).json({
        message: "Content to update or image file is required",
      });
    }

    // Prepare update object
    let updateData = { ...contentData };

    // Fetch existing section (used for partial merge and old image deletion)
    const existingSection = await Section.findOne({ pageSlug, sectionKey });

    // Handle image upload if file provided
    if (imageFile) {
      // existingSection already fetched above
      if (existingSection && existingSection.content) {
        // Get old image URL and publicId from nested path
        let oldImageUrl = null;
        let oldPublicId = null;
        
        if (imageFieldPath) {
          // Use provided path to get old image
          const paths = imageFieldPath.split('.');
          let current = existingSection.content;
          for (let i = 0; i < paths.length; i++) {
            current = current?.[paths[i]];
          }
          
          // Try to get from object with url and publicId
          if (typeof current === 'object') {
            oldImageUrl = current?.url;
            oldPublicId = current?.publicId;
          } else {
            // Fallback to string URL
            oldImageUrl = current;
          }
        } else {
          // Default: get from image.url
          oldImageUrl = existingSection.content?.image?.url;
          oldPublicId = existingSection.content?.image?.publicId;
        }

        // STEP 2: Delete old image from Cloudinary if it exists
        if (oldImageUrl) {
          try {
            let publicIdToDelete = null;

            // First try using stored publicId
            if (oldPublicId) {
              publicIdToDelete = oldPublicId;
            } else {
              // Fallback: Extract public_id from Cloudinary URL
              // URL format: https://res.cloudinary.com/[cloud_name]/image/upload/v[version]/[folder]/[filename].ext
              const urlParts = oldImageUrl.split('/upload/');
              if (urlParts.length > 1) {
                let publicIdPart = urlParts[1];
                // Remove version if present (v123456/)
                publicIdPart = publicIdPart.replace(/^v\d+\//, '');
                // Remove file extension
                publicIdToDelete = publicIdPart.split('.')[0];
              }
            }

            if (publicIdToDelete) {
              console.log(`🗑️ Attempting to delete old image: ${publicIdToDelete}`);
              await deleteFromCloudinary(publicIdToDelete);
              console.log(`✅ Old image deleted successfully`);
            }
          } catch (deleteError) {
            console.warn('⚠️ Warning: Could not delete old image, proceeding with upload:', deleteError.message);
            // Don't fail the request if delete fails, just warn
          }
        }
      }

      // Determine folder based on pageSlug
      // Explicit mappings for service child pages to keep Cloudinary organized
      const folderMap = {
        home: 'varallo/varallohome',
        about: 'varallo/varalloabout',
        contact: 'varallo/varallocontact',
        // keep a general services folder for the parent page
        services: 'varallo/services',
        blog: 'varallo/varalloblog',

        // Explicit service child folders
        'tvg-management': 'varallo/tvg-management',
        'tvg-stream': 'varallo/tvg-stream',
        'tvg-books': 'varallo/tvg-books',
        'tvg-connect': 'varallo/tvg-connect',
        'tvg-verify': 'varallo/tvg-verify',
        'tvg-reporting': 'varallo/tvg-reporting',
      };

      const folder = folderMap[pageSlug] || `varallo/${pageSlug}`;

      // STEP 3: Upload new image to Cloudinary
      const uploadResult = await uploadToCloudinary(
        imageFile,
        folder,
        `${sectionKey}-${Date.now()}`
      );

      if (!uploadResult.success) {
        return res.status(500).json({
          message: "Failed to upload image",
          error: uploadResult.error,
        });
      }

      // Determine where to save image URL in content
      // If imageFieldPath provided: use it (e.g., "content.image.url")
      // Otherwise: default to "image.url"
      if (imageFieldPath) {
        // Parse the field path and set nested value
        const paths = imageFieldPath.split('.');
        let current = updateData;
        for (let i = 0; i < paths.length - 1; i++) {
          if (!current[paths[i]]) {
            current[paths[i]] = {};
          }
          current = current[paths[i]];
        }
        // Store both URL and publicId
        current[paths[paths.length - 1]] = {
          url: uploadResult.url,
          publicId: uploadResult.publicId,
        };
      } else {
        // Default: save to image with url and publicId
        if (!updateData.image) {
          updateData.image = {};
        }
        updateData.image.url = uploadResult.url;
        updateData.image.publicId = uploadResult.publicId;
      }

      console.log(`✅ New image uploaded successfully: ${uploadResult.url}`);
    }

    // Input validation - check for suspicious data
    // Max size check (prevent extremely large updates)
    const dataSize = JSON.stringify(updateData).length;
    const maxDataSize = 5 * 1024 * 1024; // 5MB max
    if (dataSize > maxDataSize) {
      return res.status(400).json({
        message: `Content size exceeds limit. Max: 5MB, Received: ${(dataSize / (1024 * 1024)).toFixed(2)}MB`,
      });
    }

    // Merge incoming content into existing section content (partial update)
    const deepMerge = (target = {}, source = {}) => {
      // Ensure target is an object we can merge into
      if (typeof target !== 'object' || target === null || Array.isArray(target)) {
        target = {};
      }
      for (const key of Object.keys(source)) {
        const s = source[key];
        if (s && typeof s === 'object' && !Array.isArray(s)) {
          target[key] = deepMerge(target[key], s);
        } else {
          target[key] = s;
        }
      }
      return target;
    };

    const existingContent = existingSection?.content || {};
    const mergedContent = deepMerge(existingContent, updateData);

    // Find and update section with merged content
    const section = await Section.findOneAndUpdate(
      { pageSlug, sectionKey },
      { $set: { content: mergedContent } },
      { new: true, runValidators: true }
    );

    if (!section) {
      return res.status(404).json({
        message: `Section not found: ${sectionKey} in page ${pageSlug}`,
      });
    }

    return res.status(200).json({
      message: "Section updated successfully",
      data: section,
    });
  } catch (error) {
    console.error("Update Section Error:", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};





// Get service subpage by slug (e.g., /api/pages/services/tvg-management)
export const getServiceBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    if (!slug) {
      return res.status(400).json({ message: "Service slug is required" });
    }

    // Ensure we only fetch pages that are children of 'services'
    const page = await Page.findOne({ slug, parentSlug: 'services' }).lean();

    if (!page) {
      return res.status(404).json({ message: "Service page not found" });
    }

    const sections = await Section.find({ pageSlug: slug }).sort({ order: 1 }).lean();

    return res.status(200).json({ message: "Service page fetched successfully", data: { ...page, sections } });
  } catch (error) {
    console.error("Get Service Page Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Get single page with all sections
export const getPageBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    // Validate input
    if (!slug) {
      return res.status(400).json({
        message: "Page slug is required",
      });
    }

    // Find page
    const page = await Page.findOne({ slug }).lean();

    if (!page) {
      return res.status(404).json({
        message: "Page not found",
      });
    }

    // Get all sections for this page, sorted by order
    const sections = await Section.find({ pageSlug: slug })
      .sort({ order: 1 })
      .lean();

    // Combine page + sections
    const pageWithSections = {
      ...page,
      sections,
    };

    return res.status(200).json({
      message: "Page fetched successfully",
      data: pageWithSections,
    });
  } catch (error) {
    console.error("Get Page Error:", error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

// Get all pages
export const getAllPages = async (req, res) => {
  try {
    const pages = await Page.find({ isActive: true }).lean();

    return res.status(200).json({
      message: "Pages fetched successfully",
      data: pages,
    });
  } catch (error) {
    console.error("Get All Pages Error:", error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};
