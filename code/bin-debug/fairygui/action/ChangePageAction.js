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
var fairygui;
(function (fairygui) {
    var ChangePageAction = (function (_super) {
        __extends(ChangePageAction, _super);
        function ChangePageAction() {
            return _super.call(this) || this;
        }
        ChangePageAction.prototype.enter = function (controller) {
            if (!this.controllerName)
                return;
            var gcom;
            if (this.objectId) {
                var obj = controller.parent.getChildById(this.objectId);
                if (obj instanceof fairygui.GComponent)
                    gcom = obj;
                else
                    return;
            }
            else
                gcom = controller.parent;
            if (gcom) {
                var cc = gcom.getController(this.controllerName);
                if (cc && cc != controller && !cc.changing)
                    cc.selectedPageId = this.targetPage;
            }
        };
        ChangePageAction.prototype.setup = function (buffer) {
            _super.prototype.setup.call(this, buffer);
            this.objectId = buffer.readS();
            this.controllerName = buffer.readS();
            this.targetPage = buffer.readS();
        };
        return ChangePageAction;
    }(fairygui.ControllerAction));
    fairygui.ChangePageAction = ChangePageAction;
    __reflect(ChangePageAction.prototype, "fairygui.ChangePageAction");
})(fairygui || (fairygui = {}));
