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
var Model_Peacock = (function (_super) {
    __extends(Model_Peacock, _super);
    function Model_Peacock() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**打开铜雀台ui */
    Model_Peacock.prototype.CG_OPENUI = function () {
        var bates = this.getBytes();
        this.sendSocket(1221, bates);
    };
    /**获取某一双倍关卡的通过人数 I:关卡id */
    Model_Peacock.prototype.CG_GETNUM = function (gateId) {
        var bates = this.getBytes();
        bates.writeInt(gateId);
        this.sendSocket(1223, bates);
    };
    /**获取某关卡的双倍奖励 I:层数 */
    Model_Peacock.prototype.CG_GETREWARD = function (gateId) {
        var bates = this.getBytes();
        bates.writeInt(gateId);
        this.sendSocket(1225, bates);
    };
    /**爬塔 */
    Model_Peacock.prototype.CG_UPTOWER = function () {
        var bates = this.getBytes();
        this.sendSocket(1227, bates);
    };
    /**请求本关卡奖励*/
    Model_Peacock.prototype.CG_BEATBOSSWIN = function () {
        var bates = this.getBytes();
        this.sendSocket(1229, bates);
    };
    //协议处理
    Model_Peacock.prototype.listenServ = function (mgr) {
        this.socket = mgr;
        mgr.regHand(1222, this.GC_OPENUI, this);
        mgr.regHand(1224, this.GC_GETNUM, this);
        mgr.regHand(1226, this.GC_GETREWARD, this);
        mgr.regHand(1228, this.GC_UPPOWER, this);
        mgr.regHand(1230, this.GC_DROPDATA, this);
    };
    //打开铜雀台ui I:当前层数（已通过）I:最高层U:最高层姓名U:极限通关者L:极限通关者战力[I:那些层数奖励没有领取B:已经通关的人数]
    Model_Peacock.prototype.GC_OPENUI = function (self, data) {
        Model_Peacock.curLayer = data.readInt();
        Model_Peacock.maxLayer = data.readInt();
        Model_Peacock.maxName = data.readUTF();
        Model_Peacock.maxHead = data.readInt();
        Model_Peacock.maxFrame = data.readInt();
        var len = data.readShort();
        Model_Peacock.rewLayerArr = [];
        for (var i = 0; i < len; i++) {
            var layer = data.readInt();
            var people = data.readByte();
            Model_Peacock.rewLayerArr.push(layer);
            Model_Peacock.rewPeopleObj[layer] = people;
        }
        Model_Peacock.rewLayerArr.sort(function (a, b) { return a - b; });
        GGlobal.control.notify(Enum_MsgType.PEACOCK_OPENUI);
        GGlobal.control.notify(Enum_MsgType.REBIRTH_UPDATE);
    };
    //GC 通过人数 I:关卡idB:通过人数
    Model_Peacock.prototype.GC_GETNUM = function (self, data) {
        var layer = data.readInt();
        var num = data.readByte();
        Model_Peacock.rewPeopleObj[layer] = num;
        GGlobal.control.notify(Enum_MsgType.PEACOCK_PASSLAYER_NUM);
    };
    //GC 获取某关卡双倍奖励 B:0成功 1失败I:关卡数
    Model_Peacock.prototype.GC_GETREWARD = function (self, data) {
        var reslut = data.readByte();
        if (reslut == 0) {
            var layer = data.readInt();
            var i = Model_Peacock.rewLayerArr.indexOf(layer);
            Model_Peacock.rewLayerArr.splice(i, 1);
            GGlobal.control.notify(Enum_MsgType.PEACOCK_PASSLAYER_NUM);
            ViewCommonWarn.text("领取成功", 0xffffff);
        }
        else {
            ViewCommonWarn.text("领取失败");
        }
    };
    //GC 爬塔返回 B:0成功 1失败 2背包已满I:当前击败关卡idB:  0:失败，1：成功，2：由前端结果决定
    Model_Peacock.prototype.GC_UPPOWER = function (self, data) {
        var result = data.readByte();
        if (result == 0) {
            Model_Peacock.battleLayer = data.readInt();
            Model_Peacock.battleRes = data.readByte() + 1;
            if (Model_Peacock.battleRes > 2) {
                Model_Peacock.battleRes = 0;
            }
            GGlobal.layerMgr.close2(UIConst.FUBEN);
            GGlobal.mapscene.enterScene(SceneCtrl.PEACOCK);
        }
        else if (result == 1) {
            ViewCommonWarn.text("失败");
        }
        else if (result == 2) {
            ViewCommonWarn.text("背包空间不足");
        }
        else {
            ViewCommonWarn.text("失败");
        }
    };
    //GC boss掉落 I:铜雀台关卡id[B:类型I:系统idI:数量]
    Model_Peacock.prototype.GC_DROPDATA = function (self, data) {
        Model_Peacock.dropLayer = data.readInt();
        Model_Peacock.dropArr = [];
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            Model_Peacock.dropArr.push([data.readByte(), data.readInt(), data.readInt()]);
        }
        GGlobal.control.notify(Enum_MsgType.PEACOCK_BATTLE_DROP);
    };
    Object.defineProperty(Model_Peacock, "towerArr", {
        get: function () {
            if (Model_Peacock._towerArr == null) {
                Model_Peacock._towerArr = [];
                for (var keys in Config.tower_219) {
                    Model_Peacock._towerArr.push(Config.tower_219[keys]);
                }
            }
            return Model_Peacock._towerArr;
        },
        enumerable: true,
        configurable: true
    });
    Model_Peacock.getRewardLayer = function () {
        var curLayer = Model_Peacock.curLayer + 1;
        //小奖
        var layerReward1 = 0;
        if (Model_Peacock.rewLayerArr.length > 0) {
            layerReward1 = Model_Peacock.rewLayerArr[0];
        }
        else {
            for (var i = curLayer - 1; i < Model_Peacock.towerArr.length; i++) {
                var tower = Model_Peacock.towerArr[i];
                if (tower.reward1 != "0") {
                    layerReward1 = tower.id;
                    break;
                }
            }
        }
        return layerReward1;
    };
    Model_Peacock.checkNotice = function () {
        //小奖
        var layerReward = 99999;
        var curLayer = Model_Peacock.curLayer + 1;
        if (Model_Peacock.rewLayerArr.length > 0) {
            layerReward = Model_Peacock.rewLayerArr[0];
        }
        else {
            for (var i = curLayer - 1; i < Model_Peacock.towerArr.length; i++) {
                var tower = Model_Peacock.towerArr[i];
                if (tower.reward1 != "0") {
                    layerReward = tower.id;
                    break;
                }
            }
        }
        return Model_Peacock.curLayer >= layerReward;
    };
    Model_Peacock.getBatBigRewad = function () {
        var curLayer = Model_Peacock.battleLayer; //向后找
        var bigReward = "";
        for (var i = curLayer - 1; i < Model_Peacock.towerArr.length; i++) {
            var tower = Model_Peacock.towerArr[i];
            if (tower.reward != "0") {
                return tower;
            }
        }
        return null;
    };
    Model_Peacock.curLayer = 0; //已通过
    Model_Peacock.maxLayer = 0;
    Model_Peacock.maxName = "";
    Model_Peacock.maxHead = 0;
    Model_Peacock.maxFrame = 0;
    Model_Peacock.ultimateName = "";
    Model_Peacock.ultimatePower = 0;
    Model_Peacock.rewPeopleObj = {}; //已经通关的人数
    Model_Peacock.rewLayerArr = []; //可以领奖的层数
    Model_Peacock.dropLayer = 0;
    Model_Peacock.dropArr = [];
    return Model_Peacock;
}(BaseModel));
__reflect(Model_Peacock.prototype, "Model_Peacock");
