export const shortenUserName = (userName) => {
  try {
    if(userName.indexOf(" ") === -1)
      return userName
    let index = userName.indexOf(" ");
    let name = userName.substring(0, index);
    return name + " " + userName.charAt(index+1) + "...";
  }
  catch (e) {
    console.log("name with trailing space in scoreboard");
    return userName;
  }
}
