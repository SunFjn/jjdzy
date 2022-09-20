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
var TipQianNengDan = (function (_super) {
    __extends(TipQianNengDan, _super);
    function TipQianNengDan() {
        var _this = _super.call(this) || this;
        _this.childrenCreated();
        return _this;
    }
    TipQianNengDan.prototype.childrenCreated = function () {
        var self = this;
        self.view = fairygui.UIPackage.createObject("common", "TipEatDan").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        _super.prototype.childrenCreated.call(this);
    };
    TipQianNengDan.prototype.onShown = function () {
        var self = this;
        var m = GGlobal.model_QianNeng;
        self.btnOneKey.addClickListener(self.onClickEat, self);
        self.btnEat.addClickListener(self.onClickEat, self);
        m.listen(Model_QianNeng.OPENUI, self.show, self);
        this._sz = this._args[0];
        this._vo = this._args[1];
        this.show();
    };
    TipQianNengDan.prototype.onHide = function () {
        var self = this;
        var m = GGlobal.model_QianNeng;
        self.btnOneKey.removeClickListener(self.onClickEat, self);
        self.btnEat.removeClickListener(self.onClickEat, self);
        m.remove(Model_QianNeng.OPENUI, self.show, self);
        self.grid.clean();
    };
    TipQianNengDan.prototype.show = function () {
        var s = this;
        var model = GGlobal.modelShaoZhu;
        var m = GGlobal.model_QianNeng;
        var qn = m.qianNObj[s._sz.shaozhuID];
        var vo = s._vo;
        s.grid.tipEnabled = false;
        s.grid.isShowEff = true;
        s.grid.vo = vo;
        // ImageLoader.instance.loader(Enum_Path.ICON70_URL + "BmG_" + vo.quality + ".png", this.bg);
        // ImageLoader.instance.loader(Enum_Path.ICON70_URL + vo.icon + ".png", this.imgIcon);
        this.labName.text = vo.name;
        this.labName.color = Color.getColorInt(vo.quality);
        this._maxCount = 0;
        if (vo.id == Model_QianNeng.EAT_DAN0) {
            this._maxCount = qn.cfg.max1;
        }
        else {
            this._maxCount = qn.cfg.max2;
        }
        for (var i = 0; i < qn.danArr.length; i++) {
            var dan = qn.danArr[i];
            if (dan.cfg.id == s._vo.id) {
                s._dan = dan;
                break;
            }
        }
        this.labHas.text = "已吞噬：" + s._dan.ct + "/" + this._maxCount;
        vo.count = Model_Bag.getItemCount(vo.id);
        this.labCount.text = "拥有数量：" + vo.count;
        //属性
        var arr = JSON.parse(s._dan.cfg.attr);
        for (var i = 0; i < arr.length; i++) {
            arr[i][1] = Number(arr[i][1]) * s._dan.ct;
        }
        this.labAttr.text = ConfigHelp.attrString(arr, "+");
        this.lab.text = "提升潜能可增加吞噬上限";
        this.btnEat.checkNotice = vo.count > 0 && s._dan.ct < this._maxCount;
        this.btnOneKey.checkNotice = vo.count > 0 && s._dan.ct < this._maxCount;
    };
    TipQianNengDan.prototype.onClickEat = function (e) {
        var type = 0;
        var s = this;
        if (e.currentTarget == s.btnOneKey) {
            type = 1;
        }
        if (s._vo.count <= 0) {
            View_CaiLiao_GetPanel.show(s._vo);
            return;
        }
        if (s._dan.ct >= this._maxCount) {
            ViewCommonWarn.text("提升潜能可增加吞噬上限");
            return;
        }
        var ct = type == 1 ? s._vo.count : 1;
        GGlobal.model_QianNeng.CG_EAT_5137(s._sz.shaozhuID, s._dan.ty, ct);
    };
    return TipQianNengDan;
}(UIModalPanel));
__reflect(TipQianNengDan.prototype, "TipQianNengDan");
