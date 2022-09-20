/**
 * 群雄逐鹿模块管理器
 * @author: lujiahao 
 * @date: 2019-09-25 15:35:38 
 */
class ModelQxzl extends BaseModel {
    constructor() {
        super();
    }

    private _cityVoMap: { [id: number]: VoCityQxzl } = {};
    private _countryVoList: VoCountryQxzl[] = [];

    private _taskVoMap: { [id: number]: VoTaskQxzl } = {};
    private _tabTypeTaskVoListMap: { [tabType: number]: VoTaskQxzl[] } = {};

    private _shopVoMap: { [id: number]: VoShopQxzl } = {};
    private _rankVoMap: { [id: number]: VoRankQxzl } = {};

    /** 当前体力 */
    public curStamina = 0;
    /** 最大体力 */
    public maxStamina = 0;
    /** 已购买体力次数 */
    public buyTimes = 0;

    /** 上次恢复体力的时间戳(s) */
    public lastRecoverTs = 0;
    /** 个人积分 */
    public myScore = 0;
    /** 我的个人排名 */
    public myRank = 0;
    /** 当前所在城池 */
    public curCityId = 0;
    /** 是否在驻守状态 */
    public isInCity = 0;

    /** mvp信息 */
    public mvpInfo: VoMvpQxzl = new VoMvpQxzl();

    /** 战斗的敌方id */
    public battleId = 0;
    /** 战斗的敌方类型0玩家1NPC */
    public battleType = 0;
    /** 战斗缓存index，用作结果回传给服务器 */
    public battleIndex = 0;
    /** 战斗临时存储对方的数据 */
    public battleTempVo: Vo_Player;

    /** 我的国家的城池列表 */
    public myCountryCityList: VoCityQxzl[] = [];

    /** 驻守累积奖励 */
    public rewardList: IGridImpl[] = [];

    /** 活动是否结束 */
    public isEnd = 1;

    /** 单枪匹马持续分钟(按秒算) */
    public buffTime: number = 0;

    private _mainCityMap: { [countryId: number]: number } = {
        1: 401,
        2: 402,
        3: 403
    };

    private _setupFlag = false;
    public setup() {
        if (this._setupFlag)
            return;
        this._setupFlag = true;

        let f = fairygui.UIObjectFactory.setPackageItemExtension;
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
            let t_cfg = Config.qxzl_273;
            for (let k in t_cfg) {
                let t_vo = new VoCityQxzl();
                t_vo.id = ~~k;
                this._cityVoMap[t_vo.id] = t_vo;
            }
        }

        {
            let t_cfg = Config.qxzlrw_273;
            for (let k in t_cfg) {
                let t_id = ~~k;
                let t_vo = this._taskVoMap[t_id];
                if (!t_vo) {
                    t_vo = new VoTaskQxzl();
                    t_vo.id = t_id;
                    this._taskVoMap[t_vo.id] = t_vo;
                }
                if (t_vo.cfg.next > 0) {
                    let t_nextVo = this._taskVoMap[t_vo.cfg.next];
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
            let t_cfg = Config.qxzlstore_273;
            for (let k in t_cfg) {
                let t_vo = new VoShopQxzl();
                t_vo.id = ~~k;
                this._shopVoMap[t_vo.id] = t_vo;
            }
        }

        {
            let t_cfg = Config.qxzlrank_273;
            for (let k in t_cfg) {
                let t_vo = new VoRankQxzl();
                t_vo.id = ~~k;
                this._rankVoMap[t_vo.id] = t_vo;
            }
        }

        for (let i = 0; i < 3; i++) {
            let t_vo = new VoCountryQxzl();
            t_vo.countryId = i + 1;
            this._countryVoList.push(t_vo);
        }

        // GGlobal.reddot.register(true, UIConst.QXZL, this.onReddotUpdate, this);

        //每次登陆点亮一个红点
        Timer.instance.callLater(() => {
            GGlobal.reddot.setCondition(UIConst.QXZL, 5, true);
        }, 3000, this);
    }

    // private onReddotUpdate() {
    //     console.log("================================");
    //     for (let i = 0; i < 6; i++) {
    //         console.log("=========", GGlobal.reddot.checkCondition(UIConst.QXZL, i));
    //     }
    //     console.log("==========+++++++++++++++=======");
    // }

    //========================================= 协议相关 ========================================
    public listenServ(mgr: WebSocketMgr) {
        super.listenServ(mgr);

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
    }

    private _initFlag = false;
    /**8951  进入地图 */
    public CG_QunXiongZhuLu_enterMap_8951(): void {
        var bates = this.getBytes();
        this.sendSocket(8951, bates);
        if (!this._initFlag) {
            this._initFlag = true;

            //初始化自己的所在地，初始化为自己国家的主城
            this.curCityId = this.getMainCityIdByCountryId(this.myCountry);

            //初始化三个主城的国家归属
            for (let k in this._mainCityMap) {
                let t_countryId = ~~k;
                let t_cityId = this._mainCityMap[k];
                let t_vo = this.getCityVoById(t_cityId);
                if (t_vo) {
                    t_vo.countryId = t_countryId;
                }
            }
        }
    }

    /**8952 B-B-I-[I-I-L]-I-I-I-L-I-B-[I-I-B-I] 进入地图返回 B:状态:0成功,1未开启stateB:是否结束:0-开始中,1-已结束isEndI:已购买体力次数buyTiLiTimes[I:国家idI:占领城池数量L:国家总积分]国家信息countryInfoI:最大值体力maxTLI:当前值体力nowTLI:上次恢复时间戳lastAddTLTimeL:个人积分myJiFenI:当前城池idnowCityB:是否驻守状态isInCity[I:城池idI:城池归属国家B:是否庆典城池I:驻守人数]城池信息cityInfoI:单枪匹马持续分钟,0为未激活*/
    public GC_QunXiongZhuLu_enterMap_8952(self: ModelQxzl, data: BaseBytes): void {
        //打开界面后灭了登陆的红点
        if (GGlobal.reddot.checkCondition(UIConst.QXZL, 5))
            GGlobal.reddot.setCondition(UIConst.QXZL, 5, false);

        let t_change = false;
        let arg1 = data.readByte();
        let arg2 = data.readByte();
        let arg3 = data.readInt();
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
            let len = data.readShort();
            for (let i = 0; i < len; i++) {
                let arg4 = data.readInt();
                let arg5 = data.readInt();
                let arg6 = data.readLong();

                let t_countryVo = self.getCountryVoById(arg4);
                if (t_countryVo && t_countryVo.update(arg5, arg6, undefined)) {
                    t_change = true;
                }
            }
            let arg7 = data.readInt(); //最大体力值
            let arg8 = data.readInt(); //当前体力值
            let arg9 = data.readInt(); //上次恢复体力的时间戳
            let arg10 = data.readLong(); //个人积分
            let arg11 = data.readInt(); //当前城池id
            let arg12 = data.readByte(); //是否驻守状态

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
            for (let i = 0; i < len; i++) {
                let arg13 = data.readInt(); //城池id
                let arg14 = data.readInt(); //归属国家
                let arg15 = data.readByte(); //是否庆典
                let arg16 = data.readInt(); //驻守人数

                let t_cityVo = self.getCityVoById(arg13);
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

        let newTime: number = data.readInt();
        if (self.buffTime != newTime || t_change) {
            self.buffTime = newTime;
            GGlobal.control.notify(Enum_MsgType.QXZL_BUFFTIME_UPDATE);
        }
    }

    /**8953  打开排名界面 */
    public CG_QunXiongZhuLu_openRankUI_8953(): void {
        var bates = this.getBytes();
        this.sendSocket(8953, bates);
    }

    /**8955  打开任务界面 */
    public CG_QunXiongZhuLu_openTaskUI_8955(): void {
        var bates = this.getBytes();
        this.sendSocket(8955, bates);
    }

    /**8957  打开宝库界面 */
    public CG_QunXiongZhuLu_openBaoKuUI_8957(): void {
        var bates = this.getBytes();
        this.sendSocket(8957, bates);
    }

    /**8959  打开战况界面 */
    public CG_QunXiongZhuLu_openRecord_8959(): void {
        var bates = this.getBytes();
        this.sendSocket(8959, bates);
    }

    /**8958 [I-I] 打开宝库返回 [I:商品idI:商品已购买次数]商品列表goodsList*/
    public GC_QunXiongZhuLu_openBaoKuUI_8958(self: ModelQxzl, data: BaseBytes): void {
        let t_change = false;

        let len = data.readShort();
        for (let i = 0; i < len; i++) {
            let t_id = data.readInt();
            let t_buyCount = data.readInt();

            let t_vo = self.getShopVoById(t_id);
            if (t_vo && t_vo.update(t_buyCount)) {
                t_change = true;
            }
        }

        if (t_change) {
            GGlobal.control.notify(Enum_MsgType.QXZL_SHOP_UPDATE);
        }
    }

    /**8961 I 宝库兑换 I:商品idgoodsId*/
    public CG_QunXiongZhuLu_exchange_8961(pId: number): void {
        let t = this;
        let t_vo = t.getShopVoById(pId);
        if (!t_vo)
            return;
        if (!t_vo.checkCanBuy())
            return;

        var bates = this.getBytes();
        bates.writeInt(pId);
        this.sendSocket(8961, bates);
    }

    /**8962 B-I-I 宝库兑换返回 B:状态，1：成功，2：宝库道具不足，3：商品已售罄，4：vip等级不足，5：商品不存在stateI:商品idgoodsIdI:已购买数量buyCount*/
    public GC_QunXiongZhuLu_exchange_8962(self: ModelQxzl, data: BaseBytes): void {
        let t_change = false;

        let t_result = data.readByte();
        let t_id = data.readInt();
        let t_buyCount = data.readInt();

        switch (t_result) {
            case 0: //成功
                let t_vo = self.getShopVoById(t_id);
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
    }

    /**8956 [I-B-L] 打开任务界面返回 [I:任务idB:任务状态L:任务参数]任务列表taskInfos*/
    public GC_QunXiongZhuLu_openTaskUI_8956(self: ModelQxzl, data: BaseBytes): void {
        let t_change = false;

        let len = data.readShort();
        for (let i = 0; i < len; i++) {
            let t_taskId = data.readInt(); //任务id
            let t_state = data.readByte(); //任务状态
            let t_count = data.readLong(); //任务完成数量

            let t_vo = self.getTaskVoById(t_taskId);
            if (t_vo && t_vo.update(t_state, t_count)) {
                t_change = true;
            }
        }

        if (t_change) {
            GGlobal.control.notify(Enum_MsgType.QXZL_TASK_UPDATE);
            self.reddotCheckTask();
        }
    }

    /**8963 I 领取任务奖励 I:任务idtaskId*/
    public CG_QunXiongZhuLu_getTaskReward_8963(pTaskId: number): void {
        var bates = this.getBytes();
        bates.writeInt(pTaskId);
        this.sendSocket(8963, bates);
    }

    /**8964 B-I 领取任务奖励返回 B:状态:0-成功,1-失败stateI:任务idtaskId*/
    public GC_QunXiongZhuLu_getTaskReward_8964(self: ModelQxzl, data: BaseBytes): void {
        let t_change = false;
        let t_result = data.readByte();
        let t_taskId = data.readInt();
        if (t_result == 0) //成功
        {
            let t_vo = self.getTaskVoById(t_taskId);
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
    }

    /**8965 I 打开国家排名界面 I:国家idcountryId*/
    public CG_QunXiongZhuLu_openCountryRankUI_8965(pCountryId: number): void {
        var bates = this.getBytes();
        bates.writeInt(pCountryId);
        this.sendSocket(8965, bates);
    }

    /**8954 [I-I-L]-U-L-I-I 打开排名界面返回 [I:排名I:国家idL:总积分]国家排名rankDataU:MVP玩家名mvpNameL:当前MVP玩家积分scoreI:MVP头像headI:MVP头像框headGrid*/
    public GC_QunXiongZhuLu_openRankUI_8954(self: ModelQxzl, data: BaseBytes): void {
        let t_change = false;

        let len = data.readShort();
        for (let i = 0; i < len; i++) {
            let t_rank = data.readInt();
            let t_countryId = data.readInt();
            let t_score = data.readLong();
            let t_count = data.readInt();

            let t_vo = self.getCountryVoById(t_countryId);
            if (t_vo && t_vo.update(t_count, t_score, t_rank)) {
                t_change = true;
            }
        }

        let t_mvpName = data.readUTF();
        let t_mvpScore = data.readLong();
        let t_mvpHead = data.readInt();
        let t_mvpHeadGrid = data.readInt();

        if (self.mvpInfo.update(t_mvpName, t_mvpScore, t_mvpHead, t_mvpHeadGrid)) {
            t_change = true;
        }

        if (t_change) {
            GGlobal.control.notify(Enum_MsgType.QXZL_RANK_COUNTRY_UPDATE);
        }
    }


    /**8966 I-L-I-[I-U-L] 打开国家排名界面返回 I:自己的排名myRankingL:自己的积分scoreI:国家idcountryId[I:排名U:玩家名字L:积分]玩家排名信息roleInfo*/
    public GC_QunXiongZhuLu_openCountryRankUI_8966(self: ModelQxzl, data: BaseBytes): void {
        let t_change = false;

        let t_myRank = data.readInt();
        let t_myScore = data.readLong();
        let t_country = data.readInt();

        let t_dataList = self.getRankPlayerListByCountry(t_country);
        let t_checkMap: { [index: number]: boolean } = {};

        let len = data.readShort();
        for (let i = 0; i < len; i++) {
            let t_rank = data.readInt();
            let t_name = data.readUTF();
            let t_score = data.readLong();

            let t_index = t_rank - 1;
            let t_vo = t_dataList[t_index];
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

        for (let i = t_dataList.length - 1; i >= 0; i--) {
            if (t_checkMap[i])
                continue;
            //删除没有的数据
            let t_vo = t_dataList[i];
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
    }

    /**8960 [I-U-I-I-I-U]-[I-U-I-I] 打开战况界面返回 [I:A玩家国家idU:A玩家名称I:战况类型I:战况参数I:B玩家国家idU:B玩家名称]全服战况recordDate[I:A玩家国家idU:A玩家名称I:战况类型I:战况参数]个人战况myRecordDate*/
    public GC_QunXiongZhuLu_openRecord_8960(self: ModelQxzl, data: BaseBytes): void {
        let t_change = true;

        {
            let t_tabType = 0;
            let t_list = self.getEventVoByTabType(t_tabType);
            for (let v of t_list) {
                VoEventQxzl.release(v);
            }
            t_list.length = 0;
            let len = data.readShort();
            for (let i = 0; i < len; i++) {
                let t_p1country = data.readInt(); //A玩家国家
                let t_p1name = data.readUTF(); //A玩家名称
                let t_type = data.readInt(); //战况类型
                let t_param = data.readInt(); //战况参数
                let t_p2country = data.readInt(); //B玩家国家
                let t_p2name = data.readUTF(); //B玩家名称

                let t_vo = VoEventQxzl.create();
                t_vo.update(t_tabType, t_p1country, t_p1name, t_p2country, t_p2name, t_type, t_param);
                t_list.push(t_vo);
            }
        }

        {
            let t_tabType = 1;
            let t_list = self.getEventVoByTabType(t_tabType);
            for (let v of t_list) {
                VoEventQxzl.release(v);
            }
            t_list.length = 0;
            let len = data.readShort();
            for (let i = 0; i < len; i++) {
                let t_p1country = data.readInt(); //A玩家国家
                let t_p1name = data.readUTF(); //A玩家名臣
                let t_type = data.readInt(); //战况类型
                let t_param = data.readInt(); //战况参数

                let t_vo = VoEventQxzl.create();
                t_vo.update(t_tabType, t_p1country, t_p1name, 0, "", t_type, t_param);
                t_list.push(t_vo);
            }
        }

        if (t_change) {
            GGlobal.control.notify(Enum_MsgType.QXZL_EVENT_UPDATE);
        }
    }

    /**8967 I 移动到某城池 I:城池idcityId*/
    public CG_QunXiongZhuLu_move_8967(pTargetCityId: number): void {
        let t_vo = this.getCityVoById(pTargetCityId);
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
    }

    /**8968 I-B 移动到某城池返回 I:城池idcityIdB:结果0成功1失败result*/
    public GC_QunXiongZhuLu_move_8968(self: ModelQxzl, data: BaseBytes): void {
        let t_change = false;
        let arg1 = data.readInt();
        let arg2 = data.readByte();
        switch (arg2) {
            case 0: //成功
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
    }

    /**
     * 8969 I-I 查看城池信息 I:城池idcityIdI:页码page
     * @param pCityId 城池id
     * @param pPage 页码（从1开始）
     */
    public CG_QunXiongZhuLu_showCityInfo_8969(pCityId: number, pPage: number): void {
        var bates = this.getBytes();
        bates.writeInt(pCityId);
        bates.writeInt(pPage);
        this.sendSocket(8969, bates);
    }

    /**8970 I-I-I-I-[I-L-U-I-I-I-I-L-I] 查看城池信息返回 I:城池idcityIdI:国家归属countryI:最大页码maxPageI:当前页码curPage[I:位置L:玩家idU:玩家名I:职业I:专属神兵I:当前体力I:总体力L:战力I:类型0玩家1NPC]玩家信息roleInfo*/
    public GC_QunXiongZhuLu_showCityInfo_8970(self: ModelQxzl, data: BaseBytes): void {
        let t_change = true;

        let t_cityId = data.readInt(); //城池id
        let t_countryId = data.readInt(); //国家
        let t_maxPage = data.readInt(); //最大页码
        let t_curPage = data.readInt(); //当前页码

        let t_cityVo = self.getCityVoById(t_cityId);
        if (t_cityVo.update(t_countryId, undefined, undefined)) {
            t_change = true;
        }

        if (t_cityVo.maxPage != t_maxPage) { //更新最大页码
            t_cityVo.maxPage = t_maxPage;
            t_change = true;
        }

        let t_perPageCount = EnumQxzl.PER_PAGE_COUNT;
        let t_listCount = t_maxPage * t_perPageCount;
        if (t_cityVo.playerList.length != t_listCount) {
            t_cityVo.playerList.length = t_listCount;
            t_change = true;
        }

        let t_startIndex = (t_curPage - 1) * EnumQxzl.PER_PAGE_COUNT;
        let t_endIndex = (t_startIndex + t_perPageCount - 1 > t_listCount - 1) ? t_listCount - 1 : (t_startIndex + t_perPageCount - 1);

        let t_checkMap: { [index: number]: boolean } = {};
        let len = data.readShort();
        for (let i = 0; i < len; i++) {
            let t_index = data.readInt(); //位置
            t_checkMap[t_index] = true;
            let t_uid = data.readLong(); //玩家id
            let t_name = data.readUTF(); //玩家名字
            let t_job = data.readInt(); //职业
            let t_weapon = data.readInt(); //神兵
            let t_stamina = data.readInt(); //体力
            let t_maxStamina = data.readInt(); //总体力
            let t_power = data.readLong(); //战力
            let t_type = data.readInt(); //类型0玩家1NPC
            let t_horseId = data.readInt();//坐骑

            let t_player = t_cityVo.getPlayerVoByIndex(t_index);
            if (!t_player) {
                t_player = new VoPlayerQxzl();
                t_cityVo.playerList[t_index] = t_player;
            }
            if (t_type == 1) {
                //NPC特殊处理
                let t_npcCfg = Config.NPC_200[t_uid];
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

        for (let i = t_startIndex; i <= t_endIndex; i++) {
            if (t_checkMap[i])
                continue;
            let t_player = t_cityVo.playerList[i];
            if (t_player) {
                //删除数据
                t_cityVo.playerList[i] = null;
                t_change = true;
            }
        }

        if (t_change) {
            GGlobal.control.notify(Enum_MsgType.QXZL_CITY_INFO_UPDATE, { cityId: t_cityId, curPage: t_curPage });
        }
    }

    /**8971 I 攻击/驻守城池 I:攻击位置index*/
    public CG_QunXiongZhuLu_attack_8971(pCityId: number, pIndex: number): void {
        if (pCityId != this.curCityId) {
            ViewCommonWarn.text("您不在该城池，不能操作");
            return;
        }
        var bates = this.getBytes();
        bates.writeInt(pIndex);
        this.sendSocket(8971, bates);
    }

    /**8972 I-B-L-I 攻击/驻守城池返回 I:攻击位置indexB:能否挑战结果0成功1失败resultL:玩家id/npcididI:类型0玩家1NPCtype*/
    public GC_QunXiongZhuLu_attack_8972(self: ModelQxzl, data: BaseBytes): void {
        let t_index = data.readInt(); //位置
        let t_result = data.readByte(); //结果
        let t_id = data.readLong(); //玩家id/npcid
        let t_type = data.readInt(); //类型0打玩家1打npc2驻守

        switch (t_result) {
            case 0: //成功
                if (t_type == 2) {
                    //驻守 重新请求当页数据
                    let t_curPage = (~~(t_index / EnumQxzl.PER_PAGE_COUNT)) + 1;
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
            default: //失败
                ViewCommonWarn.text("操作失败");
                break;
        }
    }

    /**8973 B-I CG 前端发送战斗结果 B:战斗结果0失败1成功2退出resultI:位置index*/
    public CG_QunXiongZhuLu_battleResult_8973(pResult: number, pIndex: number): void {
        var bates = this.getBytes();
        bates.writeByte(pResult);
        bates.writeInt(pIndex);
        this.sendSocket(8973, bates);
    }

    /**8974 B GC 战斗结果返回 B:战斗结果0失败1胜利2活动结束result*/
    public GC_QunXiongZhuLu_battleResult_8974(self: ModelQxzl, data: BaseBytes): void {
        let arg1 = data.readByte();
        switch (arg1) {
            case 1: //胜利
                ViewBroadcastItemText.text("获得【积分】 X" + self.battleWinScore);
                ViewCommonWin.show(self.battleWinRewardList, 5000, self, "确定", self.onBattleExit);
                break;
            case 3:
                self.onBattleExit();
                egret.setTimeout(() => {
                    ViewAlert.show("对方已离开此城", null, 1);
                }, self, 50);
                break;
            default:
                ViewBroadcastItemText.text("获得【积分】 X" + self.battleFailScore);
                ViewCommonFail.show(5000, self, "离开", self.failHandler, null);
                break;
        }
    }

    private onBattleExit() {
        GGlobal.modelScene.returnMainScene();
        egret.callLater(() => {
            GGlobal.layerMgr.open(UIConst.QXZL);
            GGlobal.layerMgr.open(UIConst.QXZL_CITY_INFO, { "cityId": this.curCityId });
        }, this)
    }

    private failHandler(): void {
        GGlobal.modelScene.returnMainScene();
        egret.callLater(() => {
            GGlobal.layerMgr.open(UIConst.QXZL);
            GGlobal.layerMgr.open(UIConst.QXZL_CITY_INFO, { "cityId": this.curCityId });
        }, this)
    }

    /**8975  CG 购买体力 */
    public CG_QunXiongZhuLu_buySta_8975(): void {
        if (this.curStamina >= this.maxStamina) {
            ViewCommonWarn.text("您的体力已满，无需购买");
            return;
        }
        // Config.VIP_710
        // tl vip增加体力上限
        // cs vip增加购买次数
        var bates = this.getBytes();
        this.sendSocket(8975, bates);
    }

    /**8976 B-I-I-I GC 购买体力返回 B:结果0成功1-购买次数不足,2-元宝不足resultI:当前体力curValueI:体力上限maxValueI:已购买体力次数buyTiLiTimes*/
    public GC_QunXiongZhuLu_buySta_8976(self: ModelQxzl, data: BaseBytes): void {
        let t_change = false;

        let arg1 = data.readByte(); //结果
        let arg2 = data.readInt(); //当前体力
        let arg3 = data.readInt(); //体力上限
        let arg4 = data.readInt(); //已购买体力次数

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
    }

    /**8977  查看驻守奖励信息 */
    public CG_QunXiongZhuLu_getDefendAwardInfo_8977(): void {
        var bates = this.getBytes();
        this.sendSocket(8977, bates);
    }

    /**8978 [B-I-I] 查看驻守奖励信息返回 [B:道具类型I:道具idI:道具数量]奖励信息awardInfo*/
    public GC_QunXiongZhuLu_getDefendAwardInfo_8978(self: ModelQxzl, data: BaseBytes): void {
        let t_change = false;

        let t_itemList = self.rewardList;
        t_itemList.length = 0;

        let len = data.readShort();
        for (let i = 0; i < len; i++) {
            let arg1 = data.readByte(); //物品类型
            let arg2 = data.readInt(); //id
            let arg3 = data.readInt(); //数量

            let t_itemVo: IGridImpl;
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
    }

    /**8979  获取驻守奖励 */
    public CG_QunXiongZhuLu_gotDefendAward_8979(): void {
        var bates = this.getBytes();
        this.sendSocket(8979, bates);
    }

    /**8980 B 获取驻守奖励返回 B:状态:0-成功,1-失败state*/
    public GC_QunXiongZhuLu_gotDefendAward_8980(self: ModelQxzl, data: BaseBytes): void {
        let t_change = false;

        let arg1 = data.readByte();
        if (arg1 == 0) {
            //成功
            //置空奖励物品数据
            let t_itemList = self.rewardList;
            for (let v of t_itemList) {
                v.count = 0;
            }
            t_change = true;
        }

        if (t_change) {
            GGlobal.control.notify(Enum_MsgType.QXZL_REWARD_UPDATE);
            self.reddotCheckReward();
        }
    }

    /**
     * 8982 I-I-I-I 更新信息 I:类型:1-体力,2-城池归属,3-积分,4-踢出城池typeI:参数1param1I:参数2param2I:参数3param3
     * 类型1 后三个字段分别表示 当前体力、体力上限、恢复时间戳
     * 类型2 后三个字段分别表示 城池id、国家归属
     * 类型3 后三个字段分别表示 个人积分
     * 类型4 收到类型4则表示自己处于非驻守状态（被踢出了）
     */
    public GC_QunXiongZhuLu_pushInfo_8982(self: ModelQxzl, data: BaseBytes): void {
        let t_change = false;

        let t_type = data.readInt();
        let arg2 = data.readInt();
        let arg3 = data.readInt();
        let arg4 = data.readInt();
        let arg5 = data.readInt();
        switch (t_type) {
            case 1: //体力更新
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

            case 2: //城池归属更新
                let t_cityVo = self.getCityVoById(arg2);
                if (t_cityVo && t_cityVo.update(arg3, arg4, arg5)) {
                    t_change = true;
                }
                if (t_change) {
                    GGlobal.control.notify(Enum_MsgType.QXZL_PUSH_CITY_UPDATE);
                }
                break;

            case 3: //个人积分更新
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
    }

    /**8983  打开个人排行  */
    public CG_openPersonRankUI_8983(): void {
        var bates = this.getBytes();
        this.sendSocket(8983, bates);
    }

    /** 个人排行列表 */
    public personRankList: VoRankPlayer[] = [];
    /** 我的个人排名 */
    public myPersonRank: number = 0;
    /** 我的个人积分 */
    public myPersonScore: number = 0;
    /**8984 打开个人排行返回 [S:排名U:玩家名I:积分I:国家id]排行榜数据S:我的排名 0未进排行榜I:我的积分*/
    public GC_OpenPersonRankUI_8984(self: ModelQxzl, data: BaseBytes): void {
        self.personRankList = [];
        let len = data.readShort();
        for (let i: number = 0; i < len; i++) {
            let rank: number = data.readShort();
            let name: string = data.readUTF();
            let score: number = data.readInt();
            let country: number = data.readInt();
            let vo: VoRankPlayer = VoRankPlayer.create();
            vo.update(country, rank, name, score);
            self.personRankList.push(vo);
        }
        self.myPersonRank = data.readShort();
        self.myPersonScore = data.readInt();
        GGlobal.control.notify(Enum_MsgType.QXZL_RANK_PERSON_UPDATE);
    }

    /**8985  单枪匹马buff购买  */
    public CG_BuffBuy_8985(): void {
        var bates = this.getBytes();
        this.sendSocket(8985, bates);
    }

    /**8986 单枪匹马buff购买返回 B:状态：1：成功，2：不够钱，3：已有不能再购买*/
    public GC_BuffBuy_8986(self: ModelQxzl, data: BaseBytes): void {
        let res: number = data.readByte();
        if (res == 1) {
            GGlobal.layerMgr.close(UIConst.QXZL_DQPM);
            let cfg: Ixtcs_004 = Config.xtcs_004[7651];
            self.buffTime = cfg.num * 60;
            GGlobal.control.notify(Enum_MsgType.QXZL_BUFFTIME_UPDATE);
        } else if (res == 3) {
            ViewCommonWarn.text("已有不能再购买");
        }
    }

    //=========================================== API ==========================================
    public getCityVoById(pId: number): VoCityQxzl {
        return this._cityVoMap[pId];
    }

    public getCountryVoById(pCountryId: number): VoCountryQxzl {
        return this._countryVoList[pCountryId - 1];
    }

    public getCountryVoList(): VoCountryQxzl[] {
        return this._countryVoList;
    }

    public getTaskVoById(pTaskId: number): VoTaskQxzl {
        return this._taskVoMap[pTaskId];
    }

    public getShopVoById(pId: number): VoShopQxzl {
        return this._shopVoMap[pId];
    }

    private _shopVoList: VoShopQxzl[];
    public getShopVoList(): VoShopQxzl[] {
        if (this._shopVoList === undefined) {
            this._shopVoList = [];
            for (let k in this._shopVoMap) {
                this._shopVoList.push(this._shopVoMap[k]);
            }
        }
        return this._shopVoList;
    }

    private _rankVoListMap: { [type: number]: VoRankQxzl[] } = {};
    /**
     * 通过类型获取排名奖励数据
     * @param pType 类型 1国家排行 2玩家排行 3个人排行
     */
    public getRankVoListByType(pType: number): VoRankQxzl[] {
        let t_list = this._rankVoListMap[pType];
        if (t_list === undefined) {
            t_list = [];
            for (let k in this._rankVoMap) {
                let t_vo = this._rankVoMap[k];
                if (t_vo.type == pType) {
                    t_list.push(t_vo);
                }
            }
            t_list.sort((pA, pB) => {
                return pA.id - pB.id;
            })
            this._rankVoListMap[pType] = t_list;
        }
        return t_list;
    }

    private _rankPlayerListMap: { [country: number]: VoRankPlayer[] } = {};
    public getRankPlayerListByCountry(pCountry: number): VoRankPlayer[] {
        let t_list = this._rankPlayerListMap[pCountry];
        if (t_list === undefined) {
            this._rankPlayerListMap[pCountry] = t_list = [];
        }
        return t_list;
    }

    private _eventVoListMap: { [tabType: number]: VoEventQxzl[] } = {};
    public getEventVoByTabType(pTabType: number): VoEventQxzl[] {
        let t_list = this._eventVoListMap[pTabType];
        if (t_list === undefined) {
            this._eventVoListMap[pTabType] = t_list = [];
        }
        return t_list;
    }

    /**
     * 通过标签类型获取任务列表
     * @param pTabType 标签类型
     */
    public getTaskVoListByTabType(pTabType: number): VoTaskQxzl[] {
        let t_list = this._tabTypeTaskVoListMap[pTabType];
        if (!t_list) {
            t_list = [];
            for (let k in this._taskVoMap) {
                let t_vo = this._taskVoMap[k];
                if (t_vo.tabType == pTabType) {
                    t_list.push(t_vo);
                }
            }
            this._tabTypeTaskVoListMap[pTabType] = t_list;
        }
        return t_list;
    }

    private _typeVoListMap: { [tabType: number]: { [type: number]: VoTaskQxzl[] } } = {};
    public getTypeVoListMap(pTabType: number): { [type: number]: VoTaskQxzl[] } {
        if (this._typeVoListMap[pTabType] === undefined) {
            let t_allList = this.getTaskVoListByTabType(pTabType);
            this._typeVoListMap[pTabType] = {};
            for (let v of t_allList) {
                let t_type = v.cfg.type;
                let t_voList = this._typeVoListMap[pTabType][t_type];
                if (!t_voList)
                    this._typeVoListMap[pTabType][t_type] = t_voList = [];
                t_voList.push(v);
            }
        }
        return this._typeVoListMap[pTabType];
    }

    /** 我的国家 */
    public get myCountry(): number {
        return Model_player.voMine.country;
    }

    /**
     * 通过国家获取对应的主城id
     * @param pCountryId 国家
     */
    public getMainCityIdByCountryId(pCountryId: number): number {
        return this._mainCityMap[pCountryId];
    }

    private _recoverPoint: number;
    /** 单位时间回复的体力点 */
    public get recoverPoint(): number {
        if (this._recoverPoint === undefined) {
            this._recoverPoint = FastAPI.getSystemValue(7201);
        }
        return this._recoverPoint;
    }

    private _moveNeedStamina: number;
    /** 移动体力消耗 */
    public get moveNeedStamina(): number {
        if (this._moveNeedStamina === undefined) {
            this._moveNeedStamina = FastAPI.getSystemValue(7206);
        }
        return this._moveNeedStamina;
    }

    private _battleWinStamina: number;
    /** 战斗胜利消耗体力 */
    public get battleWinStamina(): number {
        if (this._battleWinStamina === undefined) {
            this._battleWinStamina = FastAPI.getSystemValue(7203);
        }
        return this._battleWinStamina;
    }

    private _battleFailStamin: number
    /** 战斗失败消耗体力 */
    public get battleFailStamin(): number {
        if (this._battleFailStamin === undefined) {
            this._battleFailStamin = FastAPI.getSystemValue(7204);
        }
        return this._battleFailStamin;
    }

    private _staminaRecoverInterval: number
    /** 体力恢复时间间隔（s） */
    public get staminaRecoverInterval(): number {
        if (this._staminaRecoverInterval === undefined) {
            this._staminaRecoverInterval = FastAPI.getSystemValue(7208);
        }
        return this._staminaRecoverInterval;
    }

    private _buyCounsumeMap: { [id: number]: VoStaQxzl };
    public maxBuyTimes = 0;
    /** 购买体力消耗物品/货币 */
    public get buyStaNeedConsume(): IGridImpl {
        this.initVoStaMap();
        let t_targetTime = this.buyTimes + 1;
        t_targetTime = t_targetTime > this.maxBuyTimes ? this.maxBuyTimes : t_targetTime;
        return this._buyCounsumeMap[t_targetTime].consume;
    }

    private _buyStaOnceRecover: number
    /** 购买体力一次的恢复量 */
    public get buyStaOnceRecover(): number {
        this.initVoStaMap();
        let t_targetTime = this.buyTimes + 1;
        t_targetTime = t_targetTime > this.maxBuyTimes ? this.maxBuyTimes : t_targetTime;
        return this._buyCounsumeMap[t_targetTime].cfg.tl;
    }

    private _baseMaxSta: number
    /** 基础体力上限 */
    public get baseMaxSta(): number {
        if (this._baseMaxSta === undefined) {
            this._baseMaxSta = FastAPI.getSystemValue(7205);
        }
        return this._baseMaxSta;
    }

    private _baseBuyLimit: number
    /** 基础购买体力上限 */
    public get baseBuyLimit(): number {
        if (this._baseBuyLimit === undefined) {
            this._baseBuyLimit = FastAPI.getSystemValue(7209);
        }
        return this._baseBuyLimit;
    }

    private initVoStaMap() {
        if (this._buyCounsumeMap === undefined) {
            this._buyCounsumeMap = {};
            let t_cfg = Config.qxzltl_273;
            for (let k in t_cfg) {
                let t_vo = new VoStaQxzl();
                t_vo.id = ~~k;
                this._buyCounsumeMap[t_vo.id] = t_vo;
                if (t_vo.id > this.maxBuyTimes)
                    this.maxBuyTimes = t_vo.id;
            }
        }
    }

    private _mvpRewardList: IGridImpl[];
    /** mvp奖励 */
    public get mvpRewardList(): IGridImpl[] {
        if (this._mvpRewardList === undefined) {
            this._mvpRewardList = ConfigHelp.makeItemListArr(FastAPI.getSystemValue(7207));
        }
        return this._mvpRewardList;
    }

    private _battleWinRewardList: IGridImpl[];
    /** 战斗胜利奖励 */
    public get battleWinRewardList(): IGridImpl[] {
        if (this._battleWinRewardList === undefined) {
            this._battleWinRewardList = ConfigHelp.makeItemListArr(FastAPI.getSystemValue(7202));
        }
        return this._battleWinRewardList;
    }

    private _battleFailRewardList: IGridImpl[];
    /** 战斗失败奖励 */
    public get battleFailRewardList(): IGridImpl[] {
        if (this._battleFailRewardList === undefined) {
            this._battleFailRewardList = ConfigHelp.makeItemListArr(FastAPI.getSystemValue(7215));
        }
        return this._battleFailRewardList;
    }

    private _battleWinScore: number;
    /** 战斗胜利积分奖励 */
    public get battleWinScore(): number {
        if (this._battleWinScore === undefined) {
            this._battleWinScore = FastAPI.getSystemValue(7216);
        }
        return this._battleWinScore;
    }

    private _battleFailScore: number;
    /** 战斗失败积分奖励 */
    public get battleFailScore(): number {
        if (this._battleFailScore === undefined) {
            this._battleFailScore = FastAPI.getSystemValue(7217);
        }
        return this._battleFailScore;
    }

    private _battleNeedSta: number;
    /** 挑战的体力要求 */
    public get battleNeedSta(): number {
        if (this._battleNeedSta == undefined) {
            this._battleNeedSta = FastAPI.getSystemValue(7218);
        }
        return this._battleNeedSta;
    }

    private _doubleRewardList: IGridImpl[];
    /** 庆典城池奖励 */
    public get doubleRewardList(): IGridImpl[] {
        if (this._doubleRewardList === undefined) {
            this._doubleRewardList = ConfigHelp.makeItemListArr(FastAPI.getSystemValue(7212));
        }
        return this._doubleRewardList;
    }

    private _doubleGuardReward: IGridImpl[];
    public get doubleGuardReward(): IGridImpl[] {
        if (this._doubleGuardReward === undefined) {
            this._doubleGuardReward = ConfigHelp.makeItemListArr(FastAPI.getSystemValue(7213));
        }
        return this._doubleGuardReward;
    }

    private _doubleGuardPoint: number
    public get doubleGuardPoint(): number {
        if (this._doubleGuardPoint === undefined) {
            this._doubleGuardPoint = FastAPI.getSystemValue(7214);
        }
        return this._doubleGuardPoint;
    }

    // 红点
    // 1任务
    // 2驻守奖励
    // 3体力
    // 4个人战况
    // 5每次登陆红点

    public reddotCheckTask() {
        let t = this;
        let t_value = false;
        for (let k in t._taskVoMap) {
            let t_vo = t._taskVoMap[k];
            if (t_vo.state == EnumQxzl.STATE_CAN_GET) {
                t_value = true;
                break;
            }
        }
        GGlobal.reddot.setCondition(UIConst.QXZL, 1, t_value);
    }

    public reddotCheckReward() {
        let t = this;
        let t_value = false;
        if (t.rewardList.length > 0) {
            for (let v of t.rewardList) {
                if (v && v.count > 0) {
                    t_value = true;
                    break;
                }
            }
        }
        GGlobal.reddot.setCondition(UIConst.QXZL, 2, t_value);
    }

    public reddotCheckSta() {
        let t = this;
        let t_value = false;
        if (!t.isEnd) {
            if (t.curStamina == 0) {
                t_value = true;
            }
        }
        GGlobal.reddot.setCondition(UIConst.QXZL, 3, t_value);
    }

    public reddotCheckLog() {
        let t = this;
        let t_value = false;
        GGlobal.reddot.setCondition(UIConst.QXZL, 4, t_value);
    }
    //===================================== private method =====================================
    //======================================== handler =========================================
}