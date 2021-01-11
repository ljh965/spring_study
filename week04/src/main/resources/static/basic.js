let targetId;

$(document).ready(function () {
    // id 가 query 인 녀석 위에서 엔터를 누르면 execSearch() 함수를 실행하라는 뜻입니다.
    $('#query').on('keypress', function (e) {
        if (e.key == 'Enter') {
            execSearch();
        }
    });
    $('#close').on('click', function () {
        $('#container').removeClass('active');
    })

    $('.nav div.nav-see').on('click', function () {
        $('div.nav-see').addClass('active');
        $('div.nav-search').removeClass('active');

        $('#see-area').show();
        $('#search-area').hide();
    })
    $('.nav div.nav-search').on('click', function () {
        $('div.nav-see').removeClass('active');
        $('div.nav-search').addClass('active');

        $('#see-area').hide();
        $('#search-area').show();
    })

    $('#see-area').show();
    $('#search-area').hide();

    showProduct();
})


function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function execSearch() {
    $('#search-result-box').empty();
        // 1. 검색창의 입력값을 가져온다.
    let query = $('#query').val();
    // 2. 검색창 입력값을 검사하고, 입력하지 않았을 경우 focus.
    if (query == '') {
        alert("검색어를 입력해주세요.");
        $('#query').focus()
    }
    $.ajax({
        type: 'GET',
        url: `/api/search?query=${query}`,
        success: function (response) {
            for (let i = 0; i < response.length; i++) {
                let itemDto = response[i];
                let tempHtml = addHTML(itemDto);
                $('#search-result-box').append(tempHtml);
            }
        }
    })

}

function addHTML(itemDto) {
    return `<div class="search-itemDto">
                <div class="search-itemDto-left">
                    <img src="${itemDto.image}" alt="">
                </div>
                <div class="search-itemDto-center">
                    <div>${itemDto.title}</div>
                    <div class="price">
                        ${numberWithCommas(itemDto.lprice)}
                        <span class="unit">원</span>
                    </div>
                </div>
                <div class="search-itemDto-right">
                    <img src="images/icon-save.png" alt="" onclick='addProduct(${JSON.stringify(itemDto)})'>
                </div>
            </div>`
}

function addProduct(itemDto) {
    // 1. POST /api/products 에 관심 상품 생성 요청
    $.ajax({
        type: "POST",
        url: "/api/products",
        data: JSON.stringify(itemDto),
        contentType: "application/json",
        success: function (response) {
            $('#container').addClass('active');
            targetId = response.id;
        }
    })
}

function showProduct() {
    // 1. GET /api/products 요청
    $.ajax({
        type: "GET",
        url: "/api/products",
        success: function (response) {
            $('#product-container').empty();
            $('#search-result-box').empty();
            for(let i=0; i<response.length; i++){
                let product = response[i];
                let tempHtml = addProductItem(product);
                $('#product-container').append(tempHtml);
            }
        }
    })
}

function addProductItem(product) {
    return `<div class="product-card" onclick="window.location.href='${product.link}'">
                <div class="card-header">
                    <img src="${product.image}"
                         alt="">
                </div>
                <div class="card-body">
                    <div class="title">
                        ${product.title}
                    </div>
                    <div class="lprice">
                        <span>${numberWithCommas(product.lprice)}</span>원
                    </div>
                    <div class="isgood ${product.lprice <= product.myprice ? '' : 'none'}">
                        최저가
                    </div>
                </div>
            </div>`;
}

function setMyprice() {
    let myprice = $('#myprice').val();
    if(myprice == ''){
        alert("값을 입력해주세요.");
        return;
    }

    $.ajax({
        type: "PUT",
        url: `/api/products/${targetId}`,
        contentType: "application/json",
        data: JSON.stringify({myprice: myprice}),
        success: function (response){
            $('#container').removeClass('active');
            alert("설정이 완료되었습니다.");
            window.location.reload();
        }
    })
}