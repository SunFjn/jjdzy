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
var ItemShaoZhuFashion = (function (_super) {
    __extends(ItemShaoZhuFashion, _super);
    function ItemShaoZhuFashion() {
        var _this = _super.call(this) || this;
        _this.bodyID = 0;
        return _this;
    }
    ItemShaoZhuFashion.createInstance = function () {
        return (fairygui.UIPackage.createObject("ShaoZhu", "ItemShaoZhuFashion"));
    };
    ItemShaoZhuFashion.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
    };
    ItemShaoZhuFashion.prototype.setVo = function (vo, shaozhuVo) {
        if (shaozhuVo === void 0) { shaozhuVo = null; }
        var self = this;
        self.vo = vo;
        self.shaozhuVo = shaozhuVo;
        self.iconDressed.visible = self.wayGroup.visible = self.starGroup.visible = self.backImg.visible = false;
        if (shaozhuVo && !vo) {
            IconUtil.setImg(self.iconDefault, "resource/image/pifu/" + shaozhuVo.cfg.pf + ".png");
            IconUtil.setImg(self.colorImg, Enum_Path.ICON70_URL + "BmG_3.png");
            self.txtName.text = "默认";
            self.txtName.color = 0xffffff;
            if (shaozhuVo.bodyID == 0)
                self.iconDressed.visible = true;
            self.bodyID = 0;
        }
        else if (vo) {
            var itemVo = VoItem.create(vo.conmuse[0][1]);
            IconUtil.setImg(self.iconDefault, Enum_Path.ICON70_URL + itemVo.icon + ".png");
            IconUtil.setImg(self.colorImg, Enum_Path.ICON70_URL + "BmG_" + itemVo.quality + ".png");
            if (vo.starLv > 0) {
                self.txtNum.text = vo.starLv + "";
                self.starGroup.visible = true;
            }
            else {
                self.wayGroup.visible = true;
                self.wayLb.text = vo.cfg.tips;
            }
            self.txtName.text = vo.name;
            self.txtName.color = itemVo.qColor;
            if (shaozhuVo.bodyID == vo.id)
                self.iconDressed.visible = true;
            self.noticeImg.visible = Model_Bag.getItemCount(vo.conmuse[0][1]) >= vo.conmuse[0][2] && shaozhuVo.starLv > 0;
            self.bodyID = vo.id;
        }
        else {
            IconUtil.setImg(self.iconDefault, null);
            IconUtil.setImg(self.colorImg, Enum_Path.ICON70_URL + "BmG_3.png");
            self.backImg.visible = true;
            self.txtName.text = "";
        }
    };
    ItemShaoZhuFashion.prototype.choose = function (value) {
        this.selectImg.visible = value;
    };
    ItemShaoZhuFashion.URL = "ui://p83wyb2bng03v";
    return ItemShaoZhuFashion;
}(fairygui.GComponent));
__reflect(ItemShaoZhuFashion.prototype, "ItemShaoZhuFashion");
