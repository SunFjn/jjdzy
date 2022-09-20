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
var Model_WuJiang = (function (_super) {
    __extends(Model_WuJiang, _super);
    function Model_WuJiang() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //计算星级
        _this.calculationQuilityStar = function () {
            var config = Config.hero_211;
            var arr = Model_WuJiang.wuJiangStar;
            var star = 0;
            var temp = {};
            for (var i in arr) {
                var cfg = config[i];
                if (!temp[cfg.pinzhi]) {
                    temp[cfg.pinzhi] = 0;
                }
                temp[cfg.pinzhi] += arr[i];
            }
            Model_WuJiang._starMap = temp;
        };
        _this.isJH = 0;
        return _this;
        // private sortWuJiang(): void {
        // 	var arr1 = [];//正在展示
        // 	var arr2 = [];//已激活
        // 	var arr3 = [];//可激活
        // 	var arr4 = [];//未激活
        // 	for (let i = 0; i < Model_WuJiang.wuJiangArr.length; i++) {
        // 		let v = Model_WuJiang.wuJiangArr[i]
        // 		if (v.type == Model_player.voMine.job) {
        // 			arr1.push(v);
        // 			continue;
        // 		}
        // 		let star = Model_WuJiang.wuJiangStar[v.type]
        // 		if (star) {
        // 			arr2.push(v);
        // 			continue;
        // 		}
        // 		let can = Model_WuJiang.checkStarVo(v);
        // 		if (can) {
        // 			arr3.push(v);
        // 			continue;
        // 		}
        // 		arr4.push(v);
        // 	}
        // 	arr2.sort(Model_WuJiang.sortWuJiang)
        // 	arr3.sort(Model_WuJiang.sortWuJiang)
        // 	arr4.sort(Model_WuJiang.sortWuJiang)
        // 	//this._showArr = arr1.concat(arr2).concat(arr3).concat(arr4)
        // }
    }
    Model_WuJiang.getWuJiangStarByJob = function (job) {
        if (job === void 0) { job = 0; }
        if (Model_WuJiang.isGodWuJiang(job)) {
            return ModelGodWuJiang.wuJiangStar(job);
        }
        else {
            return Model_WuJiang.wuJiangStar[job];
        }
    };
    Object.defineProperty(Model_WuJiang, "wuJiangArr", {
        get: function () {
            if (Model_WuJiang._wuJiangArr == null) {
                Model_WuJiang.initWuJiang();
            }
            return Model_WuJiang._wuJiangArr;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Model_WuJiang, "newWuJiang", {
        get: function () {
            if (Model_WuJiang._newWuJiang == null) {
                Model_WuJiang.initWuJiang();
            }
            return Model_WuJiang._newWuJiang;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Model_WuJiang, "PuTongWujiang", {
        get: function () {
            if (Model_WuJiang._PuTongWujiang == null) {
                Model_WuJiang.initWuJiang();
            }
            return Model_WuJiang._PuTongWujiang;
        },
        enumerable: true,
        configurable: true
    });
    Model_WuJiang.initWuJiang = function () {
        Model_WuJiang._wuJiangArr = [];
        Model_WuJiang._PuTongWujiang = [];
        Model_WuJiang._newWuJiang = {};
        for (var keys in Config.hero_211) {
            var v = Config.hero_211[keys];
            Model_WuJiang._wuJiangArr.push(v);
            if (v.pinzhi < 8) {
                Model_WuJiang._PuTongWujiang.push(v);
            }
            var act = ConfigHelp.SplitStr(v.activation);
            Model_WuJiang._newWuJiang[act[0][1]] = v;
        }
    };
    Model_WuJiang.getQuilityTotalStar = function (quility) {
        if (Model_WuJiang._starMap[quility]) {
            return Model_WuJiang._starMap[quility];
        }
        return 0;
    };
    //武将或者神将是否激活
    Model_WuJiang.isActivation = function (type) {
        if (Model_WuJiang.wuJiangStar[type]) {
            return 1;
        }
        if (GGlobal.modelGodWuJiang.data[type]) {
            return 1;
        }
        return 0;
    };
    //是否是神将
    Model_WuJiang.isGodWuJiang = function (type) {
        return Config.hero_211[type].godhero == 1;
    };
    Model_WuJiang.prototype.isMaxLevelSZ = function (id) {
        var dic = Model_WuJiang.itemShiZhuang;
        if (dic[id]) {
            return dic[id].star < dic[id].maxStar;
        }
        return true;
    };
    Object.defineProperty(Model_WuJiang, "OPEN_GUAN", {
        get: function () {
            if (Model_WuJiang._OPEN_GUAN == null) {
                Model_WuJiang._OPEN_GUAN = [];
                var str = ConfigHelp.getSystemDesc(2901);
                var arr = ConfigHelp.SplitStr(str);
                for (var i = 0; i < arr.length; i++) {
                    Model_WuJiang._OPEN_GUAN.push(Number(arr[i][1]));
                }
            }
            return Model_WuJiang._OPEN_GUAN;
        },
        enumerable: true,
        configurable: true
    });
    /**651 CG 获取武将信息 */
    Model_WuJiang.prototype.CGGetWuJiang = function () {
        var bates = this.getBytes();
        this.sendSocket(651, bates);
    };
    /**653	 CG 武将升阶 B:升阶方式0普通 1一键 */
    Model_WuJiang.prototype.CGUpWuJie = function (type) {
        var bates = this.getBytes();
        bates.writeByte(type);
        this.sendSocket(653, bates);
    };
    /**655	 CG 激活/升级技能 B:位置id 12345 */
    Model_WuJiang.prototype.CGJihuoSkill = function (pos) {
        var bates = this.getBytes();
        bates.writeByte(pos);
        this.sendSocket(655, bates);
    };
    /**659 CG 武将激活 B:武将编号 */
    Model_WuJiang.prototype.CGJihuowj = function (id) {
        var bates = this.getBytes();
        bates.writeByte(id);
        this.sendSocket(659, bates);
    };
    /**661 CG 升星武将 B:武将编号 */
    Model_WuJiang.prototype.CGUpWJStar = function (id) {
        var bates = this.getBytes();
        bates.writeByte(id);
        this.sendSocket(661, bates);
    };
    /**663 CG 使用武将丹药 B:0培养丹 1资质丹B:使用方式0 1颗 1一键 */
    Model_WuJiang.prototype.CGUseDan = function (type_dan, type) {
        var bates = this.getBytes();
        bates.writeByte(type_dan);
        bates.writeByte(type);
        this.sendSocket(663, bates);
    };
    /**665 CG 一键穿将印 */
    Model_WuJiang.prototype.CGWearWJEQ = function () {
        var bates = this.getBytes();
        this.sendSocket(665, bates);
    };
    /**667 CG 合成将印 B:位置*/
    Model_WuJiang.prototype.CGHechengJY = function (pos) {
        var bates = this.getBytes();
        bates.writeByte(pos);
        this.sendSocket(667, bates);
    };
    /**669 CG 升级某部位将印 B:将印位置 */
    Model_WuJiang.prototype.CGUpJY = function (pos) {
        var bates = this.getBytes();
        bates.writeByte(pos);
        this.sendSocket(669, bates);
    };
    /**671 CG 分解将印 L:装备唯一id */
    Model_WuJiang.prototype.CGDecompose = function (sid) {
        var bates = this.getBytes();
        bates.writeLong(sid);
        this.sendSocket(671, bates);
    };
    /**673 CG 切换出战武将 B:武将type */
    Model_WuJiang.prototype.CGChangeJob = function (type) {
        var bates = this.getBytes();
        bates.writeByte(type);
        this.sendSocket(673, bates);
    };
    /**升级神将之力 */
    Model_WuJiang.prototype.CGGetGodPower = function (id) {
        var bates = this.getBytes();
        bates.writeInt(id);
        this.sendSocket(675, bates);
    };
    /**685 CG 神将之力技能进阶 I:武将id */
    Model_WuJiang.prototype.CG_GENERAL_SKILLUP = function (id) {
        var bates = this.getBytes();
        bates.writeInt(id);
        this.sendSocket(685, bates);
    };
    //协议处理
    Model_WuJiang.prototype.listenServ = function (mgr) {
        this.socket = mgr;
        mgr.regHand(652, this.GCWuJiangSate, this);
        mgr.regHand(654, this.GCUpWuJie, this);
        mgr.regHand(656, this.GCJihuoSkill, this);
        mgr.regHand(660, this.GCJihuowj, this);
        mgr.regHand(662, this.GCUpWJStar, this);
        mgr.regHand(664, this.GCUseDan, this);
        mgr.regHand(666, this.GCWearWJEQ, this);
        mgr.regHand(668, this.GCHechengJY, this);
        mgr.regHand(670, this.GCUpJY, this);
        mgr.regHand(672, this.GCDecompose, this);
        mgr.regHand(674, this.GCChangeJob, this);
        mgr.regHand(676, this.GCGetGodPower, this);
        mgr.regHand(686, this.GC_GENERAL_SKILLUP, this);
        mgr.regHand(3502, this.GC3502, this);
        mgr.regHand(3504, this.GC3504, this);
        mgr.regHand(3506, this.GC3506, this);
        mgr.regHand(3510, this.GC3510, this);
        // mgr.regHand(3508, this.GC3508, this);
    };
    //652 GC 武将状态 [I:武将typeI:武将星级I:神将之力星级I:神将之力技能进阶]I:武将阶数I:经验[I:技能等级0表示未激活]I:培养丹数量I:资质丹数量
    Model_WuJiang.prototype.GCWuJiangSate = function (self, data) {
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var type = data.readInt();
            var star = data.readInt();
            var godPower = data.readInt();
            var skillLv = data.readInt();
            Model_WuJiang.wuJiangStar[type] = star;
            Model_WuJiang.wujiangGodPower[type] = godPower == undefined ? 0 : godPower;
            Model_WuJiang.shenjiangzhiliSkillLv[type] = skillLv;
            if (star && star > 0) {
                GGlobal.reddot.setCondition(UIConst.WUJIANGZHILI, type, self.getWujiangzhiliNotice(type, godPower, star)); //星级比神力的数值要大的时候，说明有红点
                GGlobal.reddot.setCondition(UIConst.WUJIANGZHILI_SKILL, type, self.getWujiangzhiliSkillNotice(type, godPower, skillLv));
            }
            else {
                GGlobal.reddot.setCondition(UIConst.WUJIANGZHILI, type, false);
                GGlobal.reddot.setCondition(UIConst.WUJIANGZHILI_SKILL, type, false);
            }
            if (type == Model_player.voMine.job) {
                var skillList = Model_player.voMine.skillList;
                var godskillCfg = Config.herogodskill_211[type * 100 + skillLv];
                for (var j = 0; j < skillList.length; j++) {
                    var skillVo = skillList[j];
                    var damage = 0;
                    if (skillVo.type == 2 && godskillCfg) {
                        var arr = JSON.parse(godskillCfg.attpg);
                        var len_1 = arr.length;
                        for (var n = 0; n < len_1; n++) {
                            if (arr[n][0] == skillVo.id) {
                                damage = arr[n][1];
                                break;
                            }
                        }
                    }
                    skillVo.starLv = star;
                    skillVo.skillPer = damage;
                    skillVo.updatePower();
                }
            }
        }
        Model_WuJiang.jieShu = data.readInt();
        Model_WuJiang.exp = data.readInt();
        len = data.readShort();
        Model_WuJiang.skillArr = [];
        for (var i = 0; i < len; i++) {
            Model_WuJiang.skillArr.push(data.readInt());
        }
        Model_WuJiang.danShuxing = data.readInt();
        self.calculationQuilityStar();
        var danZizhi = data.readInt();
        GGlobal.control.notify(Enum_MsgType.WUJIANG_OPENUI_UPDATE);
        GGlobal.control.notify(Enum_MsgType.WUJIANG_CHECK_NOTICE);
        // self.askForSZInfo(); 
        Model_player.voMine.updateSkill();
    };
    /**获取神将之力的红点状态 */
    Model_WuJiang.prototype.getWujiangzhiliNotice = function (id, godPower, star) {
        if (godPower >= Config.hero_211[id].max) {
            return false;
        }
        var index = id * 100 + (godPower == 0 ? 1 : godPower);
        var temp;
        if (godPower > 0) {
            temp = this.getNextData(index);
        }
        else {
            temp = Config.herogod_211[index];
        }
        if (temp) {
            return star >= temp.star;
        }
        return false;
    };
    Model_WuJiang.prototype.getNextData = function (heroId) {
        var isGet = false;
        var tempData = Config.herogod_211;
        for (var key in tempData) {
            if (isGet) {
                return tempData[key];
            }
            if (heroId == tempData[key].id) {
                isGet = true;
            }
        }
        return null;
    };
    /**
     * 获取神将之力技能进阶的红点状态
     * */
    Model_WuJiang.prototype.getWujiangzhiliSkillNotice = function (id, godPower, skillLv) {
        if (godPower <= 0) {
            return false;
        }
        var cfgId = id * 100 + skillLv;
        var curCfg = Config.herogodskill_211[cfgId];
        var nextCfg = Config.herogodskill_211[cfgId + 1];
        if (nextCfg) {
            var costArr = JSON.parse(nextCfg.consume);
            var count = Model_Bag.getItemCount(costArr[0][1]);
            if (count >= costArr[0][2] && godPower >= nextCfg.star) {
                return true;
            }
        }
        return false;
    };
    //654 GC 升阶返回 B:1成功 0失败I:等阶I:经验
    Model_WuJiang.prototype.GCUpWuJie = function (self, data) {
        var result = data.readByte();
        VZhiShengDan.invalNum = 2;
        if (result == 1) {
            Model_WuJiang.jieShu = data.readInt();
            Model_WuJiang.exp = data.readInt();
            GGlobal.control.notify(Enum_MsgType.WUJIANG_UPJIE_UPDATE);
            GGlobal.control.notify(Enum_MsgType.WUJIANG_CHECK_NOTICE);
        }
        else {
            ViewCommonWarn.text("升阶失败");
        }
    };
    //656 GC 激活/升级技能返回 B:1成功 0失败B:位置I:技能id
    Model_WuJiang.prototype.GCJihuoSkill = function (self, data) {
        var result = data.readByte();
        if (result == 1) {
            var pos = data.readByte();
            var id = data.readInt();
            Model_WuJiang.skillArr[pos - 1] = id;
            GGlobal.control.notify(Enum_MsgType.WUJIANG_UP_SKILL, [Model_BySys.WU_JIANG, id]);
            GGlobal.control.notify(Enum_MsgType.WUJIANG_CHECK_NOTICE);
        }
        else {
            ViewCommonWarn.text("升级技能失败");
        }
    };
    //660 GC 激活武将 B:1成功 0失败B:武将编号
    Model_WuJiang.prototype.GCJihuowj = function (self, data) {
        var result = data.readByte();
        if (result == 1) {
            var type = data.readByte();
            var star = 1;
            Model_WuJiang.wuJiangStar[type] = star;
            Model_WuJiang.wujiangGodPower[type] = 0;
            Model_WuJiang.shenjiangzhiliSkillLv[type] = 0;
            self.calculationQuilityStar();
            GGlobal.reddot.setCondition(UIConst.WUJIANGZHILI, type, self.getWujiangzhiliNotice(type, Model_WuJiang.wujiangGodPower[type], star));
            GGlobal.reddot.setCondition(UIConst.WUJIANGZHILI_SKILL, type, self.getWujiangzhiliSkillNotice(type, Model_WuJiang.wujiangGodPower[type], Model_WuJiang.shenjiangzhiliSkillLv[type]));
            GGlobal.control.notify(Enum_MsgType.WUJIANG_UP_STAR);
            GGlobal.control.notify(Enum_MsgType.WUJIANG_CHECK_NOTICE);
        }
        else {
            ViewCommonWarn.text("激活武将失败");
        }
    };
    //662 GC 升星武将返回 B:升星结果1成功 0失败B:武将类型I:武将星级 
    Model_WuJiang.prototype.GCUpWJStar = function (self, data) {
        var result = data.readByte();
        if (result == 1) {
            var type = data.readByte();
            var star = data.readInt();
            Model_WuJiang.wuJiangStar[type] = star;
            for (var i = 0; i < Model_WuJiang.wuJiangArr.length; i++) {
                if (Model_WuJiang.wuJiangArr[i].type == type) {
                    if (star >= Model_WuJiang.wuJiangArr[i].star) {
                        GGlobal.control.notify(UIConst.JUEXING);
                    }
                    break;
                }
            }
            GGlobal.reddot.setCondition(UIConst.WUJIANGZHILI, type, self.getWujiangzhiliNotice(type, Model_WuJiang.wujiangGodPower[type], star));
            if (type == Model_player.voMine.job) {
                for (var i = 0; i < Model_player.voMine.skillList.length; i++) {
                    Model_player.voMine.skillList[i].starLv = star;
                    Model_player.voMine.skillList[i].updatePower();
                }
            }
            self.calculationQuilityStar();
            GGlobal.control.notify(Enum_MsgType.WUJIANG_UP_STAR);
            GGlobal.control.notify(Enum_MsgType.WUJIANG_CHECK_NOTICE);
        }
        else {
            ViewCommonWarn.text("升星武将失败");
        }
    };
    //664 GC 使用武将丹药返回 B:1成功 0失败I:武将培养丹I:武将资质丹
    Model_WuJiang.prototype.GCUseDan = function (self, data) {
        var result = data.readByte();
        if (result == 1) {
            Model_WuJiang.danShuxing = data.readInt();
            var danZizhi = data.readInt();
            GGlobal.control.notify(Enum_MsgType.WUJIANG_USE_DAN);
            GGlobal.control.notify(Enum_MsgType.WUJIANG_CHECK_NOTICE);
        }
        else {
            ViewCommonWarn.text("使用武将丹药失败");
        }
    };
    //666 GC 穿戴将印结果 B:0成功 1失败[L:装备唯一idB:部位I:装备id]
    Model_WuJiang.prototype.GCWearWJEQ = function (self, data) {
        var result = data.readByte();
        if (result == 0) {
            var len = data.readShort();
            for (var i = 0; i < len; i++) {
                var sid = data.readLong();
                var id = data.readInt();
                var pos = data.readByte();
                var role = Model_player.voMine;
                var vo = VoEquip.create(id);
                vo.sid = sid;
                vo.ownPos = pos;
                role.equipData[pos] = vo;
            }
            GGlobal.control.notify(Enum_MsgType.MSG_ROLE_EQUIP_UPDATE);
            GGlobal.control.notify(Enum_MsgType.WUJIANG_CHECK_NOTICE);
        }
        else {
            ViewCommonWarn.text(" 穿戴将印失败");
        }
    };
    //668 GC 合成将印返回 B:0成功，1等级不足，2材料不足，3合成评分低，4装备不能脱下B:位置L:装备唯一idI:将印id
    Model_WuJiang.prototype.GCHechengJY = function (self, data) {
        var result = data.readByte();
        if (result == 0) {
            var pos = data.readByte();
            var sid = data.readLong();
            var id = data.readInt();
            var role = Model_player.voMine;
            var vo = VoEquip.create(id);
            vo.sid = sid;
            vo.ownPos = pos;
            role.equipData[pos] = vo;
            GGlobal.control.notify(Enum_MsgType.MSG_ROLE_EQUIP_UPDATE);
            GGlobal.control.notify(Enum_MsgType.WUJIANG_CHECK_NOTICE);
        }
        else if (result == 1) {
            ViewCommonWarn.text("等级不足");
        }
        else if (result == 2) {
            View_CaiLiao_GetPanel.show(VoItem.create(Model_WuJiang.JIANG_YIN));
        }
        else if (result == 3) {
            ViewCommonWarn.text("合成评分低");
        }
        else if (result == 4) {
            ViewCommonWarn.text("装备不能脱下");
        }
    };
    //670 GC 升级将印返回 B:0成功，1等级不足，2材料不足，3合成评分低，4装备不能脱下B:部位L:装备唯一idI:装备id
    Model_WuJiang.prototype.GCUpJY = function (self, data) {
        var result = data.readByte();
        if (result == 0) {
            var pos = data.readByte();
            var sid = data.readLong();
            var id = data.readInt();
            var role = Model_player.voMine;
            var vo = VoEquip.create(id);
            vo.sid = sid;
            vo.ownPos = pos;
            role.equipData[pos] = vo;
            GGlobal.control.notify(Enum_MsgType.MSG_ROLE_EQUIP_UPDATE);
            GGlobal.control.notify(Enum_MsgType.WUJIANG_CHECK_NOTICE);
        }
        else if (result == 1) {
            ViewCommonWarn.text("等级不足");
        }
        else if (result == 2) {
            View_CaiLiao_GetPanel.show(VoItem.create(Model_WuJiang.JIANG_YIN));
        }
        else if (result == 3) {
            ViewCommonWarn.text("合成评分低");
        }
        else if (result == 4) {
            ViewCommonWarn.text("装备不能脱下");
        }
        else if (result == 5) {
            ViewCommonWarn.text("装备已到最高阶");
        }
        else {
            ViewCommonWarn.text("升阶将印失败");
        }
    };
    //672 GC 分解将印 B:0成功 1失败L:装备唯一id
    Model_WuJiang.prototype.GCDecompose = function (self, data) {
        var result = data.readByte();
        if (result == 0) {
            var sid = data.readLong();
            Model_RongLian.fenjiePrompt(sid);
            GGlobal.control.notify(Enum_MsgType.WUJIANG_DECOMPOSE);
            GGlobal.control.notify(Enum_MsgType.WUJIANG_CHECK_NOTICE);
            GGlobal.control.notify(Enum_MsgType.MSG_BAG_DECOMPOSE_RED);
        }
        else {
            ViewCommonWarn.text("分解将印失败");
        }
    };
    //674 GC 出战武将切换 B:0成功 1失败B:武将type
    Model_WuJiang.prototype.GCChangeJob = function (self, data) {
        var result = data.readByte();
        if (result == 0) {
            var job = data.readByte();
            var shiZhuang = data.readInt();
            Model_player.voMine.job = job;
            Model_player.voMine.weapon = job;
            var role = Model_player.voMine.sceneChar;
            if (role) {
                role.attackCount = 0;
            }
            var skinIdToJob = shiZhuang / 1000 >> 0;
            if (Model_player.voMine.job == skinIdToJob) {
                Model_player.voMine.setShiZhuang(shiZhuang);
            }
            else {
                Model_player.voMine.setShiZhuang(0);
            }
            var index = 0;
            for (var i = 0; i < Model_ZSGodWeapon.godWeoponArr.length; i++) {
                if (Model_ZSGodWeapon.godWeoponArr[i].job == job) {
                    index++;
                    Model_player.voMine.setGodWeapon(Model_ZSGodWeapon.godWeoponArr[i].equipID);
                    break;
                }
            }
            if (index == 0) {
                Model_player.voMine.setGodWeapon(0);
            }
            Model_player.voMine.updateSkill();
            GGlobal.modelPlayer.notify(Model_player.MSG_UPDATE);
            GGlobal.control.notify(Enum_MsgType.WUJIANG_CHANGE_JOB);
        }
        else if (result == 2) {
            ViewCommonWarn.text("当前场景不可切换武将");
        }
        else {
            ViewCommonWarn.text("武将切换失败");
        }
    };
    /**升级神将之力 */
    Model_WuJiang.prototype.GCGetGodPower = function (self, data) {
        var result = data.readByte();
        var id = data.readInt();
        var level = data.readInt();
        Model_WuJiang.wujiangGodPower[id] = level;
        GGlobal.reddot.setCondition(UIConst.WUJIANGZHILI, id, self.getWujiangzhiliNotice(id, level, Model_WuJiang.wuJiangStar[id]));
        GGlobal.reddot.setCondition(UIConst.WUJIANGZHILI_SKILL, id, self.getWujiangzhiliSkillNotice(id, level, Model_WuJiang.shenjiangzhiliSkillLv[id]));
        if (result == 1) {
            ViewCommonWarn.text("升级失败");
            return;
        }
        GGlobal.control.notify(Enum_MsgType.WUJIANG_SHENGJIANGZHILI, { id: id, level: level });
    };
    /**686 GC 神将之力技能进阶返回 B:状态 1：成功，2：未达到神将之力等级，3：已达最大阶，4：道具不足，5：武将未激活I:武将idI:当前阶 */
    Model_WuJiang.prototype.GC_GENERAL_SKILLUP = function (self, data) {
        var result = data.readByte();
        var id = data.readInt();
        var level = data.readInt();
        Model_WuJiang.shenjiangzhiliSkillLv[id] = level;
        if (result == 1) {
            var skillList = Model_player.voMine.skillList;
            var godskillCfg = Config.herogodskill_211[id * 100 + level];
            for (var j = 0; j < skillList.length; j++) {
                var skillVo = skillList[j];
                var damage = 0;
                if (skillVo.type == 2 && godskillCfg) {
                    var arr_1 = JSON.parse(godskillCfg.attpg);
                    var len_2 = arr_1.length;
                    for (var n = 0; n < len_2; n++) {
                        if (arr_1[n][0] == skillVo.id) {
                            damage = arr_1[n][1];
                            break;
                        }
                    }
                }
                skillVo.skillPer = damage;
                skillVo.updatePower();
            }
            var arr = Model_WuJiang.PuTongWujiang.concat();
            var len = arr.length;
            for (var i = 0; i < len; i++) {
                var cfg = arr[i];
                GGlobal.reddot.setCondition(UIConst.WUJIANGZHILI_SKILL, cfg.type, self.getWujiangzhiliSkillNotice(cfg.type, Model_WuJiang.wujiangGodPower[cfg.type], Model_WuJiang.shenjiangzhiliSkillLv[cfg.type]));
            }
            GGlobal.control.notify(Enum_MsgType.WUJIANG_SHENGJIANGZHILI_SKILLUP);
        }
        else if (result == 2) {
            ViewCommonWarn.text("未达到神将之力等级");
        }
        else if (result == 3) {
            ViewCommonWarn.text("已达最大阶");
        }
        else if (result == 4) {
            ViewCommonWarn.text("道具不足");
        }
        else if (result == 5) {
            ViewCommonWarn.text("武将未激活");
        }
    };
    /**查看武将时装
     * @id 武将id
     */
    Model_WuJiang.prototype.CG3501 = function (id) {
        var bytes = this.getBytes();
        bytes.writeInt(id);
        this.sendSocket(3501, bytes);
    };
    Model_WuJiang.prototype.GC3502 = function (self, bytes) {
        //I:武将idI:当前佩戴皮肤0没有[I:时装idI:星级]已经拥有时装id
        var id = bytes.readInt();
        var info = Model_WuJiang.shiZhuanDic[id] || (Model_WuJiang.shiZhuanDic[id] = {});
        info.onSkinId = bytes.readInt();
        var len = bytes.readShort();
        var arr = [];
        info.ownSkinIds = [];
        var daojuDic = Model_WuJiang.itemShiZhuang;
        for (var i = 0; i < len; i++) {
            var sid = bytes.readInt();
            var lv = bytes.readInt();
            info.ownSkinIds.push({ skinId: sid, starLv: lv });
            var cfg = Config.sz_739[sid];
            var itemID = JSON.parse(cfg.jihuo)[0][1];
            daojuDic[itemID] = { star: lv, maxStar: cfg.shangxian };
        }
        Model_WuJiang.curSelWJId = id;
        self.notify(Model_WuJiang.msg_data_shiZhuang);
    };
    /**激活或升星时装
     * @id 时装id
     */
    Model_WuJiang.prototype.CG3503 = function (id, isJh) {
        if (isJh === void 0) { isJh = 0; }
        var bytes = this.getBytes();
        bytes.writeInt(id);
        this.isJH |= isJh;
        this.sendSocket(3503, bytes);
    };
    Model_WuJiang.prototype.GC3504 = function (self, bytes) {
        // B:0成功1失败I:时装idI:时装星级
        var state = bytes.readByte();
        if (state == 0) {
            var skinId = bytes.readInt();
            var starLv = bytes.readInt();
            var info = Model_WuJiang.shiZhuanDic[Model_WuJiang.curSelWJId];
            var arr = info.ownSkinIds;
            for (var i = 0; i < arr.length; i++) {
                var skinInfo = arr[i];
                if (skinInfo.skinId == skinId) {
                    skinInfo.starLv = starLv;
                    break;
                }
            }
            self.CG3501(Model_WuJiang.curSelWJId);
            GGlobal.control.notify(Enum_MsgType.WUJIANG_CHECK_NOTICE);
        }
        else {
            ViewCommonWarn.text("失败");
            this.isJH &= 0;
        }
    };
    /**穿戴时装
     * @id 时装id
     */
    Model_WuJiang.prototype.CG3505 = function (wjid, skinId) {
        var bytes = this.getBytes();
        bytes.writeByte(wjid);
        bytes.writeInt(skinId);
        this.sendSocket(3505, bytes);
    };
    Model_WuJiang.prototype.GC3506 = function (self, bytes) {
        //B:0成功1失败I:时装id
        var state = bytes.readByte();
        if (state == 0) {
            var skinId = bytes.readInt();
            var info = Model_WuJiang.shiZhuanDic[Model_WuJiang.curSelWJId];
            info.onSkinId = skinId;
            var voMine = Model_player.voMine;
            var skinIdToJob = skinId / 1000 >> 0;
            if (voMine.job == skinIdToJob) {
                voMine.setShiZhuang(skinId);
            }
            else {
                Model_player.voMine.setShiZhuang(0);
            }
            self.CG3501(Model_WuJiang.curSelWJId);
        }
        else {
            ViewCommonWarn.text("失败");
        }
    };
    /**3509拉取所有的时装数据 */
    Model_WuJiang.prototype.CG3509 = function () { this.sendSocket(3509, this.getBytes()); };
    Model_WuJiang.prototype.GC3510 = function (self, bytes) {
        for (var i = 0, len = bytes.readShort(); i < len; i++) {
            self.GC3502(self, bytes);
        }
    };
    Model_WuJiang.sortWuJiang = function (a, b) {
        var aQua = Model_WuJiang.getHeroQuality(a);
        var bQua = Model_WuJiang.getHeroQuality(b);
        if (aQua == bQua) {
            return a.type - b.type;
        }
        else {
            return bQua - aQua;
        }
    };
    Model_WuJiang.sortWuJiang1 = function (a, b) {
        var aQua = Model_WuJiang.getHeroQuality(a);
        var bQua = Model_WuJiang.getHeroQuality(b);
        if (aQua == bQua) {
            return a.type - b.type;
        }
        else {
            return aQua - bQua;
        }
    };
    Model_WuJiang.getHeroQuality = function (v) {
        if (v == null) {
            return 1;
        }
        if (v.quality == null) {
            var activation = ConfigHelp.SplitStr(v.activation);
            var quality = Config.daoju_204[activation[0][1]].quality;
            v.quality = quality;
        }
        return v.quality;
    };
    Model_WuJiang.createWuJiangColorName = function (id) {
        var cfg = Config.hero_211[id];
        var name = cfg.name;
        if (cfg.pinzhi > 7) {
            var names = name.split('');
            name = "";
            var colors = ["#ed1414", "#ffc344", '#da2bfa', "#66ccff"];
            for (var i = 0; i < names.length; i++) {
                var idx = i % colors.length;
                name += HtmlUtil.fontNoSize(names[i], colors[idx]);
            }
        }
        return name;
    };
    //武将升阶红点
    Model_WuJiang.checkOneKeyUp = function () {
        var count = Model_Bag.getItemCount(Model_WuJiang.DAN_LEVELUP);
        var exp = count * Model_WuJiang.DAN_EXP;
        var herolv = Config.herolv_211[Model_WuJiang.jieShu];
        if (herolv && herolv.exp > 0) {
            if ((exp + Model_WuJiang.exp) >= herolv.exp) {
                return true;
            }
        }
        return false;
    };
    //武将技能升级红点
    Model_WuJiang.checkSkill = function (id) {
        var obj = Config.herolvskill_211[id];
        if (obj == null) {
            return false;
        }
        if (obj.next == 0) {
            return false;
        }
        else {
            var consumeArr = ConfigHelp.SplitStr(obj.consume);
            var hasCont = Model_Bag.getItemCount(Number(consumeArr[0][1]));
            if (Model_WuJiang.jieShu >= obj.lv && hasCont >= Number(consumeArr[0][2])) {
                return true;
            }
        }
        return false;
    };
    Model_WuJiang.checkUpJie = function () {
        if (Model_WuJiang.checkOneKeyUp()) {
            return true;
        }
        //武将技能升级
        var len = Model_WuJiang.skillArr.length;
        for (var i = 0; i < len; i++) {
            var id = Model_WuJiang.skillArr[i];
            if (Model_WuJiang.checkSkill(id)) {
                return true;
            }
        }
        if (Model_WuJiang.wuJWearArr().length > 0) {
            return true;
        }
        return false;
    };
    Model_WuJiang.checkStarVo = function (wuJiang) {
        var star = Model_WuJiang.wuJiangStar[wuJiang.type];
        if (star && star >= wuJiang.star) {
            return false;
        }
        //升星道具
        var consume = ConfigHelp.SplitStr(wuJiang.activation);
        var hasCount = Model_Bag.getItemCount(Number(consume[0][1]));
        if (hasCount >= Number(consume[0][2])) {
            return true;
        }
        return false;
    };
    Model_WuJiang.checkUpStar = function () {
        //激活升星
        var len = Model_WuJiang.PuTongWujiang.length;
        for (var i = 0; i < len; i++) {
            var wuJiang = Model_WuJiang.PuTongWujiang[i];
            if (Model_WuJiang.checkStarVo(wuJiang)) {
                return true;
            }
        }
        //吞噬丹
        var maxCount0 = 0;
        var maxCount1 = 0;
        for (var keys in Model_WuJiang.wuJiangStar) {
            var star = Model_WuJiang.wuJiangStar[keys];
            var hero = Config.hero_211[keys];
            if (hero == null)
                continue;
            maxCount0 += hero.max1 * star;
            maxCount1 += hero.max2 * star;
        }
        var count = Model_Bag.getItemCount(Model_WuJiang.DAN_SHUXING);
        if (count > 0 && Model_WuJiang.danShuxing < maxCount0) {
            return true;
        }
        return false;
    };
    //将印可合成 升阶
    Model_WuJiang.checkJYinSyn = function (type) {
        var open = Model_WuJiang.OPEN_GUAN[type - 20];
        if (GGlobal.modelguanxian.guanzhi < open) {
            return false;
        }
        var equipData = Model_player.voMine.equipData;
        var ve = equipData[type];
        var next;
        if (ve == null) {
            next = Model_Equip.getNextEuipLv(type, 0);
        }
        else {
            next = Model_Equip.getNextEuipLv(type, ve.id);
        }
        if (!next) {
            return false;
        }
        var composeArr = ConfigHelp.SplitStr(next.compose);
        var count = Model_Bag.getItemCount(Number(composeArr[0][1]));
        var needCount = Number(composeArr[0][2]);
        if (count >= needCount) {
            return true;
        }
        return false;
    };
    //将印可穿戴 合成 升阶
    Model_WuJiang.checkJYin = function () {
        for (var i = 0; i < 10; i++) {
            if (Model_WuJiang.checkJYinSyn(i + 20)) {
                return true;
            }
        }
        //将印可穿戴
        var equipBag = Model_Bag.equipList;
        var equipData = Model_player.voMine.equipData;
        for (var i = 0; i < equipBag.length; i++) {
            var ve = equipBag[i];
            if (ve.type >= 20 && ve.type < 30) {
                var open_1 = Model_WuJiang.OPEN_GUAN[ve.type - 20];
                if (GGlobal.modelguanxian.guanzhi < open_1) {
                    continue;
                }
                if (equipData[ve.type] == null || ve.basePower > equipData[ve.type].basePower) {
                    return true;
                }
            }
        }
        return false;
    };
    //武将红点
    Model_WuJiang.checkRed = function () {
        if (Model_WuJiang.checkUpJie()) {
            return true;
        }
        if (Model_WuJiang.checkUpStar()) {
            return true;
        }
        if (Model_WuJiang.checkJYin()) {
            return true;
        }
        if (this.SZcheckAll()) {
            return true;
        }
        return false;
    };
    Model_WuJiang.addNewItem = function (getNewItem) {
        Model_WuJiang.newItem = Model_WuJiang.newItem.concat(getNewItem);
        Model_WuJiang.showNewItem();
    };
    Model_WuJiang.showNewItem = function () {
        while (true) {
            if (Model_WuJiang.newItem.length == 0) {
                break;
            }
            var v = Model_WuJiang.newItem.shift();
            var sys = v.cfg.sys;
            if (sys == UIConst.WU_JIANG) {
                var wu = Model_WuJiang.newWuJiang[v.id];
                if (wu && !Model_WuJiang.wuJiangStar[wu.type]) {
                    GGlobal.layerMgr.open(UIConst.WU_JIANG_GETTIPS, wu);
                    break;
                }
            }
        }
    };
    //将时装ID 映射为职业为key的格式  传入武将表的type
    Model_WuJiang.getFashionWith_JobKey = function (type) {
        if (!Model_WuJiang.fashionMap) {
            var temp = {};
            var lib = Config.sz_739;
            for (var key in lib) {
                var cfg = lib[key];
                var wjId = cfg.ID / 1000 >> 0;
                if (!temp[wjId]) {
                    temp[wjId] = cfg;
                }
            }
            Model_WuJiang.fashionMap = temp;
        }
        return Model_WuJiang.fashionMap[type];
    };
    /**单个武将时装 */
    Model_WuJiang.SZCheck = function (wujiang, szId) {
        var lib = Config.sz_739;
        var target;
        var star_max = 0;
        if (szId) {
            target = lib[szId];
        }
        else {
            target = Model_WuJiang.getFashionWith_JobKey(wujiang.type);
        }
        var starLv = 0;
        var hasActived = false;
        if (!this.shiZhuanDic || !this.shiZhuanDic[wujiang.type]) {
            starLv = 0;
            hasActived = false;
        }
        else {
            var arr = this.shiZhuanDic[wujiang.type].ownSkinIds;
            for (var i = 0; i < arr.length; i++) {
                var tempObj = arr[i];
                if (tempObj.skinId == target.ID) {
                    hasActived = true;
                    starLv = tempObj.starLv;
                    break;
                }
            }
        }
        if (target)
            star_max = target.shangxian;
        // if (!(hasActived && starLv >= wujiang.star) && target && starLv < star_max) {
        if (target && starLv < star_max) {
            var consume = ConfigHelp.SplitStr(target.jihuo);
            var _needItem = VoItem.create(Number(consume[0][1]));
            var hasCount = Model_Bag.getItemCount(Number(consume[0][1]));
            if (hasCount >= _needItem.count) {
                return true;
            }
        }
        return false;
    };
    /**所有时装 */
    Model_WuJiang.SZcheckAll = function () {
        var arr = Model_WuJiang.wuJiangArr;
        var len = arr.length;
        for (var i = 0; i < len; i++) {
            var vo = arr[i];
            var starLv = Model_WuJiang.wuJiangStar[vo.type];
            var starGod = ModelGodWuJiang.getWuJiangIsActivation(vo.type);
            if (starLv > 0 || starGod > 0) {
                var bool = this.SZCheck(vo);
                if (bool) {
                    return true;
                }
            }
        }
        return false;
    };
    Model_WuJiang.hasShiZhuang = function (wjId) {
        if (!this.judgeArr) {
            var lib = Config.sz_739;
            var arr = this.judgeArr = [];
            for (var key in lib) {
                var cfg = lib[key];
                var ID = cfg.ID;
                var id = Number(ID / 1000 >> 0);
                arr.push(id);
            }
        }
        return this.judgeArr.indexOf(wjId) >= 0;
    };
    /**获取武将 */
    Model_WuJiang.findWJ = function (id) {
        var arr = Model_WuJiang.wuJiangArr;
        for (var i = 0, len = arr.length; i < len; i++) {
            var vo = arr[i];
            if (vo.type == id) {
                return vo;
            }
        }
        return vo;
    };
    //	获取可以穿的武将装备
    Model_WuJiang.wuJWearArr = function () {
        var arr = Model_Bag.filterEquips(Model_Bag.filterWuJEquip, null);
        var d = Model_player.voMine.equipData;
        var sendArr = {};
        for (var i = 0; i < arr.length; i++) {
            var equ = arr[i];
            if (Model_WuJiang.jieShu < equ.jie) {
                continue;
            }
            var ownE = d[equ.type];
            if (ownE == null && sendArr[equ.type] == null) {
                sendArr[equ.type] = equ;
            }
            else {
                var boo = true;
                if (ownE && equ.basePower <= ownE.basePower) {
                    boo = false;
                }
                if (sendArr[equ.type] && equ.basePower <= sendArr[equ.type].basePower) {
                    boo = false;
                }
                if (boo) {
                    sendArr[equ.type] = equ;
                }
            }
        }
        var a = [];
        for (var i = 40; i < 44; i++) {
            if (sendArr[i]) {
                a.push(sendArr[i]);
            }
        }
        return a;
    };
    /**通过激活材料(升星材料)判断使用该材料的武将是否已经满星 */
    Model_WuJiang.isFullByMat = function (vo) {
        if (this.matToWuJiang[vo.id]) {
            var data = this.matToWuJiang[vo.id];
            return this.wuJiangStar[data.type] >= data.star;
        }
        else {
            var datas = this.wuJiangArr;
            for (var i = 0; i < datas.length; i++) {
                var data = datas[i];
                var consume = ConfigHelp.SplitStr(data.activation);
                var id = Number(consume[0][1]);
                this.matToWuJiang[id] = data;
                if (id == vo.id) {
                    return this.wuJiangStar[data.type] >= data.star;
                }
            }
        }
        return false;
    };
    /**获取已经激活的武将 */
    Model_WuJiang.getActiveWUJiang = function () {
        var data = Model_WuJiang.wuJiangArr;
        var temp = [];
        for (var i = 0; i < data.length; i++) {
            var v = data[i];
            var start = Model_WuJiang.wuJiangStar[v.type];
            if (start) {
                temp.push(v);
                continue;
            }
        }
        return temp;
    };
    /**通过品质获取所有该品质已激活的武将 */
    Model_WuJiang.getWUjiangStar = function (type) {
        var data = Model_WuJiang.getActiveWUJiang();
        var temp = [];
        for (var i = 0; i < data.length; i++) {
            var v = data[i];
            if (v.pinzhi == type) {
                temp.push(v);
            }
        }
        return temp;
    };
    /**通过品质获取该品质所有武将的总星级 */
    Model_WuJiang.getAllWujiangStarByPinzhi = function (type) {
        var data = Model_WuJiang.getWUjiangStar(type);
        var index = 0;
        for (var i = 0; i < data.length; i++) {
            var v = data[i];
            var level = Model_WuJiang.wuJiangStar[v.type];
            index += level;
        }
        return index;
    };
    Model_WuJiang.jieShu = 1;
    Model_WuJiang.wuJiangStar = {};
    Model_WuJiang.wujiangGodPower = [];
    Model_WuJiang.skillArr = [];
    Model_WuJiang.selectJob = 0;
    Model_WuJiang.shenjiangzhiliSkillLv = [];
    //	获取某种品质的总星级
    Model_WuJiang._starMap = {};
    /**	武将培养丹 */
    Model_WuJiang.DAN_LEVELUP = 411001;
    /**	武将培养丹 提升经验*/
    Model_WuJiang.DAN_EXP = 10;
    /**	武将属性丹 加属性低*/
    Model_WuJiang.DAN_SHUXING = 412001;
    Model_WuJiang.DRUG_SHUXING = 1;
    /**	武将资质丹 加属性高*/
    // public static DAN_ZIZHI = 412002;
    // public static DRUG_ZIZHI = 2;
    /**	武将技能书*/
    Model_WuJiang.SKILL_BOOK = 414001;
    /**	将印碎片*/
    Model_WuJiang.JIANG_YIN = 410006;
    /**官衔 开启*/
    Model_WuJiang._OPEN_GUAN = null; //[1, 18, 20, 25, 28, 30, 35, 38, 40, 45];
    //时装信息
    Model_WuJiang.shiZhuanDic = {};
    Model_WuJiang.itemShiZhuang = {}; //道具对应激活的时装数据
    Model_WuJiang.msg_data_shiZhuang = "msg_data_shiZhuang";
    Model_WuJiang.LOCK_ICON = [930170, 930171, 930172, 930173, 930174, 930175, 930176, 930177, 930178, 930179];
    Model_WuJiang.wujiangzhiliName = "";
    Model_WuJiang.wujiangzhiliType = 0;
    Model_WuJiang.wujiangzhiliStar = 0;
    Model_WuJiang.newItem = [];
    /**材料到英雄的映射 */
    Model_WuJiang.matToWuJiang = {};
    return Model_WuJiang;
}(BaseModel));
__reflect(Model_WuJiang.prototype, "Model_WuJiang");
