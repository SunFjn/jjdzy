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
/**消费排行 */
var ChildXiaoFeiPH = (function (_super) {
    __extends(ChildXiaoFeiPH, _super);
    function ChildXiaoFeiPH() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChildXiaoFeiPH.createInstance = function () {
        return (fairygui.UIPackage.createObject("sanGuoQingDian", "ChildXiaoFeiPH"));
    };
    ChildXiaoFeiPH.setExtends = function () {
    };
    ChildXiaoFeiPH.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.items = [];
        for (var i = 0; i < 5; i++) {
            var item = self["item" + i];
            item.setIndex(i);
            self.items.push(self["item" + i]);
        }
        self["n16"].text = "\u524D5\u540D\u9700\u8981\u6D88\u8D39" + HtmlUtil.fontNoSize("100000元宝", "#ff0000") + "\u4EE5\u4E0A\u65B9\u80FD\u4E0A\u699C";
        self["n9"].text = "\u6D88\u8D39" + HtmlUtil.fontNoSize("前5名", "#ffff00") + "\u6D3B\u52A8\u7ED3\u675F\u540E\u6309\u4E00\u5B9A\u6BD4\u4F8B" + HtmlUtil.fontNoSize("返还", "#ff0000") + "\u6D3B\u52A8\u671F\u95F4\u6D88\u8D39\u7684\u5143\u5B9D";
    };
    ChildXiaoFeiPH.prototype.initView = function (pParent) {
        var self = this;
        self._viewParent = pParent;
        self.addRelation(self._viewParent, fairygui.RelationType.Size);
    };
    ChildXiaoFeiPH.prototype.onUpdate = function (info) {
        var self = this;
        var voAct = self.vo;
        if (!voAct) {
            return;
        }
        if (info && info.paiming != 0) {
            self.txtMinePH.text = "\u6211\u7684\u6392\u540D: " + HtmlUtil.fontNoSize("" + info.paiming, "#00ff00");
            self.txtMineCost.text = "\u6211\u7684\u6D88\u8D39: " + HtmlUtil.fontNoSize(info.cost + "\u5143\u5B9D", "#00ff00");
        }
        else {
            self.txtMinePH.text = "\u6211\u7684\u6392\u540D: " + HtmlUtil.fontNoSize("\u672A\u4E0A\u699C", "#00ff00");
            self.txtMineCost.text = "\u6211\u7684\u6D88\u8D39: " + HtmlUtil.fontNoSize(info.cost + "\u5143\u5B9D", "#00ff00");
        }
        var lib = Config.sgxfph_261;
        var arr = [];
        for (var key in lib) {
            var cfg_1 = lib[key];
            if (cfg_1.qs == voAct.qs) {
                arr.push(cfg_1);
            }
        }
        for (var i = 0; i < self.items.length; i++) {
            self.items[i].setData(arr[i]);
        }
        var first = GGlobal.modelSGQD.paiHangDatas[0];
        if (first && first.name) {
            self.txtFirName.text = first.name;
            self.iconXWYD.visible = false;
            self.container.setUIRole(first.modId, first.godWeapon, first.horseId);
            var uiRole = self.container.getUIRole();
            if (uiRole) {
                var cfg = Config.mod_200[uiRole.body];
                if (cfg && cfg.h) {
                    self.txtFirName.y = self.container.y - cfg.h - 25;
                }
                if (uiRole.horseId) {
                    uiRole.setScaleXY(0.6, 0.6);
                }
                else {
                    uiRole.setScaleXY(1, 1);
                }
            }
        }
        else {
            self.txtFirName.y = 150;
            self.iconXWYD.visible = true;
            self.txtFirName.text = "";
        }
        var vo = self.vo;
        self.times = vo.getSurTime();
        if (self.times <= 0) {
            self.txtLeftTm.text = "活动已结束";
        }
        else {
            self.txtLeftTm.text = "活动剩余时间：" + DateUtil.getMSBySecond4(self.times);
        }
        if (self.times > 0) {
            Timer.instance.listen(self.timeHandler, self, 1000);
        }
        else {
            Timer.instance.remove(self.timeHandler, self);
        }
    };
    ChildXiaoFeiPH.prototype.openPanel = function (pData) {
        var self = this;
        self.vo = pData;
        GGlobal.modelSGQD.listen(ModelSGQD.msg_datas_xfph, self.onUpdate, self);
        GGlobal.modelActivity.CG_OPENACT(UIConst.XIAOFEIPH);
        IconUtil.setImg(self.bg, "resource/image/sanGuoQD/" + UIConst.XIAOFEIPH + ".png");
    };
    ChildXiaoFeiPH.prototype.closePanel = function () {
        var self = this;
        GGlobal.modelSGQD.remove(ModelSGQD.msg_datas_xfph, self.onUpdate, self);
        this.container.setUIRole(null);
        Timer.instance.remove(self.timeHandler, self);
        IconUtil.setImg(self.bg, null);
    };
    ChildXiaoFeiPH.prototype.timeHandler = function () {
        var s = this;
        s.times--;
        if (s.times <= 0) {
            this.txtLeftTm.text = "活动已结束";
            Timer.instance.remove(s.timeHandler, s);
        }
        else {
            s.txtLeftTm.text = "活动剩余时间：" + DateUtil.getMSBySecond4(s.times);
        }
    };
    ChildXiaoFeiPH.pkg = "sanGuoQingDian";
    ChildXiaoFeiPH.URL = "ui://kdt501v2tipm1";
    return ChildXiaoFeiPH;
}(fairygui.GComponent));
__reflect(ChildXiaoFeiPH.prototype, "ChildXiaoFeiPH", ["IPanel"]);
