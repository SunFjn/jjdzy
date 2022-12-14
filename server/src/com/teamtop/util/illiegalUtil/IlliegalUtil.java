package com.teamtop.util.illiegalUtil;

import java.util.Random;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.teamtop.gameCommon.GamePath;
import com.teamtop.util.file.FileUtils;
import com.teamtop.util.log.LogTool;

public class IlliegalUtil {
	public static void main(String[] args) {
		rankName();

		for(int i=0; i<FIRST_NAME.length; i++){
			String mainStr = FIRST_NAME[i];
			for(int j=i+1; j<FIRST_NAME.length; j++){
				String temp = FIRST_NAME[j];
				if(mainStr.equals(temp)){
					FIRST_NAME[j]="重复名字";
				}
			}
		}
		for(int i=0; i<SEND_MAN_NAME.length; i++){
			String mainStr = SEND_MAN_NAME[i];
			for(int j=i+1; j<SEND_MAN_NAME.length; j++){
				String temp = SEND_MAN_NAME[j];
				if(mainStr.equals(temp)){
					SEND_MAN_NAME[j]="重复名字";
				}
			}
		}
		for(int i=0; i<SEND_WOMEN_NAME.length; i++){
			String mainStr = SEND_WOMEN_NAME[i];
			for(int j=i+1; j<SEND_WOMEN_NAME.length; j++){
				String temp = SEND_WOMEN_NAME[j];
				if(mainStr.equals(temp)){
					SEND_WOMEN_NAME[j]="重复名字";
				}
			}
		}
		
		for(int i=0; i<FIRST_NAME.length; i++){
			String mainStr = FIRST_NAME[i];
			for(int j=0; j<SEND_MAN_NAME.length; j++){
				String tempStr = SEND_MAN_NAME[j];
				if(mainStr.equals(tempStr)){
					SEND_MAN_NAME[j]="重复名字";
				}
			}
			for(int j=0; j<SEND_WOMEN_NAME.length; j++){
				String tempStr = SEND_WOMEN_NAME[j];
				if(mainStr.equals(tempStr)){
					SEND_WOMEN_NAME[j]="重复名字";
				}
			}
		}

		for(int i=0; i<SEND_MAN_NAME.length; i++){
			String mainStr = SEND_MAN_NAME[i];
			for(int j=0; j<SEND_WOMEN_NAME.length; j++){
				String tempStr = SEND_WOMEN_NAME[j];
				if(mainStr.equals(tempStr)){
					SEND_WOMEN_NAME[j]="重复名字";
				}
			}
		}
		
		StringBuilder first = new StringBuilder();
		for(int i=0; i<FIRST_NAME.length; i++){
			first.append("\"").append(FIRST_NAME[i]).append("\", ");
		}
		System.out.println(first);
		StringBuilder man = new StringBuilder();
		for(int i=0; i<SEND_MAN_NAME.length; i++){
			man.append("\"").append(SEND_MAN_NAME[i]).append("\", ");
		}
		System.out.println(man);
		StringBuilder women = new StringBuilder();
		for(int i=0; i<SEND_WOMEN_NAME.length; i++){
			women.append("\"").append(SEND_WOMEN_NAME[i]).append("\", ");
		}
		System.out.println(women);
	}
	public static String[] split = null;
	
	static{
		String readData = FileUtils.readData(GamePath.USER_DIR+GamePath.SEP+"bin/com/teamtop/util/illiegalUtil/keys.txt");
//		split = readData.split("、");
		
//		System.err.println(readData);
	}
	public static Pattern pattern = Pattern.compile("[\u4e00-\u9fa50-9a-zA-Z]+");
	public static String[] FIRST_NAME = {"钱", "孙", "李", "周", "吴", "王", "王", "冯", "李", "卫", "沈", "韩", "杨", "朱", "秦", "尤", "许", "何", "吕", "施", "孔", "严", "金", "魏", "陶", "姜", "戚", "谢", "邹", "喻", "柏", "水", "章", "云", "苏", "潘", "葛", "奚", "范", "彭", "鲁", "韦", "马", "苗", "方", "俞", "任", "袁", "柳", "史", "唐",  "岑", "薛", "雷", "贺", "倪", "汤", "滕", "殷", "罗", "毕", "郝", "常", "乐", "于", "时", "傅", "皮", "卞", "齐", "康", "余", "凡", "卜", "顾", "孟", "黄", "穆", "萧", "尹", "姚", "邵", "汪", "祁", "臧", "计", "伏", "成", "戴", "谈", "宋", "茅", "庞", "熊", "纪", "舒", "项", "祝", "董", "岳", "杜", "阮", "蓝", "闵", "席", "季", "麻", "贾", "路", "娄", "汪", "童", "颜", "郭", "梅", "锺", "徐", "邱", "骆", "高", "夏", "蔡", "田", "樊", "胡", "凌", "霍", "虞", "万", "柯", "管", "卢", "莫", "房", "宗", "丁", "宣", "邓", "郁", "单", "杭", "洪", "包", "诸", "左", "石", "陌", "雪", "箫", "易", "荒", "狼", "扬", "皇", "玄", "沐", "流", "佟", "冷", "简", "尘", "缘", "", "欧", "永", "浅", "荆", "饶", "曾", "苍", "慎", "卿", "古", "邰", "甘", "钟", "沙", "恒", "鸿", "御", "焦", "祖", "步", "斩", "松", "襄", "白", "贝", "景", "桑", "侯", "墨", "段", "谭", "雍", "闻", "子车", "宫", "廖", "巩", "怡", "俊", "欧阳", "太史", "端木", "上官", "司马", "东方", "独孤", "楠宫", "夏侯", "诸葛", "尉迟", "皇甫", "太叔", "永孙", "长孙", "宇纹", "司徒", "鲜于", "司", "拓跋", "玄辕", "令狐", "左丘", "百里", "北宫", "西门", "永输", "呼延", "闾丘", "司空", "甄", "东门", "子桑", "仲长", "澹台", "皇极", "濮扬", "岳丘", "东郭", "宗月", "闻人", "申屠", "仲孙", "钟离", "亓官", "巫马", "乐正", "楠荣", "尹纹", "寂寞丶", "暗夜丶", "嗜血的", "梦幻灬", "烈火灬", "鬼厉丿", "縋憶", "緈諨的", "单纯啲", "流年彡", "壞尐絯", "壞脾氣", "澹台V", "永冶V", "宗月V", "淳于V", "单于V", "太叔V", "申屠V", "永孙V", "仲孙V", "轩辕V", "钟离V", "宇文V", "长孙V", "慕容V", "司徒V", "司空V", "耶律V", "習慣孒", "柰哬灬", "夢抝丿", "覇氣灬", "傾峸灬", "睿潪哋", "湧掹哋", "臥龍", "战狂丨", "怒焰丨", "淮氏灬", "海角灬", "悠悠灬", "眷顾", "溫文", "爾雅", "墨凹", "暉丶", "微光丶", "独行丶", "众生丶", "蛊惑丶", "术神文", "涯丶", "牽咗月灬", "卟蓠丨", "卟灬蓠", "毀傷丨丶", "维尼丶", "杂念丶", "骨頭丶", "莱维丶", "暗夜灬", "冰痕", "轩辕灬", "寶呗丶", "罘丨囄", "罘丨棄", "虐杀丶", "沫丨灬", "射月座丶", "咾弑", "叚裝荿", "情灬", "弑神灬", "萌菟子", "绝恋灬", "絕攣灬", "樱冫", "惺丶尘", "依然灬", "武丶", "月影丶", "霸气", "過佉丨", "陌然灬", "吥洅", "淺相思灬", "斷橋", "難以", "灬年華灬", "無奈", "尛默", "尛灬", "媣仩涳", "涳丶皛", "Mr唯嗳", "冄盈", "綬鬺", "嗐怕丿", "侽亽", "侽仔", "銘婲", "繺鉮", "孒", "犭蟲彳亍", "尐豬嘙", "尐豬灬", "天刹丶", "天神丶", "如月丶", "真丶", "终丶", "暗丶", "光丶", "蝶梦丶", "醉香丶", "重刃丶", "贪狼丶", "破丶", "忻古丶", "传承丶", "圣丶", "邪丶", "传说丶", "炼狱丶", "狂丶", "冥丶", "嘤嘤丶", "粉红丶"};
	public static String[] SEND_MAN_NAME = {"洛城", "半夏", "鸿涛", "凉薇", "锦年", "子玄", "浩宇", "烨华", "夏陌", "昊然", "祈年", "睿渊", "弘纹", "哲瀚", "司宸", "离央", "弥劫", "唯蝉", "顾谋", "雨泽", "烨磊", "玉韬", "墨笙", "映岛", "天佑", "辗尘", "银尘", "琅邪", "破军", "旭尧", "英杰", "墨隐", "浅袖", "青野", "流觞", "瑾瑜", "昊", "天", "苏言", "笑愚", "苏泽", "汪城", "执年", "羽兮", "炫明", "雪峥", "思源", "智渊", "思淼", "潇", "啸", "天宇", "浩然", "卿午", "残夜", "陆崖", "乐驹", "玄尧", "妖逆", "昊焱", "天衍", "钦天", "止戈", "云兮", "仙晖", "子默", "思忻", "浩玄", "语堂", "墨荻", "子青", "鹏", "孟珏", "斩白", "博", "纹淼", "世杰", "涵霖", "琦枫", "冬霖", "奉灼", "木尘", "晟宏", "莫彻", "棂痕", "智睿", "洞麟", "唯翰", "云峥", "俊衡", "彬", "瀚", "宇恒", "半溪", "楼澈", "俊峰", "清锋", "俊凯", "明琦", "半弦", "漠尘", "裁煊", "浮生", "聆", "池暝", "云尘", "苍凛", "志扬", "天奇", "冠恒", "步崖", "旭华", "简辞", "崇时", "流年", "苏洵", "继衫", "玉良", "恒文", "守帅", "沐简", "汪麟", "文丁", "雪宸", "水生", "崇汪", "玮晔", "易和", "艺凡", "愫暮", "纪城", "惟锋", "箫惟", "清浅", "天来", "少木", "熠斐", "若尘", "晴月", "树青", "忘川", "吟尘", "志权", "智韬", "指尖", "文源", "翊歌", "未央", "度半", "浅城", "楚水", "俊鸣", "剑衡", "苏誉", "滨", "怡灵", "薛采", "淦清", "巷", "云纵", "铭琦", "奎泽", "容止", "简瞳", "清河", "懿强", "臾凉", "浩均", "梓陌", "诗途", "绍永", "弋戈", "焯纹", "雄略", "秦戈", "宿昔", "殊哲", "景辉", "宗锡", "墨痕", "未尽", "念卿", "离文", "镜木", "世鸿", "屿熙", "扶苏", "俊澈", "意之", "泽波", "斯鸿", "康令", "时言", "宏坤", "玄峥", "离空", "玄痕", "卿驹", "佑能", "志", "辉", "云湛", "锦城", "浩斌", "佐辰", "逐笙", "伟炜", "智钊", "溪", "付钊", "燕洵", "摩涯", "瑾琦", "沫白", "苏沐", "彦秋", "沐苍", "清忻", "瑾耀", "景照", "洪成", "宗辉", "纹耀", "海波", "年煜", "苍翔", "羽襄", "龙渊", "临城", "连城", "云苍", "离癸", "剑华", "惟辞", "钺儒", "燕辉", "古翊", "锡洪", "瑾言", "泽彬", "文钦", "影迭", "折颜", "柠辰", "浩初", "木笙", "龙彦", "飞儒", "英生", "琉熏", "天可", "简刻", "絮卿", "俊成", "襄蝉", "木月", "纹广", "昭典", "白浅", "泽峰", "永楷", "陌归", "纹", "岳", "逐年", "仁相", "雪武", "栖牙", "海滨", "璃言", "沐潋", "黎月", "彼妖", "洪祥", "柠玄", "锦武", "斩殇", "凌羽", "海泉", "进均", "付笑", "云谦", "青袂", "锦伦", "墨染", "幻殇", "海瑞", "汝坚", "青穹", "雷镭", "海凭", "楚烈", "蓝瑞", "凯洪", "可卿", "捷洧", "影落", "崇耿", "晓昫", "耿义", "罗弦", "奕锋", "冥沧", "紫悠", "空宸", "坚炎", "乱城", "易凡", "怡穹", "如初", "昭", "贤", "箫影", "丕汉", "秦洛", "恨水", "初濯", "即墨", "纹藏", "尔雅", "木胜", "缘止", "陆木", "迷城", "舒玄", "念白", "仲川", "倾歌", "简痕", "熠栋", "青衫", "铿翘", "上圣", "沐决", "玄扬", "维衫", "未明", "云清", "蓝弦", "冠州", "流云", "汐崖", "凡御", "志洲", "汉昭", "志翔", "慕非", "子宸", "言渊", "流离", "韬韬", "扬彦", "泽楷", "清歌", "若谷", "浅夜", "炳松", "苏卿", "焕奕", "东彬", "怡云", "乔羽", "灵煜", "宇玄", "绍月", "笛箫", "月澜", "博瀚", "博赡", "博忻", "才哲", "天倾", "承天", "承宣", "承泽", "遍染", "河洛", "德曜", "睿雪", "明澈", "飞羽", "飞鸣", "晗昱", "茗烟", "沉澈", "萧影", "梦殇", "天枢", "天璇", "天玑", "天权", "玉衡", "开扬", "越衡", "蒙翳", "赤明", "和扬", "焕殇", "端靖", "观明", "太焕", "皇崖", "宸飏", "极", "竺落", "玄明", "声思", "声忌", "昙誓", "皓庭", "凌渊", "初空", "紫苏", "天尹", "纹俊", "萧然", "羽凌", "逸扬", "燚珲", "羽玄", "夜昭", "御殇", "琉焕", "晴明", "纹濯", "亦辞", "逸枫", "洛然", "钦引", "煜祺", "智宸", "卿绝", "梨白", "烨伟", "鸿煊", "迎天", "熠彤", "俊昊", "韶玥", "云歌", "寒澈", "书恒", "箫宸", "映雪", "泽", "左晞", "项遥", "浅衫", "沛衫", "非宸", "书衡", "屠苏", "天羽", "威心", "千影", "泓礼", "源鸣", "和殇", "杜陵", "岚", "景千", "极星", "虚灵", "呈天", "燕", "流空", "紫英", "丰锐", "英凡", "长山" };
	public static String[] SEND_WOMEN_NAME = {"幼幼", "紫月", "月染", "代晴", "蓝姬", "凉微", "青瓶", "怀青", "幻雪", "初柔", "绯玉", "崖晴", "映之", "芷", "语云", "翼柔", "月瑶", "痕之", "映云", "凭澈", "幼凡", "朝崖", "灵玉", "冷青", "秋逐", "溪若", "羽蓝", "念柠", "书雪", "凭筠", "寻澈", "凭灵", "雪茶", "依", "梓蓝", "紫凭", "惜萱", "缕洵", "诗澈", "寻云", "谷蓝", "衫灵", "从云", "攸玄", "尔蓝", "觅松", "冰襄", "依玉", "冰之", "渺梦", "曼青", "冷菱", "雪曼", "月白", "浅亦", "凌迭", "云夏", "楠烟", "靖易", "沛柠", "叶辰", "澈儿", "月青", "初蝶", "寄灵", "惜晏", "雨逐", "温榭", "绮楠", "青柠", "孤蓝", "卿衫", "新筠", "夏瑶", "涵棂", "颜凡", "灵凡", "柠云", "沐颜", "离成", "夜梦", "从筠", "楠薇", "语蝶", "依尘", "箫玄", "念之", "初琉", "渺渺", "语琉", "乐乐", "晓筠", "夏衫", "尔容", "念梦", "问薇", "雨灵", "柠月", "冰璃", "宛菡", "遗忘", "如凡", "语梦", "易梦", "柔", "襄陆", "梦玉", "怀衾", "灵儿", "蕊仙", "书蝶", "恨尘", "霓裳", "以晴", "菱", "孤云", "水水", "薇月", "绯烟", "代墨", "婉蝶", "夏烟", "若鸢", "依茶", "紫萱", "涵易", "翼之", "月棂", "白亦", "棂玉", "怜雪", "听泉", "梦逐", "浅凡", "寄玄", "思攸", "谷梦", "芷薇", "凭颜", "孤晴", "夏澈", "沐洛", "浅颖", "以玄", "初夏", "莲月", "雨月", "云芷", "寄白", "紫琴", "幼枫", "芙绒", "新叶", "夏云", "雨琴", "莹扬", "棂薇", "小柠", "影墨", "傲傲", "顾羽", "宠儿", "绿茶", "凡颜", "书逐", "半烟", "绮洛", "萱之", "觅卿", "夜雪", "萌萌", "尔", "沐白", "雨玄", "芷衫", "尔琉", "沛棂", "灵萱", "黎容", "玥痕", "映月", "凡晏", "梦棂", "可儿", "梦玄", "攸雪", "凡薇", "怀浅", "灵寒", "天薇", "白", "宜瑾", "亦柠", "夜洛", "可柔", "青墨", "冰尘", "白萱", "攸月", "晴川", "蓝河", "凉心", "沛白", "颜衫", "雪晴", "施施", "倾雪", "彼岸", "冰绝", "笑笑", "念瑶", "天尘", "钰澈", "如恒", "向尘", "从扬", "颖怜", "亦云", "向嫣", "尔蝶", "澹亦", "盼夏", "孤菱", "月莲", "问柠", "问萱", "薇衫", "冗冗", "梦蕊", "衫谦", "莲洛", "绯洛", "柠洛", "思萱", "怀梦", "冷冷", "蝶澈", "柠檬", "芊墨", "青纹", "半徽", "幼菱", "言之", "襄之", "亦玉", "靖荷", "碧萱", "寒云", "浅墨", "怀薇", "斯洛", "翼纹", "薄荷", "怀言", "若衫", "羽向", "凡白", "绮烟", "木攸", "天归", "墨亦", "依玄", "曼洛", "凡绿", "月洛", "夏之", "浅夏", "宛亦", "艾沫", "澹云", "素问", "浅殇", "易染", "青玄", "斯尘", "渺之", "半襄", "忘萱", "初蓝", "怀弦", "聘婷", "初之", "宛婉", "寄卿", "箫凭", "幻儿", "浅", "天飏", "雅青", "寄纹", "代天", "琉璃", "惜衫", "向薇", "冬灵", "凌青", "影嫣", "书蓝", "绮", "蓝烟", "绮晴", "云柔", "羽柔", "以衫", "紫雪", "芷容", "书衿", "涵扬", "怀钰", "易云", "采蓝", "代秋", "惜梦", "尔烟", "青茶", "怀墨", "书菱", "水蓝", "墨澈", "半蓝", "斯柔", "云徽", "月蓝", "冰蓝", "襄薇", "静衫", "幻棂", "莲天", "景白", "斯", "言徽", "绮纹", "琉纹", "芷云", "思柔", "语嫣", "慕衫", "依云", "从柠", "月梦", "襄玄", "凡檀", "映月", "月眸", "凭萱", "以筠", "新逐", "觅儿", "璧月", "白逐", "木絮", "柠冬", "含灵", "初扬", "蝶秋", "襄天", "夏容", "夏雪", "冰洵", "断弦", "云逸", "斯棂", "梦衫", "攸灵", "灵月", "凌瞳", "浅瑶", "又蓝", "尔逐", "天蓝", "青枫", "月芙", "语海", "灵衫", "空城", "夏寻", "仰仰", "水之", "绯尘", "冰夏", "葬浅", "绯连", "薇白", "凡蝶", "桔梗", "添添", "陌然", "若云", "含嫣", "听筠", "采梦", "柠莲", "凡彤", "觅衫", "洛瑶", "袅袅", "冷之", "秋水", "秋鸢", "慕月", "絮瑶", "如夏", "海亦", "初晴", "苏澈", "听月", "芷雪", "以松", "梦呓", "旧城", "沐柔", "映冬", "云孤", "箫痕", "月萱", "听澈", "雪莲", "墨蓝", "浅陌", "绮琴", "雨纹", "洛洛", "青柏", "清柠", "翼月", "墨晴", "映月", "雪衫", "梦寒", "迎楠", "青青", "采楠", "如彤", "素素", "采枫", "潋容", "嫣然", "茗薇", "兜兜", "雪瑶", "暖暖", "寄云", "未眠", "云初", "涵沐", "书白", "乐天", "逝水", "知秋", "新之", "凡儿", "夏尘", "静枫", "柏芷", "恨蕊", "楚宜", "白玉", "问玉", "迹行", "澹蝶", "凡瑶", "冰蝶", "暖瞳", "代灵", "芷烟", "白易", "絮尘", "怜烟", "凭徽", "澹寒", "梦熏", "绿柠", "冰菱", "语蕊", "倾灵", "思烟", "翼枫", "映菱", "泛儿", "凌蓝", "曼蓝", "若枫", "木薇", "凡灵", "颜鸢", "秋灵", "薇薇", "觅云", "水凡", "灵秋", "卿灵", "笑天", "白夏", "又青", "冬沐", "重衫", "雪伦", "雪容", "月诺", "冷萱", "夜徽", "浅唱", "尔扬", "苏苏", "微潋", "孤扬", "归清", "依薇", "渺双", "果果", "蓝绝", "惜筠", "碧白", "莲祭", "觅晴", "寄蓉", "慕言", "水澹", "幼霜", "花昼", "雪惟", "沫然", "怜云", "月歌", "沫沫", "水冬", "天青", "暖色", "青妖", "灵媚", "幽若", "云瞳", "苏漪", "问", "凌寒", "代蓝", "幼白", "衫简", "若薇", "芷蓝", "寄蓝", "谷之", "芊芊", "新柔", "靖之", "雪薇", "怀晏", "悦影", "含云", "雨柠", "幻玉", "寄澈", "墨行", "简粟", "缓缓", "浮凉", "冷眸", "雨筠", "书柠", "梓云", "瞳颜", "念痕", "藏心", "蓝染", "雅久", "青寒", "夏残", "笔筱", "瑶宸", "久瓷", "璃眸", "尔晴", "云瓷", "以菡", "离落", "杯雪", "紫薇", "飞岛", "恨玉", "牧歌", "凌双", "岑迷", "蓝浮", "凭蓝", "翼蓝", "璃绝", "楚楚", "花逝", "静筠", "葬心", "紫衫", "巧青", "梦空", "绿澈", "浅蓝", "笔触", "宛澹", "梨落", "依白", "青芒", "襄柠", "残月", "雅萱", "芷枫", "映梦", "蓝念", "初", "幼绿", "盼烟", "宛云", "涵霜", "默恋", "裳若", "语寒", "浅黛", "蓝汐", "朵朵", "诗青", "紫烟", "之薇", "雨熏", "又玄", "末年", "冰筠", "渐落", "空歌", "书澈", "绿云", "梦萱", "青檀", "浅柔", "青漪", "莲昙", "韶荒", "若殉", "秋亦", "之灵", "蒹", "以蓝", "寒灵", "水曼", "沧月", "雅云", "步影", "浅笑", "逝言", "采亦", "翼青", "水云", "以扬", "缱欢", "木琼", "雨青", "孤蝶", "映", "流潋", "花殇", "幻紫", "小兮", "凉薄", "蓝萱", "灵烟", "冷海", "幻蓉", "惜曼", "翼筠", "浅念", "紫玉", "依烟", "沛灵", "夏末", "兔兔", "静钰", "释然", "夏夜", "刺陵", "惜染", "语枫", "倾城", "素落", "浅翼", "花影", "雨菱", "落幕", "紫筠", "易蝶", "思云", "小雪", "微凉", "木念", "约逝", "小调", "烟微", "雪殇", "祭逝", "原点", "惜", "乐彤", "云饯", "猫猫", "宛玄", "沉尘", "浅吟", "沛亦", "灵眸", "陌言", "初菡", "笙歌", "青衣", "映夏", "凉城", "夭夭", "陌诺", "瑾年", "夏蓉", "羽痕", "木槿", "乐白", "浅茉", "笑靥", "纸鸢", "蓝调", "尘缘", "乱世", "紫柔", "暖扬", "依菱", "凌晴", "棂絮", "薇蓝", "丢丢", "凉子", "墨筠", "念汐", "夏海", "荼蘼", "蓝月", "半亦", "念凡", "诺染", "梦柠", "芷洛", "紫月", "云萱", "陌颜", "书柔", "叮当", "夏蓝", "岑瑶", "渲蓝", "夏殇", "颜夕", "重染", "半芙", "书容", "昔年", "晴兮", "旧梦", "亦梦", "汐颜", "若熏", "寒晴", "末凉", "夏缓", "初玉", "灵钧", "泡泡", "书颜", "晴鸢", "半菡", "夜", "念雪", "若洵", "浮莲", "凡雪", "夏木", "含天", "雅蓉", "青璇", "夏念", "木独", "绿萼", "喵喵", "飞鸾", "逐影", "晴雯", "晴雪", "恋雨", "恋羽", "梦璃", "菱纱", "漓殇", "兮兮", "黛滢", "若菱", "灵芸", "关关", "嫦曦", "瑶", "瑶光", "絮年", "梦瑶", "离昔", "青瓷", "怡梦", "沁蓝", "不归", "婧瑶", "檀雅", "若翾", "韵寒", "莲见", "途往", "云霓", "花祭", "秋霁", "亦汐", "茉攸", "柠痕", "卿殇", "亦萱", "冰舞", "绯云", "晓熏", "飘絮", "纤雪", "惜玥", "寒依", "雪翼", "茗若", "倾羽", "舒璎", "紫幽", "碧痕", "袭人", "婉晴", "蓠霜", "翎雪", "泠芷", "茗雪", "清璇", "舒萌", "雨烟", "雨晴", "淡如", "柠燕", "曦芸", "羽蔷", "雨薇", "楚玥", "妍兮", "婉儿", "楚瑶", "梦笙", "楚妍", "莲泉", "宛聆", "筱月", "筱俊"};
	
	/**
	 * 敏感字过滤，字符串的长度
	 * @param name 输入的文字内容
	 * @param length ：英文状态下的长度，中文的是英文的两倍
	 * @return true通过验证，false未通过验证
	 */
	public static boolean isNameIll(final String name,int length){
		for(int i=0;i<split.length;i++){
			if(name.indexOf(split[i])>=0&&!split[i].equals("")){
				LogTool.warn("i:"+i+","+split[i], IlliegalUtil.class);
				return false;
			}
		}
		Matcher matcher = pattern.matcher(name);
		StringBuilder sb = new StringBuilder();
		while(matcher.find()){
			sb.append(matcher.group());
		}
		String ill = sb.toString();
		if(ill!=null && !ill.equals(name)) return false; //有特殊字符
//		System.err.println("ill:"+ill);
		int len = 0;
		for(int i=0;i<ill.length();i++){
			if(ill.charAt(i)>= 0x4e00 && ill.charAt(i)<=0x9fa5){
				len +=2;
			}else{
				len +=1;
			}
		}
		if(len>length){
			return false;
		}
		return true;
	}
	/**
	 * 聊天是是否敏感
	 * @param name
	 * @param length
	 * @return
	 */
	public static String isMingan(final String name,int length){
		for(int i=0;i<split.length;i++){
			if(name.indexOf(split[i])>=0){
//				System.err.println("i:"+i+","+split[i]);
				StringBuilder sb = new StringBuilder();
				for(int k=0;k<split[i].length();k++){
					sb.append("*");
				}
				String nameTemp = name.replaceAll(split[i], sb.toString());
				nameTemp = nameTemp.replaceAll("<", "*");
				nameTemp = nameTemp.replaceAll(">", "*");
				return nameTemp;
			}
		}
		//过滤< > 符号
		String nameTemp = name.replaceAll("<", "*");
		nameTemp = nameTemp.replaceAll(">", "*");
		return nameTemp;
	}
	public static boolean isContentIll(final String name,int length){
		for(int i=0;i<split.length;i++){
			if(name.indexOf(split[i])>=0){
//				System.err.println("i:"+i+","+split[i]);
				return false;
			}
		}
//		System.err.println("ill:"+ill);
		int len = 0;
		for(int i=0;i<name.length();i++){
			if(name.charAt(i)>= 0x4e00 && name.charAt(i)<=0x9fa5){
				len +=2;
			}else{
				len +=1;
			}
		}
		if(len>length){
			return false;
		}
		return true;
	}
	
	public static String rankName(){
		Random random = new Random();
		int nameNum=random.nextInt(2);
		int oneXin=random.nextInt(FIRST_NAME.length);
		int doubleXin=random.nextInt(SEND_MAN_NAME.length);
		int mingIndex=random.nextInt(SEND_WOMEN_NAME.length);
		StringBuffer namebBuffer=new StringBuffer();
	    if (nameNum==0) {//女
	    	String xinStr=FIRST_NAME[oneXin];
	    	String minStr=SEND_WOMEN_NAME[mingIndex];
	    	namebBuffer.append(xinStr).append(minStr);
		}else {//男
	    	String xinStr=FIRST_NAME[oneXin];
	    	String minStr=SEND_MAN_NAME[doubleXin];
	    	namebBuffer.append(xinStr).append(minStr);
		}
		return namebBuffer.toString();
	}
	
	
	
	
	
	
}
