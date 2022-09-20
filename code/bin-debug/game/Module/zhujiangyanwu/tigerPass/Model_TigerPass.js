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
var Model_TigerPass = (function (_super) {
    __extends(Model_TigerPass, _super);
    function Model_TigerPass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.curId = 0;
        _this.bossCurHp = 0;
        _this.bossMaxHp = 0;
        _this.batCt = 0;
        _this.cdTime = 0;
        _this.isEmploy = 0;
        _this.ctEmploy = 0;
        //列表
        _this.employArr = [];
        return _this;
    }
    Model_TigerPass.prototype.listenServ = function (wsm) {
        _super.prototype.listenServ.call(this, wsm);
        wsm.regHand(8902, this.GCOpenUI8902, this);
        wsm.regHand(8904, this.GCBattle8904, this);
        wsm.regHand(8906, this.GCBattleInfo8906, this);
        wsm.regHand(8908, this.GCBattleRes8908, this);
        wsm.regHand(8910, this.GCOpenEmploy8910, this);
        wsm.regHand(8912, this.GCChooseEmploy8912, this);
        wsm.regHand(8914, this.GCJoinEmploy8914, this);
        wsm.regHand(8916, this.GCRefreshEmploy8916, this);
        wsm.regHand(8918, this.GCgetReward8918, this);
    };
    /**openUI */
    Model_TigerPass.prototype.CGOpenUI8901 = function () {
        var bytes = this.getBytes();
        this.sendSocket(8901, bytes);
    };
    //GC 打开ui返回 B: 当前boss序号L:boss当前血量L: boss最大血量B:剩余进入次数I: 距离下次增加次数时间B:自己是否加入雇佣兵0没有1有[B:奖励序号B:奖励领取情况0 1 2]L: 雇佣兵id 0没有 >0有I: 头像I:头像框U: 玩家名字I:玩家vipL: 玩家战力
    Model_TigerPass.prototype.GCOpenUI8902 = function (self, bytes) {
        self.curId = bytes.readByte();
        self.bossCurHp = bytes.readLong();
        self.bossMaxHp = bytes.readLong();
        self.batCt = bytes.readInt();
        self.cdTime = bytes.readInt();
        self.isEmploy = bytes.readByte();
        self.ctEmploy = bytes.readByte();
        self.rewArr = [];
        var len = bytes.readShort();
        for (var i = 0; i < len; i++) {
            var id = bytes.readByte();
            var status_1 = bytes.readByte();
            self.rewArr.push({ id: id, status: status_1 });
        }
        self.employId = bytes.readLong();
        self.employHead = bytes.readInt();
        self.employFrame = bytes.readInt();
        self.employName = bytes.readUTF();
        self.employVip = bytes.readInt();
        self.employPower = bytes.readLong();
        GGlobal.reddot.setCondition(UIConst.CHILD_TIGER_PASS, 0, self.getNotice());
        GGlobal.reddot.notify(UIConst.CHILD_TIGER_PASS);
        self.notify(Model_TigerPass.msg_openui);
    };
    /**CG 进入副本*/
    Model_TigerPass.prototype.CGBattle8903 = function () {
        var bytes = this.getBytes();
        this.sendSocket(8903, bytes);
    };
    //GC 进入返回 B: 0成功 1失败 2次数不足 3已经在副本内
    Model_TigerPass.prototype.GCBattle8904 = function (self, bytes) {
        var res = bytes.readByte();
        if (res == 0) {
            GGlobal.mapscene.enterScene(SceneCtrl.TIGER_PASS);
        }
        else {
            ViewCommonWarn.text(["", "挑战失败", "次数不足", "已经在副本内", "当前已达最大层数", "活动数据重置中"][res]);
        }
    };
    //GC 场景刷新个人以及boss数据 L: 我的剩余血量L:我的伤害L: boss气血上限L:boss当前气血[U:名字L:伤害]伤害排行数据
    Model_TigerPass.prototype.GCBattleInfo8906 = function (self, bytes) {
        self.myHurt = bytes.readLong();
        self.bossMaxHp = bytes.readLong();
        self.bossCurHp = bytes.readLong();
        var len = bytes.readShort();
        self.batRank = [];
        for (var i = 0; i > len; i++) {
            var name_1 = bytes.readUTF();
            var hurt = bytes.readLong();
            self.batRank.push({ name: name_1, hurt: hurt });
        }
        self.notify(Model_TigerPass.msg_datas_hurt);
    };
    /**CG 通知后端本人和佣兵都已经死亡 申请参与奖励*/
    Model_TigerPass.prototype.CGDie8907 = function () {
        var bytes = this.getBytes();
        this.sendSocket(8907, bytes);
    };
    //战斗结果 B:0成功 1失败B:当前boss序号L: boss当前血量L:boss总血量[B:奖励类型I:道具idI:道具数量]
    Model_TigerPass.prototype.GCBattleRes8908 = function (self, bytes) {
        self.batRes = bytes.readByte();
        self.curId = bytes.readByte();
        self.bossCurHp = bytes.readLong();
        self.bossMaxHp = bytes.readLong();
        var len = bytes.readShort();
        self.batDrop = [];
        for (var i = 0; i < len; i++) {
            var type = bytes.readByte();
            var id = bytes.readInt();
            var count = bytes.readInt();
            var vo;
            if (type == Enum_Attr.EQUIP) {
                vo = VoEquip.create(id);
            }
            else if (type == Enum_Attr.ITEM) {
                vo = VoItem.create(id);
            }
            else {
                vo = Vo_Currency.create(type);
            }
            vo.count = count;
            self.batDrop.push(vo);
        }
        self.notify(Model_TigerPass.msg_bat_res);
    };
    Model_TigerPass.prototype.CGOpenEmploy8909 = function () {
        var bytes = this.getBytes();
        this.sendSocket(8909, bytes);
    };
    //GC [I:头像I: 头像框U:玩家名字I: VIP等级L:玩家idL: 玩家战力]
    Model_TigerPass.prototype.GCOpenEmploy8910 = function (self, bytes) {
        var len = bytes.readShort();
        self.employArr = [];
        for (var i = 0; i < len; i++) {
            self.employArr.push({
                head: bytes.readInt(),
                frame: bytes.readInt(),
                name: bytes.readUTF(),
                vip: bytes.readInt(),
                plyId: bytes.readLong(),
                power: bytes.readLong(),
                price: bytes.readInt(),
                count: bytes.readByte()
            });
        }
        self.notify(Model_TigerPass.msg_employ_list);
    };
    Model_TigerPass.prototype.CGChooseEmploy8911 = function (id) {
        var bytes = this.getBytes();
        bytes.writeLong(id);
        this.sendSocket(8911, bytes);
    };
    //GC 雇佣返回 B: 0成功 1失败 2已被别人雇佣满次数 3本人次数不够L:雇佣兵玩家id
    Model_TigerPass.prototype.GCChooseEmploy8912 = function (self, bytes) {
        var res = bytes.readByte();
        if (res == 0) {
            self.employId = bytes.readLong();
            self.employHead = bytes.readInt();
            self.employFrame = bytes.readInt();
            self.employVip = bytes.readInt();
            self.employPower = bytes.readLong();
            self.employName = bytes.readUTF();
            self.ctEmploy--;
            if (self.ctEmploy < 0) {
                self.ctEmploy = 0;
            }
            self.notify(Model_TigerPass.msg_employ);
        }
        ViewCommonWarn.text(["雇佣成功", "雇佣失败", "已被别人雇佣", "雇佣次数不够", "雇佣失败", "元宝不足"][res]);
    };
    //CG 报名加入雇佣行列
    Model_TigerPass.prototype.CGJoinEmploy8913 = function () {
        var bytes = this.getBytes();
        this.sendSocket(8913, bytes);
    };
    //GC报名加入雇佣行列 B:0成功 1失败 2已经在行列中
    Model_TigerPass.prototype.GCJoinEmploy8914 = function (self, bytes) {
        var res = bytes.readByte();
        if (res == 0) {
            self.isEmploy = 1;
            ViewCommonWarn.text("报名雇佣成功");
            self.notify(Model_TigerPass.msg_join_employ);
        }
        else {
            ViewCommonWarn.text(["", "报名雇佣失败", "已经报名成功"][res]);
        }
    };
    //CG 刷新雇佣兵列表
    Model_TigerPass.prototype.CGRefreshEmploy8915 = function () {
        var bytes = this.getBytes();
        this.sendSocket(8915, bytes);
    };
    //GC刷新雇佣兵列表 B:0成功 1钱不够 2暂无佣兵 3失败
    Model_TigerPass.prototype.GCRefreshEmploy8916 = function (self, bytes) {
        var res = bytes.readByte();
        if (res == 0) {
        }
        else {
            ViewCommonWarn.text(["", "铜钱不够", "暂无佣兵", "刷新失败", "佣兵数量不足"][res]);
        }
    };
    //CG 刷新雇佣兵列表
    Model_TigerPass.prototype.CGgetReward8917 = function (id) {
        var bytes = this.getBytes();
        bytes.writeByte(id);
        this.sendSocket(8917, bytes);
    };
    //层数首通奖励变化 B:层数B:奖励领取情况 0 1 2
    Model_TigerPass.prototype.GCgetReward8918 = function (self, bytes) {
        var id = bytes.readByte();
        var status = bytes.readByte();
        for (var i = 0; i < self.rewArr.length; i++) {
            if (id == self.rewArr[i].id) {
                self.rewArr[i].status = status;
                break;
            }
        }
        self.notify(Model_TigerPass.msg_openui);
        GGlobal.reddot.setCondition(UIConst.CHILD_TIGER_PASS, 0, self.getNotice());
        GGlobal.reddot.notify(UIConst.CHILD_TIGER_PASS);
    };
    Model_TigerPass.prototype.getNotice = function () {
        var m = this;
        var ct = Model_Bag.getItemCount(Model_TigerPass.TZ_LING);
        if (m.batCt > 0 || ct > 0) {
            return true;
        }
        if (m.isEmploy == 0) {
            return true;
        }
        if (m.rewArr.length > 0) {
            for (var i = 0; i < m.rewArr.length; i++) {
                if (m.rewArr[i].status == 1) {
                    return true;
                }
            }
        }
        return false;
    };
    Model_TigerPass.msg_openui = "msg_openui";
    Model_TigerPass.msg_employ_list = "msg_employ_list"; //雇佣列表
    Model_TigerPass.msg_datas_hurt = "msg_datas_hurt"; //伤害
    Model_TigerPass.msg_bat_res = "msg_bat_res"; //战斗结果
    Model_TigerPass.msg_employ = "msg_employ"; //雇佣别人
    Model_TigerPass.msg_join_employ = "msg_join_employ"; //加入雇佣
    Model_TigerPass.TZ_LING = 416003;
    return Model_TigerPass;
}(BaseModel));
__reflect(Model_TigerPass.prototype, "Model_TigerPass");
