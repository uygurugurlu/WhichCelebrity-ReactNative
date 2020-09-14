import {WSnackBar} from "react-native-smart-tip";

export const ShowSnackBar = (data, duration, position, type) => {

  let backgroundColor = "#4e4e4e", color = "#fff";

  switch (duration) {
    case "SHORT":
      duration = WSnackBar.duration.SHORT;
      break;
    case "LONG":
      duration = WSnackBar.duration.LONG;
      break;
  }

  switch (position) {
    case "TOP":
      position = WSnackBar.position.TOP;
      break;
    case "BOTTOM":
      position = WSnackBar.position.BOTTOM;
      break;
  }

  switch (type) {
    case "SUCCESS":
      backgroundColor = '#00AB66';
      color = "#fff";
      break;
    case "WARN":
      backgroundColor = '#ff8400';
      color = "#fff";
      break;
    case "INFO":
      backgroundColor = '#2389f6';
      color = "#fff";
      break;
    case "ERROR":
      backgroundColor = '#ED4337';
      color = "#fff";
      break;
  }

  const toastOpts = {
    data: data,
    textColor: color,
    backgroundColor: backgroundColor,
    duration: duration,
    position: position,
    isShowShadow: true,
  };

  WSnackBar.show(toastOpts);
};
