//sessao das cartas(imagens)

let imagens = [];
for (let i=1; i<8; i++) imagens.push(`https://picsum.photos/id/${i}/70`);
     
let fundo = 'https://picsum.photos/80?grayscale';

//estados das cartas
let cards = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
let travacliq = false;
let cardtrav = false;
let positionTrav = -1;
let valueTrav = 0;
let points = 0;

onload = () => { //carregar as img de fndo
let elementImg = document.querySelectorAll('#memory img');
elementImg.forEach(
    (img, i) =>{
        img.src = fundo;
        img.setAttribute('data-valor', i);
        img.style.opacity = 0.4;    
    });

    //btn inicio

    document.querySelector('#inicio').onclick = startGame;

};
/// ------- iniciar o jogo ;;;; // 

const startGame = () => {//emabaralhar cards

    for(let i=0; i<cards.length; i++){
        let p = Math.trunc(Math.random() * cards.length);
        let oux = cards[p];
        cards[p] = cards[i];
        cards[i] = oux;
    }



//ass event das img
let elementImg = document.querySelectorAll('#memory img');
elementImg.forEach(
    (img, i) => {
        img.onclick = tratarCliqimg;
        img.style.opacity = 1;
        img.src = fundo;
    });


    //redefini o estado do game
travacliq = false;
cardtrav = false;
positionTrav = -1;
valueTrav = 0;
points = 0;

//ajusta a interface
document.querySelector('#inicio').disabled = true;

}

//process clique img

const tratarCliqimg = (e) => {
     if(travacliq) return;
    const p = +e.target.getAttribute('data-valor');
    const valor = cards[p];
    e.target.src = imagens [valor - 1 ];
     e.target.onclick = null;

    if(!cardtrav) {
        cardtrav = true;
        positionTrav = p;
        valueTrav = valor;
    }else{
        if(valor == valueTrav){
            points++;

        }else{
            const p0 = positionTrav;
            travacliq = true;
            setTimeout( ()=>{
            e.target.src = fundo;
            e.target.onclick = tratarCliqimg;
            let img = document.querySelector('#memory #i'+ p0);
            img.src = fundo;
            img.onclick = tratarCliqimg;
            travacliq = false;
        } , 3000);

        }
        cardtrav = false;
        positionTrav = -1;
        valueTrav = 0;
    }

    if(points==8){
        document.querySelector('#inicio').disabled = false;
    }
};