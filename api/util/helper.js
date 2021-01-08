// const crypto = require('crypto');
// const moment = require('moment')
// const constants = require('../constants.json');
const fs = require('fs');


exports.saveFile = (userData) => {
    return new Promise(async (resolve, reject) => {
        try {
            // console.log('userData',userData.image)
            // console.log('userData',userData.id)

            const shortid = require('shortid');
            let companyImages = './image/company';
            if (userData && userData.image) {
                let extension = 'png';
                let fileName = `${userData.id}${shortid.generate()}.${extension}`;
                let data = userData.image.replace(/^data:image\/\w+;base64,/, '');
                let buffer = Buffer.from(data, 'base64');
                let string = `${companyImages}`;
                let file = await this.fileCreation(string, fileName, buffer);
                userData.image = file;
                console.log('userData', userData)
                console.log('file', file)
                return resolve(userData);
            }
            let locationImages = './image/locationImage';
            if (userData && userData.locationImage) {
                let extension = 'png';
                let fileName = `${userData.id}${shortid.generate()}.${extension}`;
                let data = userData.locationImage.replace(/^data:image\/\w+;base64,/, '');
                let buffer = Buffer.from(data, 'base64');
                let string = `${locationImages}`;
                let file = await this.fileCreation(string, fileName, buffer);
                userData.locationImage = file;
                console.log('userData', userData)
                console.log('file', file)
                return resolve(userData);
            }
        } catch (error) {
            return reject(error)
        }
    })
}

exports.fileCreation = (string, fileName, buffer) => {
    return new Promise((resolve, reject) => {
        const imagemin = require('imagemin');
        const imageminJpegtran = require('imagemin-jpegtran');
        const imageminPngquant = require('imagemin-pngquant');

        fs.writeFile(`${string}/${fileName}`, buffer, ((err) => {
            if (err) {
                return reject(err);
            } else {
                imagemin([`${string}/${fileName}`], {
                    destination: `${string}`,
                    plugins: [imageminJpegtran(), imageminPngquant({
                        quality: [0.6, 0.8]
                    })]
                });
                console.log('fileName', fileName)

                return resolve(fileName);
            }
        }));
    })
}

exports.randomString =(length)=>{
    var result = '';
    var characters = 'abcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


exports.passwordGenerator =(length)=>{
    const bcrypt = require('bcrypt');
    const BCRYPT_ROUND = parseInt(process.env.BCRYPT_ROUND, 10);
    const crypto = require("crypto");
    let password = crypto.randomBytes(5).toString('hex');
    password = bcrypt.hashSync(password, BCRYPT_ROUND);
    return password;
}
