window.onload = function() {

    var cookies = document.cookie.split(';');
    var orders = getOrders();


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

    initEventClickBuy();
};