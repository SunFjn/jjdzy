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
var CountryBossRnk = (function (_super) {
    __extends(CountryBossRnk, _super);
    function CountryBossRnk() {
        return _super.call(this) || this;
    }
    CountryBossRnk.createInstance = function () {
        return (fairygui.UIPackage.createObject("country", "CountryBossRnk"));
    };
    CountryBossRnk.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.lbRank = (this.getChild("lbRank"));
        this.lbName = (this.getChild("lbName"));
        this.lbLv = (this.getChild("lbLv"));
    };
    CountryBossRnk.prototype.setdata = function (data, rank) {
        this.lbRank.text = "" + (rank + 1);
        this.lbName.text = "" + data.name;
        this.lbLv.text = "" + ConfigHelp.getYiWanText(data.demage);
    };
    CountryBossRnk.URL = "ui://uwzc58njofde2n";
    return CountryBossRnk;
}(fairygui.GComponent));
__reflect(CountryBossRnk.prototype, "CountryBossRnk");
