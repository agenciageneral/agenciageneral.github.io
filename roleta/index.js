var running = false,	// Controla se ja está em execução
	graus = 0,			// Qual grau é pra girar o ponteiro
	voltas = 7,			// Quantas voltas minimas antes de sortear
	perc = 100,			// Porcentagem da animação
	graus_total = 80,	// Graus maximo para iniciar
	timehander = null,
	angulo_final = 0;

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
		
		// Geral o angulo final
		angulo_final = createRandomNumber((380 * voltas), (380 * (voltas + 8)));
		
		// Inicia
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
	perc = ((graus * 100) / angulo_final) + 1;
	perc = 100 - perc;
	
	// Calcula a quantidade de graus
	graus += (((graus_total * perc) / 100));
	
	// Mostra o integrante
	if(o != integrante_selecionado()) {
		o = integrante_selecionado();
	}
	
	// Anima o ponteiro
	$('.ponteiro').css({
		'-ms-transform':'rotate('+graus+'deg)',
		'-webkit-transform':'rotate('+graus+'deg)',
		'transform':'rotate('+graus+'deg)'
	});
	
	// Proxima interação
	clearTimeout(timehander);
	timehander = setTimeout(iniciar, 100);
};

/**
 * Exibe o sortudo
 */
var exibir = function() {
	$('.lightbox-area').css({ 'zoom': 0.00001 });
	
	// Moda o nome do integrante
	var integrante = integrante_selecionado();
	switch(integrante) {
		case 1:
			$('.oficial').html('Bruno');
			break;
		case 2:
			$('.oficial').html('André');
			break;
		case 3:
			$('.oficial').html('LG');
			break;
		case 4:
			$('.oficial').html('Rodrigo');
			break;
	}
	
	// Toca o som
	var a = document.getElementById('audio'); 
	if (a.canPlayType && a.canPlayType('audio/mp3;').replace(/no/, '')) {
		a.play();
	}
	
	// Exibe o lightbox
	$('.lightbox-block').fadeIn(function() {
		$('.lightbox-area').animate({ 'zoom': 1 }, 700);
	});
}

/**
 * Informa qual o integrante que o ponteiro ta
 */
var integrante_selecionado = function() {
	var a = (((parseInt(graus)) % 360));
	var i = 0;
	
	$('.tabela li img').css({'-webkit-filter':'none'});
	if ((a >= 0) && (a < 90)) {
		i = 1;
		$('.tabela li:nth-child(4) img').css({'-webkit-filter':'sepia(80%)'});
	}
	else if ((a >= 90) && (a < 180)) {
		i = 2;
		$('.tabela li:nth-child(3) img').css({'-webkit-filter':'sepia(80%)'});
	}
	else if ((a >= 180) && (a < 270)) {
		i = 3;
		$('.tabela li:nth-child(1) img').css({'-webkit-filter':'sepia(80%)'});
	}
	else if ((a >= 270) && (a <= 360)) {
		$('.tabela li:nth-child(2) img').css({'-webkit-filter':'sepia(80%)'});
		i = 4;
	}
	
	return i;
};

/**
 * Cria numeros aleatorios semeados
 * 
 * http://stackoverflow.com/questions/424292/seedable-javascript-random-number-generator
 */
function nextRandomNumber(){
  var hi = this.seed / this.Q;
  var lo = this.seed % this.Q;
  var test = this.A * lo - this.R * hi;
  if(test > 0){
    this.seed = test;
  } else {
    this.seed = test + this.M;
  }
  return (this.seed * this.oneOverM);
}

function RandomNumberGenerator(){
  var d = new Date();
  this.seed = 2345678901 + (d.getSeconds() * 0xFFFFFF) + (d.getMinutes() * 0xFFFF);
  this.A = 48271;
  this.M = 2147483647;
  this.Q = this.M / this.A;
  this.R = this.M % this.A;
  this.oneOverM = 1.0 / this.M;
  this.next = nextRandomNumber;
  return this;
}

function createRandomNumber(Min, Max){
  var rand = new RandomNumberGenerator();
  return Math.round((Max-Min) * rand.next() + Min);
}
