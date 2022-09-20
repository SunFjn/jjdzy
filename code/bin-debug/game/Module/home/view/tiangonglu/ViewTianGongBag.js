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
var ViewTianGongBag = (function (_super) {
    __extends(ViewTianGongBag, _super);
    function ViewTianGongBag() {
        var _this = _super.call(this) || this;
        _this.bagItemRender = function (idx, obj) {
            var model = GGlobal.homemodel;
            var item = obj;
            item.setdata(model.bagdata[idx], 0);
        };
        _this.selectItemRender = function (idx, obj) {
            var model = GGlobal.homemodel;
            var item = obj;
            var items = model.optArr[idx];
            var vo = VoItem.create(items[0]);
            vo.count = items[1];
            item.setdata(vo, 1);
        };
        _this.fenjieHD = function () {
            GGlobal.homemodel.CG_House_sacrifice_11117();
        };
        _this.childrenCreated();
        return _this;
    }
    ViewTianGongBag.createInstance = function () {
        return (fairygui.UIPackage.createObject("home", "ViewTianGongBag"));
    };
    ViewTianGongBag.prototype.childrenCreated = function () {
        var self = this;
        self.contentPane = self.view = fairygui.UIPackage.createObject("home", "ViewTianGongBag").asCom;
        CommonManager.parseChildren(self.view, self);
        _super.prototype.childrenCreated.call(this);
        self.bagList.callbackThisObj = self;
        self.bagList.itemRenderer = self.bagItemRender;
        self.bagList.setVirtual();
        self.slectList.callbackThisObj = self;
        self.slectList.itemRenderer = self.selectItemRender;
        self.slectList.setVirtual();
    };
    ViewTianGongBag.prototype.buildBag = function () {
        GGlobal.homemodel.buildTianGongBagData();
        this.viewUpdate();
    };
    ViewTianGongBag.prototype.viewUpdate = function () {
        var self = this;
        var model = GGlobal.homemodel;
        self.bagList.numItems = model.bagdata.length;
        self.slectList.numItems = model.optArr.length;
        var score = 0;
        for (var i = 0; i < model.optArr.length; i++) {
            var item = model.optArr[i];
            var cfg = Config.daoju_204[item[0]];
            score += cfg.tgjf * item[1];
        }
        self.n7.text = ConfigHelp.numToStr(model.score) + "<font color='#15f234'>(+" + ConfigHelp.numToStr(score) + ")</font>";
    };
    /**
     * 传入1是注册事件 0为移除
     */
    ViewTianGongBag.prototype.eventFunction = function (type) {
        var self = this;
        EventUtil.register(type, self.btnGO, EventUtil.TOUCH, self.fenjieHD, self);
    };
    ViewTianGongBag.prototype.allAdd = function () {
        GGlobal.homemodel.allIn();
    };
    ViewTianGongBag.prototype.onShown = function () {
        var self = this;
        var model = GGlobal.homemodel;
        var controller = GGlobal.control;
        model.buildTianGongBagData();
        self.viewUpdate();
        controller.listen(HomeModel.HOME_UI_DATA_UPDATE, self.viewUpdate, self);
        controller.listen(HomeModel.HOME_UI_DATA_RE, self.viewUpdate, self);
        controller.listen(Enum_MsgType.MSG_BAG_VO_UPDATE, self.buildBag, self);
        self.btnAll.addClickListener(self.allAdd, self);
    };
    ViewTianGongBag.prototype.onHide = function () {
        var self = this;
        var controller = GGlobal.control;
        var model = GGlobal.homemodel;
        model.bagdata = [];
        model.optArr = [];
        self.bagList.numItems = 0;
        self.slectList.numItems = 0;
        controller.remove(HomeModel.HOME_UI_DATA_UPDATE, self.viewUpdate, self);
        controller.remove(HomeModel.HOME_UI_DATA_RE, self.viewUpdate, self);
        controller.remove(Enum_MsgType.MSG_BAG_VO_UPDATE, self.buildBag, self);
        self.btnAll.removeClickListener(self.allAdd, self);
        GGlobal.layerMgr.close(UIConst.HOME_TIANGONG_bag_UI);
    };
    ViewTianGongBag.URL = "ui://y0plc878ye039";
    return ViewTianGongBag;
}(UIModalPanel));
__reflect(ViewTianGongBag.prototype, "ViewTianGongBag");
