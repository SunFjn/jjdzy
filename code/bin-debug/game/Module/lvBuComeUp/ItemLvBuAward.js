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
var ItemLvBuAward = (function (_super) {
    __extends(ItemLvBuAward, _super);
    function ItemLvBuAward() {
        return _super.call(this) || this;
    }
    ItemLvBuAward.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.txtJiFen = this.getChild("txtJiFen").asTextField;
        this.noticeImg = this.getChild("noticeImg").asImage;
        this.iconGot = this.getChild("iconGot").asImage;
        this.addClickListener(this.onHand, this);
    };
    ItemLvBuAward.prototype.onHand = function () {
        GGlobal.layerMgr.open(UIConst.VIEWLBGETJL, this._vo);
    };
    Object.defineProperty(ItemLvBuAward.prototype, "vo", {
        get: function () {
            return this._vo;
        },
        set: function (value) {
            var self = this;
            self._vo = value;
            self.txtJiFen.text = "积分: " + value.jifen;
            switch (value.state) {
                case 0:
                    self.noticeImg.visible = false;
                    self.iconGot.visible = false;
                    break;
                case 1:
                    self.noticeImg.visible = true;
                    self.iconGot.visible = false;
                    break;
                case 2:
                    self.noticeImg.visible = false;
                    self.iconGot.visible = true;
                    break;
            }
        },
        enumerable: true,
        configurable: true
    });
    ItemLvBuAward.URL = "ui://01fuz6zcsivqe";
    return ItemLvBuAward;
}(fairygui.GComponent));
__reflect(ItemLvBuAward.prototype, "ItemLvBuAward");
