var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var fairygui;
(function (fairygui) {
    var PageOption = (function () {
        function PageOption() {
        }
        Object.defineProperty(PageOption.prototype, "controller", {
            set: function (val) {
                this._controller = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PageOption.prototype, "index", {
            get: function () {
                if (this._id)
                    return this._controller.getPageIndexById(this._id);
                else
                    return -1;
            },
            set: function (pageIndex) {
                this._id = this._controller.getPageId(pageIndex);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PageOption.prototype, "name", {
            get: function () {
                if (this._id)
                    return this._controller.getPageNameById(this._id);
                else
                    return null;
            },
            set: function (pageName) {
                this._id = this._controller.getPageIdByName(pageName);
            },
            enumerable: true,
            configurable: true
        });
        PageOption.prototype.clear = function () {
            this._id = null;
        };
        Object.defineProperty(PageOption.prototype, "id", {
            get: function () {
                return this._id;
            },
            set: function (id) {
                this._id = id;
            },
            enumerable: true,
            configurable: true
        });
        return PageOption;
    }());
    fairygui.PageOption = PageOption;
    __reflect(PageOption.prototype, "fairygui.PageOption");
})(fairygui || (fairygui = {}));
