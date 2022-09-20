module fairygui {
	export class GearLookValue {
        public alpha: number;
        public rotation: number;
        public grayed: boolean;
        public touchable: boolean;

        public constructor(alpha: number = 0, rotation: number = 0, grayed: boolean = false, touchable: boolean = true) {
            this.alpha = alpha;
            this.rotation = rotation;
            this.grayed = grayed;
            this.touchable = touchable;
        }
    }
}