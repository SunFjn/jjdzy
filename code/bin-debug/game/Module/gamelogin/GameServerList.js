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
var GameServerList = (function (_super) {
    __extends(GameServerList, _super);
    function GameServerList() {
        var _this = _super.call(this) || this;
        _this.page = 10;
        _this.nowIndex = 0;
        _this.myServerList = [];
        _this.serverList = [];
        return _this;
    }
    GameServerList.createInstance = function () {
        return (fairygui.UIPackage.createObject("Login", "GameServerList"));
    };
    GameServerList.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.n0 = (this.getChild("n0"));
        this.n6 = (this.getChild("n6"));
        this.n2 = (this.getChild("n2"));
        this.btnClose = (this.getChild("btnClose"));
        this.lst0 = (this.getChild("lst0"));
        this.lst1 = (this.getChild("lst1"));
        this.n7 = (this.getChild("n7"));
        this.bg = (this.getChild("bg"));
        this.lst0.callbackThisObj = this;
        this.lst0.itemRenderer = this.tabRender;
        this.lst0.setVirtual();
        this.lst1.callbackThisObj = this;
        this.lst1.itemRenderer = this.serverRender;
        this.lst1.setVirtual();
    };
    GameServerList.prototype.serverRender = function (index, obj) {
        var it = obj;
        var data;
        if (this.isMyServerPage()) {
            data = this.myServerList[index];
        }
        else {
            var realIdx = Math.max(this.nowIndex - 1, 0);
            var stratIndex = realIdx * this.page;
            data = this.serverList[stratIndex + index];
        }
        it.data = data;
        it.setSt(data.state, data.alias);
    };
    GameServerList.prototype.onServerClick = function (event) {
        var s = this;
        var item = event.itemObject;
        this.selectHD.runWith(item.data);
        this.uidispose();
    };
    GameServerList.prototype.tabRender = function (index, obj) {
        var it = obj;
        it.data = index;
        it.selected = index == 0;
        if (index == 0) {
            it.text = "最近登录";
        }
        else {
            var realIndex = index - 1;
            it.text = (realIndex * this.page + 1) + "-" + (realIndex * this.page + this.page) + "区";
        }
    };
    GameServerList.prototype.onTabClick = function (event) {
        var s = this;
        var item = event.itemObject;
        this.setServerList(item.data);
    };
    GameServerList.prototype.setServerList = function (index) {
        this.nowIndex = index;
        if (this.isMyServerPage()) {
            this.lst1.numItems = this.myServerList.length;
        }
        else {
            var realIdx = Math.max(index - 1, 0);
            var stratIndex = realIdx * this.page;
            var max = (realIdx + 1) * this.page;
            max = max > this.serverList.length ? this.serverList.length : max;
            this.lst1.numItems = max - stratIndex;
        }
    };
    GameServerList.prototype.isMyServerPage = function () {
        return this.nowIndex == 0 && this.myServerList;
    };
    GameServerList.prototype.showList = function (obj) {
        this.serverList = obj.formal;
        this.myServerList = obj.recent;
        var len = Math.ceil(this.serverList.length / this.page);
        this.lst0.numItems = len + 1; //加上历史服务器，置空也是如此
        this.setServerList(0);
        // var app = App.stage;
        // this.setXY((app.stageWidth - this.width) >> 1, (app.stageHeight - this.height) >> 1);
        this.listen();
    };
    GameServerList.prototype.listen = function () {
        this.lst0.addEventListener(fairygui.ItemEvent.CLICK, this.onTabClick, this);
        this.lst1.addEventListener(fairygui.ItemEvent.CLICK, this.onServerClick, this);
        this.btnClose.addClickListener(this.uidispose, this);
        this.bg.addClickListener(this.uidispose, this);
    };
    GameServerList.prototype.uidispose = function () {
        this.lst0.removeEventListener(fairygui.ItemEvent.CLICK, this.onTabClick, this);
        this.lst1.removeEventListener(fairygui.ItemEvent.CLICK, this.onServerClick, this);
        this.btnClose.removeClickListener(this.uidispose, this);
        this.bg.removeClickListener(this.uidispose, this);
        if (this.displayObject.parent) {
            this.displayObject.parent.removeChild(this.displayObject);
        }
    };
    GameServerList.URL = "ui://a056duzjpc65f";
    return GameServerList;
}(fairygui.GComponent));
__reflect(GameServerList.prototype, "GameServerList");
