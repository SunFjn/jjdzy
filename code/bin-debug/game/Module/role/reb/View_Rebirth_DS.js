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
var View_Rebirth_DS = (function (_super) {
    __extends(View_Rebirth_DS, _super);
    function View_Rebirth_DS() {
        var _this = _super.call(this) || this;
        _this.loadRes();
        return _this;
    }
    View_Rebirth_DS.createInstance = function () {
        return (fairygui.UIPackage.createObject("role", "View_Rebirth_DS"));
    };
    View_Rebirth_DS.prototype.childrenCreated = function () {
        GGlobal.createPack("role");
        this.view = fairygui.UIPackage.createObject("role", "View_Rebirth_DS").asCom;
        this.contentPane = this.view;
        this.c1 = this.view.getController("c1");
        this.upgradeBt = (this.view.getChild("upgradeBt"));
        this.suitLb = (this.view.getChild("suitLb"));
        this.powerLb = (this.view.getChild("powerLb"));
        this.nextLb = (this.view.getChild("nextLb"));
        this.nextAttLb = (this.view.getChild("nextAttLb"));
        this.curLb = (this.view.getChild("curLb"));
        this.curAttLb = (this.view.getChild("curAttLb"));
        _super.prototype.childrenCreated.call(this);
        this.nextAttLb.leading = 6;
        this.curAttLb.leading = 6;
    };
    View_Rebirth_DS.prototype.onShown = function () {
        var a = this;
        a.upgradeBt.addClickListener(a.upHandle, a);
        GGlobal.control.listen(Enum_MsgType.REBIRTH_EQUIP_UPDATA, this.updateShow, this);
        this.updateShow();
    };
    View_Rebirth_DS.prototype.onHide = function () {
        _super.prototype.onHide.call(this);
        GGlobal.layerMgr.close(UIConst.VIEW_REBIRTH_DS);
        GGlobal.control.remove(Enum_MsgType.REBIRTH_EQUIP_UPDATA, this.updateShow, this);
    };
    View_Rebirth_DS.prototype.upHandle = function () {
        var lv = Model_Equip.lhLevel;
        var arr = Model_Equip.lhArr;
        var nextCfg = Config.zhuanshenglhds_256[lv + 1];
        if (!nextCfg) {
            ViewCommonWarn.text("已满级");
            return;
        }
        var boo = true;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].lv < nextCfg.lv) {
                boo = false;
                break;
            }
        }
        if (!boo) {
            ViewCommonWarn.text("未达到条件，不能进阶");
            return;
        }
        GGlobal.modelEquip.addLHDaShiLv();
    };
    View_Rebirth_DS.prototype.updateShow = function () {
        var a = this;
        var lv = Model_Equip.lhLevel;
        a.suitLb.text = "转生大师" + lv + "阶";
        var arr = Model_Equip.lhArr;
        var curCfg = Config.zhuanshenglhds_256[lv];
        a.powerLb.text = "战力 +" + curCfg.fight;
        var nextCfg = Config.zhuanshenglhds_256[lv + 1];
        if (!nextCfg) {
            a.c1.selectedIndex = 2;
        }
        else if (lv == 0) {
            a.c1.selectedIndex = 0;
        }
        else {
            a.c1.selectedIndex = 1;
        }
        if (curCfg) {
            a.curLb.text = "[color=#FFC334]当前阶段[/color]  全身炼魂+" + curCfg.lv + " [color=#16f60b](已激活)[/color]";
            a.curAttLb.text = ConfigHelp.attrString(ConfigHelp.SplitStr(curCfg.attr), "+");
        }
        if (nextCfg) {
            a.nextLb.text = "[color=#FFC334]下一阶段[/color]  全身炼魂+" + nextCfg.lv;
            a.nextAttLb.text = ConfigHelp.attrString(ConfigHelp.SplitStr(nextCfg.attr), "+");
        }
        var boo = true;
        if (!nextCfg) {
            boo = false;
        }
        else {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].lv < nextCfg.lv) {
                    boo = false;
                    break;
                }
            }
        }
        a.upgradeBt.enabled = a.upgradeBt.checkNotice = boo;
    };
    View_Rebirth_DS.URL = "ui://3tzqotadpwxe43";
    return View_Rebirth_DS;
}(UIModalPanel));
__reflect(View_Rebirth_DS.prototype, "View_Rebirth_DS");
