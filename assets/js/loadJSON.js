function loadHeader() {
    fetch("assets/data/header.json").then(res => res.json()).then(data => {
            let h = "";
            for (let c of data)
                h += `<li class="line"><a href="#">${c.name}</a></li>`;

            let e = document.querySelector("#menu :first-child");
            e.insertAdjacentHTML("afterend", h);

            // Gắn sự kiện "click" cho các thẻ li sau khi tải dữ liệu và chèn vào trang
            var mainNav = document.getElementById("menu");
            var listNav = mainNav.getElementsByTagName("li");

            for (var i = 0; i < listNav.length; i++) {
                listNav[i].addEventListener("click", function () {
                    var current = document.querySelector("#menu .active");
                    if (current) {
                        current.classList.remove("active");
                    }
                    this.classList.add("active");
                });
            }
        });
}


function loadTrendS() {
    fetch("assets/data/trendS.json").then(res => res.json()).then(data => {
            let h = "";
            for (let c of data)
                h += `
                <div class="card">
                <div class="img">
                    <img src="./assets/img/trendingSearch${image}.jpg" alt="">
                </div>
                <div class="trendS__content">
                    <div class="card__title">
                        <h3>${title}</h3>
                    </div>
                    <p>${content}</p>
                </div>
                <a href="#" target="_blank" class="trendS__link">Xem thêm <i class="fa fa-caret-down"></i></a>
            </div>
                `;

            let e = document.querySelector("#trendS :first-child");
            e.insertAdjacentHTML("afterend", h);
        });
}    

window.onload = function () {
    loadHeader();
    loadTrendS();
};
