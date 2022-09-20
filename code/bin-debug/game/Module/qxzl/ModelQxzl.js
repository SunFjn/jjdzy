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
 * 群雄逐鹿模块管理器
 * @author: lujiahao
 * @date: 2019-09-25 15:35:38
 */
var ModelQxzl = (function (_super) {
    __extends(ModelQxzl, _super);
    function ModelQxzl() {
        var _this = _super.call(this) || this;
        _this._cityVoMap = {};
        _this._countryVoList = [];
        _this._taskVoMap = {};
        _this._tabTypeTaskVoListMap = {};
        _this._shopVoMap = {};
        _this._rankVoMap = {};
        /** 当前体力 */
        _this.curStamina = 0;
        /** 最大体力 */
        _this.maxStamina = 0;
        /** 已购买体力次数 */
        _this.buyTimes = 0;
        /** 上次恢复体力的时间戳(s) */
        _this.lastRecoverTs = 0;
        /** 个人积分 */
        _this.myScore = 0;
        /** 我的个人排名 */
        _this.myRank = 0;
        /** 当前所在城池 */
        _this.curCityId = 0;
        /** 是否在驻守状态 */
        _this.isInCity = 0;
        /** mvp信息 */
        _this.mvpInfo = new VoMvpQxzl();
        /** 战斗的敌方id */
        _this.battleId = 0;
        /** 战斗的敌方类型0玩家1NPC */
        _this.battleType = 0;
        /** 战斗缓存index，用作结果回传给服务器 */
        _this.battleIndex = 0;
        /** 我的国家的城池列表 */
        _this.myCountryCityList = [];
        /** 驻守累积奖励 */
        _this.rewardList = [];
        /** 活动是否结束 */
        _this.isEnd = 1;
        /** 单枪匹马持续分钟(按秒算) */
        _this.buffTime = 0;
        _this._mainCityMap = {
            1: 401,
            2: 402,
            3: 403
        };
        _this._setupFlag = false;
        _this._initFlag = false;
        /** 个人排行列表 */
        _this.personRankList = [];
        /** 我的个人排名 */
        _this.myPersonRank = 0;
        /** 我的个人积分 */
        _this.myPersonScore = 0;
        _this._rankVoListMap = {};
        _this._rankPlayerListMap = {};
        _this._eventVoListMap = {};
        _this._typeVoListMap = {};
        _this.maxBuyTimes = 0;
        return _this;
    }
    ModelQxzl.prototype.setup = function () {
        if (this._setupFlag)
            return;
        this._setupFlag = true;
        var f = fairygui.UIObjectFactory.setPackageItemExtension;
        // f(ViewRankQxzl.URL, ViewRankQxzl);
        f(QxzlCountryRankItem.URL, QxzlCountryRankItem);
        f(QxzlMapGUI.URL, QxzlMapGUI);
        // f(ViewQxzl.URL, ViewQxzl);
        f(QxzlCityItem.URL, QxzlCityItem);
        // f(ViewCityInfoQxzl.URL, ViewCityInfoQxzl);
        f(RoleInfoItem.URL, RoleInfoItem);
        f(QxzlPlayerRankItem.URL, QxzlPlayerRankItem);
        // f(ViewEventQxzl.URL, ViewEventQxzl);
        f(QxzlLogCom.URL, QxzlLogCom);
        f(QxzlHead.URL, QxzlHead);
        // f(ViewTaskQxzl.URL, ViewTaskQxzl);
        f(QxzlTaskItem.URL, QxzlTaskItem);
        f(QxzlShopItem.URL, QxzlShopItem);
        // f(ViewShopQxzl.URL, ViewShopQxzl);
        f(QxzlPlayerPersonRankItem.URL, QxzlPlayerPersonRankItem);
        f(QxzlPlayerPersonRankItem.URL, QxzlPlayerPersonRankItem);
        {
            var t_cfg = Config.qxzl_273;
            for (var k in t_cfg) {
                var t_vo = new VoCityQxzl();
                t_vo.id = ~~k;
                this._cityVoMap[t_vo.id] = t_vo;
            }
        }
        {
            var t_cfg = Config.qxzlrw_273;
            for (var k in t_cfg) {
                var t_id = ~~k;
                var t_vo = this._taskVoMap[t_id];
                if (!t_vo) {
                    t_vo = new VoTaskQxzl();
                    t_vo.id = t_id;
                    this._taskVoMap[t_vo.id] = t_vo;
                }
                if (t_vo.cfg.next > 0) {
                    var t_nextVo = this._taskVoMap[t_vo.cfg.next];
                    if (!t_nextVo && t_cfg[t_vo.cfg.next]) {
                        t_nextVo = new VoTaskQxzl();
                        t_nextVo.id = t_vo.cfg.next;
                        this._taskVoMap[t_nextVo.id] = t_nextVo;
                        t_nextVo.lastId = t_vo.id;
                        t_nextVo.lastVo = t_vo;
                        t_vo.nextVo = t_nextVo;
                    }
                }
            }
        }
        {
            var t_cfg = Config.qxzlstore_273;
            for (var k in t_cfg) {
                var t_vo = new VoShopQxzl();
                t_vo.id = ~~k;
                this._shopVoMap[t_vo.id] = t_vo;
            }
        }
        {
            var t_cfg = Config.qxzlrank_273;
            for (var k in t_cfg) {
                var t_vo = new VoRankQxzl();
                t_vo.id = ~~k;
                this._rankVoMap[t_vo.id] = t_vo;
            }
        }
        for (var i = 0; i < 3; i++) {
            var t_vo = new VoCountryQxzl();
            t_vo.countryId = i + 1;
            this._countryVoList.push(t_vo);
        }
        // GGlobal.reddot.register(true, UIConst.QXZL, this.onReddotUpdate, this);
        //每次登陆点亮一个红点
        Timer.instance.callLater(function () {
            GGlobal.reddot.setCondition(UIConst.QXZL, 5, true);
        }, 3000, this);
    };
    // private onReddotUpdate() {
    //     console.log("================================");
    //     for (let i = 0; i < 6; i++) {
    //         console.log("=========", GGlobal.reddot.checkCondition(UIConst.QXZL, i));
    //     }
    //     console.log("==========+++++++++++++++=======");
    // }
    //========================================= 协议相关 ========================================
    ModelQxzl.prototype.listenServ = function (mgr) {
        _super.prototype.listenServ.call(this, mgr);
        mgr.regHand(8958, this.GC_QunXiongZhuLu_openBaoKuUI_8958, this);
        mgr.regHand(8962, this.GC_QunXiongZhuLu_exchange_8962, this);
        mgr.regHand(8956, this.GC_QunXiongZhuLu_openTaskUI_8956, this);
        mgr.regHand(8964, this.GC_QunXiongZhuLu_getTaskReward_8964, this);
        mgr.regHand(8954, this.GC_QunXiongZhuLu_openRankUI_8954, this);
        mgr.regHand(8966, this.GC_QunXiongZhuLu_openCountryRankUI_8966, this);
        mgr.regHand(8960, this.GC_QunXiongZhuLu_openRecord_8960, this);
        mgr.regHand(8968, this.GC_QunXiongZhuLu_move_8968, this);
        mgr.regHand(8970, this.GC_QunXiongZhuLu_showCityInfo_8970, this);
        mgr.regHand(8972, this.GC_QunXiongZhuLu_attack_8972, this);
        mgr.regHand(8952, this.GC_QunXiongZhuLu_enterMap_8952, this);
        mgr.regHand(8974, this.GC_QunXiongZhuLu_battleResult_8974, this);
        mgr.regHand(8976, this.GC_QunXiongZhuLu_buySta_8976, this);
        mgr.regHand(8978, this.GC_QunXiongZhuLu_getDefendAwardInfo_8978, this);
        mgr.regHand(8980, this.GC_QunXiongZhuLu_gotDefendAward_8980, this);
        mgr.regHand(8982, this.GC_QunXiongZhuLu_pushInfo_8982, this);
        mgr.regHand(8984, this.GC_OpenPersonRankUI_8984, this);
        mgr.regHand(8986, this.GC_BuffBuy_8986, this);
    };
    /**8951  进入地图 */
    ModelQxzl.prototype.CG_QunXiongZhuLu_enterMap_8951 = function () {
        var bates = this.getBytes();
        this.sendSocket(8951, bates);
        if (!this._initFlag) {
            this._initFlag = true;
            //初始化自己的所在地，初始化为自己国家的主城
            this.curCityId = this.getMainCityIdByCountryId(this.myCountry);
            //初始化三个主城的国家归属
            for (var k in this._mainCityMap) {
                var t_countryId = ~~k;
                var t_cityId = this._mainCityMap[k];
                var t_vo = this.getCityVoById(t_cityId);
                if (t_vo) {
                    t_vo.countryId = t_countryId;
                }
            }
        }
    };
    /**8952 B-B-I-[I-I-L]-I-I-I-L-I-B-[I-I-B-I] 进入地图返回 B:状态:0成功,1未开启stateB:是否结束:0-开始中,1-已结束isEndI:已购买体力次数buyTiLiTimes[I:国家idI:占领城池数量L:国家总积分]国家信息countryInfoI:最大值体力maxTLI:当前值体力nowTLI:上次恢复时间戳lastAddTLTimeL:个人积分myJiFenI:当前城池idnowCityB:是否驻守状态isInCity[I:城池idI:城池归属国家B:是否庆典城池I:驻守人数]城池信息cityInfoI:单枪匹马持续分钟,0为未激活*/
    ModelQxzl.prototype.GC_QunXiongZhuLu_enterMap_8952 = function (self, data) {
        //打开界面后灭了登陆的红点
        if (GGlobal.reddot.checkCondition(UIConst.QXZL, 5))
            GGlobal.reddot.setCondition(UIConst.QXZL, 5, false);
        var t_change = false;
        var arg1 = data.readByte();
        var arg2 = data.readByte();
        var arg3 = data.readInt();
        if (self.buyTimes != arg3) {
            self.buyTimes = arg3;
            t_change = true;
        }
        if (arg1 == 0) {
            if (self.isEnd != arg2) {
                self.isEnd = arg2;
                t_change = true;
            }
            //成功
            var len = data.readShort();
            for (var i = 0; i < len; i++) {
                var arg4 = data.readInt();
                var arg5 = data.readInt();
                var arg6 = data.readLong();
                var t_countryVo = self.getCountryVoById(arg4);
                if (t_countryVo && t_countryVo.update(arg5, arg6, undefined)) {
                    t_change = true;
                }
            }
            var arg7 = data.readInt(); //最大体力值
            var arg8 = data.readInt(); //当前体力值
            var arg9 = data.readInt(); //上次恢复体力的时间戳
            var arg10 = data.readLong(); //个人积分
            var arg11 = data.readInt(); //当前城池id
            var arg12 = data.readByte(); //是否驻守状态
            if (arg7 != self.maxStamina) {
                self.maxStamina = arg7;
                t_change = true;
            }
            if (arg8 != self.curStamina) {
                self.curStamina = arg8;
                t_change = true;
            }
            if (arg9 != self.lastRecoverTs) {
                self.lastRecoverTs = arg9;
                t_change = true;
            }
            if (arg10 != self.myScore) {
                self.myScore = arg10;
                t_change = true;
            }
            if (arg11 != self.curCityId) {
                self.curCityId = arg11;
                t_change = true;
            }
            if (arg12 != self.isInCity) {
                self.isInCity = arg12;
                t_change = true;
            }
            self.myCountryCityList.length = 0;
            len = data.readShort();
            for (var i = 0; i < len; i++) {
                var arg13 = data.readInt(); //城池id
                var arg14 = data.readInt(); //归属国家
                var arg15 = data.readByte(); //是否庆典
                var arg16 = data.readInt(); //驻守人数
                var t_cityVo = self.getCityVoById(arg13);
                if (t_cityVo && t_cityVo.update(arg14, arg15, arg16)) {
                    t_change = true;
                }
                if (t_cityVo.isMyCountryCity) {
                    self.myCountryCityList.push(t_cityVo);
                }
            }
        }
        if (t_change) {
            GGlobal.control.notify(Enum_MsgType.QXZL_INFO_UPDATE);
            self.reddotCheckSta();
        }
        var newTime = data.readInt();
        if (self.buffTime != newTime || t_change) {
            self.buffTime = newTime;
            GGlobal.control.notify(Enum_MsgType.QXZL_BUFFTIME_UPDATE);
        }
    };
    /**8953  打开排名界面 */
    ModelQxzl.prototype.CG_QunXiongZhuLu_openRankUI_8953 = function () {
        var bates = this.getBytes();
        this.sendSocket(8953, bates);
    };
    /**8955  打开任务界面 */
    ModelQxzl.prototype.CG_QunXiongZhuLu_openTaskUI_8955 = function () {
        var bates = this.getBytes();
        this.sendSocket(8955, bates);
    };
    /**8957  打开宝库界面 */
    ModelQxzl.prototype.CG_QunXiongZhuLu_openBaoKuUI_8957 = function () {
        var bates = this.getBytes();
        this.sendSocket(8957, bates);
    };
    /**8959  打开战况界面 */
    ModelQxzl.prototype.CG_QunXiongZhuLu_openRecord_8959 = function () {
        var bates = this.getBytes();
        this.sendSocket(8959, bates);
    };
    /**8958 [I-I] 打开宝库返回 [I:商品idI:商品已购买次数]商品列表goodsList*/
    ModelQxzl.prototype.GC_QunXiongZhuLu_openBaoKuUI_8958 = function (self, data) {
        var t_change = false;
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var t_id = data.readInt();
            var t_buyCount = data.readInt();
            var t_vo = self.getShopVoById(t_id);
            if (t_vo && t_vo.update(t_buyCount)) {
                t_change = true;
            }
        }
        if (t_change) {
            GGlobal.control.notify(Enum_MsgType.QXZL_SHOP_UPDATE);
        }
    };
    /**8961 I 宝库兑换 I:商品idgoodsId*/
    ModelQxzl.prototype.CG_QunXiongZhuLu_exchange_8961 = function (pId) {
        var t = this;
        var t_vo = t.getShopVoById(pId);
        if (!t_vo)
            return;
        if (!t_vo.checkCanBuy())
            return;
        var bates = this.getBytes();
        bates.writeInt(pId);
        this.sendSocket(8961, bates);
    };
    /**8962 B-I-I 宝库兑换返回 B:状态，1：成功，2：宝库道具不足，3：商品已售罄，4：vip等级不足，5：商品不存在stateI:商品idgoodsIdI:已购买数量buyCount*/
    ModelQxzl.prototype.GC_QunXiongZhuLu_exchange_8962 = function (self, data) {
        var t_change = false;
        var t_result = data.readByte();
        var t_id = data.readInt();
        var t_buyCount = data.readInt();
        switch (t_result) {
            case 0://成功
                var t_vo = self.getShopVoById(t_id);
                if (t_vo && t_vo.update(t_buyCount)) {
                    t_change = true;
                }
                break;
            case 1:
                t_vo = self.getShopVoById(t_id);
                if (t_vo) {
                    ViewCommonWarn.text("缺少道具：" + HtmlUtil.fontNoSize(t_vo.consumeItem.name, Color.getColorStr(t_vo.consumeItem.quality)));
                }
                break;
            case 2:
                ViewCommonWarn.text("商品已卖完");
                break;
            case 3:
                ViewCommonWarn.text("配置不存在");
                break;
        }
        if (t_change) {
            GGlobal.control.notify(Enum_MsgType.QXZL_SHOP_UPDATE);
        }
    };
    /**8956 [I-B-L] 打开任务界面返回 [I:任务idB:任务状态L:任务参数]任务列表taskInfos*/
    ModelQxzl.prototype.GC_QunXiongZhuLu_openTaskUI_8956 = function (self, data) {
        var t_change = false;
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var t_taskId = data.readInt(); //任务id
            var t_state = data.readByte(); //任务状态
            var t_count = data.readLong(); //任务完成数量
            var t_vo = self.getTaskVoById(t_taskId);
            if (t_vo && t_vo.update(t_state, t_count)) {
                t_change = true;
            }
        }
        if (t_change) {
            GGlobal.control.notify(Enum_MsgType.QXZL_TASK_UPDATE);
            self.reddotCheckTask();
        }
    };
    /**8963 I 领取任务奖励 I:任务idtaskId*/
    ModelQxzl.prototype.CG_QunXiongZhuLu_getTaskReward_8963 = function (pTaskId) {
        var bates = this.getBytes();
        bates.writeInt(pTaskId);
        this.sendSocket(8963, bates);
    };
    /**8964 B-I 领取任务奖励返回 B:状态:0-成功,1-失败stateI:任务idtaskId*/
    ModelQxzl.prototype.GC_QunXiongZhuLu_getTaskReward_8964 = function (self, data) {
        var t_change = false;
        var t_result = data.readByte();
        var t_taskId = data.readInt();
        if (t_result == 0) {
            var t_vo = self.getTaskVoById(t_taskId);
            if (t_vo) {
                if (t_vo.state != EnumQxzl.STATE_DONE) {
                    t_vo.state = EnumQxzl.STATE_DONE;
                    t_change = true;
                }
            }
        }
        if (t_change) {
            GGlobal.control.notify(Enum_MsgType.QXZL_TASK_UPDATE);
            self.reddotCheckTask();
        }
    };
    /**8965 I 打开国家排名界面 I:国家idcountryId*/
    ModelQxzl.prototype.CG_QunXiongZhuLu_openCountryRankUI_8965 = function (pCountryId) {
        var bates = this.getBytes();
        bates.writeInt(pCountryId);
        this.sendSocket(8965, bates);
    };
    /**8954 [I-I-L]-U-L-I-I 打开排名界面返回 [I:排名I:国家idL:总积分]国家排名rankDataU:MVP玩家名mvpNameL:当前MVP玩家积分scoreI:MVP头像headI:MVP头像框headGrid*/
    ModelQxzl.prototype.GC_QunXiongZhuLu_openRankUI_8954 = function (self, data) {
        var t_change = false;
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var t_rank = data.readInt();
            var t_countryId = data.readInt();
            var t_score = data.readLong();
            var t_count = data.readInt();
            var t_vo = self.getCountryVoById(t_countryId);
            if (t_vo && t_vo.update(t_count, t_score, t_rank)) {
                t_change = true;
            }
        }
        var t_mvpName = data.readUTF();
        var t_mvpScore = data.readLong();
        var t_mvpHead = data.readInt();
        var t_mvpHeadGrid = data.readInt();
        if (self.mvpInfo.update(t_mvpName, t_mvpScore, t_mvpHead, t_mvpHeadGrid)) {
            t_change = true;
        }
        if (t_change) {
            GGlobal.control.notify(Enum_MsgType.QXZL_RANK_COUNTRY_UPDATE);
        }
    };
    /**8966 I-L-I-[I-U-L] 打开国家排名界面返回 I:自己的排名myRankingL:自己的积分scoreI:国家idcountryId[I:排名U:玩家名字L:积分]玩家排名信息roleInfo*/
    ModelQxzl.prototype.GC_QunXiongZhuLu_openCountryRankUI_8966 = function (self, data) {
        var t_change = false;
        var t_myRank = data.readInt();
        var t_myScore = data.readLong();
        var t_country = data.readInt();
        var t_dataList = self.getRankPlayerListByCountry(t_country);
        var t_checkMap = {};
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var t_rank = data.readInt();
            var t_name = data.readUTF();
            var t_score = data.readLong();
            var t_index = t_rank - 1;
            var t_vo = t_dataList[t_index];
            if (t_vo) {
                //存在则是修改
                if (t_vo.update(t_country, t_rank, t_name, t_score)) {
                    t_change = true;
                }
            }
            else {
                //不存在则是新增
                t_vo = VoRankPlayer.create();
                t_vo.update(t_country, t_rank, t_name, t_score);
                t_change = true;
                t_dataList[t_index] = t_vo;
            }
            t_checkMap[t_index] = true;
        }
        for (var i = t_dataList.length - 1; i >= 0; i--) {
            if (t_checkMap[i])
                continue;
            //删除没有的数据
            var t_vo = t_dataList[i];
            t_dataList.splice(i, 1);
            if (t_vo) {
                VoRankPlayer.release(t_vo);
            }
            t_change = true;
        }
        if (self.myRank != t_myRank) {
            self.myRank = t_myRank;
            t_change = true;
        }
        if (self.myScore != t_myScore) {
            self.myScore = t_myScore;
            t_change = true;
        }
        if (t_change) {
            GGlobal.control.notify(Enum_MsgType.QXZL_RANK_PLAYER_UPDATE);
        }
    };
    /**8960 [I-U-I-I-I-U]-[I-U-I-I] 打开战况界面返回 [I:A玩家国家idU:A玩家名称I:战况类型I:战况参数I:B玩家国家idU:B玩家名称]全服战况recordDate[I:A玩家国家idU:A玩家名称I:战况类型I:战况参数]个人战况myRecordDate*/
    ModelQxzl.prototype.GC_QunXiongZhuLu_openRecord_8960 = function (self, data) {
        var t_change = true;
        {
            var t_tabType = 0;
            var t_list = self.getEventVoByTabType(t_tabType);
            for (var _i = 0, t_list_1 = t_list; _i < t_list_1.length; _i++) {
                var v = t_list_1[_i];
                VoEventQxzl.release(v);
            }
            t_list.length = 0;
            var len = data.readShort();
            for (var i = 0; i < len; i++) {
                var t_p1country = data.readInt(); //A玩家国家
                var t_p1name = data.readUTF(); //A玩家名称
                var t_type = data.readInt(); //战况类型
                var t_param = data.readInt(); //战况参数
                var t_p2country = data.readInt(); //B玩家国家
                var t_p2name = data.readUTF(); //B玩家名称
                var t_vo = VoEventQxzl.create();
                t_vo.update(t_tabType, t_p1country, t_p1name, t_p2country, t_p2name, t_type, t_param);
                t_list.push(t_vo);
            }
        }
        {
            var t_tabType = 1;
            var t_list = self.getEventVoByTabType(t_tabType);
            for (var _a = 0, t_list_2 = t_list; _a < t_list_2.length; _a++) {
                var v = t_list_2[_a];
                VoEventQxzl.release(v);
            }
            t_list.length = 0;
            var len = data.readShort();
            for (var i = 0; i < len; i++) {
                var t_p1country = data.readInt(); //A玩家国家
                var t_p1name = data.readUTF(); //A玩家名臣
                var t_type = data.readInt(); //战况类型
                var t_param = data.readInt(); //战况参数
                var t_vo = VoEventQxzl.create();
                t_vo.update(t_tabType, t_p1country, t_p1name, 0, "", t_type, t_param);
                t_list.push(t_vo);
            }
        }
        if (t_change) {
            GGlobal.control.notify(Enum_MsgType.QXZL_EVENT_UPDATE);
        }
    };
    /**8967 I 移动到某城池 I:城池idcityId*/
    ModelQxzl.prototype.CG_QunXiongZhuLu_move_8967 = function (pTargetCityId) {
        var t_vo = this.getCityVoById(pTargetCityId);
        if (!t_vo)
            return;
        if (!t_vo.isPosNear)
            return;
        if (this.curStamina < this.moveNeedStamina) {
            ViewCommonWarn.text("体力不足");
            return;
        }
        var bates = this.getBytes();
        bates.writeInt(pTargetCityId);
        this.sendSocket(8967, bates);
        // //test
        // let t_source = this.curCityId;
        // let t_target = pTargetCityId;
        // this.curCityId = pTargetCityId;
        // GGlobal.control.notify(Enum_MsgType.QXZL_MOVE_SUCCESS, { source: t_source, target: t_target });
    };
    /**8968 I-B 移动到某城池返回 I:城池idcityIdB:结果0成功1失败result*/
    ModelQxzl.prototype.GC_QunXiongZhuLu_move_8968 = function (self, data) {
        var t_change = false;
        var arg1 = data.readInt();
        var arg2 = data.readByte();
        switch (arg2) {
            case 0://成功
                if (self.curCityId != arg1) {
                    //移动需要把驻守状态取消
                    if (self.isInCity) {
                        self.isInCity = 0;
                        t_change = true;
                        GGlobal.control.notify(Enum_MsgType.QXZL_INFO_UPDATE);
                    }
                    var t_source = self.curCityId;
                    var t_target = arg1;
                    self.curCityId = arg1;
                    t_change = true;
                }
                break;
            case 1:
                ViewCommonWarn.text("体力不足");
                break;
            case 2:
                ViewCommonWarn.text("您正在被挑战，不能操作");
                break;
            case 99:
                ViewCommonWarn.text("本期活动已结束");
                break;
            default:
                ViewCommonWarn.text("操作失败");
                break;
        }
        if (t_change) {
            GGlobal.control.notify(Enum_MsgType.QXZL_MOVE_SUCCESS, { source: t_source, target: t_target });
        }
    };
    /**
     * 8969 I-I 查看城池信息 I:城池idcityIdI:页码page
     * @param pCityId 城池id
     * @param pPage 页码（从1开始）
     */
    ModelQxzl.prototype.CG_QunXiongZhuLu_showCityInfo_8969 = function (pCityId, pPage) {
        var bates = this.getBytes();
        bates.writeInt(pCityId);
        bates.writeInt(pPage);
        this.sendSocket(8969, bates);
    };
    /**8970 I-I-I-I-[I-L-U-I-I-I-I-L-I] 查看城池信息返回 I:城池idcityIdI:国家归属countryI:最大页码maxPageI:当前页码curPage[I:位置L:玩家idU:玩家名I:职业I:专属神兵I:当前体力I:总体力L:战力I:类型0玩家1NPC]玩家信息roleInfo*/
    ModelQxzl.prototype.GC_QunXiongZhuLu_showCityInfo_8970 = function (self, data) {
        var t_change = true;
        var t_cityId = data.readInt(); //城池id
        var t_countryId = data.readInt(); //国家
        var t_maxPage = data.readInt(); //最大页码
        var t_curPage = data.readInt(); //当前页码
        var t_cityVo = self.getCityVoById(t_cityId);
        if (t_cityVo.update(t_countryId, undefined, undefined)) {
            t_change = true;
        }
        if (t_cityVo.maxPage != t_maxPage) {
            t_cityVo.maxPage = t_maxPage;
            t_change = true;
        }
        var t_perPageCount = EnumQxzl.PER_PAGE_COUNT;
        var t_listCount = t_maxPage * t_perPageCount;
        if (t_cityVo.playerList.length != t_listCount) {
            t_cityVo.playerList.length = t_listCount;
            t_change = true;
        }
        var t_startIndex = (t_curPage - 1) * EnumQxzl.PER_PAGE_COUNT;
        var t_endIndex = (t_startIndex + t_perPageCount - 1 > t_listCount - 1) ? t_listCount - 1 : (t_startIndex + t_perPageCount - 1);
        var t_checkMap = {};
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var t_index = data.readInt(); //位置
            t_checkMap[t_index] = true;
            var t_uid = data.readLong(); //玩家id
            var t_name = data.readUTF(); //玩家名字
            var t_job = data.readInt(); //职业
            var t_weapon = data.readInt(); //神兵
            var t_stamina = data.readInt(); //体力
            var t_maxStamina = data.readInt(); //总体力
            var t_power = data.readLong(); //战力
            var t_type = data.readInt(); //类型0玩家1NPC
            var t_horseId = data.readInt(); //坐骑
            var t_player = t_cityVo.getPlayerVoByIndex(t_index);
            if (!t_player) {
                t_player = new VoPlayerQxzl();
                t_cityVo.playerList[t_index] = t_player;
            }
            if (t_type == 1) {
                //NPC特殊处理
                var t_npcCfg = Config.NPC_200[t_uid];
                if (t_npcCfg) {
                    t_name = t_npcCfg.name;
                    t_job = t_npcCfg.mod;
                    t_power = t_npcCfg.power;
                }
            }
            if (t_player.update(t_type, t_countryId, t_uid, t_name, t_job, t_weapon, t_stamina, t_maxStamina, t_power, t_horseId)) {
                t_change = true;
            }
        }
        for (var i = t_startIndex; i <= t_endIndex; i++) {
            if (t_checkMap[i])
                continue;
            var t_player = t_cityVo.playerList[i];
            if (t_player) {
                //删除数据
                t_cityVo.playerList[i] = null;
                t_change = true;
            }
        }
        if (t_change) {
            GGlobal.control.notify(Enum_MsgType.QXZL_CITY_INFO_UPDATE, { cityId: t_cityId, curPage: t_curPage });
        }
    };
    /**8971 I 攻击/驻守城池 I:攻击位置index*/
    ModelQxzl.prototype.CG_QunXiongZhuLu_attack_8971 = function (pCityId, pIndex) {
        if (pCityId != this.curCityId) {
            ViewCommonWarn.text("您不在该城池，不能操作");
            return;
        }
        var bates = this.getBytes();
        bates.writeInt(pIndex);
        this.sendSocket(8971, bates);
    };
    /**8972 I-B-L-I 攻击/驻守城池返回 I:攻击位置indexB:能否挑战结果0成功1失败resultL:玩家id/npcididI:类型0玩家1NPCtype*/
    ModelQxzl.prototype.GC_QunXiongZhuLu_attack_8972 = function (self, data) {
        var t_index = data.readInt(); //位置
        var t_result = data.readByte(); //结果
        var t_id = data.readLong(); //玩家id/npcid
        var t_type = data.readInt(); //类型0打玩家1打npc2驻守
        switch (t_result) {
            case 0://成功
                if (t_type == 2) {
                    //驻守 重新请求当页数据
                    var t_curPage = (~~(t_index / EnumQxzl.PER_PAGE_COUNT)) + 1;
                    self.CG_QunXiongZhuLu_enterMap_8951(); //重新请求更新驻守状态
                    self.CG_QunXiongZhuLu_showCityInfo_8969(self.curCityId, t_curPage);
                }
                else {
                    //进入战斗
                    //需要回传一个玩家id
                    self.battleId = t_id;
                    self.battleType = t_type;
                    self.battleIndex = t_index;
                    GGlobal.mapscene.enterScene(SceneCtrl.QXZL);
                }
                break;
            case 1:
                ViewCommonWarn.text("你正在驻守中，不能操作");
                break;
            case 2:
                ViewCommonWarn.text("体力不足");
                break;
            case 3:
                ViewCommonWarn.text("请先击退其他驻守的敌方守卫");
                break;
            case 4:
                ViewCommonWarn.text("对方正在战斗中");
                break;
            case 5:
                ViewCommonWarn.text("敌方都城不能驻守或攻击");
                break;
            case 6:
                ViewCommonWarn.text("体力不足以驻守");
                break;
            case 7:
                ViewCommonWarn.text("只可占领本国所属地相邻的城池");
                break;
            case 8:
                ViewCommonWarn.text("只可攻打本国所属地相邻的城池");
                break;
            case 9:
                ViewCommonWarn.text("不能攻打自己的国家的盟友");
                break;
            case 10:
                ViewCommonWarn.text(ConfigHelp.reTxt("体力≥{0}才能发起挑战", self.battleNeedSta));
                break;
            case 99:
                ViewCommonWarn.text("本期活动已结束");
                break;
            default://失败
                ViewCommonWarn.text("操作失败");
                break;
        }
    };
    /**8973 B-I CG 前端发送战斗结果 B:战斗结果0失败1成功2退出resultI:位置index*/
    ModelQxzl.prototype.CG_QunXiongZhuLu_battleResult_8973 = function (pResult, pIndex) {
        var bates = this.getBytes();
        bates.writeByte(pResult);
        bates.writeInt(pIndex);
        this.sendSocket(8973, bates);
    };
    /**8974 B GC 战斗结果返回 B:战斗结果0失败1胜利2活动结束result*/
    ModelQxzl.prototype.GC_QunXiongZhuLu_battleResult_8974 = function (self, data) {
        var arg1 = data.readByte();
        switch (arg1) {
            case 1://胜利
                ViewBroadcastItemText.text("获得【积分】 X" + self.battleWinScore);
                ViewCommonWin.show(self.battleWinRewardList, 5000, self, "确定", self.onBattleExit);
                break;
            case 3:
                self.onBattleExit();
                egret.setTimeout(function () {
                    ViewAlert.show("对方已离开此城", null, 1);
                }, self, 50);
                break;
            default:
                ViewBroadcastItemText.text("获得【积分】 X" + self.battleFailScore);
                ViewCommonFail.show(5000, self, "离开", self.failHandler, null);
                break;
        }
    };
    ModelQxzl.prototype.onBattleExit = function () {
        var _this = this;
        GGlobal.modelScene.returnMainScene();
        egret.callLater(function () {
            GGlobal.layerMgr.open(UIConst.QXZL);
            GGlobal.layerMgr.open(UIConst.QXZL_CITY_INFO, { "cityId": _this.curCityId });
        }, this);
    };
    ModelQxzl.prototype.failHandler = function () {
        var _this = this;
        GGlobal.modelScene.returnMainScene();
        egret.callLater(function () {
            GGlobal.layerMgr.open(UIConst.QXZL);
            GGlobal.layerMgr.open(UIConst.QXZL_CITY_INFO, { "cityId": _this.curCityId });
        }, this);
    };
    /**8975  CG 购买体力 */
    ModelQxzl.prototype.CG_QunXiongZhuLu_buySta_8975 = function () {
        if (this.curStamina >= this.maxStamina) {
            ViewCommonWarn.text("您的体力已满，无需购买");
            return;
        }
        // Config.VIP_710
        // tl vip增加体力上限
        // cs vip增加购买次数
        var bates = this.getBytes();
        this.sendSocket(8975, bates);
    };
    /**8976 B-I-I-I GC 购买体力返回 B:结果0成功1-购买次数不足,2-元宝不足resultI:当前体力curValueI:体力上限maxValueI:已购买体力次数buyTiLiTimes*/
    ModelQxzl.prototype.GC_QunXiongZhuLu_buySta_8976 = function (self, data) {
        var t_change = false;
        var arg1 = data.readByte(); //结果
        var arg2 = data.readInt(); //当前体力
        var arg3 = data.readInt(); //体力上限
        var arg4 = data.readInt(); //已购买体力次数
        switch (arg1) {
            case 0:
                if (self.curStamina != arg2) {
                    self.curStamina = arg2;
                    t_change = true;
                }
                if (self.maxStamina != arg3) {
                    self.maxStamina = arg3;
                    t_change = true;
                }
                if (self.buyTimes != arg4) {
                    self.buyTimes = arg4;
                    t_change = true;
                }
                break;
            case 1:
                ViewCommonWarn.text("购买次数不足");
                break;
            case 2:
                ViewCommonWarn.text("元宝不足");
                break;
            case 99:
                ViewCommonWarn.text("本期活动已结束");
                break;
            default:
                ViewCommonWarn.text("操作失败");
                break;
        }
        if (t_change) {
            GGlobal.control.notify(Enum_MsgType.QXZL_INFO_UPDATE);
            self.reddotCheckSta();
        }
    };
    /**8977  查看驻守奖励信息 */
    ModelQxzl.prototype.CG_QunXiongZhuLu_getDefendAwardInfo_8977 = function () {
        var bates = this.getBytes();
        this.sendSocket(8977, bates);
    };
    /**8978 [B-I-I] 查看驻守奖励信息返回 [B:道具类型I:道具idI:道具数量]奖励信息awardInfo*/
    ModelQxzl.prototype.GC_QunXiongZhuLu_getDefendAwardInfo_8978 = function (self, data) {
        var t_change = false;
        var t_itemList = self.rewardList;
        t_itemList.length = 0;
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var arg1 = data.readByte(); //物品类型
            var arg2 = data.readInt(); //id
            var arg3 = data.readInt(); //数量
            var t_itemVo = void 0;
            if (arg1 == Enum_Attr.EQUIP) {
                t_itemVo = VoEquip.create(arg2);
            }
            else if (arg1 == Enum_Attr.ITEM) {
                t_itemVo = VoItem.create(arg2);
            }
            else {
                t_itemVo = Vo_Currency.create(arg1);
            }
            t_itemVo.count = arg3;
            t_itemList.push(t_itemVo);
            t_change = true;
        }
        if (t_change) {
            GGlobal.control.notify(Enum_MsgType.QXZL_REWARD_UPDATE);
            self.reddotCheckReward();
        }
    };
    /**8979  获取驻守奖励 */
    ModelQxzl.prototype.CG_QunXiongZhuLu_gotDefendAward_8979 = function () {
        var bates = this.getBytes();
        this.sendSocket(8979, bates);
    };
    /**8980 B 获取驻守奖励返回 B:状态:0-成功,1-失败state*/
    ModelQxzl.prototype.GC_QunXiongZhuLu_gotDefendAward_8980 = function (self, data) {
        var t_change = false;
        var arg1 = data.readByte();
        if (arg1 == 0) {
            //成功
            //置空奖励物品数据
            var t_itemList = self.rewardList;
            for (var _i = 0, t_itemList_1 = t_itemList; _i < t_itemList_1.length; _i++) {
                var v = t_itemList_1[_i];
                v.count = 0;
            }
            t_change = true;
        }
        if (t_change) {
            GGlobal.control.notify(Enum_MsgType.QXZL_REWARD_UPDATE);
            self.reddotCheckReward();
        }
    };
    /**
     * 8982 I-I-I-I 更新信息 I:类型:1-体力,2-城池归属,3-积分,4-踢出城池typeI:参数1param1I:参数2param2I:参数3param3
     * 类型1 后三个字段分别表示 当前体力、体力上限、恢复时间戳
     * 类型2 后三个字段分别表示 城池id、国家归属
     * 类型3 后三个字段分别表示 个人积分
     * 类型4 收到类型4则表示自己处于非驻守状态（被踢出了）
     */
    ModelQxzl.prototype.GC_QunXiongZhuLu_pushInfo_8982 = function (self, data) {
        var t_change = false;
        var t_type = data.readInt();
        var arg2 = data.readInt();
        var arg3 = data.readInt();
        var arg4 = data.readInt();
        var arg5 = data.readInt();
        switch (t_type) {
            case 1://体力更新
                if (self.curStamina != arg2) {
                    self.curStamina = arg2;
                    t_change = true;
                }
                if (self.maxStamina != arg3) {
                    self.maxStamina = arg3;
                    t_change = true;
                }
                if (self.lastRecoverTs != arg4) {
                    self.lastRecoverTs = arg4;
                    t_change = true;
                }
                if (t_change) {
                    GGlobal.control.notify(Enum_MsgType.QXZL_PUSH_STAMINA_UDPATE);
                    self.reddotCheckSta();
                }
                break;
            case 2://城池归属更新
                var t_cityVo = self.getCityVoById(arg2);
                if (t_cityVo && t_cityVo.update(arg3, arg4, arg5)) {
                    t_change = true;
                }
                if (t_change) {
                    GGlobal.control.notify(Enum_MsgType.QXZL_PUSH_CITY_UPDATE);
                }
                break;
            case 3://个人积分更新
                if (self.myScore != arg2) {
                    self.myScore = arg2;
                    t_change = true;
                }
                if (t_change) {
                    GGlobal.control.notify(Enum_MsgType.QXZL_PUSH_SCORE_UPDATE);
                }
                break;
            case 4:
                if (self.isInCity) {
                    self.isInCity = 0;
                    t_change = true;
                }
                if (t_change) {
                    GGlobal.control.notify(Enum_MsgType.QXZL_PUSH_ISINCITY_UPDATE);
                }
                break;
        }
    };
    /**8983  打开个人排行  */
    ModelQxzl.prototype.CG_openPersonRankUI_8983 = function () {
        var bates = this.getBytes();
        this.sendSocket(8983, bates);
    };
    /**8984 打开个人排行返回 [S:排名U:玩家名I:积分I:国家id]排行榜数据S:我的排名 0未进排行榜I:我的积分*/
    ModelQxzl.prototype.GC_OpenPersonRankUI_8984 = function (self, data) {
        self.personRankList = [];
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var rank = data.readShort();
            var name_1 = data.readUTF();
            var score = data.readInt();
            var country = data.readInt();
            var vo = VoRankPlayer.create();
            vo.update(country, rank, name_1, score);
            self.personRankList.push(vo);
        }
        self.myPersonRank = data.readShort();
        self.myPersonScore = data.readInt();
        GGlobal.control.notify(Enum_MsgType.QXZL_RANK_PERSON_UPDATE);
    };
    /**8985  单枪匹马buff购买  */
    ModelQxzl.prototype.CG_BuffBuy_8985 = function () {
        var bates = this.getBytes();
        this.sendSocket(8985, bates);
    };
    /**8986 单枪匹马buff购买返回 B:状态：1：成功，2：不够钱，3：已有不能再购买*/
    ModelQxzl.prototype.GC_BuffBuy_8986 = function (self, data) {
        var res = data.readByte();
        if (res == 1) {
            GGlobal.layerMgr.close(UIConst.QXZL_DQPM);
            var cfg = Config.xtcs_004[7651];
            self.buffTime = cfg.num * 60;
            GGlobal.control.notify(Enum_MsgType.QXZL_BUFFTIME_UPDATE);
        }
        else if (res == 3) {
            ViewCommonWarn.text("已有不能再购买");
        }
    };
    //=========================================== API ==========================================
    ModelQxzl.prototype.getCityVoById = function (pId) {
        return this._cityVoMap[pId];
    };
    ModelQxzl.prototype.getCountryVoById = function (pCountryId) {
        return this._countryVoList[pCountryId - 1];
    };
    ModelQxzl.prototype.getCountryVoList = function () {
        return this._countryVoList;
    };
    ModelQxzl.prototype.getTaskVoById = function (pTaskId) {
        return this._taskVoMap[pTaskId];
    };
    ModelQxzl.prototype.getShopVoById = function (pId) {
        return this._shopVoMap[pId];
    };
    ModelQxzl.prototype.getShopVoList = function () {
        if (this._shopVoList === undefined) {
            this._shopVoList = [];
            for (var k in this._shopVoMap) {
                this._shopVoList.push(this._shopVoMap[k]);
            }
        }
        return this._shopVoList;
    };
    /**
     * 通过类型获取排名奖励数据
     * @param pType 类型 1国家排行 2玩家排行 3个人排行
     */
    ModelQxzl.prototype.getRankVoListByType = function (pType) {
        var t_list = this._rankVoListMap[pType];
        if (t_list === undefined) {
            t_list = [];
            for (var k in this._rankVoMap) {
                var t_vo = this._rankVoMap[k];
                if (t_vo.type == pType) {
                    t_list.push(t_vo);
                }
            }
            t_list.sort(function (pA, pB) {
                return pA.id - pB.id;
            });
            this._rankVoListMap[pType] = t_list;
        }
        return t_list;
    };
    ModelQxzl.prototype.getRankPlayerListByCountry = function (pCountry) {
        var t_list = this._rankPlayerListMap[pCountry];
        if (t_list === undefined) {
            this._rankPlayerListMap[pCountry] = t_list = [];
        }
        return t_list;
    };
    ModelQxzl.prototype.getEventVoByTabType = function (pTabType) {
        var t_list = this._eventVoListMap[pTabType];
        if (t_list === undefined) {
            this._eventVoListMap[pTabType] = t_list = [];
        }
        return t_list;
    };
    /**
     * 通过标签类型获取任务列表
     * @param pTabType 标签类型
     */
    ModelQxzl.prototype.getTaskVoListByTabType = function (pTabType) {
        var t_list = this._tabTypeTaskVoListMap[pTabType];
        if (!t_list) {
            t_list = [];
            for (var k in this._taskVoMap) {
                var t_vo = this._taskVoMap[k];
                if (t_vo.tabType == pTabType) {
                    t_list.push(t_vo);
                }
            }
            this._tabTypeTaskVoListMap[pTabType] = t_list;
        }
        return t_list;
    };
    ModelQxzl.prototype.getTypeVoListMap = function (pTabType) {
        if (this._typeVoListMap[pTabType] === undefined) {
            var t_allList = this.getTaskVoListByTabType(pTabType);
            this._typeVoListMap[pTabType] = {};
            for (var _i = 0, t_allList_1 = t_allList; _i < t_allList_1.length; _i++) {
                var v = t_allList_1[_i];
                var t_type = v.cfg.type;
                var t_voList = this._typeVoListMap[pTabType][t_type];
                if (!t_voList)
                    this._typeVoListMap[pTabType][t_type] = t_voList = [];
                t_voList.push(v);
            }
        }
        return this._typeVoListMap[pTabType];
    };
    Object.defineProperty(ModelQxzl.prototype, "myCountry", {
        /** 我的国家 */
        get: function () {
            return Model_player.voMine.country;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 通过国家获取对应的主城id
     * @param pCountryId 国家
     */
    ModelQxzl.prototype.getMainCityIdByCountryId = function (pCountryId) {
        return this._mainCityMap[pCountryId];
    };
    Object.defineProperty(ModelQxzl.prototype, "recoverPoint", {
        /** 单位时间回复的体力点 */
        get: function () {
            if (this._recoverPoint === undefined) {
                this._recoverPoint = FastAPI.getSystemValue(7201);
            }
            return this._recoverPoint;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModelQxzl.prototype, "moveNeedStamina", {
        /** 移动体力消耗 */
        get: function () {
            if (this._moveNeedStamina === undefined) {
                this._moveNeedStamina = FastAPI.getSystemValue(7206);
            }
            return this._moveNeedStamina;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModelQxzl.prototype, "battleWinStamina", {
        /** 战斗胜利消耗体力 */
        get: function () {
            if (this._battleWinStamina === undefined) {
                this._battleWinStamina = FastAPI.getSystemValue(7203);
            }
            return this._battleWinStamina;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModelQxzl.prototype, "battleFailStamin", {
        /** 战斗失败消耗体力 */
        get: function () {
            if (this._battleFailStamin === undefined) {
                this._battleFailStamin = FastAPI.getSystemValue(7204);
            }
            return this._battleFailStamin;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModelQxzl.prototype, "staminaRecoverInterval", {
        /** 体力恢复时间间隔（s） */
        get: function () {
            if (this._staminaRecoverInterval === undefined) {
                this._staminaRecoverInterval = FastAPI.getSystemValue(7208);
            }
            return this._staminaRecoverInterval;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModelQxzl.prototype, "buyStaNeedConsume", {
        /** 购买体力消耗物品/货币 */
        get: function () {
            this.initVoStaMap();
            var t_targetTime = this.buyTimes + 1;
            t_targetTime = t_targetTime > this.maxBuyTimes ? this.maxBuyTimes : t_targetTime;
            return this._buyCounsumeMap[t_targetTime].consume;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModelQxzl.prototype, "buyStaOnceRecover", {
        /** 购买体力一次的恢复量 */
        get: function () {
            this.initVoStaMap();
            var t_targetTime = this.buyTimes + 1;
            t_targetTime = t_targetTime > this.maxBuyTimes ? this.maxBuyTimes : t_targetTime;
            return this._buyCounsumeMap[t_targetTime].cfg.tl;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModelQxzl.prototype, "baseMaxSta", {
        /** 基础体力上限 */
        get: function () {
            if (this._baseMaxSta === undefined) {
                this._baseMaxSta = FastAPI.getSystemValue(7205);
            }
            return this._baseMaxSta;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModelQxzl.prototype, "baseBuyLimit", {
        /** 基础购买体力上限 */
        get: function () {
            if (this._baseBuyLimit === undefined) {
                this._baseBuyLimit = FastAPI.getSystemValue(7209);
            }
            return this._baseBuyLimit;
        },
        enumerable: true,
        configurable: true
    });
    ModelQxzl.prototype.initVoStaMap = function () {
        if (this._buyCounsumeMap === undefined) {
            this._buyCounsumeMap = {};
            var t_cfg = Config.qxzltl_273;
            for (var k in t_cfg) {
                var t_vo = new VoStaQxzl();
                t_vo.id = ~~k;
                this._buyCounsumeMap[t_vo.id] = t_vo;
                if (t_vo.id > this.maxBuyTimes)
                    this.maxBuyTimes = t_vo.id;
            }
        }
    };
    Object.defineProperty(ModelQxzl.prototype, "mvpRewardList", {
        /** mvp奖励 */
        get: function () {
            if (this._mvpRewardList === undefined) {
                this._mvpRewardList = ConfigHelp.makeItemListArr(FastAPI.getSystemValue(7207));
            }
            return this._mvpRewardList;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModelQxzl.prototype, "battleWinRewardList", {
        /** 战斗胜利奖励 */
        get: function () {
            if (this._battleWinRewardList === undefined) {
                this._battleWinRewardList = ConfigHelp.makeItemListArr(FastAPI.getSystemValue(7202));
            }
            return this._battleWinRewardList;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModelQxzl.prototype, "battleFailRewardList", {
        /** 战斗失败奖励 */
        get: function () {
            if (this._battleFailRewardList === undefined) {
                this._battleFailRewardList = ConfigHelp.makeItemListArr(FastAPI.getSystemValue(7215));
            }
            return this._battleFailRewardList;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModelQxzl.prototype, "battleWinScore", {
        /** 战斗胜利积分奖励 */
        get: function () {
            if (this._battleWinScore === undefined) {
                this._battleWinScore = FastAPI.getSystemValue(7216);
            }
            return this._battleWinScore;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModelQxzl.prototype, "battleFailScore", {
        /** 战斗失败积分奖励 */
        get: function () {
            if (this._battleFailScore === undefined) {
                this._battleFailScore = FastAPI.getSystemValue(7217);
            }
            return this._battleFailScore;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModelQxzl.prototype, "battleNeedSta", {
        /** 挑战的体力要求 */
        get: function () {
            if (this._battleNeedSta == undefined) {
                this._battleNeedSta = FastAPI.getSystemValue(7218);
            }
            return this._battleNeedSta;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModelQxzl.prototype, "doubleRewardList", {
        /** 庆典城池奖励 */
        get: function () {
            if (this._doubleRewardList === undefined) {
                this._doubleRewardList = ConfigHelp.makeItemListArr(FastAPI.getSystemValue(7212));
            }
            return this._doubleRewardList;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModelQxzl.prototype, "doubleGuardReward", {
        get: function () {
            if (this._doubleGuardReward === undefined) {
                this._doubleGuardReward = ConfigHelp.makeItemListArr(FastAPI.getSystemValue(7213));
            }
            return this._doubleGuardReward;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModelQxzl.prototype, "doubleGuardPoint", {
        get: function () {
            if (this._doubleGuardPoint === undefined) {
                this._doubleGuardPoint = FastAPI.getSystemValue(7214);
            }
            return this._doubleGuardPoint;
        },
        enumerable: true,
        configurable: true
    });
    // 红点
    // 1任务
    // 2驻守奖励
    // 3体力
    // 4个人战况
    // 5每次登陆红点
    ModelQxzl.prototype.reddotCheckTask = function () {
        var t = this;
        var t_value = false;
        for (var k in t._taskVoMap) {
            var t_vo = t._taskVoMap[k];
            if (t_vo.state == EnumQxzl.STATE_CAN_GET) {
                t_value = true;
                break;
            }
        }
        GGlobal.reddot.setCondition(UIConst.QXZL, 1, t_value);
    };
    ModelQxzl.prototype.reddotCheckReward = function () {
        var t = this;
        var t_value = false;
        if (t.rewardList.length > 0) {
            for (var _i = 0, _a = t.rewardList; _i < _a.length; _i++) {
                var v = _a[_i];
                if (v && v.count > 0) {
                    t_value = true;
                    break;
                }
            }
        }
        GGlobal.reddot.setCondition(UIConst.QXZL, 2, t_value);
    };
    ModelQxzl.prototype.reddotCheckSta = function () {
        var t = this;
        var t_value = false;
        if (!t.isEnd) {
            if (t.curStamina == 0) {
                t_value = true;
            }
        }
        GGlobal.reddot.setCondition(UIConst.QXZL, 3, t_value);
    };
    ModelQxzl.prototype.reddotCheckLog = function () {
        var t = this;
        var t_value = false;
        GGlobal.reddot.setCondition(UIConst.QXZL, 4, t_value);
    };
    return ModelQxzl;
}(BaseModel));
__reflect(ModelQxzl.prototype, "ModelQxzl");
