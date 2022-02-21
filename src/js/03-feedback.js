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
  if (localStorageData !== null) {
    input.value = localStorageData.email || '';
    textArea.value = localStorageData.message || '';
    userDataObj.email = localStorageData.email || '';
    userDataObj.message = localStorageData.message || '';
  }
}

form.addEventListener('submit', onFormSubmit);
function onFormSubmit(e) {
  e.preventDefault();
  localStorage.removeItem(USER_DATA);
  e.currentTarget.reset();
}

console.log(userDataObj);
