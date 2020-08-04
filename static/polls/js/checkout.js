window.onload = function() {

    // paypal.Buttons(
    //     {
    //         // Set up the transaction
    //         createOrder: function(data, actions) {
    //             return actions.order.create({
    //                 purchase_units: [{
    //                     amount: {
    //                         value: '0.01'
    //                     }
    //                 }]
    //             });
    //         },

    //         // Finalize the transaction
    //         onApprove: function(data, actions) {
    //             return actions.order.capture().then(function(details) {
    //                 // Show a success message to the buyer
    //                 alert('Transaction completed by ' + details.payer.name.given_name + '!');
    //             });
    //     }
    // }
    // ).render('#paypal-button-container');


    function getCookie(name) {
        if (!document.cookie) {
          return null;
        }
      
        const xsrfCookies = document.cookie.split(';')
          .map(c => c.trim())
          .filter(c => c.startsWith(name + '='));
      
        if (xsrfCookies.length === 0) {
          return null;
        }
        return decodeURIComponent(xsrfCookies[0].split('=')[1]);
      }

    function stripePaymentLogic() {
        var stripe = Stripe('pk_test_51Gw57jLyy6GC0n4PXH5v5omqcOHTHhXilrAyVAcmAZlI6hsflAjsOvnL2s1fW8PulKSJ0jnqIu1Q8tylacYdYdHK005WS5OEFc');
        var elements = stripe.elements();
    
        var style = {
            base: {
              color: "#32325d",
            }
          };
          
        var card = elements.create("card", { style: style });
        card.mount("#card-element");
        
        var form = document.forms['checkout'];
        console.log(document.forms);
        console.log(form['csrfmiddlewaretoken'].value);
        form.addEventListener('submit', function(ev) {
          ev.preventDefault();
          console.log(ev);  
          console.log(this);
          console.log(new FormData(this));
          let formData = new FormData(this)
          console.log(formData.values());
          for (var value of formData.values()) {
            console.log(value); 
         }
          
          console.log(form);

          console.log(ev.submitter['name']);
          console.log("?????");

          fetch('/polls/checkout/', {
          method: 'POST', // or 'PUT'
          mode: "cors",
          cache: "no-cache", 
          credentials: "same-origin",
          headers: {
            'X-CSRFToken': form['csrfmiddlewaretoken'].value,
            'Content-Type': 'application/json',
          },
          body: form,
          })
          .then(response => response.json())
          .then(data => {
            console.log('Success:', data);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
          
          switch (ev.submitter['name']) {
            case "PayPal":
              
              break;

            case "Card":

              break;
          
            default:
              break;
          }


          // console.log(this.getAttribute('data-secret'));
          // console.log(document.forms['checkout']['email'].value);
          // console.log(document.forms['checkout']['firstName'].value);
          // console.log(document.forms['checkout']);
          // console.log("??????");
          // // stripe.confirmCardPayment(this.getAttribute('data-secret'), {
          //   payment_method: {
          //     card: card,
          //     billing_details: {
          //       name: document.forms['checkout']['firstName'].value+
          //       " "+
          //       document.forms['checkout']['lastName'].value,
          //       email: document.forms['checkout']['email'].value
          //     }
          //   }
          // }).then(function(result) {
          //   if (result.error) {
          //     // Show error to your customer (e.g., insufficient funds)
          //     console.log(result.error.message);
          //   } else {
          //     // The payment has been processed!
          //     if (result.paymentIntent.status === 'succeeded') {
          //       // Show a success message to your customer
          //       // There's a risk of the customer closing the window before callback
          //       // execution. Set up a webhook or plugin to listen for the
          //       // payment_intent.succeeded event that handles any business critical
          //       // post-payment actions.
          //     }
          //   }
          // });
        });
        
    }
    
    function initEventDeliveryChange() {
        const deliveryType = document.getElementById('id_deliveryType');
        const radioButtons = document.forms['checkout']['deliveryType'];
        const inputAddress = document.forms['checkout']['address'];
        const inputDelivery = document.forms['checkout']['delivery'];
        const deliveryTypesWrapper = deliveryType.querySelectorAll(".checkout-form__input-wrapper")
        const addressWrapper = deliveryTypesWrapper[0];
        const deliveryWrapper = deliveryTypesWrapper[1];

        deliveryType.addEventListener('change',radioButtonChange,false);        

        function radioButtonChange() { 
            for(let i =0; i< radioButtons.length;i++) {
                if(radioButtons[i].checked === true) {
                    inputAddress.removeAttribute("required");
                    addressWrapper.style.display = "none";
                    deliveryWrapper.style.display = 'flex';
                    inputDelivery.setAttribute("required","");
                    
                } else {
                    deliveryWrapper.style.display = "none";
                    inputAddress.setAttribute("required","");
                    addressWrapper.style.display = 'flex';
                    inputDelivery.removeAttribute("required");
                }
            }
        }
    }

    // function initEventPaymentChange() {
    //     const paymentType = document.getElementById('id_paymentType');
    //     const radioButtons = document.forms['checkout']['paymentType'];
    //     const paymentTypesWrapper = paymentType.querySelectorAll(".checkout-form__input-wrapper")
    //     const paypalWrapper = paymentTypesWrapper[0];
    //     const cardWrapper = paymentTypesWrapper[1];

    //     paymentType.addEventListener('change',radioButtonChange,false);        

    //     function radioButtonChange() { 
    //         for(let i =0; i< radioButtons.length;i++) {
    //             if(radioButtons[i].checked === true) {
    //                 paypalWrapper.style.display = "none";
    //                 cardWrapper.style.display = 'flex';
    //             } else {
    //                 cardWrapper.style.display = "none";
    //                 paypalWrapper.style.display = 'flex';
    //             }
    //         }
    //     }
    // }

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

    // initEventPaymentChange();    
    initEventShowOrders();
    initEventDeliveryChange();
    // stripePaymentLogic();
};