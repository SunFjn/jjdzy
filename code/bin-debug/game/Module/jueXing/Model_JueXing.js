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
var Model_JueXing = (function (_super) {
    __extends(Model_JueXing, _super);
    function Model_JueXing() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Model_JueXing.sortJueXing = function (a, b) {
        if (a.quality == b.quality) {
            return a.id - b.id;
        }
        else {
            return b.quality - a.quality;
        }
    };
    /** 1武将2宝物3神剑4异宝5天书6兵法7战甲8神将*/
    Model_JueXing.checkIconNotice = function (type) {
        var ret = false;
        if (Model_JueXing.jueXingData[type]) {
            Model_JueXing.getJueXingData(Model_JueXing.panelIDArr[type]);
            var arr = Model_JueXing.jueXingData[type];
            for (var i = 0; i < arr.length; i++) {
                ret = Model_JueXing.checkGridNotice(arr[i]);
                if (ret)
                    break;
            }
        }
        else {
            ret = GGlobal.reddot.checkCondition(UIConst.JUEXING, type - 1);
        }
        return ret;
    };
    Model_JueXing.checkGridNotice = function (vo) {
        var ret = false;
        for (var i = 0; i < 3; i++) {
            ret = Model_JueXing.checkJueXingBtNotice(vo, i);
            if (ret)
                break;
        }
        if (!ret) {
            var index = 0;
            var suitcfg = Config.jxzl_271[vo.quality * 100 + vo.suitLv];
            if (suitcfg.lv != suitcfg.max) {
                if (vo.skilllv0 % 1000 >= suitcfg.max) {
                    index++;
                }
                if (vo.skilllv1 % 1000 >= suitcfg.max) {
                    index++;
                }
                if (vo.skilllv2 % 1000 >= suitcfg.max) {
                    index++;
                }
            }
            ret = index >= 3;
        }
        return ret;
    };
    Model_JueXing.checkJueXingBtNotice = function (vo, index) {
        var suitcfg = Config.jxzl_271[vo.quality * 100 + vo.suitLv];
        var cfg = Config.jx_271[vo["skilllv" + index]];
        if (cfg.next > 0) {
            var count = Model_Bag.getItemCount(vo.costId);
            return count >= cfg.consume && vo["skilllv" + index] % 1000 < suitcfg.max;
        }
        return false;
    };
    Model_JueXing.getJueXingData = function (panelID) {
        var arr = Model_JueXing.jueXingData[Model_JueXing.panelIDArr.indexOf(panelID)];
        if (!arr) {
            arr = [];
        }
        switch (panelID) {
            case UIConst.BAOWU:
                for (var i = 0; i < Model_BaoWu.baowuArr.length; i++) {
                    var vo = Model_BaoWu.baowuArr[i];
                    if (vo.starLv >= vo.starMax) {
                        var index = 0;
                        for (var j = 0; j < arr.length; j++) {
                            if (arr[j].id == vo.id) {
                                index++;
                                break;
                            }
                        }
                        if (index == 0) {
                            var juexingVo = Vo_JueXing.create(vo.id, vo.quality, vo.icon, vo.name, vo.costArr[0][1], vo.starLv, vo.imageID, 0);
                            juexingVo.skilllv0 = vo.quality * 10000 + 1000;
                            juexingVo.skilllv1 = vo.quality * 10000 + 2000;
                            juexingVo.skilllv2 = vo.quality * 10000 + 3000;
                            juexingVo.suitLv = 0;
                            juexingVo.type = Model_JueXing.panelIDArr.indexOf(panelID);
                            arr.push(juexingVo);
                        }
                    }
                }
                break;
            case UIConst.TIANSHU:
                for (var i = 0; i < GGlobal.modeltianshu.data.length; i++) {
                    var vo = GGlobal.modeltianshu.data[i];
                    if (vo.star >= vo.starMax) {
                        var index = 0;
                        for (var j = 0; j < arr.length; j++) {
                            if (arr[j].id == vo.id) {
                                index++;
                                break;
                            }
                        }
                        if (index == 0) {
                            var juexingVo = Vo_JueXing.create(vo.id, vo.pin, vo.icon, vo.name, JSON.parse(vo.item)[0][1], vo.star, vo.pic, 0);
                            juexingVo.skilllv0 = vo.pin * 10000 + 1000;
                            juexingVo.skilllv1 = vo.pin * 10000 + 2000;
                            juexingVo.skilllv2 = vo.pin * 10000 + 3000;
                            juexingVo.suitLv = 0;
                            juexingVo.type = Model_JueXing.panelIDArr.indexOf(panelID);
                            arr.push(juexingVo);
                        }
                    }
                }
                break;
            case UIConst.SHEN_JIAN:
                for (var i = 0; i < Model_ShenJian.shenjianArr.length; i++) {
                    var vo = Model_ShenJian.shenjianArr[i];
                    if (vo.starLv >= vo.starMax) {
                        var index = 0;
                        for (var j = 0; j < arr.length; j++) {
                            if (arr[j].id == vo.id) {
                                index++;
                                break;
                            }
                        }
                        if (index == 0) {
                            var juexingVo = Vo_JueXing.create(vo.id, vo.quality, vo.icon, vo.name, vo.costArr[0][1], vo.starLv, vo.imageID, vo.cfg.tptx);
                            juexingVo.skilllv0 = vo.quality * 10000 + 1000;
                            juexingVo.skilllv1 = vo.quality * 10000 + 2000;
                            juexingVo.skilllv2 = vo.quality * 10000 + 3000;
                            juexingVo.suitLv = 0;
                            juexingVo.type = Model_JueXing.panelIDArr.indexOf(panelID);
                            arr.push(juexingVo);
                        }
                    }
                }
                break;
            case UIConst.YIBAO:
                for (var i = 0; i < Model_YiBao.YBArr.length; i++) {
                    var vo = Model_YiBao.YBArr[i];
                    if (vo.starLv >= vo.starMax) {
                        var index = 0;
                        for (var j = 0; j < arr.length; j++) {
                            if (arr[j].id == vo.id) {
                                index++;
                                break;
                            }
                        }
                        if (index == 0) {
                            var juexingVo = Vo_JueXing.create(vo.id, vo.quality, vo.icon, vo.name, vo.costArr[0][1], vo.starLv, vo.imageID, vo.cfg.tptx);
                            juexingVo.skilllv0 = vo.quality * 10000 + 1000;
                            juexingVo.skilllv1 = vo.quality * 10000 + 2000;
                            juexingVo.skilllv2 = vo.quality * 10000 + 3000;
                            juexingVo.suitLv = 0;
                            juexingVo.type = Model_JueXing.panelIDArr.indexOf(panelID);
                            arr.push(juexingVo);
                        }
                    }
                }
                break;
            case UIConst.WU_JIANG:
                for (var i = 0; i < Model_WuJiang.wuJiangArr.length; i++) {
                    var vo = Model_WuJiang.wuJiangArr[i];
                    if (Model_WuJiang.wuJiangStar[vo.type] >= vo.star) {
                        var index = 0;
                        for (var j = 0; j < arr.length; j++) {
                            if (arr[j].id == vo.type) {
                                index++;
                                break;
                            }
                        }
                        if (index == 0) {
                            var juexingVo = Vo_JueXing.create(vo.type, vo.pinzhi, vo.head, vo.name, JSON.parse(vo.activation)[0][1], vo.star, vo.pifu, 0);
                            juexingVo.skilllv0 = vo.pinzhi * 10000 + 1000;
                            juexingVo.skilllv1 = vo.pinzhi * 10000 + 2000;
                            juexingVo.skilllv2 = vo.pinzhi * 10000 + 3000;
                            juexingVo.suitLv = 0;
                            juexingVo.type = Model_JueXing.panelIDArr.indexOf(panelID);
                            juexingVo.skills = vo.skills;
                            arr.push(juexingVo);
                        }
                    }
                }
                break;
            case UIConst.BINGFA:
                for (var i = 0; i < GGlobal.modelBingFa.data.length; i++) {
                    var vo = GGlobal.modelBingFa.data[i];
                    if (vo.star >= vo.starMax) {
                        var index = 0;
                        for (var j = 0; j < arr.length; j++) {
                            if (arr[j].id == vo.id) {
                                index++;
                                break;
                            }
                        }
                        if (index == 0) {
                            var juexingVo = Vo_JueXing.create(vo.id, vo.pin, vo.icon, vo.name, vo.item[0][1], vo.star, vo.pic, vo.lib.tptx);
                            juexingVo.skilllv0 = vo.pin * 10000 + 1000;
                            juexingVo.skilllv1 = vo.pin * 10000 + 2000;
                            juexingVo.skilllv2 = vo.pin * 10000 + 3000;
                            juexingVo.suitLv = 0;
                            juexingVo.type = Model_JueXing.panelIDArr.indexOf(panelID);
                            arr.push(juexingVo);
                        }
                    }
                }
                break;
            case UIConst.ZHAN_JIA:
                for (var i = 0; i < Model_ZhanJia.zhanJiaArr.length; i++) {
                    var vo = Model_ZhanJia.zhanJiaArr[i];
                    if (Model_ZhanJia.zhanjiaStar[vo.id] >= vo.star) {
                        var index = 0;
                        for (var j = 0; j < arr.length; j++) {
                            if (arr[j].id == vo.id) {
                                index++;
                                break;
                            }
                        }
                        if (index == 0) {
                            var juexingVo = Vo_JueXing.create(vo.id, vo.pinzhi, vo.icon, vo.name, JSON.parse(vo.item)[0][1], vo.star, vo.pic, vo.tptx);
                            juexingVo.skilllv0 = vo.pinzhi * 10000 + 1000;
                            juexingVo.skilllv1 = vo.pinzhi * 10000 + 2000;
                            juexingVo.skilllv2 = vo.pinzhi * 10000 + 3000;
                            juexingVo.suitLv = 0;
                            juexingVo.type = Model_JueXing.panelIDArr.indexOf(panelID);
                            arr.push(juexingVo);
                        }
                    }
                }
                break;
            case UIConst.GOD_WUJIANG:
                for (var i = 0; i < ModelGodWuJiang.wuJiangArr.length; i++) {
                    var vo = ModelGodWuJiang.wuJiangArr[i];
                    if (ModelGodWuJiang.getXiuLianLevel(vo.type) >= ModelGodWuJiang.maxXiulianLevel) {
                        var index = 0;
                        for (var j = 0; j < arr.length; j++) {
                            if (arr[j].id == vo.type) {
                                index++;
                                break;
                            }
                        }
                        if (index == 0) {
                            var juexingVo = Vo_JueXing.create(vo.type, vo.pinzhi, vo.head, vo.name, JSON.parse(vo.activation)[0][1], vo.star, vo.pifu, 0);
                            juexingVo.skilllv0 = vo.pinzhi * 10000 + 1000;
                            juexingVo.skilllv1 = vo.pinzhi * 10000 + 2000;
                            juexingVo.skilllv2 = vo.pinzhi * 10000 + 3000;
                            juexingVo.suitLv = 0;
                            juexingVo.type = Model_JueXing.panelIDArr.indexOf(panelID);
                            juexingVo.skills = vo.skills;
                            arr.push(juexingVo);
                        }
                    }
                }
                break;
        }
        Model_JueXing.jueXingData[Model_JueXing.panelIDArr.indexOf(panelID)] = arr;
    };
    Model_JueXing.checkOpenJuexing = function (panelID) {
        switch (panelID) {
            case UIConst.BAOWU:
                for (var i = 0; i < Model_BaoWu.baowuArr.length; i++) {
                    var vo = Model_BaoWu.baowuArr[i];
                    if (vo.starLv >= vo.starMax)
                        return true;
                }
                break;
            case UIConst.TIANSHU:
                for (var i = 0; i < GGlobal.modeltianshu.data.length; i++) {
                    var vo = GGlobal.modeltianshu.data[i];
                    if (vo.star >= vo.starMax)
                        return true;
                }
                break;
            case UIConst.SHEN_JIAN:
                for (var i = 0; i < Model_ShenJian.shenjianArr.length; i++) {
                    var vo = Model_ShenJian.shenjianArr[i];
                    if (vo.starLv >= vo.starMax)
                        return true;
                }
                break;
            case UIConst.YIBAO:
                for (var i = 0; i < Model_YiBao.YBArr.length; i++) {
                    var vo = Model_YiBao.YBArr[i];
                    if (vo.starLv >= vo.starMax)
                        return true;
                }
                break;
            case UIConst.WU_JIANG:
                for (var i = 0; i < Model_WuJiang.wuJiangArr.length; i++) {
                    var vo = Model_WuJiang.wuJiangArr[i];
                    if (Model_WuJiang.wuJiangStar[vo.type] >= vo.star)
                        return true;
                }
                break;
            case UIConst.BINGFA:
                for (var i = 0; i < GGlobal.modelBingFa.data.length; i++) {
                    var vo = GGlobal.modelBingFa.data[i];
                    if (vo.star >= vo.starMax)
                        return true;
                }
                break;
            case UIConst.ZHAN_JIA:
                for (var i = 0; i < Model_ZhanJia.zhanJiaArr.length; i++) {
                    var vo = Model_ZhanJia.zhanJiaArr[i];
                    if (Model_ZhanJia.zhanjiaStar[vo.id] >= vo.star)
                        return true;
                }
                break;
            case UIConst.GOD_WUJIANG:
                return ModelGodWuJiang.isOpenJueXing();
        }
        return false;
    };
    /**819	CG获取7系统的觉醒情况1武将2宝物3神剑4异宝5天书6兵法7战甲 B:类型 */
    Model_JueXing.prototype.CG_OPEN_JUEXING_819 = function (type) {
        var ba = new BaseBytes();
        ba.writeByte(type);
        this.sendSocket(819, ba);
    };
    /**821	CG 升级某个系统的某个觉醒技能/或觉醒之力 B:1武将2宝物3神剑4异宝5天书6兵法7战甲I::对应武将/宝物/神剑序号I:1-4:4表示提升觉醒之力 */
    Model_JueXing.prototype.CG_UPGRADE_JUEXING_821 = function (type, id, index) {
        var ba = new BaseBytes();
        ba.writeByte(type);
        ba.writeInt(id);
        ba.writeInt(index);
        this.sendSocket(821, ba);
    };
    /** 注册 WEBSOCKET HANLDER 函数*/
    Model_JueXing.prototype.listenServ = function (wsm) {
        var self = this;
        self.socket = wsm;
        wsm.regHand(820, self.GC_OPEN_JUEXING_820, self);
        wsm.regHand(822, self.GC_UPGRADE_JUEXING_822, self);
    };
    /**822	GC 升级觉醒返回 B:升级结果B:分类I:宝物/武将/战甲idI:技能id/ 觉醒之力（1-4）I:等级 */
    Model_JueXing.prototype.GC_UPGRADE_JUEXING_822 = function (self, data) {
        var result = data.readByte();
        if (result == 0) {
            var type = data.readByte();
            var value = data.readInt();
            var key = data.readInt();
            var level = data.readInt();
            var vo = void 0;
            if (!Model_JueXing.jueXingData[type]) {
                Model_JueXing.jueXingData[type] = [];
                vo = new Vo_JueXing();
                Model_JueXing.jueXingData[type].push(vo);
            }
            else {
                for (var i = 0; i < Model_JueXing.jueXingData[type].length; i++) {
                    if (value == Model_JueXing.jueXingData[type][i].id) {
                        vo = Model_JueXing.jueXingData[type][i];
                        break;
                    }
                }
            }
            if (key != 4) {
                vo["skilllv" + (key - 1)] = vo.quality * 10000 + 1000 * key + level;
            }
            else {
                vo.suitLv = level;
                GGlobal.control.notify(Enum_MsgType.JUEXING_SUIT_UPDATE, vo);
            }
            GGlobal.control.notify(UIConst.JUEXING);
        }
    };
    /**820	GC B:1武将2宝物3神剑4异宝5天书6兵法7战甲[I:对应武将/宝物/神剑序号I:觉醒技能1等级I:觉醒技能2等级I:觉醒技能3等级I:觉醒之力等阶]arr */
    Model_JueXing.prototype.GC_OPEN_JUEXING_820 = function (self, data) {
        var type = data.readByte();
        Model_JueXing.getJueXingData(Model_JueXing.panelIDArr[type]);
        var arr = Model_JueXing.jueXingData[type];
        for (var i = 0, len = data.readShort(); i < len; i++) {
            var id = data.readInt();
            var skilllv0 = data.readInt();
            var skilllv1 = data.readInt();
            var skilllv2 = data.readInt();
            var suitLv = data.readInt();
            for (var j = 0; j < arr.length; j++) {
                if (id == arr[j].id) {
                    arr[j].skilllv0 = skilllv0 + arr[j].quality * 10000 + 1000;
                    arr[j].skilllv1 = skilllv1 + arr[j].quality * 10000 + 2000;
                    arr[j].skilllv2 = skilllv2 + arr[j].quality * 10000 + 3000;
                    arr[j].suitLv = suitLv;
                }
            }
        }
        GGlobal.control.notify(UIConst.JUEXING);
    };
    Model_JueXing.jueXingData = {};
    Model_JueXing.panelIDArr = [0, UIConst.WU_JIANG, UIConst.BAOWU, UIConst.SHEN_JIAN, UIConst.YIBAO, UIConst.TIANSHU, UIConst.BINGFA, UIConst.ZHAN_JIA, UIConst.GOD_WUJIANG];
    return Model_JueXing;
}(BaseModel));
__reflect(Model_JueXing.prototype, "Model_JueXing");
