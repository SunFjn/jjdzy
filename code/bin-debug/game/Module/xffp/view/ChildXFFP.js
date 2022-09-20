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
 * 消费翻牌面板
 * @author: lujiahao
 * @date: 2019-09-07 11:34:44
 */
var ChildXFFP = (function (_super) {
    __extends(ChildXFFP, _super);
    function ChildXFFP() {
        var _this = _super.call(this) || this;
        _this._cardList = [];
        _this._iamgeGetList = [];
        _this._imageBigList = [];
        return _this;
    }
    /** 绑定ui的方法（静态方法） */
    ChildXFFP.setExtends = function () {
        //子类ui组件的绑定放在这里，此类就不用绑定了，在上层已经自动实现
        fairygui.UIObjectFactory.setPackageItemExtension(XFFPCardItem.URL, XFFPCardItem);
    };
    ChildXFFP.createInstance = function () {
        return (fairygui.UIPackage.createObject("xffp", "ChildXFFP"));
    };
    ChildXFFP.prototype.initView = function (pParent) {
        this._viewParent = pParent;
        this.addRelation(this._viewParent, fairygui.RelationType.Size);
        this.itemList.itemRenderer = this.onItemRender;
        this.itemList.callbackThisObj = this;
        // this.itemList.setVirtual();
    };
    ChildXFFP.prototype.openPanel = function (pData) {
        this.registerEvent(true);
        GGlobal.modelActivity.CG_OPENACT(UIConst.XFFP);
        var t = this;
        for (var _i = 0, _a = t._cardList; _i < _a.length; _i++) {
            var v = _a[_i];
            //重置卡牌数据
            v.setData(null);
        }
        this.tfDate.text = "";
        this._curActVo = pData;
        this.refreshData();
    };
    ChildXFFP.prototype.closePanel = function (pData) {
        var t = this;
        t.registerEvent(false);
        t.itemList.numItems = 0;
        Timer.instance.remove(t.onDateUpdate, t);
    };
    ChildXFFP.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
        var t = this;
        for (var i = 0; i < 6; i++) {
            var t_card = t['card' + i];
            if (t_card) {
                t._cardList.push(t_card);
                t_card.index = i;
            }
        }
        for (var i = 0; i < 6; i++) {
            var t_image = t['imageGet' + i];
            if (t_image) {
                t._iamgeGetList.push(t_image);
                t_image.visible = false;
            }
        }
        for (var i = 0; i < 6; i++) {
            var t_image = t["imageBig" + i];
            if (t_image) {
                t._imageBigList.push(t_image);
                t_image.visible = false;
            }
        }
    };
    //=========================================== API ==========================================
    //===================================== private method =====================================
    ChildXFFP.prototype.onItemRender = function (pIndex, pItem) {
        var t_list = this._rewardVoList;
        if (t_list && t_list[pIndex] && t_list[pIndex].rewardList[0]) {
            pItem.isShowEff = true;
            pItem.tipEnabled = true;
            pItem.vo = t_list[pIndex].rewardList[0];
        }
    };
    ChildXFFP.prototype.refreshData = function () {
        if (this._curActVo) {
            this._rewardVoList = GGlobal.modelXFFP.getRewardVoListByQs(this._curActVo.qs);
            this.itemList.numItems = this._rewardVoList.length;
            for (var i = 0; i < this._rewardVoList.length; i++) {
                var t_vo = this._rewardVoList[i];
                var t_iamgeGet = this._iamgeGetList[i];
                t_iamgeGet.visible = t_vo.state ? true : false;
                var t_imageBig = this._imageBigList[i];
                t_imageBig.visible = t_vo.cfg.big > 0;
                //设置卡牌数据
                if (t_vo.index > -1) {
                    var t_card = this.getCardItemByIndex(t_vo.index);
                    if (t_card) {
                        t_card.setData(t_vo);
                    }
                }
            }
            var t_curPbId = GGlobal.modelXFFP.curPbId;
            if (t_curPbId == 0)
                this.pbCtrl.selectedIndex = 1;
            else {
                this.pbCtrl.selectedIndex = 0;
                var t_curPbVo = GGlobal.modelXFFP.getRewardVoById(t_curPbId);
                var t_curChargeValue = GGlobal.modelXFFP.curChargeValue;
                this.pb.value = t_curChargeValue;
                this.pb.max = t_curPbVo.ybValue;
            }
            this.refreshRemainCount();
            if (!Timer.instance.has(this.onDateUpdate, this))
                Timer.instance.listen(this.onDateUpdate, this);
        }
        else {
            this._rewardVoList = null;
            this.itemList.numItems = 0;
            for (var _i = 0, _a = this._iamgeGetList; _i < _a.length; _i++) {
                var v = _a[_i];
                v.visible = false;
            }
            for (var _b = 0, _c = this._imageBigList; _b < _c.length; _b++) {
                var v = _c[_b];
                v.visible = false;
            }
        }
    };
    /** 刷新剩余次数 */
    ChildXFFP.prototype.refreshRemainCount = function () {
        var t_remain = GGlobal.modelXFFP.remainFpCount;
        var t_reddot = false;
        if (t_remain < 1) {
            var t_color = Color.REDSTR;
        }
        else {
            t_color = Color.GREENSTR;
            t_reddot = true;
        }
        this.tfCount.text = "可翻牌次数：" + HtmlUtil.font(ConfigHelp.reTxt("{0}次", t_remain), t_color);
        //设置卡牌的红点
        for (var _i = 0, _a = this._cardList; _i < _a.length; _i++) {
            var v = _a[_i];
            if (t_reddot && !v.curVo) {
                v.noticeImg.visible = true;
            }
            else {
                v.noticeImg.visible = false;
            }
        }
    };
    /** 刷新时间 */
    ChildXFFP.prototype.onDateUpdate = function () {
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
    ChildXFFP.prototype.showGetFlagById = function (pId) {
        if (this._rewardVoList) {
            for (var i = 0; i < this._rewardVoList.length; i++) {
                var t_vo = this._rewardVoList[i];
                if (t_vo.id == pId) {
                    this._iamgeGetList[i].visible = true;
                }
            }
        }
    };
    /**
     * 通过索引获取CardItem
     * @param pIndex
     */
    ChildXFFP.prototype.getCardItemByIndex = function (pIndex) {
        return this._cardList[pIndex];
    };
    ChildXFFP.prototype.registerEvent = function (pFlag) {
        GGlobal.control.register(pFlag, Enum_MsgType.XFFP_FLOP_SUCCESS, this.onFlopSuccess, this);
        GGlobal.control.register(pFlag, Enum_MsgType.XFFP_UPDATE, this.onUpdate, this);
        for (var _i = 0, _a = this._cardList; _i < _a.length; _i++) {
            var v = _a[_i];
            EventUtil.register(pFlag, v, egret.TouchEvent.TOUCH_TAP, this.onItemClick, this);
        }
    };
    //======================================== handler =========================================
    ChildXFFP.prototype.onItemClick = function (e) {
        var t_card = e.currentTarget;
        if (t_card) {
            t_card.handleClick(e);
        }
    };
    ChildXFFP.prototype.onUpdate = function () {
        this.refreshData();
    };
    /** 翻牌成功处理 */
    ChildXFFP.prototype.onFlopSuccess = function (pData) {
        if (!pData)
            return;
        var t_vo = GGlobal.modelXFFP.getRewardVoById(pData.id);
        if (t_vo) {
            var t_cardItem = this.getCardItemByIndex(t_vo.index);
            if (t_cardItem) {
                t_cardItem.setData(t_vo, true); //设置卡牌数据并播放动画
            }
            this.showGetFlagById(t_vo.id);
            this.refreshRemainCount();
        }
    };
    //>>>>end
    ChildXFFP.URL = "ui://791nthw5p8zd0";
    /** 设置包名（静态属性） */
    ChildXFFP.pkg = "xffp";
    return ChildXFFP;
}(fairygui.GComponent));
__reflect(ChildXFFP.prototype, "ChildXFFP", ["IPanel"]);
