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
var View_SGYT_LastRank = (function (_super) {
    __extends(View_SGYT_LastRank, _super);
    function View_SGYT_LastRank() {
        return _super.call(this) || this;
    }
    View_SGYT_LastRank.createInstance = function () {
        return (fairygui.UIPackage.createObject("sanGuoYiTong", "View_SGYT_LastRank"));
    };
    View_SGYT_LastRank.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.frame = (this.getChild("frame"));
        this.item = (this.getChild("item"));
    };
    View_SGYT_LastRank.URL = "ui://z4ijxlqkiv4oi";
    return View_SGYT_LastRank;
}(fairygui.GComponent));
__reflect(View_SGYT_LastRank.prototype, "View_SGYT_LastRank");
