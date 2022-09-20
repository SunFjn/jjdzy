var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var EffectUtil = (function () {
    function EffectUtil() {
    }
    /**
     *str显示图片
     *parent母体
     *fontStr 字体在fairyGui的url
     *x、y初始的xy轴
     *flyTime播放的时间
     *offx动画x轴偏移
     *offy动画y轴偏移
     *   */
    EffectUtil.addFlyImg = function (str, parent, fontStr, x, y, flyTime, offx, offy) {
        if (flyTime === void 0) { flyTime = 600; }
        if (offx === void 0) { offx = 0; }
        if (offy === void 0) { offy = -60; }
        var img = new flyImgItem();
        img.x = x;
        img.y = y;
        img.showImg(str, fontStr);
        parent.addChild(img);
        egret.Tween.get(img).to({ x: x + offx, y: y + offy, alpha: 0 }, flyTime).call(function () {
            img.removeFromParent();
            img.showImg("", null);
            img = null;
        });
    };
    return EffectUtil;
}());
__reflect(EffectUtil.prototype, "EffectUtil");
var flyImgItem = (function (_super) {
    __extends(flyImgItem, _super);
    function flyImgItem() {
        var _this = _super.call(this) || this;
        _this.touchable = false;
        _this.imgText = new fairygui.GTextField();
        _this.addChild(_this.imgText);
        return _this;
    }
    flyImgItem.prototype.showImg = function (char, fontStr) {
        this.imgText.font = fontStr;
        this.imgText.text = char;
    };
    return flyImgItem;
}(fairygui.GComponent));
__reflect(flyImgItem.prototype, "flyImgItem");
