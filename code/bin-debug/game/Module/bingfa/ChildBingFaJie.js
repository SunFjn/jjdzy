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
var ChildBingFaJie = (function (_super) {
    __extends(ChildBingFaJie, _super);
    function ChildBingFaJie() {
        return _super.call(this) || this;
    }
    ChildBingFaJie.createInstance = function () {
        return (fairygui.UIPackage.createObject("role", "Child_BaoWu_Jie"));
    };
    ChildBingFaJie.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.imgDi = (this.getChild("imgDi"));
        this.img = (this.getChild("img"));
        this.list = (this.getChild("list"));
        this.labNeedName = (this.getChild("labNeedName"));
        // this.labJie = <fairygui.GRichTextField><any>(this.getChild("labJie"));
        this.boxNeed = (this.getChild("boxNeed"));
        this.labPower = (this.getChild("labPower"));
        this.btnOnekey = (this.getChild("btnOnekey"));
        this.btnUp = (this.getChild("btnUp"));
        this.expBar = (this.getChild("expBar"));
        this.labAttrCur = (this.getChild("labAttrCur"));
        this.labAttrNext = (this.getChild("labAttrNext"));
        this.labAttrMax = (this.getChild("labAttrMax"));
        this.imgArrow = (this.getChild("imgArrow"));
        this.labUp = (this.getChild("labUp"));
        this.equip0 = (this.getChild("equip0"));
        this.equip1 = (this.getChild("equip1"));
        this.equip2 = (this.getChild("equip2"));
        this.equip3 = (this.getChild("equip3"));
        this.btnEquip = (this.getChild("btnEquip"));
        this.zhiShengDan = (this.getChild("zhiShengDan"));
        this.iconJie = (this.getChild("iconJie"));
        this.list.itemRenderer = this.renderHandle;
        this.list.callbackThisObj = this;
        this._equipArr = [this.equip0, this.equip1, this.equip2, this.equip3];
        this._needItem = VoItem.create(Model_BingFa.DAN_LEVELUP);
        this.labNeedName.text = this._needItem.name;
        this.boxNeed.setImgUrl(this._needItem.icon);
    };
    ChildBingFaJie.prototype.open = function () {
        this.addEvent();
        this.update();
    };
    ChildBingFaJie.prototype.hide = function () {
        this.removeEvent();
    };
    ChildBingFaJie.prototype.addEvent = function () {
        this.list.addEventListener(fairygui.ItemEvent.CLICK, this.itemHandler, this);
        this.btnUp.addClickListener(this.onClickUp, this);
        this.btnOnekey.addClickListener(this.onClickUp, this);
        this.btnEquip.addClickListener(this.onEquip, this);
        GGlobal.control.listen(Enum_MsgType.BY_SYS_UP_JIE_SKILL, this.upSys, this);
        // GGlobal.control.listen(Enum_MsgType.BY_SYS_UP_SKILL, this.upSysSkill, this);
        GGlobal.control.listen(Enum_MsgType.MSG_ROLE_EQUIP_UPDATE, this.update, this);
        for (var i = 0; i < 4; i++) {
            this._equipArr[i].addClickListener(this.onEquipTips, this);
        }
    };
    // private upSysSkill(v):void{
    // 	let sys = v[0];
    // 	if(sys == Model_BySys.BING_FA){
    // 		this.update();
    // 	}
    // }
    ChildBingFaJie.prototype.upSys = function (sys) {
        if (sys == Model_BySys.BING_FA) {
            this.update();
        }
    };
    ChildBingFaJie.prototype.removeEvent = function () {
        var self = this;
        self.list.removeEventListener(fairygui.ItemEvent.CLICK, self.itemHandler, this);
        self.btnUp.removeClickListener(self.onClickUp, this);
        self.btnOnekey.removeClickListener(self.onClickUp, this);
        self.btnEquip.removeClickListener(self.onEquip, this);
        GGlobal.control.remove(Enum_MsgType.BY_SYS_UP_JIE_SKILL, self.upSys, this);
        // GGlobal.control.remove(Enum_MsgType.BY_SYS_UP_SKILL, self.upSysSkill, this);
        GGlobal.control.remove(Enum_MsgType.MSG_ROLE_EQUIP_UPDATE, self.update, this);
        for (var i = 0; i < 4; i++) {
            self._equipArr[i].removeClickListener(self.onEquipTips, this);
        }
        self.list.numItems = 0;
        if (self.bwEff) {
            EffectMgr.instance.removeEff(self.bwEff);
            self.bwEff = null;
        }
    };
    ChildBingFaJie.prototype.update = function () {
        var self = this;
        self._clotheslv = null;
        self._clothesNext = null;
        var jieShu = Model_BySys.sysJie(Model_BySys.BING_FA);
        var exp = Model_BySys.sysExp(Model_BySys.BING_FA);
        if (jieShu > 0) {
            self._clotheslv = Config.booklv_213[jieShu];
            if (self._clotheslv.exp > 0) {
                // self.labJie.text = self._clotheslv.jie;
                self.expBar.value = exp * 100 / self._clotheslv.exp;
                self.expBar._titleObject.text = exp + "/" + self._clotheslv.exp;
            }
            else {
                // self.labJie.text = self._clotheslv.jie;
                self.expBar.value = 100;
                self.expBar._titleObject.text = "MAX";
            }
            self._clothesNext = Config.booklv_213[jieShu + 1];
        }
        else {
            // self.labJie.text = ""
            self.expBar.value = 0;
            self.expBar._titleObject.text = "";
        }
        self.iconJie.setVal(jieShu);
        self.boxNeed.setCount(Model_Bag.getItemCount(Model_BingFa.DAN_LEVELUP) + "");
        self.btnOnekey.checkNotice = Model_BingFa.checkOneKeyUp();
        var skillArr = Model_BySys.sysSkillArr(Model_BySys.BING_FA);
        self._skillArr = [];
        for (var i = 0; i < skillArr.length; i++) {
            self._skillArr.push([Model_BySys.BING_FA, skillArr[i]]);
        }
        self.list.numItems = self._skillArr.length;
        GGlobal.modelBingFa.initData();
        var showVo = GGlobal.modelBingFa.data[0];
        var power = 0;
        for (var i = 0; i < GGlobal.modelBingFa.data.length; i++) {
            var v = GGlobal.modelBingFa.data[i];
            if (v.star == 0)
                continue;
            var vPower = v.power;
            if (vPower > power) {
                power = vPower;
                showVo = v;
            }
        }
        if (showVo) {
            IconUtil.setImg(self.img, Enum_Path.PIC_URL + showVo.pic + ".png");
            if (self.bwEff) {
                EffectMgr.instance.removeEff(self.bwEff);
                self.bwEff = null;
            }
            if (showVo.lib.tptx > 0) {
                if (!self.bwEff) {
                    self.bwEff = EffectMgr.addEff("uieff/" + showVo.lib.tptx, self.img.displayObject, self.img.width / 2, self.img.height / 2, 1000, -1, true);
                }
            }
            self.img.visible = true;
        }
        else {
            self.img.visible = false;
        }
        //升阶战力
        // var clotheslv = Config.booklv_213[jieShu]
        // self.labPower.text = "" + (clotheslv ? clotheslv.power : 0);
        self.labPower.text = "" + self.upPower();
        var cnt = Model_Bag.getItemCount(415006);
        if (self._clotheslv == null) {
            self.labAttrCur.text = "";
            self.labAttrNext.text = "";
            self.labAttrMax.text = "";
            self.imgArrow.visible = false;
            self.zhiShengDan.data = { type: 6, count: cnt, lvl: 0, isFull: false };
        }
        else if (self._clothesNext == null) {
            self.labAttrCur.text = "";
            self.labAttrNext.text = "";
            self.labAttrMax.text = ConfigHelp.attrString(ConfigHelp.SplitStr(self._clotheslv.attr), "+", null, "#15f234");
            self.imgArrow.visible = false;
            self.zhiShengDan.data = { type: 6, count: cnt, lvl: self._clotheslv.id, isFull: true };
        }
        else {
            self.imgArrow.visible = true;
            self.labAttrCur.text = ConfigHelp.attrString(ConfigHelp.SplitStr(self._clotheslv.attr), "+");
            self.labAttrNext.text = ConfigHelp.attrString(ConfigHelp.SplitStr(self._clothesNext.attr), "+", null, "#15f234");
            self.labAttrMax.text = "";
            self.zhiShengDan.data = { type: 6, count: cnt, lvl: self._clotheslv.id, isFull: false };
        }
        // 80 - 83
        var equiDa = Model_player.voMine.equipData;
        for (var i = 0; i < 4; i++) {
            self._equipArr[i].vo = equiDa[i + 80];
            self._equipArr[i].showNotice = Model_BySys.canWear(i + 80, Model_BySys.BING_FA);
            if (equiDa[i + 80] == null) {
                self._equipArr[i].setGrayBg(i + 80);
            }
        }
        self.btnEquip.visible = Model_BingFa.bingFaWearArr().length > 0;
        self.btnEquip.checkNotice = true;
    };
    ChildBingFaJie.prototype.upPower = function () {
        var power = 0;
        //升阶战力
        var jieShu = Model_BySys.sysJie(Model_BySys.BING_FA);
        var clotheslv = Config.booklv_213[jieShu];
        power += clotheslv ? clotheslv.power : 0;
        //技能战力
        power += this.getPowerSkill();
        //装备战力
        var equiDa = Model_player.voMine.equipData;
        for (var i = 0; i < 4; i++) {
            var eq = equiDa[i + 80];
            if (eq) {
                power += eq.basePower;
            }
        }
        return power;
    };
    //技能战力
    ChildBingFaJie.prototype.getPowerSkill = function () {
        var power = 0;
        var skillArr = Model_BySys.sysSkillArr(Model_BySys.BING_FA);
        if (skillArr) {
            for (var i = 0; i < skillArr.length; i++) {
                var skillId = skillArr[i];
                var skill = Config.booklvskill_213[skillId];
                power += skill ? skill.power : 0;
            }
        }
        return power;
    };
    ChildBingFaJie.prototype.onClickUp = function (event) {
        var target = event.currentTarget;
        var type = 1;
        if (target.id == this.btnUp.id) {
            type = 0;
        }
        var count = Model_Bag.getItemCount(Model_BingFa.DAN_LEVELUP);
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
        GGlobal.modelBySys.CGUpjiebysys(Model_BySys.BING_FA, type);
    };
    ChildBingFaJie.prototype.renderHandle = function (index, obj) {
        var item = obj;
        item.vo = this._skillArr[index];
    };
    ChildBingFaJie.prototype.itemHandler = function (event) {
        var grid = event.itemObject;
        GGlobal.layerMgr.open(UIConst.BY_SYS_TIP_SKILL, grid.vo);
    };
    ChildBingFaJie.prototype.onEquip = function () {
        var s = this;
        var sendArr = Model_BingFa.bingFaWearArr();
        var a = [];
        for (var i = 0; i < sendArr.length; i++) {
            a.push(sendArr[i].sid);
        }
        if (a.length > 0) {
            GGlobal.modelEquip.CGWearbypart(5, a);
        }
        else {
            ViewCommonWarn.text("无可穿戴的装备");
        }
    };
    ChildBingFaJie.prototype.onEquipTips = function (e) {
        var v = e.currentTarget;
        if (!v.vo) {
            var nitem = VoItem.create(410037);
            View_CaiLiao_GetPanel.show(nitem);
        }
    };
    ChildBingFaJie.URL = "ui://3tzqotadjx2x35";
    return ChildBingFaJie;
}(fairygui.GComponent));
__reflect(ChildBingFaJie.prototype, "ChildBingFaJie");
