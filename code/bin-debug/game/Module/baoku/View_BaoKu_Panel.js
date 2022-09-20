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
var View_BaoKu_Panel = (function (_super) {
    __extends(View_BaoKu_Panel, _super);
    function View_BaoKu_Panel() {
        var _this = _super.call(this) || this;
        _this.tabArr = [];
        _this.setSkin("baoku", "baoku_atlas0", "View_BaoKu_Panel");
        return _this;
    }
    View_BaoKu_Panel.prototype.setExtends = function () {
        fairygui.UIObjectFactory.setPackageItemExtension(BaoKuItem.URL, BaoKuItem);
    };
    View_BaoKu_Panel.prototype.initView = function () {
        _super.prototype.initView.call(this);
        var a = this;
        for (var i = 0; i < 4; i++) {
            var tab = a["tab" + i];
            tab.data = i;
            tab.addClickListener(a.OnTab, a);
            a.tabArr.push(tab);
        }
        a.list.callbackThisObj = this;
        a.list.itemRenderer = a.renderHandler;
        a.list.setVirtual();
        a.c1.addEventListener(fairygui.StateChangeEvent.CHANGED, a.changeHandle, this);
        var date = new Date(Model_GlobalMsg.getServerTime());
        var key = "baoku_" + Model_player.voMine.id + "_" + date.getDay() + date.getMonth() + date.getFullYear();
        var value = egret.localStorage.getItem(key);
        if (!value) {
            GGlobal.mainUICtr.setIconNotice(UIConst.BAOKU_LZ, false);
            egret.localStorage.setItem(key, "baoku_Notice");
        }
        a.linkLb.addClickListener(a.linkHandler, this);
    };
    View_BaoKu_Panel.prototype.linkHandler = function (event) {
        var panelArr = [3702, 1603, 3602, 4401];
        GGlobal.layerMgr.open(panelArr[this.c1.selectedIndex]);
        event.stopImmediatePropagation();
    };
    View_BaoKu_Panel.prototype.OnTab = function (evt) {
        var a = this;
        var index = evt.target.data;
        if (a.c1.selectedIndex == index)
            return;
        var arr = [UIConst.BAOKU_LZ, UIConst.BAOKU_WS, UIConst.BAOKU_XX, UIConst.BAOKU_SG];
        if (!ModuleManager.isOpen(arr[index], true)) {
            a.tabArr[index].selected = false;
            return;
        }
        a.tabArr[a.c1.selectedIndex].selected = false;
        a.tabArr[index].selected = true;
        a.c1.selectedIndex = index;
    };
    View_BaoKu_Panel.prototype.changeHandle = function () {
        var a = this;
        if (Model_BaoKu.baoKuArr[a.c1.selectedIndex]) {
            a.updateShow();
        }
        else {
            GGlobal.modelBaoKu.CG_OPEN_BAOKU(a.c1.selectedIndex + 1);
        }
    };
    View_BaoKu_Panel.prototype.renderHandler = function (index, obj) {
        var item = obj;
        item.show(Model_BaoKu.baoKuArr[this.c1.selectedIndex][index]);
    };
    View_BaoKu_Panel.prototype.updateShow = function () {
        var a = this;
        if (!Model_BaoKu.baoKuArr[a.c1.selectedIndex])
            return;
        var cfg = Config.bk_236[a.c1.selectedIndex + 1];
        var itemVo = VoItem.create(cfg.item);
        var count = Model_Bag.getItemCount(cfg.item);
        a.costLb.text = count + "";
        a.list.numItems = Model_BaoKu.baoKuArr[a.c1.selectedIndex].length;
        IconUtil.setImg1(Enum_Path.BACK_URL + "baoku_" + a.c1.selectedIndex + ".jpg", a.headIcon);
    };
    View_BaoKu_Panel.prototype.onShown = function () {
        var a = this;
        GGlobal.control.listen(Enum_MsgType.BAOKU, a.updateShow, a);
        if (a._args) {
            if (a.c1.selectedIndex == a._args) {
                a.changeHandle();
            }
            else {
                a.tabArr[a.c1.selectedIndex].selected = false;
                a.c1.selectedIndex = a._args;
            }
        }
        else {
            if (a.c1.selectedIndex == 0) {
                a.changeHandle();
            }
            else {
                a.tabArr[a.c1.selectedIndex].selected = false;
                a.c1.selectedIndex = 0;
            }
        }
        a.tabArr[a.c1.selectedIndex].selected = true;
    };
    View_BaoKu_Panel.prototype.onHide = function () {
        var a = this;
        GGlobal.layerMgr.close(UIConst.BAOKU_LZ);
        GGlobal.control.remove(Enum_MsgType.BAOKU, a.updateShow, a);
        a.list.numItems = 0;
        IconUtil.setImg1(null, a.headIcon);
    };
    View_BaoKu_Panel.URL = "ui://6tpaxc0krkjp1";
    return View_BaoKu_Panel;
}(UIPanelBase));
__reflect(View_BaoKu_Panel.prototype, "View_BaoKu_Panel");
