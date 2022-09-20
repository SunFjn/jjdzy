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
var WDTXMapNamePanel = (function (_super) {
    __extends(WDTXMapNamePanel, _super);
    function WDTXMapNamePanel() {
        return _super.call(this) || this;
    }
    WDTXMapNamePanel.createInstance = function () {
        if (!this.ins)
            this.ins = (fairygui.UIPackage.createObject("wendingTX", "WDTXMapNamePanel"));
        return this.ins;
    };
    WDTXMapNamePanel.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.n0 = (this.getChild("n0"));
        this.n1 = (this.getChild("n1"));
        this.lbMapName = (this.getChild("lbMapName"));
    };
    WDTXMapNamePanel.prototype.show1 = function () {
        this.lbMapName.text = GGlobal.modelWenDingTX.layer + "";
        GGlobal.layerMgr.UI_Message.addChild(this);
        this.setXY((fairygui.GRoot.inst.width - this.width) >> 1, fairygui.GRoot.inst.height >> 1);
        Timer.instance.callLater(this.hide1, 1500, this);
    };
    WDTXMapNamePanel.prototype.hide1 = function () {
        this.removeFromParent();
    };
    WDTXMapNamePanel.URL = "ui://gxs8kn67hocl15";
    return WDTXMapNamePanel;
}(fairygui.GComponent));
__reflect(WDTXMapNamePanel.prototype, "WDTXMapNamePanel");
