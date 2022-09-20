/**AMF readObject by wzr*/class AMFByteArray extends BaseBytes {
	public constructor(buffer?: ArrayBuffer | Uint8Array, bufferExtSize?: number) {
		super(buffer, bufferExtSize);
	}

	public UNDEFINED_TYPE = 0;
	public NULL_TYPE = 1;
	public FALSE_TYPE = 2;
	public TRUE_TYPE = 3;
	public INTEGER_TYPE = 4;
	public DOUBLE_TYPE = 5;
	public STRING_TYPE = 6;
	public XML_TYPE = 7;
	public DATE_TYPE = 8;
	public ARRAY_TYPE = 9;
	public OBJECT_TYPE = 10;
	public AVMPLUSXML_TYPE = 11;
	public BYTEARRAY_TYPE = 12;

	public EMPTY_STRING: string = "";

	private _strTable: any[];// = [];
	private _objTable: any[];// = [];
	private _traitsTable: any[];//=[];

	public readObject(): Object {
		this._strTable = [];
		this._objTable = [];
		this._traitsTable = [];
		return this.readObject2();
	}

	public readObject2(): Object {
		var type: number = this.readByte();
		return this.readObjectValue(type);
	}

	public readInterger(): number {
		var i: number = this.readUInt29();
		// Symmetric with writing an integer to fix sign bits for negative values...
		i = (i << 3) >> 3;
		return parseInt(i + "");
	}

	private readObjectValue(type: number): any {
		var value: Object;
		switch (type) {
			case this.NULL_TYPE:
				break;
			case this.STRING_TYPE:
				value = this.__readString();
				break;
			case this.INTEGER_TYPE:
				value = this.readInterger();
				break;
			case this.FALSE_TYPE:
				value = false;
				break;
			case this.TRUE_TYPE:
				value = true;
				break;
			case this.OBJECT_TYPE:
				value = this.readScriptObject();
				break;
			case this.ARRAY_TYPE:
				value = this.readArray();
				break;
			case this.DOUBLE_TYPE:
				value = this.readDouble();
				break;
			case this.BYTEARRAY_TYPE:
				value = this.readByteArray();
				break;
			default:
				// Unknown object type tag {type}
				console.log("Unknown object type tag!!!" + type);
		}

		return value;
	}

	public readByteArray(): AMFByteArray {
		var ref: number = this.readUInt29();

		if ((ref & 1) == 0) {
			return this.getObjRef(ref >> 1) as AMFByteArray;
		}
		else {
			var len: number = (ref >> 1);

			var ba: AMFByteArray = new AMFByteArray();
			this._objTable.push(ba);
			this.readBytes(ba, 0, len);
			return ba;
		}
	}

	protected readArray(): Object {
		var ref: number = this.readUInt29();

		if ((ref & 1) == 0) {
			return this.getObjRef(ref >> 1);
		}
		var obj: any = null;
		var count: number = (ref >> 1);

		var propName: string;
		for (; ;) {
			propName = this.__readString();
			if (propName == null || propName.length == 0) break;
			if (obj == null) {
				obj = {};
				this._objTable.push(obj);
			}
			obj[propName] = this.readObject2();
		}

		if (obj == null) {
			obj = [];
			this._objTable.push(obj);
			var i: number = 0;
			for (i = 0; i < count; i++) {
				obj.push(this.readObject2());
			}
		} else {
			for (i = 0; i < count; i++) {
				obj[i.toString()] = this.readObject2();
			}
		}

		//_objTable.push(obj);
		return obj;
	}

	protected readScriptObject(): Object {
		var ref: number = this.readUInt29();
		if ((ref & 1) == 0) {
			return this.getObjRef(ref >> 1);
		}
		else {
			var objref:any = this.readTraits(ref);
			var className: string = objref.className;
			var externalizable: Boolean = objref.externalizable;
			var obj: any;
			var propName: string;
			var pros: string = objref.propoties;
			// if (className && className != "") {
			// 	var rst: any = ClassUtils.getRegClass(className);
			// 	if (rst) {
			// 		obj = new rst();
			// 	} else {
			// 		obj = {};
			// 	}

			// } else {
				console.log("className"+className);
				obj = {};
			// }

			this._objTable.push(obj);
			if (pros) {
				for (var d: number = 0; d < pros.length; d++) {
					obj[pros[d]] = this.readObject2();
				}
			}
			if (objref.dynamic) {
				for (; ;) {
					propName = this.__readString();
					if (propName == null || propName.length == 0) break;
					obj[propName] = this.readObject2();
				}
			}

			return obj;
		}

	}
	private getStrRef(ref: number): string {
		return this._strTable[ref];
	}

	private getObjRef(ref: number): Object {
		return this._objTable[ref];
	}

	private __readString(): string {
		var ref: number = this.readUInt29();

		if ((ref & 1) == 0) {
			return this.getStrRef(ref >> 1);
		}

		var len: number = (ref >> 1);

		// writeString() special cases the empty string
		// to avoid creating a reference.
		if (0 == len) {
			return this.EMPTY_STRING;
		}

		var str: string = this.readUTFBytes(len);
		this._strTable.push(str);
		return str;
	}
	private readTraits(ref: number): any {
		var ti: any;
		if ((ref & 3) == 1) {
			ti = this.getTraitReference(ref >> 2);
			return ti.propoties ? ti : { obj: {} };
		}
		else {
			var externalizable: boolean = ((ref & 4) == 4);
			var isDynamic: boolean = ((ref & 8) == 8);
			var count: number = (ref >> 4); /* uint29 */
			var className: string = this.__readString();
			ti = {};
			ti.className = className;
			ti.propoties = [];
			ti.dynamic = isDynamic;
			ti.externalizable = externalizable;
			//ti.obj={};
			if (count > 0) {
				for (var i: number = 0; i < count; i++) {
					var propName: string = this.__readString();
					ti.propoties.push(propName);
				}
			}
			this._traitsTable.push(ti);
			//todo LIST
			return ti;
		}

	}



	/**
		 * AMF 3 represents smaller integers with fewer bytes using the most
		 * significant bit of each byte. The worst case uses 32-bits
		 * to represent a 29-bit number, which is what we would have
		 * done with no compression.
		 * <pre>
		 * 0x00000000 - 0x0000007F : 0xxxxxxx
		 * 0x00000080 - 0x00003FFF : 1xxxxxxx 0xxxxxxx
		 * 0x00004000 - 0x001FFFFF : 1xxxxxxx 1xxxxxxx 0xxxxxxx
		 * 0x00200000 - 0x3FFFFFFF : 1xxxxxxx 1xxxxxxx 1xxxxxxx xxxxxxxx
		 * 0x40000000 - 0xFFFFFFFF : throw range exception
		 * </pre>
		 *
		 * @return A int capable of holding an unsigned 29 bit integer.
		 * @throws IOException
		 * @exclude
		 */
	protected readUInt29(): number {
		var value: number;

		// Each byte must be treated as unsigned
		var b: number = this.readByte() & 0xFF;

		if (b < 128) {
			return b;
		}

		value = (b & 0x7F) << 7;
		b = this.readByte() & 0xFF;

		if (b < 128) {
			return (value | b);
		}

		value = (value | (b & 0x7F)) << 7;
		b = this.readByte() & 0xFF;

		if (b < 128) {
			return (value | b);
		}

		value = (value | (b & 0x7F)) << 8;
		b = this.readByte() & 0xFF;

		return (value | b);
	}

	/**
	 * @exclude
	*/
	protected getTraitReference(ref: number): any {

		return this._traitsTable[ref];
	}

	public writeObject() {

	}
}