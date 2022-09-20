package com.teamtop.system.hero;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 角色系统用到的X协议key
 * 协议108、110、112、114、118、142、190
 * @author hepl
 *
 */
public class HeroXData {
	/**
	 * 充值双倍
	 */
	public static String doubleRecharge ="500"; //doubleRecharge
	/**
	 * 勋章id
	 */
	public static String medalId ="501"; //medalId
	/**
	 * 跟随将领id
	 */
	public static String followGeneralConfigId="502"; //followGeneralConfigId
	/**
	 * 跑镖状态
	 */
	public static String paobiao="503"; //paobiao
	/**
	 * 镖车品质
	 */
	public static String paobiaoQA ="506"; //paobiaoQA
	/**
	 * 总战力
	 */
	public static String totalSt ="508"; //totalSt
	/**
	 * 称号
	 */
	public static String titles="509"; //titles
	/**
	 * 帮会名字
	 */
	public static String gangName="510"; //gangName
	/**
	 * 帮会武学
	 */
	public static String gangWuXueInfo ="511"; //gangWuXueInfo
	/**
	 * vip等级
	 */
	public static String vip="512"; //vip
	/**
	 * 帮会id
	 */
	public static String gangId="513"; //gangId
	/**
	 * 帮会职位
	 */
	public static String gangPosition ="514"; //gangPosition
	/**
	 * 挂机状态、结婚状态
	 */
	public static String status="515"; //status
	/**
	 * 宝石数据
	 */
	public static String stone ="517"; //stone
	/**
	 * vip类型，0正式vip，1临时vip
	 */
	public static String vipType ="518"; //vipType
	/**
	 * 角色id
	 */
	public static String id ="519"; //id
	/**
	 * 平台
	 */
	public static String pf="520"; //pf
	/**
	 * route
	 */
	public static String route="523"; //route
	/**
	 * 是否结婚 1:0
	 */
	public static String isMarry="524"; //isMarry
	/**
	 * 
	 */
	public static String type="525"; //type
	/**
	 * 奔跑兄弟
	 */
	public static String fireStartTime ="526"; //fireStartTime
	/**
	 * 奔跑兄弟
	 */
	public static String fireEndTime ="527"; //fireEndTime
	/**
	 * 奔跑兄弟炸弹
	 */
	public static String bombTime ="528"; //bombTime
	/**
	 * 
	 */
	public static String sysId="529"; //sysId
	/**
	 * 
	 */
	public static String posX="530"; //posX
	/**
	 * 
	 */
	public static String posY="531"; //posY
	/**
	 * 场景状态  0：正常，1：战斗，2：冻结
	 */
	public static String act_st ="532"; //act_st
	/**
	 * 如果是休息冒泡，就ID+1000，如果是操作冒泡，ID+2000
	 */
	public static String talkID="533"; //talkID
	/**
	 * 移动速度
	 */
	public static String speed="534"; //speed
	/**
	 * 侠客状态
	 */
	public static String state ="535"; //state
	/**
	 * 小龟状态 0：正常， 1：加速，2：减速，3：停止，4：休息
	 */
	public static String turtleState="536"; //turtleState
	/**
	 * 角色名称
	 */
	public static String hname ="538"; //hname
	/**
	 * 宠物模型
	 */
	public static String petModel="539"; //petModel
	/**
	 * 宠物名称
	 */
	public static String petName="540"; //petName
	/**
	 * 宠物称号
	 */
	public static String petTitle ="541"; //petTitle
	/**
	 * 扑克套装属性
	 */
	public static String pokerSuit ="542"; //pokerSuit
	/**
	 * 扑克激活套装
	 */
	public static final String POKER_SUIT ="542"; //pokerSuit
	
	/**
	 * 身体模型
	 */
	public static String body ="543"; //body
	/**
	 * 武器模型
	 */
	public static String weapon ="544"; //weapon
	/**
	 * 坐骑
	 */
	public static String ride="545"; //ride
	/**
	 * 翅膀
	 */
	public static String wing="546"; //wing
	/**
	 * 麒麟臂id
	 */
	public static String unicornArmId="547"; //unicornArmId
	/**
	 * 是否为兔子
	 */
	public static String rabbit="548"; //rabbit
	/**
	 * 心法数据
	 */
	public static String xinFa ="550"; //xinFa
	/**
	 * 结婚对象的名称
	 */
	public static String marrier ="551"; //marrier
	/**
	 * 结婚对象的id
	 */
	public static String marrierid ="552"; //marrierid
	/**
	 * 结婚状态
	 */
	public static String marrystatus="553"; //marrystatus
	/**
	 * 组队队员
	 */
	public static String t_m="554"; //t_m
	/**
	 * 组队跟随状态
	 */
	public static String t_f="555"; //t_f
	/**
	 * 侠客令开通状态
	 */
	public static String vipDartState="556"; //vipDartState
	/**
	 * 挂机修炼类型  按房间类型0 1 2 3
	 */
	public static String practiceType ="557"; //practiceType
	/**
	 * 升级特效
	 */
	public static String levelUpEff ="558"; //levelUpEff
	/**
	 * 黄钻
	 */
	public static String yellowState="559"; //yellowState
	/**
	 * 玄兵模型
	 */
	public static String instrument ="560"; //instrument
	/**
	 * 美人模型id
	 */
	public static String goddessModelId="561"; //goddessModelId
	/**
	 * 玩家登陆ip
	 */
	public static String userip ="562"; //userip
	/**
	 * 属性丹
	 */
	public static String attributeDrug="563"; //attributeDrug
	/**
	 * 进阶等级
	 */
	public static final String JINJIE_LV ="564"; //jinJieStar
	/**
	 * 进阶经验
	 */
	public static final String JINJIE_EXP ="565"; //jinJieExp
	/**
	 * 天赋
	 */
	public static final String TIANFU ="566"; //tianfu
	/**
	 * 最强王者段位
	 */
	public static String kingDw ="567"; //kingDw
	/**
	 * 最强王者排名
	 */
	public static String kingRank ="568"; //kingRank
	/**
	 * 星级经验，当前大还丹的数量
	 */
	public static String starExp ="569"; //starExp
	/**
	 * 扑克数据
	 */
	public static String pokerData ="570"; //pokerData
	/**
	 * 角色名称
	 */
	public static String name ="571"; //name
	/**
	 * 性别
	 */
//	public static String sex ="572"; //sex
	/**
	 * 职业
	 */
//	public static String job ="573"; //job
	/**
	 * 血脉阶级
	 */
	public static String bloodStep ="574"; //bloodStep
	/**
	 * 血脉星级
	 */
	public static String bloodStar ="575"; //bloodStar
	/**
	 * 血脉点数
	 */
	public static String bloodPoint ="576"; //bloodPoint
	/**
	 * 怒气技能列表
	 */
	public static String angerSkillList ="577"; //angerSkillList
	/**
	 * 当前使用的怒气技能
	 */
	public static String usedAngerSkill ="578"; //usedAngerSkill
	/**
	 * 资质星级
	 */
	public static String potentialLv ="579"; //potentialLv
	/**
	 * 资质经验
	 */
	public static String potentialExp ="580"; //potentialExp
	/**
	 * 被动技能列表
	 */
	public static String passiveSkill ="581"; //passiveSkill
	/**
	 * 宠物称号
	 */
	public static String title ="582"; //title
	/**
	 * 灵性平均等级
	 */
	public static String spiritLevel ="584"; //spiritLevel
	/**
	 * 坐骑数据
	 */
	public static String rideInfo ="585"; //rideInfo
	/**
	 * 翅膀数据
	 */
	public static String wingInfo ="586"; //wingInfo
	/**
	 * 神兵数据
	 */
	public static String magicArm ="587"; //magicArm
	/**
	 * 麒麟臂数据
	 */
	public static String unicornArmInfo ="588"; //unicornArmInfo
	/**
	 * 经脉信息
	 */
	public static String nadis ="589"; //nadis
	/**
	 * 经脉
	 */
	public static String meridian ="590"; //meridian
	/**
	 * 美人数据
	 */
	public static String goddessData="591"; //goddessData
	/**
	 * 玄兵数据
	 */
	public static String xbInfo ="592"; //xbInfo
	/**
	 * 佩戴的神兵id
	 */
	public static String wearMagicId ="593"; //wearMagicId
	/**
	 * 熔炉
	 */
	public static String ronglu ="594"; //ronglu
	/**
	 * 飞行坐骑
	 */
	public static String flyRide="595"; //flyRide
	/**
	 * 技能
	 */
	public static String skill ="596"; //skill
	/**
	 * 侠客招募状态
	 */
	public static String hire ="597"; //hire
	/**
	 * 侠客id
	 */
	public static String gid ="598"; //gid
	
	/**
	 * 宠物装备
	 */
	public static String equip ="599"; //equip
	/**
	 * 侠客列表
	 */
	public static String genList ="600"; //genList
	/**
	 * 时装id
	 */
	public static String fashionId ="601"; //fashionId
	/**
	 * 时装淬炼等级
	 */
	public static String fashionLevel ="602"; //fashionLevel
	/**
	 * 时装的当前染色
	 */
	public static String fashionColor ="603"; //fashionColor
	/**
	 * 时装染色数
	 */
	public static String colourNum ="604"; //colourNum
	/**
	 * 侠侣
	 */
	public static String xialv ="605"; //xialv
	/**
	 * hp
	 */
	public static String hp="606"; //hp
	/**
	 * hpmax
	 */
	public static String hpmax="607"; //hpmax
	/**
	 * 音乐
	 */
	public static String isMusic ="608"; //isMusic
	/**
	 * 自动任务
	 */
	public static String autoTask ="609"; //autoTask
	
	/**
	 * 阵营1攻方2守方
	 */
	public static String campType ="610"; //campType
	/**
	 * 守护状态0无守护1有守护
	 */
	public static String defend ="611"; //defendnot found:pet
	/**
	 * 系统id
	 */
	public static String sid ="612"; //sid
	/**
	 * 帮会贡献
	 */
	public static String totalContribute ="613"; //totalContribute
	/**
	 * 特殊身份
	 */
//	public static String specialType ="614"; //specialType
	/**
	 * 玩家id
	 */
//	public static String heroId ="615"; //heroId
	/**
	 * 洗练属性数据
	 */
	public static String exAtt ="616"; //exAtt
	/**
	 * 洗练出来的新属性数据
	 */
	public static String exAttNew ="617"; //exAttNew
	/**
	 * 强化等级
	 */
	public static String slv ="618"; //slv
	/**
	 * 宠物装备特殊属性
	 */
	public static String petExAtt ="619"; //petExAtt
	/**
	 * 绑定状态
	 */
	public static String bind ="621"; //bind
	/**
	 * 宠物装备的鉴定状态
	 */
	public static String identifyState ="620"; //identifyState
	/**
	 * 扑克属性
	 */
//	public static String pokerAtt ="622"; //pokerAtt
	/**
	 * 刷新出来的扑克属性
	 */
//	public static String pokerAttNew ="623"; //pokerAttNew
	/**
	 * 到期时间
	 */
	public static String time ="624"; //time
	/**
	 * 品质
	 */
//	public static String qa ="625"; //qa
	/**
	 * 方向
	 */
	public static String dir ="626"; //dir
	/**
	 * 比武大会 武林盟主状态 0为普通1为盟主
	 */
	public static String biwuKing = "627";//biwuKing
	
	/**
	 * 侠魂模型
	 */
	public static String xiaHun ="628"; //xiaHun
	
	/**
	 * 是否新手
	 */
	public static String isNew = "isNew";
	/**
	 * 帮会类型0没帮会1系统帮会2玩家帮会
	 */
	public static String gangType = "gangType";
	
	/**
	 * 自己婚姻状态 1夫君2妻子
	 */
	public static String marryState = "marryState";
	
	/**
	 * x
	 */
//	public static String gX="gX";2017年1月4日 星期三屏蔽
	/**
	 * y
	 */
//	public static String gY="gY";2017年1月4日 星期三屏蔽
	/**
	 * 坐骑模型
	 */
//	public static String horse="horse";2017年1月4日 星期三 改成ride
	/**
	 * 强化套装特效
	 */
//	public static String eff = "eff";2017年1月4日 星期三屏蔽
	
	

	/**移速 数值类型**/
	public static int V_SPEED = 116;
	/**等级**/
	public static int LEVEL = 12;
	
	public static void main(String[] args) throws Exception {
//		List<String> a = get("c:\\const.txt");
//		List<String> b = get("c:\\HeroXData.java");
//		System.err.println("---------client--------");
//		for(String aw:a){
//			if(!b.contains(aw)){
//				System.err.println(aw);
//			}
//		}
//		System.err.println("---------server--------");
//		for(String bw:b){
//			if(!a.contains(bw)){
//				System.err.println(bw);
//			}
//		}
		replace("c:\\枚举.txt","c:\\HeroXData.java");
	}
	public static List<String> get(String args) throws Exception {
		List<String> list = new ArrayList<String>();
		BufferedReader reader  = new BufferedReader(new InputStreamReader(new FileInputStream(args)));
		String content = null;
		Pattern pattern = Pattern.compile("[\'\"][\\S]+[\"\']");
		while((content = reader.readLine())!=null){
//			System.err.println(content);
			Matcher matcher = pattern.matcher(content);
			if(matcher.find()){
				String group = matcher.group();
				String substring = group.substring(1, group.length()-1);
				System.err.println(substring);
				list.add(substring);
			}
		}
		reader.close();
		return list;
	}
	public static void replace(String client,String server) throws Exception {
		Map<String,Integer> map = new HashMap<String, Integer>();
		BufferedReader reader  = new BufferedReader(new InputStreamReader(new FileInputStream(client)));
		String content = null;
		Pattern pattern = Pattern.compile("[\'\"][\\S]+[\"\']");
		Pattern p2 = Pattern.compile("[0-9]+");
		int ccount = 0;
		while((content = reader.readLine())!=null){
//			System.err.println(content);
			Matcher matcher = pattern.matcher(content);
			if(matcher.find()){
				String group = matcher.group();
				String substring = group.substring(1, group.length()-1);
				Matcher m2 = p2.matcher(content);
				if(m2.find()){
					String num = m2.group();
//					System.err.println(substring+"=>"+num);
					map.put(substring,Integer.parseInt(num));
					ccount++;
				}
			}
		}
		
		reader.close();
		List<String> list = new ArrayList<String>();
		BufferedReader rs  = new BufferedReader(new InputStreamReader(new FileInputStream(server)));
		content = null;
		int scount = 0;
		Pattern ps = Pattern.compile("[\'\"][\\S]+[\"\']");
		while((content = rs.readLine())!=null){
//			System.err.println(content);
			Matcher matcher = ps.matcher(content);
			if(matcher.find()){
				String group = matcher.group();
				String substring = group.substring(1, group.length()-1);
				list.add(substring);
				Integer num = map.get(substring);
				if(num==null){
					System.out.println(content);
				}else{
					String front = content.substring(0, content.indexOf("=")+1);
					String newStr = front + "\""+num + "\";"+" //"+substring;
					System.out.println(newStr);
					scount++;
				}
			}else{
				System.out.println(content);
			}
		}
		rs.close();
		System.out.println("ccount:"+ccount+",scount:"+scount);
		for(String k:map.keySet()){
			if(!list.contains(k)){
				System.err.println("not found:"+k);
			}
		}
	}
}
