module fairygui {
	export   class GearColorValue {
        public color: number;
        public strokeColor: number;

        public constructor(color: number = 0, strokeColor: number = 0) {
            this.color = color;
            this.strokeColor = strokeColor;
        }
    }
}