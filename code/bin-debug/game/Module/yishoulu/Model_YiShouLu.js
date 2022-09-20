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
var Model_YiShouLu = (function (_super) {
    __extends(Model_YiShouLu, _super);
    function Model_YiShouLu() {
        return _super.call(this) || this;
    }
    /**升品红点 */
    Model_YiShouLu.checkTFColorNotice = function () {
        var ret = false;
        for (var i = 0; i < Model_YiShouLu.dataArr.length; i++) {
            var vo = Model_YiShouLu.dataArr[i];
            if (vo.cfg.tianfu == 1 && vo.lvUpId % 1000 != 0) {
                ret = Model_YiShouLu.checkTFColorYiShouNotice(vo);
                if (ret)
                    break;
            }
        }
        return ret;
    };
    /**升品异兽红点 */
    Model_YiShouLu.checkTFColorYiShouNotice = function (vo) {
        var ret = false;
        for (var i = 0; i < vo.equipArr.length; i++) {
            ret = Model_YiShouLu.checkTFColorGridNotice(vo, vo.equipArr[i]);
            if (ret)
                break;
        }
        if (!ret) {
            var cfg = Config.ystf_752[vo.skillLv];
            if (cfg.xj > 0) {
                var index = 0;
                var tiaoJianArr = JSON.parse(cfg.tj);
                for (var i = 0; i < tiaoJianArr.length; i++) {
                    var equipVo = vo.equipArr[Math.floor(tiaoJianArr[i][0] % 10) - 1];
                    if (equipVo.level >= tiaoJianArr[i][1]) {
                        index++;
                    }
                }
                ret = index >= vo.equipArr.length;
            }
        }
        return ret;
    };
    /**升品装备红点 */
    Model_YiShouLu.checkTFColorGridNotice = function (vo, equipVo) {
        var ret = false;
        var curcfg = equipVo.colorcfg;
        if (curcfg.xyp > 0 && equipVo.levelcfg.power != 0) {
            var costArr = ConfigHelp.makeItemListArr(JSON.parse(curcfg.xh));
            var count = Model_Bag.getItemCount(costArr[0].id);
            ret = count >= costArr[0].count;
        }
        return ret;
    };
    Model_YiShouLu.checkTFLevelNotice = function () {
        var ret = false;
        for (var i = 0; i < Model_YiShouLu.dataArr.length; i++) {
            var vo = Model_YiShouLu.dataArr[i];
            if (vo.cfg.tianfu == 1 && vo.lvUpId % 1000 != 0) {
                ret = Model_YiShouLu.checkTFLvYiShouNotice(vo);
                if (ret)
                    break;
            }
        }
        return ret;
    };
    Model_YiShouLu.checkTFLvYiShouNotice = function (vo) {
        var ret = false;
        for (var i = 0; i < vo.equipArr.length; i++) {
            ret = Model_YiShouLu.checkTFLvGridNotice(vo, vo.equipArr[i]);
            if (ret)
                break;
        }
        if (!ret) {
            var cfg = Config.ystf_752[vo.skillLv];
            if (cfg.xj > 0) {
                var index = 0;
                var tiaoJianArr = JSON.parse(cfg.tj);
                for (var i = 0; i < tiaoJianArr.length; i++) {
                    var equipVo = vo.equipArr[Math.floor(tiaoJianArr[i][0] % 10) - 1];
                    if (equipVo.level >= tiaoJianArr[i][1]) {
                        index++;
                    }
                }
                ret = index >= vo.equipArr.length;
            }
        }
        return ret;
    };
    Model_YiShouLu.checkTFLvGridNotice = function (vo, equipVo) {
        var ret = false;
        var curcfg = equipVo.levelcfg;
        if (vo.lvUpId % 1000 != 0 && curcfg.xj > 0) {
            var nextcfg = Config.ystfsj_752[curcfg.xj];
            if (nextcfg.tj <= vo.skillLv % 1000) {
                var itemVo = void 0;
                if (curcfg.jinjie) {
                    itemVo = VoItem.create(equipVo.cfg.daoju);
                    itemVo.count = JSON.parse(curcfg.xiaohao)[0][2];
                }
                else {
                    itemVo = ConfigHelp.makeItemListArr(JSON.parse(curcfg.xiaohao))[0];
                }
                var count = Model_Bag.getItemCount(itemVo.id);
                ret = count >= itemVo.count;
            }
        }
        return ret;
    };
    /**
     * 某个异兽的红点
     */
    Model_YiShouLu.checkYiShouNotice = function (index) {
        var bol = false;
        var yslData = Model_YiShouLu.dataArr[index];
        var costArr;
        var count;
        var curLvCfg = Config.yssj_752[yslData.lvUpId];
        var nextLvCfg = Config.yssj_752[curLvCfg.next];
        if (yslData.lvUpId == (100000 * (index + 1))) {
            costArr = JSON.parse(curLvCfg.jj);
            count = Model_Bag.getItemCount(costArr[0][1]);
            if (count >= costArr[0][2]) {
                return true;
            }
        }
        else if (nextLvCfg) {
            if (yslData.exp >= curLvCfg.exp && curLvCfg.jj != 0) {
                costArr = JSON.parse(curLvCfg.jj);
                count = Model_Bag.getItemCount(costArr[0][1]);
                if (count >= costArr[0][2]) {
                    return true;
                }
            }
            else {
                count = Model_Bag.getItemCount(410092);
                var needCount = (curLvCfg.exp - yslData.exp) / 10;
                if (count >= needCount) {
                    return true;
                }
            }
        }
        return bol;
    };
    /**8401	升品 I:异兽idI:天赋装备id */
    Model_YiShouLu.prototype.CG_YISHOUTF_EQUIP_UPCOLOR = function (yishouID, equipID) {
        var ba = new BaseBytes();
        ba.writeInt(yishouID);
        ba.writeInt(equipID);
        this.sendSocket(8401, ba);
    };
    /**8402	升品结果返回 B:结果：0：失败，1：成功I:失败：（），成功：异兽idI:装备idI:品质id */
    Model_YiShouLu.prototype.GC_YISHOUTF_EQUIP_UPCOLOR = function (self, data) {
        var result = data.readByte();
        if (result == 1) {
            var yishouID = data.readInt();
            var equipID = data.readInt();
            var color = data.readInt();
            var tfData = Model_YiShouLu.dataArr;
            for (var i = 0; i < tfData.length; i++) {
                if (yishouID == tfData[i].ysId) {
                    var equipArr = tfData[i].equipArr;
                    for (var j = 0; j < equipArr.length; j++) {
                        if (equipArr[j].cfg.id == equipID) {
                            equipArr[j].setColor(color);
                            break;
                        }
                    }
                    break;
                }
            }
            GGlobal.control.notify(UIConst.YISHOULU_TF);
        }
    };
    /**8399	升级天赋装备 I:异兽idI:装备id */
    Model_YiShouLu.prototype.CG_YISHOUTF_EQUIP_UPLV = function (yishouID, equipID) {
        var ba = new BaseBytes();
        ba.writeInt(yishouID);
        ba.writeInt(equipID);
        this.sendSocket(8399, ba);
    };
    /**8400	升级天赋装备返回 B:结果：0：失败，1：成功I:失败：（1：道具不足，2：已达最大等级），成功：异兽idI:装备idI:装备等级 */
    Model_YiShouLu.prototype.GC_YISHOUTF_EQUIP_UPLV = function (self, data) {
        var result = data.readByte();
        var yishouID = data.readInt();
        if (result == 1) {
            var equipID = data.readInt();
            var level = data.readInt();
            var tfData = Model_YiShouLu.dataArr;
            for (var i = 0; i < tfData.length; i++) {
                if (yishouID == tfData[i].ysId) {
                    var equipArr = tfData[i].equipArr;
                    for (var j = 0; j < equipArr.length; j++) {
                        if (equipArr[j].cfg.id == equipID) {
                            equipArr[j].setLevel(level);
                            break;
                        }
                    }
                    break;
                }
            }
            GGlobal.control.notify(UIConst.YISHOULU_TF);
        }
        else if (result == 0) {
            switch (yishouID) {
                case 1:
                    ViewCommonWarn.text("道具不足");
                    break;
                case 2:
                    ViewCommonWarn.text("已达最大等级");
                    break;
                case 3:
                    ViewCommonWarn.text("天赋技能等级未满足条件");
                    break;
            }
        }
    };
    /**8397	升级天赋技能 I:异兽id */
    Model_YiShouLu.prototype.CG_YISHOUTF_UPSKILLLV = function (yishouID) {
        var ba = new BaseBytes();
        ba.writeInt(yishouID);
        this.sendSocket(8397, ba);
    };
    /**8398	升级结果返回 B:结果：0：失败，1：成功I:失败：（1：未满足条件），成功：异兽idI:天赋技能id */
    Model_YiShouLu.prototype.GC_YISHOUTF_UPSKILLLV = function (self, data) {
        var result = data.readByte();
        if (result == 1) {
            var ysID = data.readInt();
            var skillID = data.readInt();
            var tfData = Model_YiShouLu.dataArr;
            for (var i = 0; i < tfData.length; i++) {
                if (ysID == tfData[i].ysId) {
                    tfData[i].skillLv = skillID;
                    break;
                }
            }
            GGlobal.control.notify(UIConst.YISHOULU_TF);
        }
    };
    /**8395	请求异兽天赋信息 */
    Model_YiShouLu.prototype.CG_OPENYISHOW_TF = function () {
        this.sendSocket(8395, new BaseBytes());
    };
    /**8396	返回异兽天赋界面信息 [I:异兽idI:天赋技能id[I:天赋装备idI:装备等级I:装备品质]]异兽天赋数据 */
    Model_YiShouLu.prototype.GC_OPENYISHOW_TF = function (self, data) {
        Model_YiShouLu.hasTFData = true;
        var tfData = Model_YiShouLu.dataArr;
        if (tfData.length <= 0)
            return;
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var yiShouID = data.readInt();
            var skillID = data.readInt();
            var len1 = data.readShort();
            var vo = void 0;
            for (var j = 0; j < tfData.length; j++) {
                if (yiShouID == tfData[j].ysId) {
                    vo = tfData[j];
                    break;
                }
            }
            vo.skillLv = skillID;
            for (var n = 0; n < len1; n++) {
                var equipID = data.readInt();
                var equipLv = data.readInt();
                var color = data.readInt();
                for (var m = 0; m < vo.equipArr.length; m++) {
                    if (equipID == vo.equipArr[m].cfg.id) {
                        vo.equipArr[m].setLevel(equipLv);
                        vo.equipArr[m].setColor(color);
                        break;
                    }
                }
            }
        }
        GGlobal.control.notify(UIConst.YISHOULU_TF);
    };
    /**8391	CG 打开界面 */
    Model_YiShouLu.prototype.CG_OPEN_UI = function () {
        this.sendSocket(8391, new BaseBytes());
    };
    /**8393	CG 激活或升级 B:异兽idB:type：0：激活，1：升级，2：一键升级，进阶 */
    Model_YiShouLu.prototype.CG_ACTIVEORUPLV = function (id, type, index) {
        var ba = new BaseBytes();
        ba.writeByte(id);
        ba.writeByte(type);
        this.sendSocket(8393, ba);
        Model_YiShouLu.id = id;
        Model_YiShouLu.index = index;
    };
    /** 注册 WEBSOCKET HANLDER 函数*/
    Model_YiShouLu.prototype.listenServ = function (wsm) {
        var self = this;
        self.socket = wsm;
        wsm.regHand(8392, self.GC_OPEN_UI, self);
        wsm.regHand(8394, self.GC_ACTIVEORUPLV, self);
        //异兽天赋
        wsm.regHand(8396, self.GC_OPENYISHOW_TF, self);
        wsm.regHand(8398, self.GC_YISHOUTF_UPSKILLLV, self);
        wsm.regHand(8400, self.GC_YISHOUTF_EQUIP_UPLV, self);
        wsm.regHand(8402, self.GC_YISHOUTF_EQUIP_UPCOLOR, self);
    };
    /**8392	GC 	打开界面返回 [B:异兽idI:异兽录升级表等级lvI:当前经验I:异兽录套装表等级lvI:阶数]异兽录列表 */
    Model_YiShouLu.prototype.GC_OPEN_UI = function (self, data) {
        Model_YiShouLu.dataArr = [];
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var yslData = new Vo_YSLData();
            yslData.initDate(data);
            Model_YiShouLu.dataArr.push(yslData);
        }
        self.redState();
        GGlobal.control.notify(UIConst.YISHOULU);
    };
    /**8394	GC 	激活或升级返回 B:状态：1：成功，2：已达最高级，3：道具不足I:异兽录升级表等级lvI:当前经验I:异兽录套装表等级lvI:阶数 */
    Model_YiShouLu.prototype.GC_ACTIVEORUPLV = function (self, data) {
        var ret = data.readByte();
        if (ret == 1) {
            var isSend = false;
            for (var i = 0; i < Model_YiShouLu.dataArr.length; i++) {
                var yslData = Model_YiShouLu.dataArr[i];
                if (yslData.ysId == Model_YiShouLu.id) {
                    if (yslData.lvUpId % 1000 == 0) {
                        isSend = true;
                    }
                    yslData.lvUpId = data.readInt();
                    yslData.exp = data.readInt();
                    yslData.suitId = data.readInt();
                    yslData.jie = data.readInt();
                    self.redState();
                    GGlobal.control.notify(UIConst.YISHOULU, yslData);
                    break;
                }
            }
            if (isSend)
                GGlobal.control.notify(UIConst.YISHOULU_TF);
        }
    };
    /**红点状态 */
    Model_YiShouLu.prototype.redState = function () {
        var bol = false;
        for (var i = 0; i < 8; i++) {
            bol = Model_YiShouLu.checkYiShouNotice(i);
            if (bol) {
                break;
            }
        }
        GGlobal.reddot.setCondition(UIConst.YISHOULU, 0, bol);
    };
    Model_YiShouLu.hasTFData = false;
    Model_YiShouLu.id = 0;
    Model_YiShouLu.index = 0;
    Model_YiShouLu.dataArr = []; //数据数组
    return Model_YiShouLu;
}(BaseModel));
__reflect(Model_YiShouLu.prototype, "Model_YiShouLu");
