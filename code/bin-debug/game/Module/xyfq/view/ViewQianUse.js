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
 * @author: lujiahao
 * @date: 2020-04-07 17:55:04
 */
var ViewQianUse = (function (_super) {
    __extends(ViewQianUse, _super);
    function ViewQianUse() {
        var _this = _super.call(this) || this;
        _this._qianList = [];
        _this.loadRes("xyfq", "xyfq_atlas0");
        return _this;
    }
    ViewQianUse.createInstance = function () {
        return (fairygui.UIPackage.createObject("xyfq", "ViewQianUse"));
    };
    ViewQianUse.prototype.childrenCreated = function () {
        GGlobal.createPack("xyfq");
        this.view = fairygui.UIPackage.createObject("xyfq", "ViewQianUse").asCom;
        this.contentPane = this.view;
        CommonManager.parseChildren(this.view, this);
        this.initView();
        _super.prototype.childrenCreated.call(this);
    };
    ViewQianUse.prototype.initView = function () {
        var t = this;
        var t_model = GGlobal.modelXyfq;
        t._qianList = t_model.getQianVoList().concat();
    };
    //=========================================== API ==========================================
    ViewQianUse.prototype.onShown = function () {
        var t = this;
        t._curVo = t._args;
        t.refreshData();
        t.registerEvent(true);
        IconUtil.setImg(t.bg, Enum_Path.BACK_URL + "xyfq_use_bg.png");
    };
    ViewQianUse.prototype.onHide = function () {
        var t = this;
        t.registerEvent(false);
        t.item.clean();
        IconUtil.setImg(t.bg, null);
    };
    //===================================== private method =====================================
    ViewQianUse.prototype.refreshData = function () {
        var t = this;
        if (t._curVo) {
            var t_bagCount = t._curVo.count;
            t.item.setData(t._curVo);
            t.numCom.maxValue = t_bagCount;
            t.numCom.setValue(t_bagCount);
        }
    };
    ViewQianUse.prototype.getCurIndex = function () {
        var t = this;
        var t_index = 0;
        if (t._curVo) {
            for (var i = 0; i < t._qianList.length; i++) {
                if (t._curVo.id == t._qianList[i].id) {
                    t_index = i;
                    break;
                }
            }
        }
        return t_index;
    };
    ViewQianUse.prototype.getLastOrNextIndex = function (pDiff) {
        var t = this;
        var t_curIndex = t.getCurIndex();
        var t_len = t._qianList.length;
        var t_a = t_curIndex + pDiff;
        var t_targetIndex = 0;
        if (t_a >= 0) {
            t_targetIndex = t_a % t_len;
        }
        else {
            t_targetIndex = t_len - ((-t_a) % t_len);
        }
        return t_targetIndex;
    };
    ViewQianUse.prototype.registerEvent = function (pFlag) {
        var t = this;
        EventUtil.register(pFlag, t.btnLeft, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnRight, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnOpen, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        GGlobal.control.register(pFlag, Enum_MsgType.MSG_BAG_ITME_UPDATE, t.onBagUpdate, t);
        EventUtil.register(pFlag, t.numCom.btnMax, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.numCom.btnAdd, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
    };
    //======================================== handler =========================================
    ViewQianUse.prototype.onBagUpdate = function () {
        var t = this;
        t.refreshData();
    };
    ViewQianUse.prototype.onBtnClick = function (e) {
        var t = this;
        var t_model = GGlobal.modelXyfq;
        if (!t._curVo)
            return;
        switch (e.currentTarget) {
            case t.btnLeft:
                {
                    var t_targetIndex = t.getLastOrNextIndex(-1);
                    var t_vo = t._qianList[t_targetIndex];
                    t._curVo = t_vo;
                    t.refreshData();
                }
                break;
            case t.btnRight:
                {
                    var t_targetIndex = t.getLastOrNextIndex(1);
                    var t_vo = t._qianList[t_targetIndex];
                    t._curVo = t_vo;
                    t.refreshData();
                }
                break;
            case t.numCom.btnAdd:
            case t.numCom.btnMax:
                if (t.numCom.value >= t.numCom.maxValue) {
                    ViewCommonWarn.text("已达到可使用数量上限");
                }
                break;
            case t.btnOpen:
                var t_count = t.numCom.value;
                t_model.CG_LuckSign_openLuckSign_12159(t._curVo.rewardId, t_count);
                break;
        }
    };
    //>>>>end
    ViewQianUse.URL = "ui://7hwmix0gbnypn";
    return ViewQianUse;
}(UIModalPanel));
__reflect(ViewQianUse.prototype, "ViewQianUse");
