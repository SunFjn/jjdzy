package com.teamtop.system.chat;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.teamtop.cross.CrossZone;
import com.teamtop.houtaiHttp.events.whiteList.WhiteListIO;
import com.teamtop.system.account.Account;
import com.teamtop.system.alarmSystem.AlarmConst;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

public class ChatEvent extends AbsSystemEvent{
	private static ChatEvent ins;
	
	public static ChatEvent getIns(){
		if(ins == null){
			ins = new ChatEvent();
		}
		return ins;
	}
	@Override
	public void init(Hero hero) {
		Chat chat = hero.getChat();
		if(chat==null){
			chat = new Chat();
			chat.setHid(hero.getId());
			hero.setChat(chat);
		}
		List<Long> siLiaoRenShu=hero.getChat().getSiLiaoRenShu();
		if (siLiaoRenShu==null) {
			siLiaoRenShu=new ArrayList<Long>();
			hero.getChat().setSiLiaoRenShu(siLiaoRenShu);
		}
		HashMap<Long,String> blackMap=hero.getChat().getBlackMap();
		if (blackMap==null) {
			blackMap=new HashMap<Long,String>();
			hero.getChat().setBlackMap(blackMap);
		}
		HashMap<Long,String> inOthBlackMap = chat.getInOthBlackMap();
		if( inOthBlackMap==null){
			inOthBlackMap = new HashMap<>();
			chat.setInOthBlackMap( inOthBlackMap);
		}
	}

	@Override
	public void login(Hero hero) {
		if(hero.getIllegalState()==ChatConst.STATE_ILLEGAL_JIN_YAN){
			if(TimeDateUtil.getCurrentTime()<hero.getIllegalTimeout()){
				//发送前端提示
				ChatSender.sendCmd_454(hero.getId(), 1);
			}
		}else if(hero.getIllegalState()==ChatConst.STATE_ILLEGAL_JIN_OTHER){
			if(TimeDateUtil.getCurrentTime()<hero.getIllegalTimeout()){
				//发送前端提示
				ChatSender.sendCmd_454(hero.getId(), 2);
			}
		}
		int type=ChatConst.CROSS;
		if(!TimeDateUtil.serverOpenOverDays(7)){
			type=ChatConst.LOCAL;
		}
		ChatManager.getIns().openUI(hero, type);//避免第一次打开覆盖了跨服组队信息
		//ChatManager.getIns().loginToTwo(hero);
		ChatSender.sendCmd_480(hero.getId(),hero.getChat().getLocalCiShu(),hero.getChat().getLocalCiShu(),hero.getChat().getLocalCiShu());
		//同步一次白名单
		WhiteListIO.getIns().checkWhiteList(hero.getOpenid(), hero.getZoneid());
		Account account =hero.getTempData().getAccount();
		LogTool.info("account Ismarket"+account.getIsmarket(), ChatEvent.class);
	}

	@Override
	public void loginReset(Hero hero,int now) {
		zeroHero(hero, now);
	}
	
	@Override
	public void zeroHero(Hero hero, int now) {
		try {
			hero.getChat().setCrossCiShu(0);
			hero.getChat().setCountryCiShu(0);
			hero.getChat().setLocalCiShu(0);
			hero.getChat().getSiLiaoRenShu().clear();
			ChatSender.sendCmd_480(hero.getId(), 0, 0, 0);
		} catch (Exception e) {
			LogTool.error(e,this);
		}
	}

	@Override
	public void levelUp(Hero hero,int newLv,int oldLv){
		ChatManager.getIns().loginToTwo(hero);
	}
	
	/**
	 * 登出时，用于处理逻辑执行
	 * @param hero hero
	 */
	@Override
	public void logout(Hero hero){
		
	}
	
	@Override
	public void fixTime(int cmdId, int now) {
		if(CrossZone.isCrossServer()) {
			return;
		}
		if(cmdId==1) {
			AlarmConst.COIN_DAILY_MAX = 30L * 100000000L;
			AlarmConst.COIN_DAILY_ONCE = 3L * 100000000;
			int currentTime = TimeDateUtil.getCurrentTime();
			if(ChatCache.WARN_NOTICE_TIME==0) {
				ChatCache.WARN_NOTICE_TIME = currentTime - TimeDateUtil.ONE_HOUR_INT + 300;
			} else {
				int passTime = currentTime - ChatCache.WARN_NOTICE_TIME;
				if (passTime >= TimeDateUtil.ONE_HOUR_INT) {
					ChatCache.WARN_NOTICE_TIME = currentTime;
					// 发送警告提醒
					ChatManager.getIns().broadCast(ChatConst.WARN_NITICE, null);
				}
			}
		}
	}

}
