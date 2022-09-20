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
var Model_SGWS = (function (_super) {
    __extends(Model_SGWS, _super);
    function Model_SGWS() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**1为16进8 2：8进4 3：4进2 4：2进1*/
        _this.lun = 0;
        //1准备中 2进行中
        _this.state = 0;
        _this.times = 0;
        return _this;
    }
    Model_SGWS.prototype.initLib = function () {
        var s = this;
        s.raceInfo = [];
        s.wardPool = {};
        s.zuMapping = {};
        s.raceMapping = {};
        s.yazhu = {};
    };
    //比赛进程
    Model_SGWS.prototype.isOpen = function () {
        var now = new Date(Model_GlobalMsg.getServerTime());
        var day = now.getDay();
        var h = now.getHours();
        var ret = false;
        var lun = this.lun;
        var st = this.state;
        ret = lun == 5 || lun == 0; //周日活动 不是最后一轮的结束状态
        // ret = day != 0 || (lun == 5 && st == 1)//周日活动 不是最后一轮的结束状态
        return !ret;
    };
    //查询某组是否可下注
    Model_SGWS.prototype.checkYazhu = function (lun, zu) {
        var ret = false;
        if (lun == this.lun && !this.yazhu[lun] && this.zuMapping[lun] && this.zuMapping[lun][zu] && this.state != 2) {
            ret = true;
        }
        return ret;
    };
    //通过组和轮次获取玩家数据
    Model_SGWS.prototype.getGrouperByLun = function (lun, zu) {
        var dta = [];
        if (this.zuMapping[lun] && this.zuMapping[lun][zu]) {
            dta = this.zuMapping[lun][zu];
        }
        return dta;
    };
    Model_SGWS.prototype.checkYaZhuReddot = function () {
        var lun = this.lun;
        var ret = false;
        var state = this.state;
        if (state == 1 && !this.yazhu[lun]) {
            var arr = this.getGrouperByLun(lun, 1);
            if (arr.length > 1) {
                ret = true;
            }
        }
        GGlobal.reddot.setCondition(UIConst.SANGUO_WUSHUANG, 1, ret);
        this.checkSanGuoReddot();
    };
    Model_SGWS.prototype.checkPoolReddot = function () {
        var ret = false;
        for (var id in this.wardPool) {
            var vo = this.wardPool[id];
            if (vo.id > this.lun)
                break;
            ret = vo.myCount == 0 && vo.remaindCount > 0 && this.lun > vo.id;
            if (ret)
                break;
        }
        var red = GGlobal.reddot;
        red.setCondition(UIConst.SANGUO_WUSHUANG, 2, ret);
        this.checkSanGuoReddot();
    };
    Model_SGWS.prototype.checkSanGuoReddot = function () {
        var red = GGlobal.reddot;
        var ret = red.checkCondition(UIConst.SANGUO_WUSHUANG, 2) || red.checkCondition(UIConst.SANGUO_WUSHUANG, 1);
        red.setCondition(UIConst.SANGUO_WUSHUANG, 0, ret);
        red.notify(UIConst.SANGUO_WUSHUANG);
    };
    /** 注册 WEBSOCKET HANLDER 函数*/
    Model_SGWS.prototype.listenServ = function (s) {
        var a = this;
        a.socket = s;
        s.regHand(1832, a.GC_OPEN_SANGUOWS, a);
        s.regHand(1834, a.GC_XIAZHU_1834, a);
        s.regHand(1836, a.GC_POOL_1836, a);
        s.regHand(1838, a.GC_TAKE_1838, a);
        s.regHand(1840, a.GC_LUCKER_1840, a);
        s.regHand(1842, a.GC_BATTLE_1842, a);
    };
    /**1831  打开三国无双界面   */
    Model_SGWS.prototype.CG_OPEN_SANGUOWS = function () {
        if (!this.raceMapping)
            this.initLib();
        var ba = new BaseBytes();
        this.sendSocket(1831, ba);
    };
    /**1832 B-B-I-[B-[B-[L-B]]][L-U-I-I-I-L]-L-U-I-I
     * 返回三国无双界面数据 B:当前第几轮B:状态(1：准备中，2：战斗中)I:剩余时间[B:第几轮[B:分组[L:玩家idB:下注状态 0：没下，1：有下注]]]
     * 比赛对阵数据[L:玩家idU:玩家名称I:头像I:头像框I:将衔L:战力]参赛玩家数据L:第一名玩家idU:玩家名称I:头像I:头像框
      */
    Model_SGWS.prototype.GC_OPEN_SANGUOWS = function (s, data) {
        s.lun = data.readByte();
        s.state = data.readByte();
        s.times = data.readInt();
        if (true)
            console.log("当前轮：" + s.lun + "当前状态：" + s.state);
        s.raceInfo = [];
        s.wardPool = {};
        s.zuMapping = {};
        s.raceMapping = {};
        s.yazhu = {};
        var vo;
        var roleID;
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var lun = data.readByte();
            var zugroup = [];
            s.zuMapping[lun] = zugroup; //只保存最新的分组
            for (var j = 0, len1 = data.readShort(); j < len1; j++) {
                var zu = data.readByte();
                zugroup[zu] = []; //只保存最新的分组
                for (var n = 0, len2 = data.readShort(); n < len2; n++) {
                    roleID = data.readLong();
                    if (!s.raceMapping[roleID]) {
                        vo = new Node_SGWS();
                        s.raceMapping[roleID] = vo;
                        vo.id = roleID;
                    }
                    else {
                        vo = s.raceMapping[roleID];
                    }
                    var xiazhu = data.readByte();
                    if (xiazhu == 1) {
                        s.yazhu[lun] = [roleID];
                    }
                    vo.xiazhu = xiazhu;
                    vo.lun = lun;
                    zugroup[zu].push(vo);
                    if (lun == 1) {
                        vo.initPos = zu;
                    }
                }
            }
        }
        var temp = s.zuMapping[1];
        var l = data.readShort();
        for (var m = 0; m < l; m++) {
            roleID = data.readLong();
            vo = s.raceMapping[roleID];
            if (!vo) {
                vo = new Node_SGWS();
                vo.id = roleID;
            }
            vo.name = data.readUTF();
            vo.head = data.readInt();
            vo.headicn = data.readInt();
            vo.jiangxian = data.readInt();
            vo.power = data.readLong();
            if (temp[vo.initPos]) {
                var index = temp[vo.initPos].indexOf(vo);
                s.raceInfo[index + (vo.initPos - 1) * 2] = vo;
            }
        }
        s.champion = data.readFmt(["L", "U", "I", "I"]);
        s.checkYaZhuReddot();
        GGlobal.control.notify(Enum_MsgType.SGWS_OPENUI);
    };
    Model_SGWS.prototype.CG_XIAZHU_1833 = function (i, j) {
        this.tempLun = j;
        var b = this.getBytes();
        b.writeLong(i);
        this.sendSocket(1833, b);
    };
    /**1834 	B-L
     * 下注结果 B:0：失败，1：成功L:失败：错误码（1：本轮已经下注过，2：准备期才能下注，3：元宝不足），成功：被下注的玩家id
     * */
    Model_SGWS.prototype.GC_XIAZHU_1834 = function (s, d) {
        var r = d.readByte();
        if (r == 1) {
            ViewCommonWarn.text("下注成功");
            var id = d.readLong();
            s.yazhu[s.tempLun] = [id];
            if (s.raceMapping[id]) {
                s.raceMapping[id].xiazhu = 1;
            }
            s.checkYaZhuReddot();
            GGlobal.control.notify(Enum_MsgType.SGWS_YZ, id);
        }
        else {
            var l = d.readLong();
            var str = void 0;
            if (l == 1) {
                str = "本轮已经下注过";
            }
            else if (l == 2) {
                str = "准备期才能下注";
            }
            else if (l == 3) {
                str = "元宝不足";
            }
            ViewCommonWarn.text(str);
        }
    };
    /**1835
     *打开奖池界面
    */
    Model_SGWS.prototype.CG_POOL_1835 = function () {
        this.sendSocket(1835, this.getBytes());
    };
    /**1836 [B-I-I-L-U-I]
     *奖池界面信息 [B:奖池idI:已领取次数I:本人领取的数量L:玩家idU:玩家名称I:领取最高奖励数量]奖池数据
     * */
    Model_SGWS.prototype.GC_POOL_1836 = function (s, d) {
        var l = d.readShort();
        var v;
        for (var i = 0; i < l; i++) {
            var id = d.readByte();
            v = new Vo_SGPool();
            v.id = id;
            v.count = d.readInt();
            v.myCount = d.readInt();
            v.luckerID = d.readLong();
            v.luckerName = d.readUTF();
            v.luckNum = d.readInt();
            v.init();
            s.wardPool[id] = v;
        }
        s.checkPoolReddot();
        GGlobal.control.notify(Enum_MsgType.SGWS_POOL);
    };
    /**1837 B
     * 领取奖池奖励 B:奖池id
    */
    Model_SGWS.prototype.CG_TAKE_1837 = function (i) {
        var b = this.getBytes();
        b.writeByte(i);
        this.sendSocket(1837, b);
    };
    /**1838 	B-B-I
     * 领取奖池奖励结果 B:0：失败，1：成功B:失败：错误码（1:未到对应阶段不能领取,2:已经领取过,3:已被全部领取），成功：奖池idI:已领数量
     * */
    Model_SGWS.prototype.GC_TAKE_1838 = function (s, d) {
        var r = d.readByte();
        if (r == 1) {
            s.CG_POOL_1835();
        }
        else {
            var str = void 0;
            var code = d.readByte();
            if (code == 1) {
                str = "未到对应阶段不能领取";
            }
            else if (code == 2) {
                str = "已经领取过";
            }
            else if (code == 3) {
                str = "已被全部领取";
            }
        }
    };
    /**1840 B-L-U-I
     *更新抢到最高奖励的玩家 B:奖池idL:玩家idU:玩家名称I:领取数据
     * */
    Model_SGWS.prototype.GC_LUCKER_1840 = function (s, d) {
        var id = d.readByte();
        var v = s.wardPool[id];
        v.luckerID = d.readLong();
        v.luckerName = d.readUTF();
        v.luckNum = d.readInt();
        s.checkPoolReddot();
        GGlobal.control.notify(Enum_MsgType.SGWS_POOL);
    };
    /**1841 b b
     * 看录像 B:轮数B:分组id
    */
    Model_SGWS.prototype.CG_BATTLE_1841 = function (j, l) {
        var b = this.getBytes();
        b.writeByte(j);
        b.writeByte(l);
        this.sendSocket(1841, b);
        console.log("战斗查询：" + j + "轮" + l);
    };
    /**1842
     * 返回录像对战双方战斗数据 [L:玩家idU:玩家名称[L:唯一id，第一个跟hid一样I:人物武将类型I:专属神兵
     * [I:属性keyL:属性值]战斗属性[B:技能位置0-7I:技能idS:技能等级]技能数据I:时装资源id]属性L:总战力]玩家数据
     * */
    Model_SGWS.prototype.GC_BATTLE_1842 = function (s, d) {
        // var leftPlayer: Vo_Player = new Vo_Player();
        // var rightPlayer: Vo_Player = new Vo_Player();
        // let player = [leftPlayer, rightPlayer];
        var player = [];
        for (var i = 0, l = d.readShort(); i < l; i++) {
            var id = d.readLong();
            var vo = GGlobal.modelPlayer.playerDetailDic[id];
            // let vo: Vo_Player = player[i];
            // vo.parseOtherRole(d);
            //解析无用协议
            d.readUTF();
            var l1 = d.readShort();
            for (var j = 0; j < l1; j++) {
                d.readLong();
                d.readInt();
                d.readInt();
                var l2 = d.readShort();
                for (var k = 0; k < l2; k++) {
                    d.readInt();
                    d.readLong();
                }
                l2 = d.readShort();
                for (var k = 0; k < l2; k++) {
                    d.readByte();
                    d.readInt();
                    d.readShort();
                }
                d.readInt();
            }
            d.readLong();
            player.push(vo);
        }
        if (player[0].str == player[1].str) {
            player[0].str += 1;
        }
        var scenectrl = SceneCtrl.getCtrl(SceneCtrl.SGWS);
        scenectrl.fightType = 1;
        scenectrl.leftPlayer = player[0];
        scenectrl.rightPlayer = player[1];
        scenectrl.randomseed = 152;
        GGlobal.mapscene.scenetype = SceneCtrl.SGWS;
        GGlobal.mapscene.enterSceneCtrl(scenectrl);
        GGlobal.layerMgr.close2(UIConst.ARENA);
    };
    return Model_SGWS;
}(BaseModel));
__reflect(Model_SGWS.prototype, "Model_SGWS");
