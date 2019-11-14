import crypto from 'crypto';
import path from 'path';
import multer from "multer";

const storage = multer.diskStorage({
    destination: (req:any, file:any, cb:any) => {
        cb(null, './public/uploads/');
    },
    filename: (req:any, file:any, cb:any) => {
        crypto.pseudoRandomBytes(16, (err, raw) => {
            if(err) return cb(err)

            cb(null, raw.toString('hex') + path.extname(file.originalname));
        
        });
    }
});
//const upload = multer({ storage: storage });
const multerUploads = multer({ 
    storage,
    limits: {
        fileSize: 2 * 1024 * 1024 //2mb
    },
    fileFilter: (req:any, file:any, cb:any) => {
        const filetypes = /jpg|png|jpeg/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLocaleLowerCase())

        if(mimetype && extname){
            return cb(null, true);
        }
        cb(new Error(`Only the following image types are supported ${filetypes}`))
    }
});
export default multerUploads; 