module fairygui {
	export class DisplayListItem {
		public packageItem: PackageItem;
		public type: ObjectType;
		public childCount: number;
		public listItemCount: number;

		public constructor(packageItem: PackageItem, type: ObjectType) {
			this.packageItem = packageItem;
			this.type = type;
		}
	}
}