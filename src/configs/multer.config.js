import fs from 'fs';
import multer from 'multer';
import { join } from 'path';
import utils from '../utils.js'

const {__dirname} = utils

const createFolderIfNotExists = (folderPath) => {
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }
};

const baseUploadPath = join(__dirname, '..', 'uploads');
createFolderIfNotExists(join(baseUploadPath, 'profiles'));
createFolderIfNotExists(join(baseUploadPath, 'products'));
createFolderIfNotExists(join(baseUploadPath, 'documents'));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let folder = '';

        switch (req.body.fileType) {
            case 'profile':
                folder = 'profiles';
                break;
            case 'product':
                folder = 'products';
                break;
            case 'document':
                folder = 'documents';
                break;
            default:
                folder = 'others';
        }

        // Asegúrate de que la carpeta existe
        createFolderIfNotExists(join(baseUploadPath, folder));
        
        cb(null, join(baseUploadPath, folder));
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

export default upload;
