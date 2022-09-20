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
var ItemTigPasEmploy = (function (_super) {
    __extends(ItemTigPasEmploy, _super);
    function ItemTigPasEmploy() {
        return _super.call(this) || this;
    }
    ItemTigPasEmploy.createInstance = function () {
        return (fairygui.UIPackage.createObject("zjyw", "ItemTigPasEmploy"));
    };
    ItemTigPasEmploy.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
    };
    Object.defineProperty(ItemTigPasEmploy.prototype, "vo", {
        get: function () {
            return this._vo;
        },
        set: function (v) {
            var s = this;
            s._vo = v;
            if (v) {
                s.vhead.setdata(v.head, -1, "", v.vip, false, v.frame);
                s.lbName.text = v.name;
                s.lbNo.visible = false;
                s.lbYb.text = "" + v.price;
                if (Model_player.voMine.yuanbao < v.price) {
                    s.lbYb.color = Color.REDINT;
                }
                else {
                    s.lbYb.color = Color.GREENINT;
                }
                s.lbPower.text = "战力:" + ConfigHelp.numToStr(v.power);
                // s.lbPower.text = "战力:" + v.power
                s.imgYb.visible = true;
                var color = v.count == 0 ? Color.REDSTR : Color.GREENSTR;
                s.lbCt.text = "剩余雇佣次数：" + HtmlUtil.fontNoSize(v.count + "", color);
            }
            else {
                s.vhead.setdata(null);
                s.lbNo.visible = true;
                s.lbYb.text = "";
                s.lbPower.text = "";
                s.lbName.text = "";
                s.imgYb.visible = false;
                s.lbCt.text = "";
            }
        },
        enumerable: true,
        configurable: true
    });
    ItemTigPasEmploy.URL = "ui://7a366usay5hd2g";
    return ItemTigPasEmploy;
}(fairygui.GButton));
__reflect(ItemTigPasEmploy.prototype, "ItemTigPasEmploy");
