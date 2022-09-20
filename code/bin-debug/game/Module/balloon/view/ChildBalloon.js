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
 * @date: 2019-10-31 21:12:05
 */
var ChildBalloon = (function (_super) {
    __extends(ChildBalloon, _super);
    function ChildBalloon() {
        var _this = _super.call(this) || this;
        _this._ballList = [];
        _this._clickFlag = false;
        return _this;
    }
    /** 绑定ui的方法（静态方法） */
    ChildBalloon.setExtends = function () {
        //子类ui组件的绑定放在这里，此类就不用绑定了，在上层已经自动实现
        var f = fairygui.UIObjectFactory.setPackageItemExtension;
        f(BallViewGrid.URL, BallViewGrid);
        // f(ChildBalloon.URL, ChildBalloon);
        f(BallloonItem.URL, BallloonItem);
    };
    ChildBalloon.createInstance = function () {
        return (fairygui.UIPackage.createObject("balloon", "ChildBalloon"));
    };
    ChildBalloon.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var t = this;
        CommonManager.parseChildren(t, t);
        for (var i = 0; i < 12; i++) {
            var t_ball = t["ball" + i];
            if (t_ball) {
                t._ballList.push(t_ball);
                t_ball.indexId = i + 1;
            }
        }
        // t.itemList.setVirtualAndLoop();
        t.itemList.itemRenderer = t.onItemRender;
        t.itemList.callbackThisObj = t;
        t.itemList.setVirtual();
    };
    ChildBalloon.prototype.initView = function (pParent) {
        this._viewParent = pParent;
        this.addRelation(this._viewParent, fairygui.RelationType.Size);
    };
    ChildBalloon.prototype.openPanel = function (pData) {
        var t = this;
        t.registerEvent(true);
        GGlobal.modelActivity.CG_OPENACT(UIConst.ACTCOM_BALLOON);
        for (var _i = 0, _a = t._ballList; _i < _a.length; _i++) {
            var v = _a[_i];
            //重置数据
            v.setData(null);
        }
        this.tfDate.text = "";
        this._curActVo = pData;
        t.refreshData();
        IconUtil.setImg1(Enum_Path.BACK_URL + "xfyt_bg.jpg", t.loaderBg);
    };
    ChildBalloon.prototype.closePanel = function (pData) {
        var t = this;
        Timer.instance.remove(t.onDateUpdate, t);
        // Timer.instance.remove(t.onScroll, t);
        t.itemList.numItems = 0;
        t.registerEvent(false);
        IconUtil.setImg1(null, t.loaderBg);
    };
    ChildBalloon.prototype.dispose = function () {
        var t = this;
        _super.prototype.dispose.call(this);
    };
    //=========================================== API ==========================================
    //===================================== private method =====================================
    ChildBalloon.prototype.onItemRender = function (pIndex, pItem) {
        var t = this;
        var t_model = GGlobal.modelBalloon;
        var t_list = t_model.getRewardListByQs(t_model.curQs);
        if (t_list) {
            pItem.setData(t_list[pIndex]);
        }
    };
    ChildBalloon.prototype.refreshData = function () {
        var t = this;
        var t_model = GGlobal.modelBalloon;
        if (t._curActVo) {
            for (var _i = 0, _a = t._ballList; _i < _a.length; _i++) {
                var v = _a[_i];
                var t_vo = t_model.getVoById(v.indexId);
                v.setData(t_vo);
            }
            var t_max = t_model.getMaxValue();
            var t_value = t_model.curChangeValue;
            t.pb.max = t_max;
            t.pb.value = t_value;
            if (t_max > t_value) {
                var t_diff = t_max - t_value;
                t.tfDes.text = "\u518D\u6D88\u8D39<font color='#ffff00'>" + t_diff + "\u5143\u5B9D</font>\u53EF\u83B7\u5F971\u9897\u5B50\u5F39";
            }
            else {
                t.tfDes.text = "子弹数量已达上限";
            }
            t.refreshRemainCount();
            t.refreshRewardList();
            if (!Timer.instance.has(this.onDateUpdate, this))
                Timer.instance.listen(this.onDateUpdate, this);
        }
        else {
        }
    };
    /** 刷新剩余次数 */
    ChildBalloon.prototype.refreshRemainCount = function () {
        var t = this;
        var t_remain = GGlobal.modelBalloon.remain;
        var t_reddot = false;
        if (t_remain < 1) {
            var t_color = Color.REDSTR;
        }
        else {
            t_color = Color.GREENSTR;
            t_reddot = true;
        }
        t.tfCount.text = "剩余子弹：" + HtmlUtil.font(ConfigHelp.reTxt("{0}", t_remain), t_color);
        //设置卡牌的红点
        for (var _i = 0, _a = t._ballList; _i < _a.length; _i++) {
            var v = _a[_i];
            if (t_reddot && !v.curVo.rewardItem) {
                v.noticeImg.visible = true;
            }
            else {
                v.noticeImg.visible = false;
            }
        }
    };
    ChildBalloon.prototype.refreshRewardList = function () {
        var t = this;
        var t_model = GGlobal.modelBalloon;
        var t_rewardList = t_model.getRewardListByQs(t_model.curQs);
        t.itemList.numItems = t_rewardList.length;
        // if (!Timer.instance.has(t.onScroll, t))
        //     Timer.instance.listen(t.onScroll, t, 100);
    };
    ChildBalloon.prototype.getBallItemByPos = function (pPos) {
        return this._ballList[pPos - 1];
    };
    /** 刷新时间 */
    ChildBalloon.prototype.onDateUpdate = function () {
        var t_dateStr = "";
        if (this._curActVo) {
            var t_end = this._curActVo.end; //s
            var servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0; //s
            // let t_hh = new Date(t_end*1000);
            // let t_now = new Date(servTime * 1000);
            // console.log("=================================", t_hh);
            // console.log("=================================", t_now);
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
    ChildBalloon.prototype.registerEvent = function (pFlag) {
        var t = this;
        GGlobal.control.register(pFlag, Enum_MsgType.BALLOON_UPDATE, t.onUpdate, t);
        GGlobal.control.register(pFlag, Enum_MsgType.BALLOON_SUCCESS, t.onSuccess, t);
        EventUtil.register(pFlag, t.itemList, egret.TouchEvent.TOUCH_BEGIN, t.onScrollClickBegin, t);
        EventUtil.register(pFlag, t.itemList, egret.TouchEvent.TOUCH_END, t.onScrollClickEnd, t);
        for (var _i = 0, _a = t._ballList; _i < _a.length; _i++) {
            var v = _a[_i];
            EventUtil.register(pFlag, v, egret.TouchEvent.TOUCH_TAP, t.onItemClick, t);
        }
    };
    //======================================== handler =========================================
    ChildBalloon.prototype.onScrollClickBegin = function () {
        var t = this;
        t._clickFlag = true;
    };
    ChildBalloon.prototype.onScrollClickEnd = function () {
        var t = this;
        t._clickFlag = false;
    };
    ChildBalloon.prototype.onScroll = function () {
        var t = this;
        if (t._clickFlag)
            return;
        var t_pos = t.itemList.scrollPane.posX + 5;
        t.itemList.scrollPane.setPosX(t_pos, true);
    };
    ChildBalloon.prototype.onItemClick = function (e) {
        var t_ballItem = e.currentTarget;
        if (t_ballItem) {
            t_ballItem.handleClick(e);
        }
    };
    ChildBalloon.prototype.onUpdate = function () {
        var t = this;
        t.refreshData();
    };
    ChildBalloon.prototype.onSuccess = function (pData) {
        var t = this;
        if (!pData)
            return;
        var t_vo = GGlobal.modelBalloon.getVoById(pData.id);
        if (t_vo) {
            var t_ballItem = t.getBallItemByPos(t_vo.id);
            if (t_ballItem) {
                t_ballItem.setData(t_vo, true); //播放动画
            }
            t.refreshRemainCount();
            t.refreshRewardList();
        }
    };
    //>>>>end
    ChildBalloon.URL = "ui://i1mp7ufxwuwj0";
    /** 设置包名（静态属性） */
    ChildBalloon.pkg = "balloon";
    return ChildBalloon;
}(fairygui.GComponent));
__reflect(ChildBalloon.prototype, "ChildBalloon", ["IPanel"]);
