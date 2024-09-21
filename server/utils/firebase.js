var admin = require("firebase-admin");
var serviceAccount = require("../serviceAccountKey.json");
require("dotenv").config()

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.STORAGEBUCKET
});

const bucket = admin.storage().bucket()
const getSignedUrl = async (filePath) => {
    try {
        const expiredDate = new Date()
        expiredDate.setDate(expiredDate.getDate() + 3)
        const file = bucket.file(filePath)
        const signUrl = await file.getSignedUrl({
            action: 'read',
            expires: expiredDate
        })
        return {
            hinhAnh: signUrl[0],
            hinhAnhHetHan: expiredDate
        }
    }
    catch (err) {
        console.error('Error getting signed URL:', err);
    }
}
const uploadImageToFirebase = (file, filePath = "") => {
    return new Promise((resolve, reject) => {
        const blob = bucket.file(filePath)
        const blobWriter = blob.createWriteStream({
            metadata: {
                contentType: file.mimetype
            }
        })
        blobWriter.on('error', (err) => {
            reject(err)
        })
        blobWriter.on('finish', () => {
            resolve(getSignedUrl(filePath))
        })
        blobWriter.end(file.buffer)
    })
}

const deleteImageFromFirebase = async (filePath = "") => {
    const blob = bucket.file(filePath)
    blob.delete()
        .then((data) => { })
        .catch((err) => {
            console.log("A")
            console.log(err.message)
        })
}

module.exports = {
    uploadImageToFirebase,
    deleteImageFromFirebase,
    getSignedUrl
}