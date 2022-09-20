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
var Child_BaoWu_Jie = (function (_super) {
    __extends(Child_BaoWu_Jie, _super);
    function Child_BaoWu_Jie() {
        var _this = _super.call(this) || this;
        _this.eventFunction = function (t) {
            var self = _this;
            var event = EventUtil.register;
            event(t, self.btnUp, EventUtil.TOUCH, self.onClickUp, self);
            event(t, self.btnOnekey, EventUtil.TOUCH, self.onClickUp, self);
            event(t, self.btnEquip, EventUtil.TOUCH, self.onEquip, self);
            event(t, self.list, fairygui.ItemEvent.CLICK, self.itemHandler, self);
            for (var i = 0; i < 4; i++) {
                event(t, self._equipArr[i], EventUtil.TOUCH, self.onEquipTips, self);
            }
        };
        return _this;
    }
    Child_BaoWu_Jie.createInstance = function () {
        return (fairygui.UIPackage.createObject("role", "Child_BaoWu_Jie"));
    };
    Child_BaoWu_Jie.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.t0 = self.getTransition("t0");
        self.list.itemRenderer = self.renderHandle;
        self.list.callbackThisObj = self;
        self._equipArr = [self.equip0, self.equip1, self.equip2, self.equip3];
        self._needItem = VoItem.create(Model_BaoWu.DAN_LEVELUP);
        self.labNeedName.text = self._needItem.name;
        self.boxNeed.setImgUrl(self._needItem.icon);
    };
    Child_BaoWu_Jie.prototype.open = function () {
        var sf = this;
        sf.eventFunction(1);
        var control = GGlobal.control;
        control.listen(Enum_MsgType.BY_SYS_UP_JIE_SKILL, sf.upSys, sf);
        control.listen(Enum_MsgType.MSG_ROLE_EQUIP_UPDATE, sf.update, sf);
        control.listen(Enum_MsgType.BAOWU_DATA_UPDATE, sf.update, sf);
        sf.update();
    };
    Child_BaoWu_Jie.prototype.close = function () {
        var sf = this;
        var control = GGlobal.control;
        sf.eventFunction(0);
        control.remove(Enum_MsgType.BY_SYS_UP_JIE_SKILL, sf.upSys, sf);
        control.remove(Enum_MsgType.MSG_ROLE_EQUIP_UPDATE, sf.update, sf);
        control.remove(Enum_MsgType.BAOWU_DATA_UPDATE, sf.update, sf);
        IconUtil.setImg(sf.img, null);
        sf.list.numItems = 0;
    };
    Child_BaoWu_Jie.prototype.upSys = function (sys) {
        var sf = this;
        if (sys == Model_BySys.BAO_WU) {
            sf.update();
        }
    };
    Child_BaoWu_Jie.prototype.update = function () {
        var sf = this;
        sf._clotheslv = null;
        sf._clothesNext = null;
        var jieShu = Model_BaoWu.level;
        var exp = Model_BaoWu.exp;
        if (jieShu > 0) {
            sf._clotheslv = Config.swordlv_216[jieShu];
            if (sf._clotheslv.exp > 0) {
                sf.expBar.value = exp * 100 / sf._clotheslv.exp;
                sf.expBar._titleObject.text = exp + "/" + sf._clotheslv.exp;
            }
            else {
                sf.expBar.value = 100;
                sf.expBar._titleObject.text = "MAX";
            }
            sf._clothesNext = Config.swordlv_216[jieShu + 1];
        }
        else {
            sf.expBar.value = 0;
            sf.expBar._titleObject.text = "";
        }
        sf.iconJie.setVal(jieShu);
        sf.boxNeed.setCount(Model_Bag.getItemCount(Model_BaoWu.DAN_LEVELUP) + "");
        sf.btnOnekey.checkNotice = Model_BaoWu.checkOneKeyUp();
        var skillArr = Model_BySys.sysSkillArr(Model_BySys.BAO_WU);
        sf._skillArr = [];
        for (var i = 0; i < skillArr.length; i++) {
            sf._skillArr.push([Model_BySys.BAO_WU, skillArr[i]]);
        }
        sf.list.numItems = sf._skillArr.length;
        var showVo = Model_BaoWu.baowuArr[0];
        var power = 0;
        for (var i = 0; i < Model_BaoWu.baowuArr.length; i++) {
            var v = Model_BaoWu.baowuArr[i];
            if (v.starLv == 0)
                continue;
            if (v.state == 0) {
                showVo = v;
                break;
            }
            var vPower = v.power;
            if (vPower > power) {
                power = vPower;
                showVo = v;
            }
        }
        IconUtil.setImg(sf.img, Enum_Path.PIC_URL + showVo.imageID + ".png");
        //升阶战力
        var clotheslv = Config.swordlv_216[jieShu];
        sf.labPower.text = "" + sf.upPower();
        var cnt = Model_Bag.getItemCount(415003);
        if (sf._clotheslv == null) {
            sf.labAttrCur.text = "";
            sf.labAttrNext.text = "";
            sf.labAttrMax.text = "";
            sf.imgArrow.visible = false;
            sf.zhiShengDan.data = { type: 3, count: cnt, lvl: 0, isFull: false };
        }
        else if (sf._clothesNext == null) {
            sf.labAttrCur.text = "";
            sf.labAttrNext.text = "";
            sf.labAttrMax.text = ConfigHelp.attrString(ConfigHelp.SplitStr(sf._clotheslv.attr), "+", null, "#15f234");
            sf.imgArrow.visible = false;
            sf.zhiShengDan.data = { type: 3, count: cnt, lvl: sf._clotheslv.id, isFull: true };
        }
        else {
            sf.imgArrow.visible = true;
            sf.labAttrCur.text = ConfigHelp.attrString(ConfigHelp.SplitStr(sf._clotheslv.attr), "+");
            sf.labAttrNext.text = ConfigHelp.attrString(ConfigHelp.SplitStr(sf._clothesNext.attr), "+", null, "#15f234");
            sf.labAttrMax.text = "";
            sf.zhiShengDan.data = { type: 3, count: cnt, lvl: sf._clotheslv.id, isFull: false };
        }
        // 90 - 93
        var equiDa = Model_player.voMine.equipData;
        for (var i = 0; i < 4; i++) {
            sf._equipArr[i].vo = equiDa[i + 90];
            sf._equipArr[i].showNotice = Model_BySys.canWear(i + 90, Model_BySys.BAO_WU);
            if (equiDa[i + 90] == null) {
                sf._equipArr[i].setGrayBg(i + 90);
            }
        }
        sf.btnEquip.visible = Model_BaoWu.baoWuWearArr().length > 0;
        sf.btnEquip.checkNotice = true;
    };
    Child_BaoWu_Jie.prototype.upPower = function () {
        var sf = this;
        var power = 0;
        //升阶战力
        var jieShu = Model_BaoWu.level;
        var clotheslv = Config.swordlv_216[jieShu];
        power += clotheslv ? clotheslv.power : 0;
        //技能战力
        power += sf.getPowerSkill();
        //装备战力
        var equiDa = Model_player.voMine.equipData;
        for (var i = 0; i < 4; i++) {
            var eq = equiDa[i + 90];
            if (eq) {
                power += eq.basePower;
            }
        }
        return power;
    };
    //技能战力
    Child_BaoWu_Jie.prototype.getPowerSkill = function () {
        var power = 0;
        var skillArr = Model_BySys.sysSkillArr(Model_BySys.BAO_WU);
        if (skillArr) {
            for (var i = 0; i < skillArr.length; i++) {
                var skillId = skillArr[i];
                var skill = Config.baolvskill_214[skillId];
                power += skill ? skill.power : 0;
            }
        }
        return power;
    };
    Child_BaoWu_Jie.prototype.onClickUp = function (event) {
        var sf = this;
        var target = event.currentTarget;
        var type = 1;
        if (target.id == sf.btnUp.id) {
            type = 0;
        }
        var count = Model_Bag.getItemCount(Model_BaoWu.DAN_LEVELUP);
        if (count <= 0) {
            View_CaiLiao_GetPanel.show(sf._needItem);
            return;
        }
        if (sf._clotheslv == null) {
            return;
        }
        if (sf._clotheslv.exp == 0) {
            ViewCommonWarn.text("已满阶");
            return;
        }
        VZhiShengDan.invalNum = 1;
        if (type == 0) {
            GGlobal.modelbw.CG_BAOWU_UPGRADE();
        }
        else {
            GGlobal.modelbw.CG_BAOWU_KEYUPGRADE();
        }
    };
    Child_BaoWu_Jie.prototype.renderHandle = function (index, obj) {
        var sf = this;
        var item = obj;
        item.vo = sf._skillArr[index];
    };
    Child_BaoWu_Jie.prototype.itemHandler = function (event) {
        var grid = event.itemObject;
        GGlobal.layerMgr.open(UIConst.BY_SYS_TIP_SKILL, grid.vo);
    };
    Child_BaoWu_Jie.prototype.onEquip = function () {
        var s = this;
        var sendArr = Model_BaoWu.baoWuWearArr();
        var a = [];
        for (var i = 0; i < sendArr.length; i++) {
            a.push(sendArr[i].sid);
        }
        if (a.length > 0) {
            GGlobal.modelEquip.CGWearbypart(6, a);
        }
        else {
            ViewCommonWarn.text("无可穿戴的装备");
        }
    };
    Child_BaoWu_Jie.prototype.onEquipTips = function (e) {
        var v = e.currentTarget;
        if (!v.vo) {
            var nitem = VoItem.create(410038);
            View_CaiLiao_GetPanel.show(nitem);
        }
    };
    Child_BaoWu_Jie.prototype.guide_baowu_upLv = function (step) {
        var self = this;
        GuideStepManager.instance.showGuide(self.btnOnekey, self.btnOnekey.width / 2, self.btnOnekey.height / 2);
        GuideStepManager.instance.showGuide1(step.source.index, self.btnOnekey, self.btnOnekey.width / 2, 0, -90, -106, -100);
        if (self.btnOnekey.parent)
            self.btnOnekey.parent.setChildIndex(self.btnOnekey, self.btnOnekey.parent.numChildren - 1);
    };
    Child_BaoWu_Jie.URL = "ui://3tzqotadjx2x35";
    return Child_BaoWu_Jie;
}(fairygui.GComponent));
__reflect(Child_BaoWu_Jie.prototype, "Child_BaoWu_Jie");
