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
  * - lines {Int} : 何行制御にするか
  * @method option
  */
  op = $.extend({
    afterText : "..."
  },op);

  return this.each(function(){
    var $this = $(this);

    ({
      init : function(){
        var text = $this.html(),
            textNum = text.length,
            textCutNum = textNum,
            afterTextNum = op.afterText.length,
            lower, upper,
            line_height = this.lineHeight() * op.lines,
            bite_size,
            bite;

        if($this.height() < this.lineHeight() * op.lines){
          return false;
        }

        lower = 0;
        upper = textNum - 1;
        while (lower <= upper) {
          bite_size = lower + ((upper - lower) >> 1);

          bite = this.textTrim(text, textNum - bite_size, op.afterText, 0);
          $this.html(bite);

          /* Check for overflow. */
          if ($this.height() > line_height) {
            upper = bite_size - 1;
          }
          else {
            lower = bite_size + 1;
          }
        }
      },

      lineHeight : function(){
        var floats = $this.css('float'),
            position = $this.css('position'),
            padding = $this.css('padding'),
            html = $this.html(),
            wrapper_id = 'line-height-test',
            line_height;

        $this.css('padding', 0);

        if (floats !== 'none') {
          $this.css('float', 'none');
        }

        if (position === 'absolute') {
          $this.css('position', 'static');
        }

        /* Set the content to a small single character and wrap. */
        $this.html('i').wrap('<div id="' + wrapper_id + '" />');

        /* Calculate the line height by measuring the wrapper.*/
        line_height = $('#' + wrapper_id).innerHeight();
        $('#' + wrapper_id).find("p").append("ddd");

        /* Remove the wrapper and reset the style/content. */
        $this.html(html).css({
          'padding': padding,
          // 'float': floats,
          'position': position
        }).unwrap();

        return line_height;
      },

      textTrim : function(str, bite_size, fill, roop){
        var length = str.length;

        if (bite_size === 0) {
          return str;
        }
        return $.trim(str.substr(0, length - bite_size)) + fill;
      }
    }).init();
  });
}