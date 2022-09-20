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
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var ChildYSBossTip = (function (_super) {
    __extends(ChildYSBossTip, _super);
    function ChildYSBossTip() {
        var _this = _super.call(this) || this;
        _this.update = function (v) {
            _this.lbInfo.text = "剩余可购买的复活次数：" + v;
        };
        return _this;
    }
    ChildYSBossTip.createInstance = function () {
        return ChildYSBossTip._inst || (ChildYSBossTip._inst = (fairygui.UIPackage.createObject("Boss", "ChildYSBossTip")));
    };
    ChildYSBossTip.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
    };
    ChildYSBossTip.prototype.showOrHide = function (v) {
        if (v) {
            this.setXY(0, App.stageHeight - 300);
            GGlobal.layerMgr.UI_MainLowBottom.addChild(this);
        }
        else {
            this.removeFromParent();
        }
    };
    ChildYSBossTip.URL = "ui://47jfyc6ein3b3n";
    return ChildYSBossTip;
}(fairygui.GComponent));
__reflect(ChildYSBossTip.prototype, "ChildYSBossTip");
