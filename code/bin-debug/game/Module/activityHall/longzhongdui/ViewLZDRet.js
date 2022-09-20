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
var ViewLZDRet = (function (_super) {
    __extends(ViewLZDRet, _super);
    function ViewLZDRet() {
        var _this = _super.call(this) || this;
        _this.openTime = 0;
        return _this;
    }
    ViewLZDRet.createInstance = function () {
        if (!this.instance) {
            this.instance = (fairygui.UIPackage.createObject("activityHall", "ViewLZDRet"));
        }
        return this.instance;
    };
    ViewLZDRet.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.n3 = (this.getChild("n3"));
        this.lbTitle = (this.getChild("lbTitle"));
        this.lbScore = (this.getChild("lbScore"));
        this.setXY((fairygui.GRoot.inst.width - this.width) >> 1, (fairygui.GRoot.inst.height - this.height) >> 1);
    };
    ViewLZDRet.showView = function (arr) {
        var ins = ViewLZDRet.createInstance();
        if (!ins.parent) {
            GGlobal.layerMgr.UI_Popup.addChild(ins);
        }
        ins.onOpenView(arr);
    };
    ViewLZDRet.prototype.onOpenView = function (arr) {
        if (arr) {
            var urls = arr[0] == 1 ? "ui://1xydor24oc0jv" : "ui://1xydor24oc0jw";
            this.lbTitle.url = urls;
            this.lbScore.text = "增加" + arr[1] + "积分";
        }
        this.openTime = egret.getTimer() + 3000;
        Timer.instance.listen(this.onCloseHD, this, 1000);
    };
    ViewLZDRet.prototype.onCloseHD = function () {
        if (egret.getTimer() < this.openTime)
            return;
        ViewLZDRet.createInstance().removeFromParent();
        Timer.instance.remove(this.onCloseHD, this);
    };
    ViewLZDRet.URL = "ui://1xydor24n7ie3";
    return ViewLZDRet;
}(fairygui.GComponent));
__reflect(ViewLZDRet.prototype, "ViewLZDRet");
