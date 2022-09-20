var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var fairygui;
(function (fairygui) {
    var ColorMatrix = (function () {
        function ColorMatrix() {
            this.matrix = new Array(ColorMatrix.LENGTH);
            this.reset();
        }
        ColorMatrix.create = function (p_brightness, p_contrast, p_saturation, p_hue) {
            var ret = new ColorMatrix();
            ret.adjustColor(p_brightness, p_contrast, p_saturation, p_hue);
            return ret;
        };
        // public methods:
        ColorMatrix.prototype.reset = function () {
            for (var i = 0; i < ColorMatrix.LENGTH; i++) {
                this.matrix[i] = ColorMatrix.IDENTITY_MATRIX[i];
            }
        };
        ColorMatrix.prototype.invert = function () {
            this.multiplyMatrix([-1, 0, 0, 0, 255,
                0, -1, 0, 0, 255,
                0, 0, -1, 0, 255,
                0, 0, 0, 1, 0]);
        };
        ColorMatrix.prototype.adjustColor = function (p_brightness, p_contrast, p_saturation, p_hue) {
            this.adjustHue(p_hue);
            this.adjustContrast(p_contrast);
            this.adjustBrightness(p_brightness);
            this.adjustSaturation(p_saturation);
        };
        ColorMatrix.prototype.adjustBrightness = function (p_val) {
            p_val = this.cleanValue(p_val, 1) * 255;
            this.multiplyMatrix([
                1, 0, 0, 0, p_val,
                0, 1, 0, 0, p_val,
                0, 0, 1, 0, p_val,
                0, 0, 0, 1, 0
            ]);
        };
        ColorMatrix.prototype.adjustContrast = function (p_val) {
            p_val = this.cleanValue(p_val, 1);
            var s = p_val + 1;
            var o = 128 * (1 - s);
            this.multiplyMatrix([
                s, 0, 0, 0, o,
                0, s, 0, 0, o,
                0, 0, s, 0, o,
                0, 0, 0, 1, 0
            ]);
        };
        ColorMatrix.prototype.adjustSaturation = function (p_val) {
            p_val = this.cleanValue(p_val, 1);
            p_val += 1;
            var invSat = 1 - p_val;
            var invLumR = invSat * ColorMatrix.LUMA_R;
            var invLumG = invSat * ColorMatrix.LUMA_G;
            var invLumB = invSat * ColorMatrix.LUMA_B;
            this.multiplyMatrix([
                (invLumR + p_val), invLumG, invLumB, 0, 0,
                invLumR, (invLumG + p_val), invLumB, 0, 0,
                invLumR, invLumG, (invLumB + p_val), 0, 0,
                0, 0, 0, 1, 0
            ]);
        };
        ColorMatrix.prototype.adjustHue = function (p_val) {
            p_val = this.cleanValue(p_val, 1);
            p_val *= Math.PI;
            var cos = Math.cos(p_val);
            var sin = Math.sin(p_val);
            this.multiplyMatrix([
                ((ColorMatrix.LUMA_R + (cos * (1 - ColorMatrix.LUMA_R))) + (sin * -(ColorMatrix.LUMA_R))), ((ColorMatrix.LUMA_G + (cos * -(ColorMatrix.LUMA_G))) + (sin * -(ColorMatrix.LUMA_G))), ((ColorMatrix.LUMA_B + (cos * -(ColorMatrix.LUMA_B))) + (sin * (1 - ColorMatrix.LUMA_B))), 0, 0,
                ((ColorMatrix.LUMA_R + (cos * -(ColorMatrix.LUMA_R))) + (sin * 0.143)), ((ColorMatrix.LUMA_G + (cos * (1 - ColorMatrix.LUMA_G))) + (sin * 0.14)), ((ColorMatrix.LUMA_B + (cos * -(ColorMatrix.LUMA_B))) + (sin * -0.283)), 0, 0,
                ((ColorMatrix.LUMA_R + (cos * -(ColorMatrix.LUMA_R))) + (sin * -((1 - ColorMatrix.LUMA_R)))), ((ColorMatrix.LUMA_G + (cos * -(ColorMatrix.LUMA_G))) + (sin * ColorMatrix.LUMA_G)), ((ColorMatrix.LUMA_B + (cos * (1 - ColorMatrix.LUMA_B))) + (sin * ColorMatrix.LUMA_B)), 0, 0,
                0, 0, 0, 1, 0
            ]);
        };
        ColorMatrix.prototype.concat = function (p_matrix) {
            if (p_matrix.length != ColorMatrix.LENGTH) {
                return;
            }
            this.multiplyMatrix(p_matrix);
        };
        ColorMatrix.prototype.clone = function () {
            var result = new ColorMatrix();
            result.copyMatrix(this.matrix);
            return result;
        };
        ColorMatrix.prototype.copyMatrix = function (p_matrix) {
            var l = ColorMatrix.LENGTH;
            for (var i = 0; i < l; i++) {
                this.matrix[i] = p_matrix[i];
            }
        };
        ColorMatrix.prototype.multiplyMatrix = function (p_matrix) {
            var col = [];
            var i = 0;
            for (var y = 0; y < 4; ++y) {
                for (var x = 0; x < 5; ++x) {
                    col[i + x] = p_matrix[i] * this.matrix[x] +
                        p_matrix[i + 1] * this.matrix[x + 5] +
                        p_matrix[i + 2] * this.matrix[x + 10] +
                        p_matrix[i + 3] * this.matrix[x + 15] +
                        (x == 4 ? p_matrix[i + 4] : 0);
                }
                i += 5;
            }
            this.copyMatrix(col);
        };
        ColorMatrix.prototype.cleanValue = function (p_val, p_limit) {
            return Math.min(p_limit, Math.max(-p_limit, p_val));
        };
        // identity matrix constant:
        ColorMatrix.IDENTITY_MATRIX = [
            1, 0, 0, 0, 0,
            0, 1, 0, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 0, 1, 0
        ];
        ColorMatrix.LENGTH = ColorMatrix.IDENTITY_MATRIX.length;
        ColorMatrix.LUMA_R = 0.299;
        ColorMatrix.LUMA_G = 0.587;
        ColorMatrix.LUMA_B = 0.114;
        return ColorMatrix;
    }());
    fairygui.ColorMatrix = ColorMatrix;
    __reflect(ColorMatrix.prototype, "fairygui.ColorMatrix");
})(fairygui || (fairygui = {}));
