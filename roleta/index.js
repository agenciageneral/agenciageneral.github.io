var running = false,	// Controla se ja está em execução
	graus = 0,			// Qual grau é pra girar o ponteiro
	voltas = 1,			// Quantas voltas antes de sortear
	perc = 100,			// Porcentagem da animação
	graus_total = 10;	// Graus maximo para iniciar

/**
 * Inicializa as funções
 */
$(function() {
	
	// Ao clicar no botão para iniciar
	$('.botao-iniciar').on('click', function() {
		// Verifica se ja está rolando
		if(running) {
			return false;
		}
		
		running = true;
		iniciar();
		
	});
	
});

/**
 * Roda a roleta
 */
var o = 0;
var iniciar = function() {
	// Verifica se a porcentagem acabou
	if(perc <= 1) {
		// Chama o lightbox do sortudo
		exibir(graus);
		
		// Reseta a roleta
		graus = 0;
		perc = 100;
		running = false;
		
		// Cancela a animação
		return false;
	}
	
	// Calcula a porcentagem da roleta para acabar
	perc = ((graus * 100) / (380 * voltas)) + 1;
	perc = 100 - perc;
	
	// Calcula a quantidade de graus
	graus += (((graus_total * perc) / 100));
	
	// Mostra o integrante
	if(o != integrante_selecionado()) {
		o = integrante_selecionado();
		console.log(o);
	}
	
	// Anima o ponteiro
	$('.ponteiro').css({
		'-ms-transform':'rotate('+graus+'deg)',
		'-webkit-transform':'rotate('+graus+'deg)',
		'transform':'rotate('+graus+'deg)'
	});
	
	// Proxima interação
	setTimeout(iniciar, 100);
};

/**
 * Exibe o sortudo
 */
var exibir = function() {
	var integrante = integrante_selecionado();
	console.log("fechou:", integrante);
	
	console.log(graus);
}

/**
 * Informa qual o integrante que o ponteiro ta
 */
var integrante_selecionado = function() {
	var a = (((parseInt(graus) + 180) % 360) / 4);
	var i = 0;
	
	if ((a > 0) && (a <= 25)) {
		i = 1;
	}
	else if ((a > 25) && (a <= 50)) {
		i = 2;
	}
	else if ((a > 50) && (a <= 75)) {
		i = 3;
	}
	else if ((a > 75) && (a <= 100)) {
		i = 4;
	}
	
	return i;
};
