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
var ChildZhanJiaUpJie = (function (_super) {
    __extends(ChildZhanJiaUpJie, _super);
    function ChildZhanJiaUpJie() {
        var _this = _super.call(this) || this;
        _this.eventFunction = function (t) {
            var self = _this;
            var event = EventUtil.register;
            event(t, self.list, fairygui.ItemEvent.CLICK, self.itemHandler, self);
            event(t, self.btnUp, EventUtil.TOUCH, self.onClickUp, self);
            event(t, self.btnOnekey, EventUtil.TOUCH, self.onClickUp, self);
            event(t, self.btnEquip, EventUtil.TOUCH, self.onEquip, self);
            for (var i = 0; i < 4; i++) {
                event(t, self._equipArr[i], EventUtil.TOUCH, self.onEquipTips, self);
            }
        };
        return _this;
    }
    ChildZhanJiaUpJie.createInstance = function () {
        return (fairygui.UIPackage.createObject("role", "Child_BaoWu_Jie"));
    };
    ChildZhanJiaUpJie.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.list.itemRenderer = self.renderHandle;
        self.list.callbackThisObj = self;
        self._equipArr = [self.equip0, self.equip1, self.equip2, self.equip3];
        self._needItem = VoItem.create(Model_ZhanJia.DAN_LEVELUP);
        self.labNeedName.text = self._needItem.name;
        self.boxNeed.setImgUrl(self._needItem.icon);
    };
    ChildZhanJiaUpJie.prototype.addEvent = function () {
        var self = this;
        self.eventFunction(1);
    };
    ChildZhanJiaUpJie.prototype.removeEvent = function () {
        var self = this;
        self.eventFunction(0);
        IconUtil.setImg(self.img, null);
        self.list.numItems = 0;
        if (self.bwEff) {
            EffectMgr.instance.removeEff(self.bwEff);
            self.bwEff = null;
        }
    };
    ChildZhanJiaUpJie.prototype.update = function () {
        var self = this;
        self._clotheslv = null;
        self._clothesNext = null;
        if (Model_ZhanJia.jieShu > 0) {
            self._clotheslv = Config.clotheslv_212[Model_ZhanJia.jieShu];
            if (self._clotheslv.exp > 0) {
                // self.labJie.text = self._clotheslv.jie;
                self.expBar.value = Model_ZhanJia.exp * 100 / self._clotheslv.exp;
                self.expBar._titleObject.text = Model_ZhanJia.exp + "/" + self._clotheslv.exp;
            }
            else {
                // self.labJie.text = self._clotheslv.jie;
                self.expBar.value = 100;
                self.expBar._titleObject.text = "MAX";
            }
            self._clothesNext = Config.clotheslv_212[Model_ZhanJia.jieShu + 1];
        }
        else {
            // self.labJie.text = ""
            self.expBar.value = 0;
            self.expBar._titleObject.text = "";
        }
        self.iconJie.setVal(Model_ZhanJia.jieShu);
        self.boxNeed.setCount(Model_Bag.getItemCount(Model_ZhanJia.DAN_LEVELUP) + "");
        self.btnOnekey.checkNotice = Model_ZhanJia.checkOneKeyUp();
        var skillArr = Model_ZhanJia.skillArr;
        self._skillArr = [];
        for (var i = 0; i < skillArr.length; i++) {
            self._skillArr.push([Model_BySys.ZHAN_JIA, skillArr[i]]);
        }
        self.list.numItems = self._skillArr.length;
        var showVo = Model_ZhanJia.zhanJiaArr[0];
        var power = 0;
        for (var i = 0; i < Model_ZhanJia.zhanJiaArr.length; i++) {
            var v = Model_ZhanJia.zhanJiaArr[i];
            var vPower = Model_ZhanJia.getPowerStarVo(v);
            if (vPower > power) {
                power = vPower;
                showVo = v;
            }
        }
        IconUtil.setImg(self.img, Enum_Path.ZHANJIA_URL + showVo.pic + ".png");
        if (self.bwEff) {
            EffectMgr.instance.removeEff(self.bwEff);
            self.bwEff = null;
        }
        if (showVo.tptx > 0) {
            if (!self.bwEff) {
                self.bwEff = EffectMgr.addEff("uieff/" + showVo.tptx, self.img.displayObject, self.img.width / 2, self.img.height / 2, 1000, -1, true);
            }
        }
        //升阶战力
        var clotheslv = Config.clotheslv_212[Model_ZhanJia.jieShu];
        // self.labPower.text = "" + (clotheslv ? clotheslv.power : 0);
        self.labPower.text = "" + self.upPower();
        var count = Model_Bag.getItemCount(415002);
        if (self._clotheslv == null) {
            self.labAttrCur.text = "";
            self.labAttrNext.text = "";
            self.labAttrMax.text = "";
            self.imgArrow.visible = false;
            self.zhiShengDan.data = { type: 2, count: count, lvl: 0, isFull: false };
        }
        else if (self._clothesNext == null) {
            self.labAttrCur.text = "";
            self.labAttrNext.text = "";
            self.labAttrMax.text = ConfigHelp.attrString(ConfigHelp.SplitStr(self._clotheslv.attr), "+", null, "#15f234");
            self.imgArrow.visible = false;
            self.zhiShengDan.data = { type: 2, count: count, lvl: self._clotheslv.lv, isFull: true };
        }
        else {
            self.imgArrow.visible = true;
            self.labAttrCur.text = ConfigHelp.attrString(ConfigHelp.SplitStr(self._clotheslv.attr), "+");
            self.labAttrNext.text = ConfigHelp.attrString(ConfigHelp.SplitStr(self._clothesNext.attr), "+", null, "#15f234");
            self.labAttrMax.text = "";
            self.zhiShengDan.data = { type: 2, count: count, lvl: self._clotheslv.lv, isFull: false };
        }
        // 50 - 53
        var equiDa = Model_player.voMine.equipData;
        for (var i = 0; i < 4; i++) {
            self._equipArr[i].vo = equiDa[i + 50];
            self._equipArr[i].showNotice = Model_BySys.canWear(i + 50, Model_BySys.ZHAN_JIA);
            if (equiDa[i + 50] == null) {
                self._equipArr[i].setGrayBg(i + 50);
            }
        }
        self.btnEquip.visible = Model_ZhanJia.zhanJWearArr().length > 0;
        self.btnEquip.checkNotice = true;
    };
    ChildZhanJiaUpJie.prototype.upPower = function () {
        var power = 0;
        //属性丹战力
        // var drug = Config.drug_200[Model_ZhanJia.DRUG_SHUXING];
        // power += drug.power * Model_ZhanJia.danShuxing
        //资质丹战力
        // drug = Config.drug_200[Model_ZhanJia.DRUG_ZIZHI];
        // power += drug.power * Model_ZhanJia.danZizhi
        //升阶战力
        var clotheslv = Config.clotheslv_212[Model_ZhanJia.jieShu];
        power += clotheslv ? clotheslv.power : 0;
        //战甲技能战力
        power += this.getPowerSkill();
        //战甲装备
        var equiDa = Model_player.voMine.equipData;
        for (var i = 0; i < 4; i++) {
            var eq = equiDa[i + 50];
            if (eq) {
                power += eq.basePower;
            }
        }
        //升星、套装
        // power += Model_ZhanJia.getPowerStar() + Model_ZhanJia.getPowerSuit()
        return power;
    };
    //战甲技能战力
    ChildZhanJiaUpJie.prototype.getPowerSkill = function () {
        var power = 0;
        if (Model_ZhanJia.skillArr) {
            for (var i = 0; i < Model_ZhanJia.skillArr.length; i++) {
                var skillId = Model_ZhanJia.skillArr[i];
                var skill = Config.clotheslvskill_212[skillId];
                power += skill ? skill.power : 0;
            }
        }
        return power;
    };
    ChildZhanJiaUpJie.prototype.onClickUp = function (event) {
        var target = event.currentTarget;
        var type = 1;
        if (target.id == this.btnUp.id) {
            type = 0;
        }
        var count = Model_Bag.getItemCount(Model_ZhanJia.DAN_LEVELUP);
        if (count <= 0) {
            View_CaiLiao_GetPanel.show(this._needItem);
            return;
        }
        if (this._clotheslv == null) {
            return;
        }
        if (this._clotheslv.exp == 0) {
            ViewCommonWarn.text("已满阶");
            return;
        }
        VZhiShengDan.invalNum = 1;
        GGlobal.modelZhanJia.CGUpJie(type);
    };
    ChildZhanJiaUpJie.prototype.renderHandle = function (index, obj) {
        var item = obj;
        item.vo = this._skillArr[index];
    };
    ChildZhanJiaUpJie.prototype.itemHandler = function (event) {
        var grid = event.itemObject;
        GGlobal.layerMgr.open(UIConst.BY_SYS_TIP_SKILL, grid.vo);
    };
    ChildZhanJiaUpJie.prototype.guide_keyZhanJiaUpLevel = function () {
        GuideStepManager.instance.showGuide(this.btnOnekey, this.btnOnekey.width / 2, this.btnOnekey.height / 2);
    };
    ChildZhanJiaUpJie.prototype.onEquip = function () {
        var s = this;
        var sendArr = Model_ZhanJia.zhanJWearArr();
        var a = [];
        for (var i = 0; i < sendArr.length; i++) {
            a.push(sendArr[i].sid);
        }
        if (a.length > 0) {
            GGlobal.modelEquip.CGWearbypart(2, a);
        }
        else {
            ViewCommonWarn.text("无可穿戴的装备");
        }
    };
    ChildZhanJiaUpJie.prototype.onEquipTips = function (e) {
        var v = e.currentTarget;
        if (!v.vo) {
            var nitem = VoItem.create(410034);
            View_CaiLiao_GetPanel.show(nitem);
        }
    };
    ChildZhanJiaUpJie.URL = "ui://3tzqotadjx2x35";
    return ChildZhanJiaUpJie;
}(fairygui.GComponent));
__reflect(ChildZhanJiaUpJie.prototype, "ChildZhanJiaUpJie");
