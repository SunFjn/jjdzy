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
var ViewTianShuLevelUp = (function (_super) {
    __extends(ViewTianShuLevelUp, _super);
    function ViewTianShuLevelUp() {
        var _this = _super.call(this) || this;
        _this.loadRes();
        _this.isShowOpenAnimation = false;
        return _this;
    }
    ViewTianShuLevelUp.createInstance = function () {
        return (fairygui.UIPackage.createObject("Skill", "ViewTianShuLevelUp"));
    };
    ViewTianShuLevelUp.prototype.childrenCreated = function () {
        var s = this;
        s.view = fairygui.UIPackage.createObject("Skill", "ViewTianShuLevelUp").asCom;
        s.contentPane = s.view;
        var b = s.view;
        s.frame = (b.getChild("frame"));
        s.lbPower = (b.getChild("lbPower"));
        s.lbAttr = (b.getChild("lbAttr"));
        s.lbAttrNext = (b.getChild("lbAttrNext"));
        s.attrGroup = (b.getChild("attrGroup"));
        s.lbCount = (b.getChild("lbCount"));
        s.lbLevel = (b.getChild("lbLevel"));
        s.btnLevel = (b.getChild("btnLevel"));
        s.btnOneKey = (b.getChild("btnOneKey"));
        s.barExp = (b.getChild("barExp"));
        s.cost0 = (b.getChild("cost0"));
        s.maxGroup = (b.getChild("maxGroup"));
        s.lbAttrMax = (b.getChild("lbAttrMax"));
        s.resetPosition();
        _super.prototype.childrenCreated.call(this);
    };
    ViewTianShuLevelUp.prototype.resetPosition = function () {
        this.setXY((fairygui.GRoot.inst.width - this.width) >> 1, (fairygui.GRoot.inst.height - this.height) >> 1);
    };
    ViewTianShuLevelUp.prototype.onlvlup = function () {
        if (Model_Bag.getItemCount(Model_TianShu.peiyangdan) < 1) {
            View_CaiLiao_GetPanel.show(VoItem.create(Model_TianShu.peiyangdan));
            return;
        }
        GGlobal.modeltianshu.CG_LEVELUP_975(0);
    };
    ViewTianShuLevelUp.prototype.onOneKeylvlup = function () {
        if (Model_Bag.getItemCount(Model_TianShu.peiyangdan) < 1) {
            View_CaiLiao_GetPanel.show(VoItem.create(Model_TianShu.peiyangdan));
            return;
        }
        GGlobal.modeltianshu.CG_LEVELUP_975(1);
    };
    ViewTianShuLevelUp.prototype.update = function () {
        var s = this;
        var m = GGlobal.modeltianshu;
        var lv = m.level;
        lv = lv == 0 ? 1 : lv;
        var lib = Config.booklv_215[lv];
        s.barExp.max = lib.exp;
        s.barExp.value = m.exp;
        s.lbPower.text = lib.power + "";
        s.lbLevel.text = "Lv." + lv;
        var count = lib.exp / 10;
        if (lv < m.getBookLvMax()) {
            s.lbAttr.text = ConfigHelp.attrString(JSON.parse(lib["attr"]), "+", null, Color.getColorStr(1));
            lv += 1;
            lib = Config.booklv_215[lv];
            s.lbAttrNext.text = ConfigHelp.attrString(JSON.parse(lib["attr"]), "+", null, Color.getColorStr(2));
            s.lbAttrMax.visible = false;
            s.cost0.visible = true;
            s.maxGroup.visible = false;
            s.attrGroup.visible = true;
            var c = Model_Bag.getItemCount(Model_TianShu.peiyangdan);
            var itemVo = VoItem.create(Model_TianShu.peiyangdan);
            s.btnLevel.checkNotice = s.btnOneKey.checkNotice = c >= count;
            s.lbCount.setImgUrl(itemVo.icon);
            s.lbCount.setCount(c);
        }
        else {
            s.barExp.max = 1;
            s.barExp.value = 1;
            s.barExp._titleObject.text = "已满级";
            s.cost0.visible = false;
            s.attrGroup.visible = false;
            s.lbAttrMax.visible = true;
            s.maxGroup.visible = true;
            s.lbAttrMax.text = ConfigHelp.attrString(JSON.parse(lib["attr"]), "+", "#FFFFFF", "#15f234");
        }
    };
    ViewTianShuLevelUp.prototype.onBagUpdate = function () {
        this.lbCount.text = Model_Bag.getItemCount(Model_TianShu.peiyangdan) + "";
    };
    ViewTianShuLevelUp.prototype.onShown = function () {
        var s = this;
        s.update();
        s.btnLevel.addClickListener(s.onlvlup, s);
        s.btnOneKey.addClickListener(s.onOneKeylvlup, s);
        GGlobal.control.listen(Enum_MsgType.MSG_TS_LEVELUP, s.update, s);
        GGlobal.control.listen(Enum_MsgType.MSG_BAG_VO_UPDATE, s.onBagUpdate, s); //背包更新
    };
    ViewTianShuLevelUp.prototype.onHide = function () {
        var s = this;
        s.btnLevel.removeClickListener(s.onlvlup, s);
        s.btnOneKey.removeClickListener(s.onOneKeylvlup, s);
        GGlobal.control.remove(Enum_MsgType.MSG_TS_LEVELUP, s.update, s);
        GGlobal.control.remove(Enum_MsgType.MSG_BAG_VO_UPDATE, s.onBagUpdate, s); //背包更新
        GGlobal.layerMgr.close(UIConst.TIANSHULEVEL);
    };
    ViewTianShuLevelUp.URL = "ui://c7onhgk8qqvu2c";
    return ViewTianShuLevelUp;
}(UIModalPanel));
__reflect(ViewTianShuLevelUp.prototype, "ViewTianShuLevelUp");
