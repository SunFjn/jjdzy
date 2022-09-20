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
var FunctionPreviewItem = (function (_super) {
    __extends(FunctionPreviewItem, _super);
    function FunctionPreviewItem() {
        var _this = _super.call(this) || this;
        _this.choose = false;
        _this.check = false;
        return _this;
    }
    FunctionPreviewItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("functionPreview", "FunctionPreviewItem"));
    };
    FunctionPreviewItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var sf = this;
        CommonManager.parseChildren(sf, sf);
        this.setChoose(false);
        this.checkNotice(false);
    };
    FunctionPreviewItem.prototype.show = function (vo) {
        this.vo = vo;
        this.gqLb.text = vo.tips;
        this.maskImg.visible = false;
        this.drawLb.visible = false;
        if (Model_FunctionPreview.drawArr.indexOf(vo.id) != -1) {
            this.promptImg.visible = true;
            this.checkNotice(false);
        }
        else {
            this.promptImg.visible = false;
            if (GGlobal.modelGuanQia.curGuanQiaLv >= vo.id) {
                this.drawLb.visible = true;
                this.checkNotice(true);
            }
            else {
                this.maskImg.visible = true;
                this.checkNotice(false);
            }
        }
        IconUtil.setImg1(Enum_Path.SYSSHOW_URL + vo.icon + ".png", this.iconImg);
        if (vo.choose) {
            this.setChoose(true);
        }
        else {
            this.setChoose(false);
        }
    };
    FunctionPreviewItem.prototype.setChoose = function (value) {
        this.choose = value;
        this.selImg.visible = value;
    };
    FunctionPreviewItem.prototype.checkNotice = function (value) {
        this.noticeImg.visible = value;
        this.check = value;
    };
    FunctionPreviewItem.URL = "ui://j1v1kh34ejra4";
    return FunctionPreviewItem;
}(fairygui.GComponent));
__reflect(FunctionPreviewItem.prototype, "FunctionPreviewItem");
