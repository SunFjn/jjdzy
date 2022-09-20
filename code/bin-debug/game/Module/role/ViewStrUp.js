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
/** 战力提升 */
var ViewStrUp = (function (_super) {
    __extends(ViewStrUp, _super);
    function ViewStrUp() {
        var _this = _super.call(this) || this;
        _this.lastTime = 0;
        _this.tweenArr = [];
        // public onComp1() {
        // 	this.lbAdd.text = this.numadd + "";
        // 	this.lbAdd.y = 6;
        // 	egret.Tween.get(this.lbAdd).to({ y: this.lbAdd.y - 20 }, 400, egret.Ease.circOut).wait(200).call(this.onComp2, this);
        // }
        _this.alphaArg = { alpha: 0.2 };
        _this.oldValue = 1000;
        return _this;
    }
    ViewStrUp.createInstance = function () {
        return (fairygui.UIPackage.createObject("MainUI", "ViewStrUp"));
    };
    ViewStrUp.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        // this.lbPower = <fairygui.GRichTextField><any>(this.getChild("lbPower"));
        this.lbAdd = (this.getChild("lbAdd"));
        this.comp = new fairygui.GComponent();
        this.addChildAt(this.comp, 0);
        this.touchable = false;
    };
    ViewStrUp.prototype.showText = function (val) {
        egret.Tween.removeTweens(this);
        egret.Tween.removeTweens(this.lbAdd);
        this.oldValue = val;
        this.basePower = Model_player.voMine.str;
        this.lbAdd.text = "";
        // this.lbPower.text = this.basePower + "";
        var now = egret.getTimer();
        this.numadd = val - this.basePower;
        this.numperc = 0;
        this.alpha = 1;
        this.y = fairygui.GRoot.inst.height * 0.65;
        this.x = fairygui.GRoot.inst.width * 0.5;
        EffectMgr.addEff("uieff/" + 10009, this.comp.displayListContainer, 40, 25, 500, 500, false);
        egret.Tween.get(this).to({ numperc: 1 }, 500).wait(800).call(this.onComp, this);
    };
    ViewStrUp.prototype.showEff = function (v) {
        if (v) {
            if (this.effPart) {
                EffectMgr.instance.removeEff(this.effPart);
                this.effPart = null;
            }
            if (this.effPart == null) {
                this.effPart = EffectMgr.addEff("uieff/" + 10009, this.comp.displayListContainer, 40, 25, 500, 500, false);
            }
        }
        else {
            if (this.effPart) {
                EffectMgr.instance.removeEff(this.effPart);
                this.effPart = null;
            }
        }
    };
    ViewStrUp.prototype.onComp2 = function () {
        egret.Tween.get(this).to(this.alphaArg, 600).call(this.onComp, this);
    };
    ViewStrUp.prototype.onComp = function () {
        this.close();
        egret.Tween.removeTweens(this);
        egret.Tween.removeTweens(this.lbAdd);
    };
    Object.defineProperty(ViewStrUp.prototype, "numperc", {
        get: function () {
            return this._numperc;
        },
        set: function (v) {
            this._numperc = v;
            var showvalue = (this.numadd * v + this.basePower) >> 0;
            this.lbAdd.text = String((this.numadd * v) >> 0);
            // this.lbPower.text = String(showvalue);
        },
        enumerable: true,
        configurable: true
    });
    ViewStrUp.prototype.close = function () {
        if (ViewStrUp.instance && ViewStrUp.instance.parent)
            ViewStrUp.instance.parent.removeChild(ViewStrUp.instance);
    };
    ViewStrUp.show = function (val) {
        if (!GGlobal.isEnterGame)
            return;
        if (!this.instance)
            this.instance = this.createInstance();
        this.instance.showText(val);
        GGlobal.layerMgr.UI_Message.addChild(this.instance);
    };
    ViewStrUp.hide = function () {
        if (this.instance.parent)
            GGlobal.layerMgr.UI_Message.removeChild(this.instance);
    };
    ViewStrUp.URL = "ui://7gxkx46wre2a2w";
    return ViewStrUp;
}(fairygui.GComponent));
__reflect(ViewStrUp.prototype, "ViewStrUp");
