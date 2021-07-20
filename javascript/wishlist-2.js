// ************************************************
// Shopping Cart API
// ************************************************

var shoppingCart = (function () {
    // =============================
    // Private methods and propeties
    // =============================
    cart = [];
  
    // Constructor
    function Item(name, price, count) {
      // this.imagesrc = imagesrc;
      this.name = name;
      this.price = price;
      this.count = count;
    }
  
    // Save cart
    function saveCart() {
      sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
    }
  
    // Load cart
    function loadCart() {
      cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
    }
    if (sessionStorage.getItem("shoppingCart") != null) {
      loadCart();
    }
  
  
    // =============================
    // Public methods and propeties
    // =============================
    var obj = {};
  
    // Add to cart
    obj.addItemToCart = function (name, price, count) {
      for (var item in cart) {
        if (cart[item].name === name) {
          cart[item].count++;
          saveCart();
          return;
        }
      }
      var item = new Item(name, price, count);
      cart.push(item);
      saveCart();
    }
    // Set count from item
    obj.setCountForItem = function (name, count) {
      for (var i in cart) {
        if (cart[i].name === name) {
          cart[i].count = count;
          break;
        }
      }
    };
    // Remove item from cart
    obj.removeItemFromCart = function (name) {
      for (var item in cart) {
        if (cart[item].name === name) {
          cart[item].count--;
          if (cart[item].count === 0) {
            cart.splice(item, 1);
          }
          break;
        }
      }
      saveCart();
    }
  
    // Remove all items from cart
    obj.removeItemFromCartAll = function (name) {
      for (var item in cart) {
        if (cart[item].name === name) {
          cart.splice(item, 1);
          break;
        }
      }
      saveCart();
    }
  
    // Clear cart
    obj.clearCart = function () {
      cart = [];
      saveCart();
    }
  
    // Count cart 
    obj.totalCount = function () {
      var totalCount = 0;
      for (var item in cart) {
        totalCount += cart[item].count;
      }
      return totalCount;
    }
    // Total cart
    obj.totalCart = function () {
      var totalCart = 0;
      for (var item in cart) {
        totalCart += cart[item].price * cart[item].count * 60/100 ;
      }
      return Number(totalCart.toFixed(2));
    }
  
    obj.totalPrice = function () {
      var totalPrice = 0;
      for (var item in cart) {
        totalPrice += cart[item].price * cart[item].count;
      }
      return Number(totalPrice.toFixed(2));
    }
  
    obj.bagDiscount = function () {
      var bagDiscount = 0;
      for (var item in cart) {
        // this.totalCart += cart[item].price * cart[item].count * 60/100 ;
        // this.totalPrice += cart[item].price * cart[item].count;
        bagDiscount += cart[item].price * cart[item].count - cart[item].price * cart[item].count * 60/100 ;
      }
      return Number(bagDiscount.toFixed(2));
    }
  
    // obj.bagcart = function (){
    //   var bagcart = 0;
    //   for (var item in cart) {
    //     bagcart = cart[item].price * cart[item].count-cart[item].price * cart[item].count * 60/100 ;
    //   }
    //   return Number(bagcart.toFixed(2));
    // }
  
    // List cart
    obj.listCart = function () {
      var cartCopy = [];
      for (i in cart) {
        item = cart[i];
        itemCopy = {};
        for (p in item) {
          itemCopy[p] = item[p];
  
        }
        itemCopy.total = Number(item.price * item.count).toFixed(2);
        cartCopy.push(itemCopy)
      }
      return cartCopy;
    }
  
    // cart : Array
    // Item : Object/Class
    // addItemToCart : Function
    // removeItemFromCart : Function
    // removeItemFromCartAll : Function
    // clearCart : Function
    // countCart : Function
    // totalCart : Function
    // listCart : Function
    // saveCart : Function
    // loadCart : Function
    return obj;
  })();
  
  
  // *****************************************
  // Triggers / Events
  // ***************************************** 
  // Add item
  $('.add-to-cart').click(function (event) {
    event.preventDefault();
    // $(document).on("click", ".product-img", function (){
    // var src = $(this).attr('id');});
    // var imagesrc = $(this).data('imagesrc');
    var name = $(this).data('name');
    var price = Number($(this).data('price'));
    shoppingCart.addItemToCart(name, price, 1);
    displayCart();
  });
  
  // Clear items
  $('.clear-cart').click(function () {
    shoppingCart.clearCart();
    displayCart();
  });
  
  
  function displayCart() {
    var cartArray = shoppingCart.listCart();
    var output = "";  
    for (var i in cartArray) {
  //     output += "<tr>"
  //     + "<td>" + cartArray[i].name + "</td>" 
  //     + "<td>(" + cartArray[i].price + ")</td>"
  //     + "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-name=" + cartArray[i].name + ">-</button>"
  //     + "<input type='number' class='item-count form-control' data-name='" + cartArray[i].name + "' value='" + cartArray[i].count + "'>"
  //     + "<button class='plus-item btn btn-primary input-group-addon' data-name=" + cartArray[i].name + ">+</button></div></td>"
  //     + "<td><button class='delete-item btn btn-danger' data-name=" + cartArray[i].name + ">X</button></td>"
  //     + " = " 
  //     + "<td>" + cartArray[i].total + "</td>" 
  //     +  "</tr>";
  // }
      output += '<div class="row" id="wishlist">' +
        '<div class="col-xl-10 col-lg-12 col-md-12">' +
        '<div class="space">' +
         '<div class="row vl">' +
        '<div class="col-xl-4 col-lg-5 col-md-3 col-5">' +
        '<img class="image" src="images/product' + [i] + '.png" width=60px>' +
        '</div>' +
        '<div class="col-xl-4 col-lg-4 col-md-10 col-10">' +
        '<ul>' +
        '<li class="font0">' + cartArray[i].name + '</li>' +
        '    <li class="font1">Rs' + cartArray[i].price + '</li>' +
        '    <li class="font2">sold By: Macmerise celfie Design Private Limited</li>' +
        ' </ul>' +
        ' <ul class="row">' +
        '    <li class="col">' +
        '      <div class="dropdown justify-content-start">' +
        '         <div class="input-group" id="button_color"><button class="minus-item input-group-addon btn btn-primary"  data-name=' + cartArray[i].name + '>-</button><input type="number" class="item-count form-control"  data-name=' + cartArray[i].name + ' value=' + cartArray[i].count + '><button class="plus-item btn btn-primary input-group-addon" data-name=' + cartArray[i].name + '>+</button></div>' +
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
        '       <li class="font0">Rs' + cartArray[i].total*60/100 + '</li>' +
        '      <li class="discount">Rs' + cartArray[i].price + '</li>' +
        '      <li class="font3">(60% off)</li>' +
        '     <li> Delivery in 4 -6 days</li>' +
        // '   <button class="delete-item btn btn-danger" data-name=' + cartArray[i].name + '>Remove </button> | Wishlist' +
        '   </ul>' +
        '  </div>' +
        '  </div>' +
        ' </div>' +
        '   <div class="row center" id="button_color">' +
        '   <button class="delete-item btn btn-danger" data-name=' + cartArray[i].name + '>Remove from wishlist </button> ' +
        '   <div class="hr_line"></div> '+
        // '   <button class="btn btn-danger add-to-cart">Add to Wishlist </button> ' +
        // '<button class="btn btn-primary input-group-addon add-to-cart" data-name=' + cartArray[i].name + '>Add To Wishlist</button> '+
        '   </div>'
  
        +
        '  </div>' +
        // '= ' +
        // ' <div>' + cartArray[i].total + '</div>' +
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
        //          '       <div class="font_details">Rs<span class="total-cart"></span></div>' +
        //          '         <div class="green">Rs<span class="total-cart*40/100"></span></div>' +
        //          '         <div class="orange">Apply Coupon</div>' +
        //          '         <div class="font_details">Rs<span class="total-cart"></span></div>' +
        //          '        <span class="underline">Rs 99</span>' +
        //          '        <span class="free">Free</span>' +
        //          '        <div class="font_details"><b>Rs<span class="total-cart"></span></b></div>' +
        //          '     </div>' +
        //          ' </div>' +
        //          ' <div><button type="button" class="button00">PLACE ORDER</button></div>' +
        //          ' </div> ' +
                 ' </div>';
                //  document.querySelector('#wishlist').innerHTML += htmlToReturn
    }
    $('.show-cart').html(output);
    $('.total-cart').html(shoppingCart.totalCart());
    $('.total-count').html(shoppingCart.totalCount());
    $('.sixty').html(shoppingCart.totalPrice());
    $('.bag').html(shoppingCart.bagDiscount());
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
//      '         <div class="font_details">Rs<span class="total-cart"></span></div>' +
//      '        <span class="underline">Rs 99</span>' +
//      '        <span class="free">Free</span>' +
//      '        <div class="font_details"><b>Rs<span class="total-cart"></span></b></div>' +
//      '     </div>' +
//      ' </div>' +
//      ' <div><button type="button" class="button00">PLACE ORDER</button></div>' +
//      ' </div> ' ;
//      document.querySelector('#coupon').innerHTML += htmlToReturn;
  
  //   function displayCart() {
  //     var cartArray = shoppingCart.listCart();
  //     var output = "";
  //     for (var i in cartArray) {
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
  //                '       <div class="font_details">Rs' + cartArray[i].total + '</div>' +
  //                '         <div class="green">Rs' + cartArray[i].total*40/100 + '</div>' +
  //                '         <div class="orange">Apply Coupon</div>' +
  //                '         <div class="font_details">' + cartArray[i].total*60/100 + '</div>' +
  //                '        <span class="underline">Rs 99</span>' +
  //                '        <span class="free">Free</span>' +
  //                '        <div class="font_details"><b>Rs' + cartArray[i].total*60/100 + '</b></div>' +
  //                '     </div>' +
  //                ' </div>' +
  //                ' <div><button type="button" class="button00">PLACE ORDER</button></div>' +
  //                ' </div> ' +
  //                ' </div>'+
  //                '</div>' ;
  // }
  // $('.show-cart').html(output);
  // $('.total-cart').html(shoppingCart.totalCart());
  // $('.total-count').html(shoppingCart.totalCount());
  // }
  // Delete item button
  
  $('.show-cart').on("click", ".delete-item", function (event) {
    var name = $(this).data('name')
    shoppingCart.removeItemFromCartAll(name);
    displayCart();
  })
  
  
  // -1
  $('.show-cart').on("click", ".minus-item", function (event) {
    var name = $(this).data('name')
    shoppingCart.removeItemFromCart(name);
    displayCart();
  })
  // +1
  $('.show-cart').on("click", ".plus-item", function (event) {
    var name = $(this).data('name')
    shoppingCart.addItemToCart(name);
    displayCart();
  })
  
  // Item count input
  $('.show-cart').on("change", ".item-count", function (event) {
    var name = $(this).data('name');
    var count = Number($(this).val());
    shoppingCart.setCountForItem(name, count);
    displayCart();
  });
  
  displayCart();




 