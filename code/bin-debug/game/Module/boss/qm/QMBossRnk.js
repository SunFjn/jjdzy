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
var QMBossRnk = (function (_super) {
    __extends(QMBossRnk, _super);
    function QMBossRnk() {
        return _super.call(this) || this;
    }
    QMBossRnk.createInstance = function () {
        return (fairygui.UIPackage.createObject("Boss", "QMBossRnk"));
    };
    QMBossRnk.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.lbRank = (this.getChild("lbRank"));
        this.lbName = (this.getChild("lbName"));
        this.lbLv = (this.getChild("lbLv"));
    };
    QMBossRnk.prototype.setdata = function (data) {
        this.lbRank.text = "" + data[0];
        this.lbName.text = "" + data[1];
        this.lbLv.text = "" + ConfigHelp.getYiWanText(data[2]);
    };
    QMBossRnk.URL = "ui://47jfyc6egs0du";
    return QMBossRnk;
}(fairygui.GComponent));
__reflect(QMBossRnk.prototype, "QMBossRnk");
