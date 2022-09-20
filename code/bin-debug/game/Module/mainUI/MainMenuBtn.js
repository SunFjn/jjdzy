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
var MainMenuBtn = (function (_super) {
    __extends(MainMenuBtn, _super);
    function MainMenuBtn() {
        var _this = _super.call(this) || this;
        _this.sortIndex = 0;
        _this.panelId = 0;
        _this._checkNotice = false;
        _this._checkDisImg = false;
        return _this;
    }
    MainMenuBtn.createInstance = function () {
        return (fairygui.UIPackage.createObject("MainUI", "MainMenuBtn"));
    };
    MainMenuBtn.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.noticeImg = (this.getChild("noticeImg"));
        this.kfIcon = (this.getChild("kfIcon"));
        this.disImg = (this.getChild("disImg"));
        this.checkNotice = false;
        this.checkDisImg = false;
        this.addClickListener(this.openPanelHandle, this);
    };
    MainMenuBtn.prototype.setIcon = function (icon) {
        ImageLoader.instance.loader(Enum_Path.MAINUI_URL + icon + ".png", this._iconObject.asLoader, this.loadComplete);
    };
    MainMenuBtn.prototype.showEff = function (value) {
        var s = this;
        if (value) {
            if (!s.iconEff) {
                var cfg = Config.tubiao_003[s.panelId];
                if (s.panelId == UIConst.WUSHENGLIST || s.panelId == UIConst.QUNYINGBANG) {
                    s.iconEff = EffectMgr.addEff("uieff/10023", s.displayListContainer, 53, 42, 1000, -1, true);
                }
                else if (cfg.area == 3) {
                    s.iconEff = EffectMgr.addEff("uieff/10021", s.displayListContainer, 70 / 2, 73 / 2, 1000, -1, true);
                }
                else {
                    s.iconEff = EffectMgr.addEff("uieff/10021", s.displayListContainer, 84 / 2, 88 / 2, 1000, -1, true);
                }
            }
        }
        else {
            if (s.iconEff) {
                EffectMgr.instance.removeEff(s.iconEff);
                s.iconEff = null;
            }
        }
    };
    Object.defineProperty(MainMenuBtn.prototype, "checkNotice", {
        get: function () {
            return this._checkNotice;
        },
        set: function (value) {
            this.noticeImg.visible = value;
            this._checkNotice = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MainMenuBtn.prototype, "checkDisImg", {
        get: function () {
            return this._checkDisImg;
        },
        set: function (value) {
            this.disImg.visible = value;
            this._checkDisImg = value;
        },
        enumerable: true,
        configurable: true
    });
    MainMenuBtn.prototype.openPanelHandle = function () {
        if (!GGlobal.layerMgr.limitByFB(this.panelId)) {
            return;
        }
        if (GGlobal.layerMgr.isOpenView(this.panelId)) {
            GGlobal.layerMgr.close2(this.panelId);
        }
        else {
            if (this.panelId == UIConst.MAINTOWN) {
                GGlobal.layerMgr.closeAllPanel();
            }
            else if (this.panelId == UIConst.CROSS_KING && !ModuleManager.isOpen(UIConst.CROSS_KING)) {
                GGlobal.layerMgr.open(UIConst.CROSS_TEAM);
                return;
            }
            else if (this.panelId == UIConst.HOME) {
                if (HomeModel.isTimeIn()) {
                    ViewCommonWarn.text("府邸数据重置中,0:06开启");
                    return;
                }
                GGlobal.homemodel.CG_House_gotoYard_11101(Model_player.voMine.id);
                // GGlobal.homemodel.test(HomeModel.HOME_YARD_MAP);
                return;
            }
            GGlobal.layerMgr.open(this.panelId);
        }
    };
    MainMenuBtn.prototype.uidispose = function () {
        //clear effect
        this.showEff(false);
        if (this.parent)
            this.parent.removeChild(this);
    };
    MainMenuBtn.prototype.setKF = function (v) {
        this.kfIcon.visible = v;
    };
    MainMenuBtn.URL = "ui://7gxkx46wmp9n4";
    return MainMenuBtn;
}(fairygui.GButton));
__reflect(MainMenuBtn.prototype, "MainMenuBtn");
