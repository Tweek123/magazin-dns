window.onload = function() {

    var cookies = document.cookie.split(';');
    var orders = getOrders();


    function getOrders() {

        let orders = [];

        cookies.map(function(cookie) {

            if( cookie.includes('orders')) {
                let cookieStr = cookie.split('=');

                console.log(cookieStr);
                if(cookieStr[1] !== "") {
                    orders = JSON.parse(cookieStr[1]);
                }
            }
          });

          return orders
    }


    function addOrder() {

        let product = {};

        product.id = parseInt(this.id);
        product.count = 1;

        orders.push(product);
        ordersJSON = JSON.stringify(orders);

        this.parentElement.getElementsByTagName("a")[0].classList.add('show');
        this.classList.remove('show');

        document.cookie = 'orders='+ordersJSON+';'+'path=/polls;';
      }

    function incrOrder() {
        
        orders.forEach(order => {
                if(order.id === parseInt(this.id)) {
                    order.count++;   

                    let count = this.closest(".product-order__wrapper")
                    .getElementsByClassName('product-order__func-count-value')[0]
                    .textContent;

                    let price = this.closest(".product-order__wrapper")
                    .getElementsByClassName('product__price-text')[0]
                    .textContent;

                    let priceOne = price/count;

                    price = +price + priceOne;

                    document.getElementsByClassName('product-result__total-value')[0].textContent = 
                    +document.getElementsByClassName('product-result__total-value')[0].textContent 
                    + priceOne;

                    this.closest(".product-order__wrapper")
                    .getElementsByClassName('product__price-text')[0]
                    .textContent = price;

                    this.closest(".product-order__wrapper")
                    .getElementsByClassName('product-order__func-count-value')[0]
                    .textContent = order.count;
                }            
        });

        
        ordersJSON = JSON.stringify(orders);
        
        document.cookie = 'orders='+ordersJSON+';'+'path=/polls;';

        console.log(orders);
        console.log(document.cookie);
      }


      function decrOrder() {

        orders.forEach(order => {
                if(order.id=== parseInt(this.id)) {
                    if(order.count>1) {
                        order.count--;

                        let count = this.closest(".product-order__wrapper")
                        .getElementsByClassName('product-order__func-count-value')[0]
                        .textContent;

                        let price = this.closest(".product-order__wrapper")
                        .getElementsByClassName('product__price-text')[0]
                        .textContent;

                        let priceOne = price/count;

                        price = +price - priceOne;

                        document.getElementsByClassName('product-result__total-value')[0].textContent = 
                        +document.getElementsByClassName('product-result__total-value')[0].textContent 
                        -priceOne;

                        this.closest(".product-order__wrapper")
                        .getElementsByClassName('product__price-text')[0]
                        .textContent = price;

                        this.closest(".product-order__wrapper")
                        .getElementsByClassName('product-order__func-count-value')[0]
                        .textContent = order.count;
                        
                    }   
                }            
        });

        ordersJSON = JSON.stringify(orders);
        
        document.cookie = 'orders='+ordersJSON+';'+'path=/polls;';
      }

      function delOrder() {
        
        orders.forEach((order,i) => {
                if(order.id=== parseInt(this.id)) {
                    orders.splice(i, 1);
                    this.closest(".product-order__wrapper").style.display = "none";
                }            
        });
    
        document.getElementsByClassName('product-result__total-value')[0].textContent = 
        +document.getElementsByClassName('product-result__total-value')[0].textContent - 
        this.closest('.product-order__wrapper').getElementsByClassName('product__price-text')[0].textContent;
        
        ordersJSON = JSON.stringify(orders);
        
        document.cookie = 'orders='+ordersJSON+';'+'path=/polls;';
      }

    function initEventClickBuy() {
        
        let buttonsAddOrder = [];

        buttonsAddOrder.push(document.getElementsByClassName('product-best__button-buy')); 
        buttonsAddOrder.push(document.getElementsByClassName('product__button-buy'));
        buttonsAddOrder.push(document.getElementsByClassName('product-block__button-buy'));
    
        for(let i = 0; i<buttonsAddOrder.length;i++) {
    
            for(let j=0; j<buttonsAddOrder[i].length; j++) {
                let inOrder = false;
                orders.forEach(order => {
                    if(order.id === parseInt(buttonsAddOrder[i][j].id)) {
                        inOrder = true;
                    }
                });
    
                if(inOrder) {
                    buttonsAddOrder[i][j].classList.remove('show');
                    buttonsAddOrder[i][j].parentElement.getElementsByTagName("a")[0].classList.add('show');
                } else {
    
                    buttonsAddOrder[i][j].classList.add('show');
                    buttonsAddOrder[i][j].parentElement.getElementsByTagName("a")[0].classList.remove('show');
                    buttonsAddOrder[i][j].addEventListener('click', addOrder, false);
                }
    
                if(orders.length===0) {
    
                    buttonsAddOrder[i][j].addEventListener('click', addOrder, false);
                    buttonsAddOrder[i][j].classList.add('show');
                    buttonsAddOrder[i][j].parentElement.getElementsByTagName("a")[0].classList.remove('show');
                }
            }
        }
    }

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

    function initEventOrdersFunc() {  
        
        let buttonsIncrCount = document.getElementsByClassName('product-order__incr');
        let buttonsDecrCount = document.getElementsByClassName('product-order__decr');
        let buttonsDel = document.getElementsByClassName('product-order__del');

        for(let i = 0; i<buttonsIncrCount.length;i++) {
            buttonsIncrCount[i].addEventListener('click', incrOrder, false);
            buttonsDecrCount[i].addEventListener('click', decrOrder, false);
            buttonsDel[i].addEventListener('click', delOrder, false);
        }
    }

    function initEventDeliveryChange() {

        let deliveryType = document.getElementById('id_deliveryType');

        deliveryType.addEventListener('change',radioButtonChange,false);


        function radioButtonChange() { 
            let radioButtons = this.getElementsByTagName('input');
    
            for(let i =0; i< radioButtons.length;i++) {
                if(radioButtons[i].checked === true) {
                    let delivery = document.querySelectorAll("select[name='delivery']")[0];
                    let  address = document.querySelectorAll("input[name='address']")[0];
                    address.style.display = "none";
                    delivery.style.display = 'block';
                    delivery.setAttribute("required","");
                    address.removeAttribute("required");
                } else {
                    let delivery = document.querySelectorAll("select[name='delivery']")[0];
                    let address = document.querySelectorAll("input[name='address']")[0];
                    address.style.display = "block";
                    delivery.style.display = 'none';
                    address.setAttribute("required","");
                    delivery.removeAttribute("required");
                    
                }
            }
        }
    }
 






    initEventClickBuy();
    initEventOrdersFunc();
    initEventShowOrders();
    initEventDeliveryChange();

};