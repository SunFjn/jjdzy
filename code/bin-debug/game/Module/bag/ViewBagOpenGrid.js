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
var ViewBagOpenGrid = (function (_super) {
    __extends(ViewBagOpenGrid, _super);
    function ViewBagOpenGrid() {
        return _super.call(this) || this;
    }
    ViewBagOpenGrid.createInstance = function () {
        return (fairygui.UIPackage.createObject("bag", "ViewBagOpenGrid"));
    };
    ViewBagOpenGrid.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.btnOk = (this.getChild("btnOk"));
        this.btnCancel = (this.getChild("btnCancel"));
        this.btnAdd = (this.getChild("btnAdd"));
        this.btnReduce = (this.getChild("btnReduce"));
        this.btnClose = (this.getChild("btnClose"));
        this.lbmonery = (this.getChild("lbmonery"));
        this.lbNum = (this.getChild("lbNum"));
        this.btnClose.addClickListener(this.closeHandle, this);
    };
    ViewBagOpenGrid.prototype.closeHandle = function (event) {
        if (event === void 0) { event = null; }
        this.removeFromParent();
        fairygui.GRoot.inst.removeEventListener(fairygui.GObject.SIZE_CHANGED, this.resetPosition, this);
    };
    ViewBagOpenGrid.prototype.resetPosition = function () {
        // this.shape.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
    };
    Object.defineProperty(ViewBagOpenGrid, "instance", {
        get: function () {
            if (!ViewBagOpenGrid._instance)
                ViewBagOpenGrid._instance = ViewBagOpenGrid.createInstance();
            return ViewBagOpenGrid._instance;
        },
        enumerable: true,
        configurable: true
    });
    ViewBagOpenGrid.show = function () {
        fairygui.GRoot.inst.addChild(ViewBagOpenGrid.instance);
        ViewBagOpenGrid.instance.update();
    };
    ViewBagOpenGrid.prototype.update = function () {
        this.resetPosition();
        fairygui.GRoot.inst.addEventListener(fairygui.GObject.SIZE_CHANGED, this.resetPosition, this);
        this.updateView();
    };
    ViewBagOpenGrid.prototype.updateView = function () {
        this.lbmonery.text = 111 + "";
    };
    //>>>>end
    ViewBagOpenGrid.URL = "ui://v4sxjak5etor2";
    return ViewBagOpenGrid;
}(fairygui.GComponent));
__reflect(ViewBagOpenGrid.prototype, "ViewBagOpenGrid");
