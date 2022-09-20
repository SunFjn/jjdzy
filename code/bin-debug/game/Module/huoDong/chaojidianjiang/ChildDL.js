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
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var ChildDL = (function (_super) {
    __extends(ChildDL, _super);
    function ChildDL() {
        var _this = _super.call(this) || this;
        _this.st = 0;
        return _this;
    }
    ChildDL.createInstance = function () {
        return (fairygui.UIPackage.createObject("huoDong", "ChildDL"));
    };
    ChildDL.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        s.imgHead = (s.getChild("imgHead"));
        s.lbName = (s.getChild("lbName"));
        s.ylq = (s.getChild("ylq"));
        s.imgNotice = (s.getChild("imgNotice"));
        s.grid = (s.getChild("grid"));
        s.addClickListener(s.clickHandler, s);
    };
    ChildDL.prototype.clickHandler = function () {
        if (this.st != 2) {
            if (GGlobal.modelHuoDong.CJDJ_count > 0) {
                var ef = EffectMgr.addEff("uieff/" + 10007, this.displayListContainer, 65, 60, 600, 600, false);
                ef.mc.scaleX = ef.mc.scaleY = 1.5;
            }
            if (Model_GlobalMsg.kaifuDay > 7) {
                GGlobal.modelHuoDong.CG_LQ_2611(this.idx + 1);
            }
            else {
                GGlobal.modelHuoDong.CG_DRAWREWARD_4373(this.idx + 1);
            }
        }
    };
    ChildDL.prototype.setdata = function (data, index) {
        var s = this;
        s.st = data[0];
        s.idx = index;
        var award = [data[1], data[2], data[3]];
        s.grid.visible = s.st == 2;
        var vo;
        if (s.st == 2) {
            vo = ConfigHelp.makeItem(award);
            s.grid.vo = vo;
            s.grid.tipEnabled = true;
        }
        s.ylq.visible = s.st == 2;
        s.imgNotice.visible = s.st == 0 && GGlobal.modelHuoDong.CJDJ_count > 0;
        s.imgHead.visible = s.st != 2;
        var lib;
        if (Model_GlobalMsg.kaifuDay > 7) {
            lib = Config.cjdjxs1_010[index + 1];
        }
        else {
            lib = Config.cjdjxs_010[index + 1];
        }
        var head = lib.head;
        if (s.st == 2) {
            s.lbName.text = HtmlUtil.fontNoSize(vo.name, Color.getColorStr(vo.quality));
        }
        else {
            s.lbName.text = lib.name;
        }
        var headPic = Config.shezhi_707[head];
        ImageLoader.instance.loader(Enum_Path.HEAD_URL + head + ".png", s.imgHead);
        s.ylq.visible = s.st == 2;
    };
    ChildDL.URL = "ui://vrw7je9rhfv1g";
    return ChildDL;
}(fairygui.GComponent));
__reflect(ChildDL.prototype, "ChildDL");
