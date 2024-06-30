import { TEMP_DIR_PATH } from "../constants/index.js"
import { nanoid } from 'nanoid'
import multer from "multer";
import path from "node:path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    
    cb(null, TEMP_DIR_PATH)
  },

  filename: function (req, file, cb) {
    const { productId } = req.params;
   
    const ext = path.extname(file.originalname); 
    console.log(ext)
    const uniqueSuffix = nanoid();
    cb(null, `${productId}_${uniqueSuffix}${ext}`)
  }
})

export const upload = multer({ storage: storage })