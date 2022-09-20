module fairygui {
	export class ItemInfo {
        public width: number = 0;
        public height: number = 0;
        public obj: GObject;
        public updateFlag: number = 0;
        public selected: boolean = false;

        public constructor() {
        }
    }
}