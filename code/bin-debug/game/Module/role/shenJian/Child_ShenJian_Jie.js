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
var Child_ShenJian_Jie = (function (_super) {
    __extends(Child_ShenJian_Jie, _super);
    function Child_ShenJian_Jie() {
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
    Child_ShenJian_Jie.createInstance = function () {
        return (fairygui.UIPackage.createObject("role", "Child_BaoWu_Jie"));
    };
    Child_ShenJian_Jie.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.list.itemRenderer = self.renderHandle;
        self.list.callbackThisObj = self;
        self._equipArr = [self.equip0, self.equip1, self.equip2, self.equip3];
        self._needItem = VoItem.create(Model_ShenJian.DAN_LEVELUP);
        self.labNeedName.text = self._needItem.name;
        self.boxNeed.setImgUrl(self._needItem.icon);
    };
    Child_ShenJian_Jie.prototype.onOpen = function () {
        var sf = this;
        var control = GGlobal.control;
        sf.eventFunction(1);
        control.listen(Enum_MsgType.BY_SYS_UP_JIE_SKILL, sf.upSys, sf);
        control.listen(Enum_MsgType.MSG_ROLE_EQUIP_UPDATE, sf.update, sf);
        sf.update();
    };
    Child_ShenJian_Jie.prototype.onClose = function () {
        var sf = this;
        var control = GGlobal.control;
        sf.eventFunction(0);
        control.remove(Enum_MsgType.BY_SYS_UP_JIE_SKILL, sf.upSys, sf);
        control.remove(Enum_MsgType.MSG_ROLE_EQUIP_UPDATE, sf.update, sf);
        sf.list.numItems = 0;
        IconUtil.setImg(sf.img, null);
        if (sf.bwEff) {
            EffectMgr.instance.removeEff(sf.bwEff);
            sf.bwEff = null;
        }
    };
    Child_ShenJian_Jie.prototype.upSys = function (sys) {
        var sf = this;
        if (sys == Model_BySys.SHEN_JIAN) {
            sf.update();
        }
    };
    Child_ShenJian_Jie.prototype.update = function () {
        var sf = this;
        sf._clotheslv = null;
        sf._clothesNext = null;
        var jieShu = Model_BySys.sysJie(Model_BySys.SHEN_JIAN);
        var exp = Model_BySys.sysExp(Model_BySys.SHEN_JIAN);
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
        sf.boxNeed.setCount(Model_Bag.getItemCount(Model_ShenJian.DAN_LEVELUP) + "");
        sf.btnOnekey.checkNotice = Model_ShenJian.checkOneKeyUp();
        var skillArr = Model_BySys.sysSkillArr(Model_BySys.SHEN_JIAN);
        sf._skillArr = [];
        for (var i = 0; i < skillArr.length; i++) {
            sf._skillArr.push([Model_BySys.SHEN_JIAN, skillArr[i]]);
        }
        sf.list.numItems = sf._skillArr.length;
        var showVo = Model_ShenJian.shenjianArr[0];
        var power = 0;
        for (var i = 0; i < Model_ShenJian.shenjianArr.length; i++) {
            var v = Model_ShenJian.shenjianArr[i];
            if (v.starLv == 0)
                continue;
            if (v.id == Model_ShenJian.shenJianId) {
                showVo = v;
                break;
            }
            var vPower = v.power;
            if (vPower > power) {
                power = vPower;
                showVo = v;
            }
        }
        IconUtil.setImg(sf.img, Enum_Path.PIC_URL + showVo.id + ".png");
        if (sf.bwEff) {
            EffectMgr.instance.removeEff(sf.bwEff);
            sf.bwEff = null;
        }
        if (showVo.cfg.tptx > 0) {
            if (!sf.bwEff) {
                sf.bwEff = EffectMgr.addEff("uieff/" + showVo.cfg.tptx, sf.img.displayObject, sf.img.width / 2, sf.img.height / 2, 1000, -1, true);
            }
        }
        sf.labPower.text = "" + sf.upPower();
        var cnt = Model_Bag.getItemCount(415005);
        if (sf._clotheslv == null) {
            sf.labAttrCur.text = "";
            sf.labAttrNext.text = "";
            sf.labAttrMax.text = "";
            sf.imgArrow.visible = false;
            sf.zhiShengDan.data = { type: 5, count: cnt, lvl: 0, isFull: false };
        }
        else if (sf._clothesNext == null) {
            sf.labAttrCur.text = "";
            sf.labAttrNext.text = "";
            sf.labAttrMax.text = ConfigHelp.attrString(ConfigHelp.SplitStr(sf._clotheslv.attr), "+", null, "#15f234");
            sf.imgArrow.visible = false;
            sf.zhiShengDan.data = { type: 5, count: cnt, lvl: sf._clotheslv.id, isFull: true };
        }
        else {
            sf.imgArrow.visible = true;
            sf.labAttrCur.text = ConfigHelp.attrString(ConfigHelp.SplitStr(sf._clotheslv.attr), "+");
            sf.labAttrNext.text = ConfigHelp.attrString(ConfigHelp.SplitStr(sf._clothesNext.attr), "+", null, "#15f234");
            sf.labAttrMax.text = "";
            sf.zhiShengDan.data = { type: 5, count: cnt, lvl: sf._clotheslv.id, isFull: false };
        }
        // 60 - 63
        var equiDa = Model_player.voMine.equipData;
        for (var i = 0; i < 4; i++) {
            sf._equipArr[i].vo = equiDa[i + 60];
            sf._equipArr[i].showNotice = Model_BySys.canWear(i + 60, Model_BySys.SHEN_JIAN);
            if (equiDa[i + 60] == null) {
                sf._equipArr[i].setGrayBg(i + 60);
            }
        }
        sf.btnEquip.visible = Model_ShenJian.shenJianWearArr().length > 0;
        sf.btnEquip.checkNotice = true;
    };
    Child_ShenJian_Jie.prototype.upPower = function () {
        var sf = this;
        var power = 0;
        //升阶战力
        var jieShu = Model_BySys.sysJie(Model_BySys.SHEN_JIAN);
        var clotheslv = Config.swordlv_216[jieShu];
        power += clotheslv ? clotheslv.power : 0;
        //技能战力
        power += sf.getPowerSkill();
        //装备战力
        var equiDa = Model_player.voMine.equipData;
        for (var i = 0; i < 4; i++) {
            var eq = equiDa[i + 60];
            if (eq) {
                power += eq.basePower;
            }
        }
        return power;
    };
    //技能战力
    Child_ShenJian_Jie.prototype.getPowerSkill = function () {
        var power = 0;
        var skillArr = Model_BySys.sysSkillArr(Model_BySys.SHEN_JIAN);
        if (skillArr) {
            for (var i = 0; i < skillArr.length; i++) {
                var skillId = skillArr[i];
                var skill = Config.swordlvskill_216[skillId];
                power += skill ? skill.power : 0;
            }
        }
        return power;
    };
    Child_ShenJian_Jie.prototype.onClickUp = function (event) {
        var sf = this;
        var target = event.currentTarget;
        var type = 1;
        if (target.id == sf.btnUp.id) {
            type = 0;
        }
        var count = Model_Bag.getItemCount(Model_ShenJian.DAN_LEVELUP);
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
        GGlobal.modelBySys.CGUpjiebysys(Model_BySys.SHEN_JIAN, type);
    };
    Child_ShenJian_Jie.prototype.renderHandle = function (index, obj) {
        var sf = this;
        var item = obj;
        item.vo = sf._skillArr[index];
    };
    Child_ShenJian_Jie.prototype.itemHandler = function (event) {
        var grid = event.itemObject;
        GGlobal.layerMgr.open(UIConst.BY_SYS_TIP_SKILL, grid.vo);
    };
    Child_ShenJian_Jie.prototype.onEquip = function () {
        var sendArr = Model_ShenJian.shenJianWearArr();
        var a = [];
        for (var i = 0; i < sendArr.length; i++) {
            a.push(sendArr[i].sid);
        }
        if (a.length > 0) {
            GGlobal.modelEquip.CGWearbypart(3, a);
        }
        else {
            ViewCommonWarn.text("无可穿戴的装备");
        }
    };
    Child_ShenJian_Jie.prototype.onEquipTips = function (e) {
        var v = e.currentTarget;
        if (!v.vo) {
            var nitem = VoItem.create(410035);
            View_CaiLiao_GetPanel.show(nitem);
        }
    };
    Child_ShenJian_Jie.URL = "ui://3tzqotadjx2x35";
    return Child_ShenJian_Jie;
}(fairygui.GComponent));
__reflect(Child_ShenJian_Jie.prototype, "Child_ShenJian_Jie");
