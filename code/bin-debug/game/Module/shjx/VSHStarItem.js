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
var VSHStarItem = (function (_super) {
    __extends(VSHStarItem, _super);
    function VSHStarItem() {
        return _super.call(this) || this;
    }
    VSHStarItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("shouhunJX", "VSHStarItem"));
    };
    VSHStarItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.imgBg = (this.getChild("imgBg"));
        this.imgStar = (this.getChild("imgStar"));
        this.lb = (this.getChild("lb"));
    };
    VSHStarItem.prototype.setVo = function (id, time, cur) {
        this.lb.text = time + "次";
        if (cur >= time) {
            this.imgBg.url = "ui://4aepcdbwl5k54l"; //亮
        }
        else {
            this.imgBg.url = "ui://4aepcdbwl5k54m"; //暗
        }
        // 
        this.imgStar.url = CommonManager.getUrl("shouhunJX", id + "star");
    };
    VSHStarItem.URL = "ui://4aepcdbwl5k54d";
    return VSHStarItem;
}(fairygui.GComponent));
__reflect(VSHStarItem.prototype, "VSHStarItem");
