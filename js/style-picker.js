---
---

jQuery('.style-picker div').click(function() {
  var target = $(this).attr('id');
  $(this).addClass('item_color').siblings().removeClass('item_color');
  $('#' + target).show().siblings('div').hide();
});



function increaseValue() {
  var value = parseInt(document.getElementById('number').value, 10);
  value = isNaN(value) ? 0 : value;
  value++;
  document.getElementById('number').value = value;
}

function decreaseValue() {
  var value = parseInt(document.getElementById('number').value, 10);
  value = isNaN(value) ? 0 : value;
  value < 1 ? value = 1 : '';
  value--;
  document.getElementById('number').value = value;
}


$('.minus').click(function(){
  quantityField = $(this).next();
  if (quantityField.val() != 0) {
     quantityField.val(parseInt(quantityField.val(), 10) - 1);
  }
});

$('.plus').click(function(){
  quantityField = $(this).prev();
  quantityField.val(parseInt(quantityField.val(), 10) + 1);
});



function increaseValue2(elem) {
	  var $input = $(elem).siblings("input.qty");
	  var newVal = parseInt($input.val(), 10) + 1;
	  $input.val(newVal);
	  updateCartItem($input.data("product"), newVal);
}

function decreaseValue2(elem) {
	  var $input = $(elem).siblings("input.qty");
	  var value = parseInt($input.val(), 10);
	  if (value > 1) {
		      var newVal = value - 1;
		      $input.val(newVal);
		      updateCartItem($input.data("product"), newVal);
		    }
}

// Auto-update when user types and changes quantity manually
$(document).on('change', 'input.number', function () {
  var $input = $(this);
  var newQty = parseInt($input.val(), 10);
  if (isNaN(newQty) || newQty < 1) {
    newQty = 1;
    $input.val(1);
  }

  var product = $input.data("product");
  updateCartItem(product, newQty);
});

function updateCartItem(productName, newQty) {
	  var cartStr = sessionStorage.getItem("Monsoon-{{ site.url }}-cart");
	  var cart = JSON.parse(cartStr);
	  var items = cart.items;

	  for (var i = 0; i < items.length; i++) {
		      if (items[i].product === productName) {
			            items[i].qty = newQty;
			            break;
			          }
		    }

	  
	  var updatedTotal = 0;
	  var totalQty = 0;
	  for (var j = 0; j < items.length; j++) {
		      updatedTotal += parseFloat(items[j].price) * parseInt(items[j].qty, 10);
		      totalQty += parseInt(items[j].qty, 10);
		    }

	  sessionStorage.setItem("Monsoon-{{ site.url }}-cart", JSON.stringify(cart));
	  sessionStorage.setItem("Monsoon-{{ site.url }}-total", updatedTotal.toFixed(2));
	  sessionStorage.setItem("Monsoon-{{ site.url }}-shipping-rates", "0"); 

	  
	  document.getElementById("stotal").innerHTML = "{{ site.currency_code }}" + " " + updatedTotal.toFixed(2);
}
