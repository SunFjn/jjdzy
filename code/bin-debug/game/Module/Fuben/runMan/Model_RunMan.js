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
var Model_RunMan = (function (_super) {
    __extends(Model_RunMan, _super);
    function Model_RunMan() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**打开过关斩将ui */
    Model_RunMan.prototype.CG_OPENUI = function () {
        var bates = this.getBytes();
        this.sendSocket(1551, bates);
    };
    /**选择关卡难度挑战 B:难度*/
    Model_RunMan.prototype.CG_BattleType = function (type) {
        var bates = this.getBytes();
        bates.writeByte(type);
        this.sendSocket(1553, bates);
    };
    /**获取某类关卡奖励 B:关卡难度类型*/
    Model_RunMan.prototype.CG_GetReward = function (type) {
        var bates = this.getBytes();
        bates.writeByte(type);
        this.sendSocket(1555, bates);
    };
    /**扫荡过关斩将 B:副本难度*/
    Model_RunMan.prototype.CG_OneKey = function (type) {
        var bates = this.getBytes();
        bates.writeByte(type);
        this.sendSocket(1557, bates);
    };
    //协议处理
    Model_RunMan.prototype.listenServ = function (mgr) {
        this.socket = mgr;
        mgr.regHand(1552, this.GC_OPENUI, this);
        mgr.regHand(1554, this.GC_BATTLE_TYPE, this);
        mgr.regHand(1556, this.GC_GETREWARD, this);
        mgr.regHand(1558, this.GC_ONEKEY, this);
    };
    // public static maxType: number = 0;//最高难度
    // public static rewardArr
    //过关斩将通关信息 [B:副本难度type1-4I:本日已通关idI:历史最高层id]
    Model_RunMan.prototype.GC_OPENUI = function (self, data) {
        var len = data.readShort();
        // Model_RunMan.maxType = 0;
        for (var i = 0; i < len; i++) {
            var info = new VoRunManInfo();
            info.type = data.readByte(); //副本难度
            info.layerId = data.readInt(); //本日已通关id
            info.layerMaxId = data.readInt(); //历史最高层id
            // if (info.layerMaxId % 1000 >= 100) {
            // 	Model_RunMan.maxType = info.type
            // }
            Model_RunMan.layerInfo[info.type - 1] = info;
        }
        // Model_RunMan.maxType++
        // if(Model_RunMan.maxType > 4){//最高已通关
        // 	Model_RunMan.maxType = 4;
        // }
        GGlobal.control.notify(Enum_MsgType.RUNMAN_OPENUI);
    };
    //关卡挑战难度 B:0成功 1失败B:难度B:战斗结果0:失败，1：成功，2：以前端结果为准I:关卡id
    Model_RunMan.prototype.GC_BATTLE_TYPE = function (self, data) {
        var result = data.readByte();
        if (result == 0) {
            Model_RunMan.battleType = data.readByte();
            Model_RunMan.battleRes = data.readByte() + 1;
            Model_RunMan.battleLayer = data.readInt();
            if (Model_RunMan.battleRes > 2) {
                Model_Peacock.battleRes = 0;
            }
            GGlobal.layerMgr.close2(UIConst.FUBEN);
            GGlobal.mapscene.enterScene(SceneCtrl.RUNMAN);
        }
        else {
            ViewCommonWarn.text("挑战失败");
        }
    };
    //获取关卡奖励结果 B:0成功 1失败B:难度类型B:是否是第一次通过0不是1是I:关卡id[B:类型I:系统idI:数量]
    Model_RunMan.prototype.GC_GETREWARD = function (self, data) {
        var result = data.readByte();
        if (result == 0) {
            var type = data.readByte();
            var isFrist = data.readByte();
            var layerId = data.readInt();
            var len = data.readShort();
            Model_RunMan.dropArr = [];
            for (var i = 0; i < len; i++) {
                Model_RunMan.dropArr.push([data.readByte(), data.readInt(), data.readInt()]);
            }
            Model_RunMan.dropFirst = [];
            Model_RunMan.dropHun = null;
            if (isFrist) {
                var cfg = Config.ggzj_008[layerId];
                Model_RunMan.dropFirst = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(cfg.award));
                var soulInfo = Model_RunMan.getSoulEqual(type, cfg.guan);
                if (soulInfo) {
                    Model_RunMan.dropHun = Vo_JiangHun.create(soulInfo.ID);
                }
            }
            GGlobal.control.notify(Enum_MsgType.RUNMAN_BATTLE_DROP);
            //胜利 更新层数
            var info = Model_RunMan.layerInfo[type - 1];
            info.layerId = layerId;
            if (info.layerMaxId < layerId) {
                info.layerMaxId = layerId;
            }
            GGlobal.control.notify(Enum_MsgType.RUNMAN_UPDATE_BATTLE);
        }
        else {
            Model_RunMan.dropArr = [];
            GGlobal.control.notify(Enum_MsgType.RUNMAN_BATTLE_DROP);
        }
    };
    //扫荡结果 B:扫荡结果0成功 1失败B:难度[B:类型I:道具idI:数量]
    Model_RunMan.prototype.GC_ONEKEY = function (self, data) {
        var result = data.readByte();
        if (result == 0) {
            var type = data.readByte();
            var len = data.readShort();
            var arr = [];
            for (var i = 0; i < len; i++) {
                arr.push([data.readByte(), data.readInt(), data.readInt()]);
            }
            var info = Model_RunMan.layerInfo[type - 1];
            var copy = info.copy();
            GGlobal.layerMgr.open(UIConst.FUBEN_RUNMAN_MOP, { arr: ConfigHelp.makeItemListArr(arr), info: copy });
            //更新通关数
            info.layerId = info.layerMaxId;
            GGlobal.control.notify(Enum_MsgType.RUNMAN_OPENUI);
        }
        else {
            ViewCommonWarn.text("扫荡失败");
        }
    };
    Model_RunMan.initSoulReward = function () {
        if (Model_RunMan._soulReard == null) {
            Model_RunMan._soulReard = {};
            for (var keys in Config.general_006) {
                var general = Config.general_006[keys];
                var actArr = ConfigHelp.SplitStr(general.activation);
                var actType = actArr[0][0];
                var actLayer = actArr[0][1];
                if (Model_RunMan._soulReard[actType] == null) {
                    Model_RunMan._soulReard[actType] = [];
                }
                general.actType = actType;
                general.actLayer = actLayer;
                Model_RunMan._soulReard[actType].push(general);
            }
            for (var keys in Model_RunMan._soulReard) {
                var arr = Model_RunMan._soulReard[keys];
                arr.sort(function (a, b) { return a.actLayer - b.actLayer; });
            }
        }
    };
    Model_RunMan.getSoulReward = function (type, layer) {
        Model_RunMan.initSoulReward();
        var soulArr = Model_RunMan._soulReard[type];
        for (var i = 0; i < soulArr.length; i++) {
            if (soulArr[i].actLayer > layer) {
                return soulArr[i];
            }
        }
        return null;
    };
    Model_RunMan.getSoulEqual = function (type, layer) {
        Model_RunMan.initSoulReward();
        var soulArr = Model_RunMan._soulReard[type];
        for (var i = 0; i < soulArr.length; i++) {
            if (soulArr[i].actLayer == layer) {
                return soulArr[i];
            }
        }
        return null;
    };
    Model_RunMan.getTypeName = function (v) {
        switch (v) {
            case 1:
                return "普通";
            case 2:
                return "困难";
            case 3:
                return "噩梦";
            case 4:
                return "传说";
            default:
                return "";
        }
    };
    Model_RunMan.getIsPass = function (type, layer) {
        var info = Model_RunMan.layerInfo[type - 1];
        if (info == null) {
            return false;
        }
        if (!Config.ggzj_008[info.layerMaxId] || layer > Config.ggzj_008[info.layerMaxId].guan) {
            return false;
        }
        return true;
    };
    Model_RunMan.checkTabNotice = function () {
        var cur = 1;
        var max = 0;
        var infoCur = null;
        var infoMax = null;
        for (var i = 0; i < 4; i++) {
            var info = Model_RunMan.layerInfo[i];
            if (!info) {
                continue;
            }
            if (info.layerId > 0) {
                infoCur = info;
                cur = Config.ggzj_008[info.layerId].guan;
            }
            if (info.layerMaxId > 0) {
                infoMax = info;
                max = Config.ggzj_008[info.layerMaxId].guan;
            }
        }
        if (cur < max) {
            return true;
        }
        else {
            return false;
        }
    };
    Model_RunMan.layerInfo = [];
    return Model_RunMan;
}(BaseModel));
__reflect(Model_RunMan.prototype, "Model_RunMan");
