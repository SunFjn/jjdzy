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
var Child_ShenJian = (function (_super) {
    __extends(Child_ShenJian, _super);
    function Child_ShenJian() {
        return _super.call(this) || this;
    }
    Child_ShenJian.createInstance = function () {
        return (fairygui.UIPackage.createObject("role", "Child_BaoWu"));
    };
    Child_ShenJian.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var a = this;
        CommonManager.parseChildren(a, a);
        a.promptLb0.text = "神剑效果";
        a.list.callbackThisObj = a;
        a.list.itemRenderer = a.renderHandle;
        a.list.addEventListener(fairygui.ItemEvent.CLICK, a.itemHandler, a);
        a.drugBt.addClickListener(a.drugHandle, a);
        a.upStarBt.addClickListener(a.upStarHandler, a);
        a.useBt.addClickListener(a.equipHandle, a);
        a.showBt.addClickListener(a.showHandler, a);
        a.jueXingBt.addClickListener(a.OnJueXing, a);
    };
    Child_ShenJian.prototype.OnJueXing = function () {
        GGlobal.layerMgr.open(UIConst.JUEXING, UIConst.SHEN_JIAN);
    };
    Child_ShenJian.prototype.showHandler = function () {
        var vo = this.curGrid.vo;
        if (vo) {
            GGlobal.modelchat.CG_CHAT_SHOW_DATA(5, vo.id);
        }
    };
    Child_ShenJian.prototype.equipHandle = function () {
        var a = this;
        if (Model_ShenJian.shenJianId == a.curGrid.vo.id) {
            GGlobal.modelsj.CG_SHENJIAN_EQUIP(2, a.curGrid.vo.id);
        }
        else {
            GGlobal.modelsj.CG_SHENJIAN_EQUIP(1, a.curGrid.vo.id);
        }
    };
    Child_ShenJian.prototype.drugHandle = function () {
        GGlobal.layerMgr.open(UIConst.SHEN_JIAN_DRUG);
    };
    Child_ShenJian.prototype.upStarHandler = function () {
        var a = this;
        var vo = a.curGrid.vo;
        if (a.upStarBt.checkNotice) {
            if (vo.starLv <= 0) {
                GGlobal.modelsj.CG_SHENJIAN_JIHUO(vo.id);
            }
            else {
                GGlobal.modelsj.CG_SHENJIAN_UPSTAR(vo.id);
            }
        }
        else {
            if (vo.starLv >= vo.starMax) {
                ViewCommonWarn.text("已满星");
            }
            else {
                View_CaiLiao_GetPanel.show(this.costItem);
            }
        }
    };
    Child_ShenJian.prototype.renderHandle = function (index, obj) {
        var a = this;
        var grid = obj;
        grid.vo = Model_ShenJian.shenjianArr[index];
        if (Model_GlobalMsg.selectID > 0 && Model_GlobalMsg.selectID == grid.vo.id) {
            if (a.curGrid)
                a.curGrid.choose = false;
            grid.choose = true;
            a.curGrid = grid;
            a.curVo = grid.vo;
        }
        else if (a.curVo && a.curVo.id == grid.vo.id) {
            grid.choose = true;
            a.curGrid = grid;
            a.curVo = grid.vo;
        }
        Model_ShenJian.drugMax += grid.vo.starLv * grid.vo.drugMax;
        grid.checkNotice = Model_ShenJian.checkUpStarGridNotice(grid.vo);
    };
    Child_ShenJian.prototype.itemHandler = function (event) {
        var a = this;
        var grid = event.itemObject;
        if (a.curGrid && grid.vo.id == a.curGrid.vo.id)
            return;
        if (a.curGrid)
            a.curGrid.choose = false;
        grid.choose = true;
        a.curGrid = grid;
        a.curVo = grid.vo;
        Model_GlobalMsg.selectID = 0;
        a.updateShow();
    };
    Child_ShenJian.prototype.onOpen = function () {
        var a = this;
        a.updateList();
        GGlobal.reddot.listen(ReddotEvent.CHECK_SHENJIAN, a.updateList, a);
        GGlobal.reddot.listen(UIConst.JUEXING, a.updateJuexing, a);
    };
    Child_ShenJian.prototype.onClose = function () {
        var a = this;
        a.disposePanel();
        GGlobal.reddot.remove(ReddotEvent.CHECK_SHENJIAN, a.updateList, a);
        GGlobal.reddot.remove(UIConst.JUEXING, a.updateJuexing, a);
    };
    Child_ShenJian.prototype.updateList = function () {
        var a = this;
        Model_ShenJian.drugMax = 0;
        var arr = Model_ShenJian.shenjianArr;
        for (var i = 0; i < arr.length; i++) {
            var vo = arr[i];
            if (vo.id == Model_ShenJian.shenJianId) {
                vo.state = 0;
            }
            else if (vo.starLv <= 0 && Model_ShenJian.checkUpStarGridNotice(vo)) {
                vo.state = 1;
            }
            else if (vo.starLv > 0) {
                vo.state = 2;
            }
            else {
                vo.state = 3;
            }
        }
        Model_ShenJian.shenjianArr.sort(Model_ShenJian.sortShenJian);
        if (a.curGrid)
            a.curGrid.choose = false;
        a.curGrid = null;
        a.list.numItems = arr.length;
        a.updateShow();
    };
    Child_ShenJian.prototype.updateShow = function () {
        var self = this;
        var cf = Config.swordstar_216;
        if (!self.curVo) {
            var grid = self.list._children[0];
            grid.choose = true;
            self.curGrid = grid;
            self.curVo = grid.vo;
        }
        var vo = self.curVo;
        self.nameLb.text = vo.name;
        self.nameLb.color = Color.getColorInt(vo.quality);
        IconUtil.setImg(self.bwIcon, Enum_Path.PIC_URL + vo.id + ".png");
        if (self.bwEff) {
            EffectMgr.instance.removeEff(self.bwEff);
            self.bwEff = null;
        }
        if (vo.cfg.tptx > 0) {
            if (!self.bwEff) {
                self.bwEff = EffectMgr.addEff("uieff/" + vo.cfg.tptx, self.bwIcon.displayObject, self.bwIcon.width / 2, self.bwIcon.height / 2, 1000, -1, true);
            }
        }
        var starStr = "";
        for (var i = 0; i < 10; i++) {
            var num = Math.floor(vo.starLv / 10);
            var num1 = vo.starLv % 10;
            if (i < num1) {
                starStr += "" + (num + 1);
            }
            else {
                starStr += "" + num;
            }
        }
        self.starLb.text = starStr;
        self.lbTip.text = "可提升神剑属性丹吞噬上限：" + HtmlUtil.fontNoSize(vo.drugMax * (vo.starLv > 0 ? vo.starLv : 1) + "", Color.getColorStr(5));
        self.powerLb.text = (vo.starLv > 0 ? cf[vo.cfg.starid * 1000 + vo.starLv].power : 0) + "";
        self.skillDes.text = vo.miaoshu;
        var attstr0 = "";
        var attstr1 = "";
        self.attGroup.visible = false;
        self.showAtt.visible = true;
        self.maxGroup.visible = false;
        self.upStarGroup.visible = true;
        if (vo.starLv <= 0) {
            attstr0 = ConfigHelp.attrString(JSON.parse(cf[vo.cfg.starid * 1000 + 1].attr), "+", Color.getColorStr(1), Color.getColorStr(2));
            self.updateCostShow();
            self.showAtt.text = attstr0;
            self.starPowerLb.text = cf[vo.cfg.starid * 1000 + 1].power + "";
        }
        else if (vo.starLv < vo.starMax) {
            attstr0 = ConfigHelp.attrString(JSON.parse(cf[vo.cfg.starid * 1000 + vo.starLv].attr), "+", Color.getColorStr(1), Color.getColorStr(1));
            attstr1 = ConfigHelp.attrString(JSON.parse(cf[cf[vo.cfg.starid * 1000 + vo.starLv].next].attr), "+", Color.getColorStr(2), Color.getColorStr(2));
            self.updateCostShow();
            self.curAtt.text = attstr0;
            self.nextAtt.text = attstr1;
            self.attGroup.visible = true;
            self.showAtt.visible = false;
            self.starPowerLb.text = (cf[cf[vo.cfg.starid * 1000 + vo.starLv].next].power - cf[vo.cfg.starid * 1000 + vo.starLv].power) + "";
        }
        else {
            attstr0 = ConfigHelp.attrString(JSON.parse(cf[vo.cfg.starid * 1000 + vo.starLv].attr), "+", Color.getColorStr(1), Color.getColorStr(2));
            self.upStarBt.checkNotice = false;
            self.showAtt.text = attstr0;
            self.maxGroup.visible = true;
            self.upStarGroup.visible = false;
        }
        self.drugCount.text = Model_ShenJian.drugCount + "/" + Model_ShenJian.drugMax;
        var count = Model_Bag.getItemCount(Model_ShenJian.drugId);
        if (count > 0 && Model_ShenJian.drugCount < Model_ShenJian.drugMax) {
            self.drugBt.checkNotice = true;
        }
        else {
            self.drugBt.checkNotice = false;
        }
        self.showBt.visible = vo.starLv > 0;
        self.useImg.visible = false;
        if (vo.starLv > 0) {
            if (Model_ShenJian.shenJianId == vo.id) {
                self.useBt.icon = "ui://jvxpx9emdna53co";
            }
            else {
                self.useBt.icon = "ui://jvxpx9emdna53cp";
            }
            self.useBt.visible = true;
            self.upStarBt.text = "升星";
        }
        else {
            self.upStarBt.text = "激活";
            self.useBt.visible = false;
        }
        self.updateJuexing();
    };
    Child_ShenJian.prototype.updateJuexing = function () {
        var self = this;
        self.jueXingBt.visible = Model_JueXing.checkOpenJuexing(UIConst.SHEN_JIAN);
        self.jueXingBt.checkNotice = GGlobal.reddot.checkCondition(UIConst.JUEXING, 2);
    };
    Child_ShenJian.prototype.updateCostShow = function () {
        var a = this;
        var vo = a.curGrid.vo;
        this.costItem = VoItem.create(vo.costArr[0][1]);
        a.upStarGroup.visible = true;
        var count = Model_Bag.getItemCount(this.costItem.id);
        if (count >= vo.costArr[0][2]) {
            a.upStarBt.checkNotice = true;
            a.costLb.text = "消耗：" + HtmlUtil.fontNoSize(this.costItem.name, Color.getColorStr(this.costItem.quality)) + "x" + vo.costArr[0][2] +
                HtmlUtil.fontNoSize("(" + count + "/" + vo.costArr[0][2] + ")", Color.getColorStr(2));
        }
        else {
            a.upStarBt.checkNotice = false;
            a.costLb.text = "消耗：" + HtmlUtil.fontNoSize(this.costItem.name, Color.getColorStr(this.costItem.quality)) + "x" + vo.costArr[0][2] +
                HtmlUtil.fontNoSize("(" + count + "/" + vo.costArr[0][2] + ")", Color.getColorStr(6));
        }
    };
    Child_ShenJian.prototype.disposePanel = function () {
        var self = this;
        if (self.curGrid)
            self.curGrid.choose = false;
        self.curGrid = null;
        self.curVo = null;
        Model_GlobalMsg.selectID = 0;
        self.list.numItems = 0;
        IconUtil.setImg(self.bwIcon, null);
        if (self.bwEff) {
            EffectMgr.instance.removeEff(self.bwEff);
            self.bwEff = null;
        }
    };
    Child_ShenJian.prototype.check_select_grid = function (value) {
        if (!this.curGrid)
            return false;
        var vo = this.curGrid.vo;
        var itemVo = VoItem.create(vo.costArr[0][1]);
        var count = Model_Bag.getItemCount(itemVo.id);
        if (count >= vo.costArr[0][2] && vo.starLv <= 0 && vo.quality >= value) {
            return true;
        }
        return false;
    };
    Child_ShenJian.prototype.guide_shenjian_select = function (step) {
        for (var i = 0; i < this.list._children.length; i++) {
            var grid = this.list._children[i];
            var vo = grid.vo;
            var itemVo = VoItem.create(vo.costArr[0][1]);
            var count = Model_Bag.getItemCount(itemVo.id);
            if (count >= vo.costArr[0][2] && vo.starLv <= 0 && vo.quality >= step.arg) {
                GuideStepManager.instance.showGuide(grid, grid.width / 2, grid.height / 2);
                GuideStepManager.instance.showGuide1(step.source.index, grid, grid.width, grid.height / 2, 0, 50, -35, true);
                break;
            }
        }
    };
    Child_ShenJian.prototype.guide_shenjian_upstar = function (step) {
        var self = this;
        GuideStepManager.instance.showGuide(self.upStarBt, self.upStarBt.width / 2, self.upStarBt.height / 2);
        GuideStepManager.instance.showGuide1(step.source.index, self.upStarBt, self.upStarBt.width / 2, 0, -90, -106, -100);
    };
    Child_ShenJian.URL = "ui://3tzqotadqqvu23";
    return Child_ShenJian;
}(fairygui.GComponent));
__reflect(Child_ShenJian.prototype, "Child_ShenJian");
