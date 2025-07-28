import multer from 'multer';
import path from 'path';


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'src/public/uploads'); 
    },
    filename: function (req, file, cb) {

      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)

      cb(null, file.originalname + '-' + uniqueSuffix);
    }
  });

  // const fileFilter = (req, file, cb) => {
  //   const allowedTypes = /\.(jpeg|jpg|png|webp)$/;
  //   const ext = path.extname(file.originalname).toLowerCase();
  //   if (allowedTypes.test(ext)) {
  //     cb(null, true);
  //   } else {
  //     cb(new Error("Only image files are allowed (jpeg, jpg, png, webp)"));
  //   }
  // };
  


const upload = multer({storage,
  
});

export default upload;