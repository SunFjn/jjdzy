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
var View_ActCom_Rank = (function (_super) {
    __extends(View_ActCom_Rank, _super);
    function View_ActCom_Rank() {
        var _this = _super.call(this) || this;
        _this.datas = [];
        _this.indexs = [];
        _this.childrenCreated();
        return _this;
    }
    View_ActCom_Rank.createInstance = function () {
        return (fairygui.UIPackage.createObject("ActCom_SystemRank", "View_ActCom_Rank"));
    };
    View_ActCom_Rank.prototype.childrenCreated = function () {
        var self = this;
        var view = fairygui.UIPackage.createObject("ActCom_SystemRank", "View_ActCom_Rank").asCom;
        self.contentPane = view;
        CommonManager.parseChildren(view, self);
        self.list.itemRenderer = self.onListRender;
        self.list.callbackThisObj = self;
        self.list.setVirtual();
        _super.prototype.childrenCreated.call(this);
    };
    View_ActCom_Rank.prototype.onListRender = function (index, render) {
        var s = this;
        render.setData(s.datas[index], s.indexs[index]);
    };
    View_ActCom_Rank.prototype.onShown = function () {
        var s = this;
        s.txtImg.url = CommonManager.getUrl("ActCom_SystemRank", "" + Model_GlobalMsg.sysID);
        var cfg = Config.pmhdsbdjcsb_326[Model_GlobalMsg.sysID];
        s.frame.text = cfg.name + "排名";
        s.onUpdate();
    };
    View_ActCom_Rank.prototype.onHide = function () {
        var s = this;
        s.list.numItems = 0;
    };
    View_ActCom_Rank.prototype.onUpdate = function () {
        var self = this;
        self.datas = [];
        self.indexs = [];
        for (var i = 0; i < 20; i++) {
            var vo = Model_GlobalMsg.rankData[i];
            self.datas.push(vo);
            self.indexs.push(i);
        }
        self.list.numItems = self.datas.length;
    };
    View_ActCom_Rank.URL = "ui://qz5r0meldsdy5";
    return View_ActCom_Rank;
}(UIModalPanel));
__reflect(View_ActCom_Rank.prototype, "View_ActCom_Rank");
