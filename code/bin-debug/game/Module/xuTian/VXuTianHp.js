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
var VXuTianHp = (function (_super) {
    __extends(VXuTianHp, _super);
    function VXuTianHp() {
        var _this = _super.call(this) || this;
        _this.TWEENARG3 = {};
        _this.imgText = new fairygui.GTextField();
        _this.addChild(_this.imgText);
        _this.imgText1 = new fairygui.GTextField();
        _this.addChild(_this.imgText1);
        _this.imgText1.setXY(-137, -44);
        return _this;
    }
    VXuTianHp.create = function () {
        var pool = VXuTianHp.POOL;
        if (pool.length) {
            return pool.shift();
        }
        return new VXuTianHp();
    };
    VXuTianHp.prototype.init = function (x, y, dmg, iscrit, isHit, isLianJi, isShield) {
        if (iscrit === void 0) { iscrit = false; }
        if (isHit === void 0) { isHit = false; }
        if (isLianJi === void 0) { isLianJi = false; }
        if (isShield === void 0) { isShield = false; }
        var s = this;
        s.imgText1.visible = false;
        var text = "";
        if (!isHit) {
            text = "z";
            s.imgText.font = "ui://jvxpx9emog7992";
        }
        else if (iscrit) {
            text = "" + dmg;
            if (isShield) {
                s.imgText.font = "ui://jvxpx9emrzhj3eu";
                s.imgText1.font = "ui://jvxpx9emrzhj3eu";
                s.imgText1.text = "D";
                s.imgText1.visible = true;
            }
            else {
                s.imgText.font = "ui://jvxpx9emog799d";
                if (isLianJi) {
                    s.imgText1.text = "L";
                    s.imgText1.font = "ui://jvxpx9emog7992";
                }
                else {
                    s.imgText1.text = "t";
                    s.imgText1.font = "ui://jvxpx9emog799d";
                }
                s.imgText1.visible = true;
            }
        }
        else {
            text = "" + dmg;
            if (isShield) {
                s.imgText.font = "ui://jvxpx9emrzhj3eu";
                s.imgText1.font = "ui://jvxpx9emrzhj3eu";
                s.imgText1.text = "D";
                s.imgText1.visible = true;
            }
            else {
                if (isLianJi) {
                    s.imgText1.text = "L";
                    s.imgText1.visible = true;
                    s.imgText1.font = "ui://jvxpx9emog7992";
                }
                s.imgText.font = "ui://jvxpx9emog7992";
            }
        }
        s.imgText.text = text;
        s.x = x + MathUtil.rndNum(-40, 40);
        s.y = y + MathUtil.rndNum(-40, 40);
        s.alpha = 1;
        var arg3 = s.TWEENARG3;
        arg3.x = s.x + 50;
        arg3.alpha = 0;
        egret.Tween.get(s)
            .to(SceneHpView.TWEENARG1, 150, egret.Ease.sineIn)
            .to(SceneHpView.TWEENARG2, 100, egret.Ease.sineOut)
            .to({ y: s.y - 50 }, 400, egret.Ease.sineIn)
            .to(arg3, 500, egret.Ease.sineIn)
            .call(s.onComp, s);
    };
    VXuTianHp.prototype.onAdd = function (pa) {
        var self = this;
        self.scaleX = self.scaleY = 1;
        pa.addChild(self);
    };
    VXuTianHp.prototype.onRemove = function () {
        egret.Tween.removeTweens(this);
        this.parent.removeChild(this);
        VNianShouHp.POOL.push(this);
    };
    VXuTianHp.prototype.onComp = function () {
        this.onRemove();
    };
    VXuTianHp.POOL = [];
    return VXuTianHp;
}(fairygui.GComponent));
__reflect(VXuTianHp.prototype, "VXuTianHp");
