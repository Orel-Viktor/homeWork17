"use strict";

import "./styles/main.scss";

function Validation(form) {
  const myForm = document.querySelector(form);
  const parrentItemClass = ".js--form-contorl";
  const errorBorderClass = "error-border";
  const fieldClass = ".js--form-field";

  this.formGroups = myForm.querySelectorAll(parrentItemClass);
  myForm.addEventListener("submit", (event) => {
    event.preventDefault();
    this.chekFormElemnt();
  });

  this.clearFieldErrors = function (fg) {
    fg.classList.remove(errorBorderClass);
    const error = fg.querySelector("small");
    if (error) { error.remove(); }
  };

  this.chekFormElemnt = function () {
    for (const formGroup of this.formGroups) {
      const input = formGroup.querySelector(fieldClass);
      this.clearFieldErrors(formGroup);
      const passwordMessage = input.dataset.password;
      const passwordReq = input.dataset.passwordReq;
      const passMinDigit = input.dataset.minLength;
      const passMinLength = input.dataset.minMessage;
      const emailReq = input.dataset.emailReq;
      const emailMessage = input.dataset.email;
      const nameReq = input.dataset.nameReq

      if (nameReq) {
        this.validNameReq(input, nameReq);
      }
      if (emailMessage) {
        this.validEmail(input, emailMessage);
      }
      if (emailReq) {
        this.validEmailReq(input, emailReq);
      }
      if (passwordMessage) {
        this.validPassword(input, passwordMessage);
      }
      if (passMinLength) {
        this.validMinLength(input, passMinLength.replace("N", passMinDigit));
      }
      if (passwordReq) {
        this.validPasswordReq(input, passwordReq);
      }
    }
  };

  this.findElementInput = function (inputAtribute) {
    const inputElement = myForm.querySelectorAll(inputAtribute);
    this.vallueArr = Array.from(inputElement).map((element) => element.value);
  };

  this.validPassword = function (input, message) {
    this.findElementInput("input[type=password]");
    if (this.vallueArr[0] !== this.vallueArr[1]) {
      this.errorTemplate(input, message);
    }
  };

  this.validPasswordReq = function (input, message) {
    this.findElementInput("input[type=password]");
    if (this.vallueArr[0] == "" || this.vallueArr[1] == "") {
      this.errorTemplate(input, message);
    }
  };

  this.validMinLength = (input, message) => {
    this.findElementInput("input[type=password]");
    if (this.vallueArr[0].length < 5 || this.vallueArr[1].length < 5) {
      this.errorTemplate(input, message);
    }
  };

  this.validNameReq = function (input, message) {
    this.findElementInput("input[type=text]");
    if (this.vallueArr[0] === "") {
      this.errorTemplate(input, message);
    }
  };

  this.validEmailReq = function (input, message) {
    this.findElementInput("input[type=text]");
    if (this.vallueArr[1] === "") {
      this.errorTemplate(input, message);
    }
  };

  this.validEmail = function (input, message) {
    this.findElementInput("input[type=text]");
    const rexExEmail = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
    if (!this.vallueArr[1].match(rexExEmail)) {
      this.errorTemplate(input, message);
    }
  };

  this.errorTemplate = function (input, message) {
    const parent = input.closest(parrentItemClass);
    const error = parent.querySelector("small");
    if (error) {
      error.innerText = message;
      return;
    }
    let divSmall = document.createElement("small");
    divSmall.innerText = message;
    parent.classList.add(errorBorderClass);
    parent.appendChild(divSmall);
  };
}

const form1 = new Validation(".form");

