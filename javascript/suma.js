// ************************************************
// Shopping Wishlist API
// ************************************************

var shoppingWishlist = (function () {
    // =============================
    // Private methods and propeties
    // =============================
    wishlist = [];
  
    // Constructor
    function Item(name, price, count) {
      // this.imagesrc = imagesrc;
      this.name = name;
      this.price = price;
      this.count = count;
    }
  
    // Save wishlist
    function saveWishlist() {
      sessionStorage.setItem('shoppingWishlist', JSON.stringify(wishlist));
    }
  
    // Load wishlist
    function loadWishlist() {
      wishlist = JSON.parse(sessionStorage.getItem('shoppingWishlist'));
    }
    if (sessionStorage.getItem("shoppingWishlist") != null) {
      loadWishlist();
    }
  
  
    // =============================
    // Public methods and propeties
    // =============================
    var obj = {};
  
    // Add to wishlist
    obj.addItemToWishlist = function (name, price, count) {
      for (var item in wishlist) {
        if (wishlist[item].name === name) {
          wishlist[item].count++;
          saveWishlist();
          return;
        }
      }
      var item = new Item(name, price, count);
      wishlist.push(item);
      saveWishlist();
    }
    // Set count from item
    obj.setCountForItem = function (name, count) {
      for (var i in wishlist) {
        if (wishlist[i].name === name) {
          wishlist[i].count = count;
          break;
        }
      }
    };
    // Remove item from wishlist
    obj.removeItemFromWishlist = function (name) {
      for (var item in wishlist) {
        if (wishlist[item].name === name) {
          wishlist[item].count--;
          if (wishlist[item].count === 0) {
            wishlist.splice(item, 1);
          }
          break;
        }
      }
      saveWishlist();
    }
  
    // Remove all items from wishlist
    obj.removeItemFromWishlistAll = function (name) {
      for (var item in wishlist) {
        if (wishlist[item].name === name) {
          wishlist.splice(item, 1);
          break;
        }
      }
      saveWishlist();
    }
  
    // Clear wishlist
    obj.clearWishlist = function () {
      wishlist = [];
      saveWishlist();
    }
  
    // Count wishlist 
    obj.addCount = function () {
      var addCount = 0;
      for (var item in wishlist) {
        addCount += wishlist[item].count;
      }
      return addCount;
    }
    // Total wishlist
    obj.totalWishlist = function () {
      var totalWishlist = 0;
      for (var item in wishlist) {
        totalWishlist += wishlist[item].price * wishlist[item].count * 60/100 ;
      }
      return Number(totalWishlist.toFixed(2));
    }
  
    obj.totalPrice = function () {
      var totalPrice = 0;
      for (var item in wishlist) {
        totalPrice += wishlist[item].price * wishlist[item].count;
      }
      return Number(totalPrice.toFixed(2));
    }
  
    obj.bagDiscount = function () {
      var bagDiscount = 0;
      for (var item in wishlist) {
        // this.totalWishlist += wishlist[item].price * wishlist[item].count * 60/100 ;
        // this.totalPrice += wishlist[item].price * wishlist[item].count;
        bagDiscount += wishlist[item].price * wishlist[item].count - wishlist[item].price * wishlist[item].count * 60/100 ;
      }
      return Number(bagDiscount.toFixed(2));
    }
  
    // obj.bagwishlist = function (){
    //   var bagwishlist = 0;
    //   for (var item in wishlist) {
    //     bagwishlist = wishlist[item].price * wishlist[item].count-wishlist[item].price * wishlist[item].count * 60/100 ;
    //   }
    //   return Number(bagwishlist.toFixed(2));
    // }
  
    // List wishlist
    obj.listWishlist = function () {
      var wishlistCopy = [];
      for (i in wishlist) {
        item = wishlist[i];
        itemCopy = {};
        for (p in item) {
          itemCopy[p] = item[p];
  
        }
        itemCopy.total = Number(item.price * item.count).toFixed(2);
        wishlistCopy.push(itemCopy)
      }
      return wishlistCopy;
    }
  
    // wishlist : Array
    // Item : Object/Class
    // addItemToWishlist : Function
    // removeItemFromWishlist : Function
    // removeItemFromWishlistAll : Function
    // clearWishlist : Function
    // countWishlist : Function
    // totalWishlist : Function
    // listWishlist : Function
    // saveWishlist : Function
    // loadWishlist : Function
    return obj;
  })();
  
  
  // *****************************************
  // Triggers / Events
  // ***************************************** 
  // Add item
  $('.add-to-wishlist').click(function (event) {
    event.preventDefault();
    // $(document).on("click", ".product-img", function (){
    // var src = $(this).attr('id');});
    // var imagesrc = $(this).data('imagesrc');
    var name = $(this).data('name');
    var price = Number($(this).data('price'));
    shoppingWishlist.addItemToWishlist(name, price, 1);
    displayWishlist();
  });
  
  // Clear items
  $('.clear-wishlist').click(function () {
    shoppingWishlist.clearWishlist();
    displayWishlist();
  });
  
  
  function displayWishlist() {
    var wishlistArray = shoppingWishlist.listWishlist();
    var output = "";  
    for (var i in wishlistArray) {
  //     output += "<tr>"
  //     + "<td>" + wishlistArray[i].name + "</td>" 
  //     + "<td>(" + wishlistArray[i].price + ")</td>"
  //     + "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-name=" + wishlistArray[i].name + ">-</button>"
  //     + "<input type='number' class='item-count form-control' data-name='" + wishlistArray[i].name + "' value='" + wishlistArray[i].count + "'>"
  //     + "<button class='plus-item btn btn-primary input-group-addon' data-name=" + wishlistArray[i].name + ">+</button></div></td>"
  //     + "<td><button class='delete-item btn btn-danger' data-name=" + wishlistArray[i].name + ">X</button></td>"
  //     + " = " 
  //     + "<td>" + wishlistArray[i].total + "</td>" 
  //     +  "</tr>";
  // }
      output += '<div class="row">' +
        '<div class="col-xl-10 col-lg-12 col-md-12">' +
        '<div class="space">' +
         '<div class="row vl">' +
        '<div class="col-xl-4 col-lg-5 col-md-3 col-5">' +
        '<img class="image" src="images/product' + [i] + '.png" width=60px>' +
        '</div>' +
        '<div class="col-xl-4 col-lg-4 col-md-10 col-10">' +
        '<ul>' +
        '<li class="font0">' + wishlistArray[i].name + '</li>' +
        '    <li class="font1">Rs' + wishlistArray[i].price + '</li>' +
        '    <li class="font2">sold By: Macmerise celfie Design Private Limited</li>' +
        ' </ul>' +
        ' <ul class="row">' +
        '    <li class="col">' +
        '      <div class="dropdown justify-content-start">' +
        '         <div class="input-group" id="button_color"><button class="minus-item input-group-addon btn btn-primary"  data-name=' + wishlistArray[i].name + '>-</button><input type="number" class="item-count form-control"  data-name=' + wishlistArray[i].name + ' value=' + wishlistArray[i].count + '><button class="plus-item btn btn-primary input-group-addon" data-name=' + wishlistArray[i].name + '>+</button></div>' +
        '  </div>' +
        '    </li>' +
        // '  <li class="col">'
  
        // +
        // '     <div class="dropdown justify-content-end">' +
        // ' <button class="dropbtn" onclick="myFunction()">QTY:1' +
        // '  <i class="fa fa-caret-down"></i>' +
        // '</button>' +
        // '  <div class="dropdown-content" id="myDropdown">' +
        // ' <a href="#">Link 1</a>' +
        // ' <a href="#">Link 2</a>' +
        // '  <a href="#">Link 3</a>' +
        // '</div>' +
        // '</div>' +
        // ' </li>' +
        '</ul>' +
        '</div>' +
        '  <div class=" col-xl-4 col-lg-3 col-md-10 col-10">' +
        '  <div class="price">' +
        '   <ul>' +
        // '= ' +
        '       <li class="font0">Rs' + wishlistArray[i].total*60/100 + '</li>' +
        '      <li class="discount">Rs' + wishlistArray[i].price + '</li>' +
        '      <li class="font3">(60% off)</li>' +
        '     <li> Delivery in 4 -6 days</li>' +
        // '   <button class="delete-item btn btn-danger" data-name=' + wishlistArray[i].name + '>Remove </button> | Wishlist' +
        '   </ul>' +
        '  </div>' +
        '  </div>' +
        ' </div>' +
        '   <div class="row center" id="button_color">' +
        '   <button class="delete-item btn btn-danger" data-name=' + wishlistArray[i].name + '>Remove from wishlist </button> ' +
        '   <div class="hr_line"></div> '+
        // '   <button class="btn btn-danger add-to-wishlist">Add to Wishlist </button> ' +
        // '<button class="btn btn-primary input-group-addon add-to-wishlist" data-name=' + wishlistArray[i].name + '>Add To Wishlist</button> '+
        '   </div>'
  
        +
        '  </div>' +
        // '= ' +
        // ' <div>' + wishlistArray[i].total + '</div>' +
        '  </div>' +
   
        // '<div class="col-xl-3 col-lg-4 col-md-5 br down">' +
        //         '  <h6>COUPONS</h6>' +
        //         '  <ul class="coupons">' +
        //          '     <li><img src="images/Group 2573.png" alt=""></li>' +
        //            '   <li class="apply_coupons">Apply Coupons</li>' +
        //              ' <li class="color"><button class="btn warning ">Apply</button></li>' +
        //        '  </ul>' +
        //         '  <hr>' +
        //         '  <h5>Price Details</h5>' +
        //         '  <div class="row">' +
        //          '     <div class=" col-xl-5 col-lg-5 col-md-6 col-6 font_details">' +
        //          '    <div>Price Details</div>' +
        //          '    <div>Bag Discount</div>' +
        //          '    <div>Coupon Discount</div>' +
        //          '    <div>Order Total</div>' +
        //          '    <div>Delivery Charges</div>' +
        //          '    <div><b>Total</b></div>' +
        //          '       </div>' +
        //          '   <div class="col-xl-5 col-lg-5 col-md-6 col-6">' +
        //          '       <div class="font_details">Rs<span class="total-wishlist"></span></div>' +
        //          '         <div class="green">Rs<span class="total-wishlist*40/100"></span></div>' +
        //          '         <div class="orange">Apply Coupon</div>' +
        //          '         <div class="font_details">Rs<span class="total-wishlist"></span></div>' +
        //          '        <span class="underline">Rs 99</span>' +
        //          '        <span class="free">Free</span>' +
        //          '        <div class="font_details"><b>Rs<span class="total-wishlist"></span></b></div>' +
        //          '     </div>' +
        //          ' </div>' +
        //          ' <div><button type="button" class="button00">PLACE ORDER</button></div>' +
        //          ' </div> ' +
                 ' </div>';
                //  document.querySelector('#wishlist').innerHTML += htmlToReturn
    }
    $('.show-wishlist').html(output);
    $('.total-wishlist').html(shoppingWishlist.totalWishlist());
    $('.addcount').html(shoppingWishlist.addCount());
    $('.sixty').html(shoppingWishlist.totalPrice());
    $('.bag').html(shoppingWishlist.bagDiscount());
  }
//   htmlToReturn = '<div class="col-xl-6 col-lg-6 col-md-12 col-11 br">' +
//     '  <h6>COUPONS</h6>' +
//     '  <ul class="coupons">' +
//      '     <li><img src="images/Group 2573.png" alt=""></li>' +
//        '   <li class="apply_coupons">Apply Coupons</li>' +
//          ' <li class="color"><button class="btn warning ">Apply</button></li>' +
//    '  </ul>' +
//     '  <hr>' +
//     '  <h5>Price Details</h5>' +
//     '  <div class="row">' +
//      '     <div class=" col-xl-5 col-lg-5 col-md-6 col-7 font_details">' +
//      '    <div>Price Details</div>' +
//      '    <div>Bag Discount</div>' +
//      '    <div>Coupon Discount</div>' +
//      '    <div>Order Total</div>' +
//      '    <div>Delivery Charges</div>' +
//      '    <div><b>Total</b></div>' +
//      '       </div>' +
//      '   <div class="col-xl-5 col-lg-5 col-md-6 col-5">' +
//      '       <div class="font_details">Rs<span class="sixty"></span></div>' +
//      '         <div class="green">Rs<span class="bag"></span></div>' +
//      '         <div class="orange">Apply Coupon</div>' +
//      '         <div class="font_details">Rs<span class="total-wishlist"></span></div>' +
//      '        <span class="underline">Rs 99</span>' +
//      '        <span class="free">Free</span>' +
//      '        <div class="font_details"><b>Rs<span class="total-wishlist"></span></b></div>' +
//      '     </div>' +
//      ' </div>' +
//      ' <div><button type="button" class="button00">PLACE ORDER</button></div>' +
//      ' </div> ' ;
//      document.querySelector('#coupon').innerHTML += htmlToReturn;
  
  //   function displayWishlist() {
  //     var wishlistArray = shoppingWishlist.listWishlist();
  //     var output = "";
  //     for (var i in wishlistArray) {
  //       output +='<div>'+
  //   '<div class="col-xl-3 col-lg-4 col-md-5 br down">' +
  //               '  <h6>COUPONS</h6>' +
  //               '  <ul class="coupons">' +
  //                '     <li><img src="images/Group 2573.png" alt=""></li>' +
  //                  '   <li class="apply_coupons">Apply Coupons</li>' +
  //                    ' <li class="color"><button class="btn warning ">Apply</button></li>' +
  //              '  </ul>' +
  //               '  <hr>' +
  //               '  <h5>Price Details</h5>' +
  //               '  <div class="row">' +
  //                '     <div class=" col-xl-5 col-lg-5 col-md-6 col-6 font_details">' +
  //                '    <div>Price Details</div>' +
  //                '    <div>Bag Discount</div>' +
  //                '    <div>Coupon Discount</div>' +
  //                '    <div>Order Total</div>' +
  //                '    <div>Delivery Charges</div>' +
  //                '    <div><b>Total</b></div>' +
  //                '       </div>' +
  //                '   <div class="col-xl-5 col-lg-5 col-md-6 col-6">' +
  //                '       <div class="font_details">Rs' + wishlistArray[i].total + '</div>' +
  //                '         <div class="green">Rs' + wishlistArray[i].total*40/100 + '</div>' +
  //                '         <div class="orange">Apply Coupon</div>' +
  //                '         <div class="font_details">' + wishlistArray[i].total*60/100 + '</div>' +
  //                '        <span class="underline">Rs 99</span>' +
  //                '        <span class="free">Free</span>' +
  //                '        <div class="font_details"><b>Rs' + wishlistArray[i].total*60/100 + '</b></div>' +
  //                '     </div>' +
  //                ' </div>' +
  //                ' <div><button type="button" class="button00">PLACE ORDER</button></div>' +
  //                ' </div> ' +
  //                ' </div>'+
  //                '</div>' ;
  // }
  // $('.show-wishlist').html(output);
  // $('.total-wishlist').html(shoppingWishlist.totalWishlist());
  // $('.addcount').html(shoppingWishlist.addCount());
  // }
  // Delete item button
  
  $('.show-wishlist').on("click", ".delete-item", function (event) {
    var name = $(this).data('name')
    shoppingWishlist.removeItemFromWishlistAll(name);
    displayWishlist();
  })
  
  
  // -1
  $('.show-wishlist').on("click", ".minus-item", function (event) {
    var name = $(this).data('name')
    shoppingWishlist.removeItemFromWishlist(name);
    displayWishlist();
  })
  // +1
  $('.show-wishlist').on("click", ".plus-item", function (event) {
    var name = $(this).data('name')
    shoppingWishlist.addItemToWishlist(name);
    displayWishlist();
  })
  
  // Item count input
  $('.show-wishlist').on("change", ".item-count", function (event) {
    var name = $(this).data('name');
    var count = Number($(this).val());
    shoppingWishlist.setCountForItem(name, count);
    displayWishlist();
  });
  
  displayWishlist();




 