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
var Item_YiShouTF_UpLv = (function (_super) {
    __extends(Item_YiShouTF_UpLv, _super);
    function Item_YiShouTF_UpLv() {
        var _this = _super.call(this) || this;
        _this.equipArr = [];
        _this.selectIndex = 0;
        return _this;
    }
    Item_YiShouTF_UpLv.createInstance = function () {
        return (fairygui.UIPackage.createObject("YiShouLu", "Item_YiShouTF_UpLv"));
    };
    Item_YiShouTF_UpLv.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.equipArr = [self["grid0"], self["grid1"], self["grid2"], self["grid3"]];
        self.list.callbackThisObj = self;
        self.list.itemRenderer = self.renderHandler;
    };
    Item_YiShouTF_UpLv.prototype.initView = function () {
    };
    Item_YiShouTF_UpLv.prototype.renderHandler = function (index, grid) {
        var self = this;
        grid.choose(false);
        grid.setTFVo(Model_YiShouLu.dataArr[index]);
    };
    Item_YiShouTF_UpLv.prototype.updateShow = function () {
        var self = this;
        for (var i = 0; i < self.list._children.length; i++) {
            var grid = self.list._children[i];
            if (grid.vo.cfg.tianfu == 1) {
                if (self.selectIndex == 0) {
                    grid.checkNotice(Model_YiShouLu.checkTFLvYiShouNotice(Model_YiShouLu.dataArr[i]));
                }
                else {
                    grid.checkNotice(Model_YiShouLu.checkTFColorYiShouNotice(Model_YiShouLu.dataArr[i]));
                }
            }
            else {
                grid.checkNotice(false);
            }
        }
        if (!self.curYiShou) {
            self.curYiShou = self.list._children[0];
            self.curYiShou.choose(true);
        }
        var vo = self.curYiShou.vo;
        for (var i = 0; i < self.equipArr.length; i++) {
            if (i < vo.equipArr.length) {
                self.equipArr[i].setShowImg(true);
                self.equipArr[i].touchable = true;
                self.equipArr[i].setVo(vo.equipArr[i], self.selectIndex);
                if (self.selectIndex == 0) {
                    self.equipArr[i].checkNotice(Model_YiShouLu.checkTFLvGridNotice(vo, vo.equipArr[i]));
                }
                else {
                    self.equipArr[i].checkNotice(Model_YiShouLu.checkTFColorGridNotice(vo, vo.equipArr[i]));
                }
            }
            else {
                self.equipArr[i].setVo(null, self.selectIndex);
                self.equipArr[i].touchable = false;
            }
        }
        if (self.selectIndex == 1) {
            self.updateColorGrid();
        }
        else {
            self.updateLevelGrid();
        }
        self.updateSkillShow();
    };
    Item_YiShouTF_UpLv.prototype.updateColorGrid = function () {
        var self = this;
        var vo = self.curYiShou.vo;
        if (!self.curEquip) {
            self.equipArr[0].setChoose(true);
            self.curEquip = self.equipArr[0];
        }
        self.labUp.text = "升品属性";
        var curVo = self.curEquip.vo;
        if (curVo.colorcfg.xyp > 0) {
            self.gridGroup.visible = true;
            self.maxGroup.visible = self.curGrid0.visible = false;
            self.curGrid.setVo(curVo, self.selectIndex);
            var nextVo = Vo_YiShouEquip.create(curVo.cfg.id);
            nextVo.jie = curVo.jie;
            nextVo.level = curVo.level;
            nextVo.setColor(curVo.colorcfg.xyp);
            self.nextGrid.setVo(nextVo, self.selectIndex);
            var curcfg = curVo.colorcfg;
            var nextcfg = Config.ystfsp_752[curVo.colorcfg.xyp];
            if (curVo.level % 1000 == 0) {
                self.labAttrMax.visible = self.upGroup.visible = false;
                self.attGroup.visible = self.promptLb.visible = true;
                self.promptLb.text = ConfigHelp.reTxt("需激活" + curVo.cfg.mingzi);
                self.labAttrCur.text = ConfigHelp.attrString(JSON.parse(curcfg.sx), "+", Color.getColorStr(1), Color.getColorStr(1));
                self.labAttrNext.text = ConfigHelp.attrString(JSON.parse(nextcfg.sx), "+", Color.getColorStr(2), Color.getColorStr(2));
            }
            else if (curVo.colorcfg.zl == 0) {
                self.promptLb.visible = self.attGroup.visible = false;
                self.upGroup.visible = self.labAttrMax.visible = true;
                self.labAttrMax.text = ConfigHelp.attrString(JSON.parse(nextcfg.sx), "+", Color.getColorStr(1), Color.getColorStr(2));
            }
            else {
                if (curVo.levelcfg.power == 0) {
                    self.upGroup.visible = false;
                    self.promptLb.visible = true;
                    self.promptLb.text = "需激活当前天赋装备";
                }
                else {
                    self.upGroup.visible = true;
                    self.promptLb.visible = false;
                }
                self.attGroup.visible = true;
                self.labAttrMax.visible = false;
                self.labAttrCur.text = ConfigHelp.attrString(JSON.parse(curcfg.sx), "+", Color.getColorStr(1), Color.getColorStr(1));
                self.labAttrNext.text = ConfigHelp.attrString(JSON.parse(nextcfg.sx), "+", Color.getColorStr(2), Color.getColorStr(2));
            }
            var costArr = ConfigHelp.makeItemListArr(JSON.parse(curcfg.xh));
            var count = Model_Bag.getItemCount(costArr[0].id);
            self.labNeedName.text = costArr[0].name;
            self.labNeedName.color = costArr[0].qColor;
            self.boxNeed.setImgUrl(costArr[0].icon);
            self.boxNeed.setLb(count, costArr[0].count);
            self.btnOnekey.checkNotice = count >= costArr[0].count;
            self.costVo = costArr[0];
        }
        else {
            self.maxGroup.visible = self.labAttrMax.visible = self.curGrid0.visible = true;
            self.promptLb.visible = self.upGroup.visible = self.attGroup.visible = self.gridGroup.visible = false;
            self.curGrid0.setVo(curVo, self.selectIndex);
            var curcfg = curVo.colorcfg;
            self.labAttrMax.text = ConfigHelp.attrString(JSON.parse(curcfg.sx), "+", Color.getColorStr(1), Color.getColorStr(2));
            self.maxLb.text = "已满品";
        }
        self.labPower.text = curVo.colorcfg.zl + "";
        self.btnOnekey.text = "升品";
    };
    Item_YiShouTF_UpLv.prototype.updateLevelGrid = function () {
        var self = this;
        var vo = self.curYiShou.vo;
        self.gridGroup.visible = false;
        self.curGrid0.visible = true;
        self.labUp.text = "升级属性";
        if (!self.curEquip) {
            self.equipArr[0].setChoose(true);
            self.curEquip = self.equipArr[0];
        }
        var curVo = self.curEquip.vo;
        self.curGrid0.setVo(curVo, self.selectIndex);
        var curcfg = curVo.levelcfg;
        self.labPower.text = curcfg.power + "";
        self.promptLb.visible = false;
        if (curcfg.xj > 0) {
            self.attGroup.visible = self.curGrid0.visible = true;
            self.maxGroup.visible = self.labAttrMax.visible = self.gridGroup.visible = false;
            var nextcfg = Config.ystfsj_752[curcfg.xj];
            self.labAttrCur.text = ConfigHelp.attrString(JSON.parse(curcfg.attr), "+", Color.getColorStr(1), Color.getColorStr(1));
            self.labAttrNext.text = ConfigHelp.attrString(JSON.parse(nextcfg.attr), "+", Color.getColorStr(2), Color.getColorStr(2));
            if (vo.lvUpId % 1000 == 0) {
                self.upGroup.visible = false;
                self.promptLb.visible = true;
                self.promptLb.text = ConfigHelp.reTxt("需激活异兽" + vo.cfg.mingzi);
            }
            else if (nextcfg.tj > vo.skillLv % 1000) {
                var skillcfg = Config.ystf_752[vo.skillLv];
                self.upGroup.visible = false;
                self.promptLb.visible = true;
                self.promptLb.text = ConfigHelp.reTxt("天赋·{0}达到{1}级可继续升级", skillcfg.mz, nextcfg.tj);
            }
            else {
                var itemVo = void 0;
                if (curcfg.power == 0) {
                    self.labAttrMax.visible = true;
                    self.attGroup.visible = false;
                    self.labAttrMax.text = ConfigHelp.attrString(JSON.parse(nextcfg.attr), "+", Color.getColorStr(1), Color.getColorStr(2));
                }
                self.upGroup.visible = true;
                if (curcfg.jinjie) {
                    itemVo = VoItem.create(curVo.cfg.daoju);
                    itemVo.count = JSON.parse(curcfg.xiaohao)[0][2];
                    if (curcfg.power <= 0) {
                        self.btnOnekey.text = "激活";
                    }
                    else {
                        self.btnOnekey.text = "升阶";
                    }
                }
                else {
                    itemVo = ConfigHelp.makeItemListArr(JSON.parse(curcfg.xiaohao))[0];
                    self.btnOnekey.text = "升级";
                }
                var count = Model_Bag.getItemCount(itemVo.id);
                self.labNeedName.text = itemVo.name;
                self.labNeedName.color = itemVo.qColor;
                self.boxNeed.setImgUrl(itemVo.icon);
                self.boxNeed.setLb(count, itemVo.count);
                self.btnOnekey.checkNotice = count >= itemVo.count;
                self.costVo = itemVo;
            }
        }
        else {
            self.maxGroup.visible = self.labAttrMax.visible = self.curGrid0.visible = true;
            self.upGroup.visible = self.attGroup.visible = self.gridGroup.visible = false;
            self.labAttrMax.text = ConfigHelp.attrString(JSON.parse(curcfg.attr), "+", Color.getColorStr(1), Color.getColorStr(2));
            self.maxLb.text = "已满阶";
        }
    };
    Item_YiShouTF_UpLv.prototype.updateSkillShow = function () {
        var self = this;
        var vo = self.curYiShou.vo;
        IconUtil.setImg(self.skillIcon, Enum_Path.YISHOULU_URL + "skill" + vo.ysId + ".png");
        var cfg = Config.ystf_752[vo.skillLv];
        var nextcfg;
        self.skillName.text = cfg.mz;
        self.levelLb.text = "天赋·" + cfg.mz + "(" + vo.skillLv % 1000 + "级)";
        var skillStr = "";
        var attArr = JSON.parse(cfg.sx);
        if (cfg.xj > 0) {
            nextcfg = Config.ystf_752[cfg.xj];
            var attArr1 = JSON.parse(nextcfg.sx);
            skillStr = Vo_attr.getAttrName(attArr[0][0]) + "+" + self.getShuXing(attArr[0][0], attArr[0][1]) +
                HtmlUtil.fontNoSize("(+" + self.getShuXing(attArr1[0][0], (attArr1[0][1] - attArr[0][1])) + ")", Color.getColorStr(2));
            var index = 0;
            var tiaoJianArr = JSON.parse(cfg.tj);
            for (var i = 0; i < tiaoJianArr.length; i++) {
                var grid = self.equipArr[Math.floor(tiaoJianArr[i][0] % 10) - 1];
                if (grid.vo.level >= tiaoJianArr[i][1]) {
                    index++;
                }
            }
            self.maxLb0.visible = false;
            self.btnUp.visible = true;
            if (index >= tiaoJianArr.length) {
                self.skillNeedLb.visible = false;
                self.btnUp.checkNotice = self.btnUp.visible = true;
            }
            else {
                self.skillNeedLb.visible = true;
                self.btnUp.checkNotice = self.btnUp.visible = false;
                self.skillNeedLb.text = ConfigHelp.reTxt("所有部位达到{0}阶", Math.floor((tiaoJianArr[0][1] % 1000) / 10));
            }
        }
        else {
            self.maxLb0.visible = true;
            self.skillNeedLb.visible = self.btnUp.visible = false;
            skillStr = Vo_attr.getAttrName(attArr[0][0]) + "+" + self.getShuXing(attArr[0][0], attArr[0][1]);
        }
        switch (attArr[0][0]) {
            case 309:
                skillStr += "点";
                break;
            case 310:
                skillStr += "毫秒";
                break;
            case 311:
                skillStr += "";
                break;
            case 312:
                skillStr += "毫秒";
                break;
        }
        if (nextcfg) {
            skillStr += "\n升级属性+" + cfg.sj / 100 + "‰" + HtmlUtil.fontNoSize("(+" + (nextcfg.sj - cfg.sj) / 100 + "‰)", Color.getColorStr(2))
                + "\n升品属性+" + cfg.sp / 100 + "‰" + HtmlUtil.fontNoSize("(+" + (nextcfg.sp - cfg.sp) / 100 + "‰)", Color.getColorStr(2));
        }
        else {
            skillStr += "\n升级属性+" + cfg.sj / 100 + "‰\n升品属性+" + cfg.sp / 100 + "‰";
        }
        self.skillLb.text = skillStr;
    };
    Item_YiShouTF_UpLv.prototype.getShuXing = function (id, value) {
        var type = Config.jssx_002[id].type;
        var val = "";
        switch (type) {
            case 1:
            case 3:
                val = value + "";
                break;
            case 2:
                val = (value / 100) + "‰";
                break;
        }
        return val;
    };
    Item_YiShouTF_UpLv.prototype.onList = function (evt) {
        var self = this;
        var item = evt.itemObject;
        if (!item.vo.cfg.tianfu) {
            item.choose(false);
            ViewCommonWarn.text("暂未开放");
            return;
        }
        if (self.curYiShou.hashCode == item.hashCode)
            return;
        if (self.curYiShou)
            self.curYiShou.choose(false);
        item.choose(true);
        self.curYiShou = item;
        self.curGrid.vo = null;
        self.curGrid0.vo = null;
        if (self.curEquip)
            self.curEquip.setChoose(false);
        self.curEquip = null;
        self.updateShow();
    };
    Item_YiShouTF_UpLv.prototype.onBtnOneKey = function () {
        var self = this;
        if (self.btnOnekey.checkNotice) {
            if (self.selectIndex == 0) {
                GGlobal.modelYiShouLu.CG_YISHOUTF_EQUIP_UPLV(self.curYiShou.vo.ysId, self.curEquip.vo.cfg.id);
            }
            else {
                GGlobal.modelYiShouLu.CG_YISHOUTF_EQUIP_UPCOLOR(self.curYiShou.vo.ysId, self.curEquip.vo.cfg.id);
            }
        }
        else {
            View_CaiLiao_GetPanel.show(self.costVo);
        }
    };
    Item_YiShouTF_UpLv.prototype.OnUpSKillLv = function () {
        var self = this;
        if (self.btnUp.checkNotice) {
            GGlobal.modelYiShouLu.CG_YISHOUTF_UPSKILLLV(self.curYiShou.vo.ysId);
        }
    };
    Item_YiShouTF_UpLv.prototype.onEquip = function (evt) {
        var self = this;
        var equip = evt.target;
        if (self.curEquip && equip.data == self.curEquip.data)
            return;
        if (self.curEquip)
            self.curEquip.setChoose(false);
        equip.setChoose(true);
        self.curEquip = equip;
        if (self.selectIndex == 0) {
            self.updateLevelGrid();
        }
        else {
            self.updateColorGrid();
        }
    };
    Item_YiShouTF_UpLv.prototype.updateList = function () {
        var self = this;
        if (Model_YiShouLu.dataArr.length > 0) {
            self.list.numItems = Model_YiShouLu.dataArr.length;
            self.updateShow();
            GGlobal.control.remove(UIConst.YISHOULU, self.updateList, self);
        }
    };
    Item_YiShouTF_UpLv.prototype.openPanel = function (pData) {
        var self = this;
        self.selectIndex = pData;
        if (Model_YiShouLu.dataArr.length > 0) {
            self.list.numItems = Model_YiShouLu.dataArr.length;
            self.updateShow();
        }
        else {
            GGlobal.control.listen(UIConst.YISHOULU, self.updateList, self);
        }
        self.list.addEventListener(fairygui.ItemEvent.CLICK, self.onList, self);
        GGlobal.reddot.listen(UIConst.YISHOULU_TF, self.updateShow, self);
        self.btnOnekey.addClickListener(self.onBtnOneKey, self);
        self.btnUp.addClickListener(self.OnUpSKillLv, self);
        for (var i = 0; i < self.equipArr.length; i++) {
            self.equipArr[i].data = i;
            self.equipArr[i].addClickListener(self.onEquip, self);
        }
    };
    Item_YiShouTF_UpLv.prototype.closePanel = function (pData) {
        var self = this;
        self.list.numItems = 0;
        if (self.curGrid)
            self.curGrid.clean();
        if (self.curGrid0)
            self.curGrid0.clean();
        if (self.nextGrid)
            self.nextGrid.clean();
        if (self.curYiShou)
            self.curYiShou.clean();
        self.curYiShou = null;
        if (self.curEquip)
            self.curEquip.setChoose(false);
        self.curEquip = null;
        for (var i = 0; i < self.equipArr.length; i++) {
            self.equipArr[i].removeClickListener(self.onEquip, self);
            self.equipArr[i].clean();
        }
        self.list.removeEventListener(fairygui.ItemEvent.CLICK, self.onList, self);
        GGlobal.reddot.remove(UIConst.YISHOULU_TF, self.updateShow, self);
        self.btnOnekey.removeClickListener(self.onBtnOneKey, self);
        self.btnUp.removeClickListener(self.OnUpSKillLv, self);
        GGlobal.control.remove(UIConst.YISHOULU, self.updateList, self);
    };
    Item_YiShouTF_UpLv.URL = "ui://7y83phvnvxvaw";
    return Item_YiShouTF_UpLv;
}(fairygui.GComponent));
__reflect(Item_YiShouTF_UpLv.prototype, "Item_YiShouTF_UpLv", ["IPanel"]);
