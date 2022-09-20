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
var View_MapPanel = (function (_super) {
    __extends(View_MapPanel, _super);
    function View_MapPanel() {
        var _this = _super.call(this) || this;
        _this.loadRes();
        return _this;
    }
    View_MapPanel.prototype.childrenCreated = function () {
        var s = this;
        s.isShowMask = false;
        s.isShowOpenAnimation = false;
        s.view = fairygui.UIPackage.createObject("common", "View_MapPanel").asCom;
        s.contentPane = s.view;
        this.mapName = (s.view.getChild("mapName"));
        this.touchable = false;
        _super.prototype.childrenCreated.call(this);
    };
    View_MapPanel.prototype.updateShow = function () {
        var s = this;
        if (s._mapName) {
            s.mapName.text = s._mapName;
        }
        else {
            var mapcfg = Config.map_200[GGlobal.sceneID];
            if (mapcfg && mapcfg.name != "0") {
                s.mapName.text = mapcfg.name;
            }
            else {
                s.mapName.text = "";
            }
        }
        s.y = 250;
    };
    View_MapPanel.prototype.resetPosition = function () {
        _super.prototype.resetPosition.call(this);
        this.y = 250;
    };
    View_MapPanel.prototype.onShown = function () {
        var self = this;
        if (self._args) {
            self._mapName = self._args.mapName;
            self.mapName.strokeColor = 0x000000;
            self.mapName.stroke = self._args.stroke ? 1 : 0;
        }
        else {
            self.mapName.stroke = 0;
        }
        self.updateShow();
        GGlobal.control.listen(Enum_MsgType.ONRESIZE, self.resetPosition, self);
    };
    View_MapPanel.prototype.onHide = function () {
        var self = this;
        self._mapName = null;
        GGlobal.layerMgr.close(UIConst.MAP);
        GGlobal.control.remove(Enum_MsgType.ONRESIZE, self.resetPosition, self);
    };
    View_MapPanel.show = function () {
        var mapcfg = Config.map_200[GGlobal.sceneID];
        if (mapcfg && mapcfg.name != "0") {
            if (GGlobal.layerMgr.isOpenView(UIConst.MAP)) {
                GGlobal.layerMgr.getView(UIConst.MAP).updateShow();
            }
            else {
                GGlobal.layerMgr.open(UIConst.MAP);
            }
        }
        else {
            GGlobal.layerMgr.close2(UIConst.MAP);
        }
    };
    View_MapPanel.URL = "ui://jvxpx9em73mn3e1";
    return View_MapPanel;
}(UIModalPanel));
__reflect(View_MapPanel.prototype, "View_MapPanel");
