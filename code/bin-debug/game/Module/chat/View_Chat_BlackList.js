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
var View_Chat_BlackList = (function (_super) {
    __extends(View_Chat_BlackList, _super);
    function View_Chat_BlackList() {
        var _this = _super.call(this) || this;
        fairygui.UIObjectFactory.setPackageItemExtension(Chat_BlackListItem.URL, Chat_BlackListItem);
        _this.childrenCreated();
        return _this;
    }
    View_Chat_BlackList.prototype.childrenCreated = function () {
        this.view = fairygui.UIPackage.createObject("chat", "View_Chat_BlackList").asCom;
        this.contentPane = this.view;
        this.list = (this.view.getChild("list"));
        this.list.callbackThisObj = this;
        this.list.itemRenderer = this.renderHandler;
        this.lb = (this.view.getChild("lb"));
        _super.prototype.childrenCreated.call(this);
    };
    View_Chat_BlackList.prototype.renderHandler = function (index, obj) {
        var item = obj;
        item.show(Model_Chat.blackList[index]);
    };
    View_Chat_BlackList.prototype.updateShow = function () {
        this.list.numItems = Model_Chat.blackList.length;
        this.lb.text = "黑名单上限：" + this.list.numItems + "/" + Config.xtcs_004[2503].num;
    };
    View_Chat_BlackList.prototype.onShown = function () {
        GGlobal.modelchat.CG_CHAT_OPEN_BLACKLIST();
        this.updateShow();
        if (Model_Chat.blackList.length > 0) {
            this.list.scrollToView(0);
        }
        GGlobal.control.listen(Enum_MsgType.CHAT_BLACKLIST, this.updateShow, this);
    };
    View_Chat_BlackList.prototype.onHide = function () {
        GGlobal.layerMgr.close(UIConst.CHAT_BLACKLIST);
        GGlobal.control.remove(Enum_MsgType.CHAT_BLACKLIST, this.updateShow, this);
    };
    View_Chat_BlackList.URL = "ui://fx4pr5qe81i016";
    return View_Chat_BlackList;
}(UIModalPanel));
__reflect(View_Chat_BlackList.prototype, "View_Chat_BlackList");
