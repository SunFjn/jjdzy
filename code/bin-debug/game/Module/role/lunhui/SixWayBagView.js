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
/**
 * 六道印记背包
 */
var SixWayBagView = (function (_super) {
    __extends(SixWayBagView, _super);
    function SixWayBagView() {
        var _this = _super.call(this) || this;
        _this._equipPos = 0;
        _this.setSkin("lunhui", "lunhui_atlas0", "SixWayBagView");
        return _this;
    }
    SixWayBagView.createInstance = function () {
        return (fairygui.UIPackage.createObject("lunhui", "SixWayBagView"));
    };
    SixWayBagView.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
    };
    SixWayBagView.prototype.initView = function () {
        _super.prototype.initView.call(this);
        var s = this;
        s.list.callbackThisObj = s;
        s.list.itemRenderer = s.renderHandler;
        s.list.setVirtual();
    };
    SixWayBagView.prototype.onShown = function () {
        this._equipPos = this._args;
        this.addListen();
        this.update();
    };
    SixWayBagView.prototype.onHide = function () {
        var s = this;
        s.removeListen();
        // GGlobal.layerMgr.close(UIConst.SIXWAY_BAG);
        s.list.numItems = 0;
        GGlobal.layerMgr.open(UIConst.SIXWAY_YINJI, Model_LunHui.type);
    };
    SixWayBagView.prototype.addListen = function () {
        GGlobal.control.listen(Model_LunHui.UP_LEVEL, this.update, this);
        this.BtnGo.addClickListener(this.onGo, this);
    };
    SixWayBagView.prototype.removeListen = function () {
        // this.vEqu.grid.showEff(false);
        GGlobal.control.remove(Model_LunHui.UP_LEVEL, this.update, this);
        this.BtnGo.removeClickListener(this.onGo, this);
    };
    SixWayBagView.prototype.update = function () {
        var s = this;
        var modellh = GGlobal.modellh;
        s._showArr = [];
        var len = Model_LunHui.bagArr.length;
        var arr1 = []; //红点替换
        var arr2 = []; //无
        var equip = modellh.equipArr[s._equipPos];
        // let typeArr = {};
        // for (let j = 0; j < modellh.equipArr.length; j++) {
        // 	let eq = modellh.equipArr[j];
        // 	if (!eq || eq.id == 0) continue;
        // 	typeArr[eq.type] = true;
        // }
        for (var i = 0; i < Model_LunHui.bagArr.length; i++) {
            var v = Model_LunHui.bagArr[i];
            if (v == null || v.type == 0) {
                continue;
            }
            if (equip == null || equip.id == 0) {
                if (v.type == s._equipPos) {
                    arr1.push(v);
                }
            }
            else {
                if (v.power > equip.power) {
                    if (v.type == equip.type) {
                        arr1.push(v);
                    }
                }
                else {
                    if (v.type == equip.type) {
                        arr2.push(v);
                    }
                }
            }
        }
        arr1.sort(s.sortFunc);
        arr2.sort(s.sortFunc);
        s._showArr = arr1.concat(arr2);
        len = s._showArr.length;
        s.list.numItems = len;
        s.BtnGo.visible = true;
        if (len > 0) {
            s.list.scrollToView(0);
            s.BtnGo.visible = false;
        }
        s.vEqu.grid.isShowEff = true;
        s.vEqu.setEqu(modellh.equipArr[s._equipPos], s._equipPos);
    };
    SixWayBagView.prototype.renderHandler = function (index, obj) {
        var grid = obj;
        grid.grid.isShowEff = true;
        grid.setBag(this._showArr[index], this._equipPos);
    };
    SixWayBagView.prototype.sortFunc = function (a, b) {
        if (a.pz != b.pz) {
            return b.pz - a.pz;
        }
        if (a.star != b.star) {
            return b.star - a.star;
        }
        if (a.lv != b.lv) {
            return b.lv - a.lv;
        }
        return b.id - a.id;
    };
    SixWayBagView.prototype.onGo = function () {
        var s = this;
        GGlobal.layerMgr.open(UIConst.LHFB);
        s.closeEventHandler(null);
    };
    SixWayBagView.URL = "ui://ehelf5bh11m1wx";
    return SixWayBagView;
}(UIPanelBase));
__reflect(SixWayBagView.prototype, "SixWayBagView");
