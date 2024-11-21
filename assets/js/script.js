// Inicialização do Slick Slider
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
                    centerMode: true
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true
                }
            }
        ]
    });

    // Inicialização do GLightbox
    const glightbox = GLightbox();
});

// Animação de texto rolando
document.addEventListener("DOMContentLoaded", function () {
    const fraseDiv = document.querySelector(".frase");
    const text = fraseDiv.textContent.trim();

    // Criação do texto rolando
    const rollingText = document.createElement("div");
    rollingText.classList.add("rolling-text");
    rollingText.textContent = text;

    // Configurações de transição contínua
    fraseDiv.innerHTML = ""; // Limpa o conteúdo original
    fraseDiv.appendChild(rollingText);

    const duplicateText = rollingText.cloneNode(true);
    fraseDiv.appendChild(duplicateText);
});

// Validação dos formulários
document.addEventListener('DOMContentLoaded', function () {
    const forms = document.querySelectorAll('form'); // Seleciona todos os formulários

    forms.forEach(form => {
        form.addEventListener('submit', function (event) {
            event.preventDefault(); // Impede o envio do formulário

            // Remove estilos de erro anteriores
            form.querySelectorAll('.error').forEach(input => {
                input.classList.remove('error');
                input.style.border = '';
            });

            let isValid = true;

            // Função para adicionar borda vermelha ao campo com erro
            function addErrorBorder(input) {
                input.classList.add('error');
                input.style.border = '1px solid red';
            }

            // Validação dos campos obrigatórios
            const requiredFields = ['nome', 'email', 'telefone', 'estado', 'cidade', 'consorcio'];
            requiredFields.forEach(field => {
                const input = form.querySelector(`#${field}`);
                if (input && (input.value === '' || input.value === field)) {
                    isValid = false;
                    addErrorBorder(input);
                }
            });

            // Validação do checkbox "aceite"
            const aceite = form.querySelector('input[name="aceite"]');
            if (aceite && !aceite.checked) {
                isValid = false;
                addErrorBorder(aceite);
            }

            // Validação do campo de range "valor"
            const valorInput = form.querySelector('input[name="valor"]');
            if (valorInput && !valorInput.value) {
                isValid = false;
                addErrorBorder(valorInput);
            }

            // Submete o formulário se válido
            if (isValid) {
                form.submit();
            }
        });

        // Remove borda vermelha ao focar no campo
        form.querySelectorAll('input, select').forEach(input => {
            input.addEventListener('focus', function () {
                this.classList.remove('error');
                this.style.border = '';
            });
        });
    });
});

