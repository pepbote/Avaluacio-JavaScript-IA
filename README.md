Primer de tot, no he pogut generar les imatges amb ia, ja que si li passava al dalle2 una descripció feta pel chatGPT o per mi, em sorita sempre lo que surt a la imagte 'dalle2.png', vaig buscar altres ia però no em deixaven generar més de 5 imatges gratuïtamen,
i finalment, per no perdre més temps amb el tema, vaig decidir buscar-les per internet ja que vaig trobar una pàgina on hi havia imàtges que m'agradaven molt.

Prompts utilitzats a ChatGPT:

1: {
necesito que me generes diez personajes en formato json con este formato:
{ "nom": "Goku", "atac": 90, "defensa": 80, "velocitat": 10, "salut": 100},
 { "nom": "Vegeta", "atac": 85, "defensa": 75, "velocitat": 9, "salut": 100}

puede ser del tema que quieres, por ejemplo personajes de ladybug
}

2: {
ponlos todos en el mismo documento
}

3: {
ahora tengo que recoger la info del json desde js, como hago eso?, con el fetch no?
}

4: {
const cartes = document.getElementById('cartes');

function generarCartes() {
    var json = 'persones.json';
    for(let i = 0; i < 10; i++) {
    fetch(json)
        .then(x => x.json())
        .then(personatje => {
            const template = document.querySelector('#template');
            const clonedTemplate = template.content.cloneNode(true);

            let carta = clonedTemplate.querySelector('.carta');

            carta.setAttribute('id', personatje.id);
            
            let nom = clonedTemplate.querySelector('.nom');
            nom.innerHTML = personatje.nom;

            let img = clonedTemplate.querySelector('.img');
            img.setAttribute('src', personatje.img);

            let atac = clonedTemplate.querySelector('.atac');
            atac.innerHTML = personatje.atac;

            let defensa = clonedTemplate.querySelector('.defensa'); 
            defensa.innerHTML = personatje.defensa;

            let velocitat = clonedTemplate.querySelector('.velocitat');
            velocitat.innerHTML = personatje.velocitat;

            let salut = clonedTemplate.querySelector('.salut');
            salut.innerHTML = personatje.salut;

            cartes.appendChild(clonedTemplate);
        })
    }
}

generarCartes();

porque no se me ponen las cartas?
}

5: {
no, no quiero que me cambies el codigo, quiero que me salgan 10 cartas nadamás abra la web
}

6: {
necesito que queden como cartas rollo bonito, te paso este css para que te inspires un poco
(li copio el css del pokeplay)
}

7: {
(adjunto codi css)
sin tocar nada de esto, a no ser que sea 100% obligatorio quiero que le pongas un box-shadow a todas las cartas y un border-radius, y quita el borde que tienen ahora
}

8: {
pero quiero que el box-shadow esté alrededor de toda la carta
}

9: {
a partir de esto:
(li passo el script)
necesito que me hagas que se dividan las cartas aleatoriamente en dos grupos, aquí el html:
(html)
}

10: {
no podrías hacer que se generen 10 numeros random y si es par o impar se ponga en un equipo u otro?
}

11: {
(codi del chat) const numerosAleatorios = Array.from({ length: 10 }, () => Math.floor(Math.random() \* personatges.length));
esto se puede hacer de otra forma? con un for o algo?
}

12: {
(m'ha generat un codi que repetia cartes i només es mostraven 5 i es prepetien fins a 10)
no se podría hacer como antes de generar cada personaje y después al agregarlo poner lo de los indices?
}

13: {
(obro un nou chat, li paso el js)
con esta lógica haz si el primer numero es par, la primera carta se ponga en el grupo1 si el segundo numero es impar, la segunda carta en el grupo2 y así sucesivamente
}

14: {
personatges.forEach((personatge, index) => {
lo del index no le entiendo, que saldrá?
}

15: {
ahora necesito que puedes seleccionar una carta de cada equipo, pero solo una de cada, y la carta que se seleccione la añades a un array de cartasseleccionadas o algo así
}

16: {
vale, pero no puedo deseleccionar la carta del equipo1 que ya está selecciondaa
}

17: {
como poner sombra al contorno de una imagen
}

18: {
a partir de este código necesito que me implementes está funcionalidad de combate cunado se clique el botón de combate, primero de todo hay que comprobar si hay dos cartas seleccionadas, y después:
El combat consistirà en anar-se atancant un a l'altre alternativament fins que un dels 2 arribi a "salut" 0.
La lògica del combat és la següent:
- comença atacant el personatge amb el valor de velocitat més alt.
- si el valor d'atac de l'atacant és superior que el valor de defensa del defensor, es resta tanta vida com la diferència del valors. 
  Per exemple: Goku ataca amb 90, Vegeta es defensa amb 75 => 90-75=15 => Vegeta queda amb 85 de vida (100-15)
- si el valor d'atac de l'atacant és inferior o igual al valor de defensa del defensor, es resten 10 punts de vida al defensor.
  Per exemple: Yamsha ataca amb 70, Krilin es defensa amb 75 => Krilin queda amb 90 de vida (100-10)
}

19: {
vale ahora tienes que hacer que peleen hasta que uno de los dos se quede sin vida, primero ataca uno y después otro 
}

20: {
(vaig tenir un problema amb al moment del combat)
algo no va bien porque los consol.log de la funcion combatir no se muestran en la consol
(al final ho vaig acabar resolent sense el chat)
}

21: {
haz una descripción de ladybug para que una ia (dalle2) genere una imagen de ella
}
