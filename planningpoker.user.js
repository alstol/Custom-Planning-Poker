// ==UserScript==
// @name            Custom Planning Poker
// @description     Because sending just cards is boring!
// @author          Alin Stefan Olaru
// @match           http://onlineplanningpoker.azurewebsites.net/*
// @grant           none
// @downloadURL     https://alinstefanola.ru/Custom-Planning-Poker/planningpoker.user.js
// @updateURL       https://alinstefanola.ru/Custom-Planning-Poker/planningpoker.user.js
// @version         0.02
// @run-at          document-end
// ==/UserScript==

var CustomPoker = {
  initPreviewCard: () => {
    var cardImage = $("<img>").attr({
      id: "fancy-image",
      src: "https://media.giphy.com/media/AXQaLoWMeSmRy/giphy.gif"
    });
    var cardPreview = $("<div>")
      .attr({ class: "SelectableCard col-md-1" })
      .css({
        display: "block"
      })
      .append(cardImage);

    $("#ControlPanel")
      .find('img[src$="/Content/Cards/CardBreak.png"]')
      .parent()
      .after(cardPreview);
  },
  initButton: () => {
    var btn = $("<button>")
      .attr({
        class: "btn btn-default"
      })
      .text("Send!")
      .click(() => {
        var text = $("#custom-card-input").val();
        hub.server.selectCard(text);
      });
    $("#ControlPanel").append(btn);
  },
  initInput: () => {
    var input = $("<input>")
      .attr({
        id: "custom-card-input",
        class: "form-control input-sm",
        placeholder: "Image URL",
        value: "https://media.giphy.com/media/AXQaLoWMeSmRy/giphy.gif"
      })
      .keyup(function(a) {
        console.log($(this).val());
        $("#fancy-image").attr("src", $(this).val());
      });

    $("#ControlPanel").append(input);
  },
  init: () => {
    CustomPoker.initPreviewCard();
    CustomPoker.initInput();
    CustomPoker.initButton();
  }
};

$(document).ready(() => {
  CustomPoker.init();
});
