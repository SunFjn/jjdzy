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
var ItemWarToDead = (function (_super) {
    __extends(ItemWarToDead, _super);
    function ItemWarToDead() {
        return _super.call(this) || this;
    }
    ItemWarToDead.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
        this.grid.isShowEff = true;
    };
    Object.defineProperty(ItemWarToDead.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (value) {
            this._data = value;
            var highestLayer = GGlobal.modelWarToDead.highestLayer;
            this.grid.vo = ConfigHelp.makeItemListArr(JSON.parse(value.reward))[0];
            var id = value.id;
            var qishu = GGlobal.modelWarToDead.qiShu;
            var curGua = 0;
            if (TimeUitl.isIn7Days()) {
                curGua = id;
            }
            else if (ModelEightLock.originalDatas[UIConst.WARTODEAD1]) {
                curGua = id - (qishu - 1) * 1000;
            }
            else {
                curGua = id - (qishu - 1) * 20;
            }
            this.txtLayer.text = "\u7B2C" + curGua + "\u5173";
            if (highestLayer >= curGua) {
                this.iconTG.visible = true;
            }
            else {
                this.iconTG.visible = false;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemWarToDead.prototype, "selected", {
        get: function () {
            return this._sel;
        },
        set: function (value) {
            this._sel = value;
            this.grid.choose = value;
        },
        enumerable: true,
        configurable: true
    });
    ItemWarToDead.prototype.clean = function () {
        if (this.grid) {
            ConfigHelp.cleanGridEff(this.grid);
        }
    };
    ItemWarToDead.URL = "ui://qzsojhcrasooi";
    return ItemWarToDead;
}(fairygui.GButton));
__reflect(ItemWarToDead.prototype, "ItemWarToDead");
