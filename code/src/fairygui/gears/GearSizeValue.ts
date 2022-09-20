module fairygui {
	export class GearSizeValue {
		public width: number;
		public height: number;
		public scaleX: number;
		public scaleY: number;

		public constructor(width: number = 0, height: number = 0, scaleX: number = 0, scaleY: number = 0) {
			this.width = width;
			this.height = height;
			this.scaleX = scaleX;
			this.scaleY = scaleY;
		}
	}
}