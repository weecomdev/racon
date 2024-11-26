// Inicialização do Slick Slider
$(document).ready(function () {
    new WOW().init();

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

    // Seleciona os elementos para os dois contextos (desktop e mobile)
    const tracks = document.querySelectorAll('.track');
    const outputs = document.querySelectorAll('.value');

    // Função para atualizar os valores
    function updateValues(track, value) {
        const valueText = (+track.value).toFixed(3);
        value.textContent = valueText;

        // Sincroniza os outros sliders e outputs
        tracks.forEach((otherTrack) => {
            if (otherTrack !== track) {
                otherTrack.value = track.value;
            }
        });
        outputs.forEach((otherOutput) => {
            if (otherOutput !== value) {
                otherOutput.textContent = valueText;
            }
        });
    }

    // Adiciona os listeners de evento para todos os sliders
    tracks.forEach((track, index) => {
        const output = outputs[index];
        output.textContent = (+track.value).toFixed(3);

        track.addEventListener('input', () => updateValues(track, output));
    });
});

// Seleciona todos os sliders (tracks) e suas tooltips correspondentes
document.addEventListener('DOMContentLoaded', function () {
    const trackWrappers = document.querySelectorAll('.track-wrapper');

    // Função para atualizar o valor e a posição da tooltip
    function updateTooltip(track, tooltip, outputValue) {
        // Formata o valor como moeda em Real (R$)
        const value = (+track.value).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
        outputValue.textContent = value;

        // Calcula a posição da tooltip com base no valor do slider
        const trackWidth = track.offsetWidth;
        const thumbWidth = 20; // Largura aproximada do "polegar"
        const min = track.min;
        const max = track.max;
        const range = max - min;
        const percentage = (track.value - min) / range;
        const offset = percentage * (trackWidth - thumbWidth) + thumbWidth / 2;

        tooltip.style.left = `${offset}px`;
    }

    // Inicializa os sliders e tooltips
    trackWrappers.forEach(wrapper => {
        const track = wrapper.querySelector('.track');
        const tooltip = wrapper.querySelector('.value-wrapper');
        const outputValue = tooltip.querySelector('.value');

        // Atualiza a tooltip na inicialização
        updateTooltip(track, tooltip, outputValue);

        // Atualiza a tooltip durante o input
        track.addEventListener('input', () => updateTooltip(track, tooltip, outputValue));
    });
});


// Adiciona class no header ao dar scroll e verifica no carregamento da página
document.addEventListener("DOMContentLoaded", function () {
    const header = document.getElementById("header");

    // Função para verificar e aplicar a classe com base no scroll
    const toggleHeaderClass = () => {
        if (window.scrollY > 50) { // Verifica se a página foi rolada mais de 50px
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    };

    // Adiciona o evento de scroll
    window.addEventListener("scroll", toggleHeaderClass);

    // Chama a função após um pequeno atraso para garantir que a posição seja identificada corretamente
    setTimeout(toggleHeaderClass, 0);
});


// Verifica se a página está no topo ao carregar e adiciona a classe no header se necessário
document.addEventListener("DOMContentLoaded", function () {
    const header = document.getElementById("header");

    // Verifica a posição do scroll ao carregar a página
    if (window.scrollY > 0) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});



//animação dos números
document.addEventListener("DOMContentLoaded", function () {
    const counters = document.querySelectorAll(".numero");

    // Função para animar os números
    function animateNumber(counter) {
        let targetValue = counter.textContent.trim().replace(/[^\d,\.]+/g, ''); // Remove caracteres não numéricos e converte para número
        let isCurrency = counter.textContent.includes("R$"); // Verifica se é valor monetário
        let isLargeNumber = targetValue.includes("mil") || targetValue.includes("Bi");

        // Converte o texto para número (tratando números com ponto ou vírgula)
        targetValue = parseFloat(targetValue.replace(',', '.'));

        let currentValue = 0;
        const increment = targetValue / 100; // A quantidade de incremento por iteração

        const interval = setInterval(() => {
            currentValue += increment;
            if (currentValue >= targetValue) {
                clearInterval(interval);
                currentValue = targetValue;
            }

            // Formata o número corretamente
            if (isCurrency) {
                if (isLargeNumber) {
                    let formattedValue = `R$${(currentValue / 1000000000).toFixed(2)} Bi`;
                    counter.textContent = formattedValue;
                } else {
                    counter.textContent = `R$${currentValue.toFixed(2).replace('.', ',')}`;
                }
            } else if (isLargeNumber) {
                if (targetValue >= 1000000000) {
                    counter.textContent = `R$${(currentValue / 1000000000).toFixed(2)} Bi`;
                } else if (targetValue >= 1000000) {
                    counter.textContent = `${Math.floor(currentValue / 1000000)} mil`;
                }
            } else {
                counter.textContent = Math.floor(currentValue).toLocaleString();
            }
        }, 10); // A cada 10ms o valor é atualizado
    }

    // Função que cria o observer
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Se o elemento estiver visível, executa a animação
                animateNumber(entry.target);
                observer.unobserve(entry.target); // Para de observar após a animação
            }
        });
    }, {
        threshold: 0.5 // O código será executado quando 50% do elemento estiver visível na tela
    });

    // Inicia a observação dos elementos .numero
    counters.forEach(counter => {
        observer.observe(counter);
    });
});




