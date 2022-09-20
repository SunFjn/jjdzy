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
var Child_SGYT_CountryRank = (function (_super) {
    __extends(Child_SGYT_CountryRank, _super);
    function Child_SGYT_CountryRank() {
        return _super.call(this) || this;
    }
    Child_SGYT_CountryRank.createInstance = function () {
        return (fairygui.UIPackage.createObject("sanGuoYiTong", "Child_SGYT_CountryRank"));
    };
    Child_SGYT_CountryRank.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.item0 = (this.getChild("item0"));
        this.item1 = (this.getChild("item1"));
        this.item2 = (this.getChild("item2"));
        this.countryLb = (this.getChild("countryLb"));
    };
    Child_SGYT_CountryRank.URL = "ui://z4ijxlqkiv4oq";
    return Child_SGYT_CountryRank;
}(fairygui.GComponent));
__reflect(Child_SGYT_CountryRank.prototype, "Child_SGYT_CountryRank");
