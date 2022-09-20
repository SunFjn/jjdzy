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
var Child_YB_Jie = (function (_super) {
    __extends(Child_YB_Jie, _super);
    function Child_YB_Jie() {
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
    Child_YB_Jie.createInstance = function () {
        return (fairygui.UIPackage.createObject("role", "Child_BaoWu_Jie"));
    };
    Child_YB_Jie.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var sf = this;
        sf.t0 = sf.getTransition("t0");
        CommonManager.parseChildren(sf, sf);
        sf.list.itemRenderer = sf.renderHandle;
        sf.list.callbackThisObj = sf;
        sf._equipArr = [sf.equip0, sf.equip1, sf.equip2, sf.equip3];
        sf._needItem = VoItem.create(Model_YiBao.DAN_LEVELUP);
        sf.labNeedName.text = sf._needItem.name;
        sf.boxNeed.setImgUrl(sf._needItem.icon);
    };
    Child_YB_Jie.prototype.onOpen = function () {
        var sf = this;
        sf.eventFunction(1);
        var control = GGlobal.control;
        control.listen(Enum_MsgType.BY_SYS_UP_JIE_SKILL, sf.upSys, sf);
        control.listen(Enum_MsgType.MSG_ROLE_EQUIP_UPDATE, sf.update, sf);
        sf.update();
    };
    Child_YB_Jie.prototype.onClose = function () {
        var sf = this;
        sf.eventFunction(0);
        var control = GGlobal.control;
        control.remove(Enum_MsgType.BY_SYS_UP_JIE_SKILL, sf.upSys, sf);
        control.remove(Enum_MsgType.MSG_ROLE_EQUIP_UPDATE, sf.update, sf);
        IconUtil.setImg(sf.img, null);
        sf.list.numItems = 0;
        if (sf.bwEff) {
            EffectMgr.instance.removeEff(sf.bwEff);
            sf.bwEff = null;
        }
    };
    Child_YB_Jie.prototype.upSys = function (sys) {
        var sf = this;
        if (sys == Model_BySys.YI_BAO) {
            sf.update();
        }
    };
    Child_YB_Jie.prototype.update = function () {
        var sf = this;
        sf._clotheslv = null;
        sf._clothesNext = null;
        var jieShu = Model_BySys.sysJie(Model_BySys.YI_BAO);
        var exp = Model_BySys.sysExp(Model_BySys.YI_BAO);
        if (jieShu > 0) {
            sf._clotheslv = Config.yblv_217[jieShu];
            if (sf._clotheslv.exp > 0) {
                // sf.labJie.text = sf._clotheslv.jie;
                sf.expBar.value = exp * 100 / sf._clotheslv.exp;
                sf.expBar._titleObject.text = exp + "/" + sf._clotheslv.exp;
            }
            else {
                // sf.labJie.text = sf._clotheslv.jie;
                sf.expBar.value = 100;
                sf.expBar._titleObject.text = "MAX";
            }
            sf._clothesNext = Config.yblv_217[jieShu + 1];
        }
        else {
            // sf.labJie.text = ""
            sf.expBar.value = 0;
            sf.expBar._titleObject.text = "";
        }
        sf.iconJie.setVal(jieShu);
        sf.boxNeed.setCount(Model_Bag.getItemCount(Model_YiBao.DAN_LEVELUP) + "");
        sf.btnOnekey.checkNotice = Model_YiBao.checkOneKeyUp();
        var skillArr = Model_BySys.sysSkillArr(Model_BySys.YI_BAO);
        sf._skillArr = [];
        for (var i = 0; i < skillArr.length; i++) {
            sf._skillArr.push([Model_BySys.YI_BAO, skillArr[i]]);
        }
        sf.list.numItems = sf._skillArr.length;
        var showVo = Model_YiBao.YBArr[0];
        var power = 0;
        for (var i = 0; i < Model_YiBao.YBArr.length; i++) {
            var v = Model_YiBao.YBArr[i];
            if (v.starLv == 0)
                continue;
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
        //升阶战力
        // var clotheslv = Config.yblv_217[jieShu]
        // sf.labPower.text = "" + (clotheslv ? clotheslv.power : 0);
        sf.labPower.text = "" + sf.upPower();
        var cnt = Model_Bag.getItemCount(415007);
        if (sf._clotheslv == null) {
            sf.labAttrCur.text = "";
            sf.labAttrNext.text = "";
            sf.labAttrMax.text = "";
            sf.imgArrow.visible = false;
            sf.zhiShengDan.data = { type: 7, count: cnt, lvl: 0, isFull: false };
        }
        else if (sf._clothesNext == null) {
            sf.labAttrCur.text = "";
            sf.labAttrNext.text = "";
            sf.labAttrMax.text = ConfigHelp.attrString(ConfigHelp.SplitStr(sf._clotheslv.attr), "+", null, "#15f234");
            sf.imgArrow.visible = false;
            sf.zhiShengDan.data = { type: 7, count: cnt, lvl: sf._clotheslv.id, isFull: true };
        }
        else {
            sf.imgArrow.visible = true;
            sf.labAttrCur.text = ConfigHelp.attrString(ConfigHelp.SplitStr(sf._clotheslv.attr), "+");
            sf.labAttrNext.text = ConfigHelp.attrString(ConfigHelp.SplitStr(sf._clothesNext.attr), "+", null, "#15f234");
            sf.labAttrMax.text = "";
            sf.zhiShengDan.data = { type: 7, count: cnt, lvl: sf._clotheslv.id, isFull: false };
        }
        // 70 - 73
        var equiDa = Model_player.voMine.equipData;
        for (var i = 0; i < 4; i++) {
            sf._equipArr[i].vo = equiDa[i + 70];
            sf._equipArr[i].showNotice = Model_BySys.canWear(i + 70, Model_BySys.YI_BAO);
            if (equiDa[i + 70] == null) {
                sf._equipArr[i].setGrayBg(i + 70);
            }
        }
        sf.btnEquip.visible = Model_YiBao.yiBaoWearArr().length > 0;
        sf.btnEquip.checkNotice = true;
    };
    Child_YB_Jie.prototype.upPower = function () {
        var sf = this;
        var power = 0;
        //升阶战力
        var jieShu = Model_BySys.sysJie(Model_BySys.YI_BAO);
        var clotheslv = Config.yblv_217[jieShu];
        power += clotheslv ? clotheslv.power : 0;
        //技能战力
        power += sf.getPowerSkill();
        //装备战力
        var equiDa = Model_player.voMine.equipData;
        for (var i = 0; i < 4; i++) {
            var eq = equiDa[i + 70];
            if (eq) {
                power += eq.basePower;
            }
        }
        return power;
    };
    //技能战力
    Child_YB_Jie.prototype.getPowerSkill = function () {
        var power = 0;
        var skillArr = Model_BySys.sysSkillArr(Model_BySys.YI_BAO);
        if (skillArr) {
            for (var i = 0; i < skillArr.length; i++) {
                var skillId = skillArr[i];
                var skill = Config.yblvskill_217[skillId];
                power += skill ? skill.power : 0;
            }
        }
        return power;
    };
    Child_YB_Jie.prototype.onClickUp = function (event) {
        var sf = this;
        var target = event.currentTarget;
        var type = 1;
        if (target.id == sf.btnUp.id) {
            type = 0;
        }
        var count = Model_Bag.getItemCount(Model_YiBao.DAN_LEVELUP);
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
        GGlobal.modelBySys.CGUpjiebysys(Model_BySys.YI_BAO, type);
    };
    Child_YB_Jie.prototype.renderHandle = function (index, obj) {
        var sf = this;
        var item = obj;
        item.vo = sf._skillArr[index];
    };
    Child_YB_Jie.prototype.itemHandler = function (event) {
        var grid = event.itemObject;
        GGlobal.layerMgr.open(UIConst.BY_SYS_TIP_SKILL, grid.vo);
    };
    Child_YB_Jie.prototype.onEquip = function () {
        var s = this;
        var sendArr = Model_YiBao.yiBaoWearArr();
        var a = [];
        for (var i = 0; i < sendArr.length; i++) {
            a.push(sendArr[i].sid);
        }
        if (a.length > 0) {
            GGlobal.modelEquip.CGWearbypart(4, a);
        }
        else {
            ViewCommonWarn.text("无可穿戴的装备");
        }
    };
    Child_YB_Jie.prototype.onEquipTips = function (e) {
        var v = e.currentTarget;
        if (!v.vo) {
            var nitem = VoItem.create(410036);
            View_CaiLiao_GetPanel.show(nitem);
        }
    };
    Child_YB_Jie.URL = "ui://3tzqotadjx2x35";
    return Child_YB_Jie;
}(fairygui.GComponent));
__reflect(Child_YB_Jie.prototype, "Child_YB_Jie");
