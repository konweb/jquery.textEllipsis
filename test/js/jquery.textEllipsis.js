/**
##文字数を制限するプラグイン
###option
- limit : 制御する文字数
- afterText : 末尾に追加する

@class 文字数制限プラグイン
*/

$.fn.ellipsis = function(op){
  /**
  * optionです。
  * - afterText {String} : 語尾に追加される文字
  * - limit {Int} : 何文字制御にするか
  * @method option
  */
  op = $.extend({
    afterText : "..."
  },op);

  return this.each(function(e){
    var $this;
    $this = $(this);

    var i,
        text = $this.text().trim(),
        textNum = text.length,
        textCutNum = textNum,
        afterTextNum = op.afterText.length;

    if(op.limit < textNum){
      for(i = 0;i < textNum;i++){
        textCut = text.substr(0,textCutNum-1);

        //指定文字数に達したらループを停止
        if(op.limit == textCutNum){
          //末尾に足す分を引く
          textCut = text.substr(0,textCutNum-afterTextNum);
          break;
        }

        textCutNum--;
        $this.html(textCut+op.afterText);
      }
    }
  });
}