import vision, {VisionFaceContourType} from '@react-native-firebase/ml-vision';

export const DetectFace = async (localPath) => {
  return await vision().faceDetectorProcessImage(localPath);
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


}
