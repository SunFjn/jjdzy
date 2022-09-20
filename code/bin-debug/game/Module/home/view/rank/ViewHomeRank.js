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
var ViewHomeRank = (function (_super) {
    __extends(ViewHomeRank, _super);
    function ViewHomeRank() {
        var _this = _super.call(this) || this;
        _this.leftHd = function () {
            var self = _this;
            var model = GGlobal.homemodel;
            model.currentPage--;
            model.currentPage = model.currentPage < 1 ? 1 : model.currentPage;
            model.CG_House_rank_11121();
            self.list.scrollToView((model.currentPage - 1) * 5);
        };
        _this.rightHd = function () {
            var self = _this;
            var model = GGlobal.homemodel;
            model.currentPage++;
            model.currentPage = model.currentPage > model.maxPage ? model.maxPage : model.currentPage;
            self.list.scrollToView((model.currentPage - 1) * 5);
            model.CG_House_rank_11121();
        };
        _this.update = function () {
            var self = _this;
            var model = GGlobal.homemodel;
            self.n5.text = model.currentPage + "/" + model.maxPage;
            self.list.numItems = model.homeRank_data.length;
            if (model.myRank >= 1 && model.myRank <= 50) {
                self.lbMyRank.text = "我的排名：" + model.myRank;
            }
            else {
                self.lbMyRank.text = "我的排名：50+";
            }
        };
        _this.childrenCreated();
        return _this;
    }
    ViewHomeRank.createInstance = function () {
        return (fairygui.UIPackage.createObject("home", "ViewHomeRank"));
    };
    ViewHomeRank.prototype.childrenCreated = function () {
        var self = this;
        self.contentPane = self.view = fairygui.UIPackage.createObject("home", "ViewHomeRank").asCom;
        CommonManager.parseChildren(self.view, self);
        _super.prototype.childrenCreated.call(this);
        self.list.callbackThisObj = self;
        self.list.itemRenderer = self.itemRender;
        self.list.setVirtual();
    };
    ViewHomeRank.prototype.itemRender = function (idx, obj) {
        var item = obj;
        item.setdata(idx);
    };
    ViewHomeRank.prototype.scrollComp = function () {
        var curpage = this.list.getFirstChildInView();
        var model = GGlobal.homemodel;
        model.currentPage = ((curpage / 5) >> 0) + 1;
        this.n5.text = model.currentPage + "/" + model.maxPage;
    };
    ViewHomeRank.prototype.eventFunction = function (type) {
        var self = this;
        var model = GGlobal.homemodel;
        EventUtil.register(type, self.btnLeft, EventUtil.TOUCH, self.leftHd, self);
        EventUtil.register(type, self.btnRight, EventUtil.TOUCH, self.rightHd, self);
        EventUtil.register(type, self.list.scrollPane, fairygui.ScrollPane.SCROLL, self.scrollComp, self);
        // s.listPoint.scrollPane.addEventListener(fairygui.ScrollPane.SCROLL, s.scrollComp, s);
        // s.listPoint.addEventListener(fairygui.ItemEvent.CLICK, s.onGetPoint, s)
    };
    ViewHomeRank.prototype.onShown = function () {
        var self = this;
        var model = GGlobal.homemodel;
        model.currentPage = 1;
        model.CG_House_rank_11121();
        GGlobal.control.listen(HomeModel.HOME_UI_DATA_UPDATE, self.update, self);
    };
    ViewHomeRank.prototype.onHide = function () {
        var self = this;
        self.list.scrollToView(0, false, false);
        GGlobal.control.remove(HomeModel.HOME_UI_DATA_UPDATE, self.update, self);
        GGlobal.layerMgr.close(UIConst.HOME_LIST_UI);
    };
    ViewHomeRank.URL = "ui://y0plc878sbl7d";
    return ViewHomeRank;
}(UIModalPanel));
__reflect(ViewHomeRank.prototype, "ViewHomeRank");
