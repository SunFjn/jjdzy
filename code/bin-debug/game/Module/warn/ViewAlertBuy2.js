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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/**
 * @author: lujiahao
 * @date: 2020-01-09 17:54:18
 */
var ViewAlertBuy2 = (function (_super) {
    __extends(ViewAlertBuy2, _super);
    function ViewAlertBuy2() {
        var _this = _super.call(this) || this;
        _this._maxValue = 100;
        _this._minValue = 1;
        _this.speed = 1;
        _this.childrenCreated();
        return _this;
    }
    ViewAlertBuy2.createInstance = function () {
        return (fairygui.UIPackage.createObject("common", "ViewAlertBuy2"));
    };
    /**
     * 显示购买提示
     * @param pDefaultValue 默认显示的数量
     * @param pMaxValue 最大数量限制
     * @param pMoneyType 货币类型/物品id
     * @param pOnCountChange 数量改变的回调函数
     * @param pOnOk 确认的回调函数
     * @param pThisObj 回调caller
     */
    ViewAlertBuy2.show = function (pDefaultValue, pMaxValue, pMoneyType, pOnCountChange, pOnOk, pThisObj) {
        GGlobal.layerMgr.open(UIConst.ALERT_BUY2, {
            defaultValue: pDefaultValue,
            maxValue: pMaxValue,
            moneyType: pMoneyType,
            onCountChange: pOnCountChange,
            onOk: pOnOk,
            thisObj: pThisObj
        });
    };
    ViewAlertBuy2.prototype.childrenCreated = function () {
        this.view = GGlobal.commonpkg.createObject("ViewAlertBuy2").asCom;
        this.contentPane = this.view;
        var t = this;
        CommonManager.parseChildren(t.view, t);
        t.initView();
        _super.prototype.childrenCreated.call(this);
    };
    ViewAlertBuy2.prototype.initView = function () {
        var t = this;
        t._alertVo = new ValueVo();
    };
    //=========================================== API ==========================================
    ViewAlertBuy2.prototype.onShown = function () {
        var t = this;
        t.registerEvent(true);
        t.refreshData();
        var t_args = t._args;
        if (t_args) {
            t._onCountChange = t_args.onCountChange;
            t._onOk = t_args.onOk;
            t._thisObj = t_args.thisObj;
            t._moneyType = t_args.moneyType;
            t.maxValue = t_args.maxValue;
            t.value = t_args.defaultValue;
            t.onValueChange();
        }
    };
    ViewAlertBuy2.prototype.onHide = function () {
        var t = this;
        t.registerEvent(false);
        IconUtil.setImg(t.itemIcon, null);
        t._onCountChange = null;
        t._onOk = null;
        t._thisObj = null;
        t._alertVo.desStr = "";
        t._alertVo.totalPrice = 0;
    };
    ViewAlertBuy2.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    Object.defineProperty(ViewAlertBuy2.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            if (value < this._minValue)
                value = this._minValue;
            else if (value > this._maxValue)
                value = this._maxValue;
            if (this._value == value)
                return;
            this._value = value;
            this._alertVo.value = value;
            this.onValueChange();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewAlertBuy2.prototype, "maxValue", {
        get: function () {
            return this._maxValue;
        },
        set: function (value) {
            if (value < this._minValue)
                return;
            this._maxValue = value;
            this._alertVo.maxValue = value;
            if (this.value > value)
                this.value = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewAlertBuy2.prototype, "minValue", {
        get: function () {
            return this._minValue;
        },
        set: function (value) {
            if (value > this._maxValue)
                return;
            this._minValue = value;
            if (this.value < value)
                this.value = value;
        },
        enumerable: true,
        configurable: true
    });
    //===================================== private method =====================================
    ViewAlertBuy2.prototype.refreshData = function () {
    };
    ViewAlertBuy2.prototype.onValueChange = function () {
        var t = this;
        if (t._onCountChange) {
            t._onCountChange.apply(t._thisObj, [t._alertVo]);
        }
        t.lb.text = t._alertVo.desStr;
        var t_cfg = Config.daoju_204[t._moneyType];
        if (t_cfg)
            IconUtil.setImg(t.itemIcon, Enum_Path.ICON70_URL + t_cfg.icon + ".png");
        else
            IconUtil.setImg(t.itemIcon, null);
        var t_color = Color.GREENSTR;
        if (!FastAPI.checkItemEnough(t._moneyType, t._alertVo.totalPrice))
            t_color = Color.REDSTR;
        t.lbCost.text = HtmlUtil.font(t._alertVo.totalPrice + "", t_color);
        t.lbCount.text = t._alertVo.value + "";
    };
    ViewAlertBuy2.prototype.registerEvent = function (pFlag) {
        var t = this;
        EventUtil.register(pFlag, t.btnMin, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnReduce, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnAdd, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnMax, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.itemIcon, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnOk, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnCancel, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
    };
    //======================================== handler =========================================
    ViewAlertBuy2.prototype.onBtnClick = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            var t, _a, t_result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        t = this;
                        _a = e.currentTarget;
                        switch (_a) {
                            case t.itemIcon: return [3 /*break*/, 1];
                            case t.btnMin: return [3 /*break*/, 2];
                            case t.btnReduce: return [3 /*break*/, 3];
                            case t.btnAdd: return [3 /*break*/, 4];
                            case t.btnMax: return [3 /*break*/, 5];
                            case t.btnCancel: return [3 /*break*/, 6];
                            case t.btnOk: return [3 /*break*/, 7];
                        }
                        return [3 /*break*/, 11];
                    case 1:
                        FastAPI.showItemTips(t._moneyType);
                        return [3 /*break*/, 11];
                    case 2:
                        t.value -= 10;
                        return [3 /*break*/, 11];
                    case 3:
                        t.value -= t.speed;
                        return [3 /*break*/, 11];
                    case 4:
                        t.value += t.speed;
                        return [3 /*break*/, 11];
                    case 5:
                        t.value += 10;
                        return [3 /*break*/, 11];
                    case 6:
                        t.closeView();
                        return [3 /*break*/, 11];
                    case 7:
                        if (!t._onOk) return [3 /*break*/, 9];
                        return [4 /*yield*/, t._onOk.apply(t._thisObj, [t._alertVo])];
                    case 8:
                        t_result = _b.sent();
                        if (t_result === true)
                            t.closeView();
                        return [3 /*break*/, 10];
                    case 9:
                        t.closeView();
                        _b.label = 10;
                    case 10: return [3 /*break*/, 11];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    ViewAlertBuy2.URL = "ui://jvxpx9emchyo3i9";
    return ViewAlertBuy2;
}(UIModalPanel));
__reflect(ViewAlertBuy2.prototype, "ViewAlertBuy2");
var ValueVo = (function () {
    function ValueVo() {
        /** 当前数量（外部无需设置，只读） */
        this.value = 0;
        /** 最大数量（外部无需设置，只读） */
        this.maxValue = 99;
        /** 文本描述，通常用于显示当前值和最大数量（外部设置，自行组装字符串） */
        this.desStr = "";
        /** 总价（外需需要自行计算） */
        this.totalPrice = 0;
    }
    return ValueVo;
}());
__reflect(ValueVo.prototype, "ValueVo");
