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
var ViewCrossKingPromotion = (function (_super) {
    __extends(ViewCrossKingPromotion, _super);
    function ViewCrossKingPromotion() {
        var _this = _super.call(this) || this;
        _this.loadRes();
        return _this;
    }
    ViewCrossKingPromotion.createInstance = function () {
        return (fairygui.UIPackage.createObject("Arena", "ViewCrossKingPromotion"));
    };
    ViewCrossKingPromotion.prototype.childrenCreated = function () {
        GGlobal.createPack("Arena");
        this.view = fairygui.UIPackage.createObject("Arena", "ViewCrossKingPromotion").asCom;
        this.contentPane = this.view;
        this.ply0 = (this.view.getChild("ply0"));
        this.ply1 = (this.view.getChild("ply1"));
        this.ply2 = (this.view.getChild("ply2"));
        this.lbBattleCount = (this.view.getChild("lbBattleCount"));
        this.btnAdd = (this.view.getChild("btnAdd"));
        this.lbChangeCost = (this.view.getChild("lbChangeCost"));
        this.lbTitle = (this.view.getChild("lbTitle"));
        this.lbTips = (this.view.getChild("lbTips"));
        this.btnChange = (this.view.getChild("btnChange"));
        this.lbPromotion = (this.view.getChild("lbPromotion"));
        this.imgMax = (this.view.getChild("imgMax"));
        _super.prototype.childrenCreated.call(this);
    };
    ViewCrossKingPromotion.prototype.resetPosition = function () {
        this.setXY((fairygui.GRoot.inst.width - this.width) >> 1, (fairygui.GRoot.inst.height - this.height) >> 1);
    };
    ViewCrossKingPromotion.prototype.onShown = function () {
        this.addListen();
        this.update();
        GGlobal.modelCrossKing.CG_GET_JING_JI();
    };
    ViewCrossKingPromotion.prototype.onHide = function () {
        this.removeListen();
    };
    ViewCrossKingPromotion.prototype.addListen = function () {
        this.btnChange.addClickListener(this.onChange, this);
        this.btnAdd.addClickListener(this.onAdd, this);
        GGlobal.control.listen(Enum_MsgType.CROSSKING_UP_PLY, this.update, this);
        GGlobal.control.listen(Enum_MsgType.CROSSKING_BUY_NUM, this.update, this);
    };
    ViewCrossKingPromotion.prototype.removeListen = function () {
        this.btnChange.removeClickListener(this.onChange, this);
        this.btnAdd.removeClickListener(this.onAdd, this);
        GGlobal.control.remove(Enum_MsgType.CROSSKING_UP_PLY, this.update, this);
        GGlobal.control.remove(Enum_MsgType.CROSSKING_BUY_NUM, this.update, this);
        GGlobal.layerMgr.close(UIConst.CROSS_KING_PROMOTE);
    };
    ViewCrossKingPromotion.prototype.update = function () {
        this.ply0.vo = Model_CrossKing.upPlyArr[0];
        this.ply0.type = 2;
        this.ply1.vo = Model_CrossKing.upPlyArr[1];
        this.ply1.type = 2;
        this.ply2.vo = Model_CrossKing.upPlyArr[2];
        this.ply2.type = 2;
        var cfgGrade = Config.lsxx_232[Model_CrossKing.myGrade + 1];
        if (cfgGrade.dan >= 13) {
            this.imgMax.visible = true;
            this.lbPromotion.text = "";
        }
        else {
            this.imgMax.visible = false;
            this.lbPromotion.text = "<font color=" + Color.getColorStr(cfgGrade.color) + ">" + cfgGrade.name + "</font>";
        }
        var BATTLE_MAX = ConfigHelp.getSystemNum(2205);
        var colorStr;
        if (Model_CrossKing.battleCount > 0) {
            colorStr = Color.GREENSTR;
        }
        else {
            colorStr = Color.REDSTR;
        }
        this.lbBattleCount.text = "挑战次数：" + "<font color='" + colorStr + "'>" + Model_CrossKing.battleCount + "/" + BATTLE_MAX + "</font>";
        var cost = ConfigHelp.SplitStr(ConfigHelp.getSystemDesc(2206))[0][2];
        this.lbChangeCost.text = "" + cost;
        if (Model_player.voMine.tongbi < Number(cost)) {
            this.lbChangeCost.color = Color.REDINT;
        }
        else {
            this.lbChangeCost.color = Color.GREENINT;
        }
    };
    ViewCrossKingPromotion.prototype.onChange = function () {
        GGlobal.modelCrossKing.CG_CHANGE_RANKS(1);
    };
    ViewCrossKingPromotion.prototype.onAdd = function () {
        Model_CrossKing.onAdd();
    };
    ViewCrossKingPromotion.URL = "ui://me1skowlhfct3r";
    return ViewCrossKingPromotion;
}(UIModalPanel));
__reflect(ViewCrossKingPromotion.prototype, "ViewCrossKingPromotion");
