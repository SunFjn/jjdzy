class HtmlUtil {
	public constructor() {
	}

	public static HTMLPARSER: egret.HtmlTextParser = new egret.HtmlTextParser();

	public static createLink(text: string, bUnderline: boolean = true, url: string = 'My'): string {
		var link: string = "";
		if (bUnderline) {
			link += "<u>";
			link += "<a href='event:" + url + "'>" + text + "</a>";
			link += "</u>";
		}
		else {
			link += "<a href='event:" + url + "'>" + text + "</a>";
		}
		return link;
	}

	/**
	* font文本
	* @param content 文本内容
	* @param color 颜色
	* @param size 字体大小
	* @return html文本
	*/
	public static font(content: string, color: any, size: number = 0): string {
		var colorStr: String;
		if (typeof color === 'number') {
			colorStr = "#" + Number(color).toString(16);
		}
		else {
			colorStr = color as string;
		}
		var str: string = "<font color='" + colorStr;
		if (size) {
			str += "' size ='" + size;
		}
		return str + "'>" + content + "</font>";
	}

	public static fontColorList(contents, colors): Array<egret.ITextElement> {
		var text: string = "";
		for (var i: number = 0; i < contents.length; i++) {
			text += HtmlUtil.fontNoSize(contents[i], colors[i]);
		}
		return HtmlUtil.HTMLPARSER.parser(text);
	}

	public static link(content: string, event: string): string {
		return "<a href='event:" + event + "'>" + content + "</a>";
	}

	public static underLine(content: string): string {
		return "<u>" + content + "</u>";
	}

	public static fontNoSize(content: string, color: string): string {
		return "<font color='" + color + "'>" + content + "</font>";
	}
	public static fontNoColor(content: string, size: number): string {
		return "<font size='" + size + "'>" + content + "</font>";
	}

	public static br(content: string): string {
		return "<br>" + content + "</br>";
	}

	public static bold(content: string): string {
		return "<b>" + content + "</b>";
	}

	public static makeRowText(info: string) {
		let ret = '';
		let infos = [];
		for (let i = 0; i < info.length; i++) {
			ret += info[i];
			if (i < info.length - 1) {
				ret += "\n";
			}
		}
		return ret;
	}

	public static getRequest(url: string): any {
		var theRequest = {};
		var index = url.indexOf("?");
		if (theRequest && index != -1) {
			var str = url.substr(index + 1);
			var strs = str.split("&");
			for (var i = 0; i < strs.length; i++) {
				var kv = strs[i].split("=");
				theRequest[kv[0]] = kv[1];
			}
		}
		return theRequest;
	}
}