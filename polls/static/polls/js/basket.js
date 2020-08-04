window.onload = function() {

    var cookies = document.cookie.split(';');
    var orders = getOrders();


    haveOrders();

    function haveOrders() {
        if(!orders.length) {
            document.getElementsByClassName('no-order')[0].classList.remove("not-show");
        } else {
            document.getElementsByClassName('order')[0].classList.remove("not-show");
        }
    }

    function getOrders() {

        let orders = [];

        cookies.map(function(cookie) {

            if( cookie.includes('orders')) {
                let cookieStr = cookie.split('=');

                if(cookieStr[1] !== "") {
                    orders = JSON.parse(cookieStr[1]);
                }
            }
          });

          return orders
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
    
        if(!orders.length) {
            document.getElementsByClassName('order')[0].classList.add("not-show") ;
            document.getElementsByClassName('no-order')[0].classList.remove("not-show") ;
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

 
    initEventOrdersFunc();


};