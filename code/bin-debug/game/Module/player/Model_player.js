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
var Model_player = (function (_super) {
    __extends(Model_player, _super);
    function Model_player() {
        var _this = _super.call(this) || this;
        _this.playerDetailDic = {};
        /**CMD120协议 玩家属性更新*/
        _this.numToServ = {
            "103": "att", "104": "def", "105": "crit", "106": "resCrit", "107": "hit", "108": "dodge",
            "109": "realDmg", "110": "critRate", "111": "resCritRate", "112": "hitRate", "113": "dodgeRate",
            "114": "critDmgAdd", "115": "critDmgReduce", "116": "dmgAdd", "117": "dmgReduce", "118": "flameDmg",
            "119": "frozenDmg", "120": "venomDmg", "121": "electricDmg", "122": "blastDmg", "123": "flameRes",
            "124": "frozenRes", "125": "venomRes", "126": "electricRes", "127": "blastRes"
        };
        /**CMD120协议 玩家属性更新*/
        _this.mapKeyToServ = {
            "att": "att", "pDef": "def", "critical": "crit", "resCrit": "resCrit", "hit": "hit", "evade": "dodge",
            "damage": "realDmg", "critRate": "critRate", "resCritRate": "resCritRate", "hitRate": "hitRate", "evadeRate": "dodgeRate",
            "critDmgAdd": "critDmgAdd", "critDmgDerate": "critDmgReduce", "dmgAdd": "dmgAdd", "dmgDerate": "dmgReduce", "fireDmg": "flameDmg",
            "frozenDmg": "frozenDmg", "poisonDmg": "venomDmg", "electricDmg": "electricDmg", "boomDmg": "blastDmg", "fireRes": "flameRes",
            "frozenRes": "frozenRes", "poisonRes": "venomRes", "electricRes": "electricRes", "boomRes": "blastRes",
        };
        return _this;
    }
    /**
     * 简单对比名字
    */
    Model_player.isMine = function (nm) {
        if (!Model_player.voMine)
            return false;
        var name = Model_player.voMine.name;
        if (name.split(".S")[0] == nm.split(".S")[0]) {
            return true;
        }
        return false;
    };
    Model_player.getBodyOrWeaponID = function (v) {
        var body;
        if (v && Config.sz_739[v] && Config.sz_739[v].moxing != v) {
            body = Config.sz_739[v].moxing;
        }
        else {
            body = v;
        }
        return body;
    };
    Model_player.getCurrencyCount = function (type) {
        switch (type) {
            case Enum_Attr.yuanBao:
                return Model_player.voMine.yuanbao;
            case Enum_Attr.TONGBI:
                return Model_player.voMine.tongbi;
            case Enum_Attr.PRESTIGE:
                return Model_player.voMine.prestige;
            case Enum_Attr.GONGXUN:
                return Model_player.voMine.gongxun;
            case Enum_Attr.XINGHUN:
                return Model_player.voMine.xinghun;
            case Enum_Attr.HUNHUO:
                return Model_player.voMine.hunhuo;
            case 22:
                return Model_player.voMine.homeMoney;
        }
        return -1;
    };
    Model_player.prototype.removePlayer = function (id) {
        if (this.playerDetailDic[id]) {
            delete this.playerDetailDic[id];
        }
    };
    Model_player.prototype.getPlayerVo = function (pId) {
        return this.playerDetailDic[pId];
    };
    Model_player.isMineID = function (id) {
        if (this.voMine && this.voMine.id == id) {
            return true;
        }
        return false;
    };
    Model_player.skillCDUpdate = function (ctx) {
        var vomine = Model_player.voMine;
        if (!vomine)
            return;
        //宝物技能1 
        var bwcd1 = vomine.skillcdList[0];
        var newcd = App.isLife ? bwcd1 - ctx.dt : bwcd1;
        if (newcd < 0) {
            newcd = 0;
        }
        vomine.skillcdList[0] = newcd;
        //宝物技能2 
        var bwcd2 = vomine.skillcdList[1];
        newcd = App.isLife ? bwcd2 - ctx.dt : bwcd2;
        if (newcd < 0) {
            newcd = 0;
        }
        vomine.skillcdList[1] = newcd;
        //天书技能
        var bwcd3 = vomine.skillcdList[2];
        newcd = App.isLife ? bwcd3 - ctx.dt : bwcd3;
        if (newcd < 0) {
            newcd = 0;
        }
        vomine.skillcdList[2] = newcd;
        //buffCD
        for (var key in vomine.buffCDData) {
            var buffCD = vomine.buffCDData[key];
            var buffNewcd = App.isLife ? buffCD - ctx.dt : buffCD;
            if (buffNewcd < 0) {
                buffNewcd = 0;
            }
            vomine.buffCDData[key] = buffNewcd;
        }
        if (App.isLife && vomine.qcRage < ~~(Config.changshu_101[75].num / 100)) {
            vomine.qcTime += ctx.dt;
            //奇策曝气值
            vomine.qcRage = Math.floor(vomine.qcTime / 1000) * ~~(Config.changshu_101[76].num / 100);
            GGlobal.control.notify(Enum_MsgType.ROLE_QICE_RAGE);
        }
    };
    /**113	转生提升*/
    Model_player.prototype.CGRebornUp = function () {
        var ba = this.getBytes();
        this.sendSocket(113, ba);
    };
    /**2551 CG 获取任务奖励 I:任务编号  */
    Model_player.prototype.CG_SCENETASK_DRAWREWARD = function (taskId) {
        var ba = new BaseBytes();
        ba.writeInt(taskId);
        this.sendSocket(2551, ba);
    };
    /**2553	I CG 特殊任务 I:特殊任务参数  */
    Model_player.prototype.CG_SCENETASK_SUBMISSION = function (can2) {
        var ba = new BaseBytes();
        ba.writeInt(can2);
        this.sendSocket(2553, ba);
    };
    Model_player.prototype.listenServ = function (mgr) {
        var self = this;
        self.socket = mgr;
        mgr.regHand(108, self.scPlayerDetail, self);
        mgr.regHand(110, self.scHeroList, self);
        mgr.regHand(114, self.scRebornUp, self);
        mgr.regHand(120, self.scHeroAttrUpdate, self);
        mgr.regHand(130, self.onPRolesDetail, self);
        mgr.regHand(2550, self.GC_GET_SCENETASK, self);
        mgr.regHand(2552, self.GC_SCENETASK_DRAWREWARD, self);
    };
    /**2552 GC 任务领取奖励 B:0成功 1失败I:当前任务编号B:任务状态012I:任务参数  */
    Model_player.prototype.GC_SCENETASK_DRAWREWARD = function (self, data) {
        var res = data.readByte();
        if (res == 0) {
            var taskId = data.readInt();
            Model_player.taskSt = data.readByte();
            Model_player.taskData = data.readInt();
            ViewMainUIBottomUI1.instance.showEff();
            Model_player.taskId = taskId;
            if ((Model_player.taskId <= Config.xtcs_004[2801].num || Model_player.taskId >= Config.xtcs_004[2806].num)) {
                if (Model_player.taskSt == 0) {
                    var type = Config.mission_243[Model_player.taskId].type;
                    GuideCtrl.getGuideStepArr(Model_player.taskId, type);
                }
                else {
                    GuideStepManager.instance.checkArrowTarget();
                }
            }
            else {
                GuideStepManager.instance.releaseArrow();
            }
            GGlobal.control.notify(Enum_MsgType.SCENE_TASK);
        }
    };
    /**2550 GC 当前任务状态 I:任务idB:任务状态0未完成1完成可领2完成已领I:参数2  */
    Model_player.prototype.GC_GET_SCENETASK = function (self, data) {
        var taskId = data.readInt();
        var isFirst = Model_player.taskId == 0;
        Model_player.taskId = taskId;
        Model_player.taskSt = data.readByte();
        Model_player.taskData = data.readInt();
        if ((taskId <= Config.xtcs_004[2801].num || taskId >= Config.xtcs_004[2806].num) && isFirst) {
            var type = Config.mission_243[taskId].type;
            GuideCtrl.getGuideStepArr(taskId, type);
        }
        GGlobal.control.notify(Enum_MsgType.SCENE_TASK);
    };
    /** 战斗玩家的属性数据*/
    Model_player.prototype.onPRolesDetail = function (self, ba) {
        var id = ba.readLong();
        var pname = ba.readUTF();
        var jiangxian = ba.readInt();
        var country = ba.readInt();
        var title = ba.readInt();
        var shouHun = ba.readInt();
        var vo;
        if (self.playerDetailDic[id]) {
            vo = self.playerDetailDic[id];
        }
        else {
            vo = new Vo_Player();
        }
        vo.id = id;
        vo.name = pname;
        vo.jiangXian = jiangxian;
        vo.country = country;
        vo.title = title;
        vo.shouHun = shouHun;
        vo.parseOtherRole2(ba);
        var len = ba.readShort();
        var arr = [];
        for (var i = 0; i < len; i++) {
            arr.push(ba.readInt());
        }
        vo.bwID1 = arr[0] > 0 ? Config.bao_214[arr[0]].skill : 0;
        vo.bwStar1 = arr[1] ? arr[1] : 0;
        vo.bwID2 = arr[2] > 0 ? Config.bao_214[arr[2]].skill : 0;
        vo.bwStar2 = arr[3] ? arr[3] : 0;
        vo.tsID = arr[4] > 0 ? Config.book_215[arr[4]].skill : 0;
        vo.tsStar = arr[5] ? arr[5] : 0;
        vo.star = arr[6] ? arr[6] : 0;
        vo.setGodWeapon(arr[7] ? arr[7] : 0);
        var godWeaponPer = arr[8] ? arr[8] : 0;
        vo.shaozhuID = ba.readByte(); //少主id
        vo.shaozhuFashion = ba.readInt(); //少主时装
        vo.shaozhuStar = ba.readInt(); //少主星级
        vo.shaozhuSkillLv = ba.readInt(); //少主主动技能等级
        for (var j = 0; j < vo.skillList.length; j++) {
            var vo1 = vo.skillList[j];
            vo1.starLv = vo.star;
            if (vo1.type == Model_Skill.TYPE3) {
                vo1.godWeaponPer = godWeaponPer;
            }
            vo1.updatePower();
        }
        // if (!Model_player.isMineID(id)) {
        self.playerDetailDic[id] = vo;
        // }
        GGlobal.control.notify(Enum_MsgType.MSG_ADDROLEDETAIL, vo);
    };
    /**接收 CMD 108协议 */
    Model_player.prototype.scPlayerDetail = function (self, bytes) {
        var voPlayer = new Vo_Player();
        voPlayer.parseDetail(bytes);
        Model_player.voMine = voPlayer;
        HLSDK.roleupdate();
        self.notify("update");
        ModelLogin.initTSMsg();
    };
    /**接收 CMD 110协议 */
    Model_player.prototype.scHeroList = function (self, bytes) {
        var voPlayer = Model_player.voMine;
        voPlayer.parseRole(bytes);
        self.notify("heroListUpdate");
        GGlobal.control.notify(Enum_MsgType.GODSKILL_UPDATE);
    };
    /**接收 CMD 110协议 */
    Model_player.prototype.scRebornUp = function (self, bytes) {
        var result = bytes.readByte();
        if (result == 0) {
            var voPlayer = Model_player.voMine;
            voPlayer.zsID = bytes.readShort();
            GGlobal.control.notify(Enum_MsgType.REBIRTH_UPDATE);
        }
        else {
            ViewCommonWarn.text("转生失败");
        }
    };
    /**CMD120协议 玩家属性更新*/
    Model_player.prototype.scHeroAttrUpdate = function (self, bytes) {
        var jsonstr = bytes.readUTF();
        var content = JSON.parse(jsonstr);
        var isImportChange = 0;
        var vomine = Model_player.voMine;
        if (!vomine)
            return;
        var key;
        for (var k in content) {
            switch (k) {
                case "yuanbao"://元宝
                    vomine.yuanbao = content[k];
                    self.notify(Model_player.YUANBAO_UPDATE);
                    break;
                case "hoodlepoint"://弹珠积分
                    GGlobal.modelSuperMarbles.score = content[k];
                    self.notifyGlobal(UIConst.ACTCOMCJDZ_SHOP);
                    return;
                case "tongbi"://铜币
                    vomine.tongbi = content[k];
                    self.notify(Model_player.TONGBI_UPDATE);
                    break;
                case "lv":
                    if (vomine.level != content[k]) {
                        vomine.level = content[k];
                        isImportChange |= 1;
                        if (vomine.level > vomine.maxLv) {
                            vomine.maxLv = vomine.level;
                        }
                    }
                    if (Model_LunHui.realLv <= 5 && HLSDK.whalePbSDK) {
                        HLSDK.roleupdate();
                    }
                    break;
                case "rebornlv":
                    if (vomine.zsID != content[k]) {
                        vomine.zsID = content[k];
                        self.notify(Model_player.ZHUANSHENG_UPDATE);
                    }
                    break;
                case "zhangong"://战功
                    vomine.gongxun = content[k];
                    self.notify(Model_player.GONGXUN);
                    break;
                case "prestige"://声望
                    vomine.prestige = content[k];
                case "zhenhun"://阵魂
                    break;
                case "soulfire"://魂火
                    vomine.hunhuo = content[k];
                    self.notify(Model_player.HUNHUO_UPDATE);
                    break;
                case "starsoul"://星魂
                    vomine.xinghun = content[k];
                    self.notify(Model_player.XINGHUN_UPDATE);
                    break;
                case "str"://战力
                    if (vomine[k] == content[k])
                        return;
                    if (vomine[k] < content[k])
                        ViewStrUp.show(content[k]); //减战斗力不做表现
                    vomine[k] = content[k];
                    isImportChange |= 2;
                    self.notify(Model_player.MSG_ZHANLI);
                    break;
                case "exp"://经验
                    vomine.exp = content[k];
                    isImportChange |= 8;
                    break;
                case "expAdd"://经验加成
                    vomine.expAdd = content[k];
                    isImportChange |= 16;
                    break;
                case "fuwen":
                    vomine.fuwen = content[k];
                    self.notify(Model_player.FUWEN_UPDATE);
                    break;
                case "bossjf":
                    vomine.bossZCScore = content[k];
                    self.notify(Model_player.BOSSZCSCORE);
                    break;
                case "prosperity"://府邸繁荣度
                    GGlobal.homemodel.home_exp = content[k];
                    self.notifyGlobal(HomeModel.HOME_UI_DATA_UPDATE);
                    break;
                case "housecoin"://府邸币
                    vomine.homeMoney = content[k];
                    self.notifyGlobal(HomeModel.HOME_UI_DATA_UPDATE);
                    break;
                case "housejifen"://天工炉积分
                    GGlobal.homemodel.score = content[k];
                    self.notifyGlobal(HomeModel.HOME_UI_DATA_UPDATE);
                    break;
                case "sixwayyinji":
                    vomine.yinji = content[k];
                    self.notify(Model_player.YINJI_UPDATE);
                    break;
                default:
                    key = k;
                    if (Enum_Attr.roleAttributes[Number(k)])
                        key = Enum_Attr.roleAttributes[Number(k)];
                    vomine[key] = content[k];
                    var obj = Enum_Attr.roleAttribute;
                    if (obj[key])
                        vomine[key] = content[k] / 100000;
                    isImportChange |= 4;
                    break;
            }
        }
        if (isImportChange) {
            self.notify(Model_player.MSG_UPDATE);
        }
        if (isImportChange & 1) {
            self.notify(Model_player.MSG_HERO_LEVEL);
        }
        if (isImportChange & 8) {
            self.notify(Model_player.EXP_UPDATE);
        }
        if (isImportChange & 16) {
            self.notify(Model_player.EXPADD_UPDATE);
        }
    };
    /** 英雄属性更新 */
    Model_player.MSG_HEROLISTUD = "heroListUpdate";
    /** 主角属性更新 元宝 铜币 等 */
    Model_player.MSG_UPDATE = "update";
    /** 英雄属性更新 */
    Model_player.MSG_HEROUPDATE = "heroUpdate";
    /**玩家等级更新 */
    Model_player.MSG_HERO_LEVEL = "heroLevel";
    /**战力更新 */
    Model_player.MSG_ZHANLI = "MSG_ZHANLI";
    /**魂火更新 */
    Model_player.HUNHUO_UPDATE = "10";
    /**星魂更新 */
    Model_player.XINGHUN_UPDATE = "9";
    /**铜币更新 */
    Model_player.TONGBI_UPDATE = "3";
    /**元宝更新 */
    Model_player.YUANBAO_UPDATE = "4";
    /**经验 */
    Model_player.EXP_UPDATE = 6;
    /**经验加成*/
    Model_player.EXPADD_UPDATE = "EXPADD_UPDATE";
    /**转生等级更新 */
    Model_player.ZHUANSHENG_UPDATE = "1001";
    Model_player.GONGXUN = "5";
    /**符文更新 */
    Model_player.FUWEN_UPDATE = "14";
    Model_player.BOSSZCSCORE = "15";
    /**六道印记更新 */
    Model_player.YINJI_UPDATE = "16";
    Model_player.autoSkill = false;
    Model_player.taskId = 0;
    Model_player.taskSt = 0;
    Model_player.taskData = 0;
    return Model_player;
}(BaseModel));
__reflect(Model_player.prototype, "Model_player");
