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
var View_DDFH_Math = (function (_super) {
    __extends(View_DDFH_Math, _super);
    function View_DDFH_Math() {
        var _this = _super.call(this) || this;
        _this.index = 1;
        _this.listArr = [];
        _this.isStart = false;
        _this.times = 11;
        fairygui.UIObjectFactory.setPackageItemExtension(DDFH_MathRender.URL, DDFH_MathRender);
        _this.isClosePanel = false;
        _this.childrenCreated();
        return _this;
    }
    View_DDFH_Math.prototype.childrenCreated = function () {
        var a = this;
        a.view = fairygui.UIPackage.createObject("Arena", "View_DDFH_Math").asCom;
        a.contentPane = a.view;
        a.qzImg = (a.view.getChild("qzImg"));
        a.list = (a.view.getChild("list"));
        a.list.callbackThisObj = a;
        a.list.itemRenderer = a.renderHandler;
        a.list.setVirtualAndLoop();
        _super.prototype.childrenCreated.call(this);
    };
    View_DDFH_Math.prototype.renderHandler = function (index, obj) {
        var a = this;
        var render = obj;
        render.show(a.listArr[index][0], a.listArr[index][1], a.listArr[index][2]);
    };
    View_DDFH_Math.prototype.updateShow = function () {
        var a = this;
        a.listArr = [[1001, 2001, ""], [1002, 2001, ""], [1003, 2001, ""]];
        var len = a.listArr.length;
        a.list.numItems = len;
        a.isStart = false;
        a.index = 0;
        a.list.scrollPane.scrollDown(1, true);
    };
    View_DDFH_Math.prototype.scrollComp = function () {
        var a = this;
        a.index++;
        if (a.index >= 3 && Model_DDFH.enemyArr.length > 0 && !a.isStart) {
            a.starTime();
        }
        else {
            if (a.list.getFirstChildInView() >= 3) {
                a.list.scrollPane.removeEventListener(fairygui.ScrollPane.SCROLL_END, this.scrollComp, this);
                var times_1 = setTimeout(function () {
                    a.doHideAnimation();
                    GGlobal.mapscene.enterScene(SceneCtrl.DANDAO_FUHUI);
                    clearTimeout(times_1);
                }, 1000);
                return;
            }
        }
        a.list.scrollPane.scrollDown(1, true);
    };
    View_DDFH_Math.prototype.starTime = function () {
        var a = this;
        if (Model_DDFH.enemyArr.length <= 0 || a.index < 3)
            return;
        a.isStart = true;
        a.listArr = a.listArr.concat(Model_DDFH.enemyArr);
        var len = a.listArr.length;
        a.list.numItems = len;
    };
    View_DDFH_Math.prototype.timeHandler = function () {
        var self = this;
        self.times--;
        if (self.times <= 0 && Model_DDFH.enemyArr.length <= 0) {
            ViewCommonWarn.text("匹配不成功");
            self.doHideAnimation();
        }
    };
    View_DDFH_Math.prototype.onShown = function () {
        var a = this;
        a.updateShow();
        a.list.scrollPane.addEventListener(fairygui.ScrollPane.SCROLL_END, this.scrollComp, this);
        IconUtil.setImg(a.qzImg, Enum_Path.IMAGE_MODULES_URL + "area/qz.png");
        a.times = 11;
        Timer.instance.listen(a.timeHandler, a, 1000);
    };
    View_DDFH_Math.prototype.onHide = function () {
        var a = this;
        Model_DDFH.enemyArr = [];
        Timer.instance.remove(a.timeHandler, a);
        GGlobal.layerMgr.close(UIConst.DANDAO_FUHUI_MATH);
        a.list.scrollPane.removeEventListener(fairygui.ScrollPane.SCROLL_END, this.scrollComp, this);
        IconUtil.setImg(a.qzImg, null);
    };
    View_DDFH_Math.URL = "ui://me1skowlr4ogg";
    return View_DDFH_Math;
}(UIModalPanel));
__reflect(View_DDFH_Math.prototype, "View_DDFH_Math");
