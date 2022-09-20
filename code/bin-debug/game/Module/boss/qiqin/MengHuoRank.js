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
var MengHuoRank = (function (_super) {
    __extends(MengHuoRank, _super);
    function MengHuoRank() {
        var _this = _super.call(this) || this;
        _this.page = 0;
        _this.type = 0;
        _this.loadRes("Boss", "Boss_atlas0");
        return _this;
    }
    MengHuoRank.createInstance = function () {
        return (fairygui.UIPackage.createObject("Boss", "MengHuoRank"));
    };
    MengHuoRank.prototype.childrenCreated = function () {
        var s = this;
        GGlobal.createPack("Boss");
        this.view = fairygui.UIPackage.createObject("Boss", "MengHuoRank").asCom;
        this.contentPane = this.view;
        this.c1 = this.view.getController("c1");
        this.frame = (this.view.getChild("frame"));
        this.n1 = (this.view.getChild("n1"));
        this.list = (this.view.getChild("list"));
        this.n4 = (this.view.getChild("n4"));
        this.lbMine = (this.view.getChild("lbMine"));
        this.n6 = (this.view.getChild("n6"));
        this.n7 = (this.view.getChild("n7"));
        this.lbT = (this.view.getChild("lbT"));
        s.resetPosition();
        s.list.itemRenderer = s.onRender;
        s.list.callbackThisObj = s;
        _super.prototype.childrenCreated.call(this);
    };
    MengHuoRank.prototype.onRender = function (index, obj) {
        var s = this;
        var data = s.sourced[index];
        var item = obj;
        item.setdata(index + 1, data, s.page);
    };
    MengHuoRank.prototype.setdata = function () {
        var s = this;
        var m = GGlobal.modelBoss;
        s.page = s.c1.selectedIndex;
        var idx = s.page;
        s.sourced = m.mhRankdata[idx];
        s.lbT.text = ["排名                   名字                     伤害                   奖励", "排名                   势力                     伤害                   奖励"][idx];
        s.list.numItems = s.sourced.length;
        var rk = "未上榜";
        var d = s.sourced;
        if (s.page == 1) {
            s.lbMine.text = "我的势力：<font color='" + Color.TEXT_YELLOW + "'>" + Model_Country.getCountryName(Model_player.voMine.country) + "</font>";
        }
        else {
            var hurt = m.myHurt;
            var nm = Model_player.voMine.name;
            for (var i = 0; i < d.length; i++) {
                if (String(d[i][0]).split(".")[0] == nm) {
                    rk = (i + 1) + "";
                    hurt = d[i][1];
                    break;
                }
            }
            if (s.type == 0) {
                s.lbMine.text = "我的排名：<font color='" + Color.TEXT_YELLOW + "'>" + rk + "</font>";
            }
            else {
                s.lbMine.text = "我的排名：<font color='" + Color.TEXT_YELLOW + "'>" + rk + "</font>" + "               我的伤害：<font color='" + Color.TEXT_YELLOW + "'>" + ConfigHelp.getYiWanText(hurt) + "</font>";
            }
        }
    };
    MengHuoRank.prototype.onShown = function () {
        var s = this;
        if (s._args) {
            var id = s._args.id;
            s.type = s._args.type;
        }
        if (s.type == 0) {
            GGlobal.modelBoss.CG_MHRANK_1703(id);
            GGlobal.control.listen(Enum_MsgType.MH_RANK, s.setdata, s);
        }
        else {
            GGlobal.modelBoss.CG_MHRANK1_1713(id);
            GGlobal.control.listen(Enum_MsgType.MH_RANK, s.setdata, s);
        }
        s.setdata();
        s.c1.addEventListener(fairygui.StateChangeEvent.CHANGED, s.setdata, s);
        s.page = s.c1.selectedIndex;
        s.c1.setSelectedIndex(0);
    };
    MengHuoRank.prototype.onHide = function () {
        var s = this;
        s.list.numItems = 0;
        var tp = s._args;
        if (tp == 0) {
            GGlobal.control.remove(Enum_MsgType.MH_RANK, s.setdata, s);
        }
        s.c1.removeEventListener(fairygui.StateChangeEvent.CHANGED, s.setdata, s);
        GGlobal.layerMgr.close(UIConst.MHRANK);
    };
    MengHuoRank.URL = "ui://47jfyc6eee1116";
    return MengHuoRank;
}(UIModalPanel));
__reflect(MengHuoRank.prototype, "MengHuoRank");
