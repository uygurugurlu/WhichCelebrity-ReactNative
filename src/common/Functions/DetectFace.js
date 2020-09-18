import vision, {VisionFaceContourType} from '@react-native-firebase/ml-vision';
import crashlytics from '@react-native-firebase/crashlytics';

export const DetectFace = async (localPath) => {
  try {
    return await vision().faceDetectorProcessImage(localPath);
  } catch (e) {
    console.log('DetectFace error: ', e);
    crashlytics().recordError(e);
  }
  /*faces.forEach(face => {
   console.log('Head rotation on Y axis: ', face.headEulerAngleY);
   console.log('Head rotation on Z axis: ', face.headEulerAngleZ);

   console.log('Left eye open probability: ', face.leftEyeOpenProbability);
   console.log('Right eye open probability: ', face.rightEyeOpenProbability);
   console.log('Smiling probability: ', face.smilingProbability);

   face.faceContours.forEach(contour => {
      if (contour.type === VisionFaceContourType.FACE) {
        console.log('Face outline points: ', contour.points);
      }
    });
  });*/
};
