var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var fairygui;
(function (fairygui) {
    var ControllerAction = (function () {
        function ControllerAction() {
        }
        ControllerAction.createAction = function (type) {
            switch (type) {
                case 0:
                    return new fairygui.PlayTransitionAction();
                case 1:
                    return new fairygui.ChangePageAction();
            }
            return null;
        };
        ControllerAction.prototype.run = function (controller, prevPage, curPage) {
            if ((this.fromPage == null || this.fromPage.length == 0 || this.fromPage.indexOf(prevPage) != -1)
                && (this.toPage == null || this.toPage.length == 0 || this.toPage.indexOf(curPage) != -1))
                this.enter(controller);
            else
                this.leave(controller);
        };
        ControllerAction.prototype.enter = function (controller) {
        };
        ControllerAction.prototype.leave = function (controller) {
        };
        ControllerAction.prototype.setup = function (buffer) {
            var cnt;
            var i;
            cnt = buffer.readShort();
            this.fromPage = [];
            for (i = 0; i < cnt; i++)
                this.fromPage[i] = buffer.readS();
            cnt = buffer.readShort();
            this.toPage = [];
            for (i = 0; i < cnt; i++)
                this.toPage[i] = buffer.readS();
        };
        return ControllerAction;
    }());
    fairygui.ControllerAction = ControllerAction;
    __reflect(ControllerAction.prototype, "fairygui.ControllerAction");
})(fairygui || (fairygui = {}));
