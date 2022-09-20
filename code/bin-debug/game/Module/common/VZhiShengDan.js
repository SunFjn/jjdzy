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
var VZhiShengDan = (function (_super) {
    __extends(VZhiShengDan, _super);
    function VZhiShengDan() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VZhiShengDan.getInst = function () {
        return fairygui.UIPackage.createObject("common", "VZhiSheng");
    };
    VZhiShengDan.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.addClickListener(self.onHand, self);
    };
    VZhiShengDan.prototype.onHand = function () {
        var cfg = Config.zsd_257[this.data.type];
        var tempType = this.c1.selectedIndex;
        if (this.data.isFull) {
            ViewCommonWarn.text("已满阶");
            return;
        }
        switch (tempType) {
            case 0:
                if (this.data.lvl <= 0) {
                    ViewCommonWarn.text("还没激活!");
                    return;
                }
                if (this.data.lvl == cfg.tj) {
                    ViewAlert.show("\u5DF2\u8FBE\u6700\u4F73\u4F7F\u7528\u9636\u7EA7\n\u4F7F\u7528\u540E\u53EF\u76F4\u5347\u4E00\u9636!", Handler.create(this, function func() {
                        GGlobal.modelGlobalMsg.CG3741(this.data.type);
                    }, null, true), ViewAlert.OKANDCANCEL, "使用", "取消", null);
                    var view = GGlobal.layerMgr.getView(UIConst.ALERT);
                    if (view) {
                        view.isClosePanel = false;
                    }
                }
                else if (this.data.lvl < cfg.tj) {
                    var jie = cfg.tj / 10 >> 0;
                    var ji = cfg.tj % 10 >> 0;
                    ViewAlert.show("\u672A\u8FBE\u5230\u6700\u4F73\u4F7F\u7528\u9636\u7EA7(" + jie + "\u9636" + ji + "\u7EA7)\n\u662F\u5426\u73B0\u5728\u4F7F\u7528?", Handler.create(this, function func() {
                        GGlobal.modelGlobalMsg.CG3741(this.data.type);
                    }, null, true), ViewAlert.OKANDCANCEL, "使用", "取消", null);
                }
                else {
                    GGlobal.modelGlobalMsg.CG3741(this.data.type);
                }
                break;
            case 1:
                if (TimeUitl.isIn7Days()) {
                    GGlobal.layerMgr.open(UIConst.SYSTEM_ZHI_GOU, { day: cfg.kf, type: 2 });
                }
                else {
                    var cfg_1 = Config.zsd_257[this.data.type];
                    var vo = new VoItem();
                    vo.initLib(cfg_1.item);
                    View_CaiLiao_GetPanel.show(vo);
                }
                break;
        }
    };
    Object.defineProperty(VZhiShengDan.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (value) {
            var self = this;
            self._data = value;
            var cfg = Config.zsd_257[value.type];
            if (VZhiShengDan.invalNum == 1) {
                return;
            }
            VZhiShengDan.invalNum = 0;
            if (this.data.lvl == cfg.tj) {
                if (Model_GlobalMsg.kaifuDay <= 7) {
                    ViewZSD.show(this.data.type);
                }
            }
            if (value.count > 0) {
                self.visible = true;
                self.c1.setSelectedIndex(0);
                IconUtil.setImg(self.iconZS, "resource/image/zhishengDan/zs_" + value.type + ".png");
                self.txtCount.text = value.count + "";
            }
            else {
                self.c1.setSelectedIndex(1);
                IconUtil.setImg(self.iconGrey, "resource/image/zhishengDan/zs_" + value.type + ".png");
                if (cfg.kf == Model_GlobalMsg.kaifuDay) {
                    self["n19"].visible = true;
                }
                else {
                    self["n19"].visible = false;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    VZhiShengDan.prototype.clean = function () {
        var self = this;
        IconUtil.setImg(self.iconZS, null);
        IconUtil.setImg(self.iconGrey, null);
    };
    VZhiShengDan.URL = "ui://jvxpx9emkhne3dm";
    VZhiShengDan.invalNum = 0; //1升阶 2升阶返回
    return VZhiShengDan;
}(fairygui.GComponent));
__reflect(VZhiShengDan.prototype, "VZhiShengDan");
