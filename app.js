var saveBtn = document.getElementById("save-btn");
saveBtn.addEventListener("click", function () {
    // Get the contact information from the website
    var contact = {
        name: "Majd msallam",
        phone: "0527042557",
        email: "msalm46@gmail.com"
    };
    // create a vcard file
    var vcard = "BEGIN:VCARD\nVERSION:4.0\nFN:" + contact.name + "\nTEL;TYPE=work,voice:" + contact.phone + "\nEMAIL:" + contact.email + "\nEND:VCARD";
    var blob = new Blob([vcard], { type: "text/vcard" });
    var url = URL.createObjectURL(blob);

    const newLink = document.createElement('a');
    newLink.download = contact.name + ".vcf";
    newLink.textContent = contact.name;
    newLink.href = url;

    newLink.click();
});
function sendWhatsAppMessage() {
    window.location.href('https://api.whatsapp.com/send?phone=+972527042557', '_blank');
}
function makeCall(){
    window.location.href('tel:+972505317192', '_blank');
}
function openInstgram() {
    window.location.href('instagram://user?username=m4jd_m', '_blank');
}
function openFacebook() {
}
function openGoogle() {
    window.location.href('https://www.google.com/search?q=%D7%99.%D7%9E+%D7%A4%D7%A8%D7%96%D7%95%D7%9C&oq=%D7%99.%D7%9E+%D7%A4%D7%A8%D7%96&gs_lcrp=EgZjaHJvbWUqCggCEAAYExgWGB4yDAgAEAAYExjjAhiABDIPCAEQLhgTGK8BGMcBGIAEMgoIAhAAGBMYFhgeMgwIAxAAGA8YExgWGB4yBggEEEUYPDIGCAUQRRg9MgYIBhBFGD3SAQoxMzc0OWowajE1qAIAsAIA&sourceid=chrome&ie=UTF-8', '_blank');
}
function openWaze() {
    window.location.href('https://waze.com/ul?ll=32.70372,35.29966', '_blank');
}

/////////////////////////////// courasel
const initializeSlider = () => {
    const imageList = document.querySelector(
        ".slider-container .image-grid"
    );
    const slideButtons = document.querySelectorAll(
        ".slider-container .slide-button"
    );
    const sliderScrollbar = document.querySelector(
        ".container .slider-scrollbar"
    );
    const scrollbarThumb =
        sliderScrollbar.querySelector(".scrollbar-thumb");
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

    scrollbarThumb.addEventListener("mousedown", (e) => {
        const startX = e.clientX;
        const thumbPosition = scrollbarThumb.offsetLeft;
        const maxThumbPosition =
            sliderScrollbar.getBoundingClientRect().width -
            scrollbarThumb.offsetWidth;

        const handleMouseMove = (e) => {
            const deltaX = e.clientX - startX;
            const newThumbPosition = thumbPosition + deltaX;
            const boundedPosition = Math.max(
                0,
                Math.min(maxThumbPosition, newThumbPosition)
            );
            const scrollPosition =
                (boundedPosition / maxThumbPosition) * maxScrollLeft;

            scrollbarThumb.style.left = `${boundedPosition}px`;
            imageList.scrollLeft = scrollPosition;
        };

        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    });

    slideButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const direction = button.id === "previous-slide" ? -1 : 1;
            const scrollAmount = imageList.clientWidth * direction;
            imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
        });
    });

    const handleSlideButtons = () => {
        slideButtons[0].style.display =
            imageList.scrollLeft <= 0 ? "none" : "flex";
        slideButtons[1].style.display =
            imageList.scrollLeft >= maxScrollLeft ? "none" : "flex";
    };

    const updateScrollThumbPosition = () => {
        const scrollPosition = imageList.scrollLeft;
        const thumbPosition =
            (scrollPosition / maxScrollLeft) *
            (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
        scrollbarThumb.style.left = `${thumbPosition}px`;
    };

    imageList.addEventListener("scroll", () => {
        updateScrollThumbPosition();
        handleSlideButtons();
    });
};

window.addEventListener("resize", initializeSlider);
window.addEventListener("load", initializeSlider);