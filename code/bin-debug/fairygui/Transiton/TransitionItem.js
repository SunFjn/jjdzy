var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var fairygui;
(function (fairygui) {
    var TransitionItem = (function () {
        function TransitionItem(type) {
            this.type = type;
            switch (type) {
                case fairygui.TransitionActionType.XY:
                case fairygui.TransitionActionType.Size:
                case fairygui.TransitionActionType.Scale:
                case fairygui.TransitionActionType.Pivot:
                case fairygui.TransitionActionType.Skew:
                case fairygui.TransitionActionType.Alpha:
                case fairygui.TransitionActionType.Rotation:
                case fairygui.TransitionActionType.Color:
                case fairygui.TransitionActionType.ColorFilter:
                    this.value = new fairygui.TValue();
                    break;
                case fairygui.TransitionActionType.Animation:
                    this.value = new fairygui.TValue_Animation();
                    break;
                case fairygui.TransitionActionType.Shake:
                    this.value = new fairygui.TValue_Shake();
                    break;
                case fairygui.TransitionActionType.Sound:
                    this.value = new fairygui.TValue_Sound();
                    break;
                case fairygui.TransitionActionType.Transition:
                    this.value = new fairygui.TValue_Transition();
                    break;
                case fairygui.TransitionActionType.Visible:
                    this.value = new fairygui.TValue_Visible();
                    break;
                case fairygui.TransitionActionType.Text:
                case fairygui.TransitionActionType.Icon:
                    this.value = new fairygui.TValue_Text();
                    break;
            }
        }
        return TransitionItem;
    }());
    fairygui.TransitionItem = TransitionItem;
    __reflect(TransitionItem.prototype, "fairygui.TransitionItem");
})(fairygui || (fairygui = {}));
