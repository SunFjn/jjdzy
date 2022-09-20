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
var ChildWuJiangUpJie = (function (_super) {
    __extends(ChildWuJiangUpJie, _super);
    function ChildWuJiangUpJie() {
        var _this = _super.call(this) || this;
        _this.awatar = null;
        return _this;
    }
    ChildWuJiangUpJie.createInstance = function () {
        return (fairygui.UIPackage.createObject("wuJiang", "ChildWuJiangUpJie"));
    };
    ChildWuJiangUpJie.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.list.itemRenderer = self.renderHandle;
        self.list.callbackThisObj = self;
        self._equipArr = [self.equip0, self.equip1, self.equip2, self.equip3];
        self._voItemUp = VoItem.create(Model_WuJiang.DAN_LEVELUP);
        self.boxNeed.setImgUrl(self._voItemUp.icon);
        self._index = self.displayListContainer.getChildIndex(self.img.displayObject);
    };
    ChildWuJiangUpJie.prototype.addEvent = function () {
        var self = this;
        if (!self.awatar) {
            self.awatar = UIRole.create();
            self.awatar.setPos(self.img.x, self.img.y);
            // self.awatar.setScaleXY(1.5, 1.5);
            var horseId = Model_player.voMine.horseId;
            if (horseId) {
                self.awatar.setScaleXY(1, 1);
            }
            else {
                self.awatar.setScaleXY(1.5, 1.5);
            }
        }
        self.list.addEventListener(fairygui.ItemEvent.CLICK, self.itemHandler, self);
        self.btnUp.addClickListener(self.onClickUp, self);
        self.btnOnekey.addClickListener(self.onClickUp, self);
        self.btnEquip.addClickListener(self.onEquip, self);
        for (var i = 0; i < 4; i++) {
            self._equipArr[i].addClickListener(self.onEquipTips, self);
        }
    };
    ChildWuJiangUpJie.prototype.removeEvent = function () {
        var self = this;
        if (self.awatar) {
            self.awatar.onRemove();
            self.awatar = null;
        }
        self.list.removeEventListener(fairygui.ItemEvent.CLICK, self.itemHandler, self);
        self.btnUp.removeClickListener(self.onClickUp, self);
        self.btnOnekey.removeClickListener(self.onClickUp, self);
        self.btnEquip.removeClickListener(self.onEquip, self);
        for (var i = 0; i < 4; i++) {
            self._equipArr[i].removeClickListener(self.onEquipTips, self);
        }
        Timer.instance.remove(self.playSkill, self);
        self.secSkill = 0;
        self.list.numItems = 0;
    };
    ChildWuJiangUpJie.prototype.update = function () {
        var self = this;
        self._herolv = null;
        self._heroNext = null;
        if (Model_WuJiang.jieShu > 0) {
            self._herolv = Config.herolv_211[Model_WuJiang.jieShu];
            // self.labPower.text = "" + self._herolv.power
            self.labPower.text = "" + self.upPower();
            if (self._herolv.exp > 0) {
                self.expBar.value = Model_WuJiang.exp * 100 / self._herolv.exp;
                self.expBar._titleObject.text = Model_WuJiang.exp + "/" + self._herolv.exp;
            }
            else {
                self.expBar.value = 100;
                self.expBar._titleObject.text = "MAX";
            }
            self._heroNext = Config.herolv_211[Model_WuJiang.jieShu + 1];
        }
        else {
            self.expBar.value = 0;
            self.expBar._titleObject.text = "";
            self.labPower.text = "" + 0;
        }
        self.iconJie.setVal(Model_WuJiang.jieShu);
        self.boxNeed.setCount(Model_Bag.getItemCount(Model_WuJiang.DAN_LEVELUP) + "");
        self.btnOnekey.checkNotice = Model_WuJiang.checkOneKeyUp();
        var skillArr = Model_WuJiang.skillArr;
        self._skillArr = [];
        for (var i = 0; i < skillArr.length; i++) {
            self._skillArr.push([Model_BySys.WU_JIANG, skillArr[i]]);
        }
        self.list.numItems = self._skillArr.length;
        var vo = Config.hero_211[Model_player.voMine.job];
        var job = 0;
        var szInfo = Model_WuJiang.shiZhuanDic[vo.type];
        var godweapon = Model_ZSGodWeapon.getGodWeaponByJob(vo.type);
        if (szInfo && szInfo.onSkinId) {
            var mx = Config.sz_739[szInfo.onSkinId].moxing;
            self.awatar.setBody(mx);
            self.awatar.setWeapon(szInfo.onSkinId);
            job = szInfo.onSkinId / 1000 >> 0;
        }
        else {
            self.awatar.setBody(vo.type);
            self.awatar.setWeapon(vo.type);
            job = vo.type;
        }
        self.awatar.setGodWeapon(godweapon);
        var horseId = Model_player.voMine.horseId;
        self.awatar.setHorseId(horseId);
        self.awatar.uiparent = self.displayListContainer;
        self.awatar.onAdd();
        // self.displayListContainer.setChildIndex(self.awatar.view, self._index + 1)
        self.addChild(self.btnEquip);
        self.addChild(self.equip0);
        self.addChild(self.equip1);
        self.addChild(self.equip2);
        self.addChild(self.equip3);
        self.addChild(self.labPower);
        var count = Model_Bag.getItemCount(415001);
        if (self._herolv == null) {
            self.labAttrCur.text = "";
            self.labAttrNext.text = "";
            self.labAttrMax.text = "";
            self.zhiShengDan.data = { type: 1, count: count, lvl: 0, isFull: false };
            self.imgArrow.visible = false;
        }
        else if (self._heroNext == null) {
            self.labAttrCur.text = "";
            self.labAttrNext.text = "";
            self.labAttrMax.text = ConfigHelp.attrString(ConfigHelp.SplitStr(self._herolv.attr), "+", null, "#15f234");
            self.imgArrow.visible = false;
            self.zhiShengDan.data = { type: 1, count: count, lvl: self._herolv.id, isFull: true };
        }
        else {
            self.imgArrow.visible = true;
            self.labAttrCur.text = ConfigHelp.attrString(ConfigHelp.SplitStr(self._herolv.attr), "+");
            self.labAttrNext.text = ConfigHelp.attrString(ConfigHelp.SplitStr(self._heroNext.attr), "+", null, "#15f234");
            self.labAttrMax.text = "";
            self.zhiShengDan.data = { type: 1, count: count, lvl: self._herolv.id, isFull: false };
        }
        // 40 - 43
        var equiDa = Model_player.voMine.equipData;
        for (var i = 0; i < 4; i++) {
            self._equipArr[i].vo = equiDa[i + 40];
            self._equipArr[i].showNotice = Model_BySys.canWear(i + 40, Model_BySys.WU_JIANG);
            if (equiDa[i + 40] == null) {
                self._equipArr[i].setGrayBg(i + 40);
            }
        }
        self.btnEquip.visible = Model_WuJiang.wuJWearArr().length > 0;
        self.btnEquip.checkNotice = true;
        if (horseId == 0) {
            var secSkill = JSON.parse(Config.hero_211[job].skills)[1][0];
            if (self.secSkill != secSkill) {
                self.secSkill = secSkill;
                Timer.instance.remove(self.playSkill, self);
                self.playSkill();
            }
        }
        else {
            Timer.instance.remove(self.playSkill, self);
        }
    };
    ChildWuJiangUpJie.prototype.playSkill = function () {
        var self = this;
        self.awatar.playSkillID(self.secSkill, false);
        Timer.instance.callLater(self.playSkill, 5000, self);
    };
    ChildWuJiangUpJie.prototype.upPower = function () {
        var power = 0;
        //升阶战力
        var clotheslv = Config.herolv_211[Model_WuJiang.jieShu];
        power += clotheslv ? clotheslv.power : 0;
        //技能战力
        power += this.getPowerSkill();
        //装备战力
        var equiDa = Model_player.voMine.equipData;
        for (var i = 0; i < 4; i++) {
            var eq = equiDa[i + 40];
            if (eq) {
                power += eq.basePower;
            }
        }
        return power;
    };
    //战甲技能战力
    ChildWuJiangUpJie.prototype.getPowerSkill = function () {
        var power = 0;
        if (Model_WuJiang.skillArr) {
            for (var i = 0; i < Model_WuJiang.skillArr.length; i++) {
                var skillId = Model_WuJiang.skillArr[i];
                var skill = Config.herolvskill_211[skillId];
                power += skill ? skill.power : 0;
            }
        }
        return power;
    };
    ChildWuJiangUpJie.prototype.onClickUp = function (event) {
        var self = this;
        var target = event.currentTarget;
        var type = 1;
        if (target.id == self.btnUp.id) {
            type = 0;
        }
        var count = Model_Bag.getItemCount(Model_WuJiang.DAN_LEVELUP);
        if (count <= 0) {
            View_CaiLiao_GetPanel.show(self._voItemUp);
            return;
        }
        if (self._herolv == null) {
            return;
        }
        if (self._herolv.exp == 0) {
            ViewCommonWarn.text("已满阶");
            return;
        }
        VZhiShengDan.invalNum = 1;
        GGlobal.modelWuJiang.CGUpWuJie(type);
    };
    ChildWuJiangUpJie.prototype.onEquip = function () {
        var s = this;
        var sendArr = Model_WuJiang.wuJWearArr();
        var a = [];
        for (var i = 0; i < sendArr.length; i++) {
            a.push(sendArr[i].sid);
        }
        if (a.length > 0) {
            GGlobal.modelEquip.CGWearbypart(1, a);
        }
        else {
            ViewCommonWarn.text("无可穿戴的装备");
        }
    };
    ChildWuJiangUpJie.prototype.renderHandle = function (index, obj) {
        var item = obj;
        item.vo = this._skillArr[index];
    };
    ChildWuJiangUpJie.prototype.itemHandler = function (event) {
        var grid = event.itemObject;
        GGlobal.layerMgr.open(UIConst.BY_SYS_TIP_SKILL, grid.vo);
    };
    ChildWuJiangUpJie.prototype.guidePage = function (step) {
        var self = this;
        GuideStepManager.instance.showGuide(self.btnOnekey, self.btnOnekey.width / 2, self.btnOnekey.height / 2);
        GuideStepManager.instance.showGuide1(step.source.index, self.btnOnekey, self.btnOnekey.width / 2, 0, -90, -106, -100);
    };
    ChildWuJiangUpJie.prototype.onEquipTips = function (e) {
        var v = e.currentTarget;
        if (!v.vo) {
            var nitem = VoItem.create(410033);
            View_CaiLiao_GetPanel.show(nitem);
        }
    };
    ChildWuJiangUpJie.URL = "ui://zyx92gzwtht41";
    return ChildWuJiangUpJie;
}(fairygui.GComponent));
__reflect(ChildWuJiangUpJie.prototype, "ChildWuJiangUpJie");
