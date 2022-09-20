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
var ChongZhiItem = (function (_super) {
    __extends(ChongZhiItem, _super);
    function ChongZhiItem() {
        var _this = _super.call(this) || this;
        _this.lastT = 0;
        _this.ids = 0;
        return _this;
    }
    ChongZhiItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("chongzhi", "ChongZhiItem"));
    };
    ChongZhiItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        s.lbYB = (s.getChild("lbYB"));
        s.lbRMB = (s.getChild("lbRMB"));
        s.mulIcon = (s.getChild("mulIcon"));
        s.imgBox = (s.getChild("imgBox"));
        s.lbCount = (s.getChild("lbCount"));
        s.g0 = (s.getChild("g0"));
        s.addClickListener(s.clickHand, s);
    };
    ChongZhiItem.prototype.clickHand = function () {
        var now = egret.getTimer();
        if (now - this.lastT < 1000) {
            return;
        }
        this.lastT = now;
        GGlobal.modelchongzhi.CG_CHONGZHI_135(this.ids);
    };
    ChongZhiItem.prototype.setdata = function (d, i) {
        var s = this;
        s.ids = i + 1;
        var lib = Config.chongzhi_716[s.ids];
        s.lbRMB.text = lib.RMB + "n";
        var isMul = d[1] == 0;
        if (isMul) {
            s.lbYB.text = (Number(lib.COIN) * 5) + "";
        }
        else {
            s.lbYB.text = lib.COIN + "";
        }
        s.imgBox.url = fairygui.UIPackage.getItemURL("chongzhi", "yuanbao" + lib.pic);
        s.lbCount.text = d[1] + "";
        s.mulIcon.visible = isMul;
        s.g0.visible = !isMul;
    };
    ChongZhiItem.URL = "ui://42zxp7qjnvyw1";
    return ChongZhiItem;
}(fairygui.GComponent));
__reflect(ChongZhiItem.prototype, "ChongZhiItem");
