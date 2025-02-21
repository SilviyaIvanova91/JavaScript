export function getUserData() {
  return JSON.parse(sessionStorage.getItem("userData"));
}

export function setUserData(data) {
  sessionStorage.setItem("userData", JSON.stringify(data));
}

export function clearUserData() {
  sessionStorage.removeItem("userData");
}

export function createSubmitHandler(callback) {
  return function (event) {
    event.preventDefault();
    let formData = new FormData(event.target);
    let data = Object.fromEntries(formData);

    callback(data, event.target);
  };
}
