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
var ViewRankInfo = (function (_super) {
    __extends(ViewRankInfo, _super);
    function ViewRankInfo() {
        var _this = _super.call(this) || this;
        _this.awatar = null;
        _this.childrenCreated();
        return _this;
    }
    ViewRankInfo.prototype.childrenCreated = function () {
        var self = this;
        self.view = fairygui.UIPackage.createObject("rank", "ViewRankInfo").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        _super.prototype.childrenCreated.call(this);
    };
    ViewRankInfo.prototype.onOpen = function (arg) {
        _super.prototype.onOpen.call(this, arg);
        var self = this;
        self.lbName.addEventListener(fairygui.GObject.SIZE_CHANGED, self.resize, self);
        self.lbVip.addEventListener(fairygui.GObject.SIZE_CHANGED, self.resize, self);
        var v = arg;
        self._vo = v;
        self.lbName.text = v.name;
        self.lbGuan.text = Model_GuanXian.getJiangXianStr1(v.guanxian);
        self.lbLevel.text = "等级：" + v.level;
        var country = v.showCoun == 0 ? v.country : 0;
        if (country > 0) {
            self.imgCountry.url = CommonManager.getCommonUrl("country" + country);
            self.imgCountry.visible = true;
        }
        else {
            self.imgCountry.visible = false;
        }
        self.labPower.text = v.totPower + "";
        IconUtil.setImg(self.imgBg, Enum_Path.BACK_URL + "rankBg.jpg");
        if (v.vip > 0) {
            self.lbVip.text = ConfigHelp.getVipShow(v.vip);
            ;
            self.lbVip.visible = true;
        }
        else {
            self.lbVip.text = "";
            self.lbVip.visible = false;
        }
        if (!self.awatar) {
            self.awatar = UIRole.create();
            self.awatar.setPos(self.imgDi.x, self.imgDi.y - 30);
            // self.awatar.setScaleXY(1.5, 1.5);
        }
        var fscfg = Config.sz_739[v.job];
        var moxing = 0;
        if (fscfg) {
            moxing = fscfg.moxing;
            self.awatar.setBody(moxing);
            self.awatar.setWeapon(v.job);
        }
        else {
            moxing = v.job;
            self.awatar.setBody(moxing);
            self.awatar.setWeapon(moxing);
        }
        self.awatar.setGodWeapon(v.godWeapon);
        self.awatar.setHorseId(v.horseId);
        if (v.horseId) {
            self.awatar.setScaleXY(1, 1);
        }
        else {
            self.awatar.setScaleXY(1.5, 1.5);
        }
        self.awatar.uiparent = self.displayListContainer;
        self.awatar.onAdd();
        self.addChild(self.imgTitle);
        if (v.titleId > 0) {
            self.imgTitle.visible = true;
            IconUtil.setImg(self.imgTitle, Enum_Path.TITLE_URL + Config.chenghao_702[v.titleId].picture + ".png");
        }
        else {
            self.imgTitle.visible = false;
        }
        self.resize();
    };
    ViewRankInfo.prototype.onHide = function () {
        var self = this;
        GGlobal.layerMgr.close(UIConst.RANK_INFO);
        self.lbName.removeEventListener(fairygui.GObject.SIZE_CHANGED, self.resize, self);
        self.lbVip.removeEventListener(fairygui.GObject.SIZE_CHANGED, self.resize, self);
        if (self.awatar) {
            self.awatar.onRemove();
            self.awatar = null;
        }
        IconUtil.setImg(self.imgTitle, null);
        IconUtil.setImg(self.imgBg, null);
    };
    ViewRankInfo.prototype.resize = function () {
        var self = this;
        if (self._vo.vip > 0) {
            self.lbName.x = (self.width - self.lbName.width - self.lbVip.width - 4) / 2;
            self.lbVip.x = self.lbName.x + self.lbName.width + 4;
        }
        else {
            self.lbName.x = (self.width - self.lbName.width) / 2;
        }
    };
    return ViewRankInfo;
}(UIModalPanel));
__reflect(ViewRankInfo.prototype, "ViewRankInfo");
