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
var Chat_BlackListItem = (function (_super) {
    __extends(Chat_BlackListItem, _super);
    function Chat_BlackListItem() {
        var _this = _super.call(this) || this;
        _this.roleId = 0;
        return _this;
    }
    Chat_BlackListItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("chat", "Chat_BlackListItem"));
    };
    Chat_BlackListItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.nameLb = (this.getChild("nameLb"));
        this.btn = (this.getChild("btn"));
        this.btn.addClickListener(this.onBt, this);
    };
    Chat_BlackListItem.prototype.onBt = function () {
        GGlobal.modelchat.CG_CHAT_REMOVE_BLACKLIST(this.roleId);
    };
    Chat_BlackListItem.prototype.show = function (arr) {
        this.roleId = arr[0];
        this.nameLb.text = arr[1];
    };
    Chat_BlackListItem.URL = "ui://fx4pr5qe81i017";
    return Chat_BlackListItem;
}(fairygui.GComponent));
__reflect(Chat_BlackListItem.prototype, "Chat_BlackListItem");
