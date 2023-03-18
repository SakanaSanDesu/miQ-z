//https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Classes
class Notes{
    tempo = 100;
    score = [];
    maxSound = 0;
    maxLength = 0;

    constructor(tempo) {
        this.tempo = tempo;
    }
    /**
    * @summary テキストの内容を変換する
    * @argument {score} テキスト，これを変換する
    */
    convertText(score){
        var rows = score.split(/\n/);
        for(var [index,row] of rows.entries()){
            this.score.push(row.split(","));
        }
        //maxSound,maxLengthを求める
        this.maxLength = this.score.length
        for(var i =0;i < this.score.length;i++){
            if(this.score[i].length > this.maxSound){
                this.maxSound = this.score[i].length
            }
        }
    }
    extendConvertText(score){
        this.convertText(score);

        for(var i = 0;i < this.maxLength;i++){
            for(var j = 0;j < this.maxSound;j++){
                this.score[i][j] = this.convertNote(this.score[i][j]);
            }
        }
    }
    
    convertNote(note){
        try{
            var oneNote = note.split('_');
        }catch(e){
            return "";
        }
        if(this.isCord(oneNote[0])){
            if(oneNote.length == 1){
                oneNote.push(1);
            }else if(oneNote.length==2){
                oneNote[1] = Number(oneNote[1]);
            }else{
                return "";
            }
            return oneNote;
        }else{
            return "";
        }
    }

    /**
     * @summary 入力されたものがコードとして認識できるか
     * 構文解析？
     * @argument {code} 文字列 
     * @returns {boolean} コードとして認識できたか
     */
    isCord(code){
        return ('C'.charCodeAt(0)<=code.charCodeAt(0)&&code.charCodeAt(0) <='G'.charCodeAt(0))&& ('0'.charCodeAt(0)<=code.charCodeAt(1)&&code.charCodeAt(1) <='8'.charCodeAt(0));
    }


    /**
     * @summary 楽譜をリセットする
     */
    resetScore(){
        this.score=[];
    }
    getScore(){
        return this.score;
    }
    getScoreLength(i){
        return this.score[i].length;
    }
    getTempo(){
        return this.tempo;
    }
    getMaxLength(){
        return this.maxLength;
    }
    getMaxSound(){
        return this.maxSound;
    }
}