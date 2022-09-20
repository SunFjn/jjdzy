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
var TipWuJiangSkillShow = (function (_super) {
    __extends(TipWuJiangSkillShow, _super);
    function TipWuJiangSkillShow() {
        var _this = _super.call(this) || this;
        _this.awatar = null;
        _this.childrenCreated();
        return _this;
    }
    TipWuJiangSkillShow.prototype.childrenCreated = function () {
        var self = this;
        self.view = fairygui.UIPackage.createObject("common", "TipWuJiangSkillShow").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        self.closeButton = new fairygui.GObject();
        _super.prototype.childrenCreated.call(this);
    };
    TipWuJiangSkillShow.prototype.onShown = function () {
        var self = this;
        IconUtil.setImg(self.wjBg, Enum_Path.BACK_URL + "wjGet.png");
        self.addClickListener(self.closeEventHandler, self);
    };
    TipWuJiangSkillShow.prototype.onHide = function () {
        var self = this;
        IconUtil.setImg(self.wjBg, null);
        GGlobal.layerMgr.close(UIConst.TIP_WUJIANG_SKILLSHOW);
        self.removeClickListener(self.closeEventHandler, self);
        self.gSkill.y = self.wjBg.y + 53;
        self.labName.text = "";
        self.labDesc.text = "";
        if (self.awatar) {
            self.awatar.onRemove();
            self.awatar = null;
        }
    };
    TipWuJiangSkillShow.prototype.onOpen = function (arg) {
        _super.prototype.onOpen.call(this, arg);
        this.show(arg.value, arg.index, arg.lv, arg.job, arg.starLv, arg.type, arg.damage);
    };
    TipWuJiangSkillShow.prototype.show = function (id, index, lv, job, starLv, showType, damage) {
        if (starLv === void 0) { starLv = 0; }
        if (showType === void 0) { showType = 0; }
        if (damage === void 0) { damage = 0; }
        var self = this;
        if (starLv == 0)
            starLv = 1;
        self.vo = Vo_Skill.create(id, lv, starLv, 0, 0, damage);
        ImageLoader.instance.loader(Enum_Path.SKILL_URL + self.vo.icon + ".png", self.imgIcon);
        if (self.vo.level > 0 && self.vo.type != Model_Skill.TYPE3) {
            self.labName.text = self.vo.name + "Lv." + self.vo.level;
        }
        else {
            self.labName.text = self.vo.name;
        }
        self.labDesc.displayObject.wordWrap = true;
        self.labDesc.text = SkillUtil.getSkillDes(self.vo, showType);
        if (!self.awatar) {
            self.awatar = UIRole.create();
            self.awatar.setPos(self.wjBg.x, self.wjBg.y);
            // self.awatar.setScaleXY(1.5, 1.5);
        }
        self.awatar.uiparent = self.displayListContainer;
        self.awatar.playSkillID(id);
        self.awatar.setBody(job);
        self.awatar.setWeapon(job);
        self.awatar.onAdd();
        if (Number(id) == 100208 || Number(id) == 112038) {
            self.gSkill.y = self.wjBg.y + 250;
        }
        else {
            self.gSkill.y = self.wjBg.y + 53;
        }
    };
    return TipWuJiangSkillShow;
}(UIModalPanel));
__reflect(TipWuJiangSkillShow.prototype, "TipWuJiangSkillShow");
