<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="format-detection" content="email=no,telephone=no">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
    <title>意见建议</title>
    <style type="text/css">
        body {
            margin: 0;
            font-family: "Helvetica Neue",Helvetica,sans-serif;
            line-height: 1.5;
            color: #3d4145;
            background: #eee;
            font-size: .85rem;
        }




    </style>
</head>

<body>
    <div class="wrap-feedback">
        <form>
            <div class="mb20 round-rect bg-cfff">
                <textarea name="content" rows="6" 
                placeholder="详细描述你的问题或建议，我们将及时跟进解决（建议添加相关问题截图）" maxlength="1000"></textarea>
                <div class="p10">
                    <span class="pic-feedback">
                    <img src="images/blue/icon_plugs.png" alt="添加图片" class="w100 block">
                    </span>
                    <span class="ineline-block f12 c999 ml10"></span>
                    <input type="hidden" name="fid" class="js-feedback-pic">
                </div>
            </div>

            <input type="tel" name="mobile" class="input-text js-mobile hide mb20 p10 f16 text-feedback" maxlength="11" placeholder="手机号（必填，方便我们联系你）">
            <input type="submit" value="提交" class="button button-fill button-big">
        </form>
    </div>
</body>
</html>