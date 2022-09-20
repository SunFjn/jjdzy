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
var ViewZJYW = (function (_super) {
    __extends(ViewZJYW, _super);
    function ViewZJYW() {
        var _this = _super.call(this) || this;
        _this.setSkin("zjyw", "zjyw_atlas0", "ViewZJYW");
        return _this;
    }
    ViewZJYW.prototype.setExtends = function () {
        var f = fairygui.UIObjectFactory;
        f.setPackageItemExtension(ItemZJYW.URL, ItemZJYW);
        f.setPackageItemExtension(VChInfo.URL, VChInfo);
        f.setPackageItemExtension(ChildZJYW.URL, ChildZJYW);
        //火烧赤壁
        f.setPackageItemExtension(ChilHSCB.URL, ChilHSCB);
        f.setPackageItemExtension(Item_HSCB_Rank.URL, Item_HSCB_Rank);
        f.setPackageItemExtension(ItemHSCB.URL, ItemHSCB);
        //六出祁山
        f.setPackageItemExtension(ChildLiuChuQS.URL, ChildLiuChuQS);
        f.setPackageItemExtension(ItemLCQSTitle.URL, ItemLCQSTitle);
        f.setPackageItemExtension(ItemLCQSEnter.URL, ItemLCQSEnter);
        //虎牢关
        f.setPackageItemExtension(ChildTigerPass.URL, ChildTigerPass);
        f.setPackageItemExtension(ItemTigPasEmploy.URL, ItemTigPasEmploy);
        f.setPackageItemExtension(ViewTigPasSceneInfo.URL, ViewTigPasSceneInfo);
    };
    ViewZJYW.prototype.initView = function () {
        _super.prototype.initView.call(this);
        this.tabArr = [this.tab0, this.tab1, this.tab2, this.tab3];
        this.uiArr = [UIConst.CHILDZJYW, UIConst.CHILD_HSCB, UIConst.CHILD_LCQS, UIConst.CHILD_TIGER_PASS];
    };
    ViewZJYW.prototype.onShown = function () {
        var index = 0;
        if (this._args) {
            index = this._args;
        }
        this.tabArr[index].selected = true;
        this.tabChange(index);
        for (var i = 0; i < this.tabArr.length; i++) {
            this.tabArr[i].addClickListener(this.onTab, this);
        }
        GGlobal.reddot.listen(UIConst.CHILD_LCQS, this.checkNotice, this);
        GGlobal.reddot.listen(UIConst.CHILD_TIGER_PASS, this.checkNotice, this);
        this.checkNotice();
    };
    ViewZJYW.prototype.onTab = function (e) {
        var tag = e.currentTarget;
        var index;
        if (tag.id == this.tab0.id) {
            index = 0;
        }
        else if (tag.id == this.tab1.id) {
            index = 1;
        }
        else if (tag.id == this.tab2.id) {
            index = 2;
        }
        else if (tag.id == this.tab3.id) {
            index = 3;
        }
        var pre = this.c1.selectedIndex;
        if (index == pre) {
            return;
        }
        if (!ModuleManager.isOpen(this.uiArr[index], true)) {
            tag.selected = false;
            return;
        }
        this.tabArr[pre].selected = false;
        this.tabChange(index);
    };
    ViewZJYW.prototype.tabChange = function (c) {
        this.c1.selectedIndex = c;
    };
    ViewZJYW.prototype.onHide = function () {
        for (var i = 0; i < this.tabArr.length; i++) {
            this.tabArr[i].removeClickListener(this.onTab, this);
        }
        var pre = this.c1.selectedIndex;
        this.tabArr[pre].selected = false;
        GGlobal.reddot.remove(UIConst.CHILD_LCQS, this.checkNotice, this);
        GGlobal.reddot.remove(UIConst.CHILD_TIGER_PASS, this.checkNotice, this);
    };
    ViewZJYW.prototype.checkNotice = function () {
        var red = GGlobal.reddot;
        this.tab2.checkNotice = red.checkCondition(UIConst.CHILD_LCQS, 0);
        this.tab3.checkNotice = red.checkCondition(UIConst.CHILD_TIGER_PASS, 0);
    };
    return ViewZJYW;
}(UIPanelBase));
__reflect(ViewZJYW.prototype, "ViewZJYW");
