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
var Item_ActCom_PXSB = (function (_super) {
    __extends(Item_ActCom_PXSB, _super);
    function Item_ActCom_PXSB() {
        return _super.call(this) || this;
    }
    Item_ActCom_PXSB.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
        s.list.itemRenderer = s.renderHandle;
        s.list.callbackThisObj = s;
    };
    Item_ActCom_PXSB.prototype.setData = function (arr, day) {
        var self = this;
        var model = GGlobal.model_ActPXSB;
        self._cfg = Config.pxsb_778[arr[0]];
        if (!self._cfg)
            return;
        self.btnGo.visible = arr[1] == 0 ? true : false;
        self.btnGet.visible = self.btnGet.checkNotice = arr[1] == 1 ? true : false;
        self.imgGet.visible = arr[1] == 2 ? true : false;
        var color = day >= self._cfg.ts ? Color.GREENSTR : Color.REDSTR;
        self.lab.text = BroadCastManager.reTxt("累计{0}天消费满{1}元宝<font color='{2}'>({3}/{4})</font>", self._cfg.ts, model.getWanText1(self._cfg.xf), color, day, self._cfg.ts);
        self._listData = ConfigHelp.makeItemListArr(self._cfg.jl);
        self.list.numItems = self._listData ? self._listData.length : 0;
        self.btnGo.addClickListener(self.onClickGo, self);
        self.btnGet.addClickListener(self.onClickRec, self);
    };
    Item_ActCom_PXSB.prototype.renderHandle = function (index, obj) {
        var item = obj;
        item.tipEnabled = true;
        item.isShowEff = true;
        item.vo = this._listData[index];
    };
    Item_ActCom_PXSB.prototype.clean = function () {
        _super.prototype.clean.call(this);
        this.list.numItems = 0;
        this.btnGo.removeClickListener(this.onClickGo, this);
        this.btnGet.removeClickListener(this.onClickRec, this);
    };
    Item_ActCom_PXSB.prototype.onClickGo = function (e) {
        GGlobal.layerMgr.open(UIConst.CANGBAOGE);
        e.stopImmediatePropagation();
        e.stopPropagation();
    };
    Item_ActCom_PXSB.prototype.onClickRec = function () {
        GGlobal.model_ActPXSB.CG_GET(0, this._cfg.id);
    };
    Item_ActCom_PXSB.URL = "ui://qb4y6bxephch1";
    return Item_ActCom_PXSB;
}(fairygui.GComponent));
__reflect(Item_ActCom_PXSB.prototype, "Item_ActCom_PXSB");
