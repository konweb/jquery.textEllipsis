jquery.textEllipsis
===================

文字数を制限するプラグインです。

###使い方
jQueryを読み込ませます。

```
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<script src="js/jquery.textEllipsis.js"></script>
```

プラグインを発動させる。

```
<script>
	$(function(){
		$(".target1").ellipsis({lines: 2});
		$(".target2").ellipsis({lines: 3});
	});
</script>
```

###option
- `lines` - 制限する文字数
- `afterText` - 末尾に追加する文字 ※デフォルトは「...」

##[Demo](http://konweb.github.io/jquery.textEllipsis/test)
