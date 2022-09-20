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
/**
 * 桃园结义数据管理
 */
var Model_TYJY = (function (_super) {
    __extends(Model_TYJY, _super);
    function Model_TYJY() {
        var _this = _super.call(this) || this;
        /**战斗信息 */
        _this.battleInfo = { bossHp: 1 };
        _this.lifeTime = 0;
        _this.gangName = "";
        _this.list = [];
        _this.curPage = 0;
        _this.totalPage = 0;
        _this.myGangList = [];
        _this.myGangName = "";
        _this.taskObj = {};
        _this.applyList = [];
        _this.joinGang = "";
        _this.isBossOpen = 0;
        _this.bossOpenByPlayer = "";
        _this.bossGet = 0;
        _this.bossPro = 0;
        _this.bossTime = 0;
        return _this;
    }
    /**3101 CG 打开结义列表 I:分页  */
    Model_TYJY.prototype.CG_GET_INFOS = function (page) {
        var ba = new BaseBytes();
        ba.writeInt(page);
        this.sendSocket(3101, ba);
    };
    /**3103 CG 打开我的义盟  */
    Model_TYJY.prototype.CG_OPEN_MYGANG = function () {
        var ba = new BaseBytes();
        this.sendSocket(3103, ba);
    };
    /**3105 CG 申请加入义盟 L:义盟唯一id  */
    Model_TYJY.prototype.CG_APPLY_JOIN = function (id) {
        var ba = new BaseBytes();
        ba.writeLong(id);
        this.sendSocket(3105, ba);
    };
    /**3107 CG 获取申请列表  */
    Model_TYJY.prototype.CG_GET_APPLYMEMBER = function () {
        var ba = new BaseBytes();
        this.sendSocket(3107, ba);
    };
    /**3109 CG 批准申请 B:1.同意 2拒绝 3全部拒绝L:玩家id  */
    Model_TYJY.prototype.CG_APPROVAL_APPLY = function (status, playerId) {
        var ba = new BaseBytes();
        ba.writeByte(status);
        ba.writeLong(playerId);
        this.sendSocket(3109, ba);
    };
    /**3111 CG 取消申请加入义盟 L:义盟id  */
    Model_TYJY.prototype.CG_CANCEL_APPLY = function (id) {
        var ba = new BaseBytes();
        ba.writeLong(id);
        this.sendSocket(3111, ba);
    };
    /**3113 CG 退出义盟   */
    Model_TYJY.prototype.CG_QUIT = function () {
        var ba = new BaseBytes();
        this.sendSocket(3113, ba);
    };
    /**3115 CG 踢人 L:兄弟id   */
    Model_TYJY.prototype.CG_EXPEL = function (id) {
        var ba = new BaseBytes();
        ba.writeLong(id);
        this.sendSocket(3115, ba);
    };
    /**3117 CG 领取礼包 I:任务idB: 1人礼包 2人礼包 3人礼包  */
    Model_TYJY.prototype.CG_GET_REWARD = function (taskId, type) {
        var ba = new BaseBytes();
        ba.writeInt(taskId);
        ba.writeByte(type);
        this.sendSocket(3117, ba);
    };
    /**3119 CG 转让大哥 L:对方id  */
    Model_TYJY.prototype.CG_TRANSFER = function (id) {
        var ba = new BaseBytes();
        ba.writeLong(id);
        this.sendSocket(3119, ba);
    };
    /**3121 CG 申请大哥  */
    Model_TYJY.prototype.CG_APPLY_BROTHER = function () {
        var ba = new BaseBytes();
        this.sendSocket(3121, ba);
    };
    /**3123 CG 招募兄弟  */
    Model_TYJY.prototype.CG_RECRUITING = function () {
        var ba = new BaseBytes();
        this.sendSocket(3123, ba);
    };
    /**3125 CG 修改义盟名字 U:义盟名字  */
    Model_TYJY.prototype.CG_CHANGE_NAME = function (name) {
        var ba = new BaseBytes();
        ba.writeUTF(name);
        this.sendSocket(3125, ba);
        this.gangName = name;
    };
    /**3127 CG 创建义盟 U:义盟名称  */
    Model_TYJY.prototype.CG_CREATE = function (name) {
        var ba = new BaseBytes();
        ba.writeUTF(name);
        this.sendSocket(3127, ba);
    };
    /**3131 CG 打开桃园BOSS界面  */
    Model_TYJY.prototype.CG_OPEN_TYBOSSUI = function () {
        var ba = new BaseBytes();
        this.sendSocket(3131, ba);
    };
    /**3133 CG 开启桃园BOSS I:BOSS id  */
    Model_TYJY.prototype.CG_OPEN_BOSS = function (id) {
        var ba = new BaseBytes();
        ba.writeInt(id);
        this.sendSocket(3133, ba);
    };
    /**3135 CG 领取桃园BOSS奖励  */
    Model_TYJY.prototype.CG_GET_BOSSREWARD = function () {
        var ba = new BaseBytes();
        this.sendSocket(3135, ba);
    };
    /**3137 CG 挑战BOSS  */
    Model_TYJY.prototype.CG_CHALLENGE_BOSS = function () {
        var ba = new BaseBytes();
        this.sendSocket(3137, ba);
    };
    /**3141 CG 通知/退出/复活桃园BOSS 0.退出 1复活 2通知后端本人死亡 B:0.退出 1复活 2通知后端本人死亡   */
    Model_TYJY.prototype.CG_QUIT_TAOYUANBOSS = function (type) {
        var ba = new BaseBytes();
        ba.writeByte(type);
        this.sendSocket(3141, ba);
    };
    /** 注册 WEBSOCKET HANLDER 函数*/
    Model_TYJY.prototype.listenServ = function (wsm) {
        var self = this;
        self.socket = wsm;
        wsm.regHand(3102, self.GC_GET_INFOS, self);
        wsm.regHand(3104, self.GC_OPEN_MYGANG, self);
        wsm.regHand(3106, self.GC_APPLY_JOIN, self);
        wsm.regHand(3108, self.GC_GET_APPLYMEMBER, self);
        wsm.regHand(3110, self.GC_APPROVAL_APPLY, self);
        wsm.regHand(3112, self.GC_CANCEL_APPLY, self);
        wsm.regHand(3114, self.GC_QUIT, self);
        wsm.regHand(3116, self.GC_EXPEL, self);
        wsm.regHand(3118, self.GC_GET_REWARD, self);
        wsm.regHand(3120, self.GC_TRANSFER, self);
        wsm.regHand(3122, self.GC_APPLY_BROTHER, self);
        wsm.regHand(3124, self.GC_RECRUITING, self);
        wsm.regHand(3126, self.GC_CHANGE_NAME, self);
        wsm.regHand(3128, self.GC_CREATE, self);
        wsm.regHand(3130, self.GC_NOTICE, self);
        wsm.regHand(3132, self.GC_OPEN_TYBOSSUI, self);
        wsm.regHand(3134, self.GC_OPEN_BOSS, self);
        wsm.regHand(3136, self.GC_GET_BOSSREWARD, self);
        wsm.regHand(3138, self.GC_CHALLENGE_BOSS, self);
        wsm.regHand(3140, self.GC_HURT_INFO, self);
        wsm.regHand(3142, self.GC_QUIT_TAOYUANBOSS, self);
        wsm.regHand(3144, self.GC_BEKILL, self);
        wsm.regHand(3146, self.GC_BOSS_DIE, self);
        wsm.regHand(3148, self.GC_LIVE_NOTICE, self);
    };
    /**3102 GC 打开结义列表 [L:义盟idI:义盟人数U:义盟名称B:状态：4.取消申请 3.申请加入 2申请已满 1已满员L:总战力U:大哥名称]I:当前页数I:总页数 */
    Model_TYJY.prototype.GC_GET_INFOS = function (s, data) {
        s.list = [];
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var v = new TYJY_VO();
            v.readGangMsg(data);
            s.list.push(v);
        }
        s.curPage = data.readInt();
        s.totalPage = data.readInt();
        GGlobal.control.notify(UIConst.TAOYUANJIEYI);
        GGlobal.reddot.setCondition(UIConst.TAOYUANJIEYI, 0, false);
        GGlobal.reddot.setCondition(UIConst.TYJY_YMRW, 0, false);
        GGlobal.reddot.setCondition(UIConst.TYJY_YMFB, 0, false);
        GGlobal.reddot.notifyMsg(UIConst.TYJY_YMRW);
    };
    /**3104 GC 我的义盟信息 [L:玩家idU:玩家姓名I:玩家离线时间 =0在线，>0离线时间(秒)I:头像I:头像框B:地位标识：1.大哥 2.二哥 3.三弟B:VIP等级I:玩家等级L:战力]成员信息[I:任务id[U:玩家名称I:任务完成参数][B:奖励状态：0.条件不符 1.可领取 2.已领取]]任务信息U:义盟名字 */
    Model_TYJY.prototype.GC_OPEN_MYGANG = function (s, data) {
        s.myGangList = [];
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var v = new TYJY_VO();
            v.readMemberMsg(data);
            s.myGangList.push(v);
        }
        len = data.readShort();
        for (var i = 0; i < len; i++) {
            var id = data.readInt();
            var len1 = data.readShort();
            var arr = [];
            for (var j = 0; j < len1; j++) {
                var name_1 = data.readUTF();
                var num = data.readInt();
                arr.push([name_1, num]);
            }
            var len2 = data.readShort();
            var arr1 = [];
            for (var k = 0; k < len2; k++) {
                var status_1 = data.readByte();
                arr1.push(status_1);
            }
            s.taskObj[id] = { id: id, arr: arr, arr1: arr1 };
        }
        s.myGangName = data.readUTF();
        GGlobal.control.notify(UIConst.TAOYUANJIEYI);
        // s.reddotCheckApply();
        s.reddotCheckTask();
    };
    /**3106 GC 申请加入返回 B:状态：1.成功 2.您已有结义兄弟 3.该义盟人数已满 4该义盟可接收申请人数已满 5.已达到申请上限 6.该义盟已解散L:义盟id */
    Model_TYJY.prototype.GC_APPLY_JOIN = function (s, data) {
        var res = data.readByte();
        if (res == 1) {
            var gangId = data.readLong();
            if (s.list) {
                var len = s.list.length;
                for (var i = 0; i < len; i++) {
                    var v = s.list[i];
                    if (v.gangId == gangId) {
                        v.status = 4;
                        break;
                    }
                }
            }
            GGlobal.control.notify(UIConst.TAOYUANJIEYI);
        }
        else if (res == 2) {
            ViewCommonWarn.text("您已有结义兄弟");
        }
        else if (res == 3) {
            ViewCommonWarn.text("该义盟人数已满");
        }
        else if (res == 4) {
            ViewCommonWarn.text("该义盟可接收申请人数已满");
        }
        else if (res == 5) {
            ViewCommonWarn.text("已达到申请上限");
        }
        else if (res == 6) {
            ViewCommonWarn.text("该义盟已解散");
        }
    };
    /**3108 GC 申请义盟列表 [L:玩家idU:玩家姓名I:玩家头像I:玩家头像框L:玩家战力B:玩家vip] */
    Model_TYJY.prototype.GC_GET_APPLYMEMBER = function (s, data) {
        s.applyList = [];
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var v = new TYJY_VO();
            v.readApplyMsg(data);
            s.applyList.push(v);
        }
        GGlobal.control.notify(UIConst.TYJY_APPLY);
    };
    /**3110 GC 批准申请返回 B:1成功 2拒绝 3申请已过期 4对方已加入义盟 5本已盟人数已满 6没有权限 7.全部拒绝 8对方已取消申请L:玩家id */
    Model_TYJY.prototype.GC_APPROVAL_APPLY = function (s, data) {
        var res = data.readByte();
        if (res == 1) {
            s.CG_OPEN_MYGANG();
        }
        if (res == 1 || res == 2 || res == 3 || res == 4 || res == 5 || res == 8) {
            var playerId = data.readLong();
            var index = 0;
            var len = s.applyList.length;
            var v = void 0;
            for (var i = 0; i < len; i++) {
                v = s.applyList[i];
                if (v.playerId == playerId) {
                    index = i;
                    break;
                }
            }
            s.applyList.splice(index, 1);
            GGlobal.control.notify(UIConst.TYJY_APPLY);
            s.reddotCheckApply();
        }
        if (res == 3) {
            ViewCommonWarn.text("申请已过期");
            return;
        }
        else if (res == 4) {
            ViewCommonWarn.text("对方已加入义盟");
            return;
        }
        else if (res == 5) {
            ViewCommonWarn.text("本盟人数已满");
            return;
        }
        else if (res == 7) {
            s.applyList = [];
            GGlobal.control.notify(UIConst.TYJY_APPLY);
            s.reddotCheckApply();
        }
        else if (res == 8) {
            ViewCommonWarn.text("对方已取消申请");
            return;
        }
    };
    /**3112 GC 取消申请返回 B:1成功 2不存在L:义盟id  */
    Model_TYJY.prototype.GC_CANCEL_APPLY = function (s, data) {
        var res = data.readByte();
        if (res == 1) {
            var gangId = data.readLong();
            if (s.list) {
                var len = s.list.length;
                for (var i = 0; i < len; i++) {
                    var v = s.list[i];
                    if (v.gangId == gangId) {
                        v.status = 3;
                        break;
                    }
                }
            }
            GGlobal.control.notify(UIConst.TAOYUANJIEYI);
        }
        else {
            ViewCommonWarn.text("义盟不存在");
            return;
        }
    };
    /**3114 GC 退出义盟返回 B:1成功 2失败  */
    Model_TYJY.prototype.GC_QUIT = function (s, data) {
        var res = data.readByte();
        if (res == 1) {
            Model_player.voMine.tyjyId = 0;
            s.myGangName = "";
            GGlobal.layerMgr.close(UIConst.TYJY_MEMBER);
            s.CG_GET_INFOS(1);
        }
        else {
            ViewCommonWarn.text("退出义盟失败");
            return;
        }
    };
    /**3116 GC 踢人返回 B:1成功 2失败L:兄弟id  */
    Model_TYJY.prototype.GC_EXPEL = function (s, data) {
        var res = data.readByte();
        if (res == 1) {
            var id = data.readLong();
            var len = s.myGangList.length;
            var index = 0;
            var v = void 0;
            for (var i = 0; i < len; i++) {
                v = s.myGangList[i];
                if (v.playerId == id) {
                    index = i;
                    break;
                }
            }
            s.myGangList.splice(index, 1);
            GGlobal.control.notify(UIConst.TAOYUANJIEYI);
        }
        else {
            ViewCommonWarn.text("踢人失败失败");
            return;
        }
    };
    /**3118 GC 领取奖励返回 B:状态：1.成功 2.背包已满 3.参数错误 4.领取条件不足I:任务idB:领取类型(1-3)  */
    Model_TYJY.prototype.GC_GET_REWARD = function (s, data) {
        var res = data.readByte();
        if (res == 1) {
            var id = data.readInt();
            var type = data.readByte();
            var arr = s.taskObj[id].arr1;
            arr[type - 1] = 2;
            GGlobal.control.notify(UIConst.TYJY_YMRW);
            s.reddotCheckTask();
        }
        else if (res == 2) {
            ViewCommonWarn.text("背包已满");
            return;
        }
        else if (res == 3) {
            ViewCommonWarn.text("参数错误");
            return;
        }
        else if (res == 4) {
            ViewCommonWarn.text("领取条件不足");
            return;
        }
    };
    /**3120 GC 转让大哥返回 B:1.成功 2.没有权限 3.该玩家已离开义盟  */
    Model_TYJY.prototype.GC_TRANSFER = function (s, data) {
        var res = data.readByte();
        if (res == 1) {
            s.CG_OPEN_MYGANG();
        }
        else if (res == 2) {
            ViewCommonWarn.text("没有权限");
        }
        else if (res == 3) {
            ViewCommonWarn.text("该玩家已离开义盟");
        }
    };
    /**3122 GC 申请大哥返回 B:1.成功 2.大哥离线3天以上才可申请 */
    Model_TYJY.prototype.GC_APPLY_BROTHER = function (s, data) {
        var res = data.readByte();
        if (res == 1) {
            s.CG_OPEN_MYGANG();
        }
        else if (res == 2) {
            ViewCommonWarn.text("大哥离线3天以上才可申请");
        }
    };
    /**3124 GC 招募兄弟返回 B:1.成功 2.人数已满 */
    Model_TYJY.prototype.GC_RECRUITING = function (s, data) {
        var res = data.readByte();
        if (res == 1) {
            s.notify(Model_TYJY.msg_invite, 10);
            // GGlobal.control.notify(UIConst.TAOYUANJIEYI);
        }
        else {
            ViewCommonWarn.text("人数已满");
        }
    };
    /**3126 GC 修改义盟名字返回 B: B:1.成功 2.非法字符 3.名字没有改变 4.名字已经存在 5.改名卡不足 6没有权限 7.名字过长 */
    Model_TYJY.prototype.GC_CHANGE_NAME = function (s, data) {
        var res = data.readByte();
        if (res == 1) {
            s.myGangName = s.gangName;
            GGlobal.layerMgr.close(UIConst.TYJY_CREATE);
            GGlobal.control.notify(UIConst.TAOYUANJIEYI);
            ViewCommonWarn.text("修改成功");
        }
        else if (res == 2) {
            ViewCommonWarn.text("非法字符");
        }
        else if (res == 3) {
            ViewCommonWarn.text("名字没有改变");
        }
        else if (res == 4) {
            ViewCommonWarn.text("名字已经存在");
        }
        else if (res == 5) {
            ViewCommonWarn.text("改名卡不足");
        }
        else if (res == 6) {
            ViewCommonWarn.text("没有权限");
        }
        else if (res == 7) {
            ViewCommonWarn.text("名字过长");
        }
    };
    /**3128 GC 创建义盟返回 B:1.成功 2.非法字符 3.名字过长 4.名字已经存在 5.元宝不足 6.已有义盟L:义盟id */
    Model_TYJY.prototype.GC_CREATE = function (s, data) {
        var res = data.readByte();
        if (res == 1) {
            var gangId = data.readLong();
            Model_player.voMine.tyjyId = gangId;
            s.CG_OPEN_MYGANG();
            GGlobal.layerMgr.close(UIConst.TYJY_CREATE);
        }
        else if (res == 2) {
            ViewCommonWarn.text("非法字符");
        }
        else if (res == 3) {
            ViewCommonWarn.text("名字过长");
        }
        else if (res == 4) {
            ViewCommonWarn.text("名字已经存在");
        }
        else if (res == 5) {
            ViewCommonWarn.text("元宝不足");
        }
        else if (res == 6) {
            ViewCommonWarn.text("已有义盟");
        }
    };
    /**3130 GC 通知有人加入有人退出 B:1加入义盟 2被踢3.通知大哥有人申请加入4.通知大哥有人取消申请L:玩家idU:玩家名称U:义盟名称L:义盟id */
    Model_TYJY.prototype.GC_NOTICE = function (s, data) {
        var res = data.readByte();
        var id = data.readLong();
        var name = data.readUTF();
        s.joinGang = data.readUTF();
        var gangId = data.readLong();
        if (res == 1) {
            Model_player.voMine.tyjyId = gangId;
            if (GGlobal.layerMgr.isOpenView(UIConst.TAOYUANJIEYI)) {
                s.CG_OPEN_MYGANG();
                return;
            }
            TYJY_JoinTipsView.show();
        }
        else if (res == 2) {
            Model_player.voMine.tyjyId = 0;
            s.CG_GET_INFOS(1);
        }
        else if (res == 3) {
            GGlobal.reddot.setCondition(UIConst.TAOYUANJIEYI, 0, true);
            GGlobal.reddot.notifyMsg(UIConst.TAOYUANJIEYI);
        }
        else if (res == 4) {
            var index = 0;
            var len = s.applyList.length;
            var v = void 0;
            for (var i = 0; i < len; i++) {
                v = s.applyList[i];
                if (v.playerId == id) {
                    index = i;
                    break;
                }
            }
            s.applyList.splice(index, 1);
            s.reddotCheckApply();
        }
    };
    /**3132 GC 打开桃园BOSS界面返回 I:BOSS id 0.未开启U:开启玩家名称B:领取状态：0.条件不符 1.可领取 2.已领取I:完成义盟任务数量I:剩余时间（秒） */
    Model_TYJY.prototype.GC_OPEN_TYBOSSUI = function (s, data) {
        Model_TYJY.curBossID = data.readInt();
        s.bossOpenByPlayer = data.readUTF();
        s.bossGet = data.readByte();
        s.bossPro = data.readInt();
        s.bossTime = data.readInt();
        GGlobal.control.notify(UIConst.TYJY_YMFB);
        s.reddotCheckBoss();
    };
    /**3134 GC 开启桃园BOSS返回 B:1.成功 2.BOSS已被开启 3.开启条件不足 4.元宝不足 5.参数错误I:BOSS idU:开启玩家名称 */
    Model_TYJY.prototype.GC_OPEN_BOSS = function (s, data) {
        var res = data.readByte();
        if (res == 1) {
            Model_TYJY.curBossID = data.readInt();
            s.bossOpenByPlayer = data.readUTF();
            GGlobal.control.notify(UIConst.TYJY_YMFB);
            if (GGlobal.layerMgr.isOpenView(UIConst.TYJY_BOSSTIPS)) {
                GGlobal.layerMgr.close(UIConst.TYJY_BOSSTIPS);
            }
        }
        else if (res == 2) {
            ViewCommonWarn.text("BOSS已被开启");
        }
        else if (res == 3) {
            ViewCommonWarn.text("开启条件不足");
        }
        else if (res == 4) {
            ViewCommonWarn.text("元宝不足");
        }
        else if (res == 5) {
            ViewCommonWarn.text("参数错误");
        }
    };
    /**3136 GC 领取桃园BOSS奖励 B:1.成功 2.背包已满 3.领取条件不足 */
    Model_TYJY.prototype.GC_GET_BOSSREWARD = function (s, data) {
        var res = data.readByte();
        if (res == 1) {
            s.bossGet = 2;
            GGlobal.control.notify(UIConst.TYJY_YMFB);
            s.reddotCheckBoss();
        }
        else if (res == 2) {
            ViewCommonWarn.text("背包已满");
        }
        else if (res == 3) {
            ViewCommonWarn.text("领取条件不足");
        }
    };
    /**3138 GC 挑战BOSS返回 B:1.成功 2.失败2boss已经死亡3你已经在副本内I:BOSS id */
    Model_TYJY.prototype.GC_CHALLENGE_BOSS = function (s, data) {
        var state = data.readByte();
        Model_TYJY.curBossID = data.readInt();
        switch (state) {
            case 1://成功
                GGlobal.mapscene.enterScene(SceneCtrl.TAOYUANJIEYI);
                GGlobal.layerMgr.close2(UIConst.TAOYUANJIEYI);
                break;
            case 2:
                ViewCommonWarn.text("boss已经死亡");
                s.CG_OPEN_TYBOSSUI();
                break;
            case 3:
                ViewCommonWarn.text("您已经在副本中");
                break;
        }
    };
    /**3140 GC 场景中伤害数据同步 L:我的气血L:boss最大气血L:boss当前血量L:我的伤害值[U:玩家名称L:玩家伤害] */
    Model_TYJY.prototype.GC_HURT_INFO = function (s, data) {
        s.battleInfo = s.battleInfo || {};
        data.readLong();
        s.battleInfo.bossMaxHp = data.readLong();
        s.battleInfo.bossHp = data.readLong();
        s.battleInfo.myDamage = data.readLong();
        s.battleInfo.others = [];
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            s.battleInfo.others.push({ name: data.readUTF(), demage: data.readLong() });
        }
        s.notify(Model_TYJY.msg_batInfo);
    };
    /**3142 GC 退出桃园BOSS返回 B:1成功 2元宝不足B:类型：0.退出 1复活 2通知后端本人死亡 */
    Model_TYJY.prototype.GC_QUIT_TAOYUANBOSS = function (s, data) {
        var state = data.readByte();
        var type = data.readByte();
        switch (state) {
            case 1://1成功
                if (type == 0) {
                    // const awards = Config.tyjyboss_251[Model_TYJY.curBossID].reward;
                    // const drops = ConfigHelp.makeItemListArr(JSON.parse(awards));
                    if (s.battleInfo && s.battleInfo.bossHp > 0) {
                        if (!GGlobal.layerMgr.isOpenView(UIConst.COMMON_FAIL)) {
                            ViewCommonFail.show(5000, s, "离开", s.realQuit, null, null);
                        }
                    }
                    else {
                        if (!GGlobal.layerMgr.isOpenView(UIConst.COMMON_WIN)) {
                            ViewCommonWin.show(null, 10000, s, "退出", s.realQuit);
                        }
                    }
                }
                else if (type == 1) {
                    s.notify(Model_TYJY.ROLE_LIFE);
                }
                break;
            case 2://失败
                ViewCommonWarn.text("退出失败!");
                break;
        }
    };
    Model_TYJY.prototype.realQuit = function () {
        GGlobal.modelScene.returnMainScene();
        GGlobal.layerMgr.close2(UIConst.BATTLEWIN);
        if (GGlobal.layerMgr.lastPanelId <= 0)
            GGlobal.layerMgr.open(UIConst.TYJY_YMFB);
    };
    /**3144 GC 被击杀的玩家id [L:玩家id] */
    Model_TYJY.prototype.GC_BEKILL = function (s, data) {
        var id = Model_player.voMine.id;
        var len = data.readShort();
        var temp = [];
        for (var i = 0; i < len; i++) {
            var l = data.readLong();
            if (l == id) {
                GGlobal.control.notify(Enum_MsgType.MSG_MINEHPCHANGE, { hp: 0 });
                s.lifeTime = Model_GlobalMsg.getServerTime() + ConfigHelp.getSystemNum(1012) * 1000;
                s.notify(Model_TYJY.ROLE_LIFE, 1);
            }
            else {
                temp.push(l);
            }
        }
        s.notify(Model_TYJY.SCENE_PLAYER_STATE, { st: 1, list: temp });
    };
    /**3146 GC 广播副本内玩家boss死亡  */
    Model_TYJY.prototype.GC_BOSS_DIE = function (s, data) {
        ViewBroadcastText.showMsg("桃园BOSS已经死亡，领奖励去吧!");
        s.notify(Model_TYJY.msg_bossBeenKill);
    };
    /**3148 GC 通知玩家复活 [L:复活玩家id]  */
    Model_TYJY.prototype.GC_LIVE_NOTICE = function (s, data) {
        var id = Model_player.voMine.id;
        var len = data.readShort();
        var temp = [];
        for (var i = 0; i < len; i++) {
            var l = data.readLong();
            if (l == id) {
                if (Model_player.voMine.sceneChar)
                    Model_player.voMine.sceneChar.curhp = Model_player.voMine.sceneChar.maxhp;
                s.notify(Model_TYJY.ROLE_LIFE, 0);
            }
            else {
                temp.push(l);
            }
        }
        s.notify(Model_TYJY.MSG_PLAYER_RELIFE, temp);
    };
    /**
     * 根据离线秒数获取时间文本
     */
    Model_TYJY.prototype.getOffLineStr = function (second) {
        var str = "";
        var oneHour = 60 * 60;
        var oneDay = 24 * oneHour;
        var threeDay = 3 * oneDay;
        var time;
        if (second < oneHour) {
            str = "离线＜1小时";
        }
        else if (second >= oneHour && second < oneDay) {
            time = Math.floor(second / oneHour);
            str = "离线" + time + "小时";
        }
        else if (second >= oneDay && second < threeDay) {
            time = Math.floor(second / oneDay);
            str = "离线" + time + "天";
        }
        else {
            str = "离线＞3天";
        }
        return str;
    };
    /** 检查申请列表红点 */
    Model_TYJY.prototype.reddotCheckApply = function () {
        var bol = false;
        var sf = GGlobal.reddot;
        var list = GGlobal.model_TYJY.applyList;
        if (list && list.length > 0) {
            bol = true;
        }
        sf.setCondition(UIConst.TAOYUANJIEYI, 0, bol);
        sf.notifyMsg(UIConst.TAOYUANJIEYI);
    };
    /** 检查任务列表红点 */
    Model_TYJY.prototype.reddotCheckTask = function () {
        var bol = false;
        var sf = GGlobal.reddot;
        for (var key in GGlobal.model_TYJY.taskObj) {
            var obj = GGlobal.model_TYJY.taskObj[key];
            var arr = obj.arr1;
            for (var i = 0; i < arr.length; i++) {
                var status_2 = arr[i];
                if (status_2 == 1) {
                    bol = true;
                    break;
                }
            }
            if (bol)
                break;
        }
        sf.setCondition(UIConst.TYJY_YMRW, 0, bol);
        sf.notifyMsg(UIConst.TYJY_YMRW);
    };
    /** 检查boss奖励红点 */
    Model_TYJY.prototype.reddotCheckBoss = function () {
        var bol = false;
        var sf = GGlobal.reddot;
        if (GGlobal.model_TYJY.bossGet == 1) {
            bol = true;
        }
        else if (GGlobal.model_TYJY.bossGet == 0) {
            var total = Config.xtcs_004[7702].num;
            if (GGlobal.model_TYJY.bossPro >= total) {
                bol = true;
            }
        }
        sf.setCondition(UIConst.TYJY_YMFB, 0, bol);
        sf.notifyMsg(UIConst.TYJY_YMFB);
    };
    Model_TYJY.msg_batInfo = "msg_batInfo";
    Model_TYJY.msg_beenKiller = "msg_beenKiller"; //更新被杀的玩家
    Model_TYJY.msg_bossBeenKill = "msg_bossBeenKill"; //boss已被杀
    Model_TYJY.msg_invite = "msg_invite";
    Model_TYJY.ROLE_LIFE = "role_life"; //复活
    Model_TYJY.MSG_PLAYER_RELIFE = "msg_player_relife"; //其他玩家复活
    Model_TYJY.SCENE_PLAYER_STATE = "scene_player_state";
    return Model_TYJY;
}(BaseModel));
__reflect(Model_TYJY.prototype, "Model_TYJY");
