import { throttle } from 'lodash';

const USER_DATA = 'feedback-form-state';
const form = document.querySelector('.feedback-form');
const userDataObj = {};
const textArea = document.querySelector('.feedback-form textarea');
const input = document.querySelector('.feedback-form input');

form.addEventListener('input', throttle(onTextareaInput, 500));
function onTextareaInput(e) {
  userDataObj[e.target.name] = e.target.value;
  localStorage.setItem(USER_DATA, JSON.stringify(userDataObj));
}

document.addEventListener('DOMContentLoaded', reload);
function reload() {
  const localStorageData = JSON.parse(localStorage.getItem(USER_DATA));
  if (localStorageData.message !== null) {
    textArea.value = localStorageData.message || '';
    input.value = localStorageData.email || '';
  }
}
// populateTextarea();
// function populateTextarea() {
//   const localStorageData = JSON.parse(localStorage.getItem(USER_DATA));
//   if (localStorageData === null) {
//     return;
//   }
//   textArea.value = localStorageData.message;
//   input.value = localStorageData.email;
// }

form.addEventListener('submit', onFormSubmit);
function onFormSubmit(e) {
  e.preventDefault();
  localStorage.removeItem(USER_DATA);
  e.currentTarget.reset();
}

console.log(userDataObj);
