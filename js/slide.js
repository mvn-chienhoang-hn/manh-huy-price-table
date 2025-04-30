// Hàm tạo slideshow
const makeSlideShow = function (className) {
  // Lấy các phần tử cần thiết từ DOM
  const slideShowEl = document.querySelector(className); // Thẻ chứa toàn bộ slideshow
  const slideContainer = slideShowEl.children[0]; // Thẻ chứa các slide
  const slideItems = Array.from(slideContainer.children); // Danh sách các slide
  const slideItemWidth = slideContainer.clientWidth; // Chiều rộng của 1 slide

  const controlBtns = Array.from(slideShowEl.children[1].children); // Lấy các nút điều khiển
  const prevBtn = controlBtns[0]; // Nút quay lại
  const nextBtn = controlBtns[1]; // Nút tiếp theo
  const dotList = Array.from(slideShowEl.children[2].children); // Danh sách chấm tròn

  let position = 0; // Vị trí hiện tại của slideContainer (dùng cho transform)
  let currentIndex = 0; // Index của slide hiện tại

  let idAutoPlay;

  // Hàm xử lý chuyển slide tự động
  const handleAutoPlay = () => {
    nextBtn.click(); // Giả lập click nút next
  };

  // Thiết lập chuyển slide tự động mỗi 5 giây
  idAutoPlay = setInterval(() => {
    handleAutoPlay();
  }, 5000);

  // Cài đặt chiều rộng cho container chứa slide
  slideContainer.style.width = `${slideItemWidth * slideItems.length}px`;

  // Cài đặt chiều rộng cho từng slide
  slideItems.forEach((item) => {
    item.style.width = `${slideItemWidth}px`;
  });

  // Cập nhật chấm tròn active (hiển thị slide hiện tại)
  const handleChangeDotActive = (control) => {
    let flag = true;
    if (control === "next") {
      dotList.forEach((dot, index) => {
        if (dot.children[0].classList.contains("active-bg") && flag) {
          dot.children[0].classList.remove("active-bg");
          dot.nextElementSibling.children[0].classList.add("active-bg");
          flag = false;
        }
      });
    } else if (control === "prev") {
      dotList.forEach((dot, index) => {
        if (dot.children[0].classList.contains("active-bg") && flag) {
          dot.children[0].classList.remove("active-bg");
          dot.previousElementSibling.children[0].classList.add("active-bg");
          flag = false;
        }
      });
    }
  };

  // Xử lý khi nhấn nút next
  nextBtn.addEventListener("click", () => {
    // Nếu chưa đến cuối slideshow
    if (
      Math.abs(position - slideItemWidth) < slideItemWidth * slideItems.length
    ) {
      position -= slideItemWidth;
      slideContainer.style.transform = `translateX(${position}px)`;
      currentIndex++;
      handleChangeDotActive("next");
    } else {
      // Nếu đã đến slide cuối, quay lại đầu
      slideContainer.style.transform = `translateX(0px)`;
      position = 0;
      currentIndex = 0;
      dotList.forEach(function (dot, index) {
        if (index === 0) {
          dot.children[0].classList.add("active-bg");
        } else {
          dot.children[0].classList.remove("active-bg");
        }
      });
    }
  });

  // Xử lý khi nhấn nút prev
  prevBtn.addEventListener("click", () => {
    if (Math.abs(position) > 0) {
      position += slideItemWidth;
      slideContainer.style.transform = `translateX(${position}px)`;
      currentIndex--;
      handleChangeDotActive("prev");
    }
  });

  // Xử lý khi người dùng click vào chấm tròn (dot)
  dotList.forEach((dot, index) => {
    dot.addEventListener("click", function () {
      const step = currentIndex - index;
      if (step < 0) {
        // Di chuyển tiến tới slide
        position -= Math.abs(step) * slideItemWidth;
        slideContainer.style.transform = `translateX(${position}px)`;
        currentIndex = index;
      } else if (step > 0) {
        // Di chuyển lùi về slide
        position += Math.abs(step) * slideItemWidth;
        slideContainer.style.transform = `translateX(${position}px)`;
        currentIndex = index;
      }

      // Cập nhật chấm active
      this.children[0].classList.add("active-bg");
      dotList.forEach((dotItem, indexItem) => {
        if (index !== indexItem) {
          dotItem.children[0].classList.remove("active-bg");
        }
      });
    });
  });

  // Dừng autoplay khi người dùng nhấn giữ chuột vào nút next/prev
  nextBtn.addEventListener("mousedown", () => {
    clearInterval(idAutoPlay);
  });
  prevBtn.addEventListener("mousedown", () => {
    clearInterval(idAutoPlay);
  });

  // Tiếp tục autoplay khi người dùng thả chuột khỏi nút next/prev
  nextBtn.addEventListener("mouseup", () => {
    idAutoPlay = setInterval(() => {
      handleAutoPlay();
    }, 5000);
  });
  prevBtn.addEventListener("mouseup", () => {
    idAutoPlay = setInterval(() => {
      handleAutoPlay();
    }, 5000);
  });

  // Dừng và tiếp tục autoplay khi người dùng tương tác với chấm tròn
  dotList.forEach(function (dot, index) {
    dot.addEventListener("mousedown", () => {
      clearInterval(idAutoPlay);
    });

    dot.addEventListener("mouseup", () => {
      idAutoPlay = setInterval(() => {
        handleAutoPlay();
      }, 5000);
    });
  });
};

// Gọi hàm tạo slideshow
makeSlideShow(".slide-show");
