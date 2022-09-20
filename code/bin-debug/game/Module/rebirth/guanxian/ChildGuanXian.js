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
var ChildGuanXian = (function (_super) {
    __extends(ChildGuanXian, _super);
    function ChildGuanXian() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.awards = [];
        _this.nowIndex = 0;
        _this.maxLen = 0;
        _this.isfull = false;
        return _this;
    }
    ChildGuanXian.createInstance = function () {
        return (fairygui.UIPackage.createObject("rebirth", "ChildGuanXian"));
    };
    ChildGuanXian.prototype.initView = function (pParent) {
        this._viewParent = pParent;
        this.addRelation(this._viewParent, fairygui.RelationType.Size);
    };
    ChildGuanXian.prototype.openPanel = function (pData) {
        this.open();
    };
    ChildGuanXian.prototype.closePanel = function (pData) {
        this.hide();
    };
    ChildGuanXian.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
        s.itemList.callbackThisObj = s;
        s.itemList.itemRenderer = s.awardsRender;
        s.btnContry.addClickListener(s.openContry, s);
        s.lbGongxun.addClickListener(s.openContry, s);
    };
    ChildGuanXian.prototype.awardsRender = function (idx, obj) {
        var item = obj;
        item.vo = this.awards[idx];
        item.tipEnabled = true;
        item.showEff(true);
    };
    ChildGuanXian.prototype.open = function () {
        this.onOpen();
    };
    ChildGuanXian.prototype.hide = function () {
        this.onClose();
    };
    ChildGuanXian.prototype.openContry = function (e) {
        e.stopImmediatePropagation();
        e.stopPropagation();
        //材料获取
        var im = VoItem.create(7);
        View_CaiLiao_GetPanel.show(im);
    };
    ChildGuanXian.prototype.onPager = function () {
        this.nowIndex++;
        var m = GGlobal.modelguanxian;
        if (this.nowIndex <= this.maxLen)
            this.setIndex(true);
        else {
            this.nowIndex = this.maxLen;
        }
    };
    ChildGuanXian.prototype.onPagel = function () {
        this.nowIndex--;
        if (this.nowIndex > 0)
            this.setIndex(true);
        else
            this.nowIndex = 1;
    };
    ChildGuanXian.prototype.setdata = function () {
        var sf = this;
        sf.setCurrentPropeties();
        sf.setIndex();
        sf.showJiangYin();
    };
    //将印
    ChildGuanXian.prototype.showJiangYin = function () {
        var now = GGlobal.modelguanxian.guanzhi;
        var next = null;
        var cfg = Config.jyjh_701;
        //默认10个将印
        for (var i = 1; i < 11; i++) {
            var item = cfg[i];
            if (item.jihuo > now - 1) {
                next = item;
                break;
            }
        }
        this.groupJiangYin.visible = next != null;
        if (next) {
            this.labBigReward.text = "第" + next.jihuo + "阶";
        }
        this.gridBigReward.setCFG(next);
    };
    ChildGuanXian.prototype.setCurrentPropeties = function () {
        var s = this;
        var m = GGlobal.modelguanxian;
        s.nowIndex = m.guanzhi;
        s.maxLen = m.guanzhi;
        if (s.nowIndex + 1 < m.maxL)
            s.maxLen = s.nowIndex + 1;
        var lib = Config.guanxian_701[s.nowIndex];
        var att = JSON.parse(lib["attr"]);
        s.lbPower.text = "" + ConfigHelp.powerFormulaArr(att);
        s.lbAtt.text = ConfigHelp.attrString(att, "+", "#FFFFFF", "#15f234");
    };
    ChildGuanXian.prototype.levelUpBack = function () {
        this.setCurrentPropeties();
        this.setIndex();
        this.showJiangYin();
    };
    ChildGuanXian.prototype.setIndex = function (val) {
        if (val === void 0) { val = false; }
        var s = this;
        var id = s.nowIndex;
        var m = GGlobal.modelguanxian;
        s.btnLeft.visible = id > 1;
        s.btnRight.visible = id < s.maxLen;
        var lib = Config.guanxian_701[id];
        s.lbGuanxian.text = Model_GuanXian.getJiangXianStrNoJie(id);
        if (lib["name"] == "无")
            s.lbJS.text = "";
        else
            s.lbJS.text = ConfigHelp.NumberToChinese(id - 1) + "阶";
        if (val)
            return;
        var att = JSON.parse(lib["attr"]);
        var award = lib["award"];
        s.showGrid(award);
        s.barExp.max = lib["lvup"];
        var max = lib["lvup"];
        if (max != 0) {
            s.barExp.value = m.gongxun;
            s.barExp.text = m.gongxun + "/" + lib["lvup"];
        }
        else {
            s.barExp.max = 1;
            s.barExp.value = 1;
            s.barExp._titleObject.text = "已满级";
            s.lbGongxun.grayed = true;
            s.isfull = true;
        }
        s.btnLvUp.checkNotice = GGlobal.reddot.checkCondition(UIConst.GUANXIAN, 0);
    };
    ChildGuanXian.prototype.showGrid = function (awards) {
        if (awards == "0")
            return;
        awards = JSON.parse(awards);
        this.awards = ConfigHelp.makeItemListArr(awards);
        this.itemList.numItems = this.awards.length;
    };
    ChildGuanXian.prototype.levelUp = function (e) {
        if (this.isfull) {
            ViewCommonWarn.text("已满级");
        }
        else if (this.barExp.value < this.barExp.max) {
            // ViewCommonWarn.text("功勋不足");
            View_CaiLiao_GetPanel.show(VoItem.create(7));
        }
        else {
            GGlobal.modelguanxian.csLvlUpGX();
        }
    };
    ChildGuanXian.prototype.onCloseHandler = function (e) {
        GGlobal.layerMgr.close(UIConst.GUANXIAN);
    };
    ChildGuanXian.prototype.onOpen = function () {
        var s = this;
        var c = Model_player.voMine.country;
        if (c > 0) {
            s.btnContry.visible = true;
            s.btnContry.icon = CommonManager.getUrl("rebirth", "country" + c);
        }
        else {
            s.btnContry.visible = false;
        }
        IconUtil.setImg(s.backbg0, Enum_Path.BACK_URL + "c_bg1.jpg");
        IconUtil.setImg(s.backbg1, Enum_Path.BACK_URL + "c_bg1.jpg");
        GGlobal.modelguanxian.csGuanxian();
        s.btnLvUp.addClickListener(s.levelUp, s);
        s.btnLeft.addClickListener(s.onPagel, s);
        s.btnRight.addClickListener(s.onPager, s);
        GGlobal.control.listen(Enum_MsgType.MSG_GXINIT, s.setdata, s);
        GGlobal.control.listen(Enum_MsgType.MSG_GXUPDATE, s.levelUpBack, s);
    };
    ChildGuanXian.prototype.onClose = function () {
        var s = this;
        IconUtil.setImg(s.backbg0, null);
        IconUtil.setImg(s.backbg1, null);
        this.itemList.numItems = 0;
        s.btnLvUp.removeClickListener(s.levelUp, s);
        s.btnLeft.removeClickListener(s.onPagel, s);
        s.btnRight.removeClickListener(s.onPager, s);
        GGlobal.control.remove(Enum_MsgType.MSG_GXINIT, s.setdata, s);
        GGlobal.control.remove(Enum_MsgType.MSG_GXUPDATE, s.levelUpBack, s);
    };
    //>>>>end
    ChildGuanXian.URL = "ui://dllc71i9ltpm12";
    return ChildGuanXian;
}(fairygui.GComponent));
__reflect(ChildGuanXian.prototype, "ChildGuanXian", ["IPanel"]);
