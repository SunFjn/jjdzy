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
var ViewZhuanPanTargetReward = (function (_super) {
    __extends(ViewZhuanPanTargetReward, _super);
    function ViewZhuanPanTargetReward() {
        var _this = _super.call(this) || this;
        _this.childrenCreated();
        return _this;
    }
    ViewZhuanPanTargetReward.prototype.childrenCreated = function () {
        var s = this;
        s.view = fairygui.UIPackage.createObject("sanGuoQingDian", "VieZhuanPanTargetReward").asCom;
        s.contentPane = s.view;
        s.list = (s.view.getChild("list"));
        s.list.callbackThisObj = s;
        s.list.itemRenderer = s.renderHandle;
        s.numlb = (s.view.getChild("numlb"));
        _super.prototype.childrenCreated.call(this);
    };
    ViewZhuanPanTargetReward.prototype.renderHandle = function (index, obj) {
        obj.updateShow(ModelSGQD.zpRewardArr[index]);
    };
    ViewZhuanPanTargetReward.prototype.updateShow = function () {
        var arr = ModelSGQD.zpRewardArr;
        var index = 0;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].state == 1) {
                index++;
                GGlobal.reddot.setCondition(UIConst.SG_ZHUANPAN, 0, true);
                GGlobal.modelSGQD.notify(ModelSGQD.msg_notice);
                break;
            }
        }
        if (index <= 0) {
            GGlobal.reddot.setCondition(UIConst.SG_ZHUANPAN, 0, false);
            GGlobal.modelSGQD.notify(ModelSGQD.msg_notice);
        }
        arr.sort(GGlobal.modelSGQD.sortReward);
        this.list.numItems = arr.length;
        this.numlb.text = "转盘次数：" + ModelSGQD.zpCtMy;
    };
    ViewZhuanPanTargetReward.prototype.onShown = function () {
        var s = this;
        s.updateShow();
        GGlobal.control.listen(UIConst.SG_ZHUANPAN_TARGET_REWARD, s.updateShow, s);
        GGlobal.modelSGQD.CGOpenUI4127();
    };
    ViewZhuanPanTargetReward.prototype.onHide = function () {
        var s = this;
        s.list.numItems = 0;
        GGlobal.layerMgr.close(UIConst.SG_ZHUANPAN_TARGET_REWARD);
        GGlobal.control.remove(UIConst.SG_ZHUANPAN_TARGET_REWARD, s.updateShow, s);
    };
    ViewZhuanPanTargetReward.URL = "ui://kdt501v2dg2218";
    return ViewZhuanPanTargetReward;
}(UIModalPanel));
__reflect(ViewZhuanPanTargetReward.prototype, "ViewZhuanPanTargetReward");
