window.onload = function() {
    function getCookie(name) {
        let matches = document.cookie.match(new RegExp(
          "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
      }
      
        paypal.Buttons(
        {
            // Set up the transaction
            createOrder: function(data, actions) {

                let totalPrice = getCookie("total");
                return actions.order.create({
                    purchase_units: [{
                        amount: {
                            currency_code: "USD",
                            value: '0.01'
                        },

                    }]
                });
            },

            // Finalize the transaction
            onApprove: function(data, actions) {
                return actions.order.capture().then(function(details) {
                    // Show a success message to the buyer
                    console.log(">>");
                    window.location.href ="http://127.0.0.1:8000/polls/success-payment/";                        
  
                });
        }
    }
    ).render('#paypal-button-container');

    function initEventShowOrders() {
        let showOrders = document.getElementsByClassName('checkout-orders__show-wrapper')[0];
        
        showOrders.addEventListener('click', showOrdersClick, false);

        var rotate = 0;
        var clicked = true;
        
        
        function showOrdersClick() {  
            rotate += 180;
            let rotateString = 'rotate('+rotate+'deg)';
            this.getElementsByClassName('checkout-orders__show')[0].style.transform = rotateString;
            let orders = document.getElementsByClassName("checkout-orders")[0];
            
            if(clicked) {
                orders.style.display = 'block'
            } else {
                orders.style.display = 'none'
            }

            clicked = !clicked;
        }
    }

    initEventShowOrders();
};