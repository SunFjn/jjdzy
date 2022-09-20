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
var View_Chat_LookPanel = (function (_super) {
    __extends(View_Chat_LookPanel, _super);
    function View_Chat_LookPanel() {
        var _this = _super.call(this) || this;
        _this.awatar = null;
        _this.childrenCreated();
        return _this;
    }
    View_Chat_LookPanel.prototype.childrenCreated = function () {
        var s = this;
        s.view = fairygui.UIPackage.createObject("chat", "View_Chat_LookPanel").asCom;
        s.contentPane = s.view;
        CommonManager.parseChildren(s.view, s);
        _super.prototype.childrenCreated.call(this);
    };
    View_Chat_LookPanel.prototype.updateShow = function () {
        var self = this;
        var vo = self._args;
        if (vo.titleID) {
            IconUtil.setImg(self.titleIcon, Enum_Path.TITLE_URL + Config.chenghao_702[vo.titleID].picture + ".png");
        }
        else {
            IconUtil.setImg(self.titleIcon, "");
        }
        self.levelLb.text = "等级：" + vo.level + "(" + vo.lunhui + "世轮回)";
        self.powerLb.text = "战力：" + vo.power;
        if (vo.zs > 0) {
            self.zsLb.text = "转生：" + Config.zhuansheng_705[vo.zs].lv;
        }
        else {
            self.zsLb.text = "转生：无";
        }
        if (vo.jinsheng > 0) {
            self.jinshengLb.text = "晋升：" + Config.up_231[vo.jinsheng].pin + Config.up_231[vo.jinsheng].name;
        }
        else {
            self.jinshengLb.text += "晋升：无";
        }
        if (vo.country > 0) {
            self.countryLb.text = "国家：" + Model_Country.getCountryName(vo.country);
        }
        else {
            self.countryLb.text = "国家：隐藏";
        }
        if (vo.jx > 0) {
            self.jxLb.text = "将衔：【" + (vo.jx - 1) + "阶·" + Config.guanxian_701[vo.jx].name + "】";
        }
        else {
            self.jxLb.text = "将衔：【无】";
        }
        if (vo.vip > 0) {
            self.vipLb.text = ConfigHelp.getVipShow(vo.vip);
        }
        else {
            self.vipLb.text = "";
        }
        self.nameLb.text = vo.name;
        var job = 0;
        var cfg = Config.sz_739[vo.fashion];
        if (cfg) {
            var mx = cfg.moxing;
            self.awatar.setBody(mx);
            self.awatar.setWeapon(vo.fashion);
            job = vo.fashion / 1000 >> 0;
        }
        else {
            self.awatar.setBody(vo.fashion);
            self.awatar.setWeapon(vo.fashion);
            job = vo.fashion;
        }
        self.awatar.setGodWeapon(vo.godWeapon);
        self.awatar.setHorseId(vo.horseId);
        self.awatar.uiparent = self.displayListContainer;
        self.awatar.onAdd();
        self.secSkill = JSON.parse(Config.hero_211[job].skills)[1][0];
        Timer.instance.remove(self.playSkill, self);
        if (!vo.horseId) {
            self.playSkill();
            self.awatar.setScaleXY(1.5, 1.5);
        }
        else {
            self.awatar.setScaleXY(1, 1);
        }
    };
    View_Chat_LookPanel.prototype.playSkill = function () {
        this.awatar.playSkillID(this.secSkill, false);
        Timer.instance.callLater(this.playSkill, 5000, this);
    };
    View_Chat_LookPanel.prototype.onShown = function () {
        var self = this;
        if (!self.awatar) {
            self.awatar = UIRole.create();
            self.awatar.setPos(160, 350);
            // self.awatar.setScaleXY(1.5, 1.5);
        }
        self.updateShow();
    };
    View_Chat_LookPanel.prototype.onHide = function () {
        var self = this;
        if (self.awatar) {
            self.awatar.onRemove();
            self.awatar = null;
        }
        GGlobal.layerMgr.close(UIConst.CHAT_LOOK);
        Timer.instance.remove(self.playSkill, self);
    };
    View_Chat_LookPanel.URL = "ui://fx4pr5qe81i015";
    return View_Chat_LookPanel;
}(UIModalPanel));
__reflect(View_Chat_LookPanel.prototype, "View_Chat_LookPanel");
