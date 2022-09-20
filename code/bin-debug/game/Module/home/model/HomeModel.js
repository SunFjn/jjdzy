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
var HomeModel = (function (_super) {
    __extends(HomeModel, _super);
    function HomeModel() {
        var _this = _super.call(this) || this;
        _this.home_masterID = 0; //家园主人id
        _this.home_masterName = ""; //家园主人名字
        _this.home_masterHead = 0; //家园主人头像
        _this.home_masterheadGrid = 0; //家园主人头像框
        _this.home_masterLevel = 0; //家园主人等级
        _this.home_level = 0; //家园等级
        _this.home_type = 0; //家园类型档次
        _this.home_maid = 0; //家园侍女
        _this.home_exp = 0; //家园繁荣度
        _this.god_awards = 0; //金库存贮的府邸比
        _this.nextGetMoneyTime = 0; //下次领取府邸币的时间
        _this.remaindEventAward = 0; //剩余的随机事件次数
        _this.helpTime = 0; //可帮助事件次数
        //天工炉积分
        _this.score = 0;
        //天工炉次数
        _this.lucky_count = 0;
        /**商店表数据  已购买次数 */
        _this.shopData = []; //商店数据
        //摇钱树时间
        _this.nextHitTreeTime = 0;
        //天工炉已抽奖次数drawAwardTimesL
        //家具等级数据
        _this.furnitureData = {};
        //家园排行榜
        _this.homeRank_data = [];
        _this.maxPage = 1;
        _this.currentPage = 1;
        _this.myRank = 0;
        /**建筑数据*/
        _this.builddata = [];
        _this.logdata = [];
        //天工炉 物品选择
        //type 0 取消 1选择
        _this.optArr = [];
        _this.bagdata = [];
        _this.isFirst = 0;
        _this.showHomeTip = 1;
        return _this;
    }
    HomeModel.isTimeIn = function () {
        var date = new Date(Model_GlobalMsg.getServerTime());
        var beginDate = new Date(Model_GlobalMsg.getServerTime());
        beginDate.setHours(23, 55, 0);
        var endDate = new Date(Model_GlobalMsg.getServerTime());
        endDate.setHours(24, 0, 0);
        var beginDate1 = new Date(Model_GlobalMsg.getServerTime());
        beginDate1.setHours(0, 0, 0);
        var endDate1 = new Date(Model_GlobalMsg.getServerTime());
        endDate1.setHours(0, 5, 0);
        if ((date.getTime() >= beginDate.getTime() && date.getTime() <= endDate.getTime()) ||
            (date.getTime() >= beginDate1.getTime() && date.getTime() <= endDate1.getTime())) {
            return true;
        }
        else {
            return false;
        }
    };
    Object.defineProperty(HomeModel.prototype, "getHomeType", {
        get: function () {
            var cfg = Config.fddc_019[this.home_type];
            return cfg ? cfg.name : "";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HomeModel.prototype, "isCanCollect", {
        get: function () {
            var self = this;
            var per = ConfigHelp.getSystemNum(7114);
            return self.god_awards > per / 100 * self.getGodMoneyMax();
        },
        enumerable: true,
        configurable: true
    });
    //通过家具ID获取对应NPCID
    HomeModel.prototype.getNpcIDbyJiaJU = function (id) {
        var realid = id - (id % 100) + 1;
        return Config.zsfl_019[realid].npc;
    };
    //通过NPC表的ID找到家具应该显示的数据 模型和名字
    HomeModel.getFurnitureLevelByNpcId = function (id) {
        var ret;
        var model = GGlobal.homemodel;
        var buildType = HomeModel.getBuildType(id);
        if (buildType) {
            ret = model.getBuildCfgIDByType(buildType);
        }
        return ret;
    };
    HomeModel.getBuildType = function (id) {
        var ret;
        var model = GGlobal.homemodel;
        var buildType = 0;
        for (var i in Config.zsfl_019) {
            if (Config.zsfl_019[i].npc == id + "") {
                buildType = Config.zsfl_019[i].zslx;
                break;
            }
        }
        return buildType;
    };
    //获取当前金库可以获得最大时间的家园币的数量
    HomeModel.prototype.getGodMoneyMax = function () {
        var id = this.getBuildCfgIDByType(HomeModel.NPC_JINKU);
        if (!id) {
            return 0;
        }
        var a = Config.fdjk_019[id];
        var homelib = Config.fddc_019[this.home_type];
        return a.cishu * (JSON.parse(homelib.zengjia)[0][2]) / 600;
    };
    Object.defineProperty(HomeModel.prototype, "isSelfHome", {
        get: function () {
            return Model_player.voMine.id == this.home_masterID;
        },
        enumerable: true,
        configurable: true
    });
    //获取玩家身上的事件
    HomeModel.prototype.getRoleEventState = function (id) {
        var ret = 0;
        for (var i = 0; i < this.builddata.length; i++) {
            var data = this.builddata[i];
            var cfg = Config.fdsjsj_019[data.id];
            var npcid = this.getNpcIDbyJiaJU(cfg.guanlian);
            if (id == npcid) {
                ret = data.state;
                break;
            }
        }
        return ret;
    };
    HomeModel.prototype.pushLog = function () {
    };
    HomeModel.prototype.isHomeMonster = function (id) {
        var cfg = Config.fdqd_019;
        for (var i in cfg) {
            if (cfg[i].id == id) {
                return true;
            }
        }
        return false;
    };
    //通过NPCID获取此NPC身上的随机事件的状态
    HomeModel.prototype.getEventByNpcID = function (id) {
        var ret = 0;
        for (var i = 0; i < this.builddata.length; i++) {
            var data = this.builddata[i];
            var cfg = Config.fdsjsj_019[data.id];
            var npcid = this.getNpcIDbyJiaJU(cfg.guanlian);
            if (id == npcid) {
                ret = data.state ? data.id : 0;
                break;
            }
        }
        return ret;
    };
    Object.defineProperty(HomeModel.prototype, "isTopLevel", {
        //府邸是否已经达到最高级
        get: function () {
            var ret = Config.fdsj_019[this.home_level + 1];
            return !ret;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HomeModel.prototype, "isTopStar", {
        //府邸是否已经达到最高档次
        get: function () {
            var ret = Config.fddc_019[this.home_type + 1];
            return !ret;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HomeModel.prototype, "buildTopLvel", {
        //当前府邸 装饰可升级的最高等级
        get: function () {
            var cfg = Config.fdsj_019[this.home_level];
            return cfg.zhuangshi;
        },
        enumerable: true,
        configurable: true
    });
    //当前模型是不是这类家具的最高模型
    HomeModel.getModelID = function (id) {
        var cfg = Config.fdzssj_019;
        var lib = cfg[id];
        var currentMD = lib.moxing;
        var currenttype = lib.zslx;
        for (var i = 0; i < 40; i++) {
            if (cfg[id + i]) {
                if (cfg[id + i].zslx == currenttype) {
                    if (cfg[id + i].moxing != currentMD) {
                        return cfg[id + i].moxing;
                    }
                }
            }
            else {
                return 0;
            }
        }
        return 0;
    };
    //销毁上个房子的数据
    HomeModel.prototype.destory = function () {
        var self = this;
        self.home_masterID = 0; //家园主人id
        self.home_masterName = ""; //家园主人名字
        self.home_masterHead = 0; //家园主人头像
        self.home_masterheadGrid = 0; //家园主人头像框
        self.home_masterLevel = 0; //家园主人等级
        self.home_level = 0; //家园等级
        self.home_type = 0; //家园类型档次
        self.home_exp = 0; //家园繁荣度
        //摇钱树时间
        self.nextHitTreeTime = 0;
        //天工炉已抽奖次数drawAwardTimesL
        self.lucky_count = 0;
        self.furnitureData = [];
    };
    HomeModel.prototype.test = function (sceneId) {
        var self = ModelArpgMap.getInstance();
        var posX = 500;
        var posY = 500;
        self.sceneMap = sceneId;
        var cfg = self.mapCfg();
        var map = cfg[sceneId];
        self.sceneMapSRC = map.s;
        self.sceneType = map.severtype;
        ARPGSceneController.enter();
        GameUnitManager.hero.setXY(posX, posY);
        GameUnitManager.hero.isOnJumpPoint = false;
        var url = "";
        GameUnitManager.removePlayerNpc();
        ArpgMap.getInstance().disposeByChangeScene();
        self.sceneMap = sceneId;
        var mapDes = map.name;
        GGlobal.layerMgr.open(UIConst.ARPG_SCENEVIEW, mapDes);
        url = RESManager.getVersionUrl("resource/map/" + map.s + "/clientSceneFile.bin");
        RES.getResByUrl(url, self.onMapLoadComplete, self, RES.ResourceItem.TYPE_BIN);
        SoundManager.getInstance().playBGM(map.b);
    };
    HomeModel.getFurnitureLevel = function (id) {
        if (Config.fdzssj_019[id]) {
            return Config.fdzssj_019[id].zsdj;
        }
        return 0;
    };
    HomeModel.prototype.selectItemInTianGong = function (id, count, type) {
        var self = this;
        if (type == 0) {
            for (var i = 0; i < self.optArr.length; i++) {
                var item = self.optArr[i];
                if (item[0] == id) {
                    self.optArr.splice(i, 1);
                    break;
                }
            }
        }
        else {
            var hasOpt = 0;
            for (var i = 0; i < self.optArr.length; i++) {
                var item = self.optArr[i];
                if (item[0] == id) {
                    hasOpt = 1;
                    item[1] = count;
                    break;
                }
            }
            if (!hasOpt) {
                self.optArr.push([id, count]);
            }
        }
        GGlobal.control.notify(HomeModel.HOME_UI_DATA_UPDATE);
    };
    HomeModel.prototype.allIn = function () {
        var self = this;
        self.optArr = [];
        var list = self.bagdata;
        for (var i = 0; i < list.length; i++) {
            var item = list[i];
            self.optArr.push([item.id, item.count]);
        }
        GGlobal.control.notify(HomeModel.HOME_UI_DATA_UPDATE);
    };
    HomeModel.prototype.buildTianGongBagData = function () {
        this.bagdata = Model_Bag.filterItems(function (vo) {
            return vo.cfg.tgjf > 0;
        });
        this.bagdata = this.bagdata.concat(Model_Bag.filterGems(function (vo) {
            return vo.cfg.tgjf > 0;
        }));
    };
    //根据类型获取家园建筑等级
    HomeModel.prototype.getBuildCfgIDByType = function (t) {
        return this.furnitureData[t];
    };
    HomeModel.prototype.checkHomeLevelUp_Condition = function () {
        var ret = false;
        var self = this;
        ret = self.checkHomeLevel();
        if (!ret) {
            ret = self.checkHomeType();
        }
        return ret;
    };
    HomeModel.prototype.checkHomeLevel = function () {
        var ret = false;
        var self = this;
        var isfull = self.isTopLevel;
        if (!isfull) {
            var level = self.home_level;
            level = level ? level : 1;
            var levelLib = Config.fdsj_019[level];
            var items = JSON.parse(levelLib.xiaohao);
            var itemID = items[0][1];
            var itemCount = Model_Bag.getItemCount(itemID);
            ret = itemCount >= items[0][2] ? true : false;
        }
        return ret;
    };
    HomeModel.prototype.checkHomeType = function () {
        var self = this;
        var ret = false;
        if (!self.isTopStar) {
            var star = self.home_type;
            star = star ? star : 1;
            var lib = Config.fddc_019[star];
            var levelUpCost = JSON.parse(lib.xiaohao);
            ret = Model_player.voMine.yuanbao >= levelUpCost[0][2];
        }
        return ret;
    };
    HomeModel.prototype.listenServ = function (mgr) {
        var self = this;
        self.socket = mgr;
        //注册GC方法
        mgr.regHand(11102, self.GC_House_gotoYard_11102, self);
        mgr.regHand(11104, self.GC_House_outHouse_11104, self);
        mgr.regHand(11106, self.GC_House_upHouseLv_11106, self);
        mgr.regHand(11108, self.GC_House_upHouseDc_11108, self);
        mgr.regHand(11110, self.GC_House_upDecorateLv_11110, self);
        mgr.regHand(11112, self.GC_House_shakeTree_11112, self);
        mgr.regHand(11114, self.GC_House_harvestMoney_11114, self);
        mgr.regHand(11116, self.GC_House_drawAward_11116, self);
        mgr.regHand(11118, self.GC_House_sacrifice_11118, self);
        mgr.regHand(11120, self.GC_House_gotoRoom_11120, self);
        mgr.regHand(11122, self.GC_House_rank_11122, self);
        mgr.regHand(11124, self.GC_House_event_11124, self);
        mgr.regHand(11126, self.GC_House_changEvent_11126, self);
        mgr.regHand(11128, self.GC_House_fight_11128, self);
        mgr.regHand(11130, self.GC_House_fightResult_11130, self);
        mgr.regHand(11132, self.GC_House_god_11132, self);
        mgr.regHand(11134, self.GC_House_log_11134, self);
        mgr.regHand(11402, self.GC_OPEN_SHOP_11402, self);
        mgr.regHand(11406, self.GC_SHOP_BUY_11406, self);
        mgr.regHand(11136, self.GC_DATA_11136, self);
    };
    /**11401  CG打开商店ui  */
    HomeModel.prototype.CG_OPEN_SHOP_11401 = function () {
        var ba = new BaseBytes();
        this.sendSocket(11401, ba);
    };
    /**11402 GC 打开商店返回 I:府邸货币[B:商品位置索引序号（0-5）I:商品idI:已经购买次数]  */
    HomeModel.prototype.GC_OPEN_SHOP_11402 = function (self, data) {
        Model_player.voMine.homeMoney = data.readInt();
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var index = data.readByte();
            var shopID = data.readInt();
            var buyNum = data.readInt();
            var cfg = Config.fdshop_019[shopID];
            self.shopData[index] = { cfg: cfg, buyNum: buyNum };
        }
        GGlobal.control.notify(UIConst.HOME_SHOP);
    };
    /**11403  CG 重置商店商品   */
    HomeModel.prototype.CG_SHOP_RESET_11403 = function () {
        var ba = new BaseBytes();
        this.sendSocket(11403, ba);
    };
    /**11405 CG购买商店商品 B:商品序号（0-5）  */
    HomeModel.prototype.CG_SHOP_BUY_11405 = function (index) {
        var ba = new BaseBytes();
        ba.writeByte(index);
        this.sendSocket(11405, ba);
    };
    /**11406 GC 购买返回 B:0成功 1货币不足 2次数不足B:商品序号I: 府邸货币  */
    HomeModel.prototype.GC_SHOP_BUY_11406 = function (self, data) {
        var result = data.readByte();
        var index = data.readByte();
        if (result == 0) {
            Model_player.voMine.homeMoney = data.readInt();
            self.shopData[index].buyNum++;
            GGlobal.control.notify(UIConst.HOME_SHOP);
        }
    };
    /**11101 L 进入院子 L:角色idheroId*/
    HomeModel.prototype.CG_House_gotoYard_11101 = function (arg1) {
        if (!ModuleManager.isOpen(UIConst.HOME, true)) {
            return;
        }
        var bates = this.getBytes();
        bates.writeLong(arg1);
        this.sendSocket(11101, bates, false);
    };
    /**11102 B-L-U-I-I-L-I-I-[I-I]-I-I-L-L 进入院子返回 B:状态:0-成功,1-失败L:角色idU:角色名字I:角色头像I:角色头像框I:角色等级L:繁荣度I:府邸等级I:府邸档次[I:装饰idI:装饰等级(对应升级表id)]装饰信息
     * I:上一次摇树时间I:天工炉已抽奖次数L:天工炉积分L:金库储存府邸币[I:事件idI:事件状态]事件信息*/
    HomeModel.prototype.GC_House_gotoYard_11102 = function (self, data) {
        var result = data.readByte();
        if (result == 0) {
            if (!self.isFirst) {
                self.isFirst = 1;
                GGlobal.modelHouseKeeper.CG_HouseKeeper_openUI_11351();
            }
            HomeModel.inHome = 1;
            self.home_masterID = data.readLong();
            self.home_masterName = data.readUTF();
            self.home_masterHead = data.readInt();
            self.home_masterheadGrid = data.readInt();
            self.home_masterLevel = data.readInt();
            self.home_exp = data.readLong();
            self.home_level = data.readInt();
            self.home_type = data.readInt();
            var len = data.readShort();
            self.furnitureData = {};
            for (var i = 0; i < len; i++) {
                var id = data.readInt();
                self.furnitureData[id] = data.readInt();
            }
            self.nextHitTreeTime = data.readInt() * 1000;
            self.lucky_count = data.readInt();
            self.score = data.readLong();
            self.god_awards = data.readLong();
            len = data.readShort();
            self.builddata = [];
            for (var i = 0; i < len; i++) {
                var obj = {};
                obj.id = data.readInt();
                obj.state = data.readInt();
                self.builddata.push(obj);
            }
            self.nextGetMoneyTime = data.readInt() * 1000;
            self.remaindEventAward = data.readInt();
            self.helpTime = data.readInt();
            Model_player.voMine.homeMoney = data.readLong();
            GGlobal.modelHouseKeeper.jdID = data.readInt();
            self.home_maid = data.readInt();
            // let showHomeTip = data.readByte();
            if (self.showHomeTip) {
                if (Model_player.isMineID(self.home_masterID)) {
                    self.warn("欢迎来到府邸");
                }
                else {
                    var CFG = Config.fddc_019[self.home_type];
                    GGlobal.layerMgr.open(UIConst.MAP, { "mapName": "<font color='#0bf442'>" + self.home_masterName + "</font><font color='#ffffff'>的" + CFG.name + "</font>", "stroke": 1 });
                    self.warn("欢迎来到<font color='#0bf442'>" + self.home_masterName + "</font>的府邸");
                }
            }
            self.showHomeTip = 1;
            self.lucky_count;
            self.notifyGlobal(HomeModel.HOME_UI_MAID_SHOW);
            self.notifyGlobal(HomeModel.HOME_SCENE_UPDATE);
            GGlobal.layerMgr.open(UIConst.SCENELOADING);
        }
        else {
            self.warn("进入家园失败");
        }
    };
    /**11103  退出府邸 */
    HomeModel.prototype.CG_House_outHouse_11103 = function () {
        var bates = this.getBytes();
        this.sendSocket(11103, bates);
        HomeModel.inHome = 0;
        GGlobal.layerMgr.close2(UIConst.MAP);
        GGlobal.mapscene.enterScene(SceneCtrl.GUANQIA);
    };
    /**11104 B 退出府邸返回 B:状态:0-成功,1-失败state*/
    HomeModel.prototype.GC_House_outHouse_11104 = function (self, data) {
        var result = data.readByte();
        if (result == 0) {
            self.destory();
        }
        else {
            self.warn("退出家园失败");
        }
    };
    /**11105  升级府邸等级 */
    HomeModel.prototype.CG_House_upHouseLv_11105 = function () {
        var bates = this.getBytes();
        this.sendSocket(11105, bates);
    };
    /**11106 B 升级府邸等级返回 B:状态:0-成功,1-失败state*/
    HomeModel.prototype.GC_House_upHouseLv_11106 = function (self, data) {
        var result = data.readByte();
        if (result == 0) {
            self.home_level = data.readInt();
            self.notifyGlobal(HomeModel.HOME_UI_DATA_UPDATE);
        }
        else {
            if (result == 1) {
                self.warn("配置不存在");
            }
            else if (result == 2) {
                self.warn("已达最高等级");
            }
            else if (result == 3) {
                self.warn("繁荣度不足");
            }
            else if (result == 4) {
                self.warn("货币不足");
            }
            else if (result == 5) {
                self.warn("府邸档次不足");
            }
        }
    };
    /**11107  升级府邸档次 */
    HomeModel.prototype.CG_House_upHouseDc_11107 = function () {
        var bates = this.getBytes();
        this.sendSocket(11107, bates);
    };
    /**11108 B 升级府邸档次返回 B:状态:0-成功,1-失败state*/
    HomeModel.prototype.GC_House_upHouseDc_11108 = function (self, data) {
        var result = data.readByte();
        if (result == 0) {
            self.warn("府邸提升档次完毕，请重新进入");
            HomeManager.leavelHome();
        }
        else {
            if (result == 1) {
                self.warn("配置不存在");
            }
            else if (result == 2) {
                self.warn("已达最高档次");
            }
            else if (result == 3) {
                self.warn("府邸等级不足");
            }
            else if (result == 4) {
                self.warn("货币不足");
            }
        }
    };
    /**11109 I 升级装饰等级 I:装饰类型type*/
    HomeModel.prototype.CG_House_upDecorateLv_11109 = function (arg1) {
        var cfgid = this.getBuildCfgIDByType(arg1);
        var level = this.buildTopLvel;
        if (Config.fdzssj_019[cfgid].zsdj >= level) {
            this.warn("府邸等级不足");
            return;
        }
        var bates = this.getBytes();
        bates.writeInt(arg1);
        this.sendSocket(11109, bates);
    };
    /**11110 B 升级装饰等级返回 B:状态:0-成功,1-失败state*/
    HomeModel.prototype.GC_House_upDecorateLv_11110 = function (self, data) {
        var result = data.readByte();
        if (result == 0) {
            var type = data.readInt();
            self.furnitureData[type] = data.readInt();
            self.lucky_count;
            self.notifyGlobal(HomeModel.HOME_UI_DATA_UPDATE);
            self.notifyGlobal(HomeModel.HOME_SCENE_UPDATE);
        }
        else if (result == 1) {
            self.warn("参数错误");
        }
        else if (result == 2) {
            self.warn("配置不存在");
        }
        else if (result == 3) {
            self.warn("已达最高等级");
        }
        else if (result == 4) {
            self.warn("府邸配置不存在");
        }
        else if (result == 5) {
            self.warn("府邸等级不足");
        }
        else if (result == 6) {
            self.warn("材料不足");
        }
    };
    /**11111  摇钱行为 */
    HomeModel.prototype.CG_House_shakeTree_11111 = function () {
        var bates = this.getBytes();
        this.sendSocket(11111, bates);
    };
    /**11112 B 摇钱行为返回 B:状态:0-成功,1-冷却中,2-数据异常,3-配置不存在,4-府邸配置不存在,5-府邸等级不足*/
    HomeModel.prototype.GC_House_shakeTree_11112 = function (self, data) {
        var result = data.readByte();
        switch (result) {
            case 0:
                self.nextHitTreeTime = data.readInt() * 1000;
                self.notifyGlobal(HomeModel.HOME_UI_DATA_UPDATE);
                break;
            case 1:
                self.warn("CD冷却中");
                break;
            case 2:
                self.warn("数据异常");
                break;
            case 3:
                self.warn("配置不存在");
                break;
            case 4:
                self.warn("府邸配置不存在");
                break;
            case 5:
                self.warn("府邸档次不足");
                break;
        }
    };
    /**11113  收获府邸币 */
    HomeModel.prototype.CG_House_harvestMoney_11113 = function () {
        var bates = this.getBytes();
        bates.writeLong(this.home_masterID);
        this.sendSocket(11113, bates);
    };
    /**11114 收获府邸币返回 B:状态:0-成功,1-金库为空I:下次可领府邸币时间I:顺走数量I:减免数量*/
    HomeModel.prototype.GC_House_harvestMoney_11114 = function (self, data) {
        var result = data.readByte();
        if (result == 0) {
            self.nextGetMoneyTime = data.readInt() * 1000;
            var add = data.readInt();
            var def = data.readInt();
            self.god_awards = self.god_awards - add + def;
            if (def) {
                GGlobal.layerMgr.open(UIConst.HOME_JIADING_UI, [add, def]);
            }
            self.notifyGlobal(HomeModel.HOME_SCENE_UPDATE);
            self.warn("收获成功");
        }
        else if (result == 1) {
            self.warn("金库为空");
        }
        else if (result == 2) {
            self.warn("金库偷窃冷却中");
        }
        else if (result == 3) {
            self.warn("府邸币太少了，下不了手");
        }
    };
    /**11115  天工炉抽奖 */
    HomeModel.prototype.CG_House_drawAward_11115 = function () {
        var bates = this.getBytes();
        bates.writeLong(this.home_masterID);
        this.sendSocket(11115, bates);
    };
    /**11116 B-B-I-I 天工炉抽奖返回 B:状态:0-成功,1-失败stateB:物品类型iTypeI:物品idiIdI:物品数量iCount*/
    HomeModel.prototype.GC_House_drawAward_11116 = function (self, data) {
        var ret = data.readByte();
        if (ret == 0) {
            var type = data.readByte();
            var id = data.readInt();
            var count = data.readInt();
            self.score = data.readLong();
            self.lucky_count = data.readInt();
            self.notifyGlobal(HomeModel.CHOUJIANG_RE, [type, id, count]);
        }
        else {
            if (ret == 1) {
                self.warn("配置不存在");
            }
            else if (ret == 2) {
                self.warn("积分不足");
            }
            else if (ret == 3) {
                self.warn("数据异常");
            }
            else if (ret == 4) {
                self.warn("天工炉配置不存在");
            }
            else if (ret == 5) {
                self.warn("今日已无抽取次数");
            }
        }
    };
    /**11117 [B-I-I] 天工炉献祭 [B:物品类型I:物品idI:物品数量]献祭物品信息itemInfo*/
    HomeModel.prototype.CG_House_sacrifice_11117 = function () {
        var len = this.optArr.length;
        if (len == 0) {
            this.warn("请添加物品");
            return;
        }
        var bates = this.getBytes();
        bates.writeShort(len);
        for (var i = 0; i < len; i++) {
            var items = this.optArr[i];
            bates.writeByte(1);
            bates.writeInt(items[0]);
            bates.writeInt(items[1]);
        }
        this.sendSocket(11117, bates);
    };
    /**11118 B 天工炉献祭返回 B:状态:0-成功,1-配置不存在,2-物品不能献祭,3-物品不足*/
    HomeModel.prototype.GC_House_sacrifice_11118 = function (self, data) {
        var result = data.readByte();
        switch (result) {
            case 0:
                self.warn("献祭成功");
                self.bagdata = [];
                self.optArr = [];
                self.score = data.readLong();
                self.buildTianGongBagData();
                self.notifyGlobal(HomeModel.HOME_UI_DATA_RE);
                break;
            case 1:
                self.warn("配置不存在");
                break;
            case 2:
                self.warn("物品不能献祭");
                break;
            case 3:
                self.warn("物品不足");
                break;
        }
    };
    /**11119 L 进入客厅 L:角色idheroId*/
    HomeModel.prototype.CG_House_gotoRoom_11119 = function (home_masterID) {
        var bates = this.getBytes();
        bates.writeLong(home_masterID);
        this.sendSocket(11119, bates);
    };
    /**11120 B 进入客厅返回 B:状态:0-成功,1-失败*/
    HomeModel.prototype.GC_House_gotoRoom_11120 = function (self, data) {
        var result = data.readByte();
        if (result == 0) {
            HomeModel.inHome = 2;
        }
        else {
            self.warn("进入失败");
        }
    };
    HomeModel.prototype.CG_House_rank_11121 = function () {
        var bates = this.getBytes();
        this.sendSocket(11121, bates, false);
    };
    //打开排名榜返回 B:状态:0-成功,1-失败I:当前页数I:总页数[I:排名L:玩家idU:玩家名字I:玩家头像I:玩家头像框I:玩家等级I:府邸等级I:府邸档次B:府邸随机事件状态:0-没有,1-叹号]府邸排名
    HomeModel.prototype.GC_House_rank_11122 = function (self, data) {
        var ret = data.readByte();
        if (ret == 0) {
            self.homeRank_data = [];
            self.myRank = data.readInt();
            var len = data.readShort();
            self.maxPage = Math.ceil(len / 5);
            for (var i = 0; i < len; i++) {
                var temp = {};
                temp.rank = data.readInt();
                temp.id = data.readLong();
                temp.name = data.readUTF();
                temp.head = data.readInt();
                temp.headGrid = data.readInt();
                temp.level = data.readInt();
                temp.homeLv = data.readInt();
                temp.homeType = data.readInt();
                temp.event = data.readByte();
                self.homeRank_data.push(temp);
            }
            self.notifyGlobal(HomeModel.HOME_UI_DATA_UPDATE);
        }
        else {
            self.warn("排行榜数据异常");
        }
    };
    HomeModel.prototype.CG_House_event_11123 = function (id) {
        var self = this;
        if (self.isSelfHome) {
            if (!self.remaindEventAward) {
                self.warn("今日次数已用完");
                return;
            }
        }
        else {
            if (!self.helpTime) {
                self.warn("今日次数已用完");
                return;
            }
        }
        var bates = this.getBytes();
        bates.writeLong(this.home_masterID);
        bates.writeInt(id);
        this.sendSocket(11123, bates);
    };
    //获取事件奖励返回
    HomeModel.prototype.GC_House_event_11124 = function (self, data) {
        var ret = data.readByte();
        var id = data.readInt();
        if (ret == 0) {
            var len1 = self.builddata.length;
            var nodata = 1;
            for (var j = 0; j < len1; j++) {
                var item = self.builddata[j];
                if (item.id == id) {
                    item.state = 0;
                    break;
                }
            }
            if (self.isSelfHome) {
                self.remaindEventAward--;
            }
            else {
                self.helpTime--;
            }
            self.notifyGlobal(HomeModel.HOME_SCENE_UPDATE);
            GGlobal.layerMgr.close(UIConst.HOME_EVENT_UI);
            self.warn("领取成功");
        }
        else {
            if (ret == 1) {
                self.warn("事件不存在");
            }
            else if (ret == 2) {
                self.warn("配置不存在");
            }
            else if (ret == 3) {
                self.warn("事件已处理");
            }
        }
    };
    //推送事件变化 L:角色id[I:事件idI:事件状态]事件信息
    HomeModel.prototype.GC_House_changEvent_11126 = function (self, data) {
        var masterid = data.readLong();
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var len1 = self.builddata.length;
            var id = data.readInt();
            var state = data.readInt();
            var nodata = 1;
            for (var j = 0; j < len1; j++) {
                var item = self.builddata[j];
                if (item.id == id) {
                    item.state = state;
                    nodata = 0;
                    break;
                }
            }
            if (nodata == 1) {
                var opt = {};
                opt.id = id;
                opt.state = state;
                self.builddata.push(opt);
            }
        }
        self.notifyGlobal(HomeModel.HOME_SCENE_UPDATE);
    };
    HomeModel.prototype.CG_House_fight_11127 = function (id) {
        var bates = this.getBytes();
        bates.writeLong(this.home_masterID);
        bates.writeLong(id);
        this.sendSocket(11127, bates);
    };
    //请求挑战强盗返回 B:状态:0-成功,1-失败L:怪物唯一的id
    HomeModel.prototype.GC_House_fight_11128 = function (self, data) {
        var ret = data.readByte();
        if (ret == 0) {
            var serverid = data.readLong();
            HomeBattleCtrl.instance.bossid = serverid;
            var npc = GameUnitManager.findUnitByID(serverid);
            HomeBattleCtrl.instance.npcid = npc.cfgID;
            GGlobal.mapscene.enterScene(SceneCtrl.HOME_QD);
            self.showHomeTip = 0;
        }
        else if (ret == 2) {
            self.warn("强盗正在战斗");
        }
        else if (ret == 3) {
            self.warn("没有挑战次数");
        }
        else if (ret == 4) {
            self.warn("已无处理次数");
        }
    };
    HomeModel.prototype.CG_House_fightResult_11129 = function (id, RET) {
        if (RET === void 0) { RET = 0; }
        var bates = this.getBytes();
        bates.writeLong(this.home_masterID);
        bates.writeLong(id);
        bates.writeByte(RET);
        this.sendSocket(11129, bates);
    };
    //通知后端挑战强盗结果返回 L:怪物唯一idB:0输了 1赢了[B:物品类型I:物品idI:物品数量]奖励信息
    HomeModel.prototype.GC_House_fightResult_11130 = function (self, data) {
        var mid = data.readLong();
        var battleResult = data.readByte();
        var awards = [];
        for (var i = 0, len = data.readShort(); i < len; i++) {
            var type = data.readByte();
            var id = data.readInt();
            var count = data.readInt();
            var vo;
            if (type == Enum_Attr.EQUIP) {
                vo = VoEquip.create(id);
            }
            else if (type == Enum_Attr.ITEM) {
                vo = VoItem.create(id);
            }
            else {
                vo = Vo_Currency.create(type);
            }
            vo.count = count;
            awards.push(vo);
        }
        self.notifyGlobal(UIConst.HOME, { "battleResult": battleResult, "awards": awards });
    };
    HomeModel.prototype.CG_House_god_11131 = function () {
        var bates = this.getBytes();
        this.sendSocket(11131, bates);
    };
    //金库数据更新
    HomeModel.prototype.GC_House_god_11132 = function (self, data) {
        self.god_awards = data.readLong();
        self.nextGetMoneyTime = data.readInt() * 1000;
        self.notifyGlobal(HomeModel.HOME_UI_DATA_RE);
    };
    //打开记录
    HomeModel.prototype.CG_House_log_11133 = function (t) {
        var bates = this.getBytes();
        bates.writeByte(t);
        this.sendSocket(11133, bates);
    };
    //打开记录
    HomeModel.prototype.GC_House_log_11134 = function (self, data) {
        var len = data.readShort();
        self.logdata = [];
        for (var i = 0; i < len; i++) {
            self.logdata.push([data.readByte(), data.readUTF(), data.readInt(), data.readInt()]);
        }
        self.notifyGlobal(HomeModel.HOME_UI_DATA_UPDATE);
    };
    //推送次数变化 I:类型:1-抽奖次数,2-事件次数,3-帮助次数I:次数
    HomeModel.prototype.GC_DATA_11136 = function (self, data) {
        var type = data.readInt();
        var count = data.readInt();
        switch (type) {
            case 1:
                self.lucky_count = count;
                break;
            case 2:
                self.remaindEventAward = count;
                break;
            case 3:
                self.helpTime = count;
                break;
        }
        self.notifyGlobal(HomeModel.HOME_UI_MAID_SHOW);
    };
    HomeModel.prototype.sendSocket = function (cmd, ba, isCross) {
        if (isCross === void 0) { isCross = true; }
        if (!this.socket.webSocket.connect) {
            this.warn("中央服未连接成功，请退出后重进府邸");
            return;
        }
        this.socket.sendCMDBytes(cmd, ba, isCross);
    };
    //更新场景NPC数据模型
    HomeModel.HOME_SCENE_UPDATE = "HOME_SCENE_UPDATE";
    //家园内系统UI数据变更统一派发
    HomeModel.HOME_UI_DATA_UPDATE = "HOME_UI_DATA_UPDATE";
    //家园内系统UI数据变更统一派发 UI操作返回
    HomeModel.HOME_UI_DATA_RE = "HOME_UI_DATA_RE";
    //献祭数据
    HomeModel.BAG_UPDATE = "BAG_UPDATE";
    //抽奖返回
    HomeModel.CHOUJIANG_RE = "CHOUJIANG_RE";
    //侍女welcom
    HomeModel.HOME_UI_MAID_SHOW = "home_ui_maid_show";
    //家园内 装饰 类型 默认为初始ID
    HomeModel.MONEY_TREE = 100001; //摇钱树
    HomeModel.TIANGONGLU = 101001; //天工炉
    HomeModel.GOD_HOUSE = 102001; //金库
    HomeModel.NPC_MONEYTREE = 350004;
    HomeModel.NPC_TGL = 350005;
    HomeModel.NPC_JINKU = 350006; //金库
    HomeModel.NPC_PF = 350103; //屏风
    HomeModel.NPC_PF2 = 350106; //屏风2
    HomeModel.NPC_DESK = 350101; //桌子1
    HomeModel.NPC_DESK2 = 350104; //桌子2
    HomeModel.NPC_BAD = 350102; //床
    HomeModel.NPC_BAD2 = 350105; //床2
    HomeModel.HOME_YARD_MAP = 500001; //院子
    HomeModel.HOME_HAIL_MAP = 500002; //客厅
    HomeModel.JIADING = 350301; //家丁
    //0不在家园 1在院子 2在客厅
    HomeModel.inHome = 0;
    return HomeModel;
}(BaseModel));
__reflect(HomeModel.prototype, "HomeModel");
