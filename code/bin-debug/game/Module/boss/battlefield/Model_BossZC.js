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
var Model_BossZC = (function (_super) {
    __extends(Model_BossZC, _super);
    function Model_BossZC() {
        var _this = _super.call(this) || this;
        /** 本服*/ _this.local_dta = [];
        /** 跨服*/ _this.cross_dta = [];
        /**当前 处于哪个副本*/ _this.sceneId = 0;
        /** 当前副本的倒计时时间*/ _this.entranceCloseTime = 0;
        //B:状态（0：副本初始状态 被击杀后进入倒计时，1准备可以进入，2玩家互相pk时间 不可进入 3玩家开始抢夺boss，击杀boss，不可以进入副本 4击杀boss状态（规定时间未击杀完成boss），可以进入副本）]
        /**状态  此副本进入时的状态*/ _this.sceneState = 0;
        /**当前请求的跨服类型。*/ _this.sceneType = 1;
        return _this;
    }
    Model_BossZC.prototype.enter = function () {
    };
    Model_BossZC.prototype.exite = function () {
        var s = this;
        s.sceneId = 0;
    };
    Model_BossZC.prototype.listenServ = function (wsm) {
        var s = this;
        s.socket = wsm;
        wsm.regHand(4452, s.GCopenUI, s);
        wsm.regHand(4454, s.GCenterWarScene, s);
        wsm.regHand(4456, s.GCfubenStUpdate, s);
        wsm.regHand(4458, s.GCfight, s);
        wsm.regHand(4460, s.GCfightBoss4460, s);
        wsm.regHand(4464, s.GCExite, s);
        wsm.regHand(4466, s.GCfightPlayer4466, s);
        wsm.regHand(4468, s.GCBossBattleEnd, s);
        wsm.regHand(4470, s.GCSCENEPlayerSt, s);
        wsm.regHand(4472, s.GCBOSSDEAD, s);
    };
    //GC 打开boss战场 B:1本服 2跨服
    Model_BossZC.prototype.CGopenUI = function (type) {
        var b = this.getBytes();
        b.writeByte(type);
        this.sendSocket(4451, b);
    };
    /**4452  B-[I-L-B-I]
     * GC 打开ui返回 B:类型 1本服 2跨服[I:副本索引I:倒计时
     * B:状态（0：副本初始状态 被击杀后进入倒计时，1准备可以进入，2玩家互相pk时间 不可进入 3玩家开始抢夺boss，击杀boss，不可以进入副本 4击杀boss状态（规定时间未击杀完成boss），可以进入副本）]
    */
    Model_BossZC.prototype.GCopenUI = function (m, b) {
        var type = b.readByte();
        m.sceneType = type;
        var len = b.readShort();
        var temp = [];
        var now = Model_GlobalMsg.getServerTime();
        var zs = Model_player.voMine.zsID;
        var ms = Model_GlobalMsg.getServerTime();
        var nowDate = new Date(ms);
        var nowMin = nowDate.getMinutes();
        var h = nowDate.getHours();
        var systemID = type == 1 ? UIConst.BOSS_BATTLEFIELD_LOCAL : UIConst.BOSS_BATTLEFIELD_CROSS;
        var redDot = false;
        for (var i = 0; i < len; i++) {
            var id = b.readInt();
            var time = b.readLong() * 1000 + now;
            var state = b.readByte();
            var cd = b.readInt() * 1000 + now;
            var killer = b.readUTF();
            var isFirst = b.readByte() == 0;
            var cfg = Config.bosszc_010[id];
            var quality = cfg.pinzhi;
            var condition = JSON.parse(cfg.tiaojian)[0];
            if (zs >= condition[0] && zs <= condition[1]) {
                var weight = quality * 10000;
                weight += state == 1 ? 1000 : 0;
                weight += id;
                if (state == 2 || state == 4) {
                    redDot = true;
                }
                // let dates = JSON.parse(cfg.shuaxin2);
                // let ii = dates.length;
                var date = "0:00";
                // for (let j = 0; j < ii; j++) {
                // 	let tp = dates[j];
                // 	let ch = tp[0];
                // 	let cm = tp[1];
                // 	if (h == ch && nowMin < cm) {
                // 		date = dates[j];
                // 		break;
                // 	} else if (h < ch) {
                // 		date = dates[j];
                // 		break;
                // 	}
                // 	if (j == ii - 1) {
                // 		date = dates[0];
                // 		break;
                // 	}
                // }
                temp.push([id, time, state, cd, weight, date, killer, isFirst]);
            }
        }
        temp = temp.sort(function (a, b) {
            return a[4] > b[4] ? -1 : 1;
        });
        if (type == 1) {
            m.local_dta = temp;
        }
        else {
            m.cross_dta = temp;
        }
        GGlobal.control.notify(Enum_MsgType.BOSSZC_OPEN);
        GGlobal.reddot.setCondition(systemID, 0, redDot);
        GGlobal.reddot.notifyMsg(systemID);
    };
    Model_BossZC.prototype.CGenterWarScene = function (id) {
        var ba = this.getBytes();
        ba.writeInt(id);
        this.sendSocket(4453, ba, this.sceneType == Model_BossZC.CROSS);
    };
    /**4454 B-I
     * GC 进入战场boss返回 B:0成功1失败2您已存在其他战场副本中3人数已满I:副本序号
    */
    Model_BossZC.prototype.GCenterWarScene = function (m, b) {
        var ret = b.readByte();
        var idx = b.readInt();
        var cd = b.readInt();
        if (ret == 0) {
            Model_BossZC.isInScene = true;
            m.sceneId = idx;
            BossZCManager.enter(idx);
        }
        else if (ret == 1) {
            ViewCommonWarn.text("进入失败");
        }
        else if (ret == 2) {
            ViewCommonWarn.text("网络异常，请重新登录");
        }
        else if (ret == 3) {
            ViewCommonWarn.text("副本人数已满");
        }
        else if (ret == 4) {
            ViewCommonWarn.text("正在冷却中，请等候" + cd + "秒");
        }
        else if (ret == 5) {
            ViewCommonWarn.text("BOSS已被击杀");
            m.CGopenUI(m.sceneType);
        }
    };
    /**4456 I-B-I
     * GC 向boss副本里面的玩家发送副本的状态及该状态倒计时 I:副本序号B:副本状态I:副本状态剩余时间
    */
    Model_BossZC.prototype.GCfubenStUpdate = function (m, b) {
        var idx = b.readInt();
        var st = b.readByte();
        var remaindTime = b.readInt();
        var now = Model_GlobalMsg.getServerTime();
        if (idx == m.sceneId) {
            m.entranceCloseTime = remaindTime * 1000 + now;
            m.sceneState = st;
            GGlobal.control.notify(Enum_MsgType.BOSSZC_READYTIME);
            GameUnitManager.updatePlayerColorName();
        }
        else {
            console.error("未在活动副本 收到了 副本状态改变的协议");
        }
    };
    //CG 挑战玩家
    Model_BossZC.prototype.CGfight = function (id) {
        if (this.sceneState != 2) {
            return;
        }
        var ba = this.getBytes();
        ba.writeLong(id);
        this.sendSocket(4457, ba, this.sceneType == Model_BossZC.CROSS);
    };
    /**4458 L-L
     * GC 挑战玩家战斗结果 L:赢者idL:败者id
    */
    Model_BossZC.prototype.GCfight = function (m, b) {
        var st = this.sceneState;
        if (st != 2) {
            if (st == 3) {
                ViewCommonWarn.text("抢夺BOSS时间，不能PK");
            }
            else if (st == 1) {
                ViewCommonWarn.text("准备时间，不能PK");
            }
            return;
        }
        var winner = b.readLong();
        var loser = b.readLong();
        GGlobal.control.notify(Enum_MsgType.BOSSZC_SCENE_ST, [winner, loser]);
    };
    Model_BossZC.prototype.CGfightBoss4459 = function () {
        var st = this.sceneState;
        if (st != 3 && st != 4) {
            if (st == 2) {
                ViewCommonWarn.text("PK时间，不能挑战BOSS");
            }
            else if (st == 1) {
                ViewCommonWarn.text("准备时间，不能挑战BOSS");
            }
            return;
        }
        var ba = this.getBytes();
        this.sendSocket(4459, ba, this.sceneType == Model_BossZC.CROSS);
    };
    /**4460 B
     * GC挑战boss返回 B:0可以挑战1不能挑战boss在战斗
    */
    Model_BossZC.prototype.GCfightBoss4460 = function (m, b) {
        var ret = b.readByte();
        if (ret == 0) {
            GGlobal.mapscene.enterScene(SceneCtrl.BOSSZC);
        }
        else {
            ViewCommonWarn.text("BOSS正在被挑战");
        }
    };
    Model_BossZC.prototype.CGfightRet4461 = function (ret) {
        var ba = this.getBytes();
        ba.writeByte(ret);
        this.sendSocket(4461, ba, this.sceneType == Model_BossZC.CROSS);
    };
    Model_BossZC.prototype.CGExite = function () {
        var ba = this.getBytes();
        Model_BossZC.isInScene = false;
        this.sendSocket(4463, ba, this.sceneType == Model_BossZC.CROSS);
    };
    /**4464 B
     * CG 离开副本 B:0成功离开boss战场
    */
    Model_BossZC.prototype.GCExite = function (m, b) {
        BossZCManager.exite();
    };
    //GC 挑战结果 B:0成功挑战 1对方正在战斗 
    Model_BossZC.prototype.GCfightPlayer4466 = function (m, b) {
        var ret = b.readByte();
        if (ret != 0) {
            ViewCommonWarn.text("对方正在战斗");
        }
    };
    //GC 结算ui B:0成功 1失败[I:道具typeI:系统idI:数量]
    Model_BossZC.prototype.GCBossBattleEnd = function (m, ba) {
        var ret = ba.readByte();
        var awards = [];
        for (var i = 0, len = ba.readShort(); i < len; i++) {
            var vo = ConfigHelp.parseItemBa(ba);
            vo.extra = ba.readByte() == 1 ? 2 : 0;
            awards.push(vo);
        }
        GGlobal.control.notify(Enum_MsgType.BOSSZC_PVE_RET, [ret, awards]);
    };
    //GC 战斗状态 [B:0是玩家 1是boss B:1开始战斗 0解除战斗L:玩家id]
    Model_BossZC.prototype.GCSCENEPlayerSt = function (m, b) {
        var len = b.readShort();
        for (var i = 0; i < len; i++) {
            var type = b.readByte();
            var st = b.readByte();
            var id = b.readLong();
            var role = GameUnitManager.findUnitByID(id);
            if (role) {
                if (st == 1) {
                    var plug = RoleStatePlug.create(role);
                    plug.setState(1);
                    role.addPlug(plug, RoleStatePlug);
                }
                else {
                    role.removePlugBytype(RoleStatePlug);
                }
            }
        }
    };
    Model_BossZC.prototype.GCBOSSDEAD = function (m, b) {
        ViewCommonWarn.text("BOSS已经被击杀");
    };
    Model_BossZC.CROSS = 2;
    Model_BossZC.LOCAL = 1;
    Model_BossZC.data_valid = 0;
    Model_BossZC.isInScene = false;
    return Model_BossZC;
}(BaseModel));
__reflect(Model_BossZC.prototype, "Model_BossZC");
