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
var ViewGodSuit = (function (_super) {
    __extends(ViewGodSuit, _super);
    function ViewGodSuit() {
        var _this = _super.call(this) || this;
        _this.loadRes();
        return _this;
    }
    ViewGodSuit.createInstance = function () {
        return (fairygui.UIPackage.createObject("role", "ViewGodSuit"));
    };
    ViewGodSuit.prototype.childrenCreated = function () {
        GGlobal.createPack("role");
        this.view = fairygui.UIPackage.createObject("role", "ViewGodSuit").asCom;
        this.contentPane = this.view;
        this.frame = (this.view.getChild("frame"));
        this.labTitle = (this.view.getChild("labTitle"));
        this.labPower = (this.view.getChild("labPower"));
        this.labCur = (this.view.getChild("labCur"));
        this.labAttrCur = (this.view.getChild("labAttrCur"));
        this.labNeedCur = (this.view.getChild("labNeedCur"));
        this.btnUp = (this.view.getChild("btnUp"));
        this.labNext = (this.view.getChild("labNext"));
        this.labAttrNext = (this.view.getChild("labAttrNext"));
        this.labNeedNext = (this.view.getChild("labNeedNext"));
        this.boxMax = (this.view.getChild("boxMax"));
        _super.prototype.childrenCreated.call(this);
    };
    ViewGodSuit.prototype.onOpen = function (arg) {
        _super.prototype.onOpen.call(this, arg);
        this.btnUp.addClickListener(this.upHandle, this);
        GGlobal.control.listen(Enum_MsgType.GOD_EQUIP_SUIT_JIE, this.updateView, this);
        this.updateView();
    };
    ViewGodSuit.prototype.onHide = function () {
        _super.prototype.onHide.call(this);
        this.btnUp.removeClickListener(this.upHandle, this);
        GGlobal.control.remove(Enum_MsgType.GOD_EQUIP_SUIT_JIE, this.updateView, this);
        GGlobal.layerMgr.close(UIConst.GOD_EQUIP_SUIT);
    };
    ViewGodSuit.prototype.updateView = function () {
        var level = 999999;
        var equipData = Model_player.voMine.equipData;
        var voE;
        for (var i = 0; i < 10; i++) {
            voE = equipData[i + 10];
            if (voE) {
                if (voE.cfg.jie < level) {
                    level = voE.cfg.jie;
                }
            }
            else {
                level = 0;
                break;
            }
        }
        var suitCur;
        if (Model_GodEquip.GOD_JIE == 0) {
            suitCur = null;
        }
        else {
            suitCur = Config.godequipsuit_208[Model_GodEquip.GOD_JIE];
        }
        var suitNext = Config.godequipsuit_208[Model_GodEquip.GOD_JIE + 1];
        if (suitCur) {
            this.labCur.text = "当前阶段：";
            this.labNeedCur.text = "全身神装" + Model_GodEquip.GOD_JIE + "阶";
            this.labAttrCur.text = ConfigHelp.attrString(ConfigHelp.SplitStr(suitCur.attr), "+");
            this.labPower.text = "战力+" + suitCur.power;
            this.labTitle.text = "套装" + Model_GodEquip.GOD_JIE + "阶";
            this.labNext.y = this.labCur.y + 110;
            this.labNeedNext.y = this.labNeedCur.y + 110;
            this.labAttrNext.y = this.labAttrCur.y + 110;
        }
        else {
            this.labCur.text = "";
            this.labNeedCur.text = "";
            this.labAttrCur.text = "";
            this.labPower.text = "战力+0";
            this.labTitle.text = "套装0阶";
            this.labNext.y = this.labCur.y;
            this.labNeedNext.y = this.labNeedCur.y;
            this.labAttrNext.y = this.labAttrCur.y;
        }
        if (Model_GodEquip.GOD_JIE < level) {
            this.btnUp.checkNotice = true;
        }
        else {
            this.btnUp.checkNotice = false;
        }
        if (suitNext) {
            this.labNext.text = "下一阶段：";
            this.labNeedNext.text = "全身神装" + (Model_GodEquip.GOD_JIE + 1) + "阶";
            this.labAttrNext.text = ConfigHelp.attrString(ConfigHelp.SplitStr(suitNext.attr), "+");
            this.boxMax.visible = false;
            this.btnUp.visible = this.btnUp.touchable = true;
        }
        else {
            this.labNext.text = "";
            this.labNeedNext.text = "";
            this.labAttrNext.text = "";
            this.boxMax.visible = true;
            this.btnUp.visible = this.btnUp.touchable = false;
        }
    };
    ViewGodSuit.prototype.upHandle = function (event) {
        if (event === void 0) { event = null; }
        if (this.btnUp.checkNotice) {
            GGlobal.modelGodEquip.CGUpJieOrange();
        }
        else {
            ViewCommonWarn.text("未满足条件");
        }
    };
    ViewGodSuit.URL = "ui://3tzqotadltpm17";
    return ViewGodSuit;
}(UIModalPanel));
__reflect(ViewGodSuit.prototype, "ViewGodSuit");
