var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var fairygui;
(function (fairygui) {
    var TransitionActionType = (function () {
        function TransitionActionType() {
        }
        TransitionActionType.XY = 0;
        TransitionActionType.Size = 1;
        TransitionActionType.Scale = 2;
        TransitionActionType.Pivot = 3;
        TransitionActionType.Alpha = 4;
        TransitionActionType.Rotation = 5;
        TransitionActionType.Color = 6;
        TransitionActionType.Animation = 7;
        TransitionActionType.Visible = 8;
        TransitionActionType.Sound = 9;
        TransitionActionType.Transition = 10;
        TransitionActionType.Shake = 11;
        TransitionActionType.ColorFilter = 12;
        TransitionActionType.Skew = 13;
        TransitionActionType.Text = 14;
        TransitionActionType.Icon = 15;
        TransitionActionType.Unknown = 16;
        return TransitionActionType;
    }());
    fairygui.TransitionActionType = TransitionActionType;
    __reflect(TransitionActionType.prototype, "fairygui.TransitionActionType");
})(fairygui || (fairygui = {}));
