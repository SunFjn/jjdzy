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
var ViewLiangCaoReslut = (function (_super) {
    __extends(ViewLiangCaoReslut, _super);
    function ViewLiangCaoReslut() {
        var _this = _super.call(this) || this;
        _this.maxScore = 0;
        _this.itemRender = function (idx, obj) {
            var item = obj;
            item.setdata(idx, 1, _this.maxScore);
        };
        _this.onSure = function () {
            GGlobal.layerMgr.close2(UIConst.LIANGCAO_RESULT);
        };
        _this.update = function () {
            var self = _this;
            var model = GGlobal.modelLiangCao;
            if (model.mvp_name) {
                ImageLoader.instance.loader(RoleUtil.getHeadRoleByCfg(model.mvp_frame), self.imgHeadGrid);
                ImageLoader.instance.loader(RoleUtil.getHeadRoleByCfg(model.mvp_head), self.imgHead);
                self.lbMvpName.text = model.mvp_name;
            }
            else {
                self.lbMvpName.text = "";
            }
            self.maxScore = model.getMaxScore();
            self.n7.numItems = 3;
        };
        _this.eventFun = function (v) {
            var self = _this;
            var event = EventUtil.register;
            event(v, self.n5, EventUtil.TOUCH, self.onSure, self);
        };
        _this.loadRes("liangcao", "liangcao_atlas0");
        return _this;
    }
    ViewLiangCaoReslut.createInstance = function () {
        return (fairygui.UIPackage.createObject("liangcao", "ViewLiangCaoReslut"));
    };
    ViewLiangCaoReslut.prototype.childrenCreated = function () {
        var self = this;
        GGlobal.createPack("liangcao");
        self.view = fairygui.UIPackage.createObject("liangcao", "ViewLiangCaoReslut").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        self.n7.callbackThisObj = self;
        self.n7.itemRenderer = self.itemRender;
        _super.prototype.childrenCreated.call(this);
    };
    ViewLiangCaoReslut.prototype.onShown = function () {
        var self = this;
        self.update();
        self.eventFun(1);
    };
    ViewLiangCaoReslut.prototype.onHide = function () {
        var self = this;
        self.eventFun(0);
        GGlobal.layerMgr.close(UIConst.LIANGCAO_RESULT);
        self.n7.numItems = 0;
    };
    ViewLiangCaoReslut.URL = "ui://mbcu0qc0hd20g";
    return ViewLiangCaoReslut;
}(UIModalPanel));
__reflect(ViewLiangCaoReslut.prototype, "ViewLiangCaoReslut");
