// window.onload = function() {
//     let catalogItems = document.querySelectorAll(".catalog__list-item");
//     let navigation = document.querySelector(".navigation");
//     catalogItems.forEach(catalogItem => {
//         catalogItem.addEventListener("mouseenter", function() {
//             console.log(this.clientWidth);
//             console.log(navigation.clientWidth);
//             navigation.style.width = this.offsetWidth+navigation.offsetWidth + "px";
//             console.log(navigation.style.width);

//         });

//         catalogItem.addEventListener("mouseleave", function() {
//             console.log(this.clientWidth);
//             console.log(navigation.clientWidth);
//             navigation.style.width = -this.offsetWidth+navigation.offsetWidth + "px";
//             console.log(navigation.style.width);

//         });
        
//     });
//     console.log(catalogItems);

// }