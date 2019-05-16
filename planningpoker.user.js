// ==UserScript==
// @name            Custom Planning Poker
// @description     Because sending just cards is boring!
// @author          Alin Stefan Olaru
// @match           http://onlineplanningpoker.azurewebsites.net/*
// @grant           none
// @downloadURL     https://alinstefanola.ru/Custom-Planning-Poker/planningpoker.user.js
// @updateURL       https://alinstefanola.ru/Custom-Planning-Poker/planningpoker.user.js
// @version         0.01
// @run-at          document-end
// ==/UserScript==

var CustomPoker = {
  initHtml: () => {
    var cardImage = $("<img>").attr({
      id: "fancy-image",
      src: "https://i.ebayimg.com/images/g/kykAAOSweW5VEPA5/s-l640.jpg"
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
    var input = $("<input>")
      .attr({
        id: "custom-card-input",
        class: "form-control input-sm"
      })
      .keyup(function(a) {
        console.log($(this).val());
        $("#fancy-image").attr("src", $(this).val());
      });

    var btn = $("<button>")
      .attr({
        class: "btn btn-default"
      })
      .text("Do stuff")
      .click(() => {
        var text = $("#custom-card-input").val();
        hub.server.selectCard(text);
      });

    $("#ControlPanel")
      .append(input)
      .append(btn);
  }
};

$(document).ready(() => {
  CustomPoker.initHtml();
});
