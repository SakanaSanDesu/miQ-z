var synth=[];
var notes;

/**
 * 
 * @param {int} time 送らす時間
 * @returns 
 */
function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}
/**
 * @summary 実際に音を鳴らす
 * @param {int} i 縦
 * @param {int} j 横
 * @param {int} code　鳴らすコード 
 */
async function output(i,j,code){
    synth[i][j].triggerAttackRelease(code);
    await delay(300);
    synth[i][j].triggerRelease();
}
/**
 * @summary 実際に音を鳴らす
 * @param {int} i 縦
 * @param {int} j 横
 * @param {int} code　鳴らすコード 
 */
async function outputWithLength(i,j,code,length){
    synth[i][j].triggerAttackRelease(code);
    await delay((length-0.1)*60000/notes.getTempo());
    synth[i][j].triggerRelease();
}
/**
 * @summary 音を鳴らすi,j機械の電源を切る
 * @param {int} i 
 * @param {int} j 
 */
function end(i,j){
    console.log("end");
    synth[i][j].triggerRelease();
}
/**
 * @summary すべての電源を切る
 * @param {int} maxL 
 * @param {int} maxS 
 */
function endAll(maxL,maxS){
    for(i = 0;i < maxL;i++){
        for(j = 0;j < maxS;j++){
            end(i,j);
        }
    }
}
/**
 * @summary 音が鳴る機械？を引数の値の掛け算分用意
 * @param {int} maxLength 
 * @param {int} maxSound 
 */
function prepareSynth(maxLength,maxSound){
    synth = new Array(maxLength);
    for(var y = 0; y < synth.length; y++) {
        synth[y] = new Array(maxSound).fill(1); //配列(array)の各要素に対して、要素数5の配列を作成し、0で初期化
    }
    // console.log(synth);
    for(i = 0;i < maxLength;i++){
        for(j = 0; j < maxSound;j++){
            synth[i][j] = new Tone.Synth({
                // 発振器の設定
                oscillator:{type:"triangle8"},
                // エンベロープ(包絡線)の設定
                envelope:{
                    attack:0.005,  // 最大音量アタック・レベル(Attack Level)に達する時間
                    decay:0.1,     // 一定音量まで減衰(Decay)する時間
                    sustain:0.4,   // 一定振幅(Sustain Level)が続く時間
                    release:2      // 音が消えるまでの時間
                }
            }).toMaster();
        }
    }
}
/**
 * @summary　テキストを読んでそれらをNotesに入れる
 */
function readTextArea(){
    tempo = document.getElementById("tempo").value;
    textArea = document.getElementById("code");
    notes = new Notes(Number(tempo));

    notes.resetScore();
    notes.convertText(textArea.value);
    prepareSynth(notes.getMaxLength(),notes.getMaxSound());
    endAll(notes.getMaxLength(),notes.getMaxSound());
}

function readTextArea2(){
    tempo = document.getElementById("tempo").value;
    textArea = document.getElementById("code");
    notes = new Notes(Number(tempo));

    notes.resetScore();
    notes.extendConvertText(textArea.value);
    prepareSynth(notes.getMaxLength(),notes.getMaxSound());
    endAll(notes.getMaxLength(),notes.getMaxSound());
}
/**
 * @summary 実際にNotesの中の楽譜を読んで演奏する
 * notesに依存しまくっているのでよく変わる
 */
async function play(){
    isSafe = document.getElementById("expert").checked;
    for(i =  0;i < notes.getMaxLength();i++){
        for(j = 0;j < notes.getScoreLength(i);j++){
            if(isSafe){
                if(notes.isCord(notes.getScore()[i][j])){
                    output(i,j,notes.getScore()[i][j]);
                }
            }else{
                if(notes.getScore()[i][j]!=""){
                    output(i,j,notes.getScore()[i][j]);
                }
            }
        }
        await delay(60000/notes.getTempo());
    }
}
async function extendPlay(){
    isSafe = document.getElementById("expert").checked;
    for(i =  0;i < notes.getMaxLength();i++){
        console.log(notes.getScore()[i]);
        for(j = 0;j < notes.getScoreLength(i);j++){
            outputWithLength(i,j,notes.getScore()[i][j][0],notes.getScore()[i][j][1]);
        }
        await delay(60000/notes.getTempo());
    }
}