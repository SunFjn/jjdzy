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
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var ChildBingFa = (function (_super) {
    __extends(ChildBingFa, _super);
    function ChildBingFa() {
        var _this = _super.call(this) || this;
        _this.selectedId = 0;
        return _this;
    }
    ChildBingFa.createInstance = function () {
        return (fairygui.UIPackage.createObject("role", "Child_BaoWu"));
    };
    ChildBingFa.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var sf = this;
        CommonManager.parseChildren(sf, sf);
        sf.promptLb0.text = "兵法效果";
        sf.list.callbackThisObj = sf;
        sf.list.itemRenderer = sf.listRender;
        sf.list.setVirtual();
        sf.list.addEventListener(fairygui.ItemEvent.CLICK, sf.itemClickHandle, sf);
        sf.showBt.addClickListener(sf.showHandler, sf);
        sf.jueXingBt.addClickListener(sf.OnJueXing, sf);
    };
    ChildBingFa.prototype.OnJueXing = function () {
        GGlobal.layerMgr.open(UIConst.JUEXING, UIConst.BINGFA);
    };
    ChildBingFa.prototype.showHandler = function () {
        var vo = this._vo;
        if (vo) {
            GGlobal.modelchat.CG_CHAT_SHOW_DATA(3, vo.id);
        }
    };
    ChildBingFa.prototype.itemClickHandle = function (event) {
        var self = this;
        var item = event.itemObject;
        this.selectedId = item.vo.id;
        if (self.curItem)
            self.curItem.setChoose(false);
        self.curItem = item;
        self.curItem.setChoose(true);
        var m = GGlobal.modelBingFa;
        this._vo = item.vo;
        Model_GlobalMsg.selectID = 0;
        this.update();
    };
    ChildBingFa.prototype.DrugHandler = function () {
        GGlobal.layerMgr.open(UIConst.BINGFA_DRUG);
    };
    ChildBingFa.prototype.starHandler = function () {
        var i = this._vo.item[0][1];
        var count = Model_Bag.getItemCount(i);
        if (count < 1) {
            View_CaiLiao_GetPanel.show(VoItem.create(i));
            return;
        }
        GGlobal.modelBingFa.CG_ACTIVE_903(this._vo.id);
    };
    ChildBingFa.prototype.listRender = function (index, obj) {
        var self = this;
        var item = obj;
        if (Model_GlobalMsg.selectID > 0 && Model_GlobalMsg.selectID == this._data[index].id) {
            if (self.curItem)
                self.curItem.setChoose(false);
            self.curItem = item;
            self._vo = self._data[index];
            self.selectedId = self._vo.id;
            item.setVo(self._vo, true, self.selectedId);
        }
        else if (!self.curItem && index == 0) {
            if (self.curItem)
                self.curItem.setChoose(false);
            self.curItem = item;
            self._vo = self._data[index];
            self.selectedId = self._vo.id;
            item.setVo(self._vo, true, self.selectedId);
        }
        else {
            item.setVo(self._data[index], true, self.selectedId);
        }
        item.sindex = index;
    };
    //升级 激活返回
    ChildBingFa.prototype.acitBackHandler = function (arg) {
        this.update();
    };
    ChildBingFa.prototype.drugUpdate = function () {
        var m = GGlobal.modelBingFa;
        this.drugCount.text = m.drugCount + "/" + m.getDrugCount();
    };
    ChildBingFa.prototype.update = function () {
        var sf = this;
        var m = GGlobal.modelBingFa;
        sf._data = m.data;
        sf.list.numItems = m.data.length;
        if (Model_GlobalMsg.selectID > 0) {
            for (var i = 0; i < m.data.length; i++) {
                if (Model_GlobalMsg.selectID == m.data[i].id) {
                    sf.list.scrollToView(i, false);
                    break;
                }
            }
        }
        sf.updateView();
    };
    ChildBingFa.prototype.updateView = function () {
        var sf = this;
        var m = GGlobal.modelBingFa;
        var data = m.data;
        var vo = ChildBingFa.nickVo = sf._vo;
        sf.nameLb.text = HtmlUtil.fontNoSize(vo.name, Color.getColorStr(vo.pin));
        sf.powerLb.text = vo.power + "";
        var star = vo.star;
        sf.skillDes.text = "";
        sf.skillDes.visible = false;
        sf.lbTip.text = "可提升兵法属性丹吞噬上限：" + HtmlUtil.fontNoSize(vo.max + "", Color.getColorStr(5));
        sf.starLb.text = ConfigHelp.getStarFontStr(star);
        sf.drugCount.text = m.drugCount + "/" + m.getDrugCount();
        var attstr0 = "";
        var attstr1 = "";
        sf.attGroup.visible = false;
        sf.showAtt.visible = true;
        sf.maxGroup.visible = false;
        sf.upStarGroup.visible = true;
        var maxLevel = vo.starMax;
        if (star >= 1) {
            if (star < maxLevel) {
                sf.attGroup.visible = true;
                sf.showAtt.visible = false;
                sf.curAtt.text = ConfigHelp.attrString(vo.totalAttr, "+", "#f1f1f1", "#f1f1f1");
                sf.nextAtt.text = ConfigHelp.attrString(vo.totalNextAttr, "+", "#f1f1f1", "#15f234");
                sf.starPowerLb.text = (Config.bookstar_213[Config.bookstar_213[vo.pin * 1000 + vo.star].next].power - Config.bookstar_213[vo.pin * 1000 + vo.star].power) + "";
            }
            else if (star == maxLevel) {
                sf.showAtt.text = ConfigHelp.attrString(vo.totalAttr, "+", "#f1f1f1", "#15f234");
                sf.upStarBt.checkNotice = false;
                sf.maxGroup.visible = true;
                sf.upStarGroup.visible = false;
            }
        }
        else {
            sf.showAtt.text = ConfigHelp.attrString(vo.totalAttr, "+", "#f1f1f1", "#15f234");
            sf.starPowerLb.text = Config.bookstar_213[vo.pin * 1000 + 1].power + "";
        }
        IconUtil.setImg(sf.bwIcon, Enum_Path.PIC_URL + vo.pic + ".png");
        if (sf.bwEff) {
            EffectMgr.instance.removeEff(sf.bwEff);
            sf.bwEff = null;
        }
        if (vo.lib.tptx > 0) {
            if (!sf.bwEff) {
                sf.bwEff = EffectMgr.addEff("uieff/" + vo.lib.tptx, sf.bwIcon.displayObject, sf.bwIcon.width / 2, sf.bwIcon.height / 2, 1000, -1, true);
            }
        }
        var i = vo.item[0][1];
        var ci = vo.item[0][2];
        var count = Model_Bag.getItemCount(i);
        var str = "消耗：" + ConfigHelp.getItemColorName(i) + "x" + ci;
        if (count >= ci)
            str += "<font color='" + Color.getColorStr(Color.GREEN) + "'>(" + count + "/" + ci + ")</font>";
        else
            str += "<font color='" + Color.getColorStr(Color.RED) + "'>(" + count + "/" + ci + ")</font>";
        sf.costLb.text = str;
        sf.upStarBt.text = vo.star == 0 ? "激活" : "升星";
        sf.showBt.visible = vo.star > 0;
        sf.checkBingFa();
        sf.updateJuexing();
    };
    ChildBingFa.prototype.updateJuexing = function () {
        var self = this;
        self.jueXingBt.visible = Model_JueXing.checkOpenJuexing(UIConst.BINGFA);
        self.jueXingBt.checkNotice = GGlobal.reddot.checkCondition(UIConst.JUEXING, 5);
    };
    ChildBingFa.prototype.setDefalt = function () {
        var m = GGlobal.modelBingFa;
        this._vo = m.data[0];
    };
    ChildBingFa.prototype.checkBingFa = function () {
        if (!this._vo)
            return;
        var f = GGlobal.reddot;
        this.drugBt.checkNotice = f.checkCondition(UIConst.BINGFA, 1);
        if (this._vo.star < this._vo.starMax) {
            var i = this._vo.item[0][1];
            var count = Model_Bag.getItemCount(i);
            this.upStarBt.checkNotice = count > 0;
        }
        else {
            this.upStarBt.checkNotice = false;
        }
    };
    ChildBingFa.prototype.openUI = function () {
        this.setDefalt();
        this.update();
    };
    ChildBingFa.prototype.open = function () {
        var sf = this;
        var m = GGlobal.modelBingFa;
        m.CG_INFO_901();
        m.listen(Model_BingFa.DRUG_UP, sf.drugUpdate, sf);
        m.listen(Model_BingFa.OPENUI, sf.openUI, sf);
        m.listen(Model_BingFa.LVLUP, sf.acitBackHandler, sf);
        GGlobal.reddot.listen(ReddotEvent.CHECK_BINGFA, sf.checkBingFa, sf);
        GGlobal.reddot.listen(UIConst.JUEXING, sf.updateJuexing, sf);
        sf.upStarBt.addClickListener(sf.starHandler, sf);
        sf.drugBt.addClickListener(sf.DrugHandler, sf);
        sf.checkBingFa();
    };
    ChildBingFa.prototype.hide = function () {
        var sf = this;
        var m = GGlobal.modelBingFa;
        GGlobal.reddot.remove(ReddotEvent.CHECK_BINGFA, sf.checkBingFa, sf);
        GGlobal.reddot.remove(UIConst.JUEXING, sf.updateJuexing, sf);
        m.remove(Model_BingFa.OPENUI, sf.openUI, sf);
        m.remove(Model_BingFa.DRUG_UP, sf.drugUpdate, sf);
        m.remove(Model_BingFa.LVLUP, sf.acitBackHandler, sf);
        sf.upStarBt.removeClickListener(sf.starHandler, sf);
        sf.drugBt.removeClickListener(sf.DrugHandler, sf);
        if (sf.curItem)
            sf.curItem.setChoose(false);
        sf.curItem = null;
        IconUtil.setImg(this.bwIcon, null);
        sf.list.numItems = 0;
        Model_GlobalMsg.selectID = 0;
        if (sf.bwEff) {
            EffectMgr.instance.removeEff(sf.bwEff);
            sf.bwEff = null;
        }
    };
    ChildBingFa.URL = "ui://3tzqotadqqvu23";
    return ChildBingFa;
}(fairygui.GComponent));
__reflect(ChildBingFa.prototype, "ChildBingFa");
