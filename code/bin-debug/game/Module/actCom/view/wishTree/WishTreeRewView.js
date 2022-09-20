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
 * 许愿树排行榜奖励展示
 */
var WishTreeRewView = (function (_super) {
    __extends(WishTreeRewView, _super);
    function WishTreeRewView() {
        var _this = _super.call(this) || this;
        _this.loadRes();
        return _this;
    }
    WishTreeRewView.prototype.childrenCreated = function () {
        GGlobal.createPack("ActCom_WishTree");
        this.view = fairygui.UIPackage.createObject("ActCom_WishTree", "WishTreeRewView").asCom;
        this.contentPane = this.view;
        CommonManager.parseChildren(this.view, this);
        this.list.itemRenderer = this.renderHandle;
        this.list.callbackThisObj = this;
        this.list.setVirtual();
        _super.prototype.childrenCreated.call(this);
    };
    WishTreeRewView.prototype.onShown = function () {
        this._listData = this._args.award || [];
        this._type = this._args.type;
        this._vPoint = this._args.vo;
        this._base = this._args.base;
        this.update();
    };
    WishTreeRewView.prototype.onHide = function () {
        GGlobal.layerMgr.close(UIConst.WISHTREE_REW);
        this.list.numItems = 0;
    };
    WishTreeRewView.prototype.update = function () {
        this.list.numItems = this._listData.length;
        this.c1.selectedIndex = this._type == 2 ? 0 : 1;
        this.upStatus();
    };
    WishTreeRewView.prototype.upStatus = function () {
        if (this._type == 1) {
            this._pointCfg = Config.llgpoint_239[this._vPoint.point];
            var need = this._base + this._pointCfg.point;
            if (this._vPoint.status > 0) {
                this.imgHas.visible = false;
                this.btnGet.visible = true;
                this.btnGet.checkNotice = true;
            }
            else if (this._pointCfg == null || Model_LingLong.myPoint < need) {
                this.imgHas.visible = false;
                this.btnGet.visible = true;
                this.btnGet.checkNotice = false;
            }
            else if (this._vPoint.status == -1) {
                this.imgHas.visible = true;
                this.btnGet.visible = false;
            }
            else {
                this.imgHas.visible = false;
                this.btnGet.visible = true;
                this.btnGet.checkNotice = false;
            }
        }
    };
    WishTreeRewView.prototype.renderHandle = function (index, obj) {
        var v = obj;
        v.tipEnabled = true;
        v.isShowEff = true;
        v.vo = this._listData[index];
    };
    return WishTreeRewView;
}(UIModalPanel));
__reflect(WishTreeRewView.prototype, "WishTreeRewView");
