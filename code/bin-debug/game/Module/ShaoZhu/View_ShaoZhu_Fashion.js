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
var View_ShaoZhu_Fashion = (function (_super) {
    __extends(View_ShaoZhu_Fashion, _super);
    function View_ShaoZhu_Fashion() {
        var _this = _super.call(this) || this;
        View_ShaoZhu_Panel.setExtends();
        _this.loadRes("ShaoZhu", "ShaoZhu_atlas0");
        return _this;
    }
    View_ShaoZhu_Fashion.prototype.childrenCreated = function () {
        var self = this;
        GGlobal.createPack("ShaoZhu");
        self.view = fairygui.UIPackage.createObject("ShaoZhu", "View_ShaoZhu_Fashion").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        self.list.callbackThisObj = self;
        self.list.itemRenderer = self.renderHandler;
        self.fashionList.callbackThisObj = self;
        self.fashionList.itemRenderer = self.fashionRenderHandler;
        _super.prototype.childrenCreated.call(this);
        CommonManager.listPageChange("View_ShaoZhu_Fashion", self.list, self.pageLeft, self.pageRight, 3);
        self.equipBt.addClickListener(self.EquipHandler, self);
        self.upBt.addClickListener(self.upHandler, self);
    };
    View_ShaoZhu_Fashion.prototype.upHandler = function () {
        var self = this;
        if (self.upBt.checkNotice) {
            GGlobal.modelShaoZhu.CG_UPFASHION_SHAOZHU_5107(self.curItem.vo.id);
        }
        else {
            var costArr = self.curItem.vo.conmuse;
            var itemVo = VoItem.create(costArr[0][1]);
            View_CaiLiao_GetPanel.show(itemVo);
        }
    };
    View_ShaoZhu_Fashion.prototype.EquipHandler = function () {
        var self = this;
        GGlobal.modelShaoZhu.CG_EQUIP_FASHION_SHAOZHU_5111(self.curGrid.vo.shaozhuID, self.curItem.bodyID);
    };
    View_ShaoZhu_Fashion.prototype.fashionRenderHandler = function (index, obj) {
        var self = this;
        var vo = self.curGrid.vo;
        if (index == 0) {
            obj.setVo(null, vo);
        }
        else if (index <= self.curGrid.vo.bodyArr.length) {
            obj.setVo(self.curGrid.vo.bodyArr[index - 1], vo);
        }
        else {
            obj.setVo(null);
        }
    };
    View_ShaoZhu_Fashion.prototype.renderHandler = function (index, obj) {
        var self = this;
        obj.setVo(GGlobal.modelShaoZhu.shaoZhuArr[index]);
        obj.noticeImg.visible = GGlobal.modelShaoZhu.checkFashionNotice(GGlobal.modelShaoZhu.shaoZhuArr[index]);
    };
    View_ShaoZhu_Fashion.prototype.updateShow = function () {
        var self = this;
        self.list.numItems = GGlobal.modelShaoZhu.shaoZhuArr.length;
        self.updateShaoZhu();
    };
    View_ShaoZhu_Fashion.prototype.updateShaoZhu = function () {
        var self = this;
        if (!self.curGrid) {
            if (self._args) {
                for (var i = 0; i < self.list._children.length; i++) {
                    var shaozhuGrid = self.list._children[i];
                    var shozhuVo = self._args;
                    if (shaozhuGrid.vo.shaozhuID == shozhuVo.shaozhuID) {
                        self.curGrid = this.list._children[i];
                        break;
                    }
                }
            }
            else {
                self.curGrid = this.list._children[0];
            }
            self.curGrid.choose(true);
        }
        if (!self.curGrid)
            return;
        self.fashionList.numItems = self.curGrid.vo.bodyArr.length + 2;
        self.updateFashionShow();
    };
    View_ShaoZhu_Fashion.prototype.updateFashionShow = function () {
        var self = this;
        if (!self.curItem) {
            if (self._args) {
                for (var i = 0; i < self.fashionList._children.length; i++) {
                    var fashionGrid = self.fashionList._children[i];
                    var shozhuVo = self._args;
                    if (fashionGrid.bodyID == shozhuVo.bodyID) {
                        self.curItem = fashionGrid;
                        break;
                    }
                }
            }
            else {
                self.curItem = self.fashionList._children[0];
            }
        }
        self._args = null;
        if (!self.curItem)
            return;
        self.curItem.choose(true);
        var vo = self.curItem.vo;
        var shaozhuVo = self.curGrid.vo;
        var model = 0;
        if (!vo) {
            self.powerLb.text = "0";
            self.labStar.visible = false;
            self.attGroup.visible = self.equipBt.visible = self.costGroup.visible = false;
            self.promptLb.visible = self.labAttrMax.visible = self.boxMax.visible = false;
            self.MRLb.visible = true;
            model = shaozhuVo.cfg.zs;
            self.equipBt.visible = shaozhuVo.starLv > 0;
            self.equipBt.icon = shaozhuVo.bodyID == 0 ? "ui://p83wyb2bng03t" : "ui://p83wyb2bng03s";
            self.equipBt.touchable = shaozhuVo.bodyID != 0;
        }
        else {
            self.powerLb.text = vo.getPower() + "";
            self.labStar.visible = true;
            self.labStar.text = ConfigHelp.getStarFontStr(vo.starLv);
            self.attGroup.visible = self.equipBt.visible = self.costGroup.visible = self.MRLb.visible = self.promptLb.visible = self.labAttrMax.visible = self.boxMax.visible = false;
            model = vo.cfg.zs;
            if (shaozhuVo.starLv <= 0) {
                self.attGroup.visible = self.equipBt.visible = self.costGroup.visible = false;
                self.labAttrMax.visible = self.promptLb.visible = true;
                self.promptLb.text = ConfigHelp.reTxt("需激活少主·{0}", [shaozhuVo.cfg.name]);
                self.labAttrMax.text = ConfigHelp.attrString(vo.attr, "+", Color.getColorStr(1), Color.getColorStr(2));
            }
            else {
                self.equipBt.icon = shaozhuVo.bodyID == vo.id ? "ui://p83wyb2bng03t" : "ui://p83wyb2bng03s";
                self.equipBt.touchable = shaozhuVo.bodyID != vo.id;
                self.equipBt.visible = vo.starLv > 0;
                self.upBt.text = vo.starLv > 0 ? "升星" : "激活";
                var curAttArr = [];
                var nextAttArr = [];
                if (vo.starLv >= vo.max) {
                    for (var i = 0; i < vo.attr.length; i++) {
                        curAttArr.push([vo.attr[i][0], vo.attr[i][1] * vo.starLv]);
                    }
                    self.labAttrMax.visible = self.boxMax.visible = true;
                    self.costGroup.visible = false;
                    self.labAttrMax.text = ConfigHelp.attrString(curAttArr, "+", Color.getColorStr(1), Color.getColorStr(2));
                }
                else if (vo.starLv <= 0) {
                    self.boxMax.visible = false;
                    self.labAttrMax.visible = self.costGroup.visible = true;
                    self.labAttrMax.text = ConfigHelp.attrString(vo.attr, "+", Color.getColorStr(1), Color.getColorStr(2));
                    self.updateCost();
                }
                else {
                    for (var i = 0; i < vo.attr.length; i++) {
                        curAttArr.push([vo.attr[i][0], vo.attr[i][1] * vo.starLv]);
                        nextAttArr.push([vo.attr[i][0], vo.attr[i][1] * (vo.starLv + 1)]);
                    }
                    self.attGroup.visible = self.costGroup.visible = true;
                    self.labAttrCur.text = ConfigHelp.attrString(curAttArr, "+", Color.getColorStr(1), Color.getColorStr(1));
                    self.labAttrNext.text = ConfigHelp.attrString(nextAttArr, "+", Color.getColorStr(2), Color.getColorStr(2));
                    self.updateCost();
                }
            }
        }
        if (self.awatar) {
            EffectMgr.instance.removeEff(self.awatar);
            self.awatar = null;
        }
        if (!self.awatar) {
            self.awatar = EffectMgr.addEff("uieff/" + model, self.modelIcon.displayObject, self.modelIcon.width / 2, self.modelIcon.height, 1000, -1, true);
        }
    };
    View_ShaoZhu_Fashion.prototype.updateCost = function () {
        var self = this;
        var costArr = self.curItem.vo.conmuse;
        var itemVo = VoItem.create(costArr[0][1]);
        var count = Model_Bag.getItemCount(costArr[0][1]);
        if (count >= costArr[0][2]) {
            self.upBt.checkNotice = true;
            self.costLb.text = "消耗：" + HtmlUtil.fontNoSize(itemVo.name, Color.getColorStr(itemVo.quality)) + "X" + costArr[0][2] +
                HtmlUtil.fontNoSize("(" + count + "/" + costArr[0][2] + ")", Color.getColorStr(2));
        }
        else {
            self.costLb.text = "消耗：" + HtmlUtil.fontNoSize(itemVo.name, Color.getColorStr(itemVo.quality)) + "X" + costArr[0][2] +
                HtmlUtil.fontNoSize("(" + count + "/" + costArr[0][2] + ")", Color.getColorStr(6));
            self.upBt.checkNotice = false;
        }
    };
    View_ShaoZhu_Fashion.prototype.listHandler = function (evt) {
        var self = this;
        var grid = evt.itemObject;
        if (self.curGrid && self.curGrid.vo && grid.vo.shaozhuID == self.curGrid.vo.shaozhuID)
            return;
        if (self.curGrid) {
            self.curGrid.choose(false);
            self.curGrid = null;
        }
        if (self.curItem)
            self.curItem.choose(false);
        self.curItem = null;
        grid.choose(true);
        self.curGrid = grid;
        self.updateShaoZhu();
    };
    View_ShaoZhu_Fashion.prototype.fashionListHandler = function (evt) {
        var self = this;
        var grid = evt.itemObject;
        if (!grid.vo && !grid.shaozhuVo)
            return;
        if ((self.curItem && self.curItem.vo && grid.vo && grid.vo.id == self.curItem.vo.id) || (!grid.vo && !self.curItem.vo))
            return;
        if (self.curItem) {
            self.curItem.choose(false);
            self.curItem = null;
        }
        grid.choose(true);
        self.curItem = grid;
        self.updateFashionShow();
    };
    View_ShaoZhu_Fashion.prototype.onShown = function () {
        var self = this;
        self.updateShow();
        self.list.addEventListener(fairygui.ItemEvent.CLICK, self.listHandler, self);
        self.fashionList.addEventListener(fairygui.ItemEvent.CLICK, self.fashionListHandler, self);
        GGlobal.reddot.listen(UIConst.SHAOZHU, self.updateShow, self);
    };
    View_ShaoZhu_Fashion.prototype.onHide = function () {
        var self = this;
        if (self.awatar) {
            EffectMgr.instance.removeEff(self.awatar);
            self.awatar = null;
        }
        self.list.numItems = 0;
        if (self.curItem)
            self.curItem.choose(false);
        if (self.curGrid)
            self.curGrid.choose(false);
        self.curItem = null;
        self.curGrid = null;
        GGlobal.layerMgr.close(UIConst.SHAOZHU_FASHION);
        self.list.removeEventListener(fairygui.ItemEvent.CLICK, self.listHandler, self);
        self.fashionList.removeEventListener(fairygui.ItemEvent.CLICK, self.fashionListHandler, self);
        GGlobal.reddot.remove(UIConst.SHAOZHU, self.updateShow, self);
    };
    View_ShaoZhu_Fashion.URL = "ui://p83wyb2bng03r";
    return View_ShaoZhu_Fashion;
}(UIModalPanel));
__reflect(View_ShaoZhu_Fashion.prototype, "View_ShaoZhu_Fashion");
