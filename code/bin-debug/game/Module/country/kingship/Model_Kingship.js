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
var Model_Kingship = (function (_super) {
    __extends(Model_Kingship, _super);
    function Model_Kingship() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**5201获取新王位争夺数据 */
    Model_Kingship.prototype.CG_OPENUI_5201 = function () {
        this.sendSocket(5201, new BaseBytes());
    };
    /**5203	CG 挑战王位上的人 I:位置idL:角色ID或怪物ID */
    Model_Kingship.prototype.CG_BATTLE_5203 = function (pos, roleID) {
        var ba = new BaseBytes();
        ba.writeInt(pos);
        ba.writeLong(roleID);
        this.sendSocket(5203, ba);
    };
    /**5205	CG 挑战结果 I:挑战目标位置B:前段结果 0：失败，1：胜利，2：退出 */
    Model_Kingship.prototype.CG_FIGHT_END = function (res) {
        var bates = this.getBytes();
        bates.writeByte(res);
        this.sendSocket(5205, bates);
    };
    /**5209 CG 获取俸禄 */
    Model_Kingship.prototype.CG_GET_KINGSHIP_FENGLU = function () {
        var bates = this.getBytes();
        this.sendSocket(5209, bates);
    };
    /**5211 CG 膜拜 */
    Model_Kingship.prototype.CG_KINGSHIP_MOBAI_5211 = function () {
        var bates = this.getBytes();
        this.sendSocket(5211, bates);
    };
    /**5213 CG 买次数 */
    Model_Kingship.prototype.CG_KINGSHIP_BUY_BATTLECOUNT_5213 = function (count) {
        var ba = this.getBytes();
        ba.writeByte(count);
        this.sendSocket(5213, ba);
    };
    //协议处理
    Model_Kingship.prototype.listenServ = function (mgr) {
        var self = this;
        self.socket = mgr;
        mgr.regHand(5202, self.GC_OPENUI_5202, self);
        mgr.regHand(5204, self.GC_BATTLE_5204, self);
        mgr.regHand(5206, self.GC_FIGHT_END, self);
        mgr.regHand(5208, self.GC_KINGSHIP_POS_CHANGE_5208, self);
        mgr.regHand(5210, self.GC_GET_KINGSHIP_FENGLU, self);
        mgr.regHand(5212, self.GC_KINGSHIP_MOBAI_5212, self);
        mgr.regHand(5214, self.GC_KINGSHIP_BUY_BATTLECOUNT_5214, self);
        mgr.regHand(5216, self.GC_KINGSHIP_REPORTTIP_5216, self);
    };
    /**5216	GC 战报 U:玩家姓名I:当前官职 */
    Model_Kingship.prototype.GC_KINGSHIP_REPORTTIP_5216 = function (self, data) {
        Model_Kingship.roleName = data.readUTF();
        Model_Kingship.myguanZhi = data.readInt();
        GGlobal.mainUICtr.addReportBTN(UIConst.COUNTRY_KINGSHIP);
    };
    /**5214	GC 购买返回 B:0成功 1失败B:当前剩余次数B:已经购买次数I:回复时间 */
    Model_Kingship.prototype.GC_KINGSHIP_BUY_BATTLECOUNT_5214 = function (self, data) {
        var result = data.readByte();
        if (result == 0) {
            Model_Kingship.battleCount = data.readByte();
            Model_Kingship.buyNum = data.readByte();
            Model_Kingship.times = data.readByte();
            GGlobal.control.notify(Enum_MsgType.KINGSHIP_UPDATEDATA);
        }
    };
    /**5212	GC 膜拜返回 B:0成功 1失败 2王位之争期间不能膜拜 */
    Model_Kingship.prototype.GC_KINGSHIP_MOBAI_5212 = function (self, data) {
        var result = data.readByte();
        if (result == 0) {
            Model_Kingship.moBai = 1;
            ViewCommonWarn.text("膜拜成功");
            GGlobal.control.notify(Enum_MsgType.KINGSHIP_UPDATEDATA);
        }
    };
    /**5210	GC 获取奖励返回 B:0成功 1失败 */
    Model_Kingship.prototype.GC_GET_KINGSHIP_FENGLU = function (self, data) {
        var result = data.readByte();
        if (result == 0) {
            Model_Kingship.isDraw = 1;
            ViewCommonWarn.text("获取俸禄成功");
            GGlobal.control.notify(Enum_MsgType.KINGSHIP_UPDATEDATA);
        }
    };
    /**5208	GC 发生变化的位置 [L:玩家IDU:玩家名字L:玩家战力I:玩家时装B:玩家位置] */
    Model_Kingship.prototype.GC_KINGSHIP_POS_CHANGE_5208 = function (self, data) {
        for (var i = 0, len = data.readShort(); i < len; i++) {
            var vo = new Vo_Kingship();
            vo.readMsg(data);
            Model_Kingship.guardArr[vo.pos - 1] = vo;
        }
        GGlobal.control.notify(Enum_MsgType.KINGSHIP_UPDATEDATA);
    };
    /**5204	GC 挑战返回 B:0成功1失败2此位置正在被挑战3自身正在战斗4不能挑战自己I:挑战位置 */
    Model_Kingship.prototype.GC_BATTLE_5204 = function (self, data) {
        var result = data.readByte();
        if (result == 0) {
            Model_Kingship.battleCount--;
            Model_Kingship.battlePos = data.readInt();
            GGlobal.mapscene.enterScene(SceneCtrl.KING_SHIP);
            GGlobal.control.notify(Enum_MsgType.KINGSHIP_UPDATEDATA);
        }
        else if (result == 2) {
            ViewCommonWarn.text("该官职正被争夺中");
        }
        else if (result == 3) {
            ViewCommonWarn.text("你的官职正被挑战");
        }
        else if (result == 7) {
            ViewCommonWarn.text("此官职已变化");
        }
    };
    Model_Kingship.prototype.failHandler = function () {
        GGlobal.modelScene.returnMainScene();
    };
    /**新王位争夺数据返回 [L:玩家IDU:玩家名字L:玩家战力I:玩家时装B:玩家位置1魏王2魏相3魏国大将军]列表数据B:活动状态1：开始，2：结束B:是否已领取俸禄
     * B:剩余挑战次数I:挑战结束剩余时间B:膜拜状态，只有结束UI才会使用，是否膜拜，0：没膜拜，1：已膜拜B:已购买次数I:恢复次数时间*/
    Model_Kingship.prototype.GC_OPENUI_5202 = function (self, data) {
        Model_Kingship.hasData = true;
        for (var i = 0, len = data.readShort(); i < len; i++) {
            var vo = new Vo_Kingship();
            vo.readMsg(data);
            Model_Kingship.guardArr[vo.pos - 1] = vo;
        }
        Model_Kingship.status = data.readByte();
        Model_Kingship.isDraw = data.readByte();
        Model_Kingship.battleCount = data.readByte();
        Model_Kingship.overTime = data.readInt();
        Model_Kingship.moBai = data.readByte();
        Model_Kingship.buyNum = data.readByte();
        Model_Kingship.times = data.readInt();
        GGlobal.control.notify(Enum_MsgType.KINGSHIP_UPDATEDATA);
    };
    //GC 战斗结果 B:0胜利 1失败I:挑战位置
    Model_Kingship.prototype.GC_FIGHT_END = function (self, data) {
        var result = data.readByte();
        if (result == 0) {
            var len = data.readShort();
            var array = JSON.parse(Config.xtcs_004[1061].other);
            ViewCommonWin.show(ConfigHelp.makeItemListArr(array), 5000);
        }
        else {
            if (result == 2) {
                ViewCommonWarn.text("活动已结束");
            }
            ViewCommonFail.show(5000, self, "离开", self.failHandler, null);
        }
    };
    //领取宝箱奖励返回 B:状态，0：奖励不存在，1：成功，2：未达到条件，3：不可重复领取B:宝箱id
    Model_Kingship.prototype.GC_BAT_REWARD_GET = function (self, data) {
        var result = data.readByte();
        if (result == 1) {
        }
        else if (result == 2) {
            ViewCommonWarn.text("未达到条件");
        }
        else if (result == 3) {
            ViewCommonWarn.text("不可重复领取");
        }
        else if (result == 0) {
            ViewCommonWarn.text("奖励不存在");
        }
        else {
            ViewCommonWarn.text("领取失败");
        }
    };
    Model_Kingship.checkNotice = function () {
        if (Model_Kingship.status == 1) {
            //若玩家有可挑战次数
            if (Model_Kingship.battleCount > 0) {
                return true;
            }
            //若玩家有宝箱领取
        }
        else if (Model_Kingship.status == 2) {
            if (Model_Kingship.moBai == 0 || Model_Kingship.isDraw == 0) {
                return true;
            }
        }
        return false;
    };
    Model_Kingship.buyHandler = function () {
        // if (Model_Kingship.battleCount >= Model_Kingship.BATTLE_MAX) {
        // 	ViewCommonWarn.text("挑战次数已达上限");
        // 	return;
        // }
        var buyMax = Config.xtcs_004[1063].num;
        if (Model_Kingship.buyNum >= buyMax) {
            ViewCommonWarn.text("已达购买上限");
            return;
        }
        var costNum = JSON.parse(Config.xtcs_004[1064].other)[0][2];
        var lastBuy = buyMax - Model_Kingship.buyNum;
        ViewAlertBuy.show(costNum, lastBuy, lastBuy, "", Handler.create(null, Model_Kingship.okHandle));
    };
    Model_Kingship.okHandle = function (count) {
        var costNum = JSON.parse(Config.xtcs_004[1064].other)[0][2];
        if (Model_player.voMine.yuanbao < costNum * count) {
            ModelChongZhi.guideToRecharge();
            return;
        }
        GGlobal.modelKingship.CG_KINGSHIP_BUY_BATTLECOUNT_5213(count);
    };
    Model_Kingship.countryText = [["魏王", "魏相", "魏国大将军", "皇城侍卫"], ["蜀王", "蜀相", "蜀国大将军", "皇城侍卫"], ["吴王", "吴相", "吴国大将军", "皇城侍卫"]];
    Model_Kingship.myguanZhi = 0;
    Model_Kingship.roleName = "";
    Model_Kingship.BATTLE_MAX = 10; //每天最大挑战次数
    Model_Kingship.status = 0; //1开始  2结束
    Model_Kingship.guardArr = [];
    Model_Kingship.battleCount = 0; //剩余挑战次数
    Model_Kingship.isDraw = 0; //是否领取俸禄
    Model_Kingship.overTime = 0; //王位争夺结束时间
    Model_Kingship.moBai = 0; //0：没膜拜，1：已膜拜
    Model_Kingship.hasData = false;
    Model_Kingship.battlePos = 0;
    /**次数恢复时间 */
    Model_Kingship.times = 0;
    /**已购买次数 */
    Model_Kingship.buyNum = 0;
    return Model_Kingship;
}(BaseModel));
__reflect(Model_Kingship.prototype, "Model_Kingship");
