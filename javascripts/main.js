"use strict";

$(document).ready(function() {
  var contentEl = $("#dataDisplay");
  var choiceEl = $("#explosives");
  var categories = [];
  var types = [];
  var products = [];

  function getCategories(){
    return new Promise((resolve, reject)=>{
      $.ajax({
        url:"../categories.json"
      }).done(function(data){
        resolve(data);
      }).fail(function(xhr, status, error){
        reject(error);
      });
    });
  }

  function getTypes(resultOfFirstAjax){
    return new Promise((resolve, reject)=>{
      $.ajax({
        url:"../types.json"
      }).done(function(data2){
        categories = resultOfFirstAjax.categories;
        resolve(data2);
      }).fail(function(xhr2, status2, error2){
        reject(error2);
      });
    });
  }

  function getProducts(resultOfSecondAjax){
    return new Promise((resolve, reject)=>{
      $.ajax({
        url:"../products.json"
      }).done(function(data3){
        types = resultOfSecondAjax.types;
        resolve(data3);
      }).fail(function(xhr3, status3, error3){
        reject(error3);
      });
    });
  }

  $(choiceEl).change(()=>{
    getCategories().then(function(dataPass){
      return getTypes(dataPass);
    }).then(function(dataPass2){
      return getProducts(dataPass2);
    }).then(function(dataPass3){
      var productData = dataPass3.products[0];
      var productInDOM = "";
      var tableEmt =  document.getElementById('dataDisplay');
      for (let i = 0; i < categories.length; i++) {
        if (categories[i].name === $(choiceEl).val()){
          for (let j = 0; j < types.length; j++){
            if (categories[i].id == types[j].category) {
              for (let k in productData) {
                if(types[j].id === productData[k].type){
                  productInDOM += "<tr>";
                  productInDOM += `<td>${categories[i].name}</td>`;
                  productInDOM += `<td>${types[j].name}</td>`;
                  productInDOM += `<td>${types[j].description}</td>`;
                  productInDOM += `<td>${productData[k].name}</td>`;
                  productInDOM += `<td>${productData[k].description}</td>`;
                  productInDOM += "</tr>";
                }
              }
            }
          }
        }
      };
      tableEmt.innerHTML = productInDOM;
    });
  });
});
