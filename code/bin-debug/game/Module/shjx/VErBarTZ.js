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
var VErBarTZ = (function (_super) {
    __extends(VErBarTZ, _super);
    function VErBarTZ() {
        var _this = _super.call(this) || this;
        _this.urls2 = ["ui://4aepcdbwvwaa32", "ui://4aepcdbwvwaa31", "ui://4aepcdbwvwaa34", "ui://4aepcdbwvwaa33"];
        _this.names = ["青龙之力", "白虎之力", "朱雀之力", "玄武之力"];
        _this.loadRes("shouhunJX", "shouhunJX_atlas0");
        return _this;
    }
    VErBarTZ.prototype.childrenCreated = function () {
        this.view = this.contentPane = fairygui.UIPackage.createObject("shouhunJX", "VErBarTZ").asCom;
        CommonManager.parseChildren(this.view, this);
        this.btnHand.addClickListener(this.onHand, this);
        _super.prototype.childrenCreated.call(this);
    };
    VErBarTZ.prototype.onHand = function () {
        var info = ModelSH.servDatas[this._data.yj];
        if (info) {
            GGlobal.modelSHJX.CG867(this._data.yj);
        }
    };
    VErBarTZ.prototype.onUpdate = function () {
        this.iconType.icon = this.urls2[this._data.yj - 1];
        var info = ModelSH.servDatas[this._data.yj];
        if (info) {
            var cfg = Config.xjtz_266[info.suJie];
            this.btnHand.text = "升级";
            if (cfg) {
                var fitJi1 = Math.floor(info.suLv % 1000);
                this.txtJie.text = this.names[this._data.yj - 1] + (info.suJie % 100 + "\u7EA7");
                this.txtZhanLi.text = "战力 +" + cfg.power;
                var nextCfg = Config.xjtz_266[info.suJie + 1];
                this.txtCur.text = HtmlUtil.fontNoSize("\u5F53\u524D\u9636\u6BB5  ", "#FFC334") + ("\u661F\u5BBF\u8FBE\u5230" + Math.floor(cfg.next % 1000 / 10 >> 0) + "\u9636") + HtmlUtil.fontNoSize("(已激活)", "#16f60b");
                this.txtAttr1.text = ConfigHelp.attrString(JSON.parse(cfg.attr), "+");
                if (nextCfg) {
                    this.grpNext.visible = true;
                    var fitJi = Math.floor(nextCfg.next % 1000);
                    if (fitJi1 >= fitJi) {
                        this.btnHand.enabled = true;
                        this.btnHand.checkNotice = true;
                        this.txtNext.text = HtmlUtil.fontNoSize("\u4E0B\u4E00\u9636\u6BB5  ", "#FFC334") + ("\u661F\u5BBF\u8FBE\u5230" + (fitJi / 10 >> 0) + "\u9636") + HtmlUtil.fontNoSize("(" + (fitJi / 10 >> 0) + "/" + (fitJi / 10 >> 0) + ")", "#00ff00");
                    }
                    else {
                        this.btnHand.enabled = false;
                        this.btnHand.checkNotice = false;
                        this.txtNext.text = HtmlUtil.fontNoSize("\u4E0B\u4E00\u9636\u6BB5  ", "#FFC334") + ("\u661F\u5BBF\u8FBE\u5230" + (fitJi / 10 >> 0) + "\u9636") + HtmlUtil.fontNoSize("(" + (fitJi1 / 10 >> 0) + "/" + (fitJi / 10 >> 0) + ")", "#ff0000");
                    }
                    this.txtAttr2.text = ConfigHelp.attrString(JSON.parse(nextCfg.attr), "+");
                }
                else {
                    this.grpNext.visible = false;
                    this.btnHand.text = "已满级";
                    this.btnHand.enabled = false;
                    this.btnHand.checkNotice = false;
                }
            }
            else {
                this.txtJie.text = this.names[this._data.yj - 1] + "0\u7EA7";
                this.txtZhanLi.text = "战力 +0";
                this.grpNext.visible = false;
                var id = this._data.yj * 1000 + 1;
                cfg = Config.xjtz_266[id];
                var fitJi = Math.floor(cfg.next % 1000);
                var fitJi1 = Math.floor(info.suLv % 1000);
                if (fitJi1 >= fitJi) {
                    this.btnHand.enabled = true;
                    this.btnHand.checkNotice = true;
                    this.txtCur.text = HtmlUtil.fontNoSize("\u5F53\u524D\u9636\u6BB5  ", "#FFC334") + ("\u661F\u5BBF\u8FBE\u5230" + (fitJi / 10 >> 0) + "\u9636") + HtmlUtil.fontNoSize("(" + (fitJi / 10 >> 0) + "/" + (fitJi / 10 >> 0) + ")", "#00ff00");
                }
                else {
                    this.btnHand.enabled = false;
                    this.btnHand.checkNotice = false;
                    this.txtCur.text = HtmlUtil.fontNoSize("\u5F53\u524D\u9636\u6BB5  ", "#FFC334") + ("\u661F\u5BBF\u8FBE\u5230" + (fitJi / 10 >> 0) + "\u9636") + HtmlUtil.fontNoSize("(" + (fitJi1 / 10 >> 0) + "/" + (fitJi / 10 >> 0) + ")", "#ff0000");
                }
                this.txtAttr1.text = ConfigHelp.attrString(JSON.parse(cfg.attr), "+");
            }
        }
    };
    VErBarTZ.prototype.onShown = function () {
        this._data = this._args;
        this.onUpdate();
        GGlobal.modelSHJX.listen(ModelSH.msg_xingUpJie, this.onUpdate, this);
    };
    VErBarTZ.prototype.onHide = function () {
        GGlobal.layerMgr.close(this.panelId);
        GGlobal.modelSHJX.remove(ModelSH.msg_xingUpJie, this.onUpdate, this);
    };
    return VErBarTZ;
}(UIModalPanel));
__reflect(VErBarTZ.prototype, "VErBarTZ");
