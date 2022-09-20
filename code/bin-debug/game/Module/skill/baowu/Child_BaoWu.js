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
var Child_BaoWu = (function (_super) {
    __extends(Child_BaoWu, _super);
    function Child_BaoWu() {
        return _super.call(this) || this;
    }
    Child_BaoWu.createInstance = function () {
        return (fairygui.UIPackage.createObject("role", "Child_BaoWu"));
    };
    Child_BaoWu.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var a = this;
        CommonManager.parseChildren(a, a);
        a.promptLb0.text = "宝物效果";
        a.list.callbackThisObj = this;
        a.list.itemRenderer = a.renderHandle;
        a.list.addEventListener(fairygui.ItemEvent.CLICK, a.itemHandler, a);
        a.t0 = a.getTransition("t0");
        a.useBt.addClickListener(a.useHandle, a);
        a.drugBt.addClickListener(a.drugHandle, a);
        a.upStarBt.addClickListener(a.upStarHandler, a);
        a.showBt.addClickListener(a.showHandler, a);
        a.jueXingBt.addClickListener(a.OnJueXing, a);
    };
    Child_BaoWu.prototype.OnJueXing = function () {
        GGlobal.layerMgr.open(UIConst.JUEXING, UIConst.BAOWU);
    };
    Child_BaoWu.prototype.showHandler = function () {
        if (this.curVo) {
            GGlobal.modelchat.CG_CHAT_SHOW_DATA(2, this.curVo.id);
        }
    };
    Child_BaoWu.prototype.upStarHandler = function () {
        if (this.upStarBt.checkNotice) {
            var vo = this.curVo;
            if (vo.state == 2) {
                GGlobal.modelbw.CG_BAOWU_JIHUO(vo.id);
            }
            else {
                GGlobal.modelbw.CG_BAOWU_UPSTAR(vo.id);
            }
        }
        else {
            if (this.curVo.starLv >= this.curVo.starMax) {
                GGlobal.layerMgr.open(UIConst.JUEXING, UIConst.BAOWU);
            }
            else {
                View_CaiLiao_GetPanel.show(this.costItem);
            }
        }
    };
    Child_BaoWu.prototype.drugHandle = function () {
        GGlobal.layerMgr.open(UIConst.BAOWU_DRUG);
    };
    Child_BaoWu.prototype.useHandle = function () {
        if (this.curVo) {
            GGlobal.layerMgr.open(UIConst.BAOWU_EQUIP, this.curVo);
        }
    };
    Child_BaoWu.prototype.itemHandler = function (event) {
        var a = this;
        var grid = event.itemObject;
        if (a.curVo && a.curVo.id == grid.vo.id)
            return;
        if (a.curGrid)
            a.curGrid.choose = false;
        grid.choose = true;
        a.curVo = grid.vo;
        a.curGrid = grid;
        Model_GlobalMsg.selectID = 0;
        a.updateShow();
    };
    Child_BaoWu.prototype.renderHandle = function (index, obj) {
        var a = this;
        var grid = obj;
        var vo = Model_BaoWu.baowuArr[index];
        grid.vo = vo;
        if (Model_GlobalMsg.selectID > 0 && vo.id == Model_GlobalMsg.selectID) {
            grid.choose = true;
            a.curVo = vo;
            a.curGrid = grid;
        }
        else if (!a.curVo && index == 0 && Model_GlobalMsg.selectID <= 0) {
            grid.choose = true;
            a.curVo = vo;
            a.curGrid = grid;
        }
        else if (a.curVo && a.curVo.id == vo.id) {
            grid.choose = true;
            a.curVo = vo;
            a.curGrid = grid;
        }
        else {
            grid.choose = false;
        }
        grid.checkNotice = Model_BaoWu.checkUpStarGridNotice(vo);
    };
    Child_BaoWu.prototype.updateShow = function () {
        var a = this;
        var cf = Config.baostar_214;
        if (!a.curVo)
            return;
        var vo = Child_BaoWu.nickVo = a.curVo;
        a.nameLb.text = vo.name;
        a.nameLb.color = Color.getColorInt(vo.quality);
        IconUtil.setImg(a.bwIcon, Enum_Path.PIC_URL + vo.imageID + ".png");
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
        a.starLb.text = starStr;
        a.skillDes.text = SkillUtil.getSkillDes(vo.skillVo);
        a.lbTip.text = "可提升宝物属性丹吞噬上限：" + HtmlUtil.fontNoSize(vo.drugMax * (vo.starLv > 0 ? vo.starLv : 1) + "", Color.getColorStr(5));
        var attstr0 = "";
        var attstr1 = "";
        this.attGroup.visible = false;
        this.showAtt.visible = true;
        this.maxGroup.visible = false;
        this.upStarGroup.visible = true;
        if (vo.starLv == 0) {
            attstr1 = ConfigHelp.attrString(JSON.parse(cf[vo.quality * 1000 + 1].attr), "+", Color.getColorStr(1), Color.getColorStr(2));
            a.showAtt.text = attstr1;
            a.updateCostShow();
            a.starPowerLb.text = cf[vo.quality * 1000 + 1].power + "";
        }
        else if (vo.starLv < vo.starMax) {
            attstr0 = ConfigHelp.attrString(JSON.parse(cf[vo.quality * 1000 + vo.starLv].attr), "+", Color.getColorStr(1), Color.getColorStr(1));
            attstr1 = ConfigHelp.attrString(JSON.parse(cf[cf[vo.quality * 1000 + vo.starLv].next].attr), "+", Color.getColorStr(2), Color.getColorStr(2));
            a.updateCostShow();
            a.curAtt.text = attstr0;
            a.nextAtt.text = attstr1;
            a.attGroup.visible = true;
            a.showAtt.visible = false;
            a.starPowerLb.text = (cf[cf[vo.quality * 1000 + vo.starLv].next].power - cf[vo.quality * 1000 + vo.starLv].power) + "";
        }
        else {
            attstr0 = ConfigHelp.attrString(JSON.parse(cf[vo.quality * 1000 + vo.starLv].attr), "+", Color.getColorStr(1), Color.getColorStr(2));
            a.upStarBt.checkNotice = false;
            a.showAtt.text = attstr0;
            a.maxGroup.visible = true;
            a.upStarGroup.visible = false;
        }
        a.useImg.visible = false;
        a.useBt.visible = false;
        a.showBt.visible = vo.starLv > 0;
        if (vo.starLv > 0) {
            a.upStarBt.text = "升星";
            if ((Model_BaoWu.equipBWIDArr[0] > 0 && Model_BaoWu.equipBWIDArr[0] == vo.id) || (Model_BaoWu.equipBWIDArr[1] > 0 && Model_BaoWu.equipBWIDArr[1] == vo.id)) {
                a.useImg.visible = true;
            }
            else {
                a.useBt.visible = true;
                a.useBt.checkNotice = Model_BaoWu.checkChangeBtNotice(0) || Model_BaoWu.checkChangeBtNotice(1);
            }
        }
        else {
            a.upStarBt.text = "激活";
        }
        a.powerLb.text = (vo.starLv > 0 ? cf[vo.quality * 1000 + vo.starLv].power : 0) + "";
    };
    Child_BaoWu.prototype.updateCostShow = function () {
        var vo = this.curVo;
        this.costItem = VoItem.create(vo.costArr[0][1]);
        var count = Model_Bag.getItemCount(this.costItem.id);
        if (count >= vo.costArr[0][2]) {
            this.upStarBt.checkNotice = true;
            this.costLb.text = "消耗：" + HtmlUtil.fontNoSize(this.costItem.name, Color.getColorStr(this.costItem.quality)) + "x" + vo.costArr[0][2] +
                HtmlUtil.fontNoSize("(" + count + "/" + vo.costArr[0][2] + ")", Color.getColorStr(2));
        }
        else {
            this.upStarBt.checkNotice = false;
            this.costLb.text = "消耗：" + HtmlUtil.fontNoSize(this.costItem.name, Color.getColorStr(this.costItem.quality)) + "x" + vo.costArr[0][2] +
                HtmlUtil.fontNoSize("(" + count + "/" + vo.costArr[0][2] + ")", Color.getColorStr(6));
        }
    };
    Child_BaoWu.prototype.show = function () {
        var a = this;
        for (var i = 0; i < Model_BaoWu.baowuArr.length; i++) {
            var vo = Model_BaoWu.baowuArr[i];
            if (vo.id == Model_BaoWu.equipBWIDArr[0]) {
                vo.state = 0;
            }
            else if (vo.id == Model_BaoWu.equipBWIDArr[1]) {
                vo.state = 1;
            }
            else if (vo.starLv <= 0) {
                vo.state = Model_BaoWu.checkUpStarGridNotice(vo) ? 2 : 4;
            }
            else {
                vo.state = 3;
            }
        }
        Model_BaoWu.baowuArr.sort(Model_BaoWu.sortBaoWu);
        a.list.numItems = Model_BaoWu.baowuArr.length;
        if (Model_GlobalMsg.selectID > 0) {
            for (var i = 0; i < Model_BaoWu.baowuArr.length; i++) {
                if (Model_BaoWu.baowuArr[i].id == Model_GlobalMsg.selectID) {
                    a.list.scrollToView(i, false);
                    break;
                }
            }
        }
        a.drugCount.text = Model_BaoWu.drugNum + "/" + Model_BaoWu.drugMax;
        var count = Model_Bag.getItemCount(Model_BaoWu.drugId);
        if (count > 0 && Model_BaoWu.drugNum < Model_BaoWu.drugMax) {
            a.drugBt.checkNotice = true;
        }
        else {
            a.drugBt.checkNotice = false;
        }
        a.updateShow();
        a.updateJuexing();
    };
    Child_BaoWu.prototype.updateJuexing = function () {
        var self = this;
        self.jueXingBt.visible = Model_JueXing.checkOpenJuexing(UIConst.BAOWU);
        self.jueXingBt.checkNotice = GGlobal.reddot.checkCondition(UIConst.JUEXING, 1);
    };
    Child_BaoWu.prototype.open = function () {
        var a = this;
        if (!(Model_player.taskId <= Config.xtcs_004[2801].num || Model_player.taskId >= Config.xtcs_004[2806].num)) {
            a.list.setVirtual();
        }
        a.show();
        GGlobal.reddot.listen(ReddotEvent.CHECK_BAOWU, a.show, this);
        GGlobal.reddot.listen(UIConst.JUEXING, a.updateJuexing, this);
    };
    Child_BaoWu.prototype.close = function () {
        var a = this;
        Model_GlobalMsg.selectID = 0;
        GGlobal.reddot.remove(ReddotEvent.CHECK_BAOWU, a.show, a);
        GGlobal.reddot.remove(UIConst.JUEXING, a.updateJuexing, a);
        a.disposePanel();
    };
    Child_BaoWu.prototype.disposePanel = function () {
        var a = this;
        if (a.curGrid)
            a.curGrid.choose = false;
        a.curGrid = null;
        a.curVo = null;
        a.list.numItems = 0;
        IconUtil.setImg(a.bwIcon, null);
    };
    Child_BaoWu.prototype.guide_baowu_select = function (step) {
        for (var i = 0; i < this.list._children.length; i++) {
            var grid = this.list._children[i];
            var vo = grid.vo;
            if (vo.state == 2) {
                GuideStepManager.instance.showGuide(grid, grid.width / 2, grid.height / 2);
                GuideStepManager.instance.showGuide1(step.source.index, grid, grid.width, grid.height / 2, 0, 50, -35, true);
                break;
            }
        }
    };
    Child_BaoWu.prototype.check_select_grid = function () {
        if (!this.curVo)
            return false;
        var vo = this.curVo;
        if (vo.state == 2) {
            return true;
        }
        return false;
    };
    Child_BaoWu.prototype.guide_baowu_upstar = function (step) {
        var self = this;
        GuideStepManager.instance.showGuide(self.upStarBt, self.upStarBt.width / 2, self.upStarBt.height / 2);
        GuideStepManager.instance.showGuide1(step.source.index, self.upStarBt, self.upStarBt.width / 2, 0, -90, -106, -100);
    };
    Child_BaoWu.prototype.check_use_grid = function () {
        if (!this.curVo)
            return false;
        var vo = this.curVo;
        return vo.state == 3;
    };
    Child_BaoWu.prototype.guide_use_grid = function (step) {
        var grid = this.list._children[step.arg];
        if (grid) {
            GuideStepManager.instance.showGuide(grid, grid.width / 2, grid.height / 2);
            GuideStepManager.instance.showGuide1(step.source.index, grid, grid.width, grid.height / 2, 0, 50, -35, true);
        }
    };
    Child_BaoWu.prototype.check_baowu_useBt = function () {
        return this.useBt.visible;
    };
    Child_BaoWu.prototype.guide_baowu_useBt = function (step) {
        var self = this;
        GuideStepManager.instance.showGuide(self.useBt, self.useBt.width / 2, self.useBt.height / 2);
        GuideStepManager.instance.showGuide1(step.source.index, self.useBt, 0, self.useBt.height / 2, 180, -250, -35);
    };
    Child_BaoWu.URL = "ui://3tzqotadqqvu23";
    return Child_BaoWu;
}(fairygui.GComponent));
__reflect(Child_BaoWu.prototype, "Child_BaoWu");
