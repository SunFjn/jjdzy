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
var Model_YanHui = (function (_super) {
    __extends(Model_YanHui, _super);
    function Model_YanHui() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.yanhuiArr = [];
        _this.yanHuiID = 0;
        _this.yanHuiType = 0;
        _this.roleID = 0;
        _this.roleName = "";
        _this.num = 0;
        _this.fwNum = 0;
        _this.times = 0;
        _this.jingJiuRewardData = [];
        _this.bossData = {};
        _this.bossData1 = {};
        _this.bkList = [];
        _this.isHasData = false;
        _this.fwArr = [];
        _this.applyList = [];
        _this.applySt = 0;
        return _this;
    }
    Model_YanHui.prototype.getFWData = function () {
        var self = this;
        if (self.fwArr.length <= 0) {
            for (var key in Config.partyfw_298) {
                var cfg = Config.partyfw_298[key];
                if (!self.fwArr[cfg.party - 1])
                    self.fwArr[cfg.party - 1] = [];
                if (!self.fwArr[cfg.party - 1][cfg.next - 1])
                    self.fwArr[cfg.party - 1][cfg.next - 1] = [];
                self.fwArr[cfg.party - 1][cfg.next - 1][cfg.id % 10 - 1] = cfg;
            }
        }
    };
    Model_YanHui.prototype.checkJingJiuNotice = function () {
        var self = this;
        var ret = false;
        for (var i = 0; i < self.jingJiuRewardData.length; i++) {
            if (self.jingJiuRewardData[i].state == 1) {
                return ret = true;
            }
        }
        return ret;
    };
    //协议处理
    Model_YanHui.prototype.listenServ = function (mgr) {
        var self = this;
        self.socket = mgr;
        //注册GC方法
        mgr.regHand(11452, self.GC_House_openListUI_11452, self);
        mgr.regHand(11454, self.GC_House_openHouseUI_11454, self);
        mgr.regHand(11456, self.GC_House_fuyan_11456, self);
        mgr.regHand(11458, self.GC_House_juban_11458, self);
        mgr.regHand(11460, self.GC_House_jingjiu_11460, self);
        mgr.regHand(11462, self.GC_House_lingjiang_11462, self);
        mgr.regHand(11464, self.GC_House_kaiqiBiwu_11464, self);
        mgr.regHand(11466, self.GC_House_yaoqing_11466, self);
        mgr.regHand(11468, self.GC_Yanhui_quit_11468, self);
        mgr.regHand(11470, self.GC_Yanhui_battleboss_11470, self);
        mgr.regHand(11472, self.GC_YANHUI_ICON_SHOW, self);
        mgr.regHand(11474, self.GC_Yanhui_battleresult_11474, self);
        mgr.regHand(11478, self.GC_YANHUI_LOGINDATA, self);
        mgr.regHand(11480, self.GC11480, self);
        mgr.regHand(11482, self.GC11482, self);
        mgr.regHand(11484, self.GC11484, self);
        mgr.regHand(11486, self.GC11486, self);
    };
    /**主推申请玩家 L:玩家idU:玩家名称 */
    Model_YanHui.prototype.GC11486 = function (self, data) {
        self.applyList.push({ rid: data.readLong(), name: data.readUTF() });
        GGlobal.control.notify(UIConst.YANHUI_APPLY);
    };
    /**11484批准申请进宴会返回 B:1.成功 2.无此权限 3.对方已参与宴会B:-1.全部拒绝 0.拒绝 1.同意 2.全部同意L:玩家id */
    Model_YanHui.prototype.GC11484 = function (self, data) {
        var result = data.readByte();
        var type = data.readByte();
        var rid = data.readLong();
        if (result == 1) {
            switch (type) {
                case -1:
                case 2:
                    self.applyList = [];
                    break;
                case 0:
                case 1:
                    for (var i = 0; i < self.applyList.length; i++) {
                        if (self.applyList[i].rid == rid) {
                            self.applyList.splice(i, 1);
                            break;
                        }
                    }
                    break;
            }
            GGlobal.control.notify(UIConst.YANHUI_APPLY);
        }
    };
    /**批准申请进宴会 B:-1.全部拒绝 0.拒绝 1.同意 2.全部同意L:玩家id */
    Model_YanHui.prototype.CG11483 = function (type, rid) {
        if (rid === void 0) { rid = 0; }
        var bates = this.getBytes();
        bates.writeByte(type);
        bates.writeLong(rid);
        this.sendSocket(11483, bates, true);
    };
    /**勾选申请 B:0.无需申请 1.需申请（默认是0） */
    Model_YanHui.prototype.CG11481 = function (type) {
        var bates = this.getBytes();
        bates.writeByte(type);
        this.sendSocket(11481, bates, true);
    };
    /**11482勾选申请返回 B:1.成功 2.无此权限B:0.无需申请 1.需申请 */
    Model_YanHui.prototype.GC11482 = function (self, data) {
        var result = data.readByte();
        var applySt = data.readByte();
        if (result == 1) {
            self.applySt = applySt;
            GGlobal.control.notify(UIConst.YANHUI_APPLY);
        }
    };
    /**申请加入宴会 I:宴会唯一idB:1.申请 0.取消申请 */
    Model_YanHui.prototype.CG11479 = function (rid, type) {
        var bates = this.getBytes();
        bates.writeInt(rid);
        bates.writeByte(type);
        this.sendSocket(11479, bates);
    };
    /**11480申请加入宴会返回 B:1.成功 2.正在参与宴会不可申请I:宴会唯一idB:1.申请 0.取消申请 */
    Model_YanHui.prototype.GC11480 = function (self, data) {
        var result = data.readByte();
        var yID = data.readInt();
        var isApply = data.readByte();
        if (result == 1) {
            for (var i = 0; i < self.yanhuiArr.length; i++) {
                if (self.yanhuiArr[i].id == yID) {
                    self.yanhuiArr[i].isApply = isApply;
                    break;
                }
            }
            GGlobal.control.notify(UIConst.YANHUI);
        }
        else if (result == 3) {
            ViewCommonWarn.text("宴会已结束");
        }
    };
    /**11472 显示系统图标 I:系统idB:1.显示 0.取消显示  */
    Model_YanHui.prototype.GC_YANHUI_ICON_SHOW = function (self, data) {
        var c = data.readInt();
        var st = data.readByte();
        if (st == 0) {
            self.jingJiuRewardData = [];
            GGlobal.layerMgr.close2(UIConst.YANHUI);
            GGlobal.layerMgr.close2(UIConst.YANHUI_FUYAN);
            GGlobal.layerMgr.close2(UIConst.YANHUI_HOLD);
            GGlobal.control.notify(UIConst.YANHUI_TOAST);
        }
        else if (st == 2) {
            self.jingJiuRewardData = [];
            self.yanHuiID = 0;
            GGlobal.control.notify(UIConst.YANHUI);
        }
        if (st == 0 || st == 1) {
            if (GGlobal.isEnterGame) {
                GGlobal.control.notify(Enum_MsgType.ADD_ACTIVITYICON, [c, st]);
            }
            else {
                GGlobal.modelLogin.handList.push(Handler.create(self, function () {
                    GGlobal.control.notify(Enum_MsgType.ADD_ACTIVITYICON, [c, st]);
                }));
            }
        }
    };
    /**11451  打开宴会列表界面 */
    Model_YanHui.prototype.CG_House_openListUI_11451 = function () {
        var bates = this.getBytes();
        this.sendSocket(11451, bates);
    };
    /**11452 I-[B-I-I-I-U-S-B] 打开宴会列表界面返回 I:正在参与宴会唯一idid[B:宴会id(1.普通 2.豪华)I:宴会唯一idI:头像I:头像框
     * U:玩家名称S:参与人数B:是否接受普通赴宴礼物(0.接受 1.不接受)L:宴会举办者idB:申请状态：0.未申请 1.已申请 2.已同意申请]宴会列表信息houseList*/
    Model_YanHui.prototype.GC_House_openListUI_11452 = function (self, data) {
        self.yanhuiArr = [];
        self.yanHuiID = data.readInt();
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var vo = Vo_YanHui.create();
            vo.type = data.readByte();
            vo.id = data.readInt();
            vo.head = data.readInt();
            vo.framePic = data.readInt();
            vo.roleName = data.readUTF();
            vo.num = data.readShort();
            vo.isPT = data.readByte();
            vo.holdId = data.readLong();
            vo.isApply = data.readByte();
            self.yanhuiArr.push(vo);
        }
        self.yanhuiArr.sort(function (a, b) {
            if (a.id == self.yanHuiID) {
                return -1;
            }
            else if (b.id == self.yanHuiID) {
                return 1;
            }
            else {
                var cfg0 = Config.party_298[a.type];
                var cfg1 = Config.party_298[b.type];
                if ((a.num >= cfg0.num && b.num >= cfg1.num) || (a.num < cfg0.num && b.num < cfg1.num)) {
                    return b.type - a.type;
                }
                else {
                    if (a.num >= cfg0.num) {
                        return 1;
                    }
                    else {
                        return -1;
                    }
                }
            }
        });
        GGlobal.control.notify(UIConst.YANHUI);
    };
    /**11453  打开宴会场景界面 */
    Model_YanHui.prototype.CG_House_openHouseUI_11453 = function () {
        var bates = this.getBytes();
        this.sendSocket(11453, bates);
    };
    /**11454打开宴会场景界面返回 B:1.成功 2.宴会已结束 3.请先加入宴会或举办宴会  U:玩家名称nameB:宴会ididS:参与人数numI:氛围值
     * fenweiValI:剩余时间timeL:举办者玩家id[B:敬酒idI:次数]敬酒jingjiu[U:玩家名称I:敬酒标识idB:敬酒类型B:1.领取奖励 2.已领取]领奖lingJiang
     * [I:bossId B:0.未开启 1.已开启 B:0.未挑战 1.已挑战L:BOSS唯一ID]比武biwu[U:玩家名称B:礼物类型]宾客列表binkeList[L:玩家idU:玩家名称]申请列表
     * B:申请勾选状态:0.无需申请 1.需申请（默认是0）*/
    Model_YanHui.prototype.GC_House_openHouseUI_11454 = function (self, data) {
        self.getFWData();
        self.jingJiuData = {};
        self.jingJiuRewardData = [];
        self.bossData = {};
        self.bkList = [];
        self.isHasData = true;
        var result = data.readByte();
        if (result == 1) {
            self.roleName = data.readUTF();
            self.yanHuiType = data.readByte();
            self.num = data.readShort();
            self.fwNum = data.readInt();
            self.times = data.readInt();
            self.roleID = data.readLong();
            var len = data.readShort();
            for (var i = 0; i < len; i++) {
                var arg6 = data.readByte();
                var arg7 = data.readInt();
                self.jingJiuData[arg6] = arg7;
            }
            var len1 = data.readShort();
            for (var i = 0; i < len1; i++) {
                var arg8 = data.readUTF();
                var arg9 = data.readInt();
                var arg10 = data.readByte();
                var arg11 = data.readByte();
                self.jingJiuRewardData.push({ name: arg8, id: arg9, jjID: arg10, state: arg11 });
            }
            var len2 = data.readShort();
            for (var i = 0; i < len2; i++) {
                var arg12 = data.readInt();
                var arg13 = data.readByte();
                var state = data.readByte();
                var bossID = data.readLong();
                self.bossData[arg12] = arg13;
                self.bossData1[bossID] = state;
                var role = GameUnitManager.findUnitByID(bossID);
                if (role) {
                    role.setImageState(state);
                }
                else {
                    GGlobal.control.listen(Enum_MsgType.ARPG_SCENE_ADD_NPC, self.addNpc, self);
                }
            }
            var len3 = data.readShort();
            for (var i = 0; i < len3; i++) {
                var arg14 = data.readUTF();
                var arg15 = data.readByte();
                self.bkList.push({ name: arg14, rewardId: arg15 });
            }
            var len4 = data.readShort();
            for (var i = 0; i < len4; i++) {
                var rid = data.readLong();
                var rName = data.readUTF();
                self.applyList.push({ rid: rid, name: rName });
            }
            self.applySt = data.readByte();
            GGlobal.control.notify(UIConst.YANHUI);
        }
    };
    Model_YanHui.prototype.addNpc = function (bossID) {
        var self = this;
        var role = GameUnitManager.findUnitByID(bossID);
        if (role) {
            role.setImageState(self.bossData1[bossID]);
        }
    };
    /**11455 I-B 赴宴 I:宴会唯一iduidB:礼物idtype*/
    Model_YanHui.prototype.CG_House_fuyan_11455 = function (arg1, arg2) {
        var bates = this.getBytes();
        bates.writeInt(arg1);
        bates.writeByte(arg2);
        this.sendSocket(11455, bates);
    };
    /**11456 B 赴宴 B:1.成功 2.元宝不足 3.人数已满 4.宴会已结束 5.同一时间只能参加一场宴会state*/
    Model_YanHui.prototype.GC_House_fuyan_11456 = function (self, data) {
        var result = data.readByte();
        if (result == 1) {
            YanHuiManager.getInstance().enter();
            self.CG_House_openHouseUI_11453();
        }
        else if (result == 3) {
            ViewCommonWarn.text("宴会已满员");
        }
    };
    /**11457 B-B 举办宴会 B:宴会ididB:是否接受普通赴宴礼物（0.接受 1.不接受）accept*/
    Model_YanHui.prototype.CG_House_juban_11457 = function (arg1, arg2) {
        var bates = this.getBytes();
        bates.writeByte(arg1);
        bates.writeByte(arg2);
        this.sendSocket(11457, bates);
    };
    /**11458 B-I 举办宴会返回 B:1.成功 2.vip不足 3.元宝不足 4.同一时间只能参加一场宴会 5.举办时间已过stateI:宴会唯一iduid*/
    Model_YanHui.prototype.GC_House_juban_11458 = function (self, data) {
        var result = data.readByte();
        if (result == 1) {
            self.yanHuiID = data.readInt();
            YanHuiManager.getInstance().enter();
            self.CG_House_openHouseUI_11453();
        }
        else if (result == 5) {
            ViewCommonWarn.text("不在举办时间内");
        }
    };
    /**11459 B 敬酒 B:敬酒idid*/
    Model_YanHui.prototype.CG_House_jingjiu_11459 = function (arg1) {
        var bates = this.getBytes();
        bates.writeByte(arg1);
        this.sendSocket(11459, bates, true);
    };
    /**11460 B-B-I 敬酒返回 B:1.成功 2.剩余次数不足 3.元宝不足stateB:敬酒ididI:剩余次数num*/
    Model_YanHui.prototype.GC_House_jingjiu_11460 = function (self, data) {
        var result = data.readByte();
        if (result == 1) {
            var jjID = data.readByte();
            var arg3 = data.readInt();
            self.jingJiuData[jjID] = arg3;
            GGlobal.control.notify(UIConst.YANHUI_TOAST);
        }
    };
    /**11461 敬酒领奖 I:敬酒标识id */
    Model_YanHui.prototype.CG_House_lingjiang_11461 = function (arg1) {
        var bates = this.getBytes();
        bates.writeInt(arg1);
        this.sendSocket(11461, bates, true);
    };
    /**11462 敬酒领奖返回 B:1.成功 2.已领取 3.条件不符I:敬酒标识id */
    Model_YanHui.prototype.GC_House_lingjiang_11462 = function (self, data) {
        var result = data.readByte();
        var id = data.readInt();
        if (result == 1) {
            for (var i = 0; i < self.jingJiuRewardData.length; i++) {
                if (self.jingJiuRewardData[i].id == id) {
                    self.jingJiuRewardData[i].state = 2;
                    break;
                }
            }
            GGlobal.control.notify(UIConst.YANHUI_TOAST);
        }
    };
    /**11463 I 开启比武 I:BOSSIDbossId*/
    Model_YanHui.prototype.CG_House_kaiqiBiwu_11463 = function (arg1) {
        var bates = this.getBytes();
        bates.writeInt(arg1);
        this.sendSocket(11463, bates, true);
    };
    /**11464 B 开启比武返回 B:1成功 2.比武只有主人才可开启 3.元宝不足state*/
    Model_YanHui.prototype.GC_House_kaiqiBiwu_11464 = function (self, data) {
        var result = data.readByte();
        if (result == 1) {
            ViewCommonWarn.text("开启比武成功");
            GGlobal.control.notify(UIConst.YANHUI_BATTLE);
        }
    };
    /**11465  邀请 */
    Model_YanHui.prototype.CG_House_yaoqing_11465 = function () {
        var bates = this.getBytes();
        this.sendSocket(11465, bates, true);
    };
    /**11466 B 邀请返回 B:1.成功 2.主人才可发出邀请state*/
    Model_YanHui.prototype.GC_House_yaoqing_11466 = function (self, data) {
        var result = data.readByte();
        if (result == 1) {
            ViewCommonWarn.text("邀请成功");
        }
    };
    /**11467  离开宴会场景 */
    Model_YanHui.prototype.CG_Yanhui_quit_11467 = function () {
        var bates = this.getBytes();
        this.sendSocket(11467, bates, true);
    };
    /**11468 B 离开宴会场景返回 B:1.成功离开宴会场景state*/
    Model_YanHui.prototype.GC_Yanhui_quit_11468 = function (self, data) {
        var result = data.readByte();
        if (result == 1) {
            YanHuiManager.getInstance().exite();
        }
    };
    /**11469 I 挑战boss I:boss IDbossId*/
    Model_YanHui.prototype.CG_Yanhui_battleboss_11469 = function (arg1) {
        var bates = this.getBytes();
        bates.writeInt(arg1);
        this.sendSocket(11469, bates, true);
    };
    /**11470 B 挑战boss返回 B:1.可挑战 2.该BOSS已挑战state*/
    Model_YanHui.prototype.GC_Yanhui_battleboss_11470 = function (self, data) {
        var result = data.readByte();
        var bossId = data.readInt();
        if (result == 1) {
            var battleVo = Vo_battle.create([Model_player.voMine], null, bossId);
            battleVo.sysID = UIConst.YANHUI;
            battleVo.backID = 0;
            Model_battle.battleVo = battleVo;
            YanHuiManager.getInstance().enterBattle();
            GGlobal.mapscene.enterScene(SceneCtrl.CLIENT_BATTLE);
        }
        else if (result == 2) {
            ViewCommonWarn.text("该BOSS已挑战");
        }
    };
    /**11471 B-I 前端通知boss挑战结果 B:1赢了 0输了battlerestI:boss IDbossId*/
    Model_YanHui.prototype.CG_Yanhui_battlerest_11471 = function (arg1, arg2) {
        var bates = this.getBytes();
        bates.writeByte(arg1);
        bates.writeInt(arg2);
        this.sendSocket(11471, bates, true);
    };
    /**11474 B-I 返回战斗结果 B:0输了 1赢了stateI:Boss系统idbossId*/
    Model_YanHui.prototype.GC_Yanhui_battleresult_11474 = function (self, data) {
        var result = data.readByte();
        var bossId = data.readInt();
        var arr = [];
        if (result == 1) {
            var cfg = Config.partyboss_298[bossId];
            arr = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward1));
        }
        GGlobal.control.notify(UIConst.YANHUI_PVE_END, { ret: result, awards: arr });
    };
    /**11475  战斗结束后前端请求重新进入场景   */
    Model_YanHui.prototype.CG_BATTLEEND_REENTERSCENE = function () {
        var bates = this.getBytes();
        this.sendSocket(11475, bates, true);
    };
    /**11476 战斗结束后前端请求重新进入返回场景 B:1.成功   */
    Model_YanHui.prototype.GC_BATTLEEND_REENTERSCENE = function (self, data) {
        var result = data.readInt();
        if (result == 1) {
        }
    };
    /**11478 返回宴会id I:宴会ID   */
    Model_YanHui.prototype.GC_YANHUI_LOGINDATA = function (self, data) {
        self.yanHuiID = data.readInt();
    };
    return Model_YanHui;
}(BaseModel));
__reflect(Model_YanHui.prototype, "Model_YanHui");
