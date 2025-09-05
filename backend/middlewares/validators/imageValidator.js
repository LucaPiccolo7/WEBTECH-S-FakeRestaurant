import { validateMIMEType } from "validate-image-type";
import { AppError } from "../../errors/AppError.js"

export async function imageValidator(req, res, next){
    if(!req.file)
      throw new AppError(`Image file doesn't exists.`, 400);

    const result = await validateMIMEType(req.file.path, {
      originalFilename: req.file.originalname,
      allowMimeTypes: ['image/jpeg', 'image/png'],
    });

    if (!result.ok) {
      throw new AppError(`Image file is not valid.`, 415);
    } else {
      next();
    }
}