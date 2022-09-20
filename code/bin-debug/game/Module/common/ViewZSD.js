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
/**还是直升丹 */
var ViewZSD = (function (_super) {
    __extends(ViewZSD, _super);
    function ViewZSD() {
        var _this = _super.call(this) || this;
        _this.loadRes("ZhiShengDan", "ZhiShengDan_atlas0");
        return _this;
    }
    ViewZSD.prototype.childrenCreated = function () {
        var self = this;
        GGlobal.createPack("ZhiShengDan");
        var view = fairygui.UIPackage.createObject("ZhiShengDan", "ViewZSD").asCom;
        self.contentPane = view;
        CommonManager.parseChildren(view, self);
        self.isClosePanel = false;
        self.btnClose.displayObject.touchEnabled = true;
        self.btnZG.displayObject.touchEnabled = true;
        self.btnUSE.displayObject.touchEnabled = true;
        self.btnZG.addClickListener(self.onHand, this);
        self.btnUSE.addClickListener(self.onHand, this);
        self.btnZG.checkNotice = false;
        self.btnUSE.checkNotice = false;
        self.closeButton = self.btnClose;
        self.bg = self["n0"];
        _super.prototype.childrenCreated.call(this);
    };
    ViewZSD.prototype.onHand = function (evt) {
        var tar = evt.currentTarget;
        switch (tar) {
            case this.btnZG:
                var cfg = Config.zsd_257[this._args];
                if (TimeUitl.isIn7Days()) {
                    GGlobal.layerMgr.open(UIConst.SYSTEM_ZHI_GOU, { day: cfg.kf, type: 2 });
                }
                else {
                    var vo = new VoItem();
                    vo.initLib(cfg.item);
                    View_CaiLiao_GetPanel.show(vo);
                }
                break;
            case this.btnUSE:
                GGlobal.modelGlobalMsg.CG3741(Config.zsd_257[this._args].id);
                break;
        }
    };
    ViewZSD.prototype.onShown = function () {
        _super.prototype.onShown.call(this);
        var self = this;
        var cfg = Config.zsd_257[self._args];
        self.iconContent.icon = CommonManager.getUrl("ZhiShengDan", cfg.day + "");
        IconUtil.setImg(self.bg, Enum_Path.BACK_URL + "zsdBG.png");
        var temp = new VoItem();
        self.grid.isShowEff = true;
        self.grid.tipEnabled = true;
        temp.initLib(cfg.item);
        this.grid.vo = temp;
        self.btnUSE.visible = self.btnZG.visible = self.promptLb.visible = false;
        if (cfg.kf > Model_GlobalMsg.kaifuDay) {
            var date = new Date(Model_GlobalMsg.getServerTime());
            var key = "zhishengdan_" + self._args + Model_player.voMine.id + "_" + date.getDay() + date.getMonth() + date.getFullYear();
            var value = egret.localStorage.getItem(key);
            if (!value) {
                egret.localStorage.setItem(key, "zhishengdan_show");
            }
            self.promptLb.visible = true;
            self.promptLb.text = (cfg.kf - Model_GlobalMsg.kaifuDay) + "天后可购买";
        }
        else {
            if (Model_Bag.getItemCount(temp.id) > 0) {
                self.btnUSE.visible = true;
            }
            else {
                self.btnZG.visible = true;
            }
        }
    };
    ViewZSD.prototype.onHide = function () {
        var self = this;
        GGlobal.layerMgr.close(self.panelId);
        IconUtil.setImg(self.bg, null);
        self.grid.clean();
    };
    ViewZSD.show = function (_args) {
        var cfg = Config.zsd_257[_args];
        if (cfg && cfg.kf > Model_GlobalMsg.kaifuDay) {
            var date = new Date(Model_GlobalMsg.getServerTime());
            var key = "zhishengdan_" + _args + Model_player.voMine.id + "_" + date.getDay() + date.getMonth() + date.getFullYear();
            var value = egret.localStorage.getItem(key);
            if (!value) {
                GGlobal.layerMgr.open(UIConst.ZHISHENGDAN, _args);
            }
        }
        else {
            GGlobal.layerMgr.open(UIConst.ZHISHENGDAN, _args);
        }
    };
    return ViewZSD;
}(UIModalPanel));
__reflect(ViewZSD.prototype, "ViewZSD");
