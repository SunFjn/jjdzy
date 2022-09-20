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
var ViewBattlePrompt = (function (_super) {
    __extends(ViewBattlePrompt, _super);
    function ViewBattlePrompt() {
        return _super.call(this) || this;
    }
    ViewBattlePrompt.createInstance = function () {
        if (!ViewBattlePrompt._instance) {
            ViewBattlePrompt._instance = (fairygui.UIPackage.createObject("common", "ViewBattlePrompt"));
        }
        return ViewBattlePrompt._instance;
    };
    ViewBattlePrompt.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.label = (this.getChild("label"));
    };
    ViewBattlePrompt.prototype.show = function (times) {
        this.label.text = times + "秒后挑战失败";
        this.resetPosition();
    };
    ViewBattlePrompt.prototype.resetPosition = function () {
        this.setXY((fairygui.GRoot.inst.width - this.width) / 2, fairygui.GRoot.inst.height - 360 - this.height);
    };
    ViewBattlePrompt.show = function (times) {
        var ui = ViewBattlePrompt.createInstance();
        if (ui.parent) {
            if (times <= 0) {
                ui.removeFromParent();
            }
            else {
                ui.show(times);
            }
        }
        else {
            if (times > 0) {
                GGlobal.layerMgr.UI_MainBottom.addChild(ui);
                ui.show(times);
            }
        }
    };
    ViewBattlePrompt.URL = "ui://jvxpx9emruw93as";
    return ViewBattlePrompt;
}(fairygui.GComponent));
__reflect(ViewBattlePrompt.prototype, "ViewBattlePrompt");
