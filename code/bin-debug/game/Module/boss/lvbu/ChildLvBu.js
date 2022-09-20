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
/** s is an automatically generated class by FairyGUI. Please do not modify it. **/
var ChildLvBu = (function (_super) {
    __extends(ChildLvBu, _super);
    function ChildLvBu() {
        var _this = _super.call(this) || this;
        _this.requstTime = 0;
        _this.yulanWards = [];
        _this.lastWards = [];
        return _this;
    }
    ChildLvBu.createInstance = function () {
        return (fairygui.UIPackage.createObject("Boss", "ChildLvBu"));
    };
    ChildLvBu.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        s.iconBody = (s.getChild("iconBody"));
        s.lbName = (s.getChild("lbName"));
        s.lbTime = (s.getChild("lbTime"));
        s.btnFight = (s.getChild("btnFight"));
        s.lbRank = (s.getChild("lbRank"));
        s.lbJieduan = (s.getChild("lbJieduan"));
        s.progress = (s.getChild("progress"));
        s.hpGroup = (s.getChild("hpGroup"));
        s.g2 = (s.getChild("g2"));
        s.n32 = (s.getChild("n32"));
        s.lbTimelimit = (s.getChild("lbTimelimit"));
        s.com = new fairygui.GComponent;
        this.addChild(s.com);
        s.com.setScale(0.8, 0.8);
    };
    ChildLvBu.prototype.onTxTClick = function (e) {
        GGlobal.layerMgr.open(UIConst.LVBURANK, 0);
        e.stopImmediatePropagation();
    };
    ChildLvBu.prototype.onFight = function () {
        if (TimeUitl.cool("ChildLvBuonFight", 1000)) {
            GGlobal.modelBoss.CG_LB_ENTER_1517();
        }
    };
    ChildLvBu.prototype.updateTime = function () {
        var s = this;
        var m = GGlobal.modelBoss;
        var t = Model_GlobalMsg.getServerTime();
        if (m.lvbuSt == 1 || m.lvbuSt == 2 || m.lvbuSt == 3) {
            if (m.CDEnter < Model_GlobalMsg.getServerTime()) {
                s.lbTime.text = "";
            }
            else {
                var al = ((m.CDEnter - t) / 1000) >> 0;
                s.lbTime.text = "进入冷却时间：" + al + "秒";
            }
            s.lbTimelimit.visible = false;
        }
        else {
            s.lbTimelimit.visible = true;
            var data = JSON.parse(ConfigHelp.getSystemDesc(1091));
            var nowData = new Date(t);
            var hour = nowData.getHours();
            var min = nowData.getMinutes();
            var sec = nowData.getSeconds();
            var nextIndex = -1;
            for (var i = 0; i < 3; i++) {
                if (hour == data[i][0]) {
                    if (min >= data[i][1]) {
                        s.lbTimelimit.text = "<font color='#ffc334'>吕布已被击败</font>";
                        return;
                    }
                }
                if (hour < data[i][0] || (hour == data[i][0] && min < data[i][1])) {
                    nextIndex = i;
                    break;
                }
            }
            var time = void 0;
            if (nextIndex == -1) {
                time = (23 - hour + data[0][0]) * 3600 + (59 - min + data[0][1]) * 60 + 59 - sec;
            }
            else {
                time = (data[nextIndex][0] - hour) * 3600 + (data[nextIndex][1] - min) * 60 - sec;
            }
            s.lbTimelimit.text = "<font color='#fe0000'>吕布降临倒计时：</font>\n" + TimeUitl.getRemainingTime(time * 1000, 0, { hour: ":", minute: ":", second: " " });
            var now = egret.getTimer();
            if (time < 2 && now - s.requstTime > 2000) {
                s.requstTime = now;
                GGlobal.modelBoss.CG_LBENTER_1503();
            }
        }
    };
    ChildLvBu.prototype.setdata = function () {
        var s = this;
        var m = GGlobal.modelBoss;
        var bid = m.curEnterId;
        if (bid == 0)
            bid = 241001;
        var bossname = Config.NPC_200[bid]["name"];
        s.lbName.text = bossname.replace("·", "\n·\n");
        ;
        if (m.lvbuSt == 1 || m.lvbuSt == 2 || m.lvbuSt == 3) {
            s.hpGroup.visible = true;
            s.g2.visible = false;
            s.lbJieduan.text = BroadCastManager.reTxt("第{0}阶段", m.lvbuSt);
            s.progress.max = m.bossMaxHp;
            s.progress.value = m.bossHp;
        }
        else {
            s.hpGroup.visible = false;
            s.g2.visible = true;
        }
        s.clearGrid();
        var lib = Config.lvbu_224[361001];
        var join = lib.reward;
        var kill = lib.reward5;
        join = JSON.parse(join);
        kill = JSON.parse(kill);
        s.yulanWards = ConfigHelp.addGridview(ConfigHelp.makeItemListArr(join), s.com, 55, 855, true, true, 5, 113);
        s.lastWards = ConfigHelp.addGridview(ConfigHelp.makeItemListArr(kill), s.com, 430, 855, true, true, 5, 113);
        s.n32.text = "不灭魔神：BOSS生命提高<font color='#15f234'>" + m.qmHpMul * 100 + "%</font>";
    };
    ChildLvBu.prototype.clearGrid = function () {
        var s = this;
        ConfigHelp.cleanGridview(s.yulanWards);
        ConfigHelp.cleanGridview(s.lastWards);
    };
    ChildLvBu.prototype.reqData = function () {
        GGlobal.modelBoss.CG_LBENTER_1503();
    };
    ChildLvBu.prototype.listen = function () {
        var s = this;
        Timer.instance.listen(s.updateTime, s, 1000);
        s.lbRank.addClickListener(s.onTxTClick, s);
        s.btnFight.addClickListener(s.onFight, s);
        GGlobal.control.listen(Enum_MsgType.LB_OPENUI, s.setdata, s);
        GGlobal.control.listen(Enum_MsgType.LB_BOSS_STATE, s.reqData, s);
        GGlobal.control.listen(Enum_MsgType.LB_NOTICE, s.reqData, s);
    };
    ChildLvBu.prototype.removelis = function () {
        var s = this;
        s.btnFight.removeClickListener(s.onFight, s);
        s.lbRank.removeClickListener(s.onTxTClick, s);
        Timer.instance.remove(s.updateTime, s);
        GGlobal.control.remove(Enum_MsgType.LB_BOSS_STATE, s.reqData, s);
        GGlobal.control.remove(Enum_MsgType.LB_NOTICE, s.setdata, s);
        GGlobal.control.remove(Enum_MsgType.LB_OPENUI, s.reqData, s);
    };
    ChildLvBu.prototype.open = function () {
        var s = this;
        s.setdata();
        s.listen();
        if (!s.awatar) {
            s.awatar = UIRole.create();
            s.awatar.uiparent = s.displayListContainer;
            s.awatar.setPos(315, 500);
            s.awatar.setScaleXY(1.5, 1.5);
        }
        var lb = Config.NPC_200[241001];
        s.awatar.setBody(lb.mod);
        if (lb.weapon) {
            s.awatar.setWeapon(lb.mod);
        }
        s.awatar.onAdd();
        GGlobal.modelBoss.CG_LBENTER_1503();
    };
    ChildLvBu.prototype.close = function () {
        var s = this;
        if (s.awatar) {
            s.awatar.onRemove();
            s.awatar = null;
        }
        s.removelis();
        s.clearGrid();
        GGlobal.layerMgr.close(UIConst.LVBURANK);
    };
    ChildLvBu.URL = "ui://47jfyc6edx12v";
    return ChildLvBu;
}(fairygui.GComponent));
__reflect(ChildLvBu.prototype, "ChildLvBu");
