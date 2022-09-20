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
var VBaZTGridGod = (function (_super) {
    __extends(VBaZTGridGod, _super);
    function VBaZTGridGod() {
        return _super.call(this) || this;
    }
    VBaZTGridGod.createInstance = function () {
        return (fairygui.UIPackage.createObject("baZhenTu", "VBaZTGridGod"));
    };
    VBaZTGridGod.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
        s.btn.addClickListener(s.onBuy, s);
    };
    Object.defineProperty(VBaZTGridGod.prototype, "vo", {
        set: function (v) {
            var s = this;
            s._vo = v;
            var it = ConfigHelp.makeItem(JSON.parse(v.consume)[0]);
            IconUtil.setImg(s.imgIt, Enum_Path.ICON70_URL + it.icon + ".png");
            s.lbCt.text = it.count + "";
            if (v.shangxian > 0) {
                s.countLb.visible = true;
                var exchangeNum = GGlobal.modelBaZhenTu.godFuWenData[v.sf] ? GGlobal.modelBaZhenTu.godFuWenData[v.sf] : 0;
                var color = exchangeNum >= v.shangxian ? 6 : 2;
                s.countLb.text = "剩余：" + HtmlUtil.fontNoSize((v.shangxian - exchangeNum) + "/" + v.shangxian, Color.getColorStr(color));
            }
            else {
                s.countLb.visible = false;
            }
            var sf = Config.bztzf_261[v.sf];
            s.lbName.text = ConfigHelp.createColorName(sf.name, sf.pz);
            s.grid.isShowEff = true;
            s.grid.tipEnable = true;
            var vb = new VoBaZhenTu();
            vb.id = sf.id; //符文id
            vb.starLv = 1; //符文星级
            vb.level = 0; //符文等级
            vb.initLib();
            s.grid.vo = vb;
        },
        enumerable: true,
        configurable: true
    });
    VBaZTGridGod.prototype.onBuy = function () {
        var s = this;
        if (!s._vo) {
            return;
        }
        var exchangeNum = GGlobal.modelBaZhenTu.godFuWenData[s._vo.sf] ? GGlobal.modelBaZhenTu.godFuWenData[s._vo.sf] : 0;
        if (s._vo.shangxian != 0 && exchangeNum >= s._vo.shangxian) {
            ViewCommonWarn.text("当前符文已全部兑完");
            return;
        }
        var it = ConfigHelp.makeItem(JSON.parse(s._vo.consume)[0]);
        var ct = Model_Bag.getItemCount(it.id);
        if (ct < it.count) {
            View_CaiLiao_GetPanel.show(it);
            return;
        }
        GGlobal.modelBaZhenTu.CG_BUY_4425(s._vo.id);
    };
    VBaZTGridGod.prototype.clean = function () {
        _super.prototype.clean.call(this);
        var s = this;
        IconUtil.setImg(s.imgIt, "");
        s.grid.clean();
    };
    VBaZTGridGod.URL = "ui://xrzn9ppairzj2c";
    return VBaZTGridGod;
}(fairygui.GComponent));
__reflect(VBaZTGridGod.prototype, "VBaZTGridGod");
