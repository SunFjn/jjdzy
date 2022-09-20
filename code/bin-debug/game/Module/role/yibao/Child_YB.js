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
var Child_YB = (function (_super) {
    __extends(Child_YB, _super);
    function Child_YB() {
        return _super.call(this) || this;
    }
    Child_YB.createInstance = function () {
        return (fairygui.UIPackage.createObject("role", "Child_BaoWu"));
    };
    Child_YB.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var a = this;
        CommonManager.parseChildren(a, a);
        a.list.callbackThisObj = a;
        a.list.itemRenderer = a.renderHandle;
        a.list.addEventListener(fairygui.ItemEvent.CLICK, a.itemHandler, a);
        a.promptLb0.text = "异宝效果";
        a.drugBt.addClickListener(a.drugHandle, a);
        a.upStarBt.addClickListener(a.upStarHandler, a);
        a.showBt.addClickListener(a.showHandler, a);
        a.jueXingBt.addClickListener(a.OnJueXing, a);
    };
    Child_YB.prototype.OnJueXing = function () {
        GGlobal.layerMgr.open(UIConst.JUEXING, UIConst.YIBAO);
    };
    Child_YB.prototype.showHandler = function () {
        var vo = this.curGrid.vo;
        if (vo) {
            GGlobal.modelchat.CG_CHAT_SHOW_DATA(4, vo.id);
        }
    };
    Child_YB.prototype.drugHandle = function () {
        GGlobal.layerMgr.open(UIConst.YIBAO_DRUG);
    };
    Child_YB.prototype.upStarHandler = function () {
        var a = this;
        var vo = a.curGrid.vo;
        if (a.upStarBt.checkNotice) {
            GGlobal.modelYiBao.CG_YIBAO_JIHUO(vo.id);
        }
        else {
            View_CaiLiao_GetPanel.show(this.costItem);
        }
    };
    Child_YB.prototype.renderHandle = function (index, obj) {
        var a = this;
        var grid = obj;
        var vo = Model_YiBao.YBArr[index];
        grid.vo = vo;
        if (Model_GlobalMsg.selectID > 0 && Model_GlobalMsg.selectID == vo.id) {
            if (a.curGrid)
                a.curGrid.choose = false;
            grid.choose = true;
            a.curGrid = grid;
            a.curVo = vo;
        }
        else if (!a.curVo && index == 0 && Model_GlobalMsg.selectID <= 0) {
            grid.choose = true;
            a.curGrid = grid;
            a.curVo = vo;
        }
        else if (a.curVo && a.curVo.id == grid.vo.id) {
            a.curGrid.choose = false;
            grid.choose = true;
            a.curGrid = grid;
            a.curVo = vo;
        }
        Model_YiBao.drugMax += grid.vo.starLv * grid.vo.drugMax;
        grid.checkNotice = Model_YiBao.checkUpStarGridNotice(grid.vo);
    };
    Child_YB.prototype.itemHandler = function (event) {
        var a = this;
        var grid = event.itemObject;
        if (a.curGrid && grid.vo.id == a.curVo.id)
            return;
        if (a.curGrid)
            a.curGrid.choose = false;
        grid.choose = true;
        a.curGrid = grid;
        a.curVo = grid.vo;
        Model_GlobalMsg.selectID = 0;
        a.updateShow();
    };
    Child_YB.prototype.onOpen = function () {
        var a = this;
        a.updateList();
        if (Model_YiBao.YBArr.length > 0) {
            a.list.scrollToView(0);
        }
        GGlobal.reddot.listen(ReddotEvent.CHECK_YIBAO, a.updateList, a);
        GGlobal.reddot.listen(UIConst.JUEXING, a.updateJuexing, a);
    };
    Child_YB.prototype.onClose = function () {
        var a = this;
        a.disposePanel();
        GGlobal.reddot.remove(ReddotEvent.CHECK_YIBAO, a.updateList, a);
        GGlobal.reddot.remove(UIConst.JUEXING, a.updateJuexing, a);
    };
    Child_YB.prototype.updateList = function () {
        var a = this;
        Model_YiBao.drugMax = 0;
        for (var i = 0; i < Model_YiBao.YBArr.length; i++) {
            var vo = Model_YiBao.YBArr[i];
            if (vo.starLv <= 0 && Model_YiBao.checkUpStarGridNotice(vo)) {
                vo.state = 0;
            }
            else if (vo.starLv > 0) {
                vo.state = 1;
            }
            else {
                vo.state = 2;
            }
        }
        Model_YiBao.YBArr.sort(Model_YiBao.sortYiBao);
        a.list.numItems = Model_YiBao.YBArr.length;
        a.updateShow();
    };
    Child_YB.prototype.updateShow = function () {
        var a = this;
        var cf = Config.ybstar_217;
        if (!a.curGrid)
            return;
        var vo = a.curGrid.vo;
        a.nameLb.text = vo.name;
        a.nameLb.color = Color.getColorInt(vo.quality);
        IconUtil.setImg(a.bwIcon, Enum_Path.PIC_URL + vo.id + ".png");
        if (a.bwEff) {
            EffectMgr.instance.removeEff(a.bwEff);
            a.bwEff = null;
        }
        if (vo.cfg.tptx > 0) {
            if (!a.bwEff) {
                a.bwEff = EffectMgr.addEff("uieff/" + vo.cfg.tptx, a.bwIcon.displayObject, a.bwIcon.width / 2, a.bwIcon.height / 2, 1000, -1, true);
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
        a.starLb.text = starStr;
        a.skillDes.visible = false;
        a.skillDes.text = "";
        a.lbTip.text = "可提升异宝属性丹吞噬上限：" + HtmlUtil.fontNoSize(vo.drugMax * (vo.starLv > 0 ? vo.starLv : 1) + "", Color.getColorStr(5));
        a.powerLb.text = (vo.starLv > 0 ? cf[vo.cfg.starid * 1000 + vo.starLv].power : 0) + "";
        var attstr0 = "";
        var attstr1 = "";
        a.attGroup.visible = false;
        a.showAtt.visible = true;
        a.maxGroup.visible = false;
        a.upStarGroup.visible = true;
        if (vo.starLv == 0) {
            attstr1 = ConfigHelp.attrString(JSON.parse(cf[vo.cfg.starid * 1000 + 1].attr), "+", Color.getColorStr(1), Color.getColorStr(2));
            a.showAtt.text = attstr1;
            a.updateCostShow();
            a.starPowerLb.text = cf[vo.cfg.starid * 1000 + 1].power + "";
        }
        else if (vo.starLv < vo.starMax) {
            attstr0 = ConfigHelp.attrString(JSON.parse(cf[vo.cfg.starid * 1000 + vo.starLv].attr), "+", Color.getColorStr(1), Color.getColorStr(1));
            attstr1 = ConfigHelp.attrString(JSON.parse(cf[cf[vo.cfg.starid * 1000 + vo.starLv].next].attr), "+", Color.getColorStr(2), Color.getColorStr(2));
            a.updateCostShow();
            a.curAtt.text = attstr0;
            a.nextAtt.text = attstr1;
            a.attGroup.visible = true;
            a.showAtt.visible = false;
            a.starPowerLb.text = (cf[cf[vo.cfg.starid * 1000 + vo.starLv].next].power - cf[vo.cfg.starid * 1000 + vo.starLv].power) + "";
        }
        else {
            attstr0 = ConfigHelp.attrString(JSON.parse(cf[vo.cfg.starid * 1000 + vo.starLv].attr), "+", Color.getColorStr(1), Color.getColorStr(2));
            a.upStarBt.checkNotice = false;
            a.showAtt.text = attstr0;
            a.maxGroup.visible = true;
            a.upStarGroup.visible = false;
        }
        a.drugCount.text = Model_YiBao.drugCount + "/" + Model_YiBao.drugMax;
        var count = Model_Bag.getItemCount(Model_YiBao.drugId);
        if (count > 0 && Model_YiBao.drugCount < Model_YiBao.drugMax) {
            a.drugBt.checkNotice = true;
        }
        else {
            a.drugBt.checkNotice = false;
        }
        a.showBt.visible = vo.starLv > 0;
        if (vo.starLv > 0) {
            a.upStarBt.text = "升星";
        }
        else {
            a.upStarBt.text = "激活";
        }
        a.updateJuexing();
    };
    Child_YB.prototype.updateJuexing = function () {
        var self = this;
        self.jueXingBt.visible = Model_JueXing.checkOpenJuexing(UIConst.YIBAO);
        self.jueXingBt.checkNotice = GGlobal.reddot.checkCondition(UIConst.JUEXING, 3);
    };
    Child_YB.prototype.updateCostShow = function () {
        var a = this;
        var vo = a.curVo;
        this.costItem = VoItem.create(vo.costArr[0][1]);
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
    Child_YB.prototype.disposePanel = function () {
        var a = this;
        if (a.curGrid)
            a.curGrid.choose = false;
        a.curGrid = null;
        a.curVo = null;
        Model_GlobalMsg.selectID = 0;
        a.list.numItems = 0;
        IconUtil.setImg(a.bwIcon, null);
        if (a.bwEff) {
            EffectMgr.instance.removeEff(a.bwEff);
            a.bwEff = null;
        }
    };
    Child_YB.URL = "ui://3tzqotadqqvu23";
    return Child_YB;
}(fairygui.GComponent));
__reflect(Child_YB.prototype, "Child_YB");
