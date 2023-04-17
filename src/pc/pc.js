console.log("PC version || mobile verson hide");
$(function () {
  $.mask.definitions["S"] = "[0-69]";
  var phone_mask = "+7 (S99) 999-99-99";
  $('[name="phone"]').mask(phone_mask);
  $('[name="phone"]').on("focus click", function () {
    $(this)[0].setSelectionRange(4, 4);
  });
});
const callForm = $(".skynet-call-form");
const userMess = $(".skynet-user-mess");
const chatsForm = $(".skynet-chats__form");
chatsForm.on("keydown", function (event) {
  if (event.keyCode == 13) {
    event.preventDefault();
  }
});
$("#skynet-chatsBtn").on("click", function () {
  if ($(".skynet-bubble-user").css("display") == "block") {
    chatsForm.addClass("skynet-activeForm");
    $(".skynet-user-mess__wrapper").hide();
  } else {
    chatsForm.addClass("skynet-activeForm");
    setTimeout(function () {
      $(".skynet-bubble").addClass("skynet-bubble-active");
      $("#skynet-special-loading").hide();
      $(".skynet-user-mess__wrapper").show();
    }, 1000);
  }
});
$(".skynet-chats__form-close").on("click", function () {
  chatsForm.removeClass("skynet-activeForm");
});
$(".skynet-call-form-btn").on("click", function () {
  callForm.addClass("skynet-activeCallForm");
});
$(".skynet-call__form-close").on("click", function () {
  callForm.removeClass("skynet-activeCallForm");
});
$(".skynet-call__link").on("click", function () {
  callForm.removeClass("skynet-activeCallForm");
  if ($(".skynet-bubble-user").css("display") == "block") {
    chatsForm.addClass("skynet-activeForm");
    $(".skynet-user-mess__wrapper").hide();
  } else {
    chatsForm.addClass("skynet-activeForm");
    setTimeout(function () {
      $(".skynet-bubble").addClass("skynet-bubble-active");
      $("#skynet-special-loading").hide();
      $(".skynet-user-mess__wrapper").show();
    }, 1000);
  }
});

$(".skynet-user-mess__button").on("click", function (evt) {
  evt.preventDefault();
  if ($(".skynet-user-mess").val().length < 3) {
    setTimeout(function () {
      userMess.removeClass("skynet-user__mess-failed");
    }, 1000);
    userMess.addClass("skynet-user__mess-failed");
  } else {
    $(".skynet-bubble-in-user").text($(".skynet-user-mess").val());
    $(".skynet-bubble-user").show();
    $(".skynet-user-mess").val("");
    $(".skynet-user-mess__wrapper").hide();
    $("#skynet-loading").show();
    setTimeout(() => {
      $("#skynet-loading").hide();
      $(".skynet-second-bubble").addClass("skynet-second-bubble--active");
      setTimeout(() => {
        $(".skynet-form-bubble").addClass("skynet-form-bubble--active");
      }, 1000);
    }, 2000);
  }
});
// valid and fetch
const url = $(".skynet-call-form").attr("action");
const phoneInput = $("#skynet-bubble-phone");
const nameInput = $("#skynet-bubble-name");
$("#skynet-chats__form").on("submit", (evt) => {
  evt.preventDefault();
  if (phoneInput.val().length === 0) {
    phoneInput.addClass("skynet-form-bubble__input--failed");
    setTimeout(() => {
      phoneInput.removeClass("skynet-form-bubble__input--failed");
    }, 1000);
  } else {
    var form = $("#skynet-chats__form");
    try {
      $.ajax({
        url: url,
        type: "POST",
        data: form.serialize(),
        error: function (xhr, status, error) {
          $.ajax({
            url: "https://centr-polov.ru/vendor/webhook/errors/send_telegram_leads_with_error_send.php",
            type: "POST",
            data: form.serialize(),
          });
        },
      });
    } catch (Error) {
      console.warn(Error)
    }
    $(".skynet-from-bubble__load").show();
  }
  setTimeout(function () {
    $(".skynet-from-bubble__load").hide();
    phoneInput.val("");
    nameInput.val("");
    $(".skynet-success-bubble").addClass("skynet-success-bubble--active");
    const pixels = $(".skynet-chat").height() + 221;
    $(".skynet-chat").scrollTop(pixels);
  }, 2000);
});
$(".skynet-call-form").on("submit", function (evt) {
  evt.preventDefault();
  $(".skynet-input__call__load").show();
  var form = $(this);
  try {
    $.ajax({
      url: url,
      type: "POST",
      data: form.serialize(),

      error: function (xhr, status, error) {
        $.ajax({
          url: "https://centr-polov.ru/vendor/webhook/errors/send_telegram_leads_with_error_send.php",
          type: "POST",
          data: form.serialize(),
        });
      },
    });
  } catch (Error) {
    console.warn(Error)
  }
  setTimeout(function () {
    $(".skynet-input__call__load").hide();
    $(".skynet-call__wrapper").hide();
    $(".skynet-call__succsses").show();
    $(".skynet-input__important").val("");
  }, 1000);
  $(".skynet-call__go-back").on("click", function () {
    $(".skynet-call__succsses").hide();
    $(".skynet-call__wrapper").show();
  });
});
