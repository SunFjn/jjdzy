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
var ItemActComDbZpLabel = (function (_super) {
    __extends(ItemActComDbZpLabel, _super);
    function ItemActComDbZpLabel() {
        return _super.call(this) || this;
    }
    ItemActComDbZpLabel.createInstance = function () {
        return (fairygui.UIPackage.createObject("actComDBZP", "ItemActComDbZpLabel"));
    };
    ItemActComDbZpLabel.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.lb = (this.getChild("lb"));
        this.lb.color = 0xffffff;
    };
    ItemActComDbZpLabel.prototype.setText = function (str) {
        this.lb.text = str;
    };
    ItemActComDbZpLabel.prototype.reScroll = function () {
        this.scrollPane.setPercY(0);
        ;
    };
    ItemActComDbZpLabel.URL = "ui://eh3eod8qve5s2";
    return ItemActComDbZpLabel;
}(fairygui.GComponent));
__reflect(ItemActComDbZpLabel.prototype, "ItemActComDbZpLabel");
