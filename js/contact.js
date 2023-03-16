let contact = document.querySelector(".contact");
let namee = document.querySelector(".contact .name input");
let email = document.querySelector(".contact .email input");
let subject = document.querySelector(".contact .subject input");
let message = document.querySelector(".contact .message textarea");
contact.onsubmit = function (e) {
  let nameValue = namee.value.trim();
  let emailValue = email.value.trim();
  let subjectValue = subject.value.trim();
  let messageValue = message.value.trim();
  let nameValid = false;
  let emailValid = false;
  let subjectValid = false;
  let messageValid = false;
  // Valid Inputs
  if (nameValue.match(/\w{4,}/i)) {
    document.querySelector(".name .text-danger").classList.remove("error");
    nameValid = true;
  } else {
    document.querySelector(".name .text-danger").classList.add("error");
  }
  if (emailValue.match(/\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/i)) {
    document.querySelector(".email .text-danger").classList.remove("error");
    emailValid = true;
  } else {
    document.querySelector(".email .text-danger").classList.add("error");
  }
  if (subjectValue.match(/\w{4,}/i)) {
    document.querySelector(".subject .text-danger").classList.remove("error");
    subjectValid = true;
  } else {
    document.querySelector(".subject .text-danger").classList.add("error");
  }
  if (messageValue.match(/\w{4,}/i)) {
    document.querySelector(".message .text-danger").classList.remove("error");
    messageValid = true;
  } else {
    document.querySelector(".message .text-danger").classList.add("error");
  }
  // if all true submit
  // if all true send
  if (nameValid && emailValid && subjectValid && messageValid) {
  } else {
    e.preventDefault();
  }
};
