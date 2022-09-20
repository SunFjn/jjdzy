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
var ActHolyBXunBGrid = (function (_super) {
    __extends(ActHolyBXunBGrid, _super);
    function ActHolyBXunBGrid() {
        var _this = _super.call(this) || this;
        _this.drawNum = 0;
        return _this;
    }
    ActHolyBXunBGrid.createInstance = function () {
        return (fairygui.UIPackage.createObject("shouhunJX", "ActHolyBXunBGrid"));
    };
    ActHolyBXunBGrid.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.addClickListener(self.gridHandler, self);
    };
    ActHolyBXunBGrid.prototype.gridHandler = function () {
        var self = this;
        if (self.drawNum > 0) {
            GGlobal.modelSHXunbao.CG_XUNBAO_GOAL(self.vo.id);
        }
    };
    ActHolyBXunBGrid.prototype.setVo = function (cfg, state) {
        if (state === void 0) { state = 0; }
        var self = this;
        self.vo = cfg;
        self.drawNum = state;
        self.title = cfg.q + "圈";
        var arr = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward));
        if (state > 0) {
            self.noticeImg.visible = self.lbCt.visible = true;
            self.imgGet.visible = false;
            if (state > 1) {
                self.lbCt.text = state + "";
            }
            else {
                self.lbCt.text = "";
            }
            self.grid.tipEnabled = false;
        }
        else {
            self.noticeImg.visible = self.lbCt.visible = false;
            self.imgGet.visible = state == -1 && GGlobal.modelSHXunbao.xbQuan % 50 >= cfg.q;
            self.grid.tipEnabled = true;
        }
        self.grid.isShowEff = true;
        self.grid.vo = arr[0];
    };
    ActHolyBXunBGrid.prototype.clean = function () {
        this.grid.clean();
    };
    ActHolyBXunBGrid.URL = "ui://4aepcdbwflxz5d";
    return ActHolyBXunBGrid;
}(fairygui.GLabel));
__reflect(ActHolyBXunBGrid.prototype, "ActHolyBXunBGrid");
