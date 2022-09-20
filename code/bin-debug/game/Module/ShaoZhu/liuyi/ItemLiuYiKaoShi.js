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
var ItemLiuYiKaoShi = (function (_super) {
    __extends(ItemLiuYiKaoShi, _super);
    function ItemLiuYiKaoShi() {
        return _super.call(this) || this;
    }
    ItemLiuYiKaoShi.createInstance = function () {
        return (fairygui.UIPackage.createObject("ShaoZhu", "ItemLiuYiKaoShi"));
    };
    ItemLiuYiKaoShi.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
        s.btn.addClickListener(s.onClick, s);
    };
    ItemLiuYiKaoShi.prototype.setVo = function (lyVo, xtVo) {
        var s = this;
        s._lyVo = lyVo;
        s._xtVo = xtVo;
        s.lbLv.text = "Lv." + lyVo.lyLv;
        s.lbGai.text = "合格概率：" + lyVo.ks / 1000 + "%";
        IconUtil.setImg(s.img, Enum_Path.SHAOZHU_URL + lyVo.lyId + "s.png");
        var xtCfg = xtVo.cfg;
        s.itRes = ConfigHelp.makeItemListArr(JSON.parse(xtCfg.consume))[0];
        var ct = Model_Bag.getItemCount(s.itRes.id);
        s.lbIt.text = HtmlUtil.fontNoSize(s.itRes.name + "：", Color.getColorStr(s.itRes.quality)) + HtmlUtil.fontNoSize(ConfigHelp.numToStr(ct) + "/" + s.itRes.count, ct >= s.itRes.count ? Color.GREENSTR : Color.REDSTR);
        s.view0.visible = lyVo.st == 0;
        s.lbPass.visible = lyVo.st == 1;
        s.btn.checkNotice = (ct >= s.itRes.count);
    };
    ItemLiuYiKaoShi.prototype.onClick = function () {
        var s = this;
        if (!s.btn.checkNotice) {
            View_CaiLiao_GetPanel.show(s.itRes);
            return;
        }
        GGlobal.model_LiuYi.CG_KAOSHI_5131(s._xtVo.szId, s._lyVo.lyId);
    };
    ItemLiuYiKaoShi.prototype.clean = function () {
        _super.prototype.clean.call(this);
        IconUtil.setImg(this.img, null);
    };
    ItemLiuYiKaoShi.URL = "ui://p83wyb2bad1l20";
    return ItemLiuYiKaoShi;
}(fairygui.GComponent));
__reflect(ItemLiuYiKaoShi.prototype, "ItemLiuYiKaoShi");
