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
var ViewJingShengPrompt = (function (_super) {
    __extends(ViewJingShengPrompt, _super);
    function ViewJingShengPrompt() {
        var _this = _super.call(this) || this;
        _this.childrenCreated();
        return _this;
    }
    ViewJingShengPrompt.prototype.childrenCreated = function () {
        var a = this;
        a.view = fairygui.UIPackage.createObject("rebirth", "ViewJingShengPrompt").asCom;
        a.contentPane = a.view;
        a.maskSp = (a.view.getChild("maskSp"));
        a.effImg = (a.view.getChild("effImg"));
        a.rankLb = (a.view.getChild("rankLb"));
        a.moneyLb0 = (a.view.getChild("moneyLb0"));
        a.moneyLb1 = (a.view.getChild("moneyLb1"));
        a.n12 = (a.view.getChild("n12"));
        a.t0 = a.view.getTransition("t0");
        a.effImg.mask = a.maskSp.displayObject;
        _super.prototype.childrenCreated.call(this);
    };
    ViewJingShengPrompt.prototype.onShown = function () {
        var a = this;
        var cfg = Config.up_231[Model_JinSheng.level];
        this.rankLb.text = "恭喜晋升达到" + HtmlUtil.fontNoSize(cfg.pin + cfg.name, Color.getColorStr(2));
        var rewardArr = ConfigHelp.makeItemListArr(JSON.parse(cfg["reward"]));
        a.moneyLb1.visible = false;
        a.n12.visible = false;
        if (Model_GlobalMsg.kaifuDay <= 7 && cfg["time"] != "0") {
            a.moneyLb0.text = rewardArr[0].count + " +";
            var rewardArr1 = ConfigHelp.makeItemListArr(JSON.parse(cfg["time"]));
            a.moneyLb1.visible = true;
            a.n12.visible = true;
            a.moneyLb1.text = rewardArr1[0].count + "";
        }
        else {
            a.moneyLb0.text = rewardArr[0].count + "";
        }
        GGlobal.layerMgr.UI_Popup.addEventListener(egret.TouchEvent.TOUCH_BEGIN, a.doHideAnimation, a);
    };
    ViewJingShengPrompt.prototype.onHide = function () {
        GGlobal.layerMgr.close(UIConst.JINSHENG_PROMPT);
        GGlobal.layerMgr.UI_Popup.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.doHideAnimation, this);
    };
    ViewJingShengPrompt.URL = "ui://dllc71i9myon1i";
    return ViewJingShengPrompt;
}(UIModalPanel));
__reflect(ViewJingShengPrompt.prototype, "ViewJingShengPrompt");
