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
 * 宝藏拼图面板
 * @author: lujiahao
 * @date: 2019-11-26 19:53:55
 */
var ChildBzpt = (function (_super) {
    __extends(ChildBzpt, _super);
    function ChildBzpt() {
        var _this = _super.call(this) || this;
        _this._cardItemList = [];
        _this._boxItemList = [];
        return _this;
    }
    /** 绑定ui的方法（静态方法） */
    ChildBzpt.setExtends = function () {
        //子类ui组件的绑定放在这里，此类就不用绑定了，在上层已经自动实现
        var f = fairygui.UIObjectFactory.setPackageItemExtension;
        f(BzptCardItem.URL, BzptCardItem);
        // f(ViewBzptReward.URL, ViewBzptReward);
        // f(ChildBzpt.URL, ChildBzpt);
        f(BzptBoxItem.URL, BzptBoxItem);
    };
    ChildBzpt.createInstance = function () {
        return (fairygui.UIPackage.createObject("actBzpt", "ChildBzpt"));
    };
    ChildBzpt.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var t = this;
        CommonManager.parseChildren(t, t);
        for (var i = 0; i < 9; i++) {
            var t_cardItem = t.getChild("cardItem" + i);
            t._cardItemList.push(t_cardItem);
        }
        for (var i = 0; i < 7; i++) {
            var t_boxItem = t.getChild("boxItem" + i);
            t._boxItemList.push(t_boxItem);
        }
    };
    ChildBzpt.prototype.initView = function (pParent) {
        this._viewParent = pParent;
        this.addRelation(this._viewParent, fairygui.RelationType.Size);
    };
    ChildBzpt.prototype.openPanel = function (pData) {
        var t = this;
        t.registerEvent(true);
        GGlobal.modelActivity.CG_OPENACT(UIConst.ACTCOM_BZPT);
        t.tfDate.text = "";
        t._curActVo = pData;
        if (t._curActVo) {
            if (!Timer.instance.has(this.onDateUpdate, this))
                Timer.instance.listen(this.onDateUpdate, this);
        }
        t.refreshData();
        IconUtil.setImg1(Enum_Path.BACK_URL + "bzpt_bg.jpg", t.bgLoader);
    };
    ChildBzpt.prototype.closePanel = function (pData) {
        var t = this;
        t.registerEvent(false);
        for (var _i = 0, _a = t._cardItemList; _i < _a.length; _i++) {
            var v = _a[_i];
            v.clean();
        }
        for (var _b = 0, _c = t._boxItemList; _b < _c.length; _b++) {
            var v = _c[_b];
            v.clean();
        }
        Timer.instance.remove(t.onDateUpdate, t);
        IconUtil.setImg1(null, t.bgLoader);
    };
    ChildBzpt.prototype.dispose = function () {
        var t = this;
        _super.prototype.dispose.call(this);
    };
    //=========================================== API ==========================================
    ChildBzpt.prototype.refreshData = function () {
        var t = this;
        t.refreshCardList();
        t.refreshBoxList();
    };
    ChildBzpt.prototype.refreshCardList = function () {
        var t = this;
        var t_model = GGlobal.modelBzpt;
        var t_taskVoList = t_model.getTaskVoList();
        for (var i = 0; i < t._cardItemList.length; i++) {
            var t_cardItem = t._cardItemList[i];
            t_cardItem.setData(t_taskVoList[i]);
        }
    };
    ChildBzpt.prototype.refreshBoxList = function () {
        var t = this;
        var t_model = GGlobal.modelBzpt;
        var t_boxVoList = t_model.getBoxVoList();
        for (var i = 0; i < t._boxItemList.length; i++) {
            var t_boxItem = t._boxItemList[i];
            t_boxItem.setData(t_boxVoList[i]);
        }
    };
    /** 刷新时间 */
    ChildBzpt.prototype.onDateUpdate = function () {
        var t_dateStr = "";
        if (this._curActVo) {
            var t_end = this._curActVo.end; //s
            var servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0; //s
            var t_remainS = t_end - servTime;
            if (t_remainS > 0) {
                if (t_remainS < 24 * 60 * 60) {
                    //小于24小时
                    t_dateStr = DateUtil2.formatUsedTime(t_remainS, "活动剩余时间：hh小时uu分ss秒");
                }
                else {
                    t_dateStr = DateUtil2.formatUsedTime(t_remainS, "活动剩余时间：dd天hh小时");
                }
            }
            else {
                t_dateStr = HtmlUtil.font("活动已经结束", Color.REDSTR);
            }
        }
        this.tfDate.text = t_dateStr;
    };
    //===================================== private method =====================================
    ChildBzpt.prototype.getCardItemByPos = function (pPos) {
        return this._cardItemList[pPos - 1];
    };
    ChildBzpt.prototype.getBoxItemByPos = function (pPos) {
        return this._boxItemList[pPos - 1];
    };
    ChildBzpt.prototype.registerEvent = function (pFlag) {
        var t = this;
        GGlobal.control.register(pFlag, Enum_MsgType.BZPT_UPDATE, t.onUpdate, t);
        GGlobal.control.register(pFlag, Enum_MsgType.BZPT_CARD_OPEN, t.onCardOpen, t);
        GGlobal.control.register(pFlag, Enum_MsgType.BZPT_BOX_OPEN, t.onBoxOpen, t);
    };
    //======================================== handler =========================================
    ChildBzpt.prototype.onUpdate = function () {
        var t = this;
        t.refreshData();
    };
    ChildBzpt.prototype.onCardOpen = function (pData) {
        var t = this;
        var t_model = GGlobal.modelBzpt;
        var t_taskVo = t_model.getTaskVoById(pData.id);
        if (t_taskVo) {
            var t_cardItem = t.getCardItemByPos(t_taskVo.pos);
            if (t_cardItem) {
                //翻牌动作
                t_cardItem.playMc(function () {
                    t.refreshBoxList();
                }, t);
            }
        }
    };
    ChildBzpt.prototype.onBoxOpen = function (pData) {
        var t = this;
        var t_model = GGlobal.modelBzpt;
        var t_boxVo = t_model.getBoxVoById(pData.id);
        if (t_boxVo) {
            var t_boxItem = t.getBoxItemByPos(t_boxVo.pos);
            if (t_boxItem) {
                t_boxItem.setData(t_boxVo);
            }
        }
    };
    //>>>>end
    ChildBzpt.URL = "ui://twm3bfygot2y0";
    /** 设置包名（静态属性） */
    ChildBzpt.pkg = "actBzpt";
    return ChildBzpt;
}(fairygui.GComponent));
__reflect(ChildBzpt.prototype, "ChildBzpt", ["IPanel"]);
