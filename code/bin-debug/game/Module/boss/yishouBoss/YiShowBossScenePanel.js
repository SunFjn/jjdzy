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
var YiShowBossScenePanel = (function (_super) {
    __extends(YiShowBossScenePanel, _super);
    function YiShowBossScenePanel() {
        var _this = _super.call(this) || this;
        _this.resetTime = function () {
            _this._time = 120000 + Model_GlobalMsg.getServerTime();
        };
        _this.timeUpdate = function () {
            var self = _this;
            var remaindSec = ((self._time - Model_GlobalMsg.getServerTime()) / 1000) >> 0;
            if (remaindSec <= 0) {
                YiShouBossCtrl.getInst().startResult();
            }
            else {
                self.lbTime.text = "剩余时间：\n" + DateUtil.getMSBySec3(remaindSec);
            }
        };
        _this._time = 120;
        return _this;
    }
    YiShowBossScenePanel.createInstance = function () {
        return YiShowBossScenePanel._inst || (YiShowBossScenePanel._inst = (fairygui.UIPackage.createObject("Boss", "YiShowBossScenePanel")));
    };
    YiShowBossScenePanel.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
    };
    YiShowBossScenePanel.prototype.showOrHide = function (v) {
        var self = this;
        var m = GGlobal.modelYiShouBOSS;
        if (v) {
            self.setXY(440, 400);
            GGlobal.layerMgr.UI_MainLowBottom.addChild(self);
            self._time = 120000 + Model_GlobalMsg.getServerTime();
            Timer.instance.listen(self.timeUpdate, self, 1000);
            if (m.firstKiler_Grid == 0) {
                ImageLoader.instance.loader(RoleUtil.getHeadRole("2001"), self.imgGrid);
            }
            else {
                var framePic = Config.shezhi_707[m.firstKiler_Grid];
                ImageLoader.instance.loader(RoleUtil.getHeadRole(framePic.picture + ""), self.imgGrid);
            }
            if (m.firstKiler_head == 0) {
                ImageLoader.instance.loader(RoleUtil.getHeadRole("tx_00"), self.imgHead);
                self.lbName.text = "";
                self.imgNull.visible = true;
            }
            else {
                var headPic = Config.shezhi_707[m.firstKiler_head];
                ImageLoader.instance.loader(RoleUtil.getHeadRole(headPic.picture + ""), self.imgHead);
                self.lbName.text = m.FirstKiller;
                self.imgNull.visible = false;
            }
        }
        else {
            Timer.instance.remove(self.timeUpdate, self);
            this.removeFromParent();
        }
    };
    YiShowBossScenePanel.URL = "ui://47jfyc6el44i3p";
    return YiShowBossScenePanel;
}(fairygui.GComponent));
__reflect(YiShowBossScenePanel.prototype, "YiShowBossScenePanel");
