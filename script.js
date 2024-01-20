const cartes1 = document.getElementById('cartes1').querySelector('.cartes');
const cartes2 = document.getElementById('cartes2').querySelector('.cartes');
const cartesSeleccionadas = []; 
const combat = document.getElementById('combat');
const resultat = document.getElementById('resultat');
const resumbtn = document.getElementById('veureResum');
const resum = document.getElementById('resum');
const textGuanyador = document.getElementById('guanyador');
const eliminadesbtn = document.getElementById('eliminades');
const eliminades = document.getElementById('cartesEliminades');

function generarCartes() {
    var json = 'personatges.json';

    let numerosGenerados = [];
    for (let i = 0; i < 10; i++) {
        let numero;
        do {
            numero = Math.floor(Math.random() * 10) + 1;
        } while (numerosGenerados.includes(numero));
        numerosGenerados.push(numero);
    }

    fetch(json)
        .then(x => x.json())
        .then(personatges => {
            personatges.forEach((personatge, index) => {
                const template = document.querySelector('#template');
                const clonedTemplate = template.content.cloneNode(true);

                let carta = clonedTemplate.querySelector('.carta');
                carta.setAttribute('id', personatge.id);

                let nom = clonedTemplate.querySelector('.nom');
                nom.innerHTML = personatge.nom;

                let img = clonedTemplate.querySelector('.img');
                img.setAttribute('src', personatge.img);

                let atac = clonedTemplate.querySelector('.atac');
                atac.innerHTML = "Atac: " + personatge.atac;

                let defensa = clonedTemplate.querySelector('.defensa');
                defensa.innerHTML = "Defensa: " + personatge.defensa;

                let velocitat = clonedTemplate.querySelector('.velocitat');
                velocitat.innerHTML = "Velocitat: " + personatge.velocitat;

                let salut = clonedTemplate.querySelector('.salut');
                salut.innerHTML = "Salut: " + personatge.salut;

                const equipo = (numerosGenerados[index] % 2 === 0) ? 'equipo1' : 'equipo2';
                carta.classList.add('carta', equipo);

                // Añadir evento de clic para seleccionar cartas
                carta.addEventListener('click', () => seleccionarCarta(carta, equipo));

                if (equipo === 'equipo1') {
                    cartes1.appendChild(clonedTemplate);
                } else {
                    cartes2.appendChild(clonedTemplate);
                }
            });
        });
}

function seleccionarCarta(carta, equipo) {
    const esSeleccionada = carta.classList.contains('seleccionada');

    cartesSeleccionadas.forEach((seleccionada) => {
        if (seleccionada.equipo === equipo) seleccionada.carta.classList.remove('seleccionada');
    });

    if (esSeleccionada) {
        carta.classList.remove('seleccionada');
        const index = cartesSeleccionadas.findIndex(c => c.carta === carta);
        if (index !== -1) cartesSeleccionadas.splice(index, 1);
        
    } else {
        carta.classList.add('seleccionada');
        const cartaSeleccionada = {
            equipo: equipo,
            carta: carta
        };
        const index = cartesSeleccionadas.findIndex(c => c.equipo === equipo);
        if (index !== -1) cartesSeleccionadas[index] = cartaSeleccionada;
        else cartesSeleccionadas.push(cartaSeleccionada);
    }
}

generarCartes();

let contador = 1;

combat.addEventListener('click', () => { 
    if(cartesSeleccionadas.length === 2) {
        const carta1 = cartesSeleccionadas[0].carta;
        const carta2 = cartesSeleccionadas[1].carta;

        carta1_valores = obtenerPropiedadesCarta(carta1);
        carta2_valores = obtenerPropiedadesCarta(carta2);

        let atacante, defensor;
        if (carta1_valores.velocitat > carta2_valores.velocitat) {
            atacante = carta1_valores;
            defensor = carta2_valores;
        } else if (carta1_valores.velocitat < carta2_valores.velocitat) {
            atacante = carta2_valores;
            defensor = carta1_valores;
        } else {
            const random = Math.floor(Math.random() * 2);
            if (random === 0) {
                atacante = carta1_valores;
                defensor = carta2_valores;
            } else {
                atacante = carta2_valores;
                defensor = carta1_valores;
            }
        }

        resum.innerHTML = '';

        while (carta1_valores.salut > 0 && carta2_valores.salut > 0) {
            combatir(atacante, defensor);
            [atacante, defensor] = [defensor, atacante]; 
        }

        if (carta1_valores.salut <= 0) {
            const textResultat = document.createElement('p');
            textResultat.innerHTML = `${carta2_valores.nom} ha guanyat el combat ${contador}!`;
            contador++;
            textGuanyador.appendChild(textResultat);
            carta2.querySelector('.salut').innerHTML = `Salut: ${carta2_valores.salut}`;
            cartaEliminada = carta1.cloneNode(true);
            eliminades.appendChild(netejarCarta(cartaEliminada).cloneNode(true));
            carta1.classList.add('hidden');
        } else {
            const textResultat = document.createElement('p');
            textResultat.innerHTML = `${carta1_valores.nom} ha guanyat el combat ${contador}!`;
            contador++;
            textGuanyador.appendChild(textResultat);
            carta1.querySelector('.salut').innerHTML = `Salut: ${carta1_valores.salut}`;
            cartaEliminada = carta2.cloneNode(true);
            eliminades.appendChild(netejarCarta(cartaEliminada).cloneNode(true));
            carta2.classList.add('hidden');
        }

        resumbtn.classList.remove('hidden');
        eliminadesbtn.classList.remove('hidden');
    } else {
        alert('Selecciona dos cartas');
    }
});

function obtenerPropiedadesCarta(carta) {
    return {
        nom: carta.querySelector('.nom').textContent,
        salut: parseInt(carta.querySelector('.salut').textContent.split(':')[1].trim(), 10),
        atac: parseInt(carta.querySelector('.atac').textContent.split(':')[1].trim(), 10),
        defensa: parseInt(carta.querySelector('.defensa').textContent.split(':')[1].trim(), 10),
        velocitat: parseInt(carta.querySelector('.velocitat').textContent.split(':')[1].trim(), 10)
    };
}

function combatir(atacante, defensor) {
    const textResum = document.createElement('p');
    textResum.innerHTML = `${atacante.nom} ataca a ${defensor.nom}`;

    const diferencia = atacante.atac - defensor.defensa;

    if (diferencia > 0) {
        defensor.salut -= diferencia;
        textResum.innerHTML += ` i li fa ${diferencia} punts de dany i ara li queden ${defensor.salut} punts de salut`;
    } else {
        defensor.salut -= 10;
        textResum.innerHTML += ` i li fa 10 punts de dany, i ara li queden ${defensor.salut} punts de salut`;
    }

    resum.appendChild(textResum);
}

resumbtn.addEventListener('click', () => {
    resum.classList.toggle('hidden');
});

eliminadesbtn.addEventListener('click', () => {
    eliminades.classList.toggle('hidden');
    eliminades.classList.toggle('cartesEliminades');
});

function netejarCarta(carta) {
    carta.querySelector('.salut').innerHTML = `Salut: ${carta1_valores.salut}`;
    carta.querySelector('.salut').innerHTML = "";
    carta.querySelector('.atac').innerHTML = "";
    carta.querySelector('.defensa').innerHTML = "";
    carta.querySelector('.velocitat').innerHTML = "";
    carta.classList.add('eliminada');
    carta.classList.remove('carta');
    carta.classList.remove('equipo1');
    carta.classList.remove('seleccionada');
    return carta;
}