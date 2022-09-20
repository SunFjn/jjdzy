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
var ViewMHTagert = (function (_super) {
    __extends(ViewMHTagert, _super);
    function ViewMHTagert() {
        var _this = _super.call(this) || this;
        _this.loadRes("Boss", "Boss_atlas0");
        return _this;
    }
    ViewMHTagert.createInstance = function () {
        return (fairygui.UIPackage.createObject("Boss", "ViewMHTagert"));
    };
    ViewMHTagert.prototype.childrenCreated = function () {
        GGlobal.createPack("Boss");
        this.view = fairygui.UIPackage.createObject("Boss", "ViewMHTagert").asCom;
        this.contentPane = this.view;
        this.frame = (this.view.getChild("frame"));
        this.lst = (this.view.getChild("lst"));
        this.lst.itemRenderer = this.onRender;
        this.lst.callbackThisObj = this;
        this.lst.setVirtual();
        this.resetPosition();
        _super.prototype.childrenCreated.call(this);
    };
    ViewMHTagert.prototype.onRender = function (index, obj) {
        var item = obj;
        item.setdata(this.lstDta[index]);
    };
    ViewMHTagert.prototype.update = function () {
        this.lstDta = GGlobal.modelBoss.tagDta.concat();
        this.lstDta = this.lstDta.sort(function (a, b) {
            return getSort(a) < getSort(b) ? -1 : 1;
            function getSort(vo) {
                var st = vo.state;
                var id = vo.id;
                if (st == 1) {
                    return id - 10000;
                }
                else if (st == 0) {
                    return id - 1000;
                }
                else if (st == 2) {
                    return id;
                }
            }
        });
        this.lst.numItems = this.lstDta.length;
    };
    ViewMHTagert.prototype.onShown = function () {
        GGlobal.modelBoss.CG_MHTARGET_1715();
        GGlobal.control.listen(Enum_MsgType.MH_TAGERT, this.update, this);
    };
    ViewMHTagert.prototype.onHide = function () {
        this.lst.numItems = 0;
        GGlobal.layerMgr.close(UIConst.MHAWARDS);
        GGlobal.control.remove(Enum_MsgType.MH_TAGERT, this.update, this);
    };
    ViewMHTagert.prototype.resetPosition = function () {
        this.setXY((fairygui.GRoot.inst.width - this.width) >> 1, (fairygui.GRoot.inst.height - this.height) >> 1);
    };
    ViewMHTagert.URL = "ui://47jfyc6eg50q19";
    return ViewMHTagert;
}(UIModalPanel));
__reflect(ViewMHTagert.prototype, "ViewMHTagert");
