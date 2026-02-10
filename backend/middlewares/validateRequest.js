import { z } from "zod";

const validateRequest = (schema, type = "body") => (req, res, next) => {
  try {
    const dataToValidate = req[type] || {};
    const parsed = schema.parse(dataToValidate);

    // Only replace req.body, not req.query or req.params
    if (type === "body") {
      req.body = parsed;
    }

    next();
  } catch (err) {
    console.log("VALIDATION ERROR:", err);

    if (err instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: err.issues.map(e => e.message).join(", "),
      });
    }

    res.status(400).json({
      success: false,
      message: "Invalid request data",
    });
  }
};

export default validateRequest;
