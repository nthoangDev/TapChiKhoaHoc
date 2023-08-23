const wrapperTrendS = document.querySelector(".wrapper__trendS");
const carouselTrendS = document.querySelector(".carousel__trendS");
const arrowBtns = document.querySelectorAll(".wrapper__trendS > .btns");
const firstCardWidth = carouselTrendS.querySelector(".card").offsetWidth;
const carouselTrendSChildrens = [...carouselTrendS.children];
let cardElement = document.querySelector(".card");
// parseInt(marginLeft, 10) dùng để xóa px và chuyển thành số nguyên
const marginLeft = parseInt(window.getComputedStyle(cardElement).marginLeft, 10);

let isDragging = false, startX, startScrollLeft;

//Lấy số lượng thẻ vừa với carouselTrendS cùng một lúc (tức là màn hình >990 thì cardPerView là 3, nhỏ hơn là 2, và cuối cùng là 1)
let cardPerView = Math.round(carouselTrendS.offsetWidth / firstCardWidth);

//Chèn bản sao của một số thẻ cuối cùng vào đầu đề cuộn carouselTrendS vô hạn
carouselTrendSChildrens.slice(-cardPerView).reverse().forEach(card => {
    carouselTrendS.insertAdjacentHTML("afterbegin", card.outerHTML);
});

//Chèn bản sao của một số thẻ đầu tiên vào cuối đề cuộn carouselTrendS vô hạn
carouselTrendSChildrens.slice(0, cardPerView).forEach(card => {
    carouselTrendS.insertAdjacentHTML("beforeend", card.outerHTML);
});

//Thêm sự kiện lắng nghe cho nút mũi tên cuộn carouselTrendS left và right    
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carouselTrendS.scrollLeft += (btn.id === "left") ? -firstCardWidth : firstCardWidth;
    });
});
const dragStart = (e) => {
    isDragging = true;
    carouselTrendS.classList.add("dragging");
    //Ghi lại con trỏ chuột ban đầu và vị trí cuộn của carouselTrendS
    startX = e.pageX;
    startScrollLeft = carouselTrendS.scrollLeft; //Số pixel có thể cuộn sang trái
}

const dragging = (e) => {
    if (!isDragging) return; //Nếu isDragging là false trả về ở đây
    //Cập nhật vị trí cuộn của carouselTrendS dựa vào sự chuyển động của con trỏ chuột
    carouselTrendS.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    carouselTrendS.classList.remove("dragging");
}

const autoPlay = () => {
    if (window.innerWidth < 800) return; //Dừng lại nếu màn hình nhỏ hơn 800 --> Không muốn auto play cho màn hình điện thoại
    //Autoplay cho carouselTrendS sau 3000 ms
    timeoutId = setTimeout(() => carouselTrendS.scrollLeft += firstCardWidth, 3000);
}
autoPlay();
const infiniteScroll = () => {
    //Nếu carouselTrendS ở vị trí đầu tiên thì cuộn đến cuối
    if (carouselTrendS.scrollLeft <= marginLeft) {
        carouselTrendS.classList.add("no-transititon");
        carouselTrendS.scrollLeft = carouselTrendS.scrollWidth - (2 * carouselTrendS.offsetWidth);
        carouselTrendS.classList.remove("no-transititon");
    }
    //Nếu carouselTrendS ở vị trí cuối cùng thì cuộn đến đầu tiên 
    else if (Math.ceil(carouselTrendS.scrollLeft) === carouselTrendS.scrollWidth - carouselTrendS.offsetWidth) {
        carouselTrendS.classList.add("no-transititon");
        carouselTrendS.scrollLeft = carouselTrendS.offsetWidth;
        carouselTrendS.classList.remove("no-transititon");
    }
    clearTimeout(timeoutId);
    //Kiểm tra xem có rê chuột và wrapperTrendS hay không, phương thức matched() dùng để kiểm tra và trả về true hoặc false
    //Nếu không có thì thực hiện autoplay
    if(!wrapperTrendS.matches(":hover")) autoPlay();
}


//Press vào thì thực hiện hàm dragStart 
carouselTrendS.addEventListener("mousedown", dragStart);
//Di chuyển chuột thì thực hiện hàm dragging
carouselTrendS.addEventListener("mousemove", dragging);
//Bỏ press chuột ra khỏi tài liệu thì thực hiện hàm dragStop
document.addEventListener("mouseup", dragStop)
carouselTrendS.addEventListener("scroll", infiniteScroll);
//Khi chuột di chuyển vào pham vi wrapperTrendS thì dùng lại không autoplay nữa
wrapperTrendS.addEventListener("mouseenter", ()=> clearTimeout(timeoutId));
//Tiếp tục autoplay nếu rời chuột khỏi wrapperTrendS
wrapperTrendS.addEventListener("mouseleave", autoPlay); 