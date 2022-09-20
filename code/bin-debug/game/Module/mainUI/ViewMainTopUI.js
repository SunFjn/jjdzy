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
var ViewMainTopUI = (function (_super) {
    __extends(ViewMainTopUI, _super);
    function ViewMainTopUI() {
        return _super.call(this) || this;
    }
    ViewMainTopUI.createInstance = function () {
        return (fairygui.UIPackage.createObject("MainUI", "ViewMainTopUI"));
    };
    ViewMainTopUI.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        s.lbName = (s.getChild("lbName"));
        s.lbYB = (s.getChild("lbYB"));
        s.lbTongBi = (s.getChild("lbTongBi"));
        s.zsLvLb = (s.getChild("zsLvLb"));
        s.btnAddYB = (s.getChild("btnAddYB"));
        s.btnAddTB = (s.getChild("btnAddTB"));
        s.lbYB.enabled = true;
        s.lbYB.addClickListener(s.recharge, s);
        s.lbTongBi.addClickListener(s.buyTongbiHandler, s);
        s.btnAddYB.addClickListener(s.recharge, s);
        s.btnAddTB.addClickListener(s.buyTongbiHandler, s);
        s.btnAddYB.visible = !GGlobal.isIOS;
        s.lbYB.enabled = !GGlobal.isIOS;
        s.lbTongBi.enabled = !GGlobal.isIOS;
        s.listen();
        s.resetPosition();
    };
    Object.defineProperty(ViewMainTopUI, "instance", {
        get: function () {
            if (!ViewMainTopUI._instance)
                ViewMainTopUI._instance = this.createInstance();
            return ViewMainTopUI._instance;
        },
        enumerable: true,
        configurable: true
    });
    ViewMainTopUI.prototype.recharge = function (event) {
        event.stopImmediatePropagation();
        if (GGlobal.isIOS) {
            ViewAlert.show("由于苹果政策影响，iOS暂未开放充值", Handler.create(this, null), ViewAlert.OK);
        }
        else {
            ViewChongZhi.tryToOpenCZ();
        }
    };
    ViewMainTopUI.prototype.buyTongbiHandler = function (event) {
        event.stopImmediatePropagation();
        View_CaiLiao_GetPanel.show(VoItem.create(Enum_Attr.TONGBI));
    };
    ViewMainTopUI.prototype.updatePlayerdata = function () {
        var vomine = Model_player.voMine;
        if (!vomine)
            return;
        this.lbYB.text = ConfigHelp.numToStr(vomine.yuanbao) + "";
        this.lbTongBi.text = ConfigHelp.numToStr(vomine.tongbi) + "";
        this.lbName.text = vomine.name;
        if (vomine.zsID > 0) {
            this.zsLvLb.text = Config.zhuansheng_705[vomine.zsID].lv;
        }
        else {
            this.zsLvLb.text = "";
        }
    };
    ViewMainTopUI.prototype.updateGuanQia = function () {
        var s = this;
        s.btnAddYB.visible = !GGlobal.isIOS;
        s.lbYB.enabled = !GGlobal.isIOS;
        s.lbTongBi.enabled = !GGlobal.isIOS;
    };
    ViewMainTopUI.prototype.listen = function () {
        var m = GGlobal.modelPlayer;
        var s = this;
        m.listen(Model_player.MSG_UPDATE, s.updatePlayerdata, s);
        m.listen(Model_player.YUANBAO_UPDATE, s.updatePlayerdata, s);
        m.listen(Model_player.TONGBI_UPDATE, s.updatePlayerdata, s);
        m.listen(Model_player.ZHUANSHENG_UPDATE, s.updatePlayerdata, s);
        GGlobal.control.listen(Enum_MsgType.SETTING_CHANGE_NAME, s.updatePlayerdata, s);
        GGlobal.control.listen(Enum_MsgType.MSG_GQ_UPDATE, s.updateGuanQia, s);
        s.updatePlayerdata();
    };
    ViewMainTopUI.prototype.remove = function () {
        //GGlobal.modelPlayer.listen(Model_player.MSG_UPDATE, this.updatePlayerdata, this);
    };
    ViewMainTopUI.prototype.resetPosition = function () {
        this.setXY((fairygui.GRoot.inst.width - this.width) >> 1, GGlobal.layerMgr.uiAlign);
    };
    Object.defineProperty(ViewMainTopUI.prototype, "visible", {
        get: function () {
            return egret.superGetter(ViewMainTopUI, this, "visible");
        },
        set: function (val) {
            if (!val && GGlobal.layerMgr.checkHasUIPanelBase()) {
                return;
            }
            egret.superSetter(ViewMainTopUI, this, "visible", val);
        },
        enumerable: true,
        configurable: true
    });
    ViewMainTopUI.URL = "ui://7gxkx46whju42";
    return ViewMainTopUI;
}(fairygui.GComponent));
__reflect(ViewMainTopUI.prototype, "ViewMainTopUI");
