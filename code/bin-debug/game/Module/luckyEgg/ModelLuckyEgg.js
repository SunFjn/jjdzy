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
 * 幸运扭蛋数据管理器
 * @author: lujiahao
 * @date: 2020-01-03 18:23:15
 */
var ModelLuckyEgg = (function (_super) {
    __extends(ModelLuckyEgg, _super);
    function ModelLuckyEgg() {
        var _this = _super.call(this) || this;
        /** 奖池更新标识 */
        _this.poolUpdateFlag = false;
        _this.eggItemList = [];
        _this.eggItemMap = {};
        _this._poolVoMap = {};
        /** 免费注入次数 */
        _this.freePool = 0;
        /** 几次后可以免费注入 */
        _this.remain2Free = 0;
        /** 剩余抽奖次数 */
        _this.remainLottery = 0;
        /** 是否播放动画 */
        _this.isPlayMc = true;
        /** 正在播放动画的状态 */
        _this.isPlayingMc = false;
        _this._setupFlag = false;
        _this.lotteryResultList = [];
        _this._poolVoListMap = {};
        return _this;
    }
    ModelLuckyEgg.prototype.setup = function () {
        if (this._setupFlag)
            return;
        this._setupFlag = true;
        var t = this;
        {
            var t_cfg = Config.luckegg_295;
            for (var k in t_cfg) {
                var t_vo = new VoPoolLuckyEgg();
                t_vo.id = ~~k;
                t._poolVoMap[t_vo.id] = t_vo;
            }
        }
        // //test
        // for (let i = 0; i < 9; i++) {
        // 	let t_vo = new VoItemLuckyEgg();
        // 	t_vo.poolId = MathUtil.randomElement([11, 12, 13]);
        // 	t.eggItemList.push(t_vo);
        // }
    };
    //========================================= 协议相关 ========================================
    //协议处理
    ModelLuckyEgg.prototype.listenServ = function (mgr) {
        this.socket = mgr;
        //注册GC方法
        mgr.regHand(11000, this.GC_LuckyTwist_openUI_11000, this);
        mgr.regHand(11002, this.GC_LuckyTwist_draw_11002, this);
        mgr.regHand(11004, this.GC_LuckyTwist_chooseItem_11004, this);
    };
    /**11000 [I-[B-I-I-I]]-I-I-I 打开界面返回 [I:配置表index[B:道具类型I:道具idI:道具数量I:是否抽中 0未抽中 1已抽中]]注入奖励数据uiListI:免费次数numI:还剩几次后获得免费注入timesI:还可以抽多少次canTimes*/
    ModelLuckyEgg.prototype.GC_LuckyTwist_openUI_11000 = function (self, data) {
        var t_change = false;
        if (self.poolUpdateFlag) {
            t_change = true;
        }
        var t_checkMap = {};
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var arg1 = data.readInt(); //所属奖池id
            var len1 = data.readShort();
            for (var i_1 = 0; i_1 < len1; i_1++) {
                var arg2 = data.readByte(); //道具类型
                var arg3 = data.readInt(); //道具id
                var arg4 = data.readInt(); //道具数量
                var arg5 = data.readInt(); //是否抽中
                var t_key = StringUtil.combinKey([arg1, i_1]);
                var t_vo = self.eggItemMap[t_key];
                if (t_vo) {
                    //存在则修改
                }
                else {
                    //不存在则新增
                    t_vo = VoItemLuckyEgg.create();
                    t_vo.key = t_key;
                    self.eggItemMap[t_key] = t_vo;
                    self.eggItemList.push(t_vo);
                }
                if (t_vo.update({ poolId: arg1, itemId: arg3, count: arg4, itemType: arg2, hasGet: arg5 })) {
                    t_change = true;
                }
                t_checkMap[t_key] = true;
            }
        }
        for (var i = self.eggItemList.length - 1; i >= 0; i--) {
            var t_vo = self.eggItemList[i];
            if (t_checkMap[t_vo.key])
                continue;
            //删除不存在的数据
            self.eggItemList.splice(i, 1);
            delete self.eggItemMap[t_vo.key];
            VoItemLuckyEgg.recycle(t_vo);
            t_change = true;
        }
        var arg6 = data.readInt(); //免费注入次数
        var arg7 = data.readInt(); //再抽几次可免费注入
        var arg8 = data.readInt(); //剩余抽奖次数
        if (self.updateInfo({ freePool: arg6, remain2Free: arg7, remainLottery: arg8 })) {
            t_change = true;
        }
        if (t_change) {
            self.eggItemList.sort(function (a, b) {
                return b.sortValue - a.sortValue;
            });
            self.reddotCheck();
            if (self.poolUpdateFlag) {
                GGlobal.control.notify(Enum_MsgType.LUCKY_EGG_POOL_UPDATE);
            }
            else {
                GGlobal.control.notify(Enum_MsgType.LUCKY_EGG_UPDATE);
            }
        }
        if (self.poolUpdateFlag) {
            self.poolUpdateFlag = false;
        }
    };
    /** 更新相关信息接口 */
    ModelLuckyEgg.prototype.updateInfo = function (pData) {
        return ObjectUtils.modifyObject(this, pData);
    };
    /**11001  抽奖 */
    ModelLuckyEgg.prototype.CG_LuckyTwist_draw_11001 = function () {
        var t = this;
        if (t.isPlayingMc)
            return;
        if (t.eggItemList.length < 1) {
            ViewCommonWarn.text("请先注入奖励");
            return;
        }
        if (t.remainLottery < 1) {
            ViewCommonWarn.text("剩余抽奖次数不足了，请重新注入奖励");
            return;
        }
        if (!FastAPI.checkItemEnough(Enum_Attr.yuanBao, t.getConsumeCount(), true))
            return;
        var bates = this.getBytes();
        this.sendSocket(11001, bates);
    };
    /**11002 B-[B-I-I-I]-I 抽奖返回 B:状态 1成功 2已达到最大抽奖次数 3元宝不足 4奖池没有注入道具state[B:道具类型I:道具idI:道具数量I:是否大奖 0不是 1是]抽奖道具数据awardListI:还可以抽多少次times*/
    ModelLuckyEgg.prototype.GC_LuckyTwist_draw_11002 = function (self, data) {
        var t_change = false;
        var arg1 = data.readByte();
        switch (arg1) {
            case 1://成功
                t_change = true;
                self.lotteryResultList.length = 0;
                var len = data.readShort();
                for (var i = 0; i < len; i++) {
                    // let arg2 = data.readByte();
                    // let arg3 = data.readInt();
                    // let arg4 = data.readInt();
                    var t_itemVo = ConfigHelp.parseItemBa(data);
                    var arg5 = data.readInt();
                    t_itemVo.extra = arg5 == 1 ? 5 : 0;
                    self.lotteryResultList.push(t_itemVo);
                }
                var arg6 = data.readInt();
                self.remainLottery = arg6;
                break;
            case 2://已达到最大次数
                ViewCommonWarn.text("已达到最大抽奖次数");
                break;
            case 3:
                ViewCommonWarn.text("元宝不足");
                break;
            case 4:
                ViewCommonWarn.text("奖池没有道具了");
                break;
        }
        if (t_change) {
            GGlobal.control.notify(Enum_MsgType.LUCKY_EGG_LOTTERY);
            //重新请求全部信息
            GGlobal.modelActivity.CG_OPENACT(UIConst.ACTCOM_LUCKY_EGG);
        }
    };
    /**11003  奖池注入道具 */
    ModelLuckyEgg.prototype.CG_LuckyTwist_chooseItem_11003 = function () {
        //发送11003 成功会先返回 11004 再返回11000更新奖池物品信息
        var t = this;
        if (t.isPlayingMc)
            return;
        if (t.freePool <= 0) {
            if (!FastAPI.checkItemEnough(t.consumePutIn.id, t.consumePutIn.count, true))
                return;
        }
        var bates = this.getBytes();
        this.sendSocket(11003, bates);
    };
    /**11004 B 奖池注入道具返回 B:状态 1成功 2元宝不足state*/
    ModelLuckyEgg.prototype.GC_LuckyTwist_chooseItem_11004 = function (self, data) {
        var arg1 = data.readByte();
        switch (arg1) {
            case 1://成功
                self.poolUpdateFlag = true;
                break;
            case 2://元宝不足
                break;
        }
    };
    //=========================================== API ==========================================
    /** 获取当前活动期数 */
    ModelLuckyEgg.prototype.getCurQs = function () {
        var t_actVo = GGlobal.modelActivity.getActivityByID(UIConst.ACTCOM_LUCKY_EGG);
        if (t_actVo)
            return t_actVo.qs;
        else
            return 1;
    };
    ModelLuckyEgg.prototype.getPoolVoById = function (pId) {
        var t = this;
        return t._poolVoMap[pId];
    };
    /**
     * 通过期数获取奖池vo列表
     * @param pQs 期数
     */
    ModelLuckyEgg.prototype.getPoolVoListByQs = function (pQs) {
        var t = this;
        var t_list = t._poolVoListMap[pQs];
        if (t_list === undefined) {
            t._poolVoListMap[pQs] = t_list = [];
            for (var k in t._poolVoMap) {
                var t_vo = t._poolVoMap[k];
                if (t_vo && t_vo.cfg.qs == pQs) {
                    t_list.push(t_vo);
                }
            }
        }
        return t_list;
    };
    /**
     * 通过奖池类型获取奖池vo
     * @param pPoolType 奖池类型
     */
    ModelLuckyEgg.prototype.getPoolVoByType = function (pPoolType) {
        var t = this;
        var t_qs = t.getCurQs();
        var t_list = t.getPoolVoListByQs(t_qs);
        return t_list[pPoolType - 1];
    };
    /**
     * 通过奖池类型获取奖池物品列表
     * @param pPoolType
     */
    ModelLuckyEgg.prototype.getEggItemListByType = function (pPoolType) {
        var t = this;
        var t_list = [];
        for (var _i = 0, _a = t.eggItemList; _i < _a.length; _i++) {
            var v = _a[_i];
            if (v.poolType == pPoolType) {
                t_list.push(v);
            }
        }
        return t_list;
    };
    Object.defineProperty(ModelLuckyEgg.prototype, "consumePutIn", {
        /** 注入消耗 */
        get: function () {
            var t = this;
            if (t._consumePutIn === undefined) {
                var t_list = ConfigHelp.makeItemListArr(FastAPI.getSystemValue(7009));
                t._consumePutIn = t_list[0];
            }
            return t._consumePutIn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModelLuckyEgg.prototype, "lotteryTimes", {
        /** 已抽取的次数 */
        get: function () {
            var t = this;
            var t_max = EnumLuckyEgg.MAX_LOTTERY_COUNT;
            var t_passTimes = t_max - t.remainLottery;
            t_passTimes = t_passTimes < 0 ? 0 : t_passTimes;
            return t_passTimes;
        },
        enumerable: true,
        configurable: true
    });
    /** 获取抽奖消耗 */
    ModelLuckyEgg.prototype.getConsumeCount = function () {
        var t = this;
        var t_passTimes = t.lotteryTimes;
        if (t._timesNeedList === undefined) {
            t._timesNeedList = [];
            var t_cfg = Config.luckeggcj_295;
            for (var k in t_cfg) {
                var t_list = ConfigHelp.makeItemListArr(t_cfg[k].consume);
                t._timesNeedList.push(t_list[0]);
            }
        }
        if (t_passTimes < t._timesNeedList.length) {
            return t._timesNeedList[t_passTimes].count;
        }
        else {
            return t._timesNeedList[t._timesNeedList.length - 1].count;
        }
    };
    //===================================== private method =====================================
    ModelLuckyEgg.prototype.reddotCheck = function () {
        var t = this;
        var t_value = t.freePool > 0;
        GGlobal.reddot.setCondition(UIConst.ACTCOM_LUCKY_EGG, 0, t_value);
        GGlobal.reddot.notify(UIConst.ACTCOM);
    };
    return ModelLuckyEgg;
}(BaseModel));
__reflect(ModelLuckyEgg.prototype, "ModelLuckyEgg");
