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
var VCrossKingReport = (function (_super) {
    __extends(VCrossKingReport, _super);
    function VCrossKingReport() {
        return _super.call(this) || this;
    }
    VCrossKingReport.createInstance = function () {
        return (fairygui.UIPackage.createObject("crossKing", "VCrossKingReport"));
    };
    VCrossKingReport.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.lbLog = (this.getChild("lbLog"));
        this.imgUp = (this.getChild("imgUp"));
        this.imgDown = (this.getChild("imgDown"));
    };
    Object.defineProperty(VCrossKingReport.prototype, "vo", {
        set: function (v) {
            var log = "";
            if (v.batRes == 0) {
                this.lbLog.color = Color.GREENINT;
                log += "战胜了";
            }
            else {
                this.lbLog.color = Color.REDINT;
                log += "不敌";
            }
            log += "<font color='#10acf5'>" + v.name + "</font>";
            if (v.rank == 1) {
                log += "，排名上升 ";
            }
            else if (v.rank == 2) {
                log += "，排名下降 ";
            }
            this.imgUp.visible = false;
            this.imgDown.visible = false;
            if (v.isUp == 1) {
                this.imgUp.visible = true;
            }
            else if (v.isUp == 2) {
                this.imgDown.visible = true;
            }
            this.lbLog.text = log;
        },
        enumerable: true,
        configurable: true
    });
    VCrossKingReport.URL = "ui://me1skowlhfct3w";
    return VCrossKingReport;
}(fairygui.GComponent));
__reflect(VCrossKingReport.prototype, "VCrossKingReport");
