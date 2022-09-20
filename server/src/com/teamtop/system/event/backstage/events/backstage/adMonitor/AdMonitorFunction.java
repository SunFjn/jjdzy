package com.teamtop.system.event.backstage.events.backstage.adMonitor;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.houtaiHttp.request.ChatMonitoring;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_minganzi_100;
import excel.struct.Struct_minganzi_100;

/**
 * 广告监控方法类
 * @author hepl
 *
 */
public class AdMonitorFunction {

	private static AdMonitorFunction ins = null;
	
	public static AdMonitorFunction getIns(){
		if(ins == null){
			ins = new AdMonitorFunction();
		}
		return ins;
	}
	private static int checkSameNum = 3;
	private static Logger logger = LoggerFactory.getLogger(AdMonitorFunction.class);
	/**
	 * 开服前2日 上传所有玩家的聊天
	 */
	public void openTwoDays(Hero hero,String content, int chatType) {
		try {
			if (TimeDateUtil.betweenOpen()>2) {
				//聊天内容的广告监控
				AdMonitorFunction.getIns().checkAdKeyword(hero, content, chatType);
				return;
			}
			int channel=0;
			//channel '1'=>'子服世界', '2'=>'帮会', '4'=>'私聊', '5'=>'跨服世界
			if (chatType==ChatConst.CROSS) {
				channel=5;
			}else if (chatType==ChatConst.LOCAL) {
				channel=1;
			}else if (chatType==ChatConst.COUNTRY) {
				channel=2;
			}
			//chatType =1  chatState =0
			ChatMonitoring.monitoring(hero, 1, 0, channel, content);
		} catch (Exception e) {
			LogTool.error(e, AdMonitorFunction.class, "openTwoDays has wrong");
		}
	
	}
	
	
	/**
	 * 监控聊天的广告关键字
	 * @param hero
	 * @param content 聊天内容
	 * @param chatType 聊天频道
	 */
	public void checkAdKeyword(Hero hero, String content, int chatType){
		try {
			//聊天频道判断：跨服,本地、国家、
			if(chatType==ChatConst.CROSS || chatType==ChatConst.LOCAL || chatType==ChatConst.COUNTRY){
				if (content == null) {
					return;
				}
				if(hero.getAdState() == AdMonitorConst.STATE_0){
					//特殊处理，装备与道具链接不验证，"<1<"或"<2<"，道具和装备系统id都是8位数字
					String checkContent = content.replaceAll("<(1|2)<\\d{8}<\\d+<.*<", "");
					String guanjianzi = null;
					int score = 0;
					int count = 0;
					List<Struct_minganzi_100> list = Config_minganzi_100.getIns().getSortList();
					for(Struct_minganzi_100 excel : list){
						guanjianzi = excel.getGuanjianzi();
						count = subCounter(checkContent, guanjianzi);
						if(count > 0){
							score += excel.getPingfen() * count;
							if(score >= AdMonitorConst.SCORE_CHECK){
								hero.setAdState(AdMonitorConst.STATE_1);
								hero.setAdMonitorType(AdMonitorConst.STATE_1);
								int channel=0;
								//channel '1'=>'子服世界', '2'=>'帮会', '4'=>'私聊', '5'=>'跨服世界
								if (chatType==ChatConst.CROSS) {
									channel=5;
								}else if (chatType==ChatConst.LOCAL) {
									channel=1;
								}else if (chatType==ChatConst.COUNTRY) {
									channel=2;
								}
								ChatMonitoring.monitoring(hero, AdMonitorConst.STATE_1, 1, channel, content);
								break;
							}
						}
					}
				}else if(hero.getAdState() >= AdMonitorConst.STATE_1) {
					int channel=0;
					//channel '1'=>'子服世界', '2'=>'帮会', '4'=>'私聊', '5'=>'跨服世界
					if (chatType==ChatConst.CROSS) {
						channel=5;
					}else if (chatType==ChatConst.LOCAL) {
						channel=1;
					}else if (chatType==ChatConst.COUNTRY) {
						channel=2;
					}
					ChatMonitoring.monitoring(hero, hero.getAdState(), 1, channel, content);
				}
				//checkContinue(hero, content);
			}
		} catch (Exception e) {
			logger.error(LogTool.exception(e, hero.getId(), "checkAdKeyword error!"));
		}
	}
	public void checkContinue(Hero hero,String msg){
		if(msg != null && hero.getAdState() == AdMonitorConst.STATE_0){
			//	连续发送3条同样内容的聊天信息
			//	连续发送3条有连续8个字体一样的聊天内容
			List<String> talkings = hero.getTempVariables().getTalkings();
			if(talkings==null){
				talkings = new ArrayList<String>();
				hero.getTempVariables().setTalkings(talkings);
			}
			talkings.add(msg);
			if(talkings.size()>3){
				talkings.remove(0);
			}
			if(talkings.size()<checkSameNum) return;
			int samenum = checkOneBodyTalk(talkings);
			if(samenum==checkSameNum){
				hero.setAdState(AdMonitorConst.STATE_3);
				hero.setAdMonitorType(AdMonitorConst.STATE_3);
			}
		}
	}
	/**
	 * 判断玩家五句话里，相同的语句的次数
	 * @param talkStrings
	 * @return
	 */
	public int checkOneBodyTalk(List<String> talkStrings){
		String stringA=null;
		String stringB=null;
		int sameNum=0;
		for (int i = 0; i < checkSameNum; i++) {
			switch (i) {
			case 0:
				stringA=talkStrings.get(0);
				for (int j = 1; j < checkSameNum; j++) {
					stringB=talkStrings.get(j);
					if (checkString(stringA, stringB)) {
						sameNum++;
					}
				}
				break;
            case 1:
            	stringA=talkStrings.get(1);
				for (int j = 2; j < checkSameNum; j++) {
					stringB=talkStrings.get(j);
					if (checkString(stringA, stringB)) {
						sameNum++;
					}
				}
				break;
			default:
				break;
			}
		}
		return sameNum;
		
	}
	/**
	 * 判断两句话是否相似
	 * @param stringsA
	 * @param stringsB
	 * @return
	 */
	public boolean checkString(final String stringsA,final String stringsB){
		int lent1=stringsA.length();
		int lent2=stringsB.length();
		int lent=lent1;
		if (lent1>lent2) {
			lent=lent2;
		}
		int sameNum=0;
		for (int i = 0; i < lent; i++) {
			if (stringsA.charAt(i)==stringsB.charAt(i)) {
				sameNum++;
			}
		}
		if (sameNum>=lent && sameNum>=10) {
			return true;
		}else {
			return false;
		}
	}
	/**
	 * 统计匹配字符串出现的个数
	 * @param oriStr 原字符串
	 * @param matchStr 匹配字符串
	 * @return 匹配个数
	 */
	private int subCounter(String oriStr, String matchStr){
		int count = 0;
		if(oriStr.length() >= matchStr.length()){
			for(int i=0; i<=oriStr.length()-matchStr.length(); i++){
				if(oriStr.substring(i, i+matchStr.length()).equals(matchStr)){
					count++;
				}
			}
		}
		return count;
	}
	
	/**
	 * 监控私聊频率
	 * @param hero 私聊发起者
	 * @param talkHid 私聊对象
	 *//*
	public void checkAdSecretTalk(Hero hero, long talkHid){
		try {
			//判断是否广告号与可疑人
			if(hero.getAdState() != AdMonitorConst.STATE_0){
				return;
			}
			int now = TimeDateUtil.getCurrentTime();
			long hid = hero.getId();
			ConcurrentHashMap<Long, List<AdMonitorSecretTalk>> secretTalkCache = AdMonitorCache.getSecretTalkCache();
			if(secretTalkCache.containsKey(hid)){
				//在监控缓存里
				List<AdMonitorSecretTalk> list = secretTalkCache.get(hid);
				synchronized (list) {
					AdMonitorSecretTalk talk = new AdMonitorSecretTalk();
					talk.setHid(talkHid);
					talk.setLastTime(now);
					list.remove(talk);
					list.add(talk);
					if(list.size() > AdMonitorConst.SECRET_TALK_NUM_20){
						for(int i=list.size(); i>AdMonitorConst.SECRET_TALK_NUM_20; i--){
							list.remove(0);
						}
					}
					//判断频率
					int size = list.size();
					if(size >= AdMonitorConst.SECRET_TALK_NUM_20){
						if(list.get(size-1).getLastTime() - list.get(size-AdMonitorConst.SECRET_TALK_NUM_20).getLastTime() <= AdMonitorConst.SECRET_TALK_TIME_30){
							//30分钟内私聊20人
							hero.setAdState(AdMonitorConst.STATE_2);
							hero.setAdMonitorType(AdMonitorConst.STATE_2);
							secretTalkCache.remove(hid);
							return;
						}else if(list.get(size-1).getLastTime() - list.get(size-AdMonitorConst.SECRET_TALK_NUM_15).getLastTime() <= AdMonitorConst.SECRET_TALK_TIME_10){
							//10分钟内私聊15人
							hero.setAdState(AdMonitorConst.STATE_2);
							hero.setAdMonitorType(AdMonitorConst.STATE_2);
							secretTalkCache.remove(hid);
							return;
						}else if(list.get(size-1).getLastTime() - list.get(size-AdMonitorConst.SECRET_TALK_NUM_10).getLastTime() <= AdMonitorConst.SECRET_TALK_TIME_5){
							//5分钟内私聊10人
							hero.setAdState(AdMonitorConst.STATE_2);
							hero.setAdMonitorType(AdMonitorConst.STATE_2);
							secretTalkCache.remove(hid);
							return;
						}else if(list.get(size-1).getLastTime() - list.get(size-AdMonitorConst.SECRET_TALK_NUM_5).getLastTime() <= AdMonitorConst.SECRET_TALK_TIME_3){
							//3分钟内私聊5人
							hero.setAdState(AdMonitorConst.STATE_2);
							hero.setAdMonitorType(AdMonitorConst.STATE_2);
							secretTalkCache.remove(hid);
							return;
						}
					}else if(size >= AdMonitorConst.SECRET_TALK_NUM_15){
						if(list.get(size-1).getLastTime() - list.get(size-AdMonitorConst.SECRET_TALK_NUM_15).getLastTime() <= AdMonitorConst.SECRET_TALK_TIME_10){
							//10分钟内私聊15人
							hero.setAdState(AdMonitorConst.STATE_2);
							hero.setAdMonitorType(AdMonitorConst.STATE_2);
							secretTalkCache.remove(hid);
							return;
						}else if(list.get(size-1).getLastTime() - list.get(size-AdMonitorConst.SECRET_TALK_NUM_10).getLastTime() <= AdMonitorConst.SECRET_TALK_TIME_5){
							//5分钟内私聊10人
							hero.setAdState(AdMonitorConst.STATE_2);
							hero.setAdMonitorType(AdMonitorConst.STATE_2);
							secretTalkCache.remove(hid);
							return;
						}else if(list.get(size-1).getLastTime() - list.get(size-AdMonitorConst.SECRET_TALK_NUM_5).getLastTime() <= AdMonitorConst.SECRET_TALK_TIME_3){
							//3分钟内私聊5人
							hero.setAdState(AdMonitorConst.STATE_2);
							hero.setAdMonitorType(AdMonitorConst.STATE_2);
							secretTalkCache.remove(hid);
							return;
						}
					}else if(size >= AdMonitorConst.SECRET_TALK_NUM_10){
						if(list.get(size-1).getLastTime() - list.get(size-AdMonitorConst.SECRET_TALK_NUM_10).getLastTime() <= AdMonitorConst.SECRET_TALK_TIME_5){
							//5分钟内私聊10人
							hero.setAdState(AdMonitorConst.STATE_2);
							hero.setAdMonitorType(AdMonitorConst.STATE_2);
							secretTalkCache.remove(hid);
							return;
						}else if(list.get(size-1).getLastTime() - list.get(size-AdMonitorConst.SECRET_TALK_NUM_5).getLastTime() <= AdMonitorConst.SECRET_TALK_TIME_3){
							//3分钟内私聊5人
							hero.setAdState(AdMonitorConst.STATE_2);
							hero.setAdMonitorType(AdMonitorConst.STATE_2);
							secretTalkCache.remove(hid);
							return;
						}
					}else if(size >= AdMonitorConst.SECRET_TALK_NUM_5){
						if(list.get(size-1).getLastTime() - list.get(size-AdMonitorConst.SECRET_TALK_NUM_5).getLastTime() <= AdMonitorConst.SECRET_TALK_TIME_3){
							//3分钟内私聊5人
							hero.setAdState(AdMonitorConst.STATE_2);
							hero.setAdMonitorType(AdMonitorConst.STATE_2);
							secretTalkCache.remove(hid);
							return;
						}
					}
				}
			}else {
				//不在监控缓存里
				List<AdMonitorSecretTalk> list = new ArrayList<AdMonitorSecretTalk>();
				AdMonitorSecretTalk talk = new AdMonitorSecretTalk();
				talk.setHid(talkHid);
				talk.setLastTime(now);
				list.add(talk);
				secretTalkCache.put(hid, list);
			}
		} catch (Exception e) {
			logger.error(LogTool.exception(e, hero.getId(), "checkAdSecretTalk error! talkHid:"+talkHid));
		}
	}
	
	*//**
	 * 登录时检查注册ip是否是可疑ip，是则标记为广告号
	 * PS：取消该需求
	 * @param hero
	 *//*
	public void checkAdIp(Hero hero){
		try {
			if(hero.getAdState() == AdMonitorConst.STATE_4){
				return;
			}
			List<String> ipCache = AdMonitorCache.getAdMonitorIPCache();
			if(ipCache.contains(hero.getCreateIp())){
				//注册ip是可疑ip，则标记为广告号
				int adState = AdMonitorConst.STATE_4;
				int time = TimeDateUtil.ONE_DAY_INT * 365 * 20;
				int currentTime = TimeDateUtil.getCurrentTime();
				int timeout = currentTime + time;
				int illegalState = ChatConst.STATE_ILLEGAL_JIN_OTHER;
				int illegalReason = 5;
				
				hero.setAdState(adState);
				hero.setAdMonitorType(AdMonitorConst.STATE_1);
				//标记为禁言只能看到自己说话
				hero.setIllegalState(illegalState);
				hero.setIllegalTimeout(timeout);
				hero.setIllegalReason(illegalReason);//原因为其他
				
				//记录该角色的账号到全服，标记全服的角色都为广告号
				AdMonitorIO.getIns().setAdAccount(hero.getOpenid(), 1, hero.getZoneid());
			}
		} catch (Exception e) {
			logger.error(LogTool.exception(e, hero.getId(), "checkAdIp error!"));
		}
	}*/
}
