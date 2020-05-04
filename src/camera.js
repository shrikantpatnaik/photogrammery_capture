const gphoto2 = require('gphoto2');
const GPhoto = new gphoto2.GPhoto2();
const fs = require('fs');

export default class Camera {
  /**
   * @param {gphoto2.Camera} instance The camera instance
   */
  constructor(instance) {
    this.instance = instance;
  }

  static init() {
    GPhoto.setLogLevel(-1);
    GPhoto.on('log', function (level, domain, message) {
      console.log(domain, message);
    });
  }

  static setLogLevel(level) {
    GPhoto.setLogLevel(level);
  }

  static getCameraList() {
    return new Promise((resolve, reject) => {
      GPhoto.list(function (list) {
        if (list.length === 0) return reject("No Cameras Found");
        resolve(list);
      });
    })
  }

  setConfig(param, value) {
    return new Promise((resolve, reject) => {
      this.instance.setConfigValue(param, value, function (err) {
        if(err) {
          return reject(err);
        }
        resolve();
      });
    });
  }

  takePictureAndSave(path) {
    return new Promise((resolve, reject) => {
      this.instance.takePicture({download: true}, function (err, data) {
        if(err) {
          return reject(err);
        }
        fs.writeFile(__dirname + path, data, {encoding: "binary"}, function (err){
          if(err) {
            return reject(err);
          }
          resolve();
        });
      })
    })
  }
}