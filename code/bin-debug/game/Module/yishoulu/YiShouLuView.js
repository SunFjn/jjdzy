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
/**
 * 异兽录主界面
 */
var YiShouLuView = (function (_super) {
    __extends(YiShouLuView, _super);
    function YiShouLuView() {
        return _super.call(this) || this;
    }
    YiShouLuView.createInstance = function () {
        return (fairygui.UIPackage.createObject("YiShouLu", "YiShouLuView"));
    };
    YiShouLuView.prototype.initView = function (pParent) {
        this._viewParent = pParent;
        this.addRelation(this._viewParent, fairygui.RelationType.Size);
    };
    YiShouLuView.prototype.openPanel = function (pData) {
        this.onShown();
    };
    YiShouLuView.prototype.closePanel = function (pData) {
        this.onHide();
    };
    YiShouLuView.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
    };
    YiShouLuView.prototype.onShown = function () {
        var self = this;
        IconUtil.setImg(self.backImg, Enum_Path.YISHOULU_URL + "back_7120.png");
        self.gridArr = [];
        for (var i = 0; i < 8; i++) {
            self.gridArr.push(self["item" + i]);
            self.gridArr[i].name = "" + i;
            self.gridArr[i].choose(false);
        }
        self.vres1.setType(0);
        self.vres2.setType(0);
        self.addListen();
    };
    YiShouLuView.prototype.onHide = function () {
        var self = this;
        IconUtil.setImg(self.backImg, null);
        self.removeListen();
        self.selectGrid = null;
    };
    /**
     * 添加事件
     */
    YiShouLuView.prototype.addListen = function () {
        var self = this;
        for (var i = 0; i < 8; i++) {
            self.gridArr[i].addEventListener(egret.TouchEvent.TOUCH_TAP, self.onSelectGrid, self);
        }
        if (Model_YiShouLu.dataArr.length > 0) {
            self.updatePage();
        }
        self.activateBtn.addClickListener(this.onActivate, this);
        self.lvUpBtn.addClickListener(this.onLvUp, this);
        self.oneKeyLvUpBtn.addClickListener(this.onOneKeyLvUp, this);
        self.jinjieBtn.addClickListener(this.onJinJie, this);
        self.showBt.addClickListener(self.showHandler, self);
        GGlobal.control.listen(UIConst.YISHOULU, self.updatePage, self);
    };
    /**
     * 删除事件
     */
    YiShouLuView.prototype.removeListen = function () {
        var self = this;
        for (var i = 0; i < 8; i++) {
            self.gridArr[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onSelectGrid, self);
        }
        self.activateBtn.removeClickListener(this.onActivate, this);
        self.lvUpBtn.removeClickListener(this.onLvUp, this);
        self.oneKeyLvUpBtn.removeClickListener(this.onOneKeyLvUp, this);
        self.jinjieBtn.removeClickListener(this.onJinJie, this);
        self.showBt.removeClickListener(self.showHandler, self);
        GGlobal.control.remove(UIConst.YISHOULU, self.updatePage, self);
    };
    /**
     * 更新数据
     */
    YiShouLuView.prototype.updatePage = function (data) {
        if (data === void 0) { data = null; }
        if (!Model_YiShouLu.dataArr || Model_YiShouLu.dataArr.length <= 0)
            return;
        var self = this;
        if (data) {
            var oldData = self.gridArr[Model_YiShouLu.index].vo;
            if (oldData.suitId != data.suitId) {
                var cfg = Config.ystz_752[data.suitId];
                var lv = cfg.lv % 1000;
                ViewCommonWarn.text("激活" + cfg.mingzi + lv + "级");
            }
        }
        for (var i = 0; i < 8; i++) {
            self.gridArr[i].setVo(Model_YiShouLu.dataArr[i], i);
        }
        if (self.selectGrid) {
            var index = Number(self.selectGrid.name);
            self.selectIndex(index);
        }
        else {
            self.selectIndex(0);
        }
    };
    YiShouLuView.prototype.onSelectGrid = function (e) {
        var self = this;
        var index = Number(e.currentTarget.name);
        if (index == parseInt(self.selectGrid.name))
            return;
        self.selectIndex(index);
    };
    /**
     * 更新某个item数据
     */
    YiShouLuView.prototype.selectIndex = function (index) {
        var self = this;
        if (self.selectGrid) {
            self.selectGrid.choose(false);
            self.selectGrid = null;
        }
        if (index < 0) {
            return;
        }
        self.selectGrid = self.gridArr[index];
        if (!self.selectGrid.vo)
            return;
        var costArr;
        var itemVo;
        IconUtil.setImg(self.iconImg, Enum_Path.PIC_URL + self.selectGrid.vo.cfg.tupian1 + ".png");
        costArr = JSON.parse(self.selectGrid.vo.cfg.jihuo);
        itemVo = VoItem.create(costArr[0][1]);
        self.nameLb.text = self.selectGrid.vo.cfg.mingzi;
        self.nameLb.color = Color.getColorInt(itemVo.quality);
        var curSuitCfg;
        var nextSuitCfg;
        self.hasActGroup.visible = false;
        self.noActGroup.visible = false;
        if (self.selectGrid.vo.suitId <= 0) {
            self.noActGroup.visible = true;
            var id = (index + 1) * 1000 + 1;
            nextSuitCfg = Config.ystz_752[id];
            self.effTitle.text = "下级效果（" + nextSuitCfg.jieshu + "）";
            self.labEffAct.text = nextSuitCfg.miaoshu;
            self.suitName.text = nextSuitCfg.mingzi;
            self.suitLv.text = "0级";
        }
        else {
            curSuitCfg = Config.ystz_752[self.selectGrid.vo.suitId];
            nextSuitCfg = Config.ystz_752[self.selectGrid.vo.suitId + 1];
            if (nextSuitCfg) {
                self.hasActGroup.visible = true;
                self.curEffTitle.text = "当前效果";
                self.labEffCur.text = curSuitCfg.miaoshu;
                self.nextEffTitle.text = "下级效果（" + nextSuitCfg.jieshu + "）";
                self.labEffNext.text = nextSuitCfg.miaoshu;
            }
            else {
                self.noActGroup.visible = true;
                curSuitCfg = Config.ystz_752[self.selectGrid.vo.suitId];
                self.effTitle.text = "当前效果（已满级）";
                self.labEffAct.text = curSuitCfg.miaoshu;
            }
            self.suitName.text = curSuitCfg.mingzi;
            self.suitLv.text = curSuitCfg.lv % (1000 * (index + 1)) + "级";
        }
        var attArr0 = [];
        var attArr1 = [];
        var curLvCfg = Config.yssj_752[self.selectGrid.vo.lvUpId];
        var nextLvCfg = Config.yssj_752[curLvCfg.next];
        self.selectGrid.choose(true);
        var count;
        if (self.selectGrid.vo.lvUpId == (100000 * (index + 1))) {
            self.c1.selectedIndex = 0;
            attArr0 = JSON.parse(nextLvCfg.attr);
            self.labAttrAct.text = ConfigHelp.attrString(attArr0, "+", Color.GREENSTR, Color.GREENSTR);
            costArr = JSON.parse(curLvCfg.jj);
            itemVo = VoItem.create(costArr[0][1]);
            count = Model_Bag.getItemCount(costArr[0][1]);
            var color = count >= costArr[0][2] ? 2 : 6;
            self.costLb.text = "消耗：" + HtmlUtil.fontNoSize(itemVo.name, Color.getColorStr(itemVo.quality)) + "x" + costArr[0][2] +
                HtmlUtil.fontNoSize("(" + count + "/" + costArr[0][2] + ")", Color.getColorStr(color));
            self.activateBtn.checkNotice = Model_YiShouLu.checkYiShouNotice(index);
        }
        else {
            if (nextLvCfg) {
                if (self.selectGrid.vo.exp >= curLvCfg.exp && curLvCfg.jj != 0) {
                    self.c1.selectedIndex = 2;
                    self.jinjieBtn.checkNotice = Model_YiShouLu.checkYiShouNotice(index);
                    costArr = JSON.parse(curLvCfg.jj);
                    itemVo = VoItem.create(costArr[0][1]);
                    self.vres2.setImgUrl(itemVo.icon);
                    count = Model_Bag.getItemCount(costArr[0][1]);
                    self.vres2.setLb(count, costArr[0][2]);
                    self.itemName1.text = itemVo.name;
                    attArr0 = JSON.parse(curLvCfg.attr);
                    self.labAttrCur1.text = ConfigHelp.attrString(attArr0, "+", Color.WHITESTR, Color.WHITESTR);
                    attArr1 = JSON.parse(nextLvCfg.attr);
                    self.labAttrNext1.text = ConfigHelp.attrString(attArr1, "+", Color.GREENSTR, Color.GREENSTR);
                }
                else {
                    self.c1.selectedIndex = 1;
                    self.expBar.max = curLvCfg.exp;
                    self.expBar.value = self.selectGrid.vo.exp;
                    self.oneKeyLvUpBtn.checkNotice = Model_YiShouLu.checkYiShouNotice(index);
                    itemVo = VoItem.create(410092);
                    self.vres1.setImgUrl(itemVo.icon);
                    count = Model_Bag.getItemCount(410092);
                    self.vres1.setCount(count);
                    self.itemName.text = itemVo.name;
                    var jie = self.selectGrid.vo.jie;
                    var lv = curLvCfg.lv % 10;
                    self.lvTxt.text = jie + "阶" + lv + "级";
                    attArr0 = JSON.parse(curLvCfg.attr);
                    self.labAttrCur.text = ConfigHelp.attrString(attArr0, "+", Color.WHITESTR, Color.WHITESTR);
                    attArr1 = JSON.parse(nextLvCfg.attr);
                    self.labAttrNext.text = ConfigHelp.attrString(attArr1, "+", Color.GREENSTR, Color.GREENSTR);
                }
            }
            else {
                self.c1.selectedIndex = 3;
                attArr0 = JSON.parse(curLvCfg.attr);
                self.labAttrMax.text = ConfigHelp.attrString(attArr0, "+", Color.GREENSTR, Color.GREENSTR);
            }
        }
        var suitPower = 0;
        if (curSuitCfg) {
            suitPower = curSuitCfg.power;
        }
        self.powerLb.text = curLvCfg.power + suitPower + "";
    };
    /**
     * 激活
     */
    YiShouLuView.prototype.onActivate = function () {
        var self = this;
        var lvCfg = Config.yssj_752[self.selectGrid.vo.lvUpId];
        var costArr = JSON.parse(lvCfg.jj);
        var count = Model_Bag.getItemCount(costArr[0][1]);
        if (count < costArr[0][2]) {
            View_CaiLiao_GetPanel.show(VoItem.create(costArr[0][1]));
            return;
        }
        GGlobal.modelYiShouLu.CG_ACTIVEORUPLV(self.selectGrid.vo.ysId, 0, self.selectGrid.index);
    };
    /**
     * 升级
     */
    YiShouLuView.prototype.onLvUp = function () {
        var count = Model_Bag.getItemCount(410092);
        if (count < 1) {
            View_CaiLiao_GetPanel.show(VoItem.create(410092));
            return;
        }
        GGlobal.modelYiShouLu.CG_ACTIVEORUPLV(this.selectGrid.vo.ysId, 1, this.selectGrid.index);
    };
    /**
     * 一键升级
     */
    YiShouLuView.prototype.onOneKeyLvUp = function () {
        var count = Model_Bag.getItemCount(410092);
        if (count < 1) {
            View_CaiLiao_GetPanel.show(VoItem.create(410092));
            return;
        }
        GGlobal.modelYiShouLu.CG_ACTIVEORUPLV(this.selectGrid.vo.ysId, 2, this.selectGrid.index);
    };
    /**
     * 进阶
     */
    YiShouLuView.prototype.onJinJie = function () {
        var self = this;
        var cfg = Config.yssj_752[self.selectGrid.vo.lvUpId];
        var costArr = JSON.parse(cfg.jj);
        var count = Model_Bag.getItemCount(costArr[0][1]);
        if (count < costArr[0][2]) {
            View_CaiLiao_GetPanel.show(VoItem.create(costArr[0][1]));
            return;
        }
        GGlobal.modelYiShouLu.CG_ACTIVEORUPLV(this.selectGrid.vo.ysId, 2, self.selectGrid.index);
    };
    /**
     * 展示
     */
    YiShouLuView.prototype.showHandler = function () {
        GGlobal.modelchat.CG_CHAT_SHOW_DATA(14, this.selectGrid.vo.cfg.id);
    };
    YiShouLuView.URL = "ui://7y83phvni1zv1";
    return YiShouLuView;
}(fairygui.GComponent));
__reflect(YiShouLuView.prototype, "YiShouLuView", ["IPanel"]);
