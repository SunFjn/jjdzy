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
 * 直购奖励框
 */
var ViewZhiGouReward = (function (_super) {
    __extends(ViewZhiGouReward, _super);
    function ViewZhiGouReward() {
        var _this = _super.call(this) || this;
        _this.loadRes("zhigou", "zhigou_atlas0");
        return _this;
    }
    ViewZhiGouReward.prototype.childrenCreated = function () {
        GGlobal.createPack("zhigou");
        this.view = fairygui.UIPackage.createObject("zhigou", "ViewZhiGouReward").asCom;
        this.contentPane = this.view;
        this.c1 = this.view.getController("c1");
        this.list = (this.view.getChild("list"));
        this.btnGet = (this.view.getChild("btnGet"));
        this.imgHas = (this.view.getChild("imgHas"));
        this.list.itemRenderer = this.renderHandle;
        this.list.callbackThisObj = this;
        this.list.setVirtual();
        _super.prototype.childrenCreated.call(this);
    };
    ViewZhiGouReward.prototype.onShown = function () {
        this._listData = this._args.award || [];
        this._vPoint = this._args.vo;
        this.btnGet.addClickListener(this.onGet, this);
        GGlobal.control.listen(Enum_MsgType.ZHIGOU_UPDATE, this.update, this);
        this.update();
    };
    ViewZhiGouReward.prototype.onHide = function () {
        this.btnGet.removeClickListener(this.onGet, this);
        GGlobal.layerMgr.close(UIConst.ZHI_GOU_REWARD);
        GGlobal.control.remove(Enum_MsgType.ZHIGOU_UPDATE, this.update, this);
        this.list.numItems = 0;
    };
    ViewZhiGouReward.prototype.update = function () {
        this.list.numItems = this._listData.length;
        this.c1.selectedIndex = this._vPoint.state == 2 ? 1 : 0;
        if (this._vPoint && this._vPoint.state == 1) {
            this.btnGet.checkNotice = true;
        }
        else {
            this.btnGet.checkNotice = false;
        }
        this._pointCfg = Config.mrzgmb_256[this._vPoint.id];
    };
    ViewZhiGouReward.prototype.renderHandle = function (index, obj) {
        var v = obj;
        v.tipEnabled = true;
        v.isShowEff = true;
        v.vo = this._listData[index];
    };
    ViewZhiGouReward.prototype.onGet = function () {
        if (this._pointCfg == null)
            return;
        if (this.btnGet.checkNotice == false) {
            ViewCommonWarn.text("领取条件不足");
            return;
        }
        var _act = ModelEightLock.getActVo(UIConst.ZHI_GOU828);
        if (Model_GlobalMsg.kaifuDay <= 7) {
            GGlobal.modelZhiGou.CG_3707(this._vPoint.id);
        }
        else if (_act) {
            GGlobal.modelZhiGou.CG_7005(this._vPoint.id);
        }
        else {
            GGlobal.modelZhiGou.CG_3725(this._vPoint.id);
        }
    };
    return ViewZhiGouReward;
}(UIModalPanel));
__reflect(ViewZhiGouReward.prototype, "ViewZhiGouReward");
