(function ($) {
  "use strict";

  /*-------------------------------------------------------------------------------
      Animsition init
    -------------------------------------------------------------------------------*/

  $(".animsition").animsition({
    loadingClass: "preloader",
    loadingInner:
      '<div class="spinner"><div class="double-bounce1"></div><div class="double-bounce2"></div></div>',
  });

  /*-------------------------------------------------------------------------------
      Wow init
    -------------------------------------------------------------------------------*/

  new WOW({ mobile: false }).init();

  /*-------------------------------------------------------------------------------
      Menu
    -------------------------------------------------------------------------------*/

  $(".a-nav-toggle").on("click", function () {
    if ($("html").hasClass("body-menu-opened")) {
      $("html").removeClass("body-menu-opened").addClass("body-menu-closed");
    } else {
      $("html").addClass("body-menu-opened").removeClass("body-menu-closed");
    }
  });

  /*-------------------------------------------------------------------------------
      Masonry
    -------------------------------------------------------------------------------*/

  $(window).on("load", function () {
    if ($(".a-grid").length) {
      $(".a-grid").isotope({
        itemSelector: ".grid-item",
      });
      $(".a-grid-filter a").on("click", function () {
        $(this).parents(".a-grid-filter").find(".active").removeClass("active");
        $(this).parent().addClass("active");
        var filterValue = $(this).attr("data-filter");
        $(".a-grid").isotope({ filter: filterValue });
      });
    }

    if ($(".a-grid-line").length) {
      $(".a-grid-line").isotope({
        itemSelector: ".grid-item",
        layoutMode: "fitRows",
      });
      $(".a-grid-filter a").on("click", function () {
        $(this).parents(".a-grid-filter").find(".active").removeClass("active");
        $(this).parent().addClass("active");
        var filterValue = $(this).attr("data-filter");
        $(".a-grid-line").isotope({ filter: filterValue });
      });
    }
  });
})($);

/*-------------------------------------------------------------------------------
      Validation
    -------------------------------------------------------------------------------*/

const isValidEmail = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const form = document.querySelector("form");
const thankYou = document.querySelector(".thank-you");
const nameInput = document.querySelector('input[name="name"]');
const emailInput = document.querySelector('input[name="_replyto"]');
const subjectInput = document.querySelector('input[name="subject"]');
const messageInput = document.querySelector('textarea[name="message"]');
const submitButton = document.getElementById("submit-button");

const inputs = [nameInput, emailInput, subjectInput, messageInput];

let isFormValid = false;
let isValidationOn = false;

const resetElm = (elm) => {
  elm.classList.remove("error");
  elm.nextElementSibling.classList.add("hidden");
};

const invalidateElm = (elm) => {
  elm.classList.add("error");
  elm.nextElementSibling.classList.remove("hidden");
};

const validateInputs = () => {
  if (!isValidationOn) return;

  isFormValid = true;
  inputs.forEach(resetElm);

  if (!nameInput.value) {
    isFormValid = false;
    invalidateElm(nameInput);
  }
  if (!isValidEmail(emailInput.value)) {
    isFormValid = false;
    invalidateElm(emailInput);
  }
  if (!subjectInput.value) {
    isFormValid = false;
    invalidateElm(subjectInput);
  }
  if (!messageInput.value) {
    isFormValid = false;
    invalidateElm(messageInput);
  }
};

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    isValidationOn = true;
    validateInputs();
    if (isFormValid) {
      submitButton.classList.add("button-loading");
      submitButton.textContent = "Please Wait";
      setTimeout(sendEmail, 2000);
      nameInput.disabled = true;
      emailInput.disabled = true;
      subjectInput.disabled = true;
      messageInput.disabled = true;
      submitButton.disabled = true;
    }
  });
}

inputs.forEach((input) => {
  if (input) {
    input.addEventListener("input", () => {
      validateInputs();
    });
  }
});

function sendEmail(Email) {
  const tempParams = {
    from_name: nameInput.value,
    email_subject: subjectInput.value,
    reply_to: emailInput.value,
    message: messageInput.value,
  };

  emailjs
    .send("service_dnx56hw", "template_549l9li", tempParams)
    .then(function (res) {
      console.log("Success", res.status);
      form.remove();
      thankYou.classList.remove("hidden");
    });
}
