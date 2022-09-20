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
var Model_BySys = (function (_super) {
    __extends(Model_BySys, _super);
    function Model_BySys() {
        return _super.call(this) || this;
    }
    /**909
    CG 获取某系统的培养等阶经验技能等级 B:1神剑2异宝3兵法4宝物5天书*/
    Model_BySys.prototype.CGGetinfobysys = function (sys) {
        var ba = this.getBytes();
        ba.writeByte(sys);
        this.sendSocket(909, ba);
    };
    /**911
    CG 升阶 B:系统分类1神剑2异宝3兵法4宝物5天书B:升阶方式0普通 1一键*/
    Model_BySys.prototype.CGUpjiebysys = function (sys, type) {
        var ba = this.getBytes();
        ba.writeByte(sys);
        ba.writeByte(type);
        this.sendSocket(911, ba);
    };
    /**913
    CG 激活/升级技能 B:1-5B:位置id 12345*/
    Model_BySys.prototype.CGUpskills = function (sys, pos) {
        var ba = this.getBytes();
        ba.writeByte(sys);
        ba.writeByte(pos);
        this.sendSocket(913, ba);
    };
    /**815
    CG 获取5系统激活套装 B:（1武将2宝物）*/
    Model_BySys.prototype.CGJiBan = function (type) {
        var ba = this.getBytes();
        ba.writeByte(type);
        this.sendSocket(815, ba);
    };
    /**817
    系统激活升级套装 B:系统idB:激活/升阶套装*/
    Model_BySys.prototype.CGJiBanUp = function (sys, index) {
        var ba = this.getBytes();
        ba.writeByte(sys);
        ba.writeByte(index);
        this.sendSocket(817, ba);
    };
    //*************************协议处理*******************************//
    /**协议*/
    Model_BySys.prototype.listenServ = function (mgr) {
        this.socket = mgr;
        mgr.regHand(910, this.GCGetinfobysys910, this);
        mgr.regHand(912, this.GCUpjiebysys912, this);
        mgr.regHand(914, this.GCUpskills914, this);
        mgr.regHand(816, this.GCJiBan816, this);
        mgr.regHand(818, this.GCJiBanUp818, this);
    };
    /**910	 B-I-I-[I]
    GC B:系统type 1神剑2异宝3兵法4宝物5天书I:等阶I:经验[I:技能等级0表示未激活]*/
    Model_BySys.prototype.GCGetinfobysys910 = function (self, data) {
        var sys = data.readByte();
        Model_BySys._jie[sys] = data.readInt();
        Model_BySys._exp[sys] = data.readInt();
        Model_BySys._skill[sys] = [];
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            Model_BySys._skill[sys].push(data.readInt());
        }
        GGlobal.control.notify(Enum_MsgType.BY_SYS_UP_JIE_SKILL, sys);
    };
    /**912	B-B-I-I
    GC 升阶返回 B:1-5B:0成功1失败I:阶数I:经验*/
    Model_BySys.prototype.GCUpjiebysys912 = function (self, data) {
        var sys = data.readByte();
        var result = data.readByte();
        VZhiShengDan.invalNum = 2;
        if (result == 0) {
            Model_BySys._jie[sys] = data.readInt();
            Model_BySys._exp[sys] = data.readInt();
            ViewCommonWarn.text("升阶成功");
            GGlobal.control.notify(Enum_MsgType.BY_SYS_UP_JIE_SKILL, sys);
        }
        else {
            ViewCommonWarn.text("升阶失败");
        }
    };
    /**914		B-B-B-I
    GC 升级技能返回 B:1-5B:0成功1失败B:位置1-5I:技能id*/
    Model_BySys.prototype.GCUpskills914 = function (self, data) {
        var sys = data.readByte();
        var result = data.readByte();
        if (result == 0) {
            if (Model_BySys._skill[sys] == null) {
                Model_BySys._skill[sys] = [];
            }
            var pos = data.readByte();
            var id = data.readInt();
            Model_BySys._skill[sys][pos - 1] = id;
            GGlobal.control.notify(Enum_MsgType.BY_SYS_UP_SKILL, [sys, id]);
            GGlobal.control.notify(Enum_MsgType.BY_SYS_UP_JIE_SKILL, sys);
            ViewCommonWarn.text("升级技能成功");
        }
        else {
            ViewCommonWarn.text("升级技能失败");
        }
    };
    Model_BySys.sysJie = function (sys) {
        if (Model_BySys._jie[sys])
            return Model_BySys._jie[sys];
        else
            return 0;
    };
    Model_BySys.sysExp = function (sys) {
        if (Model_BySys._exp[sys])
            return Model_BySys._exp[sys];
        else
            return 0;
    };
    Model_BySys.sysSkillArr = function (sys) {
        if (Model_BySys._skill[sys])
            return Model_BySys._skill[sys];
        else
            return [];
    };
    Model_BySys.sysSkillId = function (sys, pos) {
        if (Model_BySys._skill[sys] && Model_BySys._skill[sys][pos])
            return Model_BySys._skill[sys][pos];
        else
            0;
    };
    Model_BySys.canWear = function (type, jieType) {
        var arr = Model_Bag.filterEquips(Model_Bag.filterEquipType, type);
        if (arr.length == 0)
            return false;
        var jie = 1;
        if (jieType == Model_BySys.WU_JIANG) {
            jie = Model_WuJiang.jieShu;
        }
        else if (jieType == Model_BySys.ZHAN_JIA) {
            jie = Model_ZhanJia.jieShu;
        }
        else if (jieType == Model_BySys.TIAN_SHU) {
            jie = GGlobal.modeltianshu.level;
        }
        else if (jieType == Model_BySys.BAO_WU) {
            jie = Model_BaoWu.level;
        }
        else {
            jie = Model_BySys.sysJie(jieType);
        }
        var d = Model_player.voMine.equipData;
        var ownE = d[type];
        for (var i = 0; i < arr.length; i++) {
            var equ = arr[i];
            if (jie < equ.jie) {
                continue;
            }
            if (ownE == null) {
                return true;
            }
            else if (equ.basePower > ownE.basePower) {
                return true;
            }
        }
        return false;
    };
    //40-103装备是否满足穿戴条件
    Model_BySys.canWearEqVo = function (equ) {
        var type = equ.type;
        var jie = equ.jie;
        var jieType;
        if (type < 40) {
            jieType = 0;
        }
        else if (type < 50) {
            jieType = Model_BySys.WU_JIANG;
        }
        else if (type < 60) {
            jieType = Model_BySys.ZHAN_JIA;
        }
        else if (type < 70) {
            jieType = Model_BySys.SHEN_JIAN;
        }
        else if (type < 80) {
            jieType = Model_BySys.YI_BAO;
        }
        else if (type < 90) {
            jieType = Model_BySys.BING_FA;
        }
        else if (type < 100) {
            jieType = Model_BySys.BAO_WU;
        }
        else if (type < 110) {
            jieType = Model_BySys.TIAN_SHU;
        }
        else {
            jieType = 0;
        }
        if (jieType == 0) {
            return false;
        }
        var jiePly = 0;
        if (jieType == Model_BySys.WU_JIANG) {
            jiePly = Model_WuJiang.jieShu;
        }
        else if (jieType == Model_BySys.ZHAN_JIA) {
            jiePly = Model_ZhanJia.jieShu;
        }
        else if (jieType == Model_BySys.TIAN_SHU) {
            jiePly = GGlobal.modeltianshu.level;
        }
        else if (jieType == Model_BySys.BAO_WU) {
            jiePly = Model_BaoWu.level;
        }
        else {
            jiePly = Model_BySys.sysJie(jieType);
        }
        if (jiePly >= jie) {
            return true;
        }
        return false;
    };
    Model_BySys.getJiBan = function (sys) {
        return Model_BySys._jiBan[sys] ? Model_BySys._jiBan[sys] : [];
    };
    /**816
    GC套装激活情况 B:（1武将2宝物）[I:已经激活套装id]*/
    Model_BySys.prototype.GCJiBan816 = function (self, data) {
        var sys = data.readByte();
        var len = data.readShort();
        Model_BySys._jiBan[sys] = [];
        for (var i = 0; i < len; i++) {
            var ids = data.readInt();
            Model_BySys._jiBan[sys].push(ids);
        }
        GGlobal.control.notify(Enum_MsgType.BY_SYS_JI_BAN_UP, sys);
        // if(sys == Model_BySys.JIB_WUJIANG){
        // 	GGlobal.control.notify(Enum_MsgType.WUJIANG_CHECK_NOTICE);
        // }else if(sys == Model_BySys.JIB_BAOWU){
        // 	GGlobal.control.notify(Enum_MsgType.WUJIANG_CHECK_NOTICE);
        // }
    };
    /**818
    系统激活升级套装 B:系统idB:套装序号I:套装id*/
    Model_BySys.prototype.GCJiBanUp818 = function (self, data) {
        var res = data.readByte();
        if (res == 0) {
            var sys = data.readByte();
            var index = data.readByte();
            var sid = data.readInt();
            if (Model_BySys._jiBan[sys] == null) {
                return;
            }
            Model_BySys._jiBan[sys][index - 1] = sid;
            GGlobal.control.notify(Enum_MsgType.BY_SYS_JI_BAN, [sys, index, sid]);
            GGlobal.control.notify(Enum_MsgType.BY_SYS_JI_BAN_UP, sys);
            // if(sys == Model_BySys.JIB_WUJIANG){
            // 	GGlobal.control.notify(Enum_MsgType.WUJIANG_CHECK_NOTICE);
            // }else if(sys == Model_BySys.JIB_BAOWU){
            // 	GGlobal.control.notify(Enum_MsgType.BAOWU_DATA_UPDATE);
            // }
        }
        else {
            ViewCommonWarn.text("条件不满足");
        }
    };
    Model_BySys.checkSuit = function (sys) {
        var suit = Model_BySys.getJiBan(sys);
        for (var i = 0; i < suit.length; i++) {
            if (Model_BySys.checkSuitVo(suit[i], sys)) {
                return true;
            }
        }
        return false;
    };
    Model_BySys.checkSuitVo = function (suitId, sys) {
        var cfg = Model_BySys.getJiBCfg(sys);
        var suit = cfg[suitId];
        if (!suit) {
            return false;
        }
        if (suit.condition == "0") {
            return false;
        }
        //条件
        var reachBoo = true;
        var conditionArr = ConfigHelp.SplitStr(suit.condition);
        for (var j = 0; j < conditionArr.length; j++) {
            var $id = Number(conditionArr[j][0]);
            var $star = Number(conditionArr[j][1]);
            var reachStar = null;
            if (sys == Model_BySys.JIB_BAOWU) {
                for (var k = 0; k < Model_BaoWu.baowuArr.length; k++) {
                    var vo = Model_BaoWu.baowuArr[k];
                    if (vo.id == $id) {
                        reachStar = vo.starLv;
                        break;
                    }
                }
            }
            if (sys == Model_BySys.JIB_SHENJIAN) {
                for (var k = 0; k < Model_ShenJian.shenjianArr.length; k++) {
                    var vo = Model_ShenJian.shenjianArr[k];
                    if (vo.id == $id) {
                        reachStar = vo.starLv;
                        break;
                    }
                }
            }
            if (sys == Model_BySys.JIB_YIBAO) {
                for (var k = 0; k < Model_YiBao.YBArr.length; k++) {
                    var vo = Model_YiBao.YBArr[k];
                    if (vo.id == $id) {
                        reachStar = vo.starLv;
                        break;
                    }
                }
            }
            else if (sys == Model_BySys.JIB_BINGFA) {
                var vo = GGlobal.modelBingFa.mapObj[$id];
                reachStar = vo.star;
            }
            else if (sys == Model_BySys.JIB_WUJIANG) {
                reachStar = Model_WuJiang.wuJiangStar[$id];
            }
            else if (sys == Model_BySys.JIB_ZHANJIA) {
                reachStar = Model_ZhanJia.zhanjiaStar[$id];
            }
            else if (sys == Model_BySys.JIB_TIANSHU) {
                for (var k = 0; k < GGlobal.modeltianshu.data.length; k++) {
                    var vo = GGlobal.modeltianshu.data[k];
                    if (vo.id == $id) {
                        reachStar = vo.star;
                        break;
                    }
                }
            }
            if (reachStar == null || reachStar < $star) {
                return false;
            }
        }
        return true;
    };
    Model_BySys.getJiBCfg = function (sys) {
        if (sys == Model_BySys.JIB_BAOWU) {
            return Config.baosuit_214;
        }
        else if (sys == Model_BySys.JIB_WUJIANG) {
            return Config.herosuit_211;
        }
        else if (sys == Model_BySys.JIB_BINGFA) {
            return Config.booksuit_212;
        }
        else if (sys == Model_BySys.JIB_YIBAO) {
            return Config.ybsuit_217;
        }
        else if (sys == Model_BySys.JIB_SHENJIAN) {
            return Config.swordsuit_216;
        }
        else if (sys == Model_BySys.JIB_ZHANJIA) {
            return Config.clothessuit_212;
        }
        else if (sys == Model_BySys.JIB_TIANSHU) {
            return Config.booksuit_215;
        }
    };
    /**神剑*/
    Model_BySys.SHEN_JIAN = 1;
    /**异宝*/
    Model_BySys.YI_BAO = 2;
    /**兵法*/
    Model_BySys.BING_FA = 3;
    /**宝物*/
    Model_BySys.BAO_WU = 4;
    /**天书*/
    Model_BySys.TIAN_SHU = 5;
    /**战甲*/
    Model_BySys.ZHAN_JIA = 6;
    /**武将*/
    Model_BySys.WU_JIANG = 7;
    Model_BySys._jie = {};
    Model_BySys._exp = {};
    Model_BySys._skill = {};
    Model_BySys._jiBan = {};
    //武将
    Model_BySys.JIB_WUJIANG = 1;
    //宝物
    Model_BySys.JIB_BAOWU = 2;
    //神剑
    Model_BySys.JIB_SHENJIAN = 3;
    //异宝
    Model_BySys.JIB_YIBAO = 4;
    //天书
    Model_BySys.JIB_TIANSHU = 5;
    //战甲
    Model_BySys.JIB_ZHANJIA = 6;
    //兵法
    Model_BySys.JIB_BINGFA = 7;
    return Model_BySys;
}(BaseModel));
__reflect(Model_BySys.prototype, "Model_BySys");
