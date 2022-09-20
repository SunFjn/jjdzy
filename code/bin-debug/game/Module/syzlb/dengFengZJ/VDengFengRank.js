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
var VDengFengRank = (function (_super) {
    __extends(VDengFengRank, _super);
    function VDengFengRank() {
        return _super.call(this) || this;
    }
    VDengFengRank.createInstance = function () {
        return (fairygui.UIPackage.createObject("syzlb", "VDengFengRank"));
    };
    VDengFengRank.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
        s.list.callbackThisObj = s;
        s.list.itemRenderer = s.renderRew;
    };
    VDengFengRank.prototype.setVo = function (v, type, rank) {
        var s = this;
        var m = GGlobal.modelDengFengZJ;
        var dat = m.rankDat[rank - 1];
        s.lbName.text = dat ? dat.name : "";
        s.lbPoint.text = dat ? "积分：" + dat.point : "";
        s.imgNO.visible = dat ? false : true;
        if (rank < 4) {
            s.img.url = CommonManager.getCommonUrl("rank_" + rank);
            s.img.visible = true;
            s.lb.text = "";
        }
        else {
            s.img.visible = false;
            s.lb.text = rank + "";
        }
        s.lisDat = ConfigHelp.makeItemListArr(JSON.parse(v.reward));
        s.list.numItems = s.lisDat.length;
    };
    VDengFengRank.prototype.renderRew = function (index, obj) {
        obj.tipEnabled = true;
        obj.isShowEff = true;
        obj.vo = this.lisDat[index];
    };
    VDengFengRank.prototype.clean = function () {
        this.list.numItems = 0;
    };
    VDengFengRank.URL = "ui://3o8q23uua0u32b";
    return VDengFengRank;
}(fairygui.GComponent));
__reflect(VDengFengRank.prototype, "VDengFengRank");
