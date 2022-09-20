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
var View_ShaoZhuSkill_Panel = (function (_super) {
    __extends(View_ShaoZhuSkill_Panel, _super);
    function View_ShaoZhuSkill_Panel() {
        var _this = _super.call(this) || this;
        _this.skillArr = [];
        _this.setSkin("ShaoZhu", "ShaoZhu_atlas0", "View_ShaoZhuSkill_Panel");
        return _this;
    }
    View_ShaoZhuSkill_Panel.prototype.initView = function () {
        var self = this;
        self.list.callbackThisObj = self;
        self.list.itemRenderer = self.itemRenderHandler;
    };
    View_ShaoZhuSkill_Panel.prototype.itemRenderHandler = function (index, obj) {
        var self = this;
        var cfg = self.skillArr[index];
        obj.updateShow(cfg);
    };
    View_ShaoZhuSkill_Panel.prototype.updateShow = function () {
        var self = this;
        if (self.skillArr.length <= 0) {
            var arr = JSON.parse(Config.xtcs_004[5804].other);
            for (var i = 0; i < arr[0].length; i++) {
                var cfg = Config.sonskill_267[arr[0][i]];
                self.skillArr.push(cfg);
            }
        }
        self.list.numItems = self.skillArr.length;
    };
    View_ShaoZhuSkill_Panel.prototype.onShown = function () {
        this.updateShow();
    };
    View_ShaoZhuSkill_Panel.prototype.onHide = function () {
        var self = this;
        self.list.numItems = 0;
        GGlobal.layerMgr.close(UIConst.SHAOZHU_ALLSKILL);
        GGlobal.layerMgr.open(UIConst.SHAOZHU_SKILL);
    };
    View_ShaoZhuSkill_Panel.URL = "ui://p83wyb2beigu13";
    return View_ShaoZhuSkill_Panel;
}(UIPanelBase));
__reflect(View_ShaoZhuSkill_Panel.prototype, "View_ShaoZhuSkill_Panel");
