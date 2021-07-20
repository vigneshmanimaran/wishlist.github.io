// javascript for bluring and showing cart icons
document.querySelectorAll('.product-hover').forEach(product1 => {
    product1.classList.add('hide');
})

document.querySelectorAll('div[id^="product"]').forEach(product1 => {
    product1.addEventListener('mouseover', event => {
        product1.querySelector('.product-img').classList.add('blur');
        product1.querySelector('.product-img').querySelector('.product-hover').classList.remove('hide');
        product1.querySelector('.product-img').querySelector('.product-hover').classList.add('show');
    })
    product1.addEventListener('mouseout', event => {
        product1.querySelector('.product-img').classList.remove('blur');
        product1.querySelector('.product-img').querySelector('.product-hover').classList.add('hide');
        product1.querySelector('.product-img').querySelector('.product-hover').classList.remove('show');
    })
});

// javascript for hovering on image

$(document).ready(function () {
    $(".image").hover(function () {
        $(this).attr('src', 'images/Group 2584.png');
    }, function () {
        $(this).attr('src',
            'https://user-images.githubusercontent.com/76697341/112657532-6ea58f00-8e4a-11eb-8121-3bb435a60d61.png'
        );
    });
});
$(document).ready(function () {
    $(".image1").hover(function () {
        $(this).attr('src', 'images/Group 2583.png');
    }, function () {
        $(this).attr('src',
            'https://user-images.githubusercontent.com/76697341/112657536-6f3e2580-8e4a-11eb-8660-99044271a2f0.png'
        );
    });
});
$(document).ready(function () {
    $(".image2").hover(function () {
        $(this).attr('src', 'images/Group 2582.png');
    }, function () {
        $(this).attr('src',
            'https://user-images.githubusercontent.com/76697341/112657537-6f3e2580-8e4a-11eb-94b1-861c7a689673.png'
        );
    });
});


