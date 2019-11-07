'use strict';
const userNameInput = document.getElementById('user-name');
const authorInput = document.getElementById('author');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');


assessmentButton.onclick = () => {
  const userName = userNameInput.value;
  const author = authorInput.value;
  if (userName.length === 0 || author.length === 0) {//名前が空の時は処理を終了する
  return;
} 

//enterキーで診断する
userNameInput.onkeydown = (event) => {
  if (event.key === 'Enter') {
    assessmentButton.onclick();
  }
}


/**
 * 指定した要素の子どもを全て削除する
 * @param {HTMLElement} element HTML の要素
 */
function removeAllChildren(element) {
  while (element.firstChild) {　// 子どもの要素があるがあるかぎり削除
    element.removeChild(element.firstChild);
  }
}

  


const answers = [
  '{userName}に贈る古典小説の引用は、吾輩は猫である。名前はまだない「吾輩は猫である」夏目漱石',
  '{userName}に贈る古典小説の引用は、「……お兄さま。お兄さま。お兄さまお兄さまお兄さまお兄さまお兄さま。……モウ一度……今のお声を……聞かせてエーーッ…………」「ドグラ・マグラ」夢野久',
  '{userName}に贈る古典小説の引用は、あさ、眼をさますときの気持は、面白い。「女生徒」太宰治',
  '{userName}に贈る古典小説の引用は、「けれどもほんとうのさいわいは一体何だろう。」「銀河鉄道の夜」宮沢賢治',
];




//TODO 診断結果表示エリアの作成
removeAllChildren(resultDivided);
const header = document.createElement('h3');
header.innerText = '結果';
resultDivided.appendChild(header);

const paragraph = document.createElement('p');
const result = assessment(userName);
paragraph.innerText = result;
resultDivided.appendChild(paragraph);
// TODO ツイートエリアの作成
removeAllChildren(tweetDivided);
const anchor = document.createElement('a');
const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag='
 + encodeURIComponent('あなたに贈る古典小説の引用')
 + '&ref_src=twsrc%5Etfw';

anchor.setAttribute('href', hrefValue);
anchor.className = 'twitter-hashtag-button';
anchor.setAttribute('data-text', result);
anchor.innerText = 'Tweet #あなたに贈る古典小説の引用';

tweetDivided.appendChild(anchor);

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */
function assessment(userName)  {

// 文字のコード番号の合計を回答の数で割って添字の数値を求let sumOfCharCode = 0;
let sumOfCharCode = 0
const index = sumOfCharCode % answers.length;
let result = answers[index];

  if (author === "夏目漱石" || author === "夏目") {
   result = answers[0];
   result = result.replace(/\{userName\}/g, userName);
   return result;
 }else if (author === "夢野久作"　|| author === "夢野") {
   result = answers[1];
   result = result.replace(/\{userName\}/g, userName);
   return result;
 }else if (author === "太宰治"　|| author === "太宰"){
    result =answers[2];
    result = result.replace(/\{userName\}/g, userName);
    return result;
 }else if (author === "宮沢賢治"　||　author === "賢治"){
   result = answers[3];
   result = result.replace(/\{userName\}/g, userName);
   return result;
 }else {
 // 全文字のコード番号を取得してそれを足し合わせる

 for (let i = 0; i < userName.length; i++) {
   sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
 }
 result = result.replace(/\{userName\}/g, userName);
 return result;
}
}


//widget.js の設定
const script = document.createElement('script');
script.setAttribute('src','https://platform.twitter.com/widgets.js');
tweetDivided.appendChild(script);}
