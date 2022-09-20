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
var ChildTitle = (function (_super) {
    __extends(ChildTitle, _super);
    function ChildTitle() {
        var _this = _super.call(this) || this;
        _this._currentPage = 0;
        return _this;
    }
    ChildTitle.createInstance = function () {
        return (fairygui.UIPackage.createObject("role", "ChildTitle"));
    };
    ChildTitle.prototype.initView = function (pParent) {
        this._viewParent = pParent;
        this.addRelation(this._viewParent, fairygui.RelationType.Size);
    };
    ChildTitle.prototype.openPanel = function (pData) {
        this.onOpen();
    };
    ChildTitle.prototype.closePanel = function (pData) {
        this.onClose();
    };
    ChildTitle.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
        s.lst.itemRenderer = s.itemRender;
        s.lst.callbackThisObj = s;
        s.lst.setVirtual();
        s.lst.addEventListener(fairygui.ItemEvent.CLICK, s.itemClickHandle, s);
    };
    ChildTitle.prototype.wearHandler = function (e) {
        var m = GGlobal.modeltitle;
        var id = this._vo.id;
        var type;
        var st = this._vo.state;
        switch (st) {
            case 0:// 0：未激活
                m.CG_ACTIVE_509(id);
                break;
            case 1:// 1：可激活
                m.CG_ACTIVE_509(id);
                break;
            case 2:// 2：已激活
                m.CG_WEAR_503(1, id);
                break;
            case 3:// 3：已穿戴
                m.CG_WEAR_503(2, id);
                break;
        }
    };
    ChildTitle.prototype.jinjieHandler = function (e) {
        if (this._vo.type == 0) {
            if (this._vo.isMaxLevel()) {
                ViewCommonWarn.text("称号已满级");
            }
            else {
                var condition = this._vo.condtion[0];
                var val = condition[2];
                if (this._vo.email != "0")
                    val = JSON.parse(this._vo.email)[0][1];
                var ml = Model_Bag.getItemCount(val);
                if (ml == 0) {
                    View_CaiLiao_GetPanel.show(VoItem.create(val));
                }
                else {
                    var m = GGlobal.modeltitle;
                    m.CG_LEVELUP_513(this._vo.id);
                }
            }
        }
    };
    ChildTitle.prototype.setView = function () {
        var vo = this._vo;
        if (!vo)
            return;
        var m = GGlobal.modeltitle;
        var st = vo.state;
        var cfg_desc;
        if (st > 1) {
            cfg_desc = "<font color='#15f234'>" + vo.desc + "</font>";
        }
        else {
            cfg_desc = "激活条件：<font color='#fe0000'>" + vo.desc + "</font>";
        }
        if (vo.lib.xianshi == 1) {
            cfg_desc += "<font color='#33FF00'>（聊天界面显示）</font>";
        }
        this.lbCondition.text = cfg_desc;
        switch (st) {
            case 0: // 0：未激活
            case 1:// 1：可激活
                this.btnWear.text = "激活";
                break;
            case 2:// 2：已激活
                this.btnWear.text = "穿戴";
                break;
            case 3:// 3：已穿戴
                this.btnWear.text = "卸下";
                break;
        }
        //是否穿戴中
        var isWear = m.curID == vo.id;
        if (isWear) {
            this.btnWear.text = "卸下";
        }
        this.imgIcon.visible = isWear;
        this.btnWear.checkNotice = vo.isNotice() && vo.level == 0;
        ImageLoader.instance.loader(Enum_Path.TITLE_URL + vo.picture + ".png", this.imgTitle);
        //永久显示阶级
        this.lbLevel.visible = vo.type == 0;
        this.lbLevel.text = vo.level + "j";
        this.lbPowerSingle.text = "<font color='#ffc334'>战力：" + vo.power + "</font>";
        var attStr = "";
        for (var i = 0; i < vo.attr.length; i++) {
            if (i == 0) {
                attStr += ConfigHelp.attrString([vo.attr[i]], "  +", "#f1f1f1", "#15f234");
            }
            else {
                attStr += "\n" + ConfigHelp.attrString([vo.attr[i]], "  +", "#f1f1f1", "#15f234");
            }
            if (i + 1 < vo.attr.length) {
                i++;
                attStr += "     " + ConfigHelp.attrString([vo.attr[i]], "  +", "#f1f1f1", "#15f234");
            }
        }
        this.lbAttribute.text = attStr;
        var canLevelUp = vo.type == 0 && (vo.state == 2 || vo.state == 3) && vo.ttype != 4; //永久且已激活且不是国家类型的称号
        this.lbCost.visible = this.btnLvlUp.visible = canLevelUp;
        this.btnLvlUp.checkNotice = vo.isNotice();
        var condition = vo.condtion[0];
        var type = condition[0];
        var itemid = condition[2];
        if (vo.email != "0") {
            itemid = JSON.parse(vo.email)[0][1];
        }
        var ct = Model_Bag.getItemCount(itemid);
        if (ct > 0) {
            var str = HtmlUtil.fontNoSize("*1", Color.GREENSTR);
        }
        else {
            var str = HtmlUtil.fontNoSize("*1", Color.REDSTR);
        }
        this.lbCost.text = "消耗：<font color='#fe0000'>" + ConfigHelp.getItemColorName(itemid) + "</font>" + str;
        this.updateTime();
    };
    ChildTitle.prototype.updateTime = function () {
        var t = Model_GlobalMsg.getServerTime();
        var vo = this._vo;
        if (!vo)
            return;
        var st = vo.state;
        if (st == 2 || st == 3) {
            if (vo.type == 0) {
                //国家不显示期限
                if (vo.ttype != 4) {
                    this.lbDate.text = "期限：永久";
                }
                else {
                    this.lbDate.text = "";
                }
            }
            else {
                var timeX = (vo.time - t) / 1000;
                var day = timeX / (24 * 60 * 60);
                if (day >= 1) {
                    day = Math.ceil(timeX / (24 * 60 * 60)); //向下取整
                    this.lbDate.text = "期限：" + day + "天";
                }
                else {
                    this.lbDate.text = "期限：" + TimeUitl.getRemainingTime(vo.time, t, { hour: "时", minute: "分", second: "秒" });
                }
            }
        }
        else {
            this.lbDate.text = "";
        }
    };
    ChildTitle.prototype.itemClickHandle = function (event) {
        var self = this;
        var item = event.itemObject;
        this.selectedId = item.vo.id;
        if (self.curItem)
            self.curItem.setChoose(false);
        self.curItem = item;
        self.curItem.setChoose(true);
        this._vo = item.vo;
        this.setView();
    };
    ChildTitle.prototype.itemRender = function (index, obj) {
        var item = obj;
        item.setdata(this.sourceData[index]);
        if (!this.curItem && index == 0) {
            this.curItem = item;
            this._vo = item.vo;
            this.selectedId = item.vo.id;
            this.setView();
        }
        if (this.selectedId == item.vo.id) {
            this.curItem = item;
        }
        item.setChoose(this.selectedId == item.vo.id);
    };
    ChildTitle.prototype.checkNotice = function () {
        var m = GGlobal.modeltitle;
        var lib = m.lib;
        var types = {};
        var scrollType = 0;
        var scrollItem = 0;
        for (var v in lib) {
            var slib = lib[v];
            for (var s = 0; s < slib.length; s++) {
                var vo = slib[s];
                if (types[vo.ttype] || vo.isMaxLevel())
                    continue;
                var condition = vo.condtion[0];
                var type = condition[0];
                var val = condition[2];
                if (type == 9) {
                    var count = Model_Bag.getItemCount(val);
                    if (count > 0) {
                        types[vo.ttype] = true;
                        scrollType = vo.ttype;
                        scrollItem = s;
                    }
                }
                if (vo.email != "0") {
                    var condition = JSON.parse(vo.email);
                    var count = Model_Bag.getItemCount(condition[0][1]);
                    if (count > 0) {
                        types[vo.ttype] = true;
                        scrollType = vo.ttype;
                        scrollItem = s;
                    }
                }
            }
        }
        var m = GGlobal.modeltitle;
        var lib = m.lib;
        for (var v in lib) {
            vo = lib[v];
            var st = vo.state;
            if (st == 1) {
                types[vo.ttype] = true;
            }
        }
        for (var i = 1; i < 5; i++) {
            if (types[i]) {
                Tools.addNoticeIcon(this["btn" + (i - 1)], "titletab" + i, 110, 10);
            }
            else {
                Tools.removeNoticeIcon("titletab" + i);
            }
        }
    };
    ChildTitle.prototype.openUI = function () {
        this.cleanList();
        this.update();
        this._vo = this.sourceData[0];
        this.lst.scrollToView(0);
    };
    ChildTitle.prototype.update = function () {
        this.setTabData(false);
        this.checkNotice();
        this.setView();
        var m = GGlobal.modeltitle;
        this.lbPower.text = m.getTotalPower() + "";
    };
    ChildTitle.prototype.onLeftHand = function () {
        this._currentPage = this.lst.scrollPane.currentPageX;
        this._currentPage--;
        this.setPage();
    };
    ChildTitle.prototype.onRightHand = function () {
        this._currentPage = this.lst.scrollPane.currentPageX;
        this._currentPage++;
        this.setPage();
    };
    ChildTitle.prototype.setPage = function () {
        var maxPage = Math.ceil(this.lst.scrollPane.contentWidth / this.lst.scrollPane.viewWidth);
        this._currentPage = this._currentPage < 0 ? 0 : this._currentPage;
        this._currentPage = this._currentPage > maxPage ? maxPage : this._currentPage;
        this.lst.scrollPane.setCurrentPageX(this._currentPage, true);
    };
    ChildTitle.prototype.pageChange = function () {
        this.lst.scrollToView(0);
        this.setTabData();
        this.checkNotice();
        this.setView();
        var m = GGlobal.modeltitle;
        this.lbPower.text = m.getTotalPower() + "";
    };
    ChildTitle.prototype.onOpen = function () {
        var s = this;
        var m = GGlobal.modeltitle;
        m.CG_INFO_501();
        s.openUI();
        GGlobal.control.listen(Enum_MsgType.TITLE_OPENUI, s.openUI, s);
        GGlobal.control.listen(Enum_MsgType.TITLE_UPDATE, s.update, s);
        s.ctr2.addEventListener(fairygui.StateChangeEvent.CHANGED, s.pageChange, s);
        s.btnWear.addClickListener(s.wearHandler, s);
        s.btnLvlUp.addClickListener(s.jinjieHandler, s);
        s.btnLeft.addClickListener(s.onLeftHand, s);
        s.btnRight.addClickListener(s.onRightHand, s);
        Timer.instance.listen(s.updateTime, s, 1000);
    };
    ChildTitle.prototype.onClose = function () {
        var s = this;
        s.sourceData = null;
        var m = GGlobal.modeltitle;
        var c = GGlobal.control;
        c.remove(Enum_MsgType.TITLE_OPENUI, s.openUI, s);
        c.remove(Enum_MsgType.TITLE_UPDATE, s.update, s);
        s.btnLeft.removeClickListener(s.onLeftHand, s);
        s.btnRight.removeClickListener(s.onRightHand, s);
        s.btnWear.removeClickListener(s.wearHandler, s);
        s.btnLvlUp.removeClickListener(s.jinjieHandler, s);
        s.ctr2.removeEventListener(fairygui.StateChangeEvent.CHANGED, s.pageChange, s);
        s.ctr2.selectedIndex = 0;
        s.cleanList();
        Timer.instance.remove(s.updateTime, s);
    };
    ChildTitle.prototype.cleanList = function () {
        var s = this;
        if (s.curItem)
            s.curItem.setChoose(false);
        s.curItem = null;
        s.selectedId = -1;
        s._currentPage = 0;
        s.lst.numItems = 0;
    };
    ChildTitle.prototype.setTabData = function (resetSelected) {
        if (resetSelected === void 0) { resetSelected = true; }
        var s = this;
        var type = this.ctr2.selectedIndex;
        var m = GGlobal.modeltitle;
        s.sourceData = m.lib[type + 1];
        if (!s.sourceData)
            return;
        if (resetSelected) {
            this._vo = this.sourceData[0];
            this.selectedId = this._vo.id;
        }
        s.lst.numItems = s.sourceData.length;
        var clib = m.countObj;
        for (var i = 1; i < 5; i++) {
            type = (Number(i) - 1);
            var tpStr = ["排名", "成就", "活动", "国家"][type];
            if (clib[i]) {
                s["btn" + type].text = tpStr + clib[i] + "/" + m.lib[type + 1].length;
            }
            else {
                s["btn" + type].text = tpStr + 0 + "/" + m.lib[type + 1].length;
            }
        }
    };
    //>>>>end
    ChildTitle.URL = "ui://3tzqotadltpm13";
    return ChildTitle;
}(fairygui.GComponent));
__reflect(ChildTitle.prototype, "ChildTitle", ["IPanel"]);
