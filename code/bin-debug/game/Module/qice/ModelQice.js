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
 * 奇策数据管理器
 * @author: lujiahao
 * @date: 2019-10-18 16:25:53
 */
var ModelQice = (function (_super) {
    __extends(ModelQice, _super);
    function ModelQice() {
        var _this = _super.call(this) || this;
        _this._voMap = {};
        _this._cfgStarMap = {};
        _this._cfgLevelMap = {};
        _this._cfgSuitMap = {};
        _this._targetVoMap = {};
        /** 套装等级 */
        _this.suitLv = 0;
        /** 已抽奖次数 */
        _this.lotteryCount = 0;
        /** 最大抽奖目标数 */
        _this.maxLotteryCount = 0;
        /** 抽奖正在播放动画的状态 */
        _this.isPlayingMc = false;
        _this.cfgLottery = new CfgLotteryQice();
        /** 是否播放抽奖动画 */
        _this.isPlayMc = true;
        _this._setupFlag = false;
        _this.lotteryResultList = [];
        return _this;
    }
    ModelQice.prototype.setup = function () {
        if (this._setupFlag)
            return;
        this._setupFlag = true;
        var f = fairygui.UIObjectFactory.setPackageItemExtension;
        // f(ViewSuitQice.URL, ViewSuitQice);
        f(QiceSuitItem.URL, QiceSuitItem);
        f(ChildLevelQice.URL, ChildLevelQice);
        f(ChildLotteryQice.URL, ChildLotteryQice);
        // f(ViewQice.URL, ViewQice);
        f(ChildStarQice.URL, ChildStarQice);
        f(QiceRewardItem.URL, QiceRewardItem);
        f(QiceItemGrid.URL, QiceItemGrid);
        {
            var t_cfg = Config.qc_760;
            for (var k in t_cfg) {
                var t_vo = new VoQice();
                t_vo.id = ~~k;
                this._voMap[t_vo.id] = t_vo;
            }
        }
        {
            var t_cfg = Config.cmhcmb_761;
            for (var k in t_cfg) {
                var t_vo = new VoTargetQice();
                t_vo.id = ~~k;
                this._targetVoMap[t_vo.id] = t_vo;
                if (t_vo.cfg.pt > this.maxLotteryCount)
                    this.maxLotteryCount = t_vo.cfg.pt;
            }
        }
        GGlobal.control.register(true, Enum_MsgType.MSG_BAG_ITME_UPDATE, this.onBagChange, this);
    };
    //========================================= 协议相关 ========================================
    //协议处理
    ModelQice.prototype.listenServ = function (mgr) {
        this.socket = mgr;
        //注册GC方法
        mgr.regHand(9702, this.GC_QiCe_openQiCe_9702, this);
        mgr.regHand(9704, this.GC_QiCe_upQiCe_9704, this);
        mgr.regHand(9706, this.GC_QiCe_upQCtaozhuang_9706, this);
        mgr.regHand(9708, this.GC_QiCe_eatDan_9708, this);
        mgr.regHand(9710, this.GC_QiCe_upQiCeJie_9710, this);
        mgr.regHand(9752, this.GC_QiCeDraw_openUI_9752, this);
        mgr.regHand(9754, this.GC_QiCeDraw_draw_9754, this);
        mgr.regHand(9756, this.GC_QiCeDraw_getAward_9756, this);
    };
    /**9701  打开奇策 */
    ModelQice.prototype.CG_QiCe_openQiCe_9701 = function () {
        var bates = this.getBytes();
        this.sendSocket(9701, bates);
    };
    /**9702 [I-I-I-I-I]-I 打开奇策返回 [I:奇策idI:奇策星级I:奇策阶数I:奇策吞噬兵魂数量I:奇策吞噬将魂数量]奇策列表sendListI:奇策套装等级taozhuanLv*/
    ModelQice.prototype.GC_QiCe_openQiCe_9702 = function (self, data) {
        var t_change = false;
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var t_id = data.readInt(); //id
            var t_star = data.readInt(); //星级
            var t_level = data.readInt(); //等级
            var t_bHun = data.readInt(); //兵魂
            var t_jHun = data.readInt(); //将魂
            var t_vo = self.getVoById(t_id);
            if (t_vo && t_vo.update(t_level, t_star, t_bHun, t_jHun)) {
                t_change = true;
            }
        }
        var t_suitLv = data.readInt(); //套装等级
        if (self.suitLv != t_suitLv) {
            self.suitLv = t_suitLv;
            t_change = true;
        }
        if (t_change) {
            self.reddotCheckStar();
            self.reddotCheckLevel();
            GGlobal.control.notify(Enum_MsgType.QICE_INFO_UPDATE);
        }
    };
    /**9703 I 激活/升星奇策 I:奇策idindex*/
    ModelQice.prototype.CG_QiCe_upQiCe_9703 = function (pId) {
        var bates = this.getBytes();
        bates.writeInt(pId);
        this.sendSocket(9703, bates);
    };
    /**9704 B-I-I 激活/升星奇策返回 B:0成功 1星级达到上限 2道具不足stateI:奇策idindexI:奇策星级star*/
    ModelQice.prototype.GC_QiCe_upQiCe_9704 = function (self, data) {
        var t_change = false;
        var arg1 = data.readByte();
        var arg2 = data.readInt();
        var arg3 = data.readInt();
        var t_vo = self.getVoById(arg2);
        if (!t_vo)
            return;
        switch (arg1) {
            case 0://成功
                if (t_vo.star != arg3) {
                    t_vo.star = arg3;
                    t_change = true;
                }
                break;
            case 1:
                ViewCommonWarn.text("已达到满星");
                break;
            case 2:
                ViewCommonWarn.text("缺少道具：" + FastAPI.getItemName(t_vo.consumeList[0].id, true));
                break;
        }
        if (t_change) {
            self.reddotCheckStar();
            self.reddotCheckLevel();
            GGlobal.control.notify(Enum_MsgType.QICE_STAR_UP, { id: arg2 });
        }
    };
    /**9705  升级奇策套装 */
    ModelQice.prototype.CG_QiCe_upQCtaozhuang_9705 = function () {
        if (!this.checkSuitCanUp(true))
            return;
        var bates = this.getBytes();
        this.sendSocket(9705, bates);
    };
    /**9706 B-I 升级奇策套装返回 B:0成功 1失败stateI:套装等级taozhuangLv*/
    ModelQice.prototype.GC_QiCe_upQCtaozhuang_9706 = function (self, data) {
        var t_change = false;
        var t_isActive = false;
        var arg1 = data.readByte();
        var arg2 = data.readInt();
        switch (arg1) {
            case 0://成功
                if (self.suitLv != arg2) {
                    var t_oldLv = self.suitLv;
                    self.suitLv = arg2;
                    t_change = true;
                    if (t_oldLv == 0 && arg2 > 0) {
                        t_isActive = true;
                    }
                }
                break;
            case 1:
                break;
        }
        if (t_change) {
            self.reddotCheckStar();
            GGlobal.control.notify(Enum_MsgType.QICE_SUIT_UPDATE);
        }
        if (t_isActive) {
            //发送套装激活的事件
            GGlobal.control.notify(Enum_MsgType.QICE_SUIT_ACTIVE);
        }
    };
    /**9707 I-I-I 吞噬 I:吞噬类型 0一个 1一键eatTypeI:奇策idindexI:奇策吞噬表的索引id（1兵魂 2将魂）dan*/
    ModelQice.prototype.CG_QiCe_eatDan_9707 = function (pType, pId, pHunType) {
        var t_vo = this.getVoById(pId);
        if (!t_vo.isActive) {
            ViewCommonWarn.text("\u8BF7\u5148\u6FC0\u6D3B" + t_vo.nameWithColor);
            return;
        }
        var t_cfg = Config.qcts_760[pHunType];
        if (!t_cfg)
            return;
        var t_itemCfg = Config.daoju_204[t_cfg.id];
        if (!t_itemCfg)
            return;
        if (!FastAPI.checkItemEnough(t_itemCfg.id, 1, true))
            return;
        var bates = this.getBytes();
        bates.writeInt(pType);
        bates.writeInt(pId);
        bates.writeInt(pHunType);
        this.sendSocket(9707, bates);
    };
    /**9708 B-I-I-I 吞噬返回 B:0成功 1未激活奇策 2超过最大吞噬值 3stateI:奇策idindexI:奇策吞噬表iddanI:兵魂/将魂的吞噬量num*/
    ModelQice.prototype.GC_QiCe_eatDan_9708 = function (self, data) {
        var t_change = false;
        var arg1 = data.readByte();
        var arg2 = data.readInt();
        var arg3 = data.readInt();
        var arg4 = data.readInt();
        switch (arg1) {
            case 0://成功
                var t_vo = self.getVoById(arg2);
                if (t_vo) {
                    switch (arg3) {
                        case EnumQice.HUN_TYPE_BH:
                            if (t_vo.bHun != arg4) {
                                t_vo.bHun = arg4;
                                t_change = true;
                            }
                            break;
                        case EnumQice.HUN_TYPE_JH:
                            if (t_vo.jHun != arg4) {
                                t_vo.jHun = arg4;
                                t_change = true;
                            }
                            break;
                    }
                }
                break;
            case 1:
                ViewCommonWarn.text("奇策尚未激活");
                break;
            case 2:
                ViewCommonWarn.text("已达吞噬上限");
                break;
            case 3:
                break;
        }
        if (t_change) {
            self.reddotCheckStar();
            GGlobal.control.notify(Enum_MsgType.QICE_HUN_CHANGE, { id: arg2 });
        }
    };
    /**9709 I 奇策升阶 I:奇策idindex*/
    ModelQice.prototype.CG_QiCe_upQiCeJie_9709 = function (pId) {
        var t_vo = this.getVoById(pId);
        if (!t_vo.isActive) {
            ViewCommonWarn.text("\u8BF7\u5148\u6FC0\u6D3B" + t_vo.nameWithColor);
            return;
        }
        var bates = this.getBytes();
        bates.writeInt(pId);
        this.sendSocket(9709, bates);
    };
    /**9710 B-I-I 奇策升阶返回 B:0成功 1先激活该奇策 2不满足升阶条件 3阶数已满级 4材料不足stateI:奇策idindexI:奇策阶数JieLv*/
    ModelQice.prototype.GC_QiCe_upQiCeJie_9710 = function (self, data) {
        var t_change = false;
        var arg1 = data.readByte();
        var arg2 = data.readInt();
        var arg3 = data.readInt();
        var t_vo = self.getVoById(arg2);
        if (!t_vo)
            return;
        switch (arg1) {
            case 0:
                if (t_vo.level != arg3) {
                    t_vo.level = arg3;
                    t_change = true;
                }
                break;
            case 1:
                ViewCommonWarn.text("请先激活奇策");
                break;
            case 2:
                ViewCommonWarn.text(ConfigHelp.reTxt("需要奇策达到{0}星", t_vo.curLevelCfg.cfg.tj));
                break;
            case 3:
                ViewCommonWarn.text("当前奇策已满级");
                break;
            case 4:
                ViewCommonWarn.text("缺少道具：" + FastAPI.getItemName(t_vo.curLevelCfg.consumeList[0].id, true));
                break;
        }
        if (t_change) {
            self.reddotCheckLevel();
            GGlobal.control.notify(Enum_MsgType.QICE_LEVEL_UP, { id: arg2 });
        }
    };
    /**9751  打开界面 */
    ModelQice.prototype.CG_QiCeDraw_openUI_9751 = function () {
        var bates = this.getBytes();
        this.sendSocket(9751, bates);
    };
    /**9752 [I-I]-I 打开界面返回 [I:目标idI:奖励状态 -1已领取 0条件不符 >0可领次数]目标列表targetRewardListI:抽奖次数num*/
    ModelQice.prototype.GC_QiCeDraw_openUI_9752 = function (self, data) {
        var t_change = false;
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var arg1 = data.readInt();
            var arg2 = data.readInt();
            var t_vo = self.getTargetVoById(arg1);
            if (t_vo && t_vo.update(arg2)) {
                t_change = true;
            }
        }
        var arg3 = data.readInt();
        if (self.lotteryCount != arg3) {
            self.lotteryCount = arg3;
            t_change = true;
        }
        if (t_change) {
            self.reddotCheckLottery();
            GGlobal.control.notify(Enum_MsgType.QICE_LOTTERY_UPDATE);
        }
    };
    /**9753 B 抽奖 B:抽奖类型 1为1次 2为10次type*/
    ModelQice.prototype.CG_QiCeDraw_draw_9753 = function (pType) {
        var t = this;
        //正在播放动画中不能抽奖
        if (this.isPlayingMc)
            return;
        var t_needMoney = 0;
        var t_itemId = 0;
        var t_itemNoEnough = false;
        switch (pType) {
            case 1:
                if (!FastAPI.checkItemEnough(t.cfgLottery.consumeItem1.id, t.cfgLottery.consumeItem1.count, false)) {
                    t_itemNoEnough = true;
                    t_needMoney = this.cfgLottery.consume1.count;
                    t_itemId = this.cfgLottery.consume1.id;
                }
                break;
            case 2:
                if (!FastAPI.checkItemEnough(t.cfgLottery.consumeItem10.id, t.cfgLottery.consumeItem10.count, false)) {
                    t_itemNoEnough = true;
                    t_needMoney = this.cfgLottery.consume10.count;
                    t_itemId = this.cfgLottery.consume10.id;
                }
                break;
        }
        if (t_itemNoEnough) {
            if (t_needMoney <= 0 || t_itemId <= 0)
                return;
            if (!FastAPI.checkItemEnough(t_itemId, t_needMoney, true))
                return;
        }
        var bates = this.getBytes();
        bates.writeByte(pType);
        this.sendSocket(9753, bates);
    };
    /**9754 B-[B-I-I-B]-[I-I]-I 抽奖返回 B:状态 1成功 2元宝不足state[B:道具类型I:道具idI:道具数量B:是否大奖]道具列表awardList[I:目标idI:状态 -1已领取 0条件不符 >0次数]目标列表targetRewardListI:抽奖次数num*/
    ModelQice.prototype.GC_QiCeDraw_draw_9754 = function (self, data) {
        var t_change = false;
        var arg1 = data.readByte();
        switch (arg1) {
            case 1:
                self.lotteryResultList.length = 0;
                {
                    var len = data.readShort();
                    for (var i = 0; i < len; i++) {
                        // let arg2 = data.readByte();
                        // let arg3 = data.readInt();
                        // let arg4 = data.readInt();
                        var t_itemVO = ConfigHelp.parseItemBa(data);
                        var arg5 = data.readByte();
                        t_itemVO.extra = arg5 == 1 ? 5 : 0;
                        self.lotteryResultList.push(t_itemVO);
                    }
                }
                {
                    var len = data.readShort();
                    for (var i = 0; i < len; i++) {
                        var arg6 = data.readInt();
                        var arg7 = data.readInt();
                        var t_vo = self.getTargetVoById(arg6);
                        if (t_vo && t_vo.update(arg7)) {
                            t_change = true;
                        }
                    }
                }
                var arg8 = data.readInt();
                if (self.lotteryCount != arg8) {
                    self.lotteryCount = arg8;
                    t_change = true;
                }
                break;
            case 2:
                break;
        }
        if (t_change) {
            self.reddotCheckLottery();
            GGlobal.control.notify(Enum_MsgType.QICE_LOTTERY_SUCCESS);
        }
    };
    /**9755 I 领取目标奖励 I:目标idid*/
    ModelQice.prototype.CG_QiCeDraw_getAward_9755 = function (arg1) {
        var bates = this.getBytes();
        bates.writeInt(arg1);
        this.sendSocket(9755, bates);
    };
    /**9756 B-I-I 领取目标奖励返回 B:状态 1成功 2条件不符 3背包已满 4参数错误 5已领取stateI:目标ididI:目标奖励状态 -1已领取 0条件不符 >0奖励次数flag*/
    ModelQice.prototype.GC_QiCeDraw_getAward_9756 = function (self, data) {
        var t_change = false;
        var arg1 = data.readByte();
        var arg2 = data.readInt();
        var arg3 = data.readInt();
        switch (arg1) {
            case 1:
                var t_vo = self.getTargetVoById(arg2);
                if (t_vo && t_vo.update(arg3)) {
                    t_change = true;
                }
                break;
            case 2:
                ViewCommonWarn.text("条件不符");
                break;
            case 3:
                ViewCommonWarn.text("背包已满");
                break;
            case 4:
                ViewCommonWarn.text("参数错误");
                break;
            case 5:
                ViewCommonWarn.text("您已经领取过该奖励了");
                break;
        }
        if (t_change) {
            self.reddotCheckLottery();
            GGlobal.control.notify(Enum_MsgType.QICE_TARGET_UPDATE);
        }
    };
    //=========================================== API ==========================================
    ModelQice.prototype.getVoById = function (pId) {
        return this._voMap[pId];
    };
    ModelQice.prototype.getVoList = function () {
        if (this._voList === undefined) {
            this._voList = [];
            for (var k in this._voMap) {
                this._voList.push(this._voMap[k]);
            }
        }
        return this._voList;
    };
    /** 获取升星配置 */
    ModelQice.prototype.getCfgStar = function (pId) {
        var t_vo = this._cfgStarMap[pId];
        if (t_vo === undefined) {
            if (Config.qcsx_760[pId]) {
                t_vo = new CfgStarQice();
                t_vo.id = pId;
                this._cfgStarMap[pId] = t_vo;
            }
            else
                this._cfgStarMap[pId] = null;
        }
        return t_vo;
    };
    /** 获取升级配置 */
    ModelQice.prototype.getCfgLevel = function (pId) {
        var t_vo = this._cfgLevelMap[pId];
        if (t_vo === undefined) {
            if (Config.qcsj_760[pId]) {
                t_vo = new CfgLevelQice();
                t_vo.id = pId;
                this._cfgLevelMap[pId] = t_vo;
            }
            else
                this._cfgLevelMap[pId] = null;
        }
        return t_vo;
    };
    /** 获取套装配置 */
    ModelQice.prototype.getCfgSuit = function (pId) {
        var t_vo = this._cfgSuitMap[pId];
        if (t_vo === undefined) {
            if (Config.qctz_760[pId]) {
                t_vo = new CfgSuitQice();
                t_vo.level = pId;
                this._cfgSuitMap[pId] = t_vo;
            }
            else
                this._cfgSuitMap[pId] = null;
        }
        return t_vo;
    };
    /** 当前套装配置 */
    ModelQice.prototype.getCurCfgSuit = function () {
        if (this.suitLv > 0) {
            return this.getCfgSuit(this.suitLv);
        }
        return null;
    };
    /** 下一级套装配置 */
    ModelQice.prototype.getNextCfgSuit = function () {
        return this.getCfgSuit(this.suitLv + 1);
    };
    /** 上一级套装配置 */
    ModelQice.prototype.getLastCfgSuit = function () {
        if (this.suitLv > 0)
            return this.getCfgSuit(this.suitLv - 1);
        return null;
    };
    /** 获取出谋划策目标奖励 */
    ModelQice.prototype.getTargetVoById = function (pId) {
        return this._targetVoMap[pId];
    };
    /** 获取目标奖励数据列表 */
    ModelQice.prototype.getTargetVoList = function () {
        if (this._targetVoList === undefined) {
            this._targetVoList = [];
            for (var k in this._targetVoMap) {
                this._targetVoList.push(this._targetVoMap[k]);
            }
        }
        return this._targetVoList;
    };
    /** 检查套装是否可升级 */
    ModelQice.prototype.checkSuitCanUp = function (pShowAlert) {
        var t_result = false;
        var t = this;
        do {
            var t_nextCfg = t.getNextCfgSuit();
            if (!t_nextCfg) {
                pShowAlert && ViewCommonWarn.text("套装已经升满了");
                continue;
            }
            if (!t_nextCfg.checkCanUp()) {
                pShowAlert && ViewCommonWarn.text("\u9700\u8981\u6240\u6709\u5947\u7B56\u5747\u8FBE\u5230" + t_nextCfg.requireStar + "\u661F\u6216\u4EE5\u4E0A");
                continue;
            }
            t_result = true;
        } while (false);
        return t_result;
    };
    /** 检查升星红点 */
    ModelQice.prototype.reddotCheckStar = function () {
        var t = this;
        var t_value = 0;
        do {
            var t_dataList = t.getVoList();
            for (var _i = 0, t_dataList_1 = t_dataList; _i < t_dataList_1.length; _i++) {
                var v = t_dataList_1[_i];
                if (v.checkCanStarUp(false)
                    || v.checkHunCanUp(EnumQice.HUN_TYPE_BH, false)
                    || v.checkHunCanUp(EnumQice.HUN_TYPE_JH, false)) {
                    t_value = 1;
                    break;
                }
            }
            if (t_value)
                continue;
            if (t.checkSuitCanUp(false)) {
                t_value = 1;
                continue;
            }
        } while (false);
        ReddotMgr.ins().setValue(UIConst.QICE_STAR + "", t_value);
    };
    /** 检查升级红点 */
    ModelQice.prototype.reddotCheckLevel = function () {
        var t = this;
        var t_value = 0;
        var t_dataList = t.getVoList();
        for (var _i = 0, t_dataList_2 = t_dataList; _i < t_dataList_2.length; _i++) {
            var v = t_dataList_2[_i];
            if (v.checkCanLevelUp(false)) {
                t_value = 1;
                break;
            }
        }
        ReddotMgr.ins().setValue(UIConst.QICE_LEVEL + "", t_value);
    };
    /** 检查抽奖红点 */
    ModelQice.prototype.reddotCheckLottery = function () {
        var t = this;
        var t_value = 0;
        do {
            var t_dataList = t.getTargetVoList();
            for (var _i = 0, t_dataList_3 = t_dataList; _i < t_dataList_3.length; _i++) {
                var v = t_dataList_3[_i];
                if (v.state == 1) {
                    t_value = 1;
                    break;
                }
            }
            if (t_value)
                continue;
            if (t.cfgLottery.checkItemEnough(1) || t.cfgLottery.checkItemEnough(2)) {
                t_value = 1;
                break;
            }
        } while (false);
        ReddotMgr.ins().setValue(UIConst.QICE_LOTTERY + "", t_value);
    };
    //===================================== private method =====================================
    //======================================== handler =========================================
    ModelQice.prototype.onBagChange = function () {
        var t = this;
        t.reddotCheckStar();
        t.reddotCheckLevel();
        t.reddotCheckLottery();
    };
    return ModelQice;
}(BaseModel));
__reflect(ModelQice.prototype, "ModelQice");
