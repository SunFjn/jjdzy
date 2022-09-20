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
/** s is an automatically generated class by FairyGUI. Please do not modify it. **/
var Child_TianShu = (function (_super) {
    __extends(Child_TianShu, _super);
    function Child_TianShu() {
        var _this = _super.call(this) || this;
        _this.selecteIndex = 0;
        _this.eventFunction = function (t) {
            var self = _this;
            var event = EventUtil.register;
            event(t, self.useBt, EventUtil.TOUCH, self.wearHandler, self);
            event(t, self.drugBt, EventUtil.TOUCH, self.dragHandler, self);
            event(t, self.upStarBt, EventUtil.TOUCH, self.starHandler, self);
            event(t, self.showBt, EventUtil.TOUCH, self.showHandler, self);
            event(t, self.jueXingBt, EventUtil.TOUCH, self.OnJueXing, self);
            event(t, self.list, fairygui.ItemEvent.CLICK, self.itemClickHandle, self);
        };
        return _this;
    }
    Child_TianShu.createInstance = function () {
        return (fairygui.UIPackage.createObject("role", "Child_BaoWu"));
    };
    Child_TianShu.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
        s.promptLb0.text = "天书效果";
        s.list.callbackThisObj = s;
        s.list.itemRenderer = s.renderHandle;
        s.list.setVirtual();
    };
    Child_TianShu.prototype.OnJueXing = function () {
        GGlobal.layerMgr.open(UIConst.JUEXING, UIConst.TIANSHU);
    };
    Child_TianShu.prototype.showHandler = function () {
        if (this.vo) {
            GGlobal.modelchat.CG_CHAT_SHOW_DATA(7, this.vo.id);
        }
    };
    Child_TianShu.prototype.itemClickHandle = function (event) {
        var s = this;
        var item = event.itemObject;
        var m = GGlobal.modeltianshu;
        s.vo = item.vo;
        s.selecteIndex = item.sindex;
        if (s.curItem)
            s.curItem.setSel(false);
        s.curItem = item;
        s.curItem.setSel(true);
        Model_GlobalMsg.selectID = 0;
        s.updateView();
    };
    Child_TianShu.prototype.renderHandle = function (index, obj) {
        var self = this;
        var item = obj;
        item.vo = this._sortList[index];
        item.sindex = index;
        if ((Model_GlobalMsg.selectID > 0 && item.vo.id == Model_GlobalMsg.selectID) || (self.selecteIndex == index)) {
            if (self.curItem)
                self.curItem.setSel(false);
            self.curItem = item;
            self.curItem.setSel(true);
            self.vo = item.vo;
        }
        else if (self.vo && this.vo.id == item.vo.id) {
            self.curItem = item;
            self.curItem.setSel(true);
            self.vo = item.vo;
        }
        else if (!self.vo && !self.curItem && Model_GlobalMsg.selectID <= 0) {
            self.curItem = item;
            self.curItem.setSel(true);
            self.vo = item.vo;
        }
        else {
            item.setSel(false);
        }
    };
    Child_TianShu.prototype.wearHandler = function (e) {
        var s = this;
        if (s.vo.star == 0) {
            ViewCommonWarn.text("尚未激活" + s.vo.name);
            return;
        }
        var m = GGlobal.modeltianshu;
        m.CG_CHANGETIANSHU_973(s.vo.id);
    };
    /**升级*/
    Child_TianShu.prototype.levelUpHandler = function (e) {
        GGlobal.layerMgr.open(UIConst.TIANSHULEVEL);
    };
    /**属性丹*/
    Child_TianShu.prototype.dragHandler = function (e) {
        var s = this;
        GGlobal.layerMgr.open(UIConst.TIANSHUDRAG, s.vo);
    };
    /**升星*/
    Child_TianShu.prototype.starHandler = function (e) {
        var s = this;
        var id = JSON.parse(s.vo.item)[0][1];
        var count = Model_Bag.getItemCount(id);
        if (count < 1) {
            View_CaiLiao_GetPanel.show(VoItem.create(id));
            return;
        }
        var m = GGlobal.modeltianshu;
        m.CG_STARUP_977(s.vo.id);
    };
    Child_TianShu.prototype.updateView = function () {
        var self = this;
        var cf = Config.bookstar_215;
        var m = GGlobal.modeltianshu;
        if (!self.vo)
            self.vo = self._sortList[self.selecteIndex];
        if (!self.vo)
            return;
        self.useBt.visible = self.vo.id != m.currentID && self.vo.star != 0;
        self.useImg.visible = self.vo.id == m.currentID;
        var nowVO = self.vo;
        self.powerLb.text = (nowVO.star > 0 ? nowVO.power : 0) + "";
        self.nameLb.text = HtmlUtil.fontNoSize(nowVO.name, Color.getColorStr(nowVO.pin));
        IconUtil.setImg(self.bwIcon, Enum_Path.PIC_URL + nowVO.pic + ".png");
        self.starLb.text = ConfigHelp.getStarFontStr(nowVO.star);
        self.skillDes.text = nowVO.desc;
        self.drugCount.text = m.shuxingdan + "/" + m.getDrugCount();
        self.lbTip.text = "可提升天书属性丹吞噬上限：" + HtmlUtil.fontNoSize(nowVO.max * (nowVO.star > 0 ? nowVO.star : 1) + "", Color.getColorStr(5));
        var attstr0 = "";
        var attstr1 = "";
        self.attGroup.visible = false;
        self.showAtt.visible = true;
        self.maxGroup.visible = false;
        self.upStarGroup.visible = true;
        if (nowVO.star == 0) {
            attstr0 = ConfigHelp.attrString(JSON.parse(cf[nowVO.pin * 1000 + 1].attr), "+", Color.getColorStr(1), Color.getColorStr(2));
            self.showAtt.text = attstr0;
            self.starPowerLb.text = cf[nowVO.pin * 1000 + 1].power + "";
        }
        else if (nowVO.isMaxStar()) {
            attstr0 = ConfigHelp.attrString(JSON.parse(cf[nowVO.pin * 1000 + nowVO.star].attr), "+", Color.getColorStr(1), Color.getColorStr(2));
            self.upStarBt.checkNotice = false;
            self.showAtt.text = attstr0;
            self.maxGroup.visible = true;
            self.upStarGroup.visible = false;
        }
        else {
            attstr0 = ConfigHelp.attrString(JSON.parse(cf[nowVO.pin * 1000 + nowVO.star].attr), "+", Color.getColorStr(1), Color.getColorStr(1));
            attstr1 = ConfigHelp.attrString(JSON.parse(cf[cf[nowVO.pin * 1000 + nowVO.star].next].attr), "+", Color.getColorStr(2), Color.getColorStr(2));
            self.curAtt.text = attstr0;
            self.nextAtt.text = attstr1;
            self.attGroup.visible = true;
            self.showAtt.visible = false;
            self.starPowerLb.text = (cf[cf[nowVO.pin * 1000 + nowVO.star].next].power - cf[nowVO.pin * 1000 + nowVO.star].power) + "";
        }
        var str = "消耗:" + HtmlUtil.fontNoSize(nowVO.name, Color.getColorStr(nowVO.pin)) + "x1";
        var items = JSON.parse(nowVO.item)[0];
        var c = Model_Bag.getItemCount(items[1]);
        if (c >= items[2])
            str += "<font color='#15f234'>(" + c + "/" + items[2] + ")</font>";
        else
            str += "<font color='#ed1414'>(" + c + "/" + items[2] + ")</font>";
        self.costLb.text = str;
        self.upStarBt.text = nowVO.star == 0 ? "激活" : "升星";
        self.showBt.visible = nowVO.star > 0;
        self.setActiTip();
        self.updateJuexing();
    };
    Child_TianShu.prototype.updateJuexing = function () {
        var self = this;
        self.jueXingBt.visible = Model_JueXing.checkOpenJuexing(UIConst.TIANSHU);
        self.jueXingBt.checkNotice = GGlobal.reddot.checkCondition(UIConst.JUEXING, 4);
    };
    Child_TianShu.prototype.levelUp = function () {
        var m = GGlobal.modeltianshu;
    };
    Child_TianShu.prototype.StarUpdate = function () {
        ViewCommonWarn.text("升级成功");
        this.updateList();
    };
    Child_TianShu.prototype.updateList = function () {
        var s = this;
        var m = GGlobal.modeltianshu;
        s._sortList = m.data;
        if (s.curItem)
            s.curItem.setSel(false);
        s.curItem = null;
        s.list.numItems = s._sortList.length;
        s.updateView();
    };
    Child_TianShu.prototype.wearBack = function () {
        var s = this;
        if (s.curItem)
            s.curItem.setSel(false);
        s.curItem = null;
        s.selecteIndex = 0;
        var m = GGlobal.modeltianshu;
        s._sortList = m.data;
        s.list.numItems = s._sortList.length;
        s.updateView();
    };
    Child_TianShu.prototype.setActiTip = function () {
        var s = this;
        var v = s.vo;
        var id = JSON.parse(v.item)[0][1];
        var count = Model_Bag.getItemCount(id);
        s.upStarBt.checkNotice = count > 0 && !v.isMaxStar();
    };
    Child_TianShu.prototype.noticeHandler = function () {
        var s = this;
        var r = GGlobal.reddot;
        s.drugBt.checkNotice = r.checkCondition(UIConst.TIANSHU, 1);
        s.useBt.checkNotice = r.checkCondition(UIConst.TIANSHU, 3);
        if (s.vo)
            s.setActiTip();
    };
    Child_TianShu.prototype.onShown = function () {
        var s = this;
        var c = GGlobal.control;
        s.eventFunction(1);
        c.listen(Enum_MsgType.MSG_TS_DRUG, s.updateView, s);
        c.listen(Enum_MsgType.MSG_TS_UPDATE, s.updateList, s);
        c.listen(Enum_MsgType.MSG_TS_LEVELUP, s.levelUp, s);
        c.listen(Enum_MsgType.MSG_TS_WAEAR, s.wearBack, s);
        c.listen(Enum_MsgType.MSG_TS_STAR, s.StarUpdate, s);
        GGlobal.reddot.listen(ReddotEvent.CHECK_TIANSHU, s.noticeHandler, s);
        s.noticeHandler();
        s.updateList();
    };
    Child_TianShu.prototype.open = function () {
        this.onShown();
    };
    Child_TianShu.prototype.close = function () {
        this.onHide();
    };
    Child_TianShu.prototype.onHide = function () {
        var s = this;
        s.eventFunction(0);
        s.vo = null;
        var c = GGlobal.control;
        if (s.curItem)
            s.curItem.setSel(false);
        s.curItem = null;
        s.list.numItems = 0;
        s.selecteIndex = 0;
        Model_GlobalMsg.selectID = 0;
        c.remove(Enum_MsgType.MSG_TS_DRUG, s.updateView, s);
        c.remove(Enum_MsgType.MSG_TS_UPDATE, s.updateList, s);
        c.remove(Enum_MsgType.MSG_TS_WAEAR, s.wearBack, s);
        c.remove(Enum_MsgType.MSG_TS_STAR, s.StarUpdate, s);
        c.remove(Enum_MsgType.MSG_TS_LEVELUP, s.levelUp, s);
        GGlobal.reddot.remove(ReddotEvent.CHECK_TIANSHU, s.noticeHandler, s);
        IconUtil.setImg(s.bwIcon, null);
    };
    Child_TianShu.URL = "ui://3tzqotadqqvu23";
    return Child_TianShu;
}(fairygui.GComponent));
__reflect(Child_TianShu.prototype, "Child_TianShu");
