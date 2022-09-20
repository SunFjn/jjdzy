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
 * 新活动-许愿树
 */
var Child_ActCom_WishTree = (function (_super) {
    __extends(Child_ActCom_WishTree, _super);
    function Child_ActCom_WishTree() {
        var _this = _super.call(this) || this;
        _this._cost1 = 0;
        _this._cost10 = 0;
        _this._itemCount = 0; //许愿纸道具数量
        return _this;
    }
    /** 绑定ui的方法（静态方法） */
    Child_ActCom_WishTree.setExtends = function () {
        var f = fairygui.UIObjectFactory.setPackageItemExtension;
        f(WishTreeRankItem.URL, WishTreeRankItem);
        f(WishPointItem.URL, WishPointItem);
        f(WishTreeTargetItem.URL, WishTreeTargetItem);
    };
    Child_ActCom_WishTree.createInstance = function () {
        return (fairygui.UIPackage.createObject("ActCom_WishTree", "Child_ActCom_WishTree"));
    };
    Child_ActCom_WishTree.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
    };
    Child_ActCom_WishTree.prototype.initView = function (pParent) {
        var s = this;
        s.girdArr = [s.gird0, s.gird1, s.gird2, s.gird3];
        s._rewardArr = [s.reward0, s.reward1, s.reward2, s.reward3, s.reward4];
    };
    Child_ActCom_WishTree.prototype.openPanel = function (pData) {
        var self = this;
        self._vo = pData;
        IconUtil.setImg(self.bgImg, Enum_Path.ACTCOM_URL + "wishTree.jpg");
        self.show();
        self.y = 264;
    };
    Child_ActCom_WishTree.prototype.closePanel = function (pData) {
        var self = this;
        self.disposePanel();
        IconUtil.setImg(self.bgImg, null);
    };
    Child_ActCom_WishTree.prototype.dispose = function () {
        this.disposePanel();
        _super.prototype.dispose.call(this);
    };
    Child_ActCom_WishTree.prototype.disposePanel = function () {
        var self = this;
        Timer.instance.remove(self.onUpdate, self);
        self.btnBuy1.removeClickListener(self.onBuy1, self);
        self.btnBuy10.removeClickListener(self.onBuy10, self);
        self.btnRank.removeClickListener(self.onClickRank, self);
        self.btnCheck.removeClickListener(self.onBtnCheck, self);
        self.btnTarget.removeClickListener(self.onBtnTarget, self);
        var len = self.girdArr.length;
        for (var i = 0; i < 4; i++) {
            self.girdArr[i].setVo(null);
            self.girdArr[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onGetPoint, self);
        }
        GGlobal.control.remove(UIConst.WISHTREE_ACT, self.updateView, self);
        GGlobal.control.remove(UIConst.WISHTREE_SYSTEM, self.updateView, self);
        GGlobal.control.remove(Enum_MsgType.WISHTREE_PRAY_MOVIE, self.onLotterySuccess, self);
        GGlobal.reddot.remove(UIConst.WISHTREE_ACT, self.updateTargetRed, self);
        // GGlobal.reddot.remove(UIConst.WISHTREE_SYSTEM, self.updateTargetRed, self);
        // GGlobal.control.remove(UIConst.WISHTREE_TARGET, self.updateTargetRed, self);
        self.showMovie(false);
        len = self._rewardArr.length;
        for (var i = 0; i < len; i++) {
            var v = self._rewardArr[i];
            v.vo = null;
        }
    };
    Child_ActCom_WishTree.prototype.show = function () {
        var self = this;
        Timer.instance.listen(self.onUpdate, self);
        self.btnBuy1.addClickListener(self.onBuy1, self);
        self.btnBuy10.addClickListener(self.onBuy10, self);
        self.btnRank.addClickListener(self.onClickRank, self);
        self.btnCheck.addClickListener(self.onBtnCheck, self);
        self.btnTarget.addClickListener(self.onBtnTarget, self);
        self.vres10.setType(1);
        self.vres1.setType(1);
        self.btnBuy1.touchable = self.btnBuy10.touchable = true;
        self._rewardCfg = Config.xysjlb_328[this._vo.qs];
        var showArr = [];
        if (self._rewardCfg) {
            showArr = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(self._rewardCfg.zs));
            //花费
            if (this._cost1 == 0) {
                this._cost1 = Number(ConfigHelp.SplitStr(self._rewardCfg.cj1)[0][2]);
            }
            if (this._cost10 == 0) {
                this._cost10 = Number(ConfigHelp.SplitStr(self._rewardCfg.cj2)[0][2]);
            }
        }
        var len = self._rewardArr.length;
        for (var i = 0; i < len; i++) {
            var v = self._rewardArr[i];
            v.visible = true;
            v.isShowEff = true;
            v.tipEnabled = true;
            v.vo = showArr[i];
        }
        len = self.girdArr.length;
        for (var i = 0; i < len; i++) {
            self.girdArr[i].addEventListener(egret.TouchEvent.TOUCH_TAP, self.onGetPoint, self);
        }
        GGlobal.control.listen(UIConst.WISHTREE_ACT, self.updateView, self);
        GGlobal.control.listen(UIConst.WISHTREE_SYSTEM, self.updateView, self);
        GGlobal.control.listen(Enum_MsgType.WISHTREE_PRAY_MOVIE, self.onLotterySuccess, self);
        GGlobal.reddot.listen(UIConst.WISHTREE_ACT, self.updateTargetRed, self);
        // GGlobal.reddot.listen(UIConst.WISHTREE_SYSTEM, self.updateTargetRed, self);
        // GGlobal.control.listen(UIConst.WISHTREE_TARGET, self.updateTargetRed, self);
        var model = GGlobal.modelWishTree;
        model.targetMap = {};
        for (var key in Config.xysmbb_328) {
            var pointCfg = Config.xysmbb_328[key];
            if (pointCfg.qs == this._vo.qs) {
                model.targetMap[key] = 0;
            }
        }
        if (this._vo.id == UIConst.WISHTREE_SYSTEM) {
            self.btnRank.visible = false;
            GGlobal.modelEightLock.CG4571(this._vo.id);
            self.btnCheck.selected = !GGlobal.modelWishTree.isPlayMc7751;
        }
        else {
            self.btnRank.visible = true;
            GGlobal.modelActivity.CG_OPENACT(this._vo.id);
            self.btnCheck.selected = !GGlobal.modelWishTree.isPlayMc7219;
        }
        if (model.targetArr.length <= 0) {
            GGlobal.modelWishTree.CG_OPEN_TARGETUI(self._vo.id);
        }
    };
    /**
     * 更新送礼图标红点
     */
    Child_ActCom_WishTree.prototype.updateTargetRed = function () {
        // this.btnTarget.getChild("noticeImg").visible = GGlobal.reddot.checkCondition(this._vo.id, 1);
        var model = GGlobal.modelWishTree;
        var bol = false;
        var len = model.targetArr.length;
        var v;
        var cfg;
        for (var i = 0; i < len; i++) {
            v = model.targetArr[i];
            cfg = Config.xysslb_328[v.id];
            if (v.status == 1) {
                bol = true;
                break;
            }
            else if (v.status == 0 && model.wish >= cfg.time) {
                bol = true;
                break;
            }
        }
        this.btnTarget.getChild("noticeImg").visible = bol;
    };
    Child_ActCom_WishTree.prototype.onUpdate = function () {
        var end = this._vo ? this._vo.end : 0;
        var servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
        if (end - servTime > 0) {
            this.labTime.text = "剩余时间：<font color='#15f234'>" + DateUtil.getMSBySecond4(end - servTime) + "</font>";
        }
        else {
            this.labTime.text = "00:00:00";
        }
    };
    /**
     * 更新页面数据
     */
    Child_ActCom_WishTree.prototype.updateView = function () {
        var s = this;
        s.btnBuy1.touchable = s.btnBuy10.touchable = true;
        this.btnBuy1.enabled = this.btnBuy10.enabled = true;
        var model = GGlobal.modelWishTree;
        //积分奖励
        var pointMax = 0;
        var i = 0;
        for (var key in model.targetMap) {
            var pointCfg = Config.xysmbb_328[key];
            s.girdArr[i].setVo(pointCfg);
            pointMax = Number(pointCfg.cs);
            i++;
        }
        s.expBar.max = pointMax;
        s.expBar.value = model.wish;
        s.expBar._titleObject.text = model.wish + "/" + pointMax;
        s._itemCount = Model_Bag.getItemCount(416010);
        if (s._itemCount > 0) {
            ImageLoader.instance.loader(Enum_Path.ICON70_URL + "416010.png", s.vres1.getChild("icon").asLoader);
            this.vres1.text = "" + s._itemCount + "/1";
            this.vres1.color = Color.WHITEINT;
            this.btnBuy1.checkNotice = true;
        }
        else {
            s.vres1.icon = CommonManager.getMoneyUrl(Enum_Attr.yuanBao);
            this.vres1.text = "" + this._cost1;
            if (Model_player.voMine.yuanbao >= this._cost1) {
                this.vres1.color = Color.GREENINT;
            }
            else {
                this.vres1.color = Color.REDINT;
            }
            this.btnBuy1.checkNotice = false;
        }
        if (s._itemCount > 9) {
            ImageLoader.instance.loader(Enum_Path.ICON70_URL + "416010.png", s.vres10.getChild("icon").asLoader);
            this.vres10.text = "" + s._itemCount + "/10";
            this.vres10.color = Color.WHITEINT;
            this.btnBuy10.checkNotice = true;
        }
        else {
            s.vres10.icon = CommonManager.getMoneyUrl(Enum_Attr.yuanBao);
            this.vres10.text = "" + this._cost10;
            if (Model_player.voMine.yuanbao >= this._cost10) {
                this.vres10.color = Color.GREENINT;
            }
            else {
                this.vres10.color = Color.REDINT;
            }
            this.btnBuy10.checkNotice = false;
        }
        s.updateTargetRed();
    };
    Child_ActCom_WishTree.prototype.onLotterySuccess = function () {
        var t = this;
        var t_model = GGlobal.modelWishTree;
        if ((this._vo.id == UIConst.WISHTREE_SYSTEM && t_model.isPlayMc7751) || (this._vo.id == UIConst.WISHTREE_ACT && t_model.isPlayMc7219)) {
            //TODO 播放动画
            t.showMovie(true);
        }
        else {
            //不用播放动画
            t.showRewardPanel();
        }
        t.updateTargetRed();
    };
    Child_ActCom_WishTree.prototype.showRewardPanel = function () {
        var _this = this;
        var t = this;
        var t_model = GGlobal.modelWishTree;
        var t_resultList = t_model.resultList;
        if (!t_resultList || t_resultList.length <= 0)
            return;
        var t_type = 0;
        var t_need1 = 0;
        var t_need2 = 0;
        var t_showId = 0;
        if (t_resultList.length == 1) {
            //再来一次
            t_type = 1;
        }
        else {
            //再来10次
            t_type = 2;
        }
        if (t_model.checkItemEnough(t_type)) {
            //道具足够
            t_showId = 416010;
            t_need1 = 1;
            t_need2 = 10;
        }
        else {
            //道具不够，使用元宝
            if (t_type == 1) {
                t_showId = Number(ConfigHelp.SplitStr(t._rewardCfg.cj1)[0][1]);
            }
            else {
                t_showId = Number(ConfigHelp.SplitStr(t._rewardCfg.cj2)[0][1]);
            }
            t_need1 = this._cost1;
            t_need2 = this._cost10;
        }
        View_Reward_Show2.show(0, t_resultList.length, Handler.create(t, function () {
            if (t_resultList.length > 1)
                GGlobal.modelWishTree.CG_DRAW(2, _this._vo.id);
            else
                GGlobal.modelWishTree.CG_DRAW(1, _this._vo.id);
        }), t_resultList, t_need1, t_need2, t_showId);
        //显示大奖
        var t_bigItemList = [];
        for (var _i = 0, t_resultList_1 = t_resultList; _i < t_resultList_1.length; _i++) {
            var v = t_resultList_1[_i];
            if (v && v.quality > 5) {
                t_bigItemList.push(v);
            }
        }
        if (t_bigItemList.length > 0) {
            ViewCommonPrompt.textItemList(t_bigItemList);
        }
        t.updateView();
    };
    Child_ActCom_WishTree.prototype.showMovie = function (pFlag) {
        var t = this;
        var t_model = GGlobal.modelWishTree;
        if (pFlag) {
            if (t_model.isPlayingMc)
                return;
            if (!t._mc) {
                t._mc = EffectMgr.addEff("uieff/10058", t.displayListContainer, t.width / 2 + 15, t.height / 2 - 123, 1500, 1500, false);
                t._mc.refThis = t;
                t._mc.refKey = "_mc";
            }
            Timer.instance.callLater(t.runAfterMc, 1500, t);
            t_model.isPlayingMc = true;
        }
        else {
            if (Timer.instance.has(t.runAfterMc, t))
                Timer.instance.remove(t.runAfterMc, t);
            if (t._mc) {
                EffectMgr.instance.removeEff(t._mc);
            }
            t_model.isPlayingMc = false;
        }
    };
    Child_ActCom_WishTree.prototype.runAfterMc = function () {
        var t = this;
        t.showRewardPanel();
        t.showMovie(false);
    };
    Child_ActCom_WishTree.prototype.onBuy1 = function () {
        var model = GGlobal.modelWishTree;
        if (this._itemCount > 0) {
            model.CG_DRAW(1, this._vo.id);
        }
        else {
            if (Model_player.voMine.yuanbao < this._cost1) {
                ModelChongZhi.guideToRecharge();
                return;
            }
            model.CG_DRAW(1, this._vo.id);
        }
        this.btnBuy1.touchable = this.btnBuy10.touchable = false;
        this.btnBuy1.enabled = this.btnBuy10.enabled = false;
    };
    Child_ActCom_WishTree.prototype.onBuy10 = function () {
        var model = GGlobal.modelWishTree;
        if (this._itemCount > 9) {
            model.CG_DRAW(2, this._vo.id);
        }
        else {
            if (Model_player.voMine.yuanbao < this._cost10) {
                ModelChongZhi.guideToRecharge();
                return;
            }
            model.CG_DRAW(2, this._vo.id);
        }
        this.btnBuy1.touchable = this.btnBuy10.touchable = false;
        this.btnBuy1.enabled = this.btnBuy10.enabled = false;
    };
    Child_ActCom_WishTree.prototype.onGetPoint = function (e) {
        var v = e.currentTarget;
        // var vPoint:WishTreeVO = v.vo;
        var cfg = v.cfg;
        if (cfg == null)
            return;
        if (v.status <= 0)
            return;
        var model = GGlobal.modelWishTree;
        model.CG_GET_AWARD(cfg.id, this._vo.id);
    };
    Child_ActCom_WishTree.prototype.onClickRank = function () {
        GGlobal.layerMgr.open(UIConst.WISHTREE_RANK, { qs: this._vo.qs });
    };
    Child_ActCom_WishTree.prototype.onBtnCheck = function () {
        if (this._vo.id == UIConst.WISHTREE_SYSTEM) {
            GGlobal.modelWishTree.isPlayMc7751 = !this.btnCheck.selected;
        }
        else {
            GGlobal.modelWishTree.isPlayMc7219 = !this.btnCheck.selected;
        }
    };
    Child_ActCom_WishTree.prototype.onBtnTarget = function () {
        GGlobal.layerMgr.open(UIConst.WISHTREE_TARGET, { id: this._vo.id });
    };
    Child_ActCom_WishTree.URL = "ui://zyevj37nlwy21";
    /** 设置包名（静态属性） */
    Child_ActCom_WishTree.pkg = "ActCom_WishTree";
    return Child_ActCom_WishTree;
}(fairygui.GComponent));
__reflect(Child_ActCom_WishTree.prototype, "Child_ActCom_WishTree", ["IPanel"]);
