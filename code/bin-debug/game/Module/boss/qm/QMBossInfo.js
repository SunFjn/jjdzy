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
var QMBossInfo = (function (_super) {
    __extends(QMBossInfo, _super);
    function QMBossInfo() {
        var _this = _super.call(this) || this;
        _this.n12X = 0;
        return _this;
    }
    QMBossInfo.createInstance = function () {
        return (fairygui.UIPackage.createObject("Boss", "QMBossInfo"));
    };
    QMBossInfo.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        s.lbMyhurt = (s.getChild("lbMyhurt"));
        s.btn = (s.getChild("btn"));
        s.lbBest = (s.getChild("lbBest"));
        s.grid = (s.getChild("grid"));
        s.n12 = (s.getChild("n12"));
        s.n12X = s.n12.x;
    };
    QMBossInfo.prototype.click = function () {
        var m = GGlobal.modelBoss;
        if (Config.all_221[m.curEnterId].single == 1) {
        }
        else {
            GGlobal.modelBoss.CG_RANKUI_1361();
        }
        GGlobal.layerMgr.open(UIConst.QMBOSSRANK);
    };
    QMBossInfo.prototype.listen = function () {
        var s = this;
        var id = GGlobal.modelBoss.curEnterId;
        var list = JSON.parse(Config.all_221[id].mvp);
        s.grid.vo = ConfigHelp.makeItemListArr(list)[0];
        s.grid.showEff(true);
        s.grid.tipEnabled = true;
        s.btn.addClickListener(s.click, s);
        GGlobal.control.listen(Enum_MsgType.MSG_QMBOSS_RANKUPDATE, s.setdata, s);
        GGlobal.control.listen(Enum_MsgType.MSG_QMBOSS_DANJI_BOSSXUE, s.setdata, s);
        s.resetPosition();
    };
    QMBossInfo.prototype.removeList = function () {
        var s = this;
        s.grid.showEff(false);
        s.btn.removeClickListener(s.click, s);
        GGlobal.control.remove(Enum_MsgType.MSG_QMBOSS_RANKUPDATE, s.setdata, s);
        GGlobal.control.remove(Enum_MsgType.MSG_QMBOSS_DANJI_BOSSXUE, s.setdata, s);
    };
    QMBossInfo.show = function () {
        var s = this;
        if (!s.instance)
            s.instance = s.createInstance();
        s.instance.listen();
        GGlobal.layerMgr.UI_floorUI_1.addChild(s.instance);
    };
    QMBossInfo.hide = function () {
        var s = this;
        s.instance.removeList();
        s.instance.clearDatta();
        if (s.instance.parent)
            GGlobal.layerMgr.UI_floorUI_1.removeChild(s.instance);
    };
    QMBossInfo.prototype.setdata = function () {
        var s = this;
        var m = GGlobal.modelBoss;
        if (!Config.all_221[m.curEnterId]) {
            return;
        }
        if (Config.all_221[m.curEnterId].single == 1) {
            var name_1 = Model_player.voMine.name;
            s.lbMyhurt.text = "自己：" + ConfigHelp.getYiWanText(m.myHurt) + "               " + name_1 + "：" + ConfigHelp.getYiWanText(m.myHurt);
            s.lbBest.text = "<font color='" + Color.TEXT_YELLOW + "'>当前归属：\n" + "</font><font color='" + Color.WHITESTR + "'>" + name_1 + "</font>";
        }
        else {
            var d = m.rankData;
            if (d.length) {
                s.lbMyhurt.text = "自己：" + ConfigHelp.getYiWanText(m.myHurt) + "               " + d[0][1] + "：" + ConfigHelp.getYiWanText(d[0][2]);
                s.lbBest.text = "<font color='" + Color.TEXT_YELLOW + "'>当前归属：\n" + "</font><font color='" + Color.WHITESTR + "'>" + d[0][1] + "</font>";
            }
            else {
                s.lbMyhurt.text = "自己：" + ConfigHelp.getYiWanText(m.myHurt);
                s.lbBest.text = "<font color='" + Color.TEXT_YELLOW + "'>当前归属：</font>";
            }
        }
    };
    QMBossInfo.prototype.clearDatta = function () {
        var s = this;
        s.lbMyhurt.text = "";
        s.lbBest.text = "";
    };
    QMBossInfo.prototype.resetPosition = function () {
        var s = this;
        s.n12.x = GGlobal.layerMgr.offx + s.n12X;
        s.setXY((fairygui.GRoot.inst.width - s.width) >> 1, 380);
    };
    QMBossInfo.URL = "ui://47jfyc6egs0ds";
    return QMBossInfo;
}(fairygui.GComponent));
__reflect(QMBossInfo.prototype, "QMBossInfo");
