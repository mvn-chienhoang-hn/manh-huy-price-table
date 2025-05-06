const makeSlideShow = function (className) {
  return (currentIndex = 0) => {
    const slideContainer = document.querySelector(
      `${className} .slide-show__container`
    );
    const slideItems = Array.from(slideContainer.children);
    const slideItemWidth = slideContainer.clientWidth;

    const prevBtn = document.querySelector(
      `${className} .slide-show__nav-btn--prev`
    );
    const nextBtn = document.querySelector(
      `${className} .slide-show__nav-btn--next`
    );
    const dotList = Array.from(
      document.querySelector(`${className} .slide-show__dots`).children
    );

    slideContainer.style.width = `${slideItemWidth * slideItems.length}px`;

    let idInterval = setInterval(() => {
      nextBtn.click();
    }, 5000);

    const handleChangeSlide = (index) => {
      slideContainer.style.transition = null;
      clearInterval(idInterval);
      currentIndex = index;
      const position = (100 / slideItems.length) * index * -1;
      slideContainer.style.transform = `translateX(${position}%)`;
      handleChangeDotActive(currentIndex);
      idInterval = setInterval(() => {
        nextBtn.click();
      }, 5000);
    };

    const handleChangeDotActive = (indexActive) => {
      dotList.forEach((dot, index) => {
        if (
          dot.children[0].classList.contains("active-bg") &&
          indexActive !== index
        ) {
          dot.children[0].classList.remove("active-bg");
        } else if (index === indexActive) {
          dot.children[0].classList.add("active-bg");
        }
      });
    };

    if (currentIndex !== 0) {
      slideContainer.style.transition = "none";
      slideContainer.style.transform = `translateX(${
        currentIndex * slideItemWidth * -1
      }px)`;
      handleChangeDotActive(currentIndex);
    }

    nextBtn.addEventListener("click", () => {
      currentIndex++;
      if (currentIndex > slideItems.length - 1) {
        currentIndex = 0;
      }
      handleChangeSlide(currentIndex);
    });

    prevBtn.addEventListener("click", () => {
      currentIndex--;
      if (currentIndex < 0) {
        currentIndex = 0;
      }
      handleChangeSlide(currentIndex);
    });

    dotList.forEach((dot, index) => {
      dot.addEventListener("click", function () {
        handleChangeSlide(index);
      });
    });
  };
};

makeSlideShow(".slide-show")();
