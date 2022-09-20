package com.teamtop.netty.firewall.sytstemWatch;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.system.event.backstage.AbsBackstageEvent;
import com.teamtop.system.event.backstage.events.backstage.BackstageConst;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.mail.QQMailCache;
import com.teamtop.util.mail.QQMailEnum;
import com.teamtop.util.time.TimeDateUtil;

public class SystemWatchEvent extends AbsBackstageEvent{
	private static SystemWatchEvent ins = null;

	public static SystemWatchEvent getIns() {
		if (ins == null) {
			ins = new SystemWatchEvent();
		}
		return ins;
	}

	private Logger logger = LoggerFactory.getLogger(SystemWatchEvent.class);
	
	@Override
	public void executeOneHour(int currTime) {
		ConcurrentHashMap<Long, Map<Integer, MailWatch>> mails = SystemWatchCache.getMails();
		Iterator<Long> it = mails.keySet().iterator();
		while(it.hasNext()){
			Long hid = it.next();
			if(!HeroFunction.getIns().isOnline(hid)){
				it.remove();
			}
		}
	}

	
	/**
	 * 检查邮件
	 * @param mail
	 */
	/*public void checkMail(Mail mail){
		try {
			ConcurrentHashMap<Long, Map<Integer, MailWatch>> mails = SystemWatchCache.getMails();
			long hid = mail.getReceiverId();
			Map<Integer, MailWatch> map = mails.get(hid);
			if(map==null){
				map = new HashMap<Integer, MailWatch>();
				mails.put(hid, map);
			}
			int sysid = mail.getFlag();
			Hero hero = HeroCache.getHero(hid);
			MailWatch mailWatch = map.get(sysid);
			if(mailWatch==null){
				mailWatch = new MailWatch(hid,mail.getFlag(),mail.getTitle(),TimeDateUtil.getCurrentTime()); 
				mailWatch.setTimes(new ArrayList<Integer>());
				if(hero!=null){
					mailWatch.setName(hero.getNameZoneid());
				}
				map.put(sysid, mailWatch);
			}
			List<Integer> times = mailWatch.getTimes();
			int now = TimeDateUtil.getCurrentTime();
			times.add(now);
			int size = times.size();
			int max = 10;
			int time = 2;
			MailWatchRule mailRule = SystemWatchCache.getMailRule(sysid);
			if(mailRule!=null){
				max = mailRule.getMax();
				time = mailRule.getTime();
			}else{
				if(hero!=null){
					if(hero.getTempVariables().isLoginEnterScene()){
						int loginTime = hero.getLoginTime();
						int logoutTime = hero.getLogoutTime();
						int leftdays = (loginTime - logoutTime)/TimeDateUtil.ONE_DAY_INT;
						if(leftdays>=2){
							max = 8 + leftdays;
						}
					}
				}
			}
			if(size>=max){
				int compare = times.get(size-1) - times.get(0);
				if(compare<time){
					//违规
					mailWatch.setTime(now);
					QQMailCache.sendWarn(QQMailEnum.MAIL,mailWatch.toString());
					try {
						AutoObjTableDao.getIns().insert(mailWatch, CommonUtil.getZoneIdById(hid));
					} catch (SQLException e) {
						LogTool.error(e,this);
					}
				}
				times.clear();
			}
		} catch (Exception e) {
			LogTool.error(e,this);
		}
		
	}*/
	
	public void checkLogout(long hid,int reason){
		try {
			ConcurrentHashMap<Long, LoginoutWatch> logouts = SystemWatchCache.getLogouts();
			LoginoutWatch loginoutWatch = logouts.get(hid);
			if(loginoutWatch==null){
				loginoutWatch = new LoginoutWatch();
				loginoutWatch.setHid(hid);
				Hero hero = HeroCache.getHero(hid);
				if(hero!=null){
					loginoutWatch.setName(hero.getNameZoneid());
				}
				loginoutWatch.setLogoutTimes(new ArrayList<int[]>());
				logouts.put(hid, loginoutWatch);
			}
			
			List<int[]> logoutTimes = loginoutWatch.getLogoutTimes();
			int now = TimeDateUtil.getCurrentTime();
			logoutTimes.add(new int[]{now,reason});
			
			int size = logoutTimes.size();
			int max = 10;
			if(size>=max){
				int replaceCount = 0;
				for(int[] arr:logoutTimes){
					if(arr[1]==BackstageConst.M_LOGINOUT_OPER_FORCE_OFFLINE){
						replaceCount++;
					}
				}
				int compare = logoutTimes.get(size-1)[0] - logoutTimes.get(0)[0];
				
				if(compare < 600 || replaceCount / max>=0.8){
					loginoutWatch.setTime(now);
					//需要警告
					QQMailCache.sendWarn(QQMailEnum.LOGOUT,"name:"+loginoutWatch.getName()+",hid:"+hid+" logout too much");
					try {
//						AutoObjTableDao.getIns().insert(loginoutWatch, CommonUtil.getZoneIdById(hid));
					} catch (Exception e) {
						LogTool.error(e,this);
					}
				}
				logoutTimes.clear();
			}
		} catch (Exception e) {
			LogTool.error(e,this);
		}
	}
}
