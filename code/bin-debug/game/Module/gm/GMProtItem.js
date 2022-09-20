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
var GMProtItem = (function (_super) {
    __extends(GMProtItem, _super);
    function GMProtItem() {
        var _this = _super.call(this) || this;
        _this.typeArr = [];
        return _this;
    }
    GMProtItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("GM", "GMProtItem"));
    };
    GMProtItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.titleLb = (this.getChild("titleLb"));
        this.sendBt = (this.getChild("sendBt"));
        this.sendBt.addClickListener(this.onSendT, this);
        this.list = (this.getChild("list"));
        this.list.callbackThisObj = this;
        this.list.itemRenderer = this.renderHandler;
    };
    GMProtItem.prototype.renderHandler = function (index, obj) {
        var item = obj;
        item.show(this.typeArr[index]);
    };
    GMProtItem.prototype.show = function (obj) {
        this.data = obj;
        this.titleLb.text = obj.label + obj.decs;
        this.typeArr = obj.types;
        this.list.numItems = obj.types.length;
    };
    GMProtItem.prototype.onSendT = function () {
        var data = this.data;
        var bytes = GGlobal.modelGM.getBytes();
        for (var i = 0, n = this.list.numChildren; i < n; i++) {
            var item = this.list.getChildAt(i);
            item.flush(bytes);
        }
        GGlobal.modelGM.sendSocket(data.cmd, bytes);
    };
    GMProtItem.URL = "ui://vm9a8xq8pckgc";
    return GMProtItem;
}(fairygui.GComponent));
__reflect(GMProtItem.prototype, "GMProtItem");
