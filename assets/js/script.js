// A $( document ).ready() block.
$(document).ready(function () {
    $('.passos-slide').slick({
        dots: false,
        infinite: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 1,
        prevArrow: $('.prev-passos'),
        nextArrow: $('.next-passos'),
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    centerMode: true,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true,
                }
            }
        ]
    });

    const glightbox = GLightbox();
});

document.addEventListener("DOMContentLoaded", function () {
    const fraseDiv = document.querySelector(".frase");
    const text = fraseDiv.textContent.trim();

    // Cria um elemento para o texto em rolagem
    const rollingText = document.createElement("div");
    rollingText.classList.add("rolling-text");
    rollingText.textContent = text;

    // Adiciona o texto rolando dentro da div .frase
    fraseDiv.innerHTML = ""; // Limpa o conteúdo original
    fraseDiv.appendChild(rollingText);

    // Adiciona outro texto para transição contínua
    const duplicateText = rollingText.cloneNode(true);
    fraseDiv.appendChild(duplicateText);
});