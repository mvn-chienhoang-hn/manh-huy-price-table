const makeSlideShow = function (className) {
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

  let currentIndex;

  const handleChangeSlide = (index) => {
    slideContainer.style.transition = null;
    currentIndex = index;
    const position = (100 / slideItems.length) * index * -1;
    slideContainer.style.transform = `translateX(${position}%)`;
    handleChangeDotActive(currentIndex);
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

  const navigateSlide = (action) => {
    if (action === "next") {
      currentIndex++;
    } else if (action === "prev") {
      currentIndex--;
    }
    if (currentIndex > slideItems.length - 1 || currentIndex < 0) {
      currentIndex = 0;
    }
    handleChangeSlide(currentIndex);
  };

  let idInterval = setInterval(() => {
    navigateSlide("next");
  }, 5000);

  const handleInterval = () => {
    clearInterval(idInterval);
    idInterval = setInterval(() => {
      navigateSlide("next");
    }, 5000);
  };

  nextBtn.addEventListener("click", () => {
    navigateSlide("next");
    handleInterval();
  });

  prevBtn.addEventListener("click", () => {
    navigateSlide("prev");
    handleInterval();
  });

  dotList.forEach((dot, index) => {
    dot.addEventListener("click", function () {
      handleChangeSlide(index);
      handleInterval();
    });
  });
  return (index = 0) => {
    if (index < 0 || index > slideItems.length - 1 || index % 1 !== 0) {
      index = 0;
    }
    currentIndex = index;
    if (currentIndex !== 0) {
      slideContainer.style.transition = "none";
      slideContainer.style.transform = `translateX(${
        currentIndex * slideItemWidth * -1
      }px)`;
      handleChangeDotActive(currentIndex);
    }
  };
};

makeSlideShow(".slide-show")(2);
