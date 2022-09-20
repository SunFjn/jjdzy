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
var Child_TianShu_Jie = (function (_super) {
    __extends(Child_TianShu_Jie, _super);
    function Child_TianShu_Jie() {
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
    Child_TianShu_Jie.createInstance = function () {
        return (fairygui.UIPackage.createObject("role", "Child_BaoWu_Jie"));
    };
    Child_TianShu_Jie.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var sf = this;
        CommonManager.parseChildren(sf, sf);
        sf.t0 = sf.getTransition("t0");
        sf.list.itemRenderer = sf.renderHandle;
        sf.list.callbackThisObj = sf;
        sf._equipArr = [sf.equip0, sf.equip1, sf.equip2, sf.equip3];
        sf._needItem = VoItem.create(Model_TianShu.DAN_LEVELUP);
        sf.labNeedName.text = sf._needItem.name;
        sf.boxNeed.setImgUrl(sf._needItem.icon);
    };
    Child_TianShu_Jie.prototype.open = function () {
        var sf = this;
        var control = GGlobal.control;
        sf.eventFunction(1);
        control.listen(Enum_MsgType.BY_SYS_UP_JIE_SKILL, sf.upSys, sf);
        control.listen(Enum_MsgType.MSG_ROLE_EQUIP_UPDATE, sf.update, sf);
        control.listen(Enum_MsgType.MSG_TS_LEVELUP, sf.update, sf);
        control.listen(Enum_MsgType.MSG_TS_UPDATE, sf.update, sf);
        sf.update();
    };
    Child_TianShu_Jie.prototype.close = function () {
        var sf = this;
        var control = GGlobal.control;
        sf.eventFunction(0);
        control.remove(Enum_MsgType.BY_SYS_UP_JIE_SKILL, sf.upSys, sf);
        control.remove(Enum_MsgType.MSG_ROLE_EQUIP_UPDATE, sf.update, sf);
        control.remove(Enum_MsgType.MSG_TS_LEVELUP, sf.update, sf);
        control.remove(Enum_MsgType.MSG_TS_UPDATE, sf.update, sf);
        IconUtil.setImg(sf.img, null);
        sf.list.numItems = 0;
    };
    Child_TianShu_Jie.prototype.upSys = function (sys) {
        var sf = this;
        if (sys == Model_BySys.TIAN_SHU) {
            sf.update();
        }
    };
    Child_TianShu_Jie.prototype.update = function () {
        var sf = this;
        sf._clotheslv = null;
        sf._clothesNext = null;
        var jieShu = GGlobal.modeltianshu.level;
        var exp = GGlobal.modeltianshu.exp;
        if (jieShu > 0) {
            sf._clotheslv = Config.booklv_215[jieShu];
            if (sf._clotheslv.exp > 0) {
                sf.expBar.value = exp * 100 / sf._clotheslv.exp;
                sf.expBar._titleObject.text = exp + "/" + sf._clotheslv.exp;
            }
            else {
                sf.expBar.value = 100;
                sf.expBar._titleObject.text = "MAX";
            }
            sf._clothesNext = Config.booklv_215[jieShu + 1];
        }
        else {
            sf.expBar.value = 0;
            sf.expBar._titleObject.text = "";
        }
        sf.iconJie.setVal(jieShu);
        sf.boxNeed.setCount(Model_Bag.getItemCount(Model_TianShu.DAN_LEVELUP) + "");
        sf.btnOnekey.checkNotice = Model_TianShu.checkOneKeyUp();
        var skillArr = Model_BySys.sysSkillArr(Model_BySys.TIAN_SHU);
        sf._skillArr = [];
        for (var i = 0; i < skillArr.length; i++) {
            sf._skillArr.push([Model_BySys.TIAN_SHU, skillArr[i]]);
        }
        sf.list.numItems = sf._skillArr.length;
        var showVo = GGlobal.modeltianshu.data[0];
        var power = 0;
        for (var i = 0; i < GGlobal.modeltianshu.data.length; i++) {
            var v = GGlobal.modeltianshu.data[i];
            if (v.star == 0)
                continue;
            if (GGlobal.modeltianshu.currentID == v.id) {
                showVo = v;
                break;
            }
            var vPower = v.power;
            if (vPower > power) {
                power = vPower;
                showVo = v;
            }
        }
        IconUtil.setImg(sf.img, Enum_Path.PIC_URL + showVo.pic + ".png");
        sf.labPower.text = "" + sf.upPower();
        var cnt = Model_Bag.getItemCount(415004);
        if (sf._clotheslv == null) {
            sf.labAttrCur.text = "";
            sf.labAttrNext.text = "";
            sf.labAttrMax.text = "";
            sf.imgArrow.visible = false;
            sf.zhiShengDan.data = { type: 4, count: cnt, lvl: 0, isFull: false };
        }
        else if (sf._clothesNext == null) {
            sf.labAttrCur.text = "";
            sf.labAttrNext.text = "";
            sf.labAttrMax.text = ConfigHelp.attrString(ConfigHelp.SplitStr(sf._clotheslv.attr), "+", null, "#15f234");
            sf.imgArrow.visible = false;
            sf.zhiShengDan.data = { type: 4, count: cnt, lvl: sf._clotheslv.lv, isFull: true };
        }
        else {
            sf.imgArrow.visible = true;
            sf.labAttrCur.text = ConfigHelp.attrString(ConfigHelp.SplitStr(sf._clotheslv.attr), "+");
            sf.labAttrNext.text = ConfigHelp.attrString(ConfigHelp.SplitStr(sf._clothesNext.attr), "+", null, "#15f234");
            sf.labAttrMax.text = "";
            sf.zhiShengDan.data = { type: 4, count: cnt, lvl: sf._clotheslv.lv, isFull: false };
        }
        // 100 - 103
        var equiDa = Model_player.voMine.equipData;
        for (var i = 0; i < 4; i++) {
            sf._equipArr[i].vo = equiDa[i + 100];
            sf._equipArr[i].showNotice = Model_BySys.canWear(i + 100, Model_BySys.TIAN_SHU);
            if (equiDa[i + 100] == null) {
                sf._equipArr[i].setGrayBg(i + 100);
            }
        }
        sf.btnEquip.visible = Model_TianShu.tianShuWearArr().length > 0;
        sf.btnEquip.checkNotice = true;
    };
    Child_TianShu_Jie.prototype.upPower = function () {
        var sf = this;
        var power = 0;
        //升阶战力
        var jieShu = GGlobal.modeltianshu.level;
        var clotheslv = Config.booklv_215[jieShu];
        power += clotheslv ? clotheslv.power : 0;
        //技能战力
        power += sf.getPowerSkill();
        //装备战力
        var equiDa = Model_player.voMine.equipData;
        for (var i = 0; i < 4; i++) {
            var eq = equiDa[i + 100];
            if (eq) {
                power += eq.basePower;
            }
        }
        return power;
    };
    //技能战力
    Child_TianShu_Jie.prototype.getPowerSkill = function () {
        var power = 0;
        var skillArr = Model_BySys.sysSkillArr(Model_BySys.TIAN_SHU);
        if (skillArr) {
            for (var i = 0; i < skillArr.length; i++) {
                var skillId = skillArr[i];
                var skill = Config.booklvskill_215[skillId];
                power += skill ? skill.power : 0;
            }
        }
        return power;
    };
    Child_TianShu_Jie.prototype.onClickUp = function (event) {
        var sf = this;
        var target = event.currentTarget;
        var type = 1;
        if (target.id == sf.btnUp.id) {
            type = 0;
        }
        var count = Model_Bag.getItemCount(Model_TianShu.DAN_LEVELUP);
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
        GGlobal.modeltianshu.CG_LEVELUP_975(type);
    };
    Child_TianShu_Jie.prototype.renderHandle = function (index, obj) {
        var sf = this;
        var item = obj;
        item.vo = sf._skillArr[index];
    };
    Child_TianShu_Jie.prototype.itemHandler = function (event) {
        var grid = event.itemObject;
        GGlobal.layerMgr.open(UIConst.BY_SYS_TIP_SKILL, grid.vo);
    };
    Child_TianShu_Jie.prototype.onEquip = function () {
        var sendArr = Model_TianShu.tianShuWearArr();
        var a = [];
        for (var i = 0; i < sendArr.length; i++) {
            a.push(sendArr[i].sid);
        }
        if (a.length > 0) {
            GGlobal.modelEquip.CGWearbypart(7, a);
        }
        else {
            ViewCommonWarn.text("无可穿戴的装备");
        }
    };
    Child_TianShu_Jie.prototype.onEquipTips = function (e) {
        var v = e.currentTarget;
        if (!v.vo) {
            var nitem = VoItem.create(410039);
            View_CaiLiao_GetPanel.show(nitem);
        }
    };
    Child_TianShu_Jie.URL = "ui://3tzqotadjx2x35";
    return Child_TianShu_Jie;
}(fairygui.GComponent));
__reflect(Child_TianShu_Jie.prototype, "Child_TianShu_Jie");
