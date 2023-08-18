// ==UserScript==
// @name         OtoDomFilter
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Daniel Siedlecki
// @match        https://www.otodom.pl/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=otodom.pl
// @grant        none
// ==/UserScript==

(function () {
  function saveInputValue(value) {
    localStorage.setItem("maxPriceInput", value);
  }

  function loadInputValue() {
    const savedValue = localStorage.getItem("maxPriceInput");
    if (savedValue !== null) {
      document.getElementById("max-price-input").value = savedValue;
    }
  }
  function addWindow() {
    var smallScreenDiv = document.createElement("div");
    smallScreenDiv.id = "small-screen";
    smallScreenDiv.style.position = "fixed";
    smallScreenDiv.style.top = "50px";
    smallScreenDiv.style.right = "50px";
    smallScreenDiv.style.width = "250px";
    smallScreenDiv.style.height = "100px";
    smallScreenDiv.style.backgroundColor = "white";
    smallScreenDiv.style.border = "1px solid black";
    smallScreenDiv.style.display = "flex";
    smallScreenDiv.style.flexDirection = "column";
    smallScreenDiv.style.alignItems = "center";
    smallScreenDiv.style.justifyContent = "center";
    smallScreenDiv.style.zIndex = "9999";

    var text = document.createTextNode("OtoDomFilter");
    smallScreenDiv.appendChild(text);

    var inputField = document.createElement("input");

    inputField.type = "text";
    inputField.id = "max-price-input";
    inputField.placeholder = "Wprowadź maksymalną kwotę";
    smallScreenDiv.appendChild(inputField);

    var submitButton = document.createElement("button");
    submitButton.textContent = "Filtruj";
    submitButton.addEventListener("click", function () {
      console.log("filtruje");
      var maxPrice = parseFloat(
        document.getElementById("max-price-input").value
      );
      saveInputValue(maxPrice);
      FilterandDelete(maxPrice);
    });
    smallScreenDiv.appendChild(submitButton);

    document.body.appendChild(smallScreenDiv);
  }

  function countNumberAds() {
    const ulElement = document.querySelector(
      "#__next > div.css-1i02l4.egbyzpx3 > main > div.css-1g6j91e.egbyzpx1 > div.css-feokcq.egbyzpx4 > div.css-1a3bvzb.e11vu9400 > div.css-1ktfa37.e11vu9401 > div:nth-child(2) > ul"
    );

    if (ulElement) {
      const length = ulElement.childElementCount;
      console.log("Ilość ogłoszeń nie promowanych <ul>: " + length);
      return length;
    } else {
      console.log("Nie znaleziono ogłoszeń<ul>");
      return 0;
    }
  }

  function FilterAdPrices() {
    const x = countNumberAds();
    const headPrices = [];
    const rentPrices = [];

    for (var y = 1; y <= x; y++) {
      var headPriceElement = document.querySelector(
        `#__next > div.css-1i02l4.egbyzpx3 > main > div.css-1g6j91e.egbyzpx1 > div.css-feokcq.egbyzpx4 > div.css-1a3bvzb.e11vu9400 > div.css-1ktfa37.e11vu9401 > div:nth-child(2) > ul > li:nth-child(${y}) > a > article > div.ekqt8ur0.css-1tjkj49.ei6hyam0 > span:nth-child(1)`
      );

      if (headPriceElement) {
        const headPriceText = headPriceElement.textContent;
        const priceWithoutSuffix = headPriceText.replace(" zł/mc", "");
        const priceAsNumber = parseFloat(priceWithoutSuffix);
        headPrices.push(priceAsNumber);
      }
    }

    for (var z = 1; z <= x; z++) {
      var rentPriceElement = document.querySelector(
        `#__next > div.css-1i02l4.egbyzpx3 > main > div.css-1g6j91e.egbyzpx1 > div.css-feokcq.egbyzpx4 > div.css-1a3bvzb.e11vu9400 > div.css-1ktfa37.e11vu9401 > div:nth-child(2) > ul > li:nth-child(${z}) > a > article > div.ekqt8ur0.css-1tjkj49.ei6hyam0 > span.css-5qfobm.ei6hyam4`
      );

      if (rentPriceElement) {
        const rentPriceText = rentPriceElement.textContent;

        if (rentPriceText === "+ czynsz: poszukaj w opisie") {
          const rentPriceWithoutSuffix = "0";
          rentPrices.push(parseFloat(rentPriceWithoutSuffix));
        } else {
          const rentPriceWithoutSuffix = rentPriceText
            .replace("+ czynsz: ", "")
            .replace(" zł/miesiąc", "");
          const priceAsNumber = parseFloat(rentPriceWithoutSuffix);
          rentPrices.push(priceAsNumber);
        }
      }
    }

    return { headPrices, rentPrices };
  }

  function FilterAd() {
    const x = countNumberAds();
    const prices = FilterAdPrices();
    const headPricesAll = prices.headPrices;
    const rentPricesAll = prices.rentPrices;
    const sumPrices = [];

    for (var y = 0; y < x; y++) {
      const sumPrice = headPricesAll[y] + rentPricesAll[y];
      sumPrices.push(sumPrice);
    }

    return sumPrices;
  }

  function Filter(price) {
    const maxPrice = price;
    const allSumPrices = FilterAd();
    const divCount = [];

    for (var x = 0; x < allSumPrices.length; x++) {
      if (maxPrice < allSumPrices[x]) {
        const divToDelete = x;
        divCount.push(divToDelete);
      }
    }

    return divCount;
  }

  function FilterandDelete(maxprice) {
    let divToDelete = Filter(maxprice);

    while (divToDelete.length > 0) {
      const divToRemove = document.querySelector(
        `#__next > div.css-1i02l4.egbyzpx3 > main > div.css-1g6j91e.egbyzpx1 > div.css-feokcq.egbyzpx4 > div.css-1a3bvzb.e11vu9400 > div.css-1ktfa37.e11vu9401 > div:nth-child(2) > ul > li:nth-child(${
          divToDelete[0] + 1
        })`
      );
      if (divToRemove) {
        divToRemove.remove();
      }

      divToDelete = Filter(maxprice);
    }
  }

  addWindow();
  loadInputValue();
})();
