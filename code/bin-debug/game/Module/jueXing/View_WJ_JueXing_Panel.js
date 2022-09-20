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
var View_WJ_JueXing_Panel = (function (_super) {
    __extends(View_WJ_JueXing_Panel, _super);
    function View_WJ_JueXing_Panel() {
        var _this = _super.call(this) || this;
        _this.awatar = null;
        _this.listArr = [];
        _this.secSkill = 0;
        _this.systemID = 0; //武将 神将觉醒
        _this.setSkin("jueXing", "jueXing_atlas0", "View_WJ_JueXing_Panel");
        return _this;
    }
    View_WJ_JueXing_Panel.prototype.setExtends = function () {
        var func = fairygui.UIObjectFactory.setPackageItemExtension;
        func(JueXingGrid.URL, JueXingGrid);
        func(JueXingBt.URL, JueXingBt);
        func(JueXingIconBt.URL, JueXingIconBt);
    };
    View_WJ_JueXing_Panel.prototype.initView = function () {
        var self = this;
        self.list.callbackThisObj = self;
        self.list.itemRenderer = self.renderHandler;
        self.list.addEventListener(fairygui.ItemEvent.CLICK, self.listHandler, self);
        self.iconBt0.data = 0;
        self.iconBt1.data = 1;
        self.iconBt2.data = 2;
        self.iconBt0.addClickListener(self.iconHandler, self);
        self.iconBt1.addClickListener(self.iconHandler, self);
        self.iconBt2.addClickListener(self.iconHandler, self);
        self.jxBt.addClickListener(self.jueXingHandle, self);
        self.suitBt.addClickListener(self.openSuit, self);
    };
    View_WJ_JueXing_Panel.prototype.openSuit = function () {
        GGlobal.layerMgr.open(UIConst.JUEXING_SUIT, this.curGrid.vo);
    };
    View_WJ_JueXing_Panel.prototype.jueXingHandle = function () {
        var self = this;
        var vo = self.curGrid.vo;
        if (self.jxBt.checkNotice) {
            var index = Model_JueXing.panelIDArr.indexOf(self.systemID);
            GGlobal.modeljx.CG_UPGRADE_JUEXING_821(index, vo.id, self.curBt.data + 1);
        }
        else {
            if (vo["skilllv" + self.curBt.data] % 1000 >= Config.jxzl_271[vo.quality * 100 + vo.suitLv].max) {
                ViewCommonWarn.text("已达升级上限，提升觉醒之力可提高上限");
            }
            else {
                View_CaiLiao_GetPanel.show(VoItem.create(self.curGrid.vo.costId));
            }
        }
    };
    View_WJ_JueXing_Panel.prototype.iconHandler = function (event) {
        var self = this;
        var bt = event.target;
        if (self.curBt && self.curBt.hashCode == bt.hashCode)
            return;
        if (self.curBt)
            self.curBt.selected = false;
        self.curBt = null;
        bt.selected = true;
        self.curBt = bt;
        self.updateAttShow();
    };
    View_WJ_JueXing_Panel.prototype.listHandler = function (event) {
        var self = this;
        var grid = event.itemObject;
        if (self.curGrid && self.curGrid.hashCode == grid.hashCode)
            return;
        if (self.curGrid)
            self.curGrid.choose = false;
        grid.choose = true;
        self.curGrid = grid;
        if (self.curBt)
            self.curBt.selected = false;
        self.curBt = null;
        self.updateGridShow();
    };
    View_WJ_JueXing_Panel.prototype.renderHandler = function (index, grid) {
        var self = this;
        grid.setVo(self.listArr[index]);
        grid.checkNotice = Model_JueXing.checkGridNotice(self.listArr[index]);
    };
    View_WJ_JueXing_Panel.prototype.updateShow = function () {
        var self = this;
        var index = Model_JueXing.panelIDArr.indexOf(self.systemID);
        self.listArr = Model_JueXing.jueXingData[index];
        self.updateListShow();
    };
    View_WJ_JueXing_Panel.prototype.updateListShow = function () {
        var self = this;
        self.list.numItems = self.listArr.length;
        self.updateGridShow();
    };
    View_WJ_JueXing_Panel.prototype.updateGridShow = function () {
        var self = this;
        if (!self.curGrid) {
            self.curGrid = self.list._children[0];
            self.curGrid.choose = true;
        }
        var vo = self.curGrid.vo;
        if (!vo)
            return;
        self.nameLb.text = vo.name;
        var skillsArr = JSON.parse(vo.skills);
        var secSkill = skillsArr[1][0];
        var szInfo = Model_WuJiang.shiZhuanDic[vo.id];
        if (szInfo && szInfo.onSkinId) {
            var mx = Config.sz_739[szInfo.onSkinId].moxing;
            self.awatar.setBody(mx);
            self.awatar.setWeapon(szInfo.onSkinId);
        }
        else {
            self.awatar.setBody(vo.id);
            self.awatar.setWeapon(vo.id);
        }
        self.awatar.onAdd();
        self.iconBt0.text = "七杀  Lv." + vo.skilllv0 % 1000;
        self.iconBt1.text = "破军  Lv." + vo.skilllv1 % 1000;
        self.iconBt2.text = "贪狼  Lv." + vo.skilllv2 % 1000;
        self.iconBt0.checkNotice(Model_JueXing.checkJueXingBtNotice(vo, 0));
        self.iconBt1.checkNotice(Model_JueXing.checkJueXingBtNotice(vo, 1));
        self.iconBt2.checkNotice(Model_JueXing.checkJueXingBtNotice(vo, 2));
        if (!self.curBt) {
            self.curBt = self.iconBt0;
            self.curBt.selected = true;
        }
        self.updateAttShow();
        if (self.secSkill != secSkill) {
            self.secSkill = secSkill;
            Timer.instance.remove(self.playSkill, self);
            self.playSkill();
        }
    };
    View_WJ_JueXing_Panel.prototype.playSkill = function () {
        var self = this;
        self.awatar.playSkillID(self.secSkill, false);
        Timer.instance.callLater(self.playSkill, 5000, self);
    };
    View_WJ_JueXing_Panel.prototype.updateAttShow = function () {
        var self = this;
        var vo = self.curGrid.vo;
        if (!vo)
            return;
        var suitcfg = Config.jxzl_271[vo.quality * 100 + vo.suitLv];
        var cfg = Config.jx_271[vo["skilllv" + self.curBt.data]];
        if (!cfg)
            return;
        var strArr = ["七杀", "破军", "贪狼"];
        self.curLb.text = "觉醒·" + strArr[self.curBt.data] + "  Lv." + vo["skilllv" + self.curBt.data] % 1000 + "/" + suitcfg.max;
        var attArr = JSON.parse(cfg.attr);
        var attStr = "";
        self.costGroup.visible = self.maxGroup.visible = true;
        if (cfg.next > 0) {
            var nextcfg = Config.jx_271[cfg.next];
            var nextArr = JSON.parse(nextcfg.attr);
            self.maxGroup.visible = false;
            for (var i = 0; i < attArr.length; i++) {
                if (i == 0) {
                    attStr += Vo_attr.getShowStr(attArr[i][0], attArr[i][1], "+") + HtmlUtil.fontNoSize("(+" + nextArr[i][1] + ")", Color.getColorStr(2));
                }
                else {
                    attStr += "\n" + Vo_attr.getShowStr(attArr[i][0], attArr[i][1], "+") + HtmlUtil.fontNoSize("(+" + nextArr[i][1] + ")", Color.getColorStr(2));
                }
            }
            var costItem = VoItem.create(vo.costId);
            var count = Model_Bag.getItemCount(vo.costId);
            var color = 0;
            if (count >= cfg.consume) {
                color = 2;
            }
            else {
                color = 6;
            }
            self.jxBt.checkNotice = count >= cfg.consume && vo["skilllv" + self.curBt.data] % 1000 < suitcfg.max;
            self.costLb.text = "消耗：" + HtmlUtil.fontNoSize(costItem.name, Color.getColorStr(costItem.quality)) + "x" + cfg.consume +
                HtmlUtil.fontNoSize("(" + count + "/" + cfg.consume + ")", Color.getColorStr(color));
        }
        else {
            attStr = ConfigHelp.attrString(attArr, "+", Color.getColorStr(1), Color.getColorStr(1));
            self.costGroup.visible = false;
        }
        self.attLb.text = attStr;
        self.maxLb.text = vo.suitLv + "阶觉醒之力提升觉醒技能等级上限：" + suitcfg.max;
        self.suitLb.text = vo.suitLv + "阶";
        self.powerLb.text = (Config.jx_271[vo.skilllv0].power + Config.jx_271[vo.skilllv1].power + Config.jx_271[vo.skilllv2].power) + "";
        var index = 0;
        if (suitcfg.lv != suitcfg.max) {
            if (vo.skilllv0 % 1000 >= suitcfg.max) {
                index++;
            }
            if (vo.skilllv1 % 1000 >= suitcfg.max) {
                index++;
            }
            if (vo.skilllv2 % 1000 >= suitcfg.max) {
                index++;
            }
        }
        self.suitBt.checkNotice = index >= 3;
    };
    View_WJ_JueXing_Panel.prototype.onShown = function () {
        var self = this;
        self.systemID = self._args;
        if (!self.awatar) {
            self.awatar = UIRole.create();
            self.awatar.setPos(370, 426);
            self.awatar.setScaleXY(1.5, 1.5);
            self.awatar.uiparent = self.displayListContainer;
            self.awatar.view.touchEnabled = self.awatar.view.touchChildren = false;
        }
        var index = Model_JueXing.panelIDArr.indexOf(self.systemID);
        if (index > 0) {
            Model_JueXing.getJueXingData(self.systemID);
            self.updateShow();
            GGlobal.reddot.listen(UIConst.JUEXING, self.updateShow, self);
        }
    };
    View_WJ_JueXing_Panel.prototype.onHide = function () {
        var self = this;
        if (self.awatar) {
            self.awatar.onRemove();
            self.awatar = null;
        }
        GGlobal.layerMgr.close(UIConst.JUEXING_WUJIANG);
        GGlobal.reddot.remove(UIConst.JUEXING, self.updateShow, self);
        if (GGlobal.layerMgr.lastPanelId <= 0) {
            GGlobal.layerMgr.open(self.systemID);
        }
        if (self.curBt)
            self.curBt.selected = false;
        self.curBt = null;
        if (self.curGrid)
            self.curGrid.choose = false;
        self.curGrid = null;
        self.list.numItems = 0;
        Timer.instance.remove(self.playSkill, self);
        self.secSkill = 0;
    };
    View_WJ_JueXing_Panel.URL = "ui://tbqdf7fdb8g14";
    return View_WJ_JueXing_Panel;
}(UIPanelBase));
__reflect(View_WJ_JueXing_Panel.prototype, "View_WJ_JueXing_Panel");
