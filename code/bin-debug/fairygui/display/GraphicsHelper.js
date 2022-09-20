var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var fairygui;
(function (fairygui) {
    var GraphicsHelper = (function () {
        function GraphicsHelper() {
        }
        GraphicsHelper.fillImage = function (method, amount, origin, clockwise, graphics, width, height) {
            graphics.clear();
            if (amount <= 100) {
                graphics.lineStyle(0);
                graphics.beginFill(0);
                amount = amount / 100;
                var startAngle = 0;
                var endAngle = 0;
                var radius = Math.ceil(Math.sqrt(width * width + height * height));
                var cx = width / 2;
                var cy = height / 2;
                switch (method) {
                    case fairygui.FillMethod.Radial90:
                        if (origin == fairygui.FillOrigin90.TopRight) {
                            cx = width;
                            cy = 0;
                            graphics.moveTo(cx, cy);
                            if (clockwise) {
                                startAngle = Math.PI / 2;
                                graphics.lineTo(cx - radius, cy);
                            }
                            else {
                                startAngle = Math.PI;
                                graphics.lineTo(cx, cy + radius);
                            }
                        }
                        else if (origin == fairygui.FillOrigin90.TopLeft) {
                            cx = 0;
                            cy = 0;
                            graphics.moveTo(cx, cy);
                            if (clockwise) {
                                startAngle = 0;
                                graphics.lineTo(cx, cy + radius);
                            }
                            else {
                                startAngle = Math.PI / 2;
                                graphics.lineTo(cx + radius, cy);
                            }
                        }
                        else if (origin == fairygui.FillOrigin90.BottomRight) {
                            cx = width;
                            cy = height;
                            graphics.moveTo(cx, cy);
                            if (clockwise) {
                                startAngle = Math.PI;
                                graphics.lineTo(cx - radius, cy);
                            }
                            else {
                                startAngle = Math.PI * 3 / 2;
                                graphics.lineTo(cx, cy - radius);
                            }
                        }
                        else {
                            cx = 0;
                            cy = height;
                            graphics.moveTo(cx, cy);
                            if (clockwise) {
                                startAngle = Math.PI * 3 / 2;
                                graphics.lineTo(cx, cy - radius);
                            }
                            else {
                                startAngle = 0;
                                graphics.lineTo(cx + radius, cy);
                            }
                        }
                        if (clockwise) {
                            endAngle = startAngle + amount * Math.PI / 2;
                        }
                        else {
                            endAngle = startAngle - amount * Math.PI / 2;
                        }
                        graphics.drawArc(cx, cy, radius, startAngle, endAngle, !clockwise);
                        graphics.lineTo(cx, cy);
                        break;
                    case fairygui.FillMethod.Radial180:
                        if (origin == fairygui.FillOrigin.Right) {
                            cx = width;
                            graphics.moveTo(cx, cy);
                            graphics.lineTo(cx, cy - radius);
                            if (clockwise) {
                                startAngle = Math.PI / 2;
                            }
                            else {
                                startAngle = Math.PI * 3 / 2;
                            }
                        }
                        else if (origin == fairygui.FillOrigin.Bottom) {
                            startAngle = Math.PI;
                            cy = height;
                            graphics.moveTo(cx, cy);
                            graphics.lineTo(cx - radius, cy);
                            if (clockwise) {
                                startAngle = Math.PI;
                            }
                            else {
                                startAngle = 0;
                            }
                        }
                        else if (origin == fairygui.FillOrigin.Left) {
                            cx = 0;
                            graphics.moveTo(cx, cy);
                            graphics.lineTo(cx - radius, cy);
                            if (clockwise) {
                                startAngle = Math.PI * 3 / 2;
                            }
                            else {
                                startAngle = Math.PI / 2;
                            }
                        }
                        else {
                            cy = 0;
                            graphics.moveTo(cx, cy);
                            graphics.lineTo(cx + radius, cy);
                            if (clockwise) {
                                startAngle = 0;
                            }
                            else {
                                startAngle = Math.PI;
                            }
                        }
                        if (clockwise) {
                            endAngle = startAngle + amount * Math.PI;
                        }
                        else {
                            endAngle = startAngle - amount * Math.PI;
                        }
                        graphics.drawArc(cx, cy, radius, startAngle, endAngle, !clockwise);
                        graphics.lineTo(cx, cy);
                        break;
                    case fairygui.FillMethod.Radial360:
                        startAngle = 0;
                        if (amount >= 1) {
                            graphics.drawCircle(cx, cy, radius);
                        }
                        else {
                            graphics.moveTo(cx, cy);
                            if (origin == fairygui.FillOrigin.Right) {
                                startAngle = 0;
                                graphics.lineTo(cx + radius, cy);
                            }
                            else if (origin == fairygui.FillOrigin.Bottom) {
                                startAngle = Math.PI / 2;
                                graphics.lineTo(cx, cy + radius);
                            }
                            else if (origin == fairygui.FillOrigin.Left) {
                                startAngle = Math.PI;
                                graphics.lineTo(cx - radius, cy);
                            }
                            else {
                                startAngle = Math.PI * 3 / 2;
                                graphics.lineTo(cx, cy - radius);
                            }
                            if (clockwise) {
                                endAngle = startAngle + amount * Math.PI * 2;
                            }
                            else {
                                endAngle = startAngle - amount * Math.PI * 2;
                            }
                            graphics.drawArc(cx, cy, radius, startAngle, endAngle, !clockwise);
                            graphics.lineTo(cx, cy);
                        }
                        break;
                }
                graphics.endFill();
            }
        };
        return GraphicsHelper;
    }());
    fairygui.GraphicsHelper = GraphicsHelper;
    __reflect(GraphicsHelper.prototype, "fairygui.GraphicsHelper");
})(fairygui || (fairygui = {}));
