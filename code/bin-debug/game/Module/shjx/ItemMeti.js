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
var ItemMeti = (function (_super) {
    __extends(ItemMeti, _super);
    function ItemMeti() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ItemMeti.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
        this.grid.tipEnabled = true;
        this.btnHand.checkNotice = true;
        this.btnHand.addClickListener(this.onHand, this);
    };
    ItemMeti.prototype.onHand = function () {
        var view = GGlobal.layerMgr.getView(UIConst.SHJXXILIAN);
        if (view) {
            view.switchMeti(this.grid.vo);
        }
        GGlobal.layerMgr.close(UIConst.SHJXXCAILIAO);
    };
    ItemMeti.prototype.setData = function (value) {
        this._data = value;
        this.grid.vo = VoItem.create(value);
        this.grid.showEff(true);
        this.grid.showText = Model_Bag.getItemCount(this.grid.vo.id) + "";
        this.txtName.text = this.grid.vo.name;
        this.txtName.color = this.grid.vo.qColor;
        this.txtDes.text = Config.daoju_204[this.grid.vo.id].miaoshu;
    };
    ItemMeti.prototype.getData = function () {
        return this._data;
    };
    ItemMeti.prototype.clean = function () {
        ConfigHelp.cleanGridEff(this.grid);
    };
    ItemMeti.URL = "ui://4aepcdbwrjpy25";
    return ItemMeti;
}(fairygui.GComponent));
__reflect(ItemMeti.prototype, "ItemMeti");
