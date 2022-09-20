module fairygui {
	export class AtlasSprite {
        public constructor() {
            this.rect = new egret.Rectangle();
        }

        public atlas: PackageItem;
        public rect: egret.Rectangle;
        public rotated: boolean;
    }
}