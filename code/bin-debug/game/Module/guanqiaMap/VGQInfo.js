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
var VGQInfo = (function (_super) {
    __extends(VGQInfo, _super);
    function VGQInfo() {
        var _this = _super.call(this) || this;
        _this.PROG_WIDTH = 103;
        return _this;
    }
    VGQInfo.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
        this.addClickListener(function () { ViewGQDetail.trytoOpen(); }, this);
    };
    VGQInfo.prototype.setData = function (value) {
        var self = this;
        var curGQ = GGlobal.modelGuanQia.curGuanQiaLv;
        var infoArr = JSON.parse(value.guanqia);
        var low = infoArr[0][0], max = infoArr[0][1];
        var maxLen = max - low + 1;
        self.bar.value = Math.min((curGQ - low + 1), maxLen);
        self.bar.max = maxLen;
        IconUtil.setImg(this.iconMap, "resource/image/guanqia/" + value.tupian + ".png");
        this.txtFinProg.text = value.mingcheng + "\u3010" + value.ID + "-" + Math.min((curGQ - low + 1), maxLen) + "\u3011";
        this.iconNot.visible = GGlobal.modelGuanQia.guanQiaNot();
    };
    VGQInfo.prototype.clean = function () {
        IconUtil.setImg(this.iconMap, null);
    };
    VGQInfo.URL = "ui://r92dp953h0zq1w";
    return VGQInfo;
}(fairygui.GComponent));
__reflect(VGQInfo.prototype, "VGQInfo");
