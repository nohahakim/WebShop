import { isValidObjectId } from "mongoose";

function checkObjectId(req, res, next) {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(400);
    throw new Error("Invalid Object ID");
  }
  next();
}

export default checkObjectId;
