
function Nave(context, teclado, imagem, imgExplosao) {
    this.context = context;
    this.teclado= teclado;
    this.imagem = imagem;
    this.x = 300;
    this.y = 300;
    this.velocidade = 0;
    this.pontosVida = 3;
    this.spritesheet = new Spritesheet(context, imagem, 3 , 2);
    this.spritesheet.linha = 0;
    this.spritesheet.intervalo = 100;
    this.imgExplosao = imgExplosao;
}

Nave.prototype = {
    atualizar: function(){

        var incremento = this.velocidade * this.animacao.decorrido / 1000;
        if (this.teclado.pressionada(SETA_ESQUERDA) && this.x > 0)
            this.x-= incremento;

        if (this.teclado.pressionada(SETA_DIREITA) && this.x < this.context.canvas.width - 36)
            this.x += incremento;

        if (this.teclado.pressionada(SETA_CIMA) && this.y > 0)
            this.y-= incremento;

        if (this.teclado.pressionada(SETA_BAIXO) && this.y < this.context.canvas.height - 48)
            this.y += incremento;

    },
    desenhar: function (){
        if (this.teclado.pressionada(SETA_ESQUERDA))
            this.spritesheet.linha = 1;
        if (this.teclado.pressionada(SETA_DIREITA))
            this.spritesheet.linha = 2;
        else
            this.spritesheet.linha = 0;

        this.spritesheet.desenhar(this.x, this.y);
        this.spritesheet.proximoQuadro();
    },
    atirar: function(){
        var t = new Tiro(this.context, this);
        this.animacao.novoSprite(t);
        this.colisor.novoSprite(t);
    },
    retangulosColisao:function (){
        var rets = [
            {x: this.x+2, y: this.y+19, largura: 9 , altura: 13},
            {x: this.x+13, y: this.y+3, largura: 10 , altura: 33},
            {x: this.x+25, y: this.y+19, largura: 9 , altura: 13}
        ];

        var ctx = this.context;

        for (var i in rets){
            ctx.save();
            ctx.strokeStyle='yellow';
            ctx.strokeRect(rets[i].x ,rets[i].y , rets[i].largura, rets[i].altura);

            ctx.restore();

        }
        return rets;
    },
    colidiuCom: function (outro) {

        if (outro instanceof Ovni){
            this.pontosVida--;
            this.animacao.excluirSprite(outro);
            this.colisor.excluirSprite(outro);


                var exp1 = new Explosao(this.context, this.imgExplosao, this.x , this.y);
                var exp2 = new Explosao(this.context, this.imgExplosao, outro.x , outro.y);

                this.animacao.novoSprite(exp1);
                this.animacao.novoSprite(exp2);

                exp1.fimDaExplosao = function () {

                    this.animacao.desligar();
                    alert(' GAME OVER!')
                }
        }

    }
}