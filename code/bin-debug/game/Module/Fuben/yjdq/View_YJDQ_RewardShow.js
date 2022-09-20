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
var View_YJDQ_RewardShow = (function (_super) {
    __extends(View_YJDQ_RewardShow, _super);
    function View_YJDQ_RewardShow() {
        var _this = _super.call(this) || this;
        _this.rewardArr = [];
        _this.childrenCreated();
        return _this;
    }
    View_YJDQ_RewardShow.prototype.childrenCreated = function () {
        this.view = fairygui.UIPackage.createObject("FuBen", "View_YJDQ_RewardShow").asCom;
        this.contentPane = this.view;
        this.list = (this.view.getChild("list"));
        this.list.callbackThisObj = this;
        this.list.itemRenderer = this.renderHandle;
        _super.prototype.childrenCreated.call(this);
    };
    View_YJDQ_RewardShow.prototype.renderHandle = function (index, obj) {
        var grid = obj;
        var vo;
        if (this.rewardArr[index][0] == Enum_Attr.ITEM) {
            vo = VoItem.create(this.rewardArr[index][1]);
            vo.count = this.rewardArr[index][2];
        }
        else if (this.rewardArr[index][0] == Enum_Attr.EQUIP) {
            vo = VoEquip.create(this.rewardArr[index][1]);
            vo.count = this.rewardArr[index][2];
        }
        else {
            vo = Vo_Currency.create(this.rewardArr[index][0]);
            vo.count = this.rewardArr[index][2];
        }
        grid.vo = vo;
    };
    View_YJDQ_RewardShow.prototype.updateShow = function () {
        var cfg = Config.yiqi_007[Model_YJDQ.curPass];
        this.rewardArr = JSON.parse(cfg.pile);
        this.list.numItems = this.rewardArr.length;
    };
    View_YJDQ_RewardShow.prototype.onShown = function () {
        this.updateShow();
    };
    View_YJDQ_RewardShow.prototype.onHide = function () {
        GGlobal.layerMgr.close(UIConst.FUBEN_YJDQ_REWARDSHOW);
        this.list.numItems = 0;
    };
    View_YJDQ_RewardShow.URL = "ui://pkuzcu87b8vea";
    return View_YJDQ_RewardShow;
}(UIModalPanel));
__reflect(View_YJDQ_RewardShow.prototype, "View_YJDQ_RewardShow");
