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
var Child_ZSGodWeapon_UpStar = (function (_super) {
    __extends(Child_ZSGodWeapon_UpStar, _super);
    function Child_ZSGodWeapon_UpStar() {
        var _this = _super.call(this) || this;
        _this.totPage = 1;
        _this.curPage = 1;
        _this.isFirst = false;
        return _this;
    }
    Child_ZSGodWeapon_UpStar.createInstance = function () {
        return (fairygui.UIPackage.createObject("wuJiang", "Child_ZSGodWeapon_UpStar"));
    };
    Child_ZSGodWeapon_UpStar.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.list.callbackThisObj = self;
        self.list.itemRenderer = self.renderHandler;
        self.list.setVirtual();
        self.drugBt0.data = 0;
        self.drugBt1.data = 1;
        self.drugBt2.data = 2;
    };
    Child_ZSGodWeapon_UpStar.prototype.itemHandler = function (event) {
        var self = this;
        var grid = event.itemObject;
        if (self.curVo && self.curVo.job == grid.vo.job)
            return;
        self.curVo = grid.vo;
        self.curItem = grid;
        self.updateCurPage();
        self.updateShow();
    };
    Child_ZSGodWeapon_UpStar.prototype.renderHandler = function (index, item) {
        var self = this;
        var arr = Model_ZSGodWeapon.godWeoponArr;
        item.vo = arr[index];
        if (self.curVo && self.curVo.job == item.vo.job) {
            if (self.curItem)
                self.curItem.selected = false;
            item.selected = true;
            self.curVo = arr[index];
            self.curItem = item;
        }
        else if (item.vo.cfg.bianhao == Model_GlobalMsg.selectID) {
            if (self.curItem)
                self.curItem.selected = false;
            item.selected = true;
            self.curVo = arr[index];
            self.curItem = item;
        }
        else if (item.vo.job == Model_ZSGodWeapon.selectJob) {
            if (self.curItem)
                self.curItem.selected = false;
            item.selected = true;
            self.curVo = arr[index];
            self.curItem = item;
        }
        else {
            item.selected = false;
        }
        item.setNot(Model_ZSGodWeapon.checkOneUpStarNotice(arr[index]));
    };
    Child_ZSGodWeapon_UpStar.prototype.show = function () {
        var self = this;
        if (Model_ZSGodWeapon.godWeoponArr.length <= 0)
            Model_ZSGodWeapon.initcfg();
        for (var i = 0; i < Model_ZSGodWeapon.godWeoponArr.length; i++) {
            var vo = Model_ZSGodWeapon.godWeoponArr[i];
            if (vo.starLv > 0) {
                vo.state = Vo_ZSGodWeapon.ACTIVITY;
            }
            else if (vo.starLv <= 0 && Model_ZSGodWeapon.checkOneUpStar(vo)) {
                vo.state = Vo_ZSGodWeapon.CANACTIVITY;
            }
            else {
                vo.state = Vo_ZSGodWeapon.NOCANACTIVITY;
            }
        }
        Model_ZSGodWeapon.godWeoponArr.sort(Model_ZSGodWeapon.sortGodWeapon);
        self.list.numItems = Model_ZSGodWeapon.godWeoponArr.length;
        if (self.isFirst) {
            self.isFirst = false;
            if (Model_GlobalMsg.selectID > 0 || Model_ZSGodWeapon.selectJob > 0) {
                for (var i = 0; i < Model_ZSGodWeapon.godWeoponArr.length; i++) {
                    var vo = Model_ZSGodWeapon.godWeoponArr[i];
                    if (vo.cfg.bianhao == Model_GlobalMsg.selectID || vo.job == Model_ZSGodWeapon.selectJob) {
                        self.list.scrollToView(i, false);
                        break;
                    }
                }
            }
            if (!self.curVo) {
                var grid = self.list._children[0];
                grid.selected = true;
                self.curVo = grid.vo;
                self.curItem = grid;
            }
            self.updateCurPage();
        }
        else {
            if (!self.curVo) {
                var grid = self.list._children[0];
                grid.selected = true;
                self.curVo = grid.vo;
                self.curItem = grid;
            }
        }
        self.updateShow();
    };
    Child_ZSGodWeapon_UpStar.prototype.updateCurPage = function () {
        var self = this;
        if (!self.curVo)
            return;
        var vo = self.curVo;
        var index = 0;
        if (vo.cfg.bianhao == vo.equipID) {
            index = 1;
        }
        else if (vo.bodyIDArr.length > 0 && vo.equipID > 0) {
            for (var i = 0; i < vo.bodyArr.length; i++) {
                if (vo.bodyArr[i].id == vo.equipID) {
                    index = i + 2;
                    break;
                }
            }
        }
        self.curPage = index != 0 ? index : vo.bodyIDArr.length;
        if (self.curPage <= 0)
            self.curPage = 1;
    };
    Child_ZSGodWeapon_UpStar.prototype.updateShow = function () {
        var self = this;
        var cf = Config.sbsx_750;
        if (!self.curVo)
            return;
        Model_GlobalMsg.selectID = 0;
        Model_ZSGodWeapon.selectJob = 0;
        var vo = self.curVo;
        var starStr = ConfigHelp.getStarFontStr(vo.starLv);
        self.starLb.text = starStr;
        var attstr0 = "";
        var attstr1 = "";
        this.attGroup.visible = false;
        this.showAtt.visible = true;
        this.maxGroup.visible = false;
        this.upStarGroup.visible = true;
        if (vo.starLv == 0) {
            attstr1 = ConfigHelp.attrString(JSON.parse(cf[vo.quality * 1000 + 1].attr), "+", Color.getColorStr(1), Color.getColorStr(2));
            self.showAtt.text = attstr1;
            self.updateCostShow();
            self.starPowerLb.text = cf[vo.quality * 1000 + 1].power + "";
        }
        else if (vo.starLv < vo.starMax) {
            attstr0 = ConfigHelp.attrString(JSON.parse(cf[vo.quality * 1000 + vo.starLv].attr), "+", Color.getColorStr(1), Color.getColorStr(1));
            attstr1 = ConfigHelp.attrString(JSON.parse(cf[cf[vo.quality * 1000 + vo.starLv].next].attr), "+", Color.getColorStr(2), Color.getColorStr(2));
            self.updateCostShow();
            self.curAtt.text = attstr0;
            self.nextAtt.text = attstr1;
            self.attGroup.visible = true;
            self.showAtt.visible = false;
            self.starPowerLb.text = (cf[cf[vo.quality * 1000 + vo.starLv].next].power - cf[vo.quality * 1000 + vo.starLv].power) + "";
        }
        else {
            attstr0 = ConfigHelp.attrString(JSON.parse(cf[vo.quality * 1000 + vo.starLv].attr), "+", Color.getColorStr(1), Color.getColorStr(2));
            self.upStarBt.checkNotice = false;
            self.showAtt.text = attstr0;
            self.maxGroup.visible = true;
            self.upStarGroup.visible = false;
        }
        if (vo.starLv > 0) {
            self.upStarBt.text = "升星";
        }
        else {
            self.upStarBt.text = "激活";
        }
        self.powerLb.text = (vo.starLv > 0 ? cf[vo.quality * 1000 + vo.starLv].power : 0) + "";
        self.drugGroup0.visible = vo.cfg.max1 != 0;
        self.drugGroup1.visible = vo.cfg.max2 != 0;
        self.drugGroup2.visible = vo.cfg.max3 != 0;
        self.drugCount0.text = (vo.tunshiArr[0] ? vo.tunshiArr[0] : 0) + "/" + vo.cfg.max1 * vo.starLv;
        self.drugCount1.text = (vo.tunshiArr[1] ? vo.tunshiArr[1] : 0) + "/" + vo.cfg.max2 * vo.starLv;
        self.drugCount2.text = (vo.tunshiArr[2] ? vo.tunshiArr[2] : 0) + "/" + vo.cfg.max3 * vo.starLv;
        var showTxt = vo.cfg.max3 != 0 ? "可提升太初神铁吞噬上限：" + HtmlUtil.fontNoSize((vo.cfg.max3 * vo.starLv) + "", Color.getColorStr(2)) + "\n" : "";
        showTxt += vo.cfg.max2 != 0 ? "可提升天外陨铁吞噬上限：" + HtmlUtil.fontNoSize((vo.cfg.max2 * vo.starLv) + "", Color.getColorStr(2)) + "\n" : "";
        showTxt += vo.cfg.max1 != 0 ? "可提升百炼玄铁吞噬上限：" + HtmlUtil.fontNoSize((vo.cfg.max1 * vo.starLv) + "", Color.getColorStr(2)) : "";
        self.skillDes.text = showTxt;
        self.suitBt.checkNotice = Model_ZSGodWeapon.checkZSNotice(vo);
        self.drugBt0.checkNotice = Model_ZSGodWeapon.checkTunShi(vo, 0);
        self.drugBt1.checkNotice = Model_ZSGodWeapon.checkTunShi(vo, 1);
        self.drugBt2.checkNotice = Model_ZSGodWeapon.checkTunShi(vo, 2);
        self.updatePage();
    };
    Child_ZSGodWeapon_UpStar.prototype.updateCostShow = function () {
        var self = this;
        var vo = self.curVo;
        self.costItem = VoItem.create(vo.costArr[0][1]);
        var count = Model_Bag.getItemCount(self.costItem.id);
        if (count >= vo.costArr[0][2]) {
            self.upStarBt.checkNotice = true && (Model_WuJiang.wuJiangStar[vo.job] || ModelGodWuJiang.getWuJiangIsActivation(vo.job));
            self.costLb.text = "消耗：" + HtmlUtil.fontNoSize(this.costItem.name, Color.getColorStr(this.costItem.quality)) + "x" + vo.costArr[0][2] +
                HtmlUtil.fontNoSize("(" + count + "/" + vo.costArr[0][2] + ")", Color.getColorStr(2));
        }
        else {
            self.upStarBt.checkNotice = false;
            self.costLb.text = "消耗：" + HtmlUtil.fontNoSize(self.costItem.name, Color.getColorStr(self.costItem.quality)) + "x" + vo.costArr[0][2] +
                HtmlUtil.fontNoSize("(" + count + "/" + vo.costArr[0][2] + ")", Color.getColorStr(6));
        }
    };
    Child_ZSGodWeapon_UpStar.prototype.pageHandler = function (evt) {
        var self = this;
        var bt = evt.target;
        switch (bt.hashCode) {
            case self.leftBt.hashCode:
                if (self.curPage <= 1)
                    return;
                self.curPage--;
                break;
            case self.rightBt.hashCode:
                if (self.curPage >= self.totPage)
                    return;
                self.curPage++;
                break;
        }
        self.updatePage();
    };
    Child_ZSGodWeapon_UpStar.prototype.updatePage = function () {
        var self = this;
        var vo = self.curVo;
        if (vo.starLv > 0) {
            self.totPage = vo.bodyIDArr.length >= vo.bodyArr.length ? vo.bodyArr.length + 1 : vo.bodyIDArr.length + 1;
        }
        else {
            self.totPage = 1;
        }
        self.leftBt.visible = vo.bodyArr.length > 0 && self.curPage != 1;
        self.rightBt.visible = vo.bodyArr.length > 0 && self.curPage != self.totPage;
        if (self.godEff) {
            EffectMgr.instance.removeEff(self.godEff);
            self.godEff = null;
        }
        self.jihuoLb.visible = false;
        self.starLb.visible = true;
        if (self.curPage == 1) {
            self.nameLb.text = vo.cfg.name;
            self.nameLb.color = Color.getColorInt(vo.quality);
            self.showBt.visible = self.useBt.visible = vo.starLv > 0;
            self.useBt.icon = vo.equipID == vo.cfg.bianhao ? "ui://jvxpx9emdna53co" : "ui://jvxpx9emdna53cp";
            self.godEff = EffectMgr.addEff("uieff/" + vo.cfg.picture, self.godWeaponIcon.displayObject, self.godWeaponIcon.width / 2, self.godWeaponIcon.height / 2, 1000);
        }
        else {
            var cfg1 = vo.bodyArr[self.curPage - 2];
            if (vo.bodyIDArr.indexOf(cfg1.id) != -1) {
                self.showBt.visible = self.useBt.visible = true;
                self.useBt.icon = vo.equipID == cfg1.id ? "ui://jvxpx9emdna53co" : "ui://jvxpx9emdna53cp";
            }
            else {
                self.showBt.visible = self.useBt.visible = false;
                self.jihuoLb.visible = true;
                self.jihuoLb.text = ConfigHelp.reTxt("淬炼{0}阶可以激活", Math.floor(cfg1.tj / 10));
                self.starLb.visible = false;
            }
            self.nameLb.text = cfg1.mz;
            self.nameLb.color = Color.getColorInt(cfg1.pz);
            self.godEff = EffectMgr.addEff("uieff/" + cfg1.zs, self.godWeaponIcon.displayObject, self.godWeaponIcon.width / 2, self.godWeaponIcon.height / 2, 1000);
        }
    };
    Child_ZSGodWeapon_UpStar.prototype.OnUp = function () {
        var self = this;
        if (self.upStarBt.checkNotice) {
            GGlobal.modelGodWeapon.CG_GodWeapon_upstar_7851(self.curVo.job);
        }
        else {
            if (!Model_WuJiang.getWuJiangStarByJob(self.curVo.job)) {
                ViewCommonWarn.text("请先激活武将·" + HtmlUtil.fontNoSize(self.curVo.wujiangVo.name, Color.getColorStr(self.curVo.wujiangVo.pinzhi)));
            }
            else {
                View_CaiLiao_GetPanel.show(self.costItem);
            }
        }
    };
    Child_ZSGodWeapon_UpStar.prototype.OnUse = function () {
        var self = this;
        if (self.curPage == 1) {
            if (self.curVo.equipID == self.curVo.cfg.bianhao) {
                GGlobal.modelGodWeapon.CG_GodWeapon_wear_7853(self.curVo.job, 0);
            }
            else {
                GGlobal.modelGodWeapon.CG_GodWeapon_wear_7853(self.curVo.job, self.curVo.cfg.bianhao);
            }
        }
        else {
            if (self.curVo.equipID == self.curVo.bodyArr[self.curPage - 2].id) {
                GGlobal.modelGodWeapon.CG_GodWeapon_wear_7853(self.curVo.job, 0);
            }
            else {
                GGlobal.modelGodWeapon.CG_GodWeapon_wear_7853(self.curVo.job, self.curVo.bodyArr[self.curPage - 2].id);
            }
        }
    };
    Child_ZSGodWeapon_UpStar.prototype.OnDrug = function (evt) {
        GGlobal.layerMgr.open(UIConst.ZS_GODWEAPON_DAN, { vo: this.curVo, index: evt.target.data });
    };
    Child_ZSGodWeapon_UpStar.prototype.OnSuit = function () {
        GGlobal.layerMgr.open(UIConst.ZS_GODWEAPON_SUIT, this.curVo);
    };
    Child_ZSGodWeapon_UpStar.prototype.OnShow = function () {
        var self = this;
        var equipID = 0;
        var value = 0;
        if (self.curPage == 1) {
            value = 12;
            equipID = self.curVo.cfg.bianhao;
        }
        else {
            value = 13;
            equipID = self.curVo.bodyArr[self.curPage - 2].id;
        }
        GGlobal.modelchat.CG_CHAT_SHOW_DATA(value, equipID);
    };
    Child_ZSGodWeapon_UpStar.prototype.onOpen = function () {
        var self = this;
        if (!Model_ZSGodWeapon.hasData) {
            GGlobal.modelGodWeapon.CG_OPENUI_7871();
        }
        self.isFirst = true;
        self.show();
        self.list.addEventListener(fairygui.ItemEvent.CLICK, self.itemHandler, self);
        self.leftBt.addClickListener(self.pageHandler, self);
        self.rightBt.addClickListener(self.pageHandler, self);
        self.upStarBt.addClickListener(self.OnUp, self);
        self.useBt.addClickListener(self.OnUse, self);
        self.drugBt0.addClickListener(self.OnDrug, self);
        self.drugBt1.addClickListener(self.OnDrug, self);
        self.drugBt2.addClickListener(self.OnDrug, self);
        self.suitBt.addClickListener(self.OnSuit, self);
        self.showBt.addClickListener(self.OnShow, self);
        GGlobal.control.listen(UIConst.ZS_GODWEAPON, self.show, self);
    };
    Child_ZSGodWeapon_UpStar.prototype.onClose = function () {
        var self = this;
        if (self.godEff) {
            EffectMgr.instance.removeEff(self.godEff);
            self.godEff = null;
        }
        self.isFirst = false;
        if (self.curItem)
            self.curItem.selected = false;
        self.curItem = null;
        self.curVo = null;
        self.list.numItems = 0;
        self.list.removeEventListener(fairygui.ItemEvent.CLICK, self.itemHandler, self);
        self.curPage = 1;
        self.totPage = 1;
        self.leftBt.removeClickListener(self.pageHandler, self);
        self.rightBt.removeClickListener(self.pageHandler, self);
        self.upStarBt.removeClickListener(self.OnUp, self);
        self.useBt.removeClickListener(self.OnUse, self);
        self.drugBt0.removeClickListener(self.OnDrug, self);
        self.drugBt1.removeClickListener(self.OnDrug, self);
        self.drugBt2.removeClickListener(self.OnDrug, self);
        self.suitBt.removeClickListener(self.OnSuit, self);
        self.showBt.removeClickListener(self.OnShow, self);
        GGlobal.control.remove(UIConst.ZS_GODWEAPON, self.show, self);
    };
    Child_ZSGodWeapon_UpStar.prototype.getSelectJob = function () {
        var self = this;
        if (self.curVo) {
            return self.curVo.job;
        }
        return 0;
    };
    Child_ZSGodWeapon_UpStar.URL = "ui://zyx92gzwu7vv3n";
    return Child_ZSGodWeapon_UpStar;
}(fairygui.GComponent));
__reflect(Child_ZSGodWeapon_UpStar.prototype, "Child_ZSGodWeapon_UpStar");
