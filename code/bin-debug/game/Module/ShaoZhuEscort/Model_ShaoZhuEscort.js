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
var Model_ShaoZhuEscort = (function (_super) {
    __extends(Model_ShaoZhuEscort, _super);
    function Model_ShaoZhuEscort() {
        return _super.call(this) || this;
    }
    /**护送按钮红点 */
    Model_ShaoZhuEscort.checkEscortNotice = function () {
        if (Model_ShaoZhuEscort.escort > 0 && Model_ShaoZhuEscort.state == 0) {
            return true;
        }
        return false;
    };
    /**领取奖励按钮红点 */
    Model_ShaoZhuEscort.checkGetAwardNotice = function () {
        if (Model_ShaoZhuEscort.isGetAward) {
            return true;
        }
        return false;
    };
    /**检查所有按钮红点 */
    Model_ShaoZhuEscort.checkAllNotice = function () {
        if (Model_ShaoZhuEscort.checkEscortNotice() || Model_ShaoZhuEscort.checkGetAwardNotice()) {
            return true;
        }
        return false;
    };
    /**8001	CG 打开界面 */
    Model_ShaoZhuEscort.prototype.CG_OPEN_UI = function () {
        this.sendSocket(8001, new BaseBytes());
    };
    /**8003	CG 开始护送 */
    Model_ShaoZhuEscort.prototype.CG_ESCORT = function () {
        this.sendSocket(8003, new BaseBytes());
    };
    /**8005	CG 刷新 B:刷新类型：1：普通刷新，2：一键刷新 */
    Model_ShaoZhuEscort.prototype.CG_REFRESH = function (type) {
        var ba = new BaseBytes();
        ba.writeByte(type);
        this.sendSocket(8005, ba);
    };
    /**8009	CG 领取奖励 */
    Model_ShaoZhuEscort.prototype.CG_GET_AWARD = function () {
        this.sendSocket(8009, new BaseBytes());
    };
    /**8011	CG 拦截 L:被拦截的玩家id */
    Model_ShaoZhuEscort.prototype.CG_INTERCEPT = function (id) {
        var ba = new BaseBytes();
        ba.writeLong(id);
        this.sendSocket(8011, ba);
        Model_ShaoZhuEscort.interPlayerId = id;
        Model_ShaoZhuEscort.winerid = 0;
    };
    /**8013	CG 查看录像 B:索引,从0开始 */
    Model_ShaoZhuEscort.prototype.CG_LOOK_REPORT = function (index) {
        var ba = new BaseBytes();
        ba.writeByte(index);
        this.sendSocket(8013, ba);
    };
    /**8015	CG 打开战报界面 */
    Model_ShaoZhuEscort.prototype.CG_OPEN_BATTLERECORD_UI = function () {
        var ba = new BaseBytes();
        this.sendSocket(8015, ba);
    };
    /** 注册 WEBSOCKET HANLDER 函数*/
    Model_ShaoZhuEscort.prototype.listenServ = function (wsm) {
        var self = this;
        self.socket = wsm;
        wsm.regHand(8002, self.GC_OPEN_UI, self);
        wsm.regHand(8004, self.GC_OPEN_GENERAL_UI, self);
        wsm.regHand(8006, self.GC_REFRESH, self);
        wsm.regHand(8008, self.GC_AWARDSEND_UI, self);
        wsm.regHand(8010, self.GC_GET_AWARD, self);
        wsm.regHand(8012, self.GC_INTERCEPT, self);
        wsm.regHand(8014, self.GC_LOOK_REPORT, self);
        wsm.regHand(8016, self.GC_OPEN_BATTLERECORD_UI, self);
    };
    /**8002	GC 	打开界面返回 [[I:玩家idU:玩家名字I:护送少主武将L:战力I:头像id，没有则为0I:头像框I:国家I:剩余时间B:状态：0：不可拦截，1：可拦截]少主护送列表I:护送次数I:拦截次数I:护送少主武将I:剩余时间B:护送状态：0：没护送，1：护送中，2：护送完毕 */
    Model_ShaoZhuEscort.prototype.GC_OPEN_UI = function (self, data) {
        Model_ShaoZhuEscort.roleArr = [];
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var escortData = new Vo_EscortData();
            escortData.initDate(data);
            Model_ShaoZhuEscort.roleArr.push(escortData);
        }
        Model_ShaoZhuEscort.escort = Config.xtcs_004[7002].num - data.readInt();
        if (Model_ShaoZhuEscort.escort <= 0) {
            Model_ShaoZhuEscort.escort = 0;
        }
        Model_ShaoZhuEscort.inter = Config.xtcs_004[7003].num - data.readInt();
        if (Model_ShaoZhuEscort.inter <= 0) {
            Model_ShaoZhuEscort.inter = 0;
        }
        Model_ShaoZhuEscort.id = data.readInt();
        Model_ShaoZhuEscort.endTime = data.readInt();
        Model_ShaoZhuEscort.state = data.readByte();
        if (Model_ShaoZhuEscort.state == 1) {
            var escortData = new Vo_EscortData();
            escortData.playerId = Model_player.voMine.id;
            escortData.playerName = Model_player.voMine.name;
            escortData.guardId = Model_ShaoZhuEscort.id;
            escortData.power = Model_player.voMine.str;
            escortData.country = Model_player.voMine.country;
            escortData.timeRemain = Model_ShaoZhuEscort.endTime;
            escortData.state = Model_ShaoZhuEscort.state;
            Model_ShaoZhuEscort.roleArr.unshift(escortData);
        }
        GGlobal.control.notify(UIConst.SHAOZHU_ESCORT);
    };
    /**8004	GC 开始护送返回 B:状态：0失败，1成功 */
    Model_ShaoZhuEscort.prototype.GC_OPEN_GENERAL_UI = function (self, data) {
        var ret = data.readByte();
        if (ret == 1) {
            Model_ShaoZhuEscort.escort -= 1;
            Model_ShaoZhuEscort.state = 1;
            GGlobal.control.notify(UIConst.SHAOZHU_ESCORT);
        }
    };
    /**8006	GC 刷新返回 B:状态：0：元宝不够，1：成功，2：护送次数满了，3：已刷到最高层I:少主护送配置表id */
    Model_ShaoZhuEscort.prototype.GC_REFRESH = function (self, data) {
        var ret = data.readByte();
        if (ret == 0) {
            ViewCommonWarn.text("元宝不够");
        }
        else if (ret == 2) {
            ViewCommonWarn.text("护送次数满了");
        }
        else if (ret == 3) {
            ViewCommonWarn.text("已刷到最高层");
        }
        else {
            ViewCommonWarn.text("刷新成功");
            Model_ShaoZhuEscort.id = data.readInt();
            GGlobal.control.notify("GC_REFRESH_SHAOZHUESCORT");
        }
    };
    /**8008	GC 护送完毕，奖励结算返回 U:玩家名字L:战力I:头像id，没有则为0I:头像框I:国家I:护送武将[B:奖励类型I:奖励idI:数量I:被拦截扣除数量]奖励列表 */
    Model_ShaoZhuEscort.prototype.GC_AWARDSEND_UI = function (self, data) {
        Model_ShaoZhuEscort.rewardArr = [];
        Model_ShaoZhuEscort.interArr = [];
        Model_ShaoZhuEscort.roleName = data.readUTF();
        Model_ShaoZhuEscort.power = data.readLong();
        Model_ShaoZhuEscort.headID = data.readInt();
        Model_ShaoZhuEscort.frameID = data.readInt();
        Model_ShaoZhuEscort.country = data.readInt();
        Model_ShaoZhuEscort.guardId = data.readInt();
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            Model_ShaoZhuEscort.rewardArr.push([data.readByte(), data.readInt(), data.readInt()]);
            Model_ShaoZhuEscort.interArr.push(data.readInt());
        }
        Model_ShaoZhuEscort.isGetAward = true;
        GGlobal.control.notify(UIConst.SHAOZHU_ESCORT);
    };
    /**8010	GC 领取奖励返回 B:状态：0：失败，1：成功 */
    Model_ShaoZhuEscort.prototype.GC_GET_AWARD = function (self, data) {
        var ret = data.readByte();
        if (ret == 1) {
            Model_ShaoZhuEscort.isGetAward = false;
            GGlobal.reddot.setCondition(UIConst.SHAOZHU_ESCORT, 0, false);
            GGlobal.layerMgr.close2(UIConst.SHAOZHU_ESCORT_REWARD);
            GGlobal.control.notify(UIConst.SHAOZHU_ESCORT);
        }
    };
    /**8012	GC 拦截返回 B:战斗结果：0：失败，1：成功，2拦截次数满了，3被拦截的玩家不存在，数据过期了，4已经达到单次护送中可被拦截次数上限，5不能再次拦截同一个玩家的东西
     * [B:类型I:idI:数量]拦截奖励列表L:胜利玩家IDI:头像IDI:将衔IDL:胜利者战力U:胜利者名字L:左边玩家IDL:右边玩家ID */
    Model_ShaoZhuEscort.prototype.GC_INTERCEPT = function (self, data) {
        var ret = data.readByte();
        if (ret == 1) {
            Model_ShaoZhuEscort.inter -= 1;
            GGlobal.layerMgr.close2(UIConst.SHAOZHU_ESCORT_INTER);
            self.enterBattle(data);
            GGlobal.control.notify("GC_INTER_SHAOZHUESCORT");
        }
        else {
            switch (ret) {
                case 0:
                    ViewCommonWarn.text("拦截失败");
                    break;
                case 2:
                    ViewCommonWarn.text("拦截次数满了");
                    break;
                case 3:
                    ViewCommonWarn.text("该少主已经不能被拦截了");
                    break;
                case 4:
                    ViewCommonWarn.text("已经达到单次护送中可被拦截次数上限");
                    break;
                case 5:
                    ViewCommonWarn.text("该少主已被你拦截一次了，给条活路吧");
                    break;
            }
        }
    };
    /**8014	GC 	查看录像返回 [B:类型I:idI:数量]奖励列表L:胜利玩家IDI:头像IDI:将衔IDL:胜利者战力U:胜利者名字L:左边玩家IDL:右边玩家ID */
    Model_ShaoZhuEscort.prototype.GC_LOOK_REPORT = function (self, data) {
        GGlobal.layerMgr.close2(UIConst.SHAOZHU_ESCORT_REPORT);
        self.enterBattle(data);
    };
    /**8016	打开战报界面返回 [B:战斗结果：0失败，1胜利，2吕布护送U:名字[B:奖励类型I:奖励idI:损失数量]]战报列表 */
    Model_ShaoZhuEscort.prototype.GC_OPEN_BATTLERECORD_UI = function (self, data) {
        var len = data.readShort();
        Model_ShaoZhuEscort.dt = [];
        for (var i = 0; i < len; i++) {
            var arr = [data.readByte(), data.readUTF()];
            var arr1 = [];
            var len1 = data.readShort();
            for (var j = 0; j < len1; j++) {
                arr1.push([data.readByte(), data.readInt(), data.readInt()]);
            }
            arr.push(arr1);
            Model_ShaoZhuEscort.dt.push(arr);
        }
        GGlobal.control.notify(UIConst.SHAOZHU_ESCORT_REPORT);
    };
    Model_ShaoZhuEscort.prototype.enterBattle = function (data) {
        var awards = ConfigHelp.parseItemListBa(data);
        var winerid = data.readLong();
        Model_ShaoZhuEscort.winerid = winerid;
        var headid = data.readInt();
        var jiangxian = data.readInt();
        var power = data.readLong();
        var name = data.readUTF();
        var leftid = data.readLong();
        var rightid = data.readLong();
        var ctrl = SceneCtrl.getCtrl(SceneCtrl.SHAOZHU_ESCORT);
        ctrl.power = power;
        ctrl.name = name;
        ctrl.winerid = winerid;
        ctrl.headid = headid;
        ctrl.jiangxian = jiangxian;
        ctrl.leftid = leftid;
        ctrl.rightid = rightid;
        GGlobal.mapscene.scenetype = SceneCtrl.SHAOZHU_ESCORT;
        GGlobal.mapscene.enterSceneCtrl(ctrl);
    };
    Model_ShaoZhuEscort.MAX_LEVEL = 5;
    Model_ShaoZhuEscort.roleArr = []; //护送数组
    Model_ShaoZhuEscort.escort = 0; //护送次数
    Model_ShaoZhuEscort.inter = 0; //拦截次数
    Model_ShaoZhuEscort.endTime = 0; //剩余时间
    Model_ShaoZhuEscort.state = 0; //护送状态：0：没护送，1：护送中
    Model_ShaoZhuEscort.id = 1; //少主护送配置表id
    Model_ShaoZhuEscort.roleName = "";
    Model_ShaoZhuEscort.power = 0;
    Model_ShaoZhuEscort.headID = 0;
    Model_ShaoZhuEscort.frameID = 0;
    Model_ShaoZhuEscort.country = 0;
    Model_ShaoZhuEscort.guardId = 0;
    Model_ShaoZhuEscort.rewardArr = []; //奖励数组
    Model_ShaoZhuEscort.interArr = []; //被拦截扣除数量数组
    Model_ShaoZhuEscort.isGetAward = false; //是否有奖励领取
    return Model_ShaoZhuEscort;
}(BaseModel));
__reflect(Model_ShaoZhuEscort.prototype, "Model_ShaoZhuEscort");
