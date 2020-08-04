window.onload = function() {
    function addOrder() {
        let cookies = document.cookie.split(';');
        let orders = [];
        try {
         cookies.map(function(cookie) {
            if(cookie.includes('orders')) {
                orders = JSON.parse(cookie.split('=')[1]);
            }
          });
        } catch {}

        let product = {};
        product.id = parseInt(this.id);
        product.count = 1;
        orders.push(product);
        orders = JSON.stringify(orders);

        this.parentElement.getElementsByTagName("a")[0].classList.add('show');
        this.classList.remove('show');   
        document.cookie = 'orders='+orders+';'+'path=/polls;';
      }

    function incrOrder() {
        let cookies = document.cookie.split(';');
         
        let orders = [];
        try {
         cookies.map(function(cookie) {
            if(cookie.includes('orders')) {
                orders = JSON.parse(cookie.split('=')[1]);
            }
          });
        } catch {}



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

        
        orders = JSON.stringify(orders);
        
        document.cookie = 'orders='+orders+';'+'path=/polls;';
        console.log(orders);
        console.log(document.cookie);
      }


      this.setTimeout(() => {
          console.log(3)
      }, 2);
      console.log(4);

      for(let i=0;i<this.Math.pow(10,4);i++) {

      }


      console.log(10);


      function decrOrder() {
        let cookies = document.cookie.split(';');
         
        let orders = [];
        try {
         cookies.map(function(cookie) {
            if(cookie.includes('orders')) {
                orders = JSON.parse(cookie.split('=')[1]);
            }
          });
        } catch {}



        orders.forEach(order => {
                if(order.id=== parseInt(this.id)) {
                    console.log('asd');
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

    


        orders = JSON.stringify(orders);
        
        document.cookie = 'orders='+orders+';'+'path=/polls;';
        console.log(orders);
        console.log(document.cookie);
      }

      function delOrder() {
        let cookies = document.cookie.split(';');
         
        let orders = [];
        try {
         cookies.map(function(cookie) {
            if(cookie.includes('orders')) {
                orders = JSON.parse(cookie.split('=')[1]);
            }
          });
        } catch {}



        orders.forEach((order,i) => {
                if(order.id=== parseInt(this.id)) {
                    orders.splice(i, 1);
                    this.closest(".product-order__wrapper").style.display = "none";
                }            
        });
    
        document.getElementsByClassName('product-result__total-value')[0].textContent = 
        +document.getElementsByClassName('product-result__total-value')[0].textContent - 
        this.closest('.product-order__wrapper').getElementsByClassName('product__price-text')[0].textContent;
        orders = JSON.stringify(orders);
        
        document.cookie = 'orders='+orders+';'+'path=/polls;';
        console.log(orders);
        console.log(document.cookie);
      }


    let cookies = document.cookie.split(';');
    let orders = [];
 
    try {
    cookies.map(function(cookie) {
       if(cookie.includes('orders')) {
           orders = JSON.parse(cookie.split('=')[1]);
       }
     });
    } catch {}

    console.log('*');
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
                console.log('$$$$$');
                console.log(buttonsAddOrder[i][j]);
                buttonsAddOrder[i][j].classList.remove('show');
                buttonsAddOrder[i][j].parentElement.getElementsByTagName("a")[0].classList.add('show');
            } else {
                console.log(buttonsAddOrder[i][j]);
                buttonsAddOrder[i][j].classList.add('show');
                buttonsAddOrder[i][j].parentElement.getElementsByTagName("a")[0].classList.remove('show');
                buttonsAddOrder[i][j].addEventListener('click', addOrder, false);
            }

            if(orders.length===0) {

                console.log(buttonsAddOrder[i][j]);
                buttonsAddOrder[i][j].addEventListener('click', addOrder, false);
                buttonsAddOrder[i][j].classList.add('show');
                buttonsAddOrder[i][j].parentElement.getElementsByTagName("a")[0].classList.remove('show');
            }
        }
    }
    try {
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
    } catch {

    }

    let buttonsIncrCount = document.getElementsByClassName('product-order__incr');

    for(let i = 0; i<buttonsIncrCount.length;i++) {
        buttonsIncrCount[i].addEventListener('click', incrOrder, false);
    }


    let buttonsDecrCount = document.getElementsByClassName('product-order__decr');
    
    for(let i = 0; i<buttonsDecrCount.length;i++) {
        buttonsDecrCount[i].addEventListener('click', decrOrder, false);
    }

    let buttonsDel = document.getElementsByClassName('product-order__del');
    
    for(let i = 0; i<buttonsDel.length;i++) {
        buttonsDel[i].addEventListener('click', delOrder, false);
    }




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
};