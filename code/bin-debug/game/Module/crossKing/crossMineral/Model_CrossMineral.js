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
var Model_CrossMineral = (function (_super) {
    __extends(Model_CrossMineral, _super);
    function Model_CrossMineral() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**7201 打开界面  */
    Model_CrossMineral.prototype.CG_OPEN_UI = function () {
        var ba = new BaseBytes();
        this.sendSocket(7201, ba);
    };
    /**7203 邀请挖矿  */
    Model_CrossMineral.prototype.CG_INVITATION = function () {
        var ba = new BaseBytes();
        this.sendSocket(7203, ba);
    };
    /**7205 加入挖矿 L:矿主id */
    Model_CrossMineral.prototype.CG_JOIN_MINE = function (id) {
        var ba = new BaseBytes();
        ba.writeLong(id);
        this.sendSocket(7205, ba);
    };
    /**7207 刷新矿藏 B:类型:0-普通,1-一键 */
    Model_CrossMineral.prototype.CG_REFRESH_MINE = function (type) {
        var ba = new BaseBytes();
        ba.writeByte(type);
        this.sendSocket(7207, ba);
    };
    /**7209 开始挖矿  */
    Model_CrossMineral.prototype.CG_START_MINE = function () {
        var ba = new BaseBytes();
        this.sendSocket(7209, ba);
    };
    /**7211 踢出矿工 L:踢出旷工id  */
    Model_CrossMineral.prototype.CG_KICK_MINE = function (roleID) {
        var ba = new BaseBytes();
        ba.writeLong(roleID);
        this.sendSocket(7211, ba);
    };
    /**7213 离开挖矿  */
    Model_CrossMineral.prototype.CG_LEAVE_MINE = function () {
        var ba = new BaseBytes();
        this.sendSocket(7213, ba);
    };
    /**7215 前往跨服矿区  */
    Model_CrossMineral.prototype.CG_GOTO_MINE = function () {
        var ba = new BaseBytes();
        this.sendSocket(7215, ba);
    };
    /**7217 搜索矿藏  */
    Model_CrossMineral.prototype.CG_SEARCH_MINE = function () {
        var ba = new BaseBytes();
        this.sendSocket(7217, ba);
    };
    /**7219 顺手牵羊 L:矿主id */
    Model_CrossMineral.prototype.CG_STEAL_MINE = function (mineId) {
        var ba = new BaseBytes();
        ba.writeLong(mineId);
        this.sendSocket(7219, ba);
    };
    /**7221 战斗抢夺 L:矿主id*/
    Model_CrossMineral.prototype.CG_FIGHT_MINE = function (mineId) {
        var ba = new BaseBytes();
        ba.writeLong(mineId);
        this.sendSocket(7221, ba);
    };
    /**7223 打开战报  */
    Model_CrossMineral.prototype.CG_OPEN_REPORT = function () {
        var ba = new BaseBytes();
        this.sendSocket(7223, ba);
    };
    /**7227 查看录像 B:战斗中的索引 */
    Model_CrossMineral.prototype.CG_CHECK_RIDEO = function (id) {
        var ba = new BaseBytes();
        ba.writeByte(id);
        this.sendSocket(7227, ba);
    };
    /**7233	领取采矿奖励 L:矿藏主id  */
    Model_CrossMineral.prototype.CG_DRAW_REWARD_7233 = function (mineID) {
        var ba = new BaseBytes();
        Model_CrossMineral.drawMineID = mineID;
        ba.writeLong(mineID);
        this.sendSocket(7233, ba);
    };
    //协议处理
    Model_CrossMineral.prototype.listenServ = function (mgr) {
        var s = this;
        s.socket = mgr;
        mgr.regHand(7202, s.GC_OPEN_UI, s);
        mgr.regHand(7204, s.GC_INVITATION, s);
        mgr.regHand(7206, s.GC_JOIN_MINE, s);
        mgr.regHand(7208, s.GC_REFRESH_MINE, s);
        mgr.regHand(7210, s.GC_START_MINE, s);
        mgr.regHand(7212, s.GC_KICK_MINE, s);
        mgr.regHand(7214, s.GC_LEAVE_MINE, s);
        mgr.regHand(7216, s.GC_GOTO_MINE, s);
        mgr.regHand(7218, s.GC_SEARCH_MINE, s);
        mgr.regHand(7220, s.GC_STEAL_MINE, s);
        mgr.regHand(7222, s.GC_FIGHT_MINE, s);
        mgr.regHand(7224, s.GC_OPEN_REPORT, s);
        mgr.regHand(7226, s.GC_REPORT, s);
        mgr.regHand(7228, s.GC_CHECK_RIDEO, s);
        mgr.regHand(7230, s.GC_ASSISTBROCAST, s);
        mgr.regHand(7232, s.GC_JION, s);
        mgr.regHand(7234, s.GC_DRAW_REWARD_7234, s);
        mgr.regHand(7236, s.GC_MINE_DATA_SEND_7236, s);
        mgr.regHand(7238, s.GC_CROSSMINE_STATE_7238, s);
    };
    Model_CrossMineral.getMyMine = function () {
        return Model_CrossMineral.myMineVo;
    };
    /**7202  打开界面返回 B:状态:0-正常,1-不在活动时间内B:剩余顺手次数B:剩余抢夺次数[I:矿配置idL:矿主idI:已被顺次数I:已被抢次数I:剩余采集时间(-1为未开始开采)_[B:物品类型I:物品idI:物品数量I:已扣数量]资源信息[L:矿工idU:矿工名字L:矿工战力B:矿工国家I:矿工头像I:矿工头像框]矿工信息]矿信息*/
    Model_CrossMineral.prototype.GC_OPEN_UI = function (self, data) {
        Model_CrossMineral.myMineVo = null;
        Model_CrossMineral.otherMineVo = null;
        Model_CrossMineral.state = data.readByte();
        Model_CrossMineral.mySteal = data.readByte();
        Model_CrossMineral.myLoot = data.readByte();
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var cfgId = data.readInt();
            var vo = Vo_MineData.create(cfgId);
            vo.mineID = data.readLong();
            vo.mySteal = data.readInt();
            vo.myLoot = data.readInt();
            vo.times = data.readInt();
            vo.roleArr = [];
            vo.itemArr = [];
            var size = data.readShort();
            for (var j = 0; j < size; j++) {
                var arr = [data.readByte(), data.readInt(), data.readInt(), data.readInt()];
                vo.itemArr.push(arr);
            }
            //[L:矿工idU:矿工名字L:矿工战力B:矿工国家I:矿工头像I:矿工头像框
            var size1 = data.readShort();
            for (var j = 0; j < size1; j++) {
                var roleVo = new Vo_MineRole();
                roleVo.initDate(data);
                vo.roleArr.push(roleVo);
            }
            if (vo.mineID == Model_player.voMine.id) {
                Model_CrossMineral.myMineVo = vo;
            }
            else {
                Model_CrossMineral.otherMineVo = vo;
            }
        }
        GGlobal.control.notify(UIConst.CROSS_MINERAL);
    };
    /**7204 邀请挖矿返回 B: 1成功 2你没在队伍中 3你不是队长 5队员已满 6操作太频繁  */
    Model_CrossMineral.prototype.GC_INVITATION = function (self, data) {
        var result = data.readByte();
        if (result == 1) {
            ViewCommonWarn.text("邀请成功");
        }
    };
    /**7206 加入挖矿返回 队长和其他成员 B:0成功 1失败 2不存在 3已满[L:玩家idU:玩家姓名L:玩家战力B:玩家国家I:玩家头像idI:玩家头像框]  */
    Model_CrossMineral.prototype.GC_JOIN_MINE = function (self, data) {
        var result = data.readByte();
        if (result == 0) {
            ViewCommonWarn.text("加入成功");
            Model_CrossMineral._oldSelectId = MieralType.ASSIST;
            GGlobal.layerMgr.open(UIConst.CROSS_MINERAL);
        }
        else if (result == 2) {
            ViewCommonWarn.text("矿不存在");
        }
        else if (result == 3) {
            ViewCommonWarn.text("该矿协助已满");
        }
    };
    /**7208 刷新矿藏返回 B:0成功 1失败 2钱不够I:我的矿等级  */
    Model_CrossMineral.prototype.GC_REFRESH_MINE = function (self, data) {
        var ret = data.readByte();
        var level = data.readInt();
        var vo = Model_CrossMineral.getMyMine();
        vo.initLib(level);
        if (ret != 0) {
            ViewCommonWarn.text("刷新失败");
            return;
        }
        else {
            if (level != Model_CrossMineral.myMineVo.cfgID) {
                ViewCommonWarn.text("刷新成功品质无提升");
            }
            else {
                ViewCommonWarn.text("刷新成功");
            }
        }
        GGlobal.control.notify(UIConst.CROSS_MINERAL);
        GGlobal.control.notify("GC_REFRESH_MINE");
    };
    /**7210 开始挖矿返回 B:0开始挖矿成功 1失败  */
    Model_CrossMineral.prototype.GC_START_MINE = function (self, data) {
        var ret = data.readByte();
        if (ret == 0) {
            var vo = Model_CrossMineral.myMineVo;
            vo.times = vo.cfg.time;
        }
        GGlobal.control.notify(UIConst.CROSS_MINERAL);
    };
    /**7212 踢出矿工返回 B:0成功 1失败L:踢出旷工id  */
    Model_CrossMineral.prototype.GC_KICK_MINE = function (self, data) {
        var ret = data.readByte();
        if (ret == 0) {
            var roleId = data.readLong();
            var vo = Model_CrossMineral.myMineVo;
            if (vo.mineID == Model_player.voMine.id) {
                for (var j = 0; j < vo.roleArr.length; j++) {
                    if (vo.roleArr[j].roleId == roleId) {
                        vo.roleArr.splice(j, 1);
                        break;
                    }
                }
            }
            GGlobal.control.notify(UIConst.CROSS_MINERAL);
        }
    };
    /**7214 离开挖矿返回 B:0成功 1失败  */
    Model_CrossMineral.prototype.GC_LEAVE_MINE = function (self, data) {
        var ret = data.readByte();
        if (ret == 0) {
            Model_CrossMineral._oldSelectId = MieralType.OWNER;
            Model_CrossMineral.otherMineVo = null;
            GGlobal.control.notify(UIConst.CROSS_MINERAL);
        }
    };
    /**7216 前往跨服矿区返回 B:状态I:剩余免费搜索次数[I:矿配置idL:矿主idI:已被顺次数I:已被抢次数[L:矿工idU:矿工名字L:矿工战力B:矿工国家I:矿工头像I:矿工头像框]
     * 矿工信息[B:物品类型I:物品idI:物品数量]顺手牵羊奖励[B:物品类型I:物品idI:物品数量]战斗掠夺奖励]矿信息  */
    Model_CrossMineral.prototype.GC_GOTO_MINE = function (self, data) {
        var result = data.readByte();
        if (result == 0) {
            Model_CrossMineral.surNum = data.readInt();
            Model_CrossMineral.kuafuMineArr = [];
            var len = data.readShort();
            for (var i = 0; i < len; i++) {
                var cfgId = data.readInt();
                var vo = Vo_MineData.create(cfgId);
                vo.mineID = data.readLong();
                vo.mySteal = data.readInt();
                vo.myLoot = data.readInt();
                vo.roleArr = [];
                vo.itemArr = [];
                vo.stealItemArr = [];
                vo.lootItemArr = [];
                //[L:矿工idU:矿工名字L:矿工战力B:矿工国家I:矿工头像I:矿工头像框
                var size1 = data.readShort();
                for (var j = 0; j < size1; j++) {
                    var roleVo = new Vo_MineRole();
                    roleVo.initDate(data);
                    vo.roleArr.push(roleVo);
                }
                var size = data.readShort();
                for (var j = 0; j < size; j++) {
                    var arr = [data.readByte(), data.readInt(), data.readInt()];
                    vo.stealItemArr.push(arr);
                }
                var size2 = data.readShort();
                for (var j = 0; j < size2; j++) {
                    var arr = [data.readByte(), data.readInt(), data.readInt()];
                    vo.lootItemArr.push(arr);
                }
                Model_CrossMineral.kuafuMineArr.push(vo);
            }
        }
        GGlobal.control.notify(UIConst.CROSS_MINERAL);
    };
    /**7218 搜索矿藏返回 B:状态[I:矿配置idL:矿主idI:已被顺次数I:已被抢次数[L:矿工idU:矿工名字L:矿工战力B:矿工国家I:矿工头像I:矿工头像框]矿工信息
     * [B:物品类型I:物品idI:物品数量]顺手牵羊奖励[B:物品类型I:物品idI:物品数量]战斗掠夺奖励]矿信息  */
    Model_CrossMineral.prototype.GC_SEARCH_MINE = function (self, data) {
        var result = data.readByte();
        if (result == 0) {
            Model_CrossMineral.surNum--;
            Model_CrossMineral.kuafuMineArr = [];
            var len = data.readShort();
            for (var i = 0; i < len; i++) {
                var cfgId = data.readInt();
                var vo = Vo_MineData.create(cfgId);
                vo.mineID = data.readLong();
                vo.mySteal = data.readInt();
                vo.myLoot = data.readInt();
                vo.roleArr = [];
                vo.itemArr = [];
                vo.stealItemArr = [];
                vo.lootItemArr = [];
                //[L:矿工idU:矿工名字L:矿工战力B:矿工国家I:矿工头像I:矿工头像框
                var size1 = data.readShort();
                for (var j = 0; j < size1; j++) {
                    var roleVo = new Vo_MineRole();
                    roleVo.initDate(data);
                    vo.roleArr.push(roleVo);
                }
                var size = data.readShort();
                for (var j = 0; j < size; j++) {
                    var arr = [data.readByte(), data.readInt(), data.readInt()];
                    vo.stealItemArr.push(arr);
                }
                var size2 = data.readShort();
                for (var j = 0; j < size2; j++) {
                    var arr = [data.readByte(), data.readInt(), data.readInt()];
                    vo.lootItemArr.push(arr);
                }
                Model_CrossMineral.kuafuMineArr.push(vo);
            }
        }
        else if (result == 2) {
            ViewCommonWarn.text("暂无矿可搜索");
        }
        GGlobal.control.notify(UIConst.CROSS_MINERAL);
    };
    /**7220 顺手牵羊返回 B:状态  2-顺手牵羊次数不足3,矿藏已无资源*/
    Model_CrossMineral.prototype.GC_STEAL_MINE = function (self, data) {
        var result = data.readByte();
        if (result == 0) {
            Model_CrossMineral.mySteal -= 1;
            ViewCommonWarn.text("顺手成功");
            GGlobal.control.notify(UIConst.CROSS_MINERAL);
        }
        else if (result == 2) {
            ViewCommonWarn.text("顺手牵羊次数不足");
        }
        else if (result == 3) {
            ViewCommonWarn.text("矿藏已无资源");
        }
    };
    /**7222 战斗抢夺返回 B:战斗结果0成功 1没有抢夺次数 2失败[B:物品类型I:物品idI:物品数量]抢夺奖励L:胜利者IDI:头像IDI:将衔IDL:胜利者战力U:胜利者名字L:左边玩家IDL:右边玩家ID*/
    Model_CrossMineral.prototype.GC_FIGHT_MINE = function (self, data) {
        var ret = data.readByte();
        if (ret == 0) {
            Model_CrossMineral.myLoot -= 1;
            self.enterBattle(data);
        }
        else {
            switch (ret) {
                case 1:
                    ViewCommonWarn.text("采矿时间已结束,矿场关闭");
                    break;
                case 2:
                    ViewCommonWarn.text("今日抢夺次数已耗尽");
                    break;
                case 3:
                    var str = BroadCastManager.reTxt("该矿藏已被抢夺{0}次,给条活路吧", ConfigHelp.getSystemNum(6603));
                    ViewCommonWarn.text(str);
                    break;
            }
        }
    };
    /**7224 打开战报返回 [B:战斗结果 0 失败 1胜利 2顺手牵羊L:攻击者idU:攻击者名字nameB:抢夺的矿类型[B:道具类型I:道具idI:道具数量]奖励]战报数据*/
    Model_CrossMineral.prototype.GC_OPEN_REPORT = function (self, data) {
        var len = data.readShort();
        var dt = [];
        for (var i = 0; i < len; i++) {
            var arr = [data.readByte(), data.readLong(), data.readUTF(), data.readByte()];
            var arr1 = [];
            var len1 = data.readShort();
            for (var j = 0; j < len1; j++) {
                arr1.push([data.readByte(), data.readInt(), data.readInt()]);
            }
            arr.push(arr1);
            dt.push(arr);
        }
        GGlobal.control.notify(UIConst.CROSS_MINERAL_REPORT, dt);
    };
    /**7226 战报推送 B:状态*/
    Model_CrossMineral.prototype.GC_REPORT = function (self, data) {
        GGlobal.mainUICtr.addReportBTN(UIConst.CROSS_MINERAL);
    };
    /**7228 查看录像返回 [B:物品类型I:物品idI:物品数量]抢夺奖励L:胜利玩家IDI:头像IDI:将衔IDL:左边玩家IDL:右边玩家I*/
    Model_CrossMineral.prototype.GC_CHECK_RIDEO = function (self, data) {
        GGlobal.layerMgr.close2(UIConst.CROSS_MINERAL_REPORT);
        self.enterBattle(data);
    };
    Model_CrossMineral.prototype.enterBattle = function (data) {
        var awards = ConfigHelp.parseItemListBa(data);
        var winerid = data.readLong();
        var headid = data.readInt();
        var jiangxian = data.readInt();
        var power = data.readLong();
        var name = data.readUTF();
        var leftid = data.readLong();
        var rightid = data.readLong();
        var ctrl = SceneCtrl.getCtrl(SceneCtrl.WA_KUANG);
        ctrl.power = power;
        ctrl.name = name;
        ctrl.winerid = winerid;
        ctrl.headid = headid;
        ctrl.jiangxian = jiangxian;
        ctrl.leftid = leftid;
        ctrl.rightid = rightid;
        GGlobal.mapscene.scenetype = SceneCtrl.WA_KUANG;
        GGlobal.mapscene.enterSceneCtrl(ctrl);
    };
    /**7230 邀请广播 L:矿主IDU:矿主名字I:矿类型*/
    Model_CrossMineral.prototype.GC_ASSISTBROCAST = function (self, data) {
        var id = data.readLong();
        var name = data.readUTF();
        var type = data.readInt();
        var mineName = HtmlUtil.fontNoSize(Config.kfkz_275[type].name, Color.getColorStr(Config.kfkz_275[type].pz));
        var str = Config.tishi_703[64].content;
        var link = HtmlUtil.createLink("[color=#15f234]【点击参与】[/color]", true, "wakuang");
        str = BroadCastManager.reTxt(str, name, mineName, link);
        GGlobal.modelchat.addChatByClient(Model_Chat.SYSTEM, 0, str, id + "");
    };
    /**7232 推送有新矿工加入 L:新矿工idU:新矿工名字L:矿主id[L:矿工idU:矿工名字L:矿工战力B:矿工国家I:矿工头像I:矿工头像框]矿工信息*/
    Model_CrossMineral.prototype.GC_JION = function (self, data) {
        var newID = data.readLong();
        var newName = data.readUTF();
        ViewCommonWarn.text("有玩家" + HtmlUtil.fontNoSize(newName, Color.getColorStr(2)) + "加入");
        var mineID = data.readLong();
        if (mineID != Model_player.voMine.id) {
            var len = data.readShort();
            Model_CrossMineral.otherMineVo.roleArr = [];
            for (var i = 0; i < len; i++) {
                var vo = new Vo_MineRole();
                vo.initDate(data);
                Model_CrossMineral.otherMineVo.roleArr.push(vo);
            }
        }
        else {
            var len = data.readShort();
            Model_CrossMineral.myMineVo.roleArr = [];
            for (var i = 0; i < len; i++) {
                var vo = new Vo_MineRole();
                vo.initDate(data);
                Model_CrossMineral.myMineVo.roleArr.push(vo);
            }
        }
        GGlobal.control.notify(UIConst.CROSS_MINERAL);
    };
    /**7234	领取采矿奖励返回 B:状态:0-成功,1-失败 I:矿配置id*/
    Model_CrossMineral.prototype.GC_DRAW_REWARD_7234 = function (self, data) {
        var ret = data.readByte();
        if (ret == 0) {
            var cfgID = data.readInt();
            ViewCommonWarn.text("领取成功");
            if (Model_CrossMineral.drawMineID == Model_player.voMine.id) {
                var vo = Model_CrossMineral.myMineVo;
                vo.initLib(cfgID);
                vo.itemArr = [];
                for (var i = 0; i < vo.roleArr.length; i++) {
                    if (vo.roleArr[i].roleId != Model_player.voMine.id) {
                        vo.roleArr.splice(i, 1);
                        i--;
                    }
                }
                vo.times = -1;
            }
            else {
                Model_CrossMineral._oldSelectId = MieralType.OWNER;
                Model_CrossMineral.otherMineVo = null;
            }
            Model_CrossMineral.drawMineID = 0;
            GGlobal.control.notify(UIConst.CROSS_MINERAL);
        }
    };
    /**7236	推送矿藏信息 B:推送类型:1-开始采集,2-角色加入,3-队长踢人,4-队长刷新矿的品质,5-被抢夺,6-被顺手,7-矿工离开8采集完成9-发送奖励(后端用)10-通知改名
     * U:对象名字I:矿配置idL:矿主idI:已被顺次数I:已被抢次数I:剩余采集时间(-1为未开始开采)
    [B:物品类型I:物品idI:物品数量I:已扣数量]资源信息[L:矿工idU:矿工名字L:矿工战力B:矿工国家I:矿工头像I:矿工头像框]矿工信息 */
    Model_CrossMineral.prototype.GC_MINE_DATA_SEND_7236 = function (self, data) {
        var ret = data.readByte();
        var name = data.readUTF();
        var cfgID = data.readInt();
        var mineID = data.readLong();
        var vo;
        if (Model_player.voMine.id == mineID) {
            vo = Model_CrossMineral.myMineVo;
            if (ret == 2) {
                ViewCommonWarn.text(HtmlUtil.fontNoSize(name, Color.getColorStr(2)) + "加入了你的采矿队伍");
            }
        }
        else if (Model_CrossMineral.otherMineVo && mineID == Model_CrossMineral.otherMineVo.mineID) {
            vo = Model_CrossMineral.otherMineVo;
            switch (ret) {
                case 3:
                    ViewCommonWarn.text(HtmlUtil.fontNoSize(name, Color.getColorStr(2)) + "被踢出队伍");
                    break;
            }
        }
        if (vo) {
            vo.mySteal = data.readInt();
            vo.myLoot = data.readInt();
            vo.times = data.readInt();
            vo.itemArr = [];
            vo.roleArr = [];
            var size = data.readShort();
            for (var j = 0; j < size; j++) {
                var arr = [data.readByte(), data.readInt(), data.readInt(), data.readInt()];
                vo.itemArr.push(arr);
            }
            var index = 0;
            var size1 = data.readShort();
            for (var j = 0; j < size1; j++) {
                var roleVo = new Vo_MineRole();
                roleVo.initDate(data);
                vo.roleArr.push(roleVo);
                if (roleVo.roleId == Model_player.voMine.id) {
                    index++;
                }
            }
            if (index <= 0) {
                Model_CrossMineral._oldSelectId = MieralType.OWNER;
                Model_CrossMineral.otherMineVo = vo = null;
            }
        }
        if (ret == 9) {
            Model_CrossMineral._oldSelectId = MieralType.OWNER;
            Model_CrossMineral.otherMineVo = null;
        }
        GGlobal.control.notify(UIConst.CROSS_MINERAL);
    };
    /**7238	推送矿藏活动开启 B:状态:0-正常,1-不在活动时间内 */
    Model_CrossMineral.prototype.GC_CROSSMINE_STATE_7238 = function (self, data) {
        Model_CrossMineral.state = data.readByte();
    };
    Model_CrossMineral.MAX_LEVEL = 5;
    /**我的顺手次数 */
    Model_CrossMineral.mySteal = 0; //
    /**我的抢夺次数 */
    Model_CrossMineral.myLoot = 0; //
    /**开服矿场数据 */
    Model_CrossMineral.kuafuMineArr = [];
    /**选中我的矿场还是协助 */
    Model_CrossMineral._oldSelectId = 0;
    /**领取奖励的矿主ID */
    Model_CrossMineral.drawMineID = 0;
    /**剩余免费搜素次数 */
    Model_CrossMineral.surNum = 0;
    /**:0-正常,1-不在活动时间内 */
    Model_CrossMineral.state = 0;
    return Model_CrossMineral;
}(BaseModel));
__reflect(Model_CrossMineral.prototype, "Model_CrossMineral");
