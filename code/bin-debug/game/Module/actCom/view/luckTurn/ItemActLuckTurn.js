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
var ItemActLuckTurn = (function (_super) {
    __extends(ItemActLuckTurn, _super);
    function ItemActLuckTurn() {
        return _super.call(this) || this;
    }
    ItemActLuckTurn.createInstance = function () {
        return (fairygui.UIPackage.createObject("actLuckTurn", "ItemActLuckTurn"));
    };
    ItemActLuckTurn.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
    };
    Object.defineProperty(ItemActLuckTurn.prototype, "st", {
        get: function () {
            return this._st;
        },
        //B:状态:-1未抽，1已抽中，2未抽中，3未抽中
        set: function (v) {
            var s = this;
            s._st = v;
            s.boxYb.visible = v == -1;
            if (v == -1) {
                this.bg.visible = true;
                this.bg1.visible = false;
                this.img.visible = false;
                this.gou.visible = false;
            }
            else {
                this.bg.visible = false;
                this.bg1.visible = true;
                this.gou.visible = true;
                this.img.visible = true;
                this.img.url = CommonManager.getUrl("actLuckTurn", "" + v);
                if (v == 1) {
                    this.gou.url = "ui://px5jiht9kzdy2";
                }
                else {
                    this.gou.url = "ui://px5jiht9kzdy3";
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemActLuckTurn.prototype, "index", {
        get: function () {
            return this._index;
        },
        // -1  0,1,2
        set: function (v) {
            var s = this;
            s._index = v;
            if (v == -1) {
                this.bg.visible = false;
                this.bg1.visible = true;
                this.img.url = CommonManager.getUrl("actLuckTurn", "1");
                this.img.visible = true;
            }
            else {
                this.bg.visible = true;
                this.bg1.visible = false;
                this.img.visible = false;
            }
            this.gou.visible = false;
            s.boxYb.visible = false;
        },
        enumerable: true,
        configurable: true
    });
    ItemActLuckTurn.prototype.clean = function () {
        this.gou.url = null;
        this.img.url = null;
    };
    Object.defineProperty(ItemActLuckTurn.prototype, "cost", {
        set: function (v) {
            this.lbYb.text = v;
        },
        enumerable: true,
        configurable: true
    });
    ItemActLuckTurn.prototype.turn = function () {
        var s = this;
        egret.Tween.get(s).to({ scaleX: 0 }, 200).call(s.turnCge, s).to({ scaleX: 1 }, 200);
    };
    ItemActLuckTurn.prototype.turnCge = function () {
        var s = this;
        s.st = GGlobal.model_LuckTurn.cardArr[s._index];
    };
    ItemActLuckTurn.URL = "ui://px5jiht9kzdya";
    return ItemActLuckTurn;
}(fairygui.GComponent));
__reflect(ItemActLuckTurn.prototype, "ItemActLuckTurn");
