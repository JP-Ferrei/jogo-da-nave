var som_explosao = new Audio();
som_explosao.src = 'snd/explosao.mp3'
som_explosao.volume = 0.1;
som_explosao.load();
function Explosao(context, imagem, x, y) {
    this.context = context;
    this.imagem = imagem;
    this.spritesheet = new Spritesheet(context, imagem ,1 , 5)  ;
    this.spritesheet.intervalo = 75;
    this.x= x;
    this.y= y;
    var explosao = this;
    this.spritesheet.fimDoCiclo = function () {
        explosao.animacao.excluirSprite(explosao);
        if (explosao.fimDaExplosao)explosao.fimDaExplosao();
    }
    this.fimDoCiclo = null;
    this.fimDaExplosao = null;

    som_explosao.currentTime = 0.0;
    som_explosao.play();
}
Explosao.prototype = {
    atualizar:function () {

    },
    desenhar:function () {
        this.spritesheet.desenhar(this.x,this.y);
        this.spritesheet.proximoQuadro();


    },

}