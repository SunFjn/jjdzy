package com.teamtop.gameCommon;

import java.io.File;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TimeZone;
import java.util.regex.Pattern;

import org.apache.commons.lang3.StringUtils;

import com.teamtop.main.RunServerException;
import com.teamtop.pf.PfConst;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;
import com.teamtop.util.Properties.PropertiesTools;
import com.teamtop.util.file.FileUtils;
import com.teamtop.util.illiegalUtil.IlliegalUtil;
import com.teamtop.util.time.TimeDateUtil;

/**
 * 游戏配置缓存
 * @author kyle
 *
 */
public class GameProperties extends AbsServerEvent{
	/**	 * 平台	 */
	public static String platform = "tencent";
	/**	 * open api地址	 */
	public static String openApiAddress;
	/**	 * open api ip	 */
	public static String apihost;
	/**	 * open api port	 */
	public static int apiPort;
	/**	 * open api index	 */
	public static String apiIndex;	
	/**	 * 区号 数据合服后会自动修改区号,以下划线区分:1_2_3	 */
	public static List<Integer> zoneids = null;
	/**	 * 服务器域名	 */
	public static String serverAddress = "";
	/**	 * 后台端口	 */
	public static int bkPort = 0;
	/**	 * 腾讯tgw包	 */
	public static byte tx[];
	/**	 * 时区	 */
	public static TimeZone timeZone;
	/**	 * 服务器是否已经对外 1为是 0为否	 */
	public static int isServerOpen;	
	/**
	 * 开服时间 使用2013-07-13 12:00:00这种形式，此值在isServerOpen=0的时候可以通过后台更改
	 * 这里用时间戳来记录
	 */
	public static int serverOpenTime;
	/**	 * 平台验证	 */
	public static int platformValidate;
	/**	 * 开启踢人	 */
//	public static int speedTooMuch;
	/**	 * 工具添加好友	 */
	public static  int addFriend;
//	/** * 微端编号 */
//	public static int weiduanIndex;
	/** * 中央服编号 */
	public static int centralIndex;
	/**	 * 战斗调试	 */
	public static boolean battleDebug = false;
	/**	 * 是否开启ip连接上限	 */
	public static boolean ipConnLimit = false;
	/**	 * GM是否开启	 */
	public static boolean gmFlag = false;
	/**  * 预警开关 */
	public static boolean alarmFlag = false;
	/**	 * 下线清除玩家信息间隔时间	 */
	public static int CLEARGAP ;
	/**	 * 定时同步的时间间隔	 */
	public static int SYNC_FIXTIME = 300;	
	/**	 * 立刻完成结婚 false 否，true 是	 */
	public static boolean isFinishMarry = false;	
	/**	 * 战斗录像服务器地址	 */
	public static String  battleVideoServerIp="127.0.0.1";
	/**	 * 战斗录像服务器端口	 */
	public static int battleVideoServerPort=8888;
	/**	 * 临时存放热更文件	 */
	public static String hotswapDir = null;
	/**	 * 启动服务器是否显示UI	 */
//	public static boolean showUI;
	/**	 * UI标题	 */
	public static String uiTitle;
	/**	 * 版本类型	 */
	public static String projectType;
	/**	 * 服务器关闭标志	 */
	public static boolean shutdown = false;
	/**	 * 连接区号标识	 */
	public static String NAME = ".S";
	/**	 * 游戏主端口	 */
	public static int serverPort = 0;
	/**战报服务器上传ip，可使用内网 */
	public static String battlevideo_upload_ip = null;
	/**战报服务器上传端口，可使用内网 */
	public static int battlevideo_upload_port = 0;
	/**战报服务器下载地址，对外 */
	public static String battlevideo_download_address = null;
	/**战报服务器下载端口，对外 */
	public static int battlevideo_download_port = 0;
	/** 后台http端口*/
	public static int houtaiHttpPort=0;
	/** 充值http端口*/
	public static int rechargePort=0;
	/** 前端http端口 */
	public static int clientHttpPort = 0;
	/** 应用宝礼包http端口*/
	public static int qqGiftPort=0;
	/**	 * 中央服_ip_1:后台中央服	 */
	public static String cross_ip_1 = null;
	/**	 * 中央服_端口_1:后台中央服	 */
	public static int cross_port_1 = 0;
	/**	 * 中央服_ip_2:游戏中央服	 */
	public static String cross_ip_2 = null;
	/**	 * #中央服_玩法中央服_域名（客户端https访问）	 */
	public static String cross_domainName_2=null;
	/**	 * 中央服_端口_2:游戏中央服	 */
	public static int cross_port_2 = 0;
	/**	 * 中央服_ip_3:战力提升排行	 */
//	public static String cross_ip_3 = null;
	/**	 * 中央服_端口_3:战力提升排行	 */
//	public static int cross_port_3 = 0;
	/**	 * 服务器id 1：子服，2：后台中央服 3：玩法中央服	 */
	public static int serverId =0;
	/**	 * 平台分配的gameid	 */
	public static String gameid = "";
	/**	 * 本地模式：1是本地模式，会启动ws，正式模式会则根据平齐决定是否启动wss	 */
	public static boolean localmode = true;
	/**	 * #前端战斗中央服ip	 */
	public static String egret_battle_ip = "";
	/**	 * #前端战斗中央服端口	 */
	public static List<Integer> egret_battle_port = null;
	/**	 * 数据库域名  key:zid  value:ip  dbs.pro配置文件	 */
	public static Map<Integer,String> dbAddress = new HashMap<>();
	
	
	/**
	 * 初始化区号
	 * @param zoneidStr
	 * @throws RunServerException 
	 */
	private static void initZoneId(String zoneidStr) throws RunServerException{
		zoneids = new ArrayList<Integer>();
		String[] zoneidArr = zoneidStr.split("\\_");
		if(zoneidArr!=null && zoneidArr.length>0){
			for(String zoneid:zoneidArr){
				zoneids.add(Integer.parseInt(zoneid));
			}
		}else{
			throw new RunServerException(null,"initZoneId");
		}
		Collections.sort(zoneids);
	}
	/**
	 * 初始化腾讯tgw
	 */
	private static byte[] initTx(){
		String txStr ="tgw_l7_forward\r\nHost:"+serverAddress+":"+serverPort+"\r\n\r\n";
		return (txStr).getBytes();
	}
	
	/**
	 * 初始化开服时间
	 * @param str
	 * @throws ParseException
	 */
	private static int initServerOpenTime(String str) throws ParseException{
		return TimeDateUtil.getTimeIntByStr(str);
	}
	/**
	 * 某个rid是否在本服
	 * @param rid
	 * @return
	 */
	public static boolean isRidInThisServer(long rid){
		if(rid==0) return false;
		int zoneid = 0;
		int num  = (int)(rid/100000000000L);
		if(num>20000){
			zoneid = num;
		}else{
			String value = String.valueOf(num);
			String subval = value.substring(1, value.length());
			if(!"".equals(subval)){
				zoneid = Integer.parseInt(subval);
			}
		}
		return zoneids.contains(zoneid);
	}
	/**
	 * 临时存放热更文件
	 */
	private static void initHotswapDir(){
		//临时存放热更文件
		hotswapDir = GamePath.USER_DIR + File.separator + "hotswap";
		File file = new File(hotswapDir);
		if(file==null || !file.exists()){
			FileUtils.createDir(hotswapDir);
		}
	}
	public static void init() throws Exception{
		//PropertiesTools.initPropretiesWithOutFolder(GamePath.CONFIG_DIR + "game.properties");
		//平台platForm
		platform = PropertiesTools.getProperties("platForm");
		//open api地址
		openApiAddress = PropertiesTools.getProperties("openApiAddress");
		String apiAddress = openApiAddress.substring(7);
		int indexOf = apiAddress.indexOf("/");
		if(indexOf>-1){
			String api = apiAddress.substring(0, indexOf);
			apiIndex = apiAddress.substring(indexOf, apiAddress.length());
			if(api.indexOf(":")!=-1){
				String[] arr = api.split(":");
				apihost = arr[0];
				apiPort = Integer.parseInt(arr[1]);
			}else{
				apihost = api;
				apiPort = 80;
			}
		}else{
			apihost = apiAddress;
			apiPort = 80;
			apiIndex = "";
		}
		//平台分配的gameid
		gameid = PropertiesTools.getProperties("gameid");
		//区号
		initZoneId(PropertiesTools.getProperties("zoneid"));
		//服务器域名
		serverAddress = PropertiesTools.getProperties("serverAddress");
		//游戏主端口
		serverPort = PropertiesTools.getPropertiesInt("serverPort");
		//腾讯tgw包
		tx = initTx();
		//时区
		timeZone = TimeZone.getTimeZone(PropertiesTools.getProperties("timezone"));
		//服务器是否已经对外 1为是 0为否
		isServerOpen = PropertiesTools.getPropertiesInt("isServerOpen");
		//初始化开服时间
		serverOpenTime = initServerOpenTime(PropertiesTools.getProperties("serverOpenTime"));
		//平台烟瘴
		platformValidate = PropertiesTools.getPropertiesInt("platformValidate");
		//加速踢人
//		speedTooMuch = PropertiesTools.getPropertiesInt("speedtoomuch");
		//工具给某人添加好友
//		addFriend = PropertiesTools.getPropertiesInt("addFriend");
		//GM是否打开
		gmFlag = PropertiesTools.getPropertiesInt("gmFlag")==1?true:false;
		//是否测试服
		localmode = PropertiesTools.getPropertiesInt("localmode")==1?true:false;
		//下线清除玩家信息间隔时间
		CLEARGAP = PropertiesTools.getPropertiesInt("cleargap");
		//战斗调试
		String bd = PropertiesTools.getProperties("battleDebug");
		if(!StringUtils.isEmpty(bd)){
			battleDebug = Integer.parseInt(bd)==1?true:false;
		}
		//showUI
//		showUI = PropertiesTools.getPropertiesInt("showUI")==0?false:true;
		//uiTitle
		uiTitle = PropertiesTools.getProperties("uiTitle");
		//根据版本类型设置语言过滤兼容
		checkIllDataPaten();
		//临时存放热更文件
		initHotswapDir();
		//后台http端口 
		houtaiHttpPort = PropertiesTools.getPropertiesInt("houtaiHttpPort");
		//充值http端口 
		rechargePort = PropertiesTools.getPropertiesInt("rechargePort");
		// 前端http端口
		clientHttpPort = PropertiesTools.getPropertiesInt("clientHttpPort");
		//应用宝礼包http端口
		qqGiftPort = PropertiesTools.getPropertiesInt("qqGiftPort");
		
		//中央服_ip_1:后台中央服
		cross_ip_1 = PropertiesTools.getProperties("cross_ip_1");
		//中央服_端口_1:后台中央服
		cross_port_1 = PropertiesTools.getPropertiesInt("cross_port_1");
		//中央服_ip_2:玩法跨服中央服
		cross_ip_2 = PropertiesTools.getProperties("cross_ip_2");
		//中央服_端口_2:玩法跨服中央服
		cross_port_2 = PropertiesTools.getPropertiesInt("cross_port_2");
		//#中央服_玩法中央服_域名（客户端https访问）
		cross_domainName_2=PropertiesTools.getProperties("cross_domainName_2");
		//服务器id 1：子服，2：中央服1
		serverId = PropertiesTools.getPropertiesInt("serverId");
		//警报开关    0关闭 ，1开启
		alarmFlag = PropertiesTools.getPropertiesInt("alarmFlag")==1?true:false;
//		// 微端编号
//		weiduanIndex = PropertiesTools.getPropertiesInt("weiduanIndex");
		if(isCentralServer()) {			
			// 中央服编号
			centralIndex = PropertiesTools.getPropertiesInt("centralIndex");
		}
		//
		/*//中央服_ip_3:内测服——玩法跨服中央服
		cross_ip_3 = PropertiesTools.getProperties("cross_ip_3");
		//中央服_端口_3:内测服——玩法跨服中央服
		cross_port_3 = PropertiesTools.getPropertiesInt("cross_port_3");*/
		//#前端战斗中央服ip端口
//		initEgretBattle();
	}
	@Override
	public void startServer() throws RunServerException {
		//获取开服时间
		GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.OPENTIME_SERVER);
		String content = globalData.getContent();
		if (content==null||content.equals("")||content.equals("{}")) {
			content=TimeDateUtil.pringNow();
			//写入服务器开服时间
			globalData.setContent(content);
			GlobalCache.doSync(globalData);
			serverOpenTime = TimeDateUtil.getTimeIntByStr(content);
		}else {
			serverOpenTime = TimeDateUtil.getTimeIntByStr(content);
		}
	
	}
	/**
	 * 获取第一个区id
	 * @return
	 */
	public static int getFirstZoneId(){
		return GameProperties.zoneids.get(0);
	}
	/**	 * 获取所有区号	 */
	public static String getZoneIdStr(){
		StringBuilder str = new StringBuilder();
		for( int i=0; i<zoneids.size(); i++){
			if( i==0){
				str.append( zoneids.get( i));
			}else{
				str.append("_").append( zoneids.get( i));
			}
		}
		return str.toString();
	}
	/**
	 * 是否为子服务器
	 * @return
	 */
	public static boolean isLocalServer(){
		return serverId==GameConst.SERVER_ID_LOCAL;
	}

	/**
	 * 是否为后台中央服
	 * 
	 * @return
	 */
	public static boolean isHoutaiServer() {
		return serverId==GameConst.SERVER_ID_HOUTAI;
	}
	/**
	 * 前端战斗中央服ip端口
	 * @author lobbyer
	 * @date 2017年7月19日
	 */
	public static void initEgretBattle(){
		egret_battle_ip = PropertiesTools.getProperties("egret_battle_ip");
		String portStr = PropertiesTools.getProperties("egret_battle_port");
		List<Integer> portList = new ArrayList<Integer>();
		String[] split = portStr.split("_");
		int start = Integer.parseInt(split[0]);
		int end = Integer.parseInt(split[1]);
		for(int i=start;i<=end;i++) {
			portList.add(i);
		}
		egret_battle_port = portList;
	}
	
	public static boolean isCentralServer(){
		return serverId == GameConst.SERVER_ID_CENTRAL;
	}
	/**
	 * 设置版本语言过滤兼容
	 */
	public static void checkIllDataPaten(){
		if(GameProperties.platform.contains(PfConst.PF_vietnamese)){
			//越南平台语言过滤规则更改
			String VIETNAMESE_DIACRITIC_CHARACTERS 
	        = "ẮẰẲẴẶĂẤẦẨẪẬÂÁÀÃẢẠĐẾỀỂỄỆÊÉÈẺẼẸÍÌỈĨỊỐỒỔỖỘÔỚỜỞỠỢƠÓÒÕỎỌỨỪỬỮỰƯÚÙỦŨỤÝỲỶỸỴ";
			IlliegalUtil.pattern =Pattern.compile("(?:[" + VIETNAMESE_DIACRITIC_CHARACTERS + "]|[\u4e00-\u9fa50-9a-zA-Z])++|[._]?",
	                    Pattern.CANON_EQ |
	                    Pattern.CASE_INSENSITIVE |
	                    Pattern.UNICODE_CASE);
			IlliegalUtil.FIRST_NAME = new String[]{"Trần","Lê","Nguyễn","Phạm","Phan","Đinh","Đặng","Hoàng","Vũ","Bùi","Đỗ","Triệu","Huỳnh","Ngô","Võ","Dương","Lý","Vương","Lý","Trương","Lưu","Trần","Dương","Hoàng","Ngô","Triệu","Chu","Từ","Tôn","Mã","Triệu","Lâm","Quách","Hà","Cao","La","Trịnh","Lương","Tạ","Tống","Đường","Hứa","Đặng","Phùng","Hàn","Tào","Tăng","Bành","Sái","Tiêu","Thái","Phan","Điền","Đổng","Viên","Vu","Dư","Diệp","Tưởng","Đỗ","Tô","Lã","Nguỵ","Trình","Nhậm","Lữ","Lô","Đinh","Thẩm","Nhâm","Diêu","Lư"};
			IlliegalUtil.SEND_MAN_NAME = new String[]{"ThếUy","ThiênUy","CátUy","GiaUy","VũUy","VĩnhUy","CátUy","ĐạtUy","QuốcUy","CẩmUy","KhảiUy","HảiUy","ThanhUy","CaoUy","ĐứcUy","HữuUy","ChíUy","CôngVinh","GiaVinh","HồngVinh","QuangVinh","QuốcVinh","ThanhVinh","ThànhVinh","ThếVinh","TrọngVinh","TrườngVinh","TườngVinh","TấnVinh","NgọcVinh","XuânVinh","HiểnVinh","TuấnVinh","NhậtVinh","AnhViệt","CátUy","HoàngViệt","UyViệt","ĐạtUy","QuốcUy","QuốcViệt","TrọngViệt","TrungViệt","TuấnViệt","VươngViệt","MinhViệt","HồngViệt","ThanhViệt","TríViệt","DuyViệt","BảoSơn","BằngSơn","NgọcSơn","NamSơn","CaoSơn","TrườngSơn","ThanhSơn","ThànhSơn","LamSơn","HồngSơn","HoàngSơn","HảiSơn","ViếtSơn","ThếSơn","QuangSơn","XuânSơn","DanhSơn","LinhSơn","VĩnhSơn","AnhTùng","BáTùng","SơnTùng","ThạchTùng","ThanhTùng","HoàngTùng","BáchTùng","ThưTùng","ĐứcTùng","MinhTùng","ThếTùng","QuangTùng","NgọcTùng","DuyTùng","XuânTùng","MạnhTùng","HữuTùng","AnhTuấn","KhắcTuấn","CôngTuấn"};
			IlliegalUtil.SEND_WOMEN_NAME = new String[]{"HuỳnhNhư","ThanhNhư","CẩmNhung","HồngNhung","PhiNhung","PhươngNhung","QuỳnhNhung","ThanhNhung","TuyếtNhung","KiềuNhung","BíchNhung","BảoThoa","ThụyNhung","KimNhung","HoàngOanh","HồngOanh","KimOanh","NgọcOanh","SongOanh","ThuOanh","ThùyOanh","TrâmOanh","TuyếtOanh","YếnOanh","KiềuOanh","MỹOanh","BảoQuyên","BíchQuyên","DiễmQuyên","KhánhQuyên","LệQuyên","MaiQuyên","NgọcQuyên","PhươngQuyên","ThảoQuyên","ThụcQuyên","TốQuyên","TúQuyên","MỹQuyên","BảoQuỳnh","DiễmQuỳnh","GiaQuỳnh","KhánhQuỳnh","LêQuỳnh","MộngQuỳnh","NgọcQuỳnh","NhưQuỳnh","PhươngQuỳnh","ThúyQuỳnh","TrúcQuỳnh","TúQuỳnh","HồngQuỳnh","BăngTâm","MỹTâm","NgọcTâm","NhưTâm","PhươngTâm","ThanhTâm","ThụcTâm","MaiTâm","HồngTâm","KiềuTâm","ĐanTâm","ÁnhTâm","AnhThảo","BíchThảo","DiễmThảo","DạThảo","HươngThảo","KimThảo","MinhThảo","HoàngThảo","NguyênThảo","NhưThảo","PhươngThảo","BìnhMinh","ThanhThảo","ThiênThảo","ThuThảo","XuânThảo","ÁnhThu","BíchThu","HồngThu","HoàiThu","HươngThu","KiềuThu","KimThu","LệThu","MinhThu","MộngThu","QuếThu","ThanhThu","XuânThu","HoàngThu","AnhThư","DiễmThư","HồngThư","HuyềnThư","KimThư","MinhThư","ThanhThư","ThiênThư","QuỳnhThư","NgọcThư","BảoThư","PhươngThư","BộiThư","BíchThủy","HồngThủy","HươngThủy","KimThủy","LệThủy","MinhThủy","PhươngThủy","ThanhThủy","ThuThủy","XuânThủy","MaiThủy","ÁnhTrang","ÐàiTrang","DiễmTrang","ÐoanTrang","HoàiTrang","HươngTrang","HuyềnTrang","NguyệtCát","DiễmThư","LinhTrang","MinhTrang","MỹTrang","NhãTrang","PhươngTrang","QuỳnhTrang","ThanhTrang","ThảoTrang","ThiênTrang","ThuTrang","ThụcTrang","ThùyTrang","VânTrang","XuânTrang","YếnTrang","BảoTrang","ThanhNhư","ThuTrà","ThanhTrà","DiệpTrà","BíchTrà","HảiTrà","BạchTrà","DiễmTrà","NhưTrà","PhươngTrà","ĐôngTrà","XuânTrà","NgọcTrà","ThuTrà","NgọcSương","NhãSương"};
		}
	}
	
	public static void main(String[] args) {
//		String path = "http://119.29.66.152:8008/openapi.php";
//		String path = "http://192.168.1.115/openapi/openapi.php";
		String path = "http://192.199.999.999";
		String substring = path.substring(7);
		int indexOf = substring.indexOf("/");
		if(indexOf>-1){
			System.err.println(substring.substring(0, indexOf));
			System.err.println(substring.substring(indexOf,substring.length()));
		}
		
		
		/*Pattern pattern = Pattern.compile("[\\d\\.\\:]+");
		Matcher matcher = pattern.matcher(path);
		while(matcher.find()){
			String group = matcher.group();
			System.err.println(group);
		}*/
		
	}
}
