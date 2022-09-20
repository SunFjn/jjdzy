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
var ModelGuanQiaHelp = (function (_super) {
    __extends(ModelGuanQiaHelp, _super);
    function ModelGuanQiaHelp() {
        var _this = _super.call(this) || this;
        _this.hasSuprise = 0; //是否有金甲兵
        _this.teamerid = 0; //队友ID
        _this.curGuanQiaLv = 0;
        /**
         * 5906 L
         * 开始战斗前返回 B:返回状态1成功,其他
         * **/
        _this.roomID = 0;
        return _this;
    }
    ModelGuanQiaHelp.prototype.listenServ = function (wsm) {
        var s = this;
        this.socket = wsm;
        wsm.regHand(5902, s.GC_5902_HELP, s);
        wsm.regHand(5904, s.GC_5904_NOTICE, s);
        wsm.regHand(5906, s.GC_5906_READY, s);
        wsm.regHand(5908, s.GC_5908_BATTLE, s);
        wsm.regHand(5910, s.GC_5910_DEAD, s);
        wsm.regHand(5912, s.GC_5912_UPDATE, s);
        wsm.regHand(5914, s.GC_5914_BOSSHP, s);
        wsm.regHand(5916, s.GC_5916_EXITE, s);
        wsm.regHand(5918, s.GC_5918_UPDATE, s);
    };
    ModelGuanQiaHelp.prototype.CG_5901_HELP = function () {
        var ba = this.getBytes();
        this.sendSocket(5901, ba);
    };
    //同意协助关卡 L:需要协助玩家idI:关卡数
    ModelGuanQiaHelp.prototype.CG_5905_READY = function (id, gq) {
        var ba = this.getBytes();
        ba.writeLong(id);
        ba.writeInt(gq);
        this.sendSocket(5905, ba);
    };
    //通知后端是否可以开启战斗 B:状态1成功
    ModelGuanQiaHelp.prototype.CG_5907_BATTLE = function (id) {
        var ba = this.getBytes();
        ba.writeLong(id);
        this.sendSocket(5907, ba);
    };
    ModelGuanQiaHelp.prototype.CG_5915_EXITE = function () {
        var ba = this.getBytes();
        ba.writeLong(this.roomID);
        this.sendSocket(5915, ba);
    };
    /**
     * 5902 B
     * 广播邀请协助返回 B:结果 1成功,2已无求助次数,3求助CD中,4已通关该关卡
     * **/
    ModelGuanQiaHelp.prototype.GC_5902_HELP = function (m, ba) {
        var ret = ba.readByte();
        var str = "发送成功";
        var arr = ["", "发送成功", "已无求助次数", "求助CD中", "击杀小怪波数不足", "请先前往下一关", "正在战斗中"];
        if (ret) {
            str = arr[ret];
        }
        ViewCommonWarn.text(str);
    };
    /**
     * 5904 I-U-L
     * 广播其他玩家信息 I:关卡数U:需要协助玩家名字L:玩家id
     * **/
    ModelGuanQiaHelp.prototype.GC_5904_NOTICE = function (m, ba) {
        var guanqia = ba.readInt();
        var name = ba.readUTF();
        var id = ba.readLong();
        var str = "[color=#15f234]" + name + "[/color]向大神求助,帮其通关 [color=#ed1414]关卡第" + guanqia + "关[/color] ";
        var link = HtmlUtil.createLink("[color=#15f234]【点击帮助】[/color]", true, "guanqia");
        str = str + link;
        GGlobal.modelchat.addChatByClient(Model_Chat.SYSTEM, 0, str, id + "_" + guanqia);
    };
    ModelGuanQiaHelp.prototype.GC_5906_READY = function (m, ba) {
        var id = ba.readLong();
        m.roomID = id;
        if (GGlobal.sceneType != SceneCtrl.GUANQIA) {
            if (id > 0)
                m.CG_5907_BATTLE(id * -1);
            return;
        }
        if (id > 0) {
            m.CG_5907_BATTLE(id);
        }
        var tips = ["", "求助者已通关该关卡", "该求助已超时", "求助者在副本中", "需通关该关卡", "帮助次数不足", "求助者不在线", "求助者不在线"];
        var idx = id * -1;
        if (tips[idx]) {
            ViewCommonWarn.text(tips[idx]);
        }
    };
    /**
     * 5908 B-B-L
     * 返回是否开启战斗 B:状态1成功B:是否有金甲兵0无1有
     * **/
    ModelGuanQiaHelp.prototype.GC_5908_BATTLE = function (m, ba) {
        var ret = ba.readByte();
        if (ret == 1) {
            m.hasSuprise = ba.readByte();
            m.teamerid = ba.readLong();
            m.curGuanQiaLv = ba.readInt();
            GGlobal.mapscene.enterScene(SceneCtrl.GUANQIABOSS_HELP);
        }
        else if (ret == -1) {
            ViewCommonWarn.text("对方在副本里");
        }
        else if (ret == -2) {
            ViewCommonWarn.text("该求助已过期");
        }
    };
    /**
     * 5910 L
     * 死亡通知广播给其他人 L:角色ID
     * **/
    ModelGuanQiaHelp.prototype.GC_5910_DEAD = function (m, ba) {
        var id = ba.readLong();
        GGlobal.control.notify(Enum_MsgType.GUANQIA_HELP_DEAD, id);
    };
    /**
     * 5912 [L-L]
     * 刷新队员气血 [L:玩家IDL:气血]队伍气血数据
     * **/
    ModelGuanQiaHelp.prototype.GC_5912_UPDATE = function (m, ba) {
        var hps = [];
        var len = ba.readShort();
        for (var i = 0; i < len; i++) {
            hps.push([ba.readLong(), ba.readLong()]);
        }
        GGlobal.control.notify(Enum_MsgType.GUANQIA_HELP_PLAYER_HP, hps);
    };
    /**
     * 5914 L-L
     * 场景刷新数据 L:boss气血上限L:boss当前气血
     * **/
    ModelGuanQiaHelp.prototype.GC_5914_BOSSHP = function (m, ba) {
        var opt = {};
        opt.maxHp = ba.readLong();
        opt.hp = ba.readLong();
        GGlobal.control.notify(Enum_MsgType.GUANQIA_HELP_BOSS_HP, opt);
    };
    /**
     * 5916 L-U
     *离开战斗返回 L:玩家idU:玩家名字
     * **/
    ModelGuanQiaHelp.prototype.GC_5916_EXITE = function (m, ba) {
        var liveid = ba.readLong();
        GGlobal.control.notify(Enum_MsgType.GUANQIA_HELP_LEAVE, liveid);
    };
    ModelGuanQiaHelp.prototype.GC_5918_UPDATE = function (md, ba) {
        var m = GGlobal.modelGuanQia;
        m.curGuanQiaLv = ba.readInt();
        m.curWave = 0;
        GGlobal.control.notify(Enum_MsgType.MSG_GQ_UPDATE);
        GGlobal.control.notify(Enum_MsgType.MSG_WAVEUPDATE);
    };
    return ModelGuanQiaHelp;
}(BaseModel));
__reflect(ModelGuanQiaHelp.prototype, "ModelGuanQiaHelp");
