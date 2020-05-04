import "@babel/polyfill";
import Camera from "./camera";
import axios from "axios";
const noOfPhotos = 1;

(async () => {
  try {
    Camera.init();
    Camera.setLogLevel(0);
    const cameraList = await Camera.getCameraList();
    const camera = new Camera(cameraList[0]);
    try {
      await camera.setConfig("imagequality", "2");

    } catch (e) {
      console.error("Error "+ e +": Cannot communicate with camera")
      process.exit(0);
    }
    await camera.setConfig("imagesize", "0");

    for(let i = 0; i < noOfPhotos; i++) {
      await camera.takePictureAndSave('/../images/picture'+i+'.jpg');
      // await axios.get('http://turntable.local/turn?degrees='+360/noOfPhotos)
    }

  } catch (e) {
    console.error(e)
  }
})();