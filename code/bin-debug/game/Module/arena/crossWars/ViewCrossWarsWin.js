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
var ViewCrossWarsWin = (function (_super) {
    __extends(ViewCrossWarsWin, _super);
    function ViewCrossWarsWin() {
        var _this = _super.call(this) || this;
        _this.loadRes();
        return _this;
    }
    ViewCrossWarsWin.createInstance = function () {
        return (fairygui.UIPackage.createObject("Arena", "ViewCrossWarsWin"));
    };
    ViewCrossWarsWin.prototype.childrenCreated = function () {
        var self = this;
        GGlobal.createPack("Arena");
        self.view = fairygui.UIPackage.createObject("Arena", "ViewCrossWarsWin").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        _super.prototype.childrenCreated.call(this);
        self._plyArr = [self.ply0, self.ply1, self.ply2, self.ply3, self.ply4];
        self.list.itemRenderer = self.renderListItem;
        self.list.callbackThisObj = self;
        self.list.setVirtual();
        self.imgHas.visible = false;
    };
    ViewCrossWarsWin.prototype.resetPosition = function () {
        var self = this;
        self.setXY((fairygui.GRoot.inst.width - self.width) >> 1, (fairygui.GRoot.inst.height - self.height) >> 1);
    };
    ViewCrossWarsWin.prototype.onShown = function () {
        var self = this;
        self.addListen();
        self.update();
        GGlobal.modelCrossWars.CG_OPEN_WINERS();
    };
    ViewCrossWarsWin.prototype.onHide = function () {
        this.removeListen();
    };
    ViewCrossWarsWin.prototype.addListen = function () {
        var self = this;
        self.btnMobai.addClickListener(self.onMobai, self);
        self.btnGet.addClickListener(self.onGet, self);
        GGlobal.control.listen(Enum_MsgType.CROSSWARS_OPEN_WINERS, self.update, self);
    };
    ViewCrossWarsWin.prototype.removeListen = function () {
        var self = this;
        self.btnMobai.removeClickListener(self.onMobai, self);
        self.btnGet.removeClickListener(self.onGet, self);
        GGlobal.control.remove(Enum_MsgType.CROSSWARS_OPEN_WINERS, self.update, self);
        GGlobal.layerMgr.close(UIConst.CROSS_WARS_WIN);
        self.list.numItems = 0;
    };
    ViewCrossWarsWin.prototype.update = function () {
        var self = this;
        if (self._winRewardArr == null) {
            self._winRewardArr = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(ConfigHelp.getSystemDesc(2403)));
        }
        self.list.numItems = self._winRewardArr.length;
        for (var i = 0; i < self._plyArr.length; i++) {
            var hasData = false;
            for (var j = 0; j < Model_CrossWars.winPlyArr.length; j++) {
                if ((i + 1) == Model_CrossWars.winPlyArr[j].turn) {
                    self._plyArr[i].setVo(Model_CrossWars.winPlyArr[j], i + 1);
                    hasData = true;
                    break;
                }
            }
            if (!hasData) {
                self._plyArr[i].setVo(null, i + 1);
            }
        }
        if (Model_CrossWars.actStatus == 0) {
            self.imgMobai.visible = Model_CrossWars.winMobai > 0;
            self.btnGet.enabled = self.btnGet.checkNotice = Model_CrossWars.winReward > 0;
            if (Model_CrossWars.winMobai == 0 && Model_CrossWars.winPlyArr.length > 0) {
                self.btnMobai.visible = self.btnMobai.touchable = true;
                self.btnMobai.checkNotice = true;
            }
            else {
                self.btnMobai.visible = self.btnMobai.touchable = false;
            }
        }
        else {
            self.btnGet.enabled = self.btnGet.checkNotice = false;
            self.btnMobai.visible = self.btnMobai.touchable = false;
            self.imgMobai.visible = false;
        }
    };
    ViewCrossWarsWin.prototype.renderListItem = function (index, obj) {
        var item = obj;
        item.isShowEff = true;
        item.tipEnabled = true;
        item.vo = this._winRewardArr[index];
    };
    ViewCrossWarsWin.prototype.onMobai = function () {
        if (Model_CrossWars.actStatus == 1) {
            ViewCommonWarn.text("赛事未结束");
            return;
        }
        if (Model_CrossWars.winMobai == 0) {
            GGlobal.modelCrossWars.CG_MOBAI();
        }
    };
    ViewCrossWarsWin.prototype.onGet = function () {
        if (Model_CrossWars.actStatus == 1) {
            ViewCommonWarn.text("赛事未结束");
            return;
        }
        if (Model_CrossWars.winReward > 0) {
            GGlobal.modelCrossWars.CG_GET_FRIST();
        }
        else {
            ViewCommonWarn.text("没有可领取的奖励");
        }
    };
    ViewCrossWarsWin.URL = "ui://yqpfulef6wztf";
    return ViewCrossWarsWin;
}(UIModalPanel));
__reflect(ViewCrossWarsWin.prototype, "ViewCrossWarsWin");
