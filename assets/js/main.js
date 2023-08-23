//Animation cho Silde
// right-to-left
const elements=document.querySelectorAll('.trans-righttoleft');
window.addEventListener('scroll', checkElements);

checkElements();
 function checkElements() {
    const triggerBttom =window.innerHeight/ 5*4;

    elements.forEach((tranf) => {
        const elementTop =tranf.getBoundingClientRect().top;

        if(elementTop < triggerBttom) {
            tranf.classList.add('shows');
        }
        else {
            tranf.classList.remove('shows');
        }
    });
 }

// left-to-right
 const elementss=document.querySelectorAll('.trans-lefttoright');
 window.addEventListener('scroll', checkElementss);
 function checkElementss() {
    const triggerBttom =window.innerHeight/ 5*4;

    elementss.forEach((tranf) => {
        const elementTop =tranf.getBoundingClientRect().top;

        if(elementTop < triggerBttom) {
            tranf.classList.add('shows');
        }
        else {
            tranf.classList.remove('shows');
        }
    });
 }

var goToTopButton = document.getElementById("gototop");

function showHideButton() {
  if (window.scrollY > 100) {
    goToTopButton.style.display = "block";
  } else {
    goToTopButton.style.display = "none";
  }
}

// Hiển thị nút khi cuộn xuống
window.addEventListener("scroll", showHideButton);

// Cuộn lên trên cùng khi nhấp vào nút
goToTopButton.addEventListener("click", function (event) {
  event.preventDefault(); // Ngăn chặn hành vi mặc định của liên kết thẻ a
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Nút hiện/ẩn khi tải trang
showHideButton();



const buttonMenu = document.querySelector("#mobile-menu");
const menu = document.querySelector("#menu");
buttonMenu.addEventListener("click", () => {
  menu.classList.toggle("show")
})

//GỢI Ý TÌM KIẾM
$(document).ready(function () {
  let keywords = ["Công nghệ", "Cuộc sống", "Sức khỏe", "Vũ trụ", "Sinh học", "Công ty", "Nghiên cứu"];
  $("#kw").on("keyup focus", function () {
    let t = $(this).val();

    let h = "";
    for (let c of keywords) {
      if (c.indexOf(t) >= 0)
        h += `<li><a href="javascript:;">${c}</a></li>`;
    }
    $("#suggest").html(h);
  });

  $("#suggest").on("click", "a", function () {
    let t = $(this).text();
    $("#kw").val(t);
    $("#suggest").html("");
  });

});

//TÌM KIẾM
document.getElementById("btnSearch").addEventListener("click", function () {
  var searchValue = document.getElementById("kw").value;
  var titleDivs = document.getElementsByClassName("inner-title");

  // Xóa màu nền highlight của các kết quả tìm kiếm cũ
  for (var i = 0; i < titleDivs.length; i++) {
    var links = titleDivs[i].getElementsByTagName("a");
    if (links.length > 0) {
      links[0].style.backgroundColor = ""; // Đặt màu nền về trắng để xóa highlight
    }
  }

  // Tìm kiếm trong danh sách các tiêu đề
  var foundIndex = -1;
  for (var i = 0; i < titleDivs.length; i++) {
    if (titleDivs[i].textContent.includes(searchValue)) {
      foundIndex = i;
      break;
    }
  }

  if (foundIndex !== -1) {
    // Làm nổi bật thẻ "a" trong kết quả tìm thấy
    var links = titleDivs[foundIndex].getElementsByTagName("a");
    if (links.length > 0) {
      links[0].style.backgroundColor = "yellow"; // Thay đổi màu nền để làm nổi bật
    }
  }
  // Thay đổi vị trí cuộn để trượt đến kết quả đã tìm thấy
  //getBoundingClientRect(): dùng để tính toán vị trí cụ thể mà muốn trượt đến 
  var scrollToY = titleDivs[foundIndex].getBoundingClientRect().top + window.scrollY - 500;
  window.scrollTo({ top: scrollToY, behavior: 'smooth' }); // Sử dụng 'smooth' để có hiệu ứng trượt mượt mà

});

// LOGIN & SIGNIN 
var buttonLoginv=document.querySelector("#Login"); 
var buttCloseLogin= document.querySelector("#close-login");
var buttCloseSignUp= document.querySelector("#close-sign-up");
var dangNhap = document.querySelector(".form-modal-login");
var overlay = document.querySelector(".form-overlay");
var buttonSignUp =document.querySelector("#Sign-up");
var dangKi=document.querySelector(".form-modal-sign-up");

buttonLoginv.addEventListener("click",function() {
   dangNhap.style.display="block";
   overlay.style.display="block";

});
buttonSignUp.addEventListener("click",function() {
   dangKi.style.display="block";
   overlay.style.display="block";
})
buttCloseLogin.addEventListener("click", ()=>{
   dangNhap.style.display="none";
   overlay.style.display="none";
})
buttCloseSignUp.addEventListener("click", ()=>{
   dangKi.style.display="none";
   overlay.style.display="none";
})