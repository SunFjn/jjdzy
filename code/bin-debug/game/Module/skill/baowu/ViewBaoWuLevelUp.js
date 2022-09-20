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
var ViewBaoWuLevelUp = (function (_super) {
    __extends(ViewBaoWuLevelUp, _super);
    function ViewBaoWuLevelUp() {
        var _this = _super.call(this) || this;
        _this.childrenCreated();
        return _this;
    }
    ViewBaoWuLevelUp.prototype.childrenCreated = function () {
        this.view = fairygui.UIPackage.createObject("common", "ViewBaoWuLevelUp").asCom;
        this.contentPane = this.view;
        this.lbAttr = (this.view.getChild("lbAttr"));
        this.lbAttrNext = (this.view.getChild("lbAttrNext"));
        this.attrGroup = (this.view.getChild("attrGroup"));
        this.lbAttrMax = (this.view.getChild("lbAttrMax"));
        this.lbLevel = (this.view.getChild("lbLevel"));
        this.barExp = (this.view.getChild("barExp"));
        this.maxGroup = (this.view.getChild("maxGroup"));
        this.itemName = (this.view.getChild("itemName"));
        this.btnLevel = (this.view.getChild("btnLevel"));
        this.btnOneKey = (this.view.getChild("btnOneKey"));
        this.cost0 = (this.view.getChild("cost0"));
        this.lbPower = (this.view.getChild("lbPower"));
        this.lbCount = (this.view.getChild("lbCount"));
        _super.prototype.childrenCreated.call(this);
    };
    ViewBaoWuLevelUp.prototype.onlvlup = function () {
        if (Model_Bag.getItemCount(Model_BaoWu.itemId) < 1) {
            View_CaiLiao_GetPanel.show(VoItem.create(Model_BaoWu.itemId));
            return;
        }
        GGlobal.modelbw.CG_BAOWU_UPGRADE();
    };
    ViewBaoWuLevelUp.prototype.onOneKeylvlup = function () {
        if (Model_Bag.getItemCount(Model_BaoWu.itemId) < 1) {
            View_CaiLiao_GetPanel.show(VoItem.create(Model_BaoWu.itemId));
            return;
        }
        GGlobal.modelbw.CG_BAOWU_KEYUPGRADE();
    };
    ViewBaoWuLevelUp.prototype.update = function () {
        var s = this;
        var lv = Model_BaoWu.level;
        lv = lv == 0 ? 1 : lv;
        var cfg = Config.baolv_214[lv];
        s.lbPower.text = cfg["power"] + "";
        s.lbLevel.text = "Lv." + lv;
        var vo = VoItem.create(Model_BaoWu.itemId);
        var c = Model_Bag.getItemCount(Model_BaoWu.itemId);
        if (cfg["exp"] > 0) {
            s.barExp.max = cfg["exp"];
            s.barExp.value = Model_BaoWu.exp;
            s.lbAttr.text = ConfigHelp.attrString(JSON.parse(cfg["attr"]), "+");
            var need = Math.ceil((cfg.exp - Model_BaoWu.exp) / 10);
            s.btnLevel.checkNotice = s.btnOneKey.checkNotice = c >= need;
            lv += 1;
            cfg = Config.baolv_214[lv];
            s.lbAttrNext.text = ConfigHelp.attrString(JSON.parse(cfg["attr"]), "+");
            s.lbAttrMax.visible = false;
            s.cost0.visible = true;
            s.maxGroup.visible = false;
            s.attrGroup.visible = true;
        }
        else {
            s.barExp.max = 1;
            s.barExp.value = 1;
            s.barExp._titleObject.text = "已满级";
            s.cost0.visible = false;
            s.attrGroup.visible = false;
            s.lbAttrMax.visible = true;
            s.maxGroup.visible = true;
            s.lbAttrMax.text = ConfigHelp.attrString(JSON.parse(cfg["attr"]), "+", "#FFFFFF", "#15f234");
            s.btnLevel.checkNotice = s.btnOneKey.checkNotice = false;
        }
        s.lbCount.setCount(c);
        s.lbCount.setImgUrl(vo.icon);
        s.itemName.text = vo.name;
        s.itemName.color = Color.getColorInt(vo.quality);
    };
    ViewBaoWuLevelUp.prototype.onBagUpdate = function () {
        this.lbCount.setCount(Model_Bag.getItemCount(Model_BaoWu.itemId));
    };
    ViewBaoWuLevelUp.prototype.onShown = function () {
        var s = this;
        s.update();
        s.btnLevel.addClickListener(s.onlvlup, s);
        s.btnOneKey.addClickListener(s.onOneKeylvlup, s);
        GGlobal.reddot.listen(ReddotEvent.CHECK_BAOWU, s.update, s);
    };
    ViewBaoWuLevelUp.prototype.onHide = function () {
        var s = this;
        s.btnLevel.removeClickListener(s.onlvlup, s);
        s.btnOneKey.removeClickListener(s.onOneKeylvlup, s);
        GGlobal.reddot.remove(ReddotEvent.CHECK_BAOWU, s.update, s);
        GGlobal.layerMgr.close(UIConst.BAOWU_LEVELUP);
    };
    ViewBaoWuLevelUp.URL = "ui://jvxpx9emppkp3dj";
    return ViewBaoWuLevelUp;
}(UIModalPanel));
__reflect(ViewBaoWuLevelUp.prototype, "ViewBaoWuLevelUp");
