var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var fairygui;
(function (fairygui) {
    var UIConfig = (function () {
        function UIConfig() {
        }
        //Default font name
        UIConfig.defaultFont = "SimSun";
        //When a modal window is in front, the background becomes dark.
        UIConfig.modalLayerColor = 0x333333;
        UIConfig.modalLayerAlpha = 0.2;
        UIConfig.buttonSoundVolumeScale = 1;
        //Scrolling step in pixels
        UIConfig.defaultScrollStep = 25;
        //Deceleration ratio of scrollpane when its in touch dragging.
        UIConfig.defaultScrollDecelerationRate = 0.967;
        //Default scrollbar display mode. Recommened visible for Desktop and Auto for mobile.
        UIConfig.defaultScrollBarDisplay = fairygui.ScrollBarDisplayType.Visible;
        //Allow dragging the content to scroll. Recommeded true for mobile.
        UIConfig.defaultScrollTouchEffect = true;
        //The "rebound" effect in the scolling container. Recommeded true for mobile.
        UIConfig.defaultScrollBounceEffect = true;
        //Max items displayed in combobox without scrolling.
        UIConfig.defaultComboBoxVisibleItemCount = 10;
        // Pixel offsets of finger to trigger scrolling.
        UIConfig.touchScrollSensitivity = 20;
        // Pixel offsets of finger to trigger dragging.
        UIConfig.touchDragSensitivity = 10;
        // Pixel offsets of mouse pointer to trigger dragging.
        UIConfig.clickDragSensitivity = 2;
        // When click the window, brings to front automatically.
        UIConfig.bringWindowToFrontOnClick = true;
        UIConfig.frameTimeForAsyncUIConstruction = 2;
        return UIConfig;
    }());
    fairygui.UIConfig = UIConfig;
    __reflect(UIConfig.prototype, "fairygui.UIConfig");
})(fairygui || (fairygui = {}));
