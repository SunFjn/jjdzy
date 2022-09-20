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
var Model_ZSGodWeapon = (function (_super) {
    __extends(Model_ZSGodWeapon, _super);
    function Model_ZSGodWeapon() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**通过激活材料(升星材料)判断使用该材料的武将是否已经满星 */
    Model_ZSGodWeapon.isFullByMat = function (vo) {
        if (Model_ZSGodWeapon.matToGodWeapon[vo.id]) {
            var data = Model_ZSGodWeapon.matToGodWeapon[vo.id];
            return !Model_WuJiang.getWuJiangStarByJob(data.job) || data.starLv >= data.starMax;
        }
        else {
            var datas = Model_ZSGodWeapon.godWeoponArr;
            for (var i = 0; i < datas.length; i++) {
                var data = datas[i];
                var consume = JSON.parse(data.cfg.activation);
                var id = Number(consume[0][1]);
                Model_ZSGodWeapon.matToGodWeapon[id] = data;
                if (id == vo.id) {
                    return data.starLv >= data.starMax || !Model_WuJiang.getWuJiangStarByJob(data.job);
                }
            }
        }
        return false;
    };
    Model_ZSGodWeapon.checkAndShow = function (id) {
        var arr = Model_ZSGodWeapon.godWeoponArr;
        if (arr == null || arr.length == 0)
            return;
        for (var i = 0, len = arr.length; i < len; i++) {
            var vo = arr[i];
            if (!vo.starLv) {
                var costArr = vo.costArr;
                if (costArr[0][1] == id) {
                    VTipBWJiHuo.add(vo);
                    break;
                }
            }
        }
    };
    Model_ZSGodWeapon.initcfg = function () {
        if (Model_ZSGodWeapon.godWeoponArr.length <= 0) {
            for (var key in Config.sb_750) {
                var vo = Vo_ZSGodWeapon.create(parseInt(key));
                Model_ZSGodWeapon.godWeoponArr.push(vo);
            }
        }
    };
    Model_ZSGodWeapon.getGodWeaponByJob = function (job) {
        return Model_ZSGodWeapon.godWeaponDic[job] ? Model_ZSGodWeapon.godWeaponDic[job] : 0;
    };
    Model_ZSGodWeapon.getPerByJob = function (job) {
        for (var i = 0; i < Model_ZSGodWeapon.godWeoponArr.length; i++) {
            var vo = Model_ZSGodWeapon.godWeoponArr[i];
            if (vo.job == job) {
                if (vo.zhuanShuCfg) {
                    return JSON.parse(vo.zhuanShuCfg.jineng)[0][1];
                }
                break;
            }
        }
        return 0;
    };
    Model_ZSGodWeapon.getDaZaoData = function () {
        if (Model_ZSGodWeapon.daZaoArr.length <= 0) {
            for (var key in Config.sbdzmb_750) {
                var cfg = Config.sbdzmb_750[key];
                if (!Model_ZSGodWeapon.daZaoArr[cfg.qs - 1])
                    Model_ZSGodWeapon.daZaoArr[cfg.qs - 1] = [];
                Model_ZSGodWeapon.daZaoArr[cfg.qs - 1].push(cfg);
            }
            for (var i = 0; i < Model_ZSGodWeapon.daZaoArr.length; i++) {
                Model_ZSGodWeapon.daZaoArr[i].sort(function (a, b) {
                    return a.id - b.id;
                });
            }
        }
    };
    Model_ZSGodWeapon.checkOneCuiLian = function (vo) {
        var count = Model_Bag.getItemCount(Model_ZSGodWeapon.cuiLianDan);
        return vo.cuiLianCfg.exp != 0 && count * Model_ZSGodWeapon.cuiLianExp >= vo.cuiLianCfg.exp - vo.clExp && vo.starLv >= vo.cuiLianCfg.tiaojian;
    };
    Model_ZSGodWeapon.checkCuiLian = function () {
        var ret = false;
        for (var i = 0; i < Model_ZSGodWeapon.godWeoponArr.length; i++) {
            ret = Model_ZSGodWeapon.checkOneCuiLian(Model_ZSGodWeapon.godWeoponArr[i]);
            if (ret)
                break;
        }
        return ret;
    };
    Model_ZSGodWeapon.checkTunShi = function (vo, index) {
        var _maxCount = vo.starLv * vo.cfg["max" + (index + 1)];
        var _eatCount = vo.tunshiArr[index];
        var count = Model_Bag.getItemCount(Model_ZSGodWeapon.danIDArr[index]);
        return count > 0 && _eatCount < _maxCount;
    };
    Model_ZSGodWeapon.checkZSNotice = function (vo) {
        if (!vo.zhuanShuCfg)
            return false;
        var index = 0;
        if (vo.zhuanShuCfg.tiaojian != "0") {
            var tiaoJianArr = JSON.parse(vo.zhuanShuCfg.tiaojian);
            if (Model_WuJiang.getWuJiangStarByJob(vo.job) >= tiaoJianArr[0][1])
                index++;
            if (vo.starLv >= tiaoJianArr[1][1])
                index++;
            if (vo.zhuanShuCfg.next != 0 && index >= 2) {
                return true;
            }
        }
        return false;
    };
    Model_ZSGodWeapon.checkOneUpStarNotice = function (vo) {
        var ret = Model_ZSGodWeapon.checkOneUpStar(vo);
        if (!ret)
            ret = Model_ZSGodWeapon.checkZSNotice(vo);
        if (!ret) {
            for (var i = 0; i < 3; i++) {
                ret = Model_ZSGodWeapon.checkTunShi(vo, i);
                if (ret)
                    break;
            }
        }
        return ret;
    };
    Model_ZSGodWeapon.checkOneUpStar = function (vo) {
        var ret = vo.starLv < vo.starMax && ConfigHelp.checkEnough(vo.cfg.activation, false) && Model_WuJiang.getWuJiangStarByJob(vo.job);
        return ret;
    };
    Model_ZSGodWeapon.checkUpStar = function () {
        var ret = false;
        for (var i = 0; i < Model_ZSGodWeapon.godWeoponArr.length; i++) {
            ret = Model_ZSGodWeapon.checkOneUpStarNotice(Model_ZSGodWeapon.godWeoponArr[i]);
            if (ret)
                break;
        }
        return ret;
    };
    Model_ZSGodWeapon.sortGodWeapon = function (a, b) {
        if (a.job == Model_player.voMine.job) {
            return -1;
        }
        else if (b.job == Model_player.voMine.job) {
            return 1;
        }
        else {
            if (a.state == b.state) {
                if (a.state == Vo_ZSGodWeapon.NOCANACTIVITY) {
                    if (a.quality == b.quality) {
                        return a.cfg.bianhao - b.cfg.bianhao;
                    }
                    else {
                        return a.quality - b.quality;
                    }
                }
                else {
                    if (a.quality == b.quality) {
                        return a.cfg.bianhao - b.cfg.bianhao;
                    }
                    else {
                        return b.quality - a.quality;
                    }
                }
            }
            else {
                return a.state - b.state;
            }
        }
    };
    //协议处理
    Model_ZSGodWeapon.prototype.listenServ = function (mgr) {
        this.socket = mgr;
        //注册GC方法
        mgr.regHand(7850, this.GC_GodWeapon_initInfo_7850, this);
        mgr.regHand(7852, this.GC_GodWeapon_upstar_7852, this);
        mgr.regHand(7854, this.GC_GodWeapon_wear_7854, this);
        mgr.regHand(7856, this.GC_GodWeapon_godForge_7856, this);
        mgr.regHand(7858, this.GC_GodWeapon_actzhuanshuLv_7858, this);
        mgr.regHand(7860, this.GC_GodWeapon_upcuilianlv_7860, this);
        mgr.regHand(7862, this.GC_GodWeapon_addFashion_7862, this);
        mgr.regHand(7864, this.GC_GodWeapon_makeWuqi_7864, this);
    };
    /**7850 [B-I-I-[I]-[I-I]-I-I]-B GC 初始化 [B:武将类型I:星级I:当前穿戴武器id[I:已经激活的武器时装][I:1-3神铁、陨铁 玄铁I:吞噬个数]
     * I:专属神兵等级I:淬炼等级I:淬炼经验]我的神兵arrsB:必得高级道具剩余次数leftHightNumI:工匠锤次数I:期数*/
    Model_ZSGodWeapon.prototype.GC_GodWeapon_initInfo_7850 = function (self, data) {
        Model_ZSGodWeapon.hasData = true;
        if (Model_ZSGodWeapon.godWeoponArr.length <= 0)
            Model_ZSGodWeapon.initcfg();
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var job = data.readByte();
            for (var j = 0; j < Model_ZSGodWeapon.godWeoponArr.length; j++) {
                var vo = Model_ZSGodWeapon.godWeoponArr[j];
                if (vo.job == job) {
                    vo.starLv = data.readInt();
                    vo.equipID = data.readInt();
                    var len1 = data.readShort();
                    vo.bodyIDArr = [];
                    vo.tunshiArr = [0, 0, 0];
                    for (var n = 0; n < len1; n++) {
                        var body = data.readInt();
                        vo.bodyIDArr.push(body);
                    }
                    var len2 = data.readShort();
                    for (var n = 0; n < len2; n++) {
                        var type = data.readInt();
                        var count = data.readInt();
                        vo.tunshiArr[type - 1] = count;
                    }
                    var zsLv = data.readInt();
                    var clLv = data.readInt();
                    vo.clExp = data.readInt();
                    vo.initZhuanShu(zsLv);
                    vo.initCuiLian(clLv);
                    Model_ZSGodWeapon.godWeaponDic[job] = vo.equipID;
                    break;
                }
            }
        }
        Model_ZSGodWeapon.hightNum = data.readByte();
        Model_ZSGodWeapon.dazaoNum = data.readInt();
        Model_ZSGodWeapon.qishu = data.readInt();
        GGlobal.control.notify(UIConst.ZS_GODWEAPON);
    };
    /**7851 B CG 激活/升星 专属神兵 B:武将type*/
    Model_ZSGodWeapon.prototype.CG_GodWeapon_upstar_7851 = function (job) {
        var bates = this.getBytes();
        bates.writeByte(job);
        this.sendSocket(7851, bates);
    };
    /**7852 B-B-I GC 激活/升星 返回 B:0成功 1失败 2材料不足 3对应武将没有激活restB:武将类型typeI:当前专属神兵星级star*/
    Model_ZSGodWeapon.prototype.GC_GodWeapon_upstar_7852 = function (self, data) {
        var result = data.readByte();
        if (result == 0) {
            var job = data.readByte();
            var starLv = data.readInt();
            for (var i = 0; i < Model_ZSGodWeapon.godWeoponArr.length; i++) {
                var vo = Model_ZSGodWeapon.godWeoponArr[i];
                if (vo.job == job) {
                    vo.starLv = starLv;
                    break;
                }
            }
            GGlobal.control.notify(UIConst.ZS_GODWEAPON);
        }
    };
    /**7853 B-I CG 穿戴神兵 B:类型typeI:神兵id(x00x) 0脱下weapon*/
    Model_ZSGodWeapon.prototype.CG_GodWeapon_wear_7853 = function (arg1, arg2) {
        var bates = this.getBytes();
        bates.writeByte(arg1);
        bates.writeInt(arg2);
        this.sendSocket(7853, bates);
    };
    /**7854 B-B-I GC 穿戴专属神兵返回 B:0成功 1失败restB:武将类型typeI:神兵idweaponid*/
    Model_ZSGodWeapon.prototype.GC_GodWeapon_wear_7854 = function (self, data) {
        var result = data.readByte();
        if (result == 0) {
            var job = data.readByte();
            var equipID = data.readInt();
            if (job == Model_player.voMine.job) {
                Model_player.voMine.setGodWeapon(equipID);
            }
            Model_ZSGodWeapon.godWeaponDic[job] = equipID;
            for (var i = 0; i < Model_ZSGodWeapon.godWeoponArr.length; i++) {
                var vo = Model_ZSGodWeapon.godWeoponArr[i];
                if (vo.job == job) {
                    vo.equipID = equipID;
                    break;
                }
            }
            GGlobal.control.notify(UIConst.ZS_GODWEAPON);
        }
    };
    /**7855 B-B-B CG 神铸 B:武将类型typeB:类型（1-3 神铁、陨铁 玄铁）type1B:神铸方式 0单次 1一键type2*/
    Model_ZSGodWeapon.prototype.CG_GodWeapon_godForge_7855 = function (arg1, arg2, arg3) {
        var bates = this.getBytes();
        bates.writeByte(arg1);
        bates.writeByte(arg2);
        bates.writeByte(arg3);
        this.sendSocket(7855, bates);
    };
    /**7856 B-B-B-I GC 神铸返回 B:0成功 1失败restB:武将类型typeB:神铸类型type1I:已经吞噬个数num*/
    Model_ZSGodWeapon.prototype.GC_GodWeapon_godForge_7856 = function (self, data) {
        var result = data.readByte();
        if (result == 0) {
            var job = data.readByte();
            var type = data.readByte();
            var count = data.readInt();
            for (var i = 0; i < Model_ZSGodWeapon.godWeoponArr.length; i++) {
                var vo = Model_ZSGodWeapon.godWeoponArr[i];
                if (vo.job == job) {
                    vo.tunshiArr[type - 1] = count;
                    GGlobal.control.notify(UIConst.ZS_GODWEAPON_DAN, vo);
                    break;
                }
            }
            GGlobal.control.notify(UIConst.ZS_GODWEAPON);
        }
    };
    /**7857 B CG 激活/升级专属神兵等级 B:武将类型type*/
    Model_ZSGodWeapon.prototype.CG_GodWeapon_actzhuanshuLv_7857 = function (arg1) {
        var bates = this.getBytes();
        bates.writeByte(arg1);
        this.sendSocket(7857, bates);
    };
    /**7858 B-B-I GC激活/升级专属神兵等级返回 B:0成功1失败restB:武将类型typeI:专属神兵等级lv*/
    Model_ZSGodWeapon.prototype.GC_GodWeapon_actzhuanshuLv_7858 = function (self, data) {
        var result = data.readByte();
        if (result == 0) {
            var job = data.readByte();
            var zsLv = data.readInt();
            for (var i = 0; i < Model_ZSGodWeapon.godWeoponArr.length; i++) {
                var vo = Model_ZSGodWeapon.godWeoponArr[i];
                if (vo.job == job) {
                    vo.initZhuanShu(zsLv);
                    break;
                }
            }
            GGlobal.control.notify(UIConst.ZS_GODWEAPON);
        }
    };
    /**7859 B CG升级神兵淬炼等级 B:武将类型typeB:淬炼类型 0单次 1一键*/
    Model_ZSGodWeapon.prototype.CG_GodWeapon_upcuilianlv_7859 = function (arg1, type) {
        var bates = this.getBytes();
        bates.writeByte(arg1);
        bates.writeByte(type);
        this.sendSocket(7859, bates);
    };
    /**7860 B-B-I GC 升级淬炼等级 B:0成功 1失败restB:武将类型typeB:淬炼方式01次 1一键I:淬炼等级lvI:淬炼经验*/
    Model_ZSGodWeapon.prototype.GC_GodWeapon_upcuilianlv_7860 = function (self, data) {
        var result = data.readByte();
        if (result == 0) {
            var job = data.readByte();
            var type = data.readByte();
            var clLv = data.readInt();
            var exp = data.readInt();
            for (var i = 0; i < Model_ZSGodWeapon.godWeoponArr.length; i++) {
                var vo = Model_ZSGodWeapon.godWeoponArr[i];
                if (vo.job == job) {
                    vo.clExp = exp;
                    vo.initCuiLian(clLv);
                    break;
                }
            }
            GGlobal.control.notify(UIConst.ZS_GODWEAPON);
        }
    };
    /**7862 B-I GC 激活新的武器模型 B:类型typeI:武器索引weaponid*/
    Model_ZSGodWeapon.prototype.GC_GodWeapon_addFashion_7862 = function (self, data) {
        var job = data.readByte();
        var weaponID = data.readInt();
        for (var i = 0; i < Model_ZSGodWeapon.godWeoponArr.length; i++) {
            var vo = Model_ZSGodWeapon.godWeoponArr[i];
            if (vo.job == job) {
                vo.bodyIDArr.push(weaponID);
                if (weaponID != vo.cfg.bianhao) {
                    GGlobal.layerMgr.open(UIConst.ZS_GODWEAPON_BODY_SHOW, vo);
                }
                break;
            }
        }
        GGlobal.control.notify(UIConst.ZS_GODWEAPON);
    };
    /**7863 B CG 锻造神兵 B:0 1次 1 十次typeB:用的锤子类型 0工匠 1神匠*/
    Model_ZSGodWeapon.prototype.CG_GodWeapon_makeWuqi_7863 = function (type, type1) {
        var bates = this.getBytes();
        bates.writeByte(type);
        bates.writeByte(type1);
        this.sendSocket(7863, bates);
        Model_ZSGodWeapon.type = type;
    };
    /**GC GC 锻造神兵结果 B:锻造返回0成功 1元宝不足 2B:0工匠锤 1神匠锤[B:奖励类型I:奖励idI:奖励数量B:是否大奖]B:必得高级道具剩余次数I:工匠锤次数I:期数*/
    Model_ZSGodWeapon.prototype.GC_GodWeapon_makeWuqi_7864 = function (self, data) {
        var result = data.readByte();
        if (result == 0) {
            var type = data.readByte();
            var len = data.readShort();
            var dropArr = [];
            for (var i = 0; i < len; i++) {
                dropArr.push({ item: ConfigHelp.parseItemBa(data), isBig: data.readByte() });
            }
            Model_ZSGodWeapon.hightNum = data.readByte();
            Model_ZSGodWeapon.dazaoNum = data.readInt();
            Model_ZSGodWeapon.qishu = data.readInt();
            if (Model_ZSGodWeapon.skipTween) {
                GGlobal.layerMgr.open(UIConst.ZS_GODWEAPON_REWARD, { dropArr: dropArr, type: type });
            }
            else {
                GGlobal.control.notify(UIConst.ZS_GODWEAPON_DUANZAO, { dropArr: dropArr, type: type });
            }
            GGlobal.control.notify(UIConst.ZS_GODWEAPON);
            var vo = GGlobal.modelActivity.getActivityByID(UIConst.ACTCOM_SBZK);
            if (vo && type == 0) {
                if (Model_ZSGodWeapon.type == 0) {
                    GGlobal.model_actCom.forgeNum++;
                }
                else {
                    GGlobal.model_actCom.forgeNum += 10;
                }
                GGlobal.control.notify(UIConst.ACTCOM_SBZK);
            }
        }
    };
    /*7871	 打开专属神兵ui**/
    Model_ZSGodWeapon.prototype.CG_OPENUI_7871 = function () {
        var bates = this.getBytes();
        this.sendSocket(7871, bates);
    };
    /**
     * 根据次数获取神兵折扣表数据
     */
    Model_ZSGodWeapon.getIsbzk_281 = function (count) {
        var cfg1;
        var cfg;
        for (var key in Config.sbzk_281) {
            cfg = Config.sbzk_281[key];
            var arr = JSON.parse(cfg.time);
            if (count >= arr[0][0]) {
                cfg1 = cfg;
            }
        }
        return cfg1;
    };
    Model_ZSGodWeapon.danIDArr = [410087, 410088, 410089];
    Model_ZSGodWeapon.cuiLianDan = 411010;
    Model_ZSGodWeapon.cuiLianExp = 10;
    Model_ZSGodWeapon.qishu = 1;
    Model_ZSGodWeapon.duanzaoC = 410085;
    Model_ZSGodWeapon.shenjiangC = 410086;
    Model_ZSGodWeapon.dazaoNum = 0;
    Model_ZSGodWeapon.skipTween = false;
    Model_ZSGodWeapon.godWeoponArr = [];
    Model_ZSGodWeapon.godWeaponDic = {};
    Model_ZSGodWeapon.selectJob = 0;
    Model_ZSGodWeapon.type = 0;
    /**材料到英雄的映射 */
    Model_ZSGodWeapon.matToGodWeapon = {};
    Model_ZSGodWeapon.daZaoArr = [];
    Model_ZSGodWeapon.hasData = false;
    Model_ZSGodWeapon.hightNum = 0;
    return Model_ZSGodWeapon;
}(BaseModel));
__reflect(Model_ZSGodWeapon.prototype, "Model_ZSGodWeapon");
