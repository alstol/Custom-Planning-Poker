// ==UserScript==
// @name            Custom Planning Poker
// @description     Because sending just cards is boring!
// @author          Alin Stefan Olaru
// @match           http://onlineplanningpoker.azurewebsites.net/*
// @grant           none
// @downloadURL     https://alinstefanola.ru/Custom-Planning-Poker/planningpoker.user.js
// @updateURL       https://alinstefanola.ru/Custom-Planning-Poker/planningpoker.user.js
// @version         0.03
// @run-at          document-end
// ==/UserScript==

var CustomPoker = {
  getRandomImg: keyword => {
    $.get(
      `http://api.giphy.com/v1/gifs/search?api_key=VEPCxEQD0VbuDuJ2eZZwXW6ztR6VdxWr&q=${keyword}&limit=10`,
      res => {
        for(var i = 0; i < 10; i++) {
          $(`#fancy-image-${i}`).attr('src', res.data[i].images.original.url);
          $(`#fancy-image-${i}`).click(() => {
            $("#custom-card-input").val(res.data[i].images.original.url);
          })
        }
      }
    );
  },
  initPreviewCard: () => {
    for(var i = 0; i < 10; i++) {
      var cardImage = $("<img>").attr({
        id: `fancy-image-${i}`,
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

    }
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
    var btnTwo = $("<button>").attr({
      'class': "btn-btn-default"
    }).text("Lookup on Giphy").click(() => {
      var text = $("#custom-card-input").val();

      CustomPoker.getRandomImg(text);
    })
    $('#ControlPanel').append(btnTwo);
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
