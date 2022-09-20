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
var ModelGodWuJiang = (function (_super) {
    __extends(ModelGodWuJiang, _super);
    function ModelGodWuJiang() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = {};
        /**677  获取神将信息 */
        _this.CG_WuJiang_getShenJiang_677 = function () {
            var bates = _this.getBytes();
            _this.sendSocket(677, bates);
        };
        /**678 [I-I-I] 神将信息返回 [I:神将类型I:神将修炼等级I:神将天赋等级]shenjiangs*/
        _this.GC_WuJiang_getShenJiang_678 = function (self, data) {
            var len = data.readShort();
            for (var i = 0; i < len; i++) {
                var arg1 = data.readInt();
                var arg2 = data.readInt();
                var arg3 = data.readInt();
                self.data[arg1] = { tfLv: arg3, xiulianLv: arg2 };
            }
            self.checkMainBtnNotice();
            GGlobal.control.notify(UIConst.WU_JIANG);
        };
        /**679 B 神将激活 B:神将编号type*/
        _this.CG_WuJiang_shenJiangJiHuo_679 = function (arg1) {
            var bates = _this.getBytes();
            bates.writeByte(arg1);
            _this.sendSocket(679, bates);
        };
        /**680 B-B 神将激活返回 B:0.失败 1.成功stateB:神将编号type*/
        _this.GC_WuJiang_shenJiangJiHuo_680 = function (self, data) {
            var arg1 = data.readByte();
            if (arg1 == 1) {
                ViewCommonWarn.text("激活成功");
                var arg2 = data.readByte();
                self.data[arg2] = { tfLv: 1, xiulianLv: 8000 };
                if (arg2 == Model_player.voMine.job) {
                    for (var i = 0; i < Model_player.voMine.skillList.length; i++) {
                        Model_player.voMine.skillList[i].starLv = ModelGodWuJiang.wuJiangStar(arg2);
                        Model_player.voMine.skillList[i].updatePower();
                    }
                }
                self.checkMainBtnNotice();
                GGlobal.control.notify(UIConst.WU_JIANG);
            }
            else {
                ViewCommonWarn.text("激活失败");
            }
        };
        /**681 B 突破/升级神将等级 B:神将编号type*/
        _this.CG_WuJiang_upShenJiangLv_681 = function (arg1) {
            var bates = _this.getBytes();
            bates.writeByte(arg1);
            _this.sendSocket(681, bates);
        };
        /**682 B-B-I 突破/升级神将等级返回 B:1.成功 0.失败stateB:神将编号typeI:修炼等级level*/
        _this.GC_WuJiang_upShenJiangLv_682 = function (self, data) {
            var ret = data.readByte();
            if (ret == 1) {
                var arg2 = data.readByte();
                var level = data.readInt();
                self.data[arg2].xiulianLv = level;
                if (arg2 == Model_player.voMine.job) {
                    for (var i = 0; i < Model_player.voMine.skillList.length; i++) {
                        Model_player.voMine.skillList[i].starLv = ModelGodWuJiang.wuJiangStar(arg2);
                        Model_player.voMine.skillList[i].updatePower();
                    }
                }
                self.checkMainBtnNotice();
                GGlobal.control.notify(UIConst.WU_JIANG);
            }
            else {
                ViewCommonWarn.text("升级失败");
            }
        };
        /**683 B 升级神将天赋 B:神将编号type*/
        _this.CG_WuJiang_upShenJiangTf_683 = function (arg1) {
            var bates = _this.getBytes();
            bates.writeByte(arg1);
            _this.sendSocket(683, bates);
        };
        /**684 B-B-I 升级神将天赋返回 B:1.成功 0.失败stateB:神将编号typeI:天赋等级tfLevel*/
        _this.GC_WuJiang_upShenJiangTf_684 = function (self, data) {
            var arg1 = data.readByte();
            var arg2 = data.readByte();
            var level = data.readInt();
            if (arg1 == 1) {
                self.data[arg2].tfLv = level;
                self.checkMainBtnNotice();
                GGlobal.control.notify(UIConst.WU_JIANG);
                ViewCommonWarn.text("升级成功");
            }
            else {
                ViewCommonWarn.text("升级失败");
            }
        };
        return _this;
    }
    /**传入职业获取天赋等级*/
    ModelGodWuJiang.getTianFuLevel = function (job) {
        if (!GGlobal.modelGodWuJiang.data[job]) {
            return 1;
        }
        return GGlobal.modelGodWuJiang.data[job].tfLv;
    };
    /**传入职业获取天赋等级*/
    ModelGodWuJiang.getXiuLianLevel = function (job) {
        if (!GGlobal.modelGodWuJiang.data[job]) {
            return 8000;
        }
        return GGlobal.modelGodWuJiang.data[job].xiulianLv;
    };
    /**传入职业 获取神将星级*/
    ModelGodWuJiang.wuJiangStar = function (job) {
        if (!GGlobal.modelGodWuJiang.data[job]) {
            return 0;
        }
        return (((GGlobal.modelGodWuJiang.data[job].xiulianLv % 1000) / 10) >> 0) + 1;
    };
    ModelGodWuJiang.getXiuLianStr = function (id) {
        id = id % 1000;
        return ((id / 10) >> 0) + "重" + id % 10 + "阶";
    };
    //将修炼重数转为武将星级
    ModelGodWuJiang.conversionToStar = function (id) {
        id = id % 1000;
        return ((id / 10) + 1) >> 0;
    };
    //是否已激活
    ModelGodWuJiang.getWuJiangIsActivation = function (type) {
        if (GGlobal.modelGodWuJiang.data[type])
            return 1;
        return 0;
    };
    Object.defineProperty(ModelGodWuJiang, "wuJiangArr", {
        get: function () {
            if (ModelGodWuJiang._wuJiangArr == null) {
                ModelGodWuJiang.initWuJiang();
            }
            return ModelGodWuJiang._wuJiangArr;
        },
        enumerable: true,
        configurable: true
    });
    //是否已经开放觉醒功能
    ModelGodWuJiang.isOpenJueXing = function () {
        var data = ModelGodWuJiang.wuJiangArr;
        for (var i = 0; i < data.length; i++) {
            var level = ModelGodWuJiang.getXiuLianLevel(data[i].type);
            if (level == ModelGodWuJiang.maxXiulianLevel) {
                return true;
            }
        }
        return false;
    };
    ModelGodWuJiang.initWuJiang = function () {
        ModelGodWuJiang._wuJiangArr = [];
        for (var keys in Config.hero_211) {
            var v = Config.hero_211[keys];
            if (v.pinzhi < 8) {
                continue; //不显示普通武将
            }
            ModelGodWuJiang._wuJiangArr.push(v);
        }
    };
    Object.defineProperty(ModelGodWuJiang, "maxXiulianLevel", {
        get: function () {
            if (ModelGodWuJiang._maxXiulianLevel == 0) {
                var cfg = Config.godheroxl_289;
                for (var i in cfg) {
                    if (cfg[i].lv > ModelGodWuJiang._maxXiulianLevel) {
                        ModelGodWuJiang._maxXiulianLevel = cfg[i].lv;
                    }
                }
            }
            return ModelGodWuJiang._maxXiulianLevel;
        },
        enumerable: true,
        configurable: true
    });
    ModelGodWuJiang.prototype.checkMainBtnNotice = function () {
        var r = GGlobal.reddot;
        var self = this;
        var data = self.data;
        var wujiangarr = ModelGodWuJiang.wuJiangArr;
        //是否有可激活的
        var ret = false;
        for (var i in wujiangarr) {
            ret = ModelGodWuJiang.checkJiHuoNotice(wujiangarr[i].type);
            if (ret) {
                break;
            }
        }
        r.setCondition(UIConst.GOD_WUJIANG, 0, ret);
        //是否有可修炼的
        ret = false;
        for (var i in data) {
            ret = ModelGodWuJiang.checkXiulianNotice(i);
            if (ret) {
                break;
            }
        }
        r.setCondition(UIConst.GOD_WUJIANG, 1, ret);
        //是否有可升级天赋的
        ret = false;
        for (var i in data) {
            var id = i;
            var xiulian = data[i].xiulianLv;
            var xiuliancfg = Config.godheroxl_289[xiulian];
            var tianfu = data[i].tfLv;
            var max = xiuliancfg.max;
            if (tianfu >= max) {
                continue;
            }
            var item = Config.godherotf_289[tianfu];
            ret = ConfigHelp.checkEnough(item.conmuse, false);
            if (ret) {
                break;
            }
        }
        r.setCondition(UIConst.GOD_WUJIANG, 2, ret);
        r.notify(UIConst.GOD_WUJIANG);
    };
    ModelGodWuJiang.prototype.listenServ = function (mgr) {
        this.socket = mgr;
        mgr.regHand(678, this.GC_WuJiang_getShenJiang_678, this);
        mgr.regHand(680, this.GC_WuJiang_shenJiangJiHuo_680, this);
        mgr.regHand(682, this.GC_WuJiang_upShenJiangLv_682, this);
        mgr.regHand(684, this.GC_WuJiang_upShenJiangTf_684, this);
    };
    ModelGodWuJiang.getGodDataByID = function (id) {
        if (!GGlobal.modelGodWuJiang.data[id]) {
            return { tfLv: 1, xiulianLv: 8000 };
        }
        return GGlobal.modelGodWuJiang.data[id];
    };
    //检测是否可激活
    ModelGodWuJiang.checkJiHuoNotice = function (type) {
        if (GGlobal.modelGodWuJiang.data[type]) {
            return false;
        }
        var vo = Config.hero_211[type];
        var totalStar = Model_WuJiang.getQuilityTotalStar(7) + Model_WuJiang.getQuilityTotalStar(6);
        var _star_OK = totalStar >= vo.jh;
        var itemCFG = JSON.parse(vo.activation);
        var itemId = itemCFG[0][1];
        var itemName = ConfigHelp.getItemColorName(itemId);
        var itemNum = Model_Bag.getItemCount(itemId);
        var _item_OK = itemNum >= itemCFG[0][2];
        return _star_OK && _item_OK;
    };
    //检测是否可修炼
    ModelGodWuJiang.checkXiulianNotice = function (type) {
        var data = GGlobal.modelGodWuJiang.data;
        if (!data || !data[type]) {
            return false;
        }
        var lv = data[type].xiulianLv;
        var cfg = Config.godheroxl_289[lv];
        if (cfg.next == 0) {
            return false;
        }
        var item;
        var needCount;
        var hero = Config.hero_211[type];
        if (cfg.conmuse == "0") {
            item = JSON.parse(hero.activation);
            needCount = cfg.tp;
        }
        else {
            item = JSON.parse(cfg.conmuse);
            needCount = item[0][2];
        }
        var itemid = item[0][1];
        var hasCount = Model_Bag.getItemCount(itemid);
        return hasCount >= needCount;
    };
    //最高修炼等级
    ModelGodWuJiang._maxXiulianLevel = 0;
    return ModelGodWuJiang;
}(BaseModel));
__reflect(ModelGodWuJiang.prototype, "ModelGodWuJiang");
