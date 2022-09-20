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
var ViewEightLock = (function (_super) {
    __extends(ViewEightLock, _super);
    function ViewEightLock() {
        var _this = _super.call(this) || this;
        _this.setSkin("eightLock", "eightLock_atlas0", "ViewEightLock");
        return _this;
    }
    ViewEightLock.prototype.setExtends = function () {
        var f = fairygui.UIObjectFactory.setPackageItemExtension;
        f(ItemEILock.URL, ItemEILock);
        f(ItemFWCol.URL, ItemFWCol);
        f(ItemFWJD.URL, ItemFWJD);
        f(ItemFWYL.URL, ItemFWYL);
        f(ItemAuthenRank1.URL, ItemAuthenRank1);
        f(ItemAuthenRank2.URL, ItemAuthenRank2);
        f(AuthenListGrid.URL, AuthenListGrid);
    };
    ViewEightLock.prototype.initView = function () {
        _super.prototype.initView.call(this);
        var self = this;
        if (ModelEightLock.originalDatas[UIConst.AUTHEN_RANK]) {
            self.datas = [UIConst.AUTHEN_RANK, UIConst.EIGHTLOCK, UIConst.FUWENCOLLECT, UIConst.FUWENJIANDING, UIConst.FUWENYOULI];
        }
        else {
            self.datas = [UIConst.EIGHTLOCK, UIConst.FUWENCOLLECT, UIConst.FUWENJIANDING, UIConst.FUWENYOULI];
        }
        self.list.itemRenderer = function (i, r) {
            r.data = self.datas[i];
            if (self.datas[i] == UIConst.EIGHTLOCK) {
                r.setActivityIcon(610101);
            }
            else {
                r.setActivityIcon(self.datas[i]);
            }
            r.checkNotice = GGlobal.modelEightLock.getNotice(self.datas[i]);
        };
        self.list.callbackThisObj = self;
        self.list.addEventListener(fairygui.ItemEvent.CLICK, self.onSel, self);
        self.list.numItems = self.datas.length;
        if (!self.curTab) {
            self.list.selectedIndex = 0;
            self.curTab = self.list._children[0];
        }
    };
    ViewEightLock.prototype.onSel = function (evt) {
        var self = this;
        var render = evt.itemObject;
        if (self.curTab && render.data == self.curTab.data)
            return;
        self.curTab = render;
        self.setSel(render.data);
    };
    ViewEightLock.prototype.setSel = function (id) {
        var self = this;
        var tabs = self.list._children;
        switch (self._curId) {
            case UIConst.AUTHEN_RANK:
                self.container.removeChild(Singleton.getInst(ChildAuthenRank));
                break;
            case UIConst.EIGHTLOCK:
                self.container.removeChild(Singleton.getInst(ChildEightLock));
                break;
            case UIConst.FUWENCOLLECT:
                self.container.removeChild(Singleton.getInst(ChildFuWenCol));
                break;
            case UIConst.FUWENJIANDING:
                self.container.removeChild(Singleton.getInst(ChildFuWenJD));
                break;
            case UIConst.FUWENYOULI:
                self.container.removeChild(Singleton.getInst(ChildFuWenYL));
                break;
        }
        switch (id) {
            case UIConst.AUTHEN_RANK:
                self.container.addChild(Singleton.getInst(ChildAuthenRank));
                break;
            case UIConst.EIGHTLOCK:
                self.container.addChild(Singleton.getInst(ChildEightLock));
                break;
            case UIConst.FUWENCOLLECT:
                self.container.addChild(Singleton.getInst(ChildFuWenCol));
                break;
            case UIConst.FUWENJIANDING:
                self.container.addChild(Singleton.getInst(ChildFuWenJD));
                break;
            case UIConst.FUWENYOULI:
                self.container.addChild(Singleton.getInst(ChildFuWenYL));
                break;
        }
        self._curId = id;
    };
    ViewEightLock.prototype.onUpdate = function () {
        var self = this;
        if (ModelEightLock.originalDatas[UIConst.AUTHEN_RANK]) {
            self.datas = [UIConst.AUTHEN_RANK, UIConst.EIGHTLOCK, UIConst.FUWENCOLLECT, UIConst.FUWENJIANDING, UIConst.FUWENYOULI];
        }
        else {
            self.datas = [UIConst.EIGHTLOCK, UIConst.FUWENCOLLECT, UIConst.FUWENJIANDING, UIConst.FUWENYOULI];
            if (self._curId == UIConst.AUTHEN_RANK) {
                self._curId = UIConst.EIGHTLOCK;
            }
        }
        self.list.numItems = self.datas.length;
        if (!self.curTab) {
            self.list.selectedIndex = 0;
            self.curTab = self.list._children[0];
        }
    };
    ViewEightLock.prototype.onShown = function () {
        var self = this;
        _super.prototype.onShown.call(this);
        if (ModelEightLock.originalDatas[UIConst.AUTHEN_RANK]) {
            self.setSel(self._args == null ? UIConst.AUTHEN_RANK : self._args);
        }
        else {
            self.setSel(self._args == null ? UIConst.EIGHTLOCK : self._args);
        }
        self.registerEvent(true);
    };
    ViewEightLock.prototype.onHide = function () {
        _super.prototype.onHide.call(this);
        var self = this;
        self.setSel(-1);
        if (self.curTab)
            self.curTab.selected = false;
        self.registerEvent(false);
    };
    /**
    * 注册事件的统一入口，最好能集中在这里写
    * @param pFlag
    */
    ViewEightLock.prototype.registerEvent = function (pFlag) {
        var self = this;
        var model = GGlobal.modelEightLock;
        model.register(pFlag, ModelEightLock.msg_datas, self.onUpdate, self);
        model.register(pFlag, ModelEightLock.msg_fwCol, self.onUpdate, self);
        model.register(pFlag, ModelEightLock.msg_fwJD, self.onUpdate, self);
        model.register(pFlag, ModelEightLock.msg_jdpm, self.onUpdate, self);
    };
    return ViewEightLock;
}(UIPanelBase));
__reflect(ViewEightLock.prototype, "ViewEightLock");
