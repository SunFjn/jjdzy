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
var YanHuiListItem = (function (_super) {
    __extends(YanHuiListItem, _super);
    function YanHuiListItem() {
        return _super.call(this) || this;
    }
    YanHuiListItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("YanHui", "YanHuiListItem"));
    };
    YanHuiListItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
    };
    YanHuiListItem.prototype.setVo = function (vo) {
        var self = this;
        self.vo = vo;
        var cfg = Config.party_298[vo.type];
        self.numLb.text = ConfigHelp.reTxt("参与人数：{0}", vo.num + "/" + cfg.num);
        self.stateImg.visible = self.stateLb.visible = true;
        if (vo.id == GGlobal.modelYanHui.yanHuiID) {
            self.stateLb.text = "参与中";
            self.goBt.checkNotice = GGlobal.reddot.checkCondition(UIConst.YANHUI);
        }
        else if (vo.num >= cfg.num) {
            self.stateLb.text = "已满员";
        }
        else {
            self.stateImg.visible = self.stateLb.visible = false;
        }
        IconUtil.setImg(self.backImg, Enum_Path.YANHUI_URL + "type" + vo.type + ".png");
        self.head.setdata(vo.head, 0, vo.roleName, 0, false, vo.framePic);
        if (vo.id == GGlobal.modelYanHui.yanHuiID) {
            self.goBt.visible = true;
            self.applyImg.visible = false;
            self.goBt.text = "前往";
        }
        else {
            self.applyImg.visible = vo.isApply == 1;
            self.goBt.visible = vo.isApply != 1;
            self.goBt.text = vo.isApply == 0 ? "申请" : "前往";
        }
        self.goBt.addClickListener(self.OnGo, self);
    };
    YanHuiListItem.prototype.OnGo = function () {
        var self = this;
        var model = GGlobal.modelYanHui;
        var cfg = Config.party_298[self.vo.type];
        if (model.yanHuiID > 0 && self.vo.id != model.yanHuiID) {
            return ViewCommonWarn.text("同一时间只能参加一场宴会");
        }
        else if (self.vo.id != model.yanHuiID && self.vo.num >= cfg.num) {
            ViewCommonWarn.text("已满员");
            return;
        }
        if (self.vo.isApply == 0 && self.vo.id != model.yanHuiID) {
            model.CG11479(self.vo.id, 1);
        }
        else {
            if (self.vo.id == model.yanHuiID) {
                YanHuiManager.getInstance().enter();
                model.CG_House_openHouseUI_11453();
                return;
            }
            GGlobal.layerMgr.open(UIConst.YANHUI_FUYAN, self.vo);
        }
    };
    YanHuiListItem.prototype.clean = function () {
        var self = this;
        self.goBt.removeClickListener(self.OnGo, self);
        IconUtil.setImg(self.backImg, null);
    };
    YanHuiListItem.URL = "ui://4x7dk3lhh7qe1";
    return YanHuiListItem;
}(fairygui.GComponent));
__reflect(YanHuiListItem.prototype, "YanHuiListItem");
