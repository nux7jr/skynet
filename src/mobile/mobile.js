console.log("Mobile version || PC verson hide");
$(function () {
  $.mask.definitions["S"] = "[0-69]";
  var phone_mask = "+7 (S99) 999-99-99";
  $('[name="phone"]').mask(phone_mask);
  $('[name="phone"]').on("focus click", function () {
    $(this)[0].setSelectionRange(4, 4);
  });
});
$(function () {
  let styleTop = $(".skynet-mobile-widget-viewport").css("height");
  let numberTop = parseInt(styleTop, 10) - 57;
  $(".skynet-mobile").css("top", numberTop);
  $(".skynet-mobile").css("display", "flex");
});
$(window).resize(function () {
  let styleTop = $(".skynet-mobile-widget-viewport").css("height");
  let numberTop = parseInt(styleTop, 10) - 57;
  $(".skynet-mobile").css("top", numberTop);
});
var timer = null;
$(window).on("scroll", function () {
  clearTimeout(timer);
  $(".skynet-mobile").css("display", "none");

  timer = setTimeout(function () {
    $(".skynet-mobile").css("display", "flex");
  }, 150);
});
// $(window).on("touchstart", function () {
//   $(".skynet-mobile").css("display", "none");
// })
// $(window).on("touchend", function () {
//   $(".skynet-mobile").css("display", "flex");
// })
$(".skynet-mobile-call").on("click", function () {
  $(".skynet-call-mobile-modal").show();
});
$(".skynet-call-mobile-modal__close").on("click", function () {
  $(".skynet-call-mobile-modal").hide();
});

$(".skynet-form-in-call__link").on("click", function () {
  $(".skynet-form-in-call__option").show();
  $(".skynet-form-in-call__link").hide();
});
$(".skynet-form-in-call").on("submit", function (evt) {
  evt.preventDefault();
  $(".skynet-mobile__load").show();
  const form = $(this);
  const url = $(".skynet-form-in-call").attr("action");
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
  } catch (e) {
    console.warn(e)
  }
  setTimeout(function () {
    $(".skynet-call-mobile-modal__wrapper").hide();
    $(".skynet-call-mobile-modal__success").show();
    $(".skynet-mobile__load").hide();
  }, 2000);
});
$(".skynet-mobile-question").on("click", function () {
  $(".skynet-question-mobile-modal").show();
});
$(".skynet-question-option__link").on("click", function () {
  $(".skynet-question-option").show();
});
function changeSlide() {
  $(".skynet-step-active").hide();
  $(".skynet-step-active").next().addClass("skynet-step-active");
}
$(".skynet-slide-one").on("click", function () {
  if ($(".skynet-question__input").val().length < 5) {
    $(".skynet-question__input").addClass("skynet-question__falid");
    setTimeout(function () {
      $(".skynet-question__input").removeClass("skynet-question__falid");
    }, 1000);
  } else {
    changeSlide();
  }
});
$(".skynet-slide-two").on("click", function () {
  if ($(".skynet-question-phone__input").val().length == 18) {
    setTimeout(() => {
      changeSlide();
    }, 2000);
  } else {
    $(".skynet-question-phone__input").addClass("skynet-question__falid");
    setTimeout(function () {
      $(".skynet-question-phone__input").removeClass("skynet-question__falid");
    }, 1000);
  }
});
$(".skynet-question-mobile-modal__close").on("click", function () {
  $(".skynet-question-mobile-modal").hide();
});
$(".skynet-question-mobile-modal__second-close").on("click", function () {
  $(".skynet-question-mobile-modal").hide();
});
$("#skynet-question__form").on("submit", function (evt) {
  evt.preventDefault();
  $(".skynet-mobile__load-question__form").show();
  const url = $("#skynet-question__form").attr("action");
  const form = $(this);
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
  } catch (e) {
    console.warn(e)
  }
  setTimeout(function () {
    $(".skynet-mobile__load").hide();
  }, 2000);
});
