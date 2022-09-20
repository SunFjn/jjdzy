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
/**
 * 桃园结义人员调动界面
 */
var TYJY_ChangeView = (function (_super) {
    __extends(TYJY_ChangeView, _super);
    function TYJY_ChangeView() {
        var _this = _super.call(this) || this;
        _this._dage = 0;
        _this.childrenCreated();
        return _this;
    }
    TYJY_ChangeView.prototype.childrenCreated = function () {
        var self = this;
        self.view = fairygui.UIPackage.createObject("taoYuanJieYi", "TYJY_ChangeView").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        self.list.callbackThisObj = self;
        self.list.itemRenderer = self.itemRender;
        _super.prototype.childrenCreated.call(this);
    };
    TYJY_ChangeView.prototype.onShown = function () {
        var self = this;
        self.leaveBtn.addClickListener(self.onLeave, self);
        GGlobal.control.listen(UIConst.TAOYUANJIEYI, self.updateList, self);
        self.updateList();
    };
    TYJY_ChangeView.prototype.onHide = function () {
        var self = this;
        self.list.numItems = 0;
        self.leaveBtn.removeClickListener(self.onLeave, self);
        self._listData = [];
        GGlobal.control.remove(UIConst.TAOYUANJIEYI, self.updateList, self);
    };
    TYJY_ChangeView.prototype.itemRender = function (idx, obj) {
        var item = obj;
        item.setdata(this._listData[idx], this._dage == Model_player.voMine.id);
    };
    /**
     * 更新列表数据
     */
    TYJY_ChangeView.prototype.updateList = function () {
        var self = this;
        self._listData = [];
        if (GGlobal.model_TYJY.myGangList) {
            var len = GGlobal.model_TYJY.myGangList.length;
            for (var i = 0; i < len; i++) {
                var vo = GGlobal.model_TYJY.myGangList[i];
                if (vo.position == 1) {
                    self._dage = vo.playerId;
                }
                if (vo.playerId != Model_player.voMine.id) {
                    self._listData.push(vo);
                }
            }
        }
        self.list.numItems = 2;
    };
    /**
     * 离开义盟
     */
    TYJY_ChangeView.prototype.onLeave = function (e) {
        ViewAlert.show("您是否要离开此义盟？", null, 3, "继续留下", "离开义盟", Handler.create(this, function () { GGlobal.model_TYJY.CG_QUIT(); }));
    };
    TYJY_ChangeView.URL = "ui://m2fm2aiyvfmx1a";
    return TYJY_ChangeView;
}(UIModalPanel));
__reflect(TYJY_ChangeView.prototype, "TYJY_ChangeView");
