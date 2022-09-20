class DateUtil {
	public constructor() {
	}

	public static getSeverTime(value: number, offset: number): string {
		var date: Date = new Date(value);
		date.setHours(date.getHours() + offset);
		var hoursStr: String = date.getUTCHours() < 10 ? ('0' + date.getUTCHours()) : date.getUTCHours().toString();
		var minutesStr: String = date.getUTCMinutes() < 10 ? ('0' + date.getUTCMinutes()) : date.getUTCMinutes().toString();
		var secondsStr: String = date.getUTCSeconds() < 10 ? ('0' + date.getUTCSeconds()) : date.getUTCSeconds().toString();
		return hoursStr + ':' + minutesStr + ':' + secondsStr;
	}

	public static getSeverTime2(value: number, offset: number): string {
		var date: Date = new Date(value);
		var hoursStr: String = date.getHours() < 10 ? ('0' + date.getHours()) : date.getHours().toString();
		var minutesStr: String = date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes().toString();
		var secondsStr: String = date.getSeconds() < 10 ? ('0' + date.getSeconds()) : date.getSeconds().toString();
		return hoursStr + ':' + minutesStr + ':' + secondsStr;
	}

	public static getServerMS(value: number, offset: number): string {
		var date: Date = new Date(value);
		date.setHours(date.getHours() + offset);
		var minutesStr: String = date.getUTCMinutes() < 10 ? ('0' + date.getUTCMinutes()) : date.getUTCMinutes().toString();
		var secondsStr: String = date.getUTCSeconds() < 10 ? ('0' + date.getUTCSeconds()) : date.getUTCSeconds().toString();
		return minutesStr + ':' + secondsStr;
	}

	public static getServerHM(value: number, offset: number): string {
		var date: Date = new Date(value);
		date.setHours(date.getHours() + offset);
		var hoursStr: String = date.getUTCHours() < 10 ? ('0' + date.getUTCHours()) : date.getUTCHours().toString();
		var minutesStr: String = date.getUTCMinutes() < 10 ? ('0' + date.getUTCMinutes()) : date.getUTCMinutes().toString();
		return hoursStr + ':' + minutesStr;
	}


	public static decodeInt2String($date: number): string {
		var date: String = $date + '';
		var year: String = date.slice(0, 4);
		var month: String = date.slice(4, 6);
		var day: String = date.slice(6, 8);
		var time: String = date.slice(8, 10);
		return year + "-" + month + "-" + day + " " + time;
	}

	//取UTC时间
	public static getUTCDate(date: Date): Date {
		date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
		return date;
	}
	public static addYear(date: Date, years: number = 0): Date {
		date.setMonth(date.getMonth() + years * 12);
		return date;
	}
	public static addMonth(date: Date, months: number = 0): Date {
		date.setMonth(date.getMonth() + months);
		return date;
	}
	public static addDay(date: Date, days: number = 0): Date {
		date.setDate(date.getDate() + days);
		return date;
	}
	public static addHours(date: Date, hours: number = 0): Date {
		date.setHours(date.getHours() + hours);
		return date;
	}
	public static addMinutes(date: Date, minutes: number = 0): Date {
		date.setMinutes(date.getMinutes() + minutes);
		return date;
	}
	public static addSeconds(date: Date, seconds: number = 0): Date {
		date.setSeconds(date.getSeconds() + seconds);
		return date;
	}
	public static format(date: Date, formString: string = 'YYYY-MM-DD'): String {
		var dateFormatter: DateFormatter = new DateFormatter();
		dateFormatter.formatString = formString;
		return dateFormatter.format(date);
	}
	//比较时间差 返回毫秒数
	public static dateDiffer(startTime: Date, endTime: Date): number {
		return startTime.getTime() - endTime.getTime();
	}
	public static getDateBySeconds(seconds: number): string {
		/* var year:Number = 365*24*60*60*60;//1892160000;
		var month:Number = 
		if(seconds%) */
		return '';
	}

	/**
	 *  
	 * @param second
	 * @param division  可以是　:  - 　　等符号；
	 * @return 
	 * 
	 */
	public static getHMSBySecond(second: number, division: string = null): string {
		if (division == null) {
			division = "时分秒";
		}
		var h: number = (second / 3600) >> 0;
		var m: number = (second % 3600 / 60) >> 0;
		var s: number = (second % 3600 % 60) >> 0;
		var result: string = "";
		if (h > 0) {
			result = h + division.charAt(0);
		}
		if (m > 0 || h > 0) {
			result = result + m + division.charAt(1);
		}
		result = result + s + division.charAt(2);
		return result;
	}

	/**
	 * 00时00分
	 * @param second
	 * @param division
	 * @return 
	 * 
	 */
	public static getHMBySecond1(second: number, division: string = "时分"): string {
		var s: number = second % 60;
		if (s > 0) {
			second = second - s + 60;
		}
		var h: number = Math.floor(second / 3600);
		var m: number = Math.floor(second % 3600 / 60);
		var result: string;
		result = h >= 10 ? h.toString() + division.charAt(0) : "0" + h.toString() + division.charAt(0);
		result += m >= 10 ? m.toString() + division.charAt(1) : "0" + m.toString() + division.charAt(1);
		return result;
	}

	/**获取时间 例如:01:50:03*/
	public static getHMSBySecond2(second: number, division: string = "::"): string {
		var h: number = Math.floor(second / 3600);
		var m: number = Math.floor(second % 3600 / 60);
		var s: number = second % 3600 % 60;
		var result: string;
		result = h >= 10 ? h + division.charAt(0) : "0" + h + division.charAt(0);
		result += m >= 10 ? m + division.charAt(0) : "0" + m + division.charAt(0);
		result += s >= 10 ? s : "0" + s;
		return result;
	}

	/**获取时间 例如:50:03*/
	public static getMSBySec3(second: number, division: string = ":"): string {
		var min = Math.floor(second / 60);
		var se = Math.ceil(second % 60);
		return DateUtil.addZero(min + "") + division + DateUtil.addZero(se + "");
	}

	/**例如：1天1时1分1秒 */
	public static getMSBySecond4(second: number, division: string = null): string {
		var result: string = "";
		var day: number = Math.floor(second / (3600 * 24));
		if (day > 0) {
			result = day + "天";
		}
		var h: number = second % (3600 * 24);
		if (h == 0) {
			return result;
		}

		var hour: number = Math.floor(h / 3600);
		if (hour > 0) {
			if (hour >= 10) {
				result += hour + "时";
			} else {
				result += "0" + hour + "时";
			}
		}
		var min: number = Math.floor(h % 3600);

		if (min == 0) return result;

		var minu: number = Math.floor(min / 60);
		if (minu > 0) {
			if (minu >= 10) {
				result += minu + "分";
			} else {
				result += "0" + minu + "分";
			}
		}

		var sec: number = Math.floor(min % 60);
		if (day > 0) return result;

		var secon: number = sec;
		if (secon >= 10) {
			result += secon + "秒";
		} else {
			result += "0" + secon + "秒";
		}
		return result;

	}
	/** 例如：1天1时1分*/
	public static getMSBySecond5(second: number, division: string = null): string {
		var result: string = "";
		var day: number = Math.floor(second / (3600 * 24));
		if (day > 0) {
			result = day + "天";
		}
		var h: number = second % (3600 * 24);
		if (h == 0) {
			return result;
		}

		var hour: number = Math.floor(h / 3600);
		if (hour > 0) {
			if (hour >= 10) {
				result += hour + "时";
			} else {
				result += "0" + hour + "时";
			}
		}
		var min: number = Math.floor(h % 3600);

		if (min == 0) return result;

		var minu: number = Math.floor(min / 60);
		if (minu > 0) {
			if (minu >= 10) {
				result += minu + "分";
			} else {
				result += "0" + minu + "分";
			}
		}

		var sec: number = Math.floor(min % 60);
		if (day > 0) return result;

		var secon: number = sec;
		// if (secon >= 10) {
		// 	result += secon + "秒";
		// } else {
		// 	result += "0" + secon + "秒";
		// }
		return result;

	}


	public static getHMBysecond(second: Number, division: String = ":"): String {
		var result: String = "";

		var time: number = Number(second) * 1000;
		var date: Date = new Date(time);
		var m: string;

		result = this.addZero(String(date.getHours())) + division;
		m = String(date.getMinutes());
		if (m.length < 2) {
			m = "0" + m;
		}
		result += m;

		return result;
	}

	public static clone(date: Date): Date {
		return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
	}

	//获取月份的天数
	public static getDaysByMonth(year: number, month: number): number {
		var days: Array<any> = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);	//初始月份中的天数
		if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
			//判断是否为润年 是:2=>29,否:2=>28
			//days.splice(1,1,29);	//替换days[1]中的值
			days[1] = 29;
		}
		if (month > 11) month = 11;
		if (month < 0) month = 0
		return days[month] as number;
	}

	public static getYearMonthDay(value: number, division: string = "--"): string {//秒
		var temStr: string;

		var data: Date = new Date(value * 1000);
		temStr = data.getDate() < 10 ? '0' + data.getDate().toString() : data.getDate().toString();
		return data.getFullYear().toString() + division.charAt(0) + (data.getMonth() + 1).toString() + division.charAt(1) + temStr + (division.charAt(2) ? division.charAt(2) : "");
	}

	/**
	 * 显示YYYY-MM-DD HH:MM
	 * @param value
	 * @param c1
	 * @param c2
	 * @param c3
	 * @param c4
	 * @return 
	 * 
	 */
	public static getYMDHM(value: number, c1: string = "-", c2: string = "-", c3: string = " ", c4: string = ":"): string {
		var str: string;
		var data: Date = new Date(value * 1000);
		str = data.getFullYear().toString();			//年
		str += c1 + (data.getMonth() + 1 < 10 ? "0" + (data.getMonth() + 1).toString() : (data.getMonth() + 1).toString());	//月
		str += c2 + (data.getDate() < 10 ? "0" + data.getDate().toString() : data.getDate().toString());	//日
		str += c3 + (data.getHours() < 10 ? "0" + data.getHours().toString() : data.getHours().toString());
		str += c4 + (data.getMinutes() < 10 ? "0" + data.getMinutes().toString() : data.getMinutes().toString());

		return str;
	}

	/**
	 * 显示MM-DD HH:MM
	 * @param value
	 * @param c1
	 * @param c2
	 * @param c3
	 * @return 
	 * 
	 */
	public static getMDHM(value: number, c1: string = "-", c2: string = " ", c3: string = ":", c4: string = ""): string {
		var str: string;
		var data: Date = new Date(value * 1000);
		str = (data.getMonth() + 1 < 10 ? "0" + (data.getMonth() + 1).toString() : (data.getMonth() + 1).toString());	//月
		str += c1 + (data.getDate() < 10 ? "0" + data.getDate().toString() : data.getDate().toString());	//日
		str += c2 + (data.getHours() < 10 ? "0" + data.getHours().toString() : data.getHours().toString());
		str += c3 + (data.getMinutes() < 10 ? "0" + data.getMinutes().toString() : data.getMinutes().toString());
		str += c4;

		return str;
	}

	/**
	 * 显示MM-DD HH:MM
	 * @param value
	 * @param c1
	 * @param c2
	 * @param c3
	 * @return 
	 * 
	 */
	public static getMDHM2(value: number, c1: string = "-", c2: string = " ", c3: string = ":", c4: string = ""): string {
		var str: string;
		var data: Date = new Date(value * 1000);
		str = (data.getMonth() + 1).toString();	//月
		str += c1 + data.getDate().toString();	//日
		str += c2 + data.getHours().toString();
		str += c3 + data.getMinutes().toString();
		str += c4;

		return str;
	}

	/**
	 * 显示YYYY-MM-DD HH:MM:SS
	 * @param value
	 * @param c1
	 * @param c2
	 * @param c3
	 * @param c4
	 * @return 
	 * 
	 */
	public static getYMDHMS(value: number, c1: string = "-", c2: string = "-", c3: string = " ", c4: string = ":"): string {
		var str: string;
		var data: Date = new Date(value * 1000);
		str = data.getFullYear().toString();			//年
		str += c1 + (data.getMonth() + 1 < 10 ? "0" + (data.getMonth() + 1).toString() : (data.getMonth() + 1).toString());	//月
		str += c2 + (data.getDate() < 10 ? "0" + data.getDate().toString() : data.getDate().toString());	//日
		str += c3 + (data.getHours() < 10 ? "0" + data.getHours().toString() : data.getHours().toString());
		str += c4 + (data.getMinutes() < 10 ? "0" + data.getMinutes().toString() : data.getMinutes().toString());
		str += c4 + (data.getSeconds() < 10 ? "0" + data.getSeconds().toString() : data.getSeconds().toString());
		return str;
	}

	public static addZero(str: string): string {
		if (str.length == 1) {
			str = "0" + str;
		}
		return str;
	}

	public static dateCompareFun(a: Date, b: Date): number {
		if (a.getTime() > b.getTime()) {
			return 1;
		}
		if (a.getTime() < b.getTime()) {
			return -1;
		}
		return 0;
	}

	public static dateCompareFunDesc(a: Date, b: Date): number {
		if (a.getTime() > b.getTime()) {
			return -1;
		}
		if (a.getTime() < b.getTime()) {
			return 1;
		}
		return 0;
	}

	public static getSubDate(a: Date, b: Date): number {
		var newA: Date = this.clearHourse(a);
		var newB: Date = this.clearHourse(b);
		return Math.abs(Math.round((newA.getTime() - newB.getTime()) / (24 * 3600 * 1000)));
	}

	public static clearHourse(date: Date): Date {
		var result: Date = new Date(date.getTime());
		result.setHours(0);
		result.setMinutes(0);
		result.setSeconds(0);
		return result;
	}




	public static getDayHourStr(sec: number, format: string = null): string {
		var ret: string;
		if (sec < 0) {
			sec = 0;
		}
		// if(format == null) {
		// 	format = "{0}天{1}小时";
		// }
		var d: number = sec / (3600 * 24);
		var h: number = (sec % (24 * 3600)) / 3600;
		ret = d + "天" + h + "小时";
		return ret;
	}

	/**
     * 格式化一个使用了多久的时间（是一段时间，区别于时刻）
     * @param pSeconds 秒
     * @param pFormatType 格式化格式
     * @param pNeedZero 个位数补零标志位
     * @return
     */
    public static formatUsedTime(pSeconds: number, pFormatType: string = "hh:uu:ss", pNeedZero: boolean = true): string {
        pSeconds = pSeconds < 0 ? 0 : pSeconds;
        var t_day: number = 0;
        var t_hour: number = 0;
        var t_minute: number = 0;
        var t_second: number = 0;

        var t_totalDayTime: number = 0;
        var t_totalHourTime: number = 0;
        var t_totalMinuteTime: number = 0;

        if (pFormatType == null) {
            pFormatType = "hh:uu:ss";
        }
        if (pFormatType.indexOf("dd") != -1) {
            t_day = Math.floor(pSeconds / 86400);
            t_totalDayTime = t_day * 86400;
        }

        if (pFormatType.indexOf("hh") != -1) {
            t_hour = Math.floor((pSeconds - t_totalDayTime) / 3600);
            t_totalHourTime = t_hour * 3600;
        }

        if (pFormatType.indexOf("uu") != -1) {
            t_minute = Math.floor(((pSeconds - t_totalDayTime - t_totalHourTime) / 60));
            t_totalMinuteTime = t_minute * 60;
        }

        if (pFormatType.indexOf("ss") != -1) {
            t_second = pSeconds - t_totalDayTime - t_totalHourTime - t_totalMinuteTime;
        }

        pFormatType = pFormatType.replace("dd", pNeedZero && t_day < 10 ? "0" + t_day : "" + t_day);
        pFormatType = pFormatType.replace("hh", pNeedZero && t_hour < 10 ? "0" + t_hour : "" + t_hour);
        pFormatType = pFormatType.replace("uu", pNeedZero && t_minute < 10 ? "0" + t_minute : "" + t_minute);
        pFormatType = pFormatType.replace("ss", pNeedZero && t_second < 10 ? "0" + t_second : "" + t_second);
        return pFormatType;
    }
}

class DateFormatter {

	private _formatString: string;// = 'YYYY-MM-DD';
	public DateFormatter() {

	}

	public set formatString(value: string) {
		if (value)
			this._formatString = value;
	}

	public get formatString(): string {
		return this._formatString;
	}

	public format(value: Object): string {

		var str: string;
		//to do 日期格式
		return str;

	}
}