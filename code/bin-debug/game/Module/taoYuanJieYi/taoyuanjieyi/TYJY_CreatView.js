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
/**
 * 创建义盟界面
 */
var TYJY_CreatView = (function (_super) {
    __extends(TYJY_CreatView, _super);
    function TYJY_CreatView() {
        var _this = _super.call(this) || this;
        _this._cost = 0;
        _this._count = 0;
        _this.nameReg = /[^0-9a-zA-Z\u4E00-\u9fa50]/g;
        _this.childrenCreated();
        return _this;
    }
    TYJY_CreatView.prototype.childrenCreated = function () {
        var self = this;
        self.view = fairygui.UIPackage.createObject("taoYuanJieYi", "TYJY_CreatView").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        _super.prototype.childrenCreated.call(this);
    };
    TYJY_CreatView.prototype.onShown = function () {
        var self = this;
        var type = this._args.type;
        self.c1.selectedIndex = type;
        if (type == 0) {
            self.frame.text = "创建义盟";
            self.okBtn.text = "创建义盟";
        }
        else {
            self.frame.text = "修改名字";
            self.okBtn.text = "确定修改";
        }
        self.okBtn.addClickListener(this.onCreate, this);
        self.registerEvent(true);
        IconUtil.setImg(self.bgImg, Enum_Path.TYJY_URL + "bg_2.jpg");
        var cfg = Config.xtcs_004[7701];
        var id = Number(ConfigHelp.SplitStr(cfg.other)[0][0]);
        var v = VoItem.create(id);
        IconUtil.setImg(self.iconYuanBao, Enum_Path.ICON70_URL + v.icon + ".png");
        self._cost = Number(ConfigHelp.SplitStr(cfg.other)[0][2]);
        self.lb.text = self._cost + "";
        var itemVo = VoItem.create(410119);
        self._count = Model_Bag.getItemCount(410119);
        var color = self._count >= 1 ? 2 : 6;
        self.consumeLb.text = "消耗：" + HtmlUtil.fontNoSize(itemVo.name, Color.getColorStr(itemVo.quality)) + "x1" +
            HtmlUtil.fontNoSize("(" + self._count + "/1)", Color.getColorStr(color));
    };
    TYJY_CreatView.prototype.onHide = function () {
        GGlobal.layerMgr.close(UIConst.TYJY_CREATE);
        var s = this;
        IconUtil.setImg(s.bgImg, null);
        s.okBtn.removeClickListener(s.onCreate, s);
        IconUtil.setImg(s.iconYuanBao, null);
    };
    TYJY_CreatView.prototype.registerEvent = function (pFlag) {
        var self = this;
        EventUtil.register(pFlag, self.inputName, egret.TextEvent.CHANGE, self.onInput, self);
    };
    /**
     * 创建义盟
     */
    TYJY_CreatView.prototype.onCreate = function (e) {
        if (!Model_GlobalMsg.rename) {
            ViewCommonWarn.text("改名系统维护中");
            return;
        }
        var name = this.inputName.text;
        name = name.replace(/\s+/g, ''); //过滤空格
        if (name == "") {
            ViewCommonWarn.text("请输入名称");
            return;
        }
        var len = this.getStrByteLen(name);
        if (len > 12) {
            ViewCommonWarn.text("名字长度不能超过6个汉字或12个英文数字");
            return;
        }
        if (name == GGlobal.model_TYJY.myGangName) {
            ViewCommonWarn.text("义盟名字不可重复");
            return;
        }
        if (this.c1.selectedIndex == 0) {
            if (Model_player.voMine.yuanbao < this._cost) {
                ModelChongZhi.guideToRecharge();
                return;
            }
            GGlobal.model_TYJY.CG_CREATE(name);
        }
        else {
            if (this._count <= 0) {
                ViewCommonWarn.text("道具不足");
                return;
            }
            GGlobal.model_TYJY.CG_CHANGE_NAME(name);
        }
    };
    TYJY_CreatView.prototype.onInput = function () {
        var e = this, t = e.inputName.text, n = t.length;
        if (t.length > 0) {
            var o = t.charAt(n - 1), i = o.match(e.nameReg);
            if (null == i)
                return;
            t = t.substr(0, n - 1);
        }
        var n = this.getStrByteLen(t);
        if (t != e.inputName.text) {
            e.inputName.text = t;
        }
    };
    TYJY_CreatView.prototype.getStrByteLen = function (str) {
        var len = str.replace(/[^x00-xFF]/g, '**').length;
        return len;
    };
    TYJY_CreatView.URL = "ui://m2fm2aiyihs7x";
    return TYJY_CreatView;
}(UIModalPanel));
__reflect(TYJY_CreatView.prototype, "TYJY_CreatView");
