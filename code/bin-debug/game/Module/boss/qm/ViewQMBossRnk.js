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
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var ViewQMBossRnk = (function (_super) {
    __extends(ViewQMBossRnk, _super);
    function ViewQMBossRnk() {
        var _this = _super.call(this) || this;
        _this.dta = [];
        fairygui.UIObjectFactory.setPackageItemExtension(QMBossRnk.URL, QMBossRnk);
        _this.loadRes("Boss", "Boss_atlas0");
        return _this;
    }
    ViewQMBossRnk.createInstance = function () {
        return (fairygui.UIPackage.createObject("Boss", "ViewQMBossRnk"));
    };
    ViewQMBossRnk.prototype.childrenCreated = function () {
        GGlobal.createPack("Boss");
        var s = this;
        s.view = fairygui.UIPackage.createObject("Boss", "ViewQMBossRnk").asCom;
        s.contentPane = s.view;
        this.frame = (s.view.getChild("frame"));
        this.list = (s.view.getChild("list"));
        this.lbMine = (s.view.getChild("lbMine"));
        this.list.callbackThisObj = this;
        this.list.itemRenderer = this.renderHandle;
        this.list.setVirtual();
        _super.prototype.childrenCreated.call(this);
    };
    ViewQMBossRnk.prototype.renderHandle = function (index, obj) {
        var item = obj;
        var d = this.dta;
        item.setdata(d[index]);
    };
    ViewQMBossRnk.prototype.update = function () {
        var m = GGlobal.modelBoss;
        if (Config.all_221[m.curEnterId].single == 1) {
            var name_1 = Model_player.voMine.name;
            this.dta = [[1, name_1, GGlobal.modelBoss.myHurt]];
            this.list.numItems = this.dta.length;
            this.lbMine.text = "我的排名：" + 1 + "              我的伤害：" + ConfigHelp.getYiWanText(GGlobal.modelBoss.myHurt);
        }
        else {
            this.dta = GGlobal.modelBoss.rankData;
            this.list.numItems = this.dta.length;
            if (!this.dta.length) {
                this.lbMine.text = "";
            }
            else {
                var rk = "未上榜";
                var d = this.dta;
                var nm = Model_player.voMine.name;
                for (var i = 0; i < d.length; i++) {
                    if (Model_player.isMine(d[i][1])) {
                        rk = d[i][0];
                        break;
                    }
                }
                this.lbMine.text = "我的排名：" + rk + "              我的伤害：" + ConfigHelp.getYiWanText(GGlobal.modelBoss.myHurt);
            }
        }
    };
    ViewQMBossRnk.prototype.onShown = function () {
        this.update();
        GGlobal.control.listen(Enum_MsgType.MSG_QMBOSS_RANKUPDATE, this.update, this);
        GGlobal.control.listen(Enum_MsgType.MSG_QMBOSS_DANJI_BOSSXUE, this.update, this);
    };
    ViewQMBossRnk.prototype.onHide = function () {
        GGlobal.control.remove(Enum_MsgType.MSG_QMBOSS_RANKUPDATE, this.update, this);
        GGlobal.control.remove(Enum_MsgType.MSG_QMBOSS_DANJI_BOSSXUE, this.update, this);
        GGlobal.layerMgr.close(UIConst.QMBOSSRANK);
    };
    ViewQMBossRnk.URL = "ui://47jfyc6egs0dt";
    return ViewQMBossRnk;
}(UIModalPanel));
__reflect(ViewQMBossRnk.prototype, "ViewQMBossRnk");
