package com.teamtop.system.redBox;


import java.util.HashMap;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.redBox.cross.RedBoxCross;
import com.teamtop.system.redBox.cross.RedBoxGeter;
import com.teamtop.util.illiegalUtil.IlliegalUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_xtcs_004;
import excel.struct.Struct_xtcs_004;

public class RedBoxManager  {
	
	private static volatile RedBoxManager ins = null;
	public static RedBoxManager getIns() {
		if (ins == null) {
			synchronized (RedBoxManager.class) {
				if (ins == null) {
					ins = new RedBoxManager();
				}
			}
		}
		return ins;
	}

	
	public void openUI(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.REDBOX)) {
				return ;
			}
			RedBox redBox = hero.getRedBox();
			//
			Object[] redBoxs=null;
			int size = RedBoxLocalCache.getRedBoxMap().size();
			if (size>0) {
				redBoxs=new Object[size];
				int i=0;
				for (RedBoxCross redboxCross: RedBoxLocalCache.getRedBoxMap().values()) {
					HashMap<Long, RedBoxGeter> redBoxGetInfo = redboxCross.getRedBoxGetInfo();
					int size2 = redBoxGetInfo.size();
					int meGetNum=0;
					if (redBoxGetInfo.containsKey(hero.getId())) {
						RedBoxGeter redBoxGeter = redBoxGetInfo.get(hero.getId());
						meGetNum=redBoxGeter.getGetnum();
					}
					redBoxs[i]=new Object[] {redboxCross.getBoxid(),redboxCross.getName(),
							redboxCross.getBoxname(),redboxCross.getIcon(),redboxCross.getFrame(),
							size2,meGetNum,redboxCross.getMaxNum()};
					i++;
				}
			}
			Struct_xtcs_004 struct_xtcs_004DayNum = Config_xtcs_004.getIns().get(RedBoxConst.DAX_NUM);
			int dayMaxNum=struct_xtcs_004DayNum.getNum();
			RedBoxSender.sendCmd_11760(hero.getId(), redBox.getGoldYuanBao(), dayMaxNum-redBox.getSendNum(), redBoxs);
		} catch (Exception e) {
			LogTool.error(e, RedBoxManager.class, "openUI has wrong");
		}
		
	}
	
	public void lookinfos(Hero hero, long boxid) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.REDBOX)) {
				return ;
			}
			RedBoxCross redBoxCross = RedBoxLocalCache.getRedBoxMap().get(boxid);
			if (redBoxCross!=null) {
				HashMap<Long, RedBoxGeter> redBoxGetInfo = redBoxCross.getRedBoxGetInfo();
				Object[] infos=null;
				int size = redBoxGetInfo.size();
				if (size>0) {
					infos=new Object[size];
					int i=0;
					for (RedBoxGeter redBoxGeter:redBoxGetInfo.values()) {
						int isme=0;
						if (redBoxGeter.getHid()==hero.getId()) {
							isme=1;
						}
						infos[i]=new Object[] {redBoxGeter.getName(),redBoxGeter.getGetnum(),isme};
						i++;
					}
				}
				RedBoxSender.sendCmd_11762(hero.getId(), infos);
			}
			
		} catch (Exception e) {
			LogTool.error(e, RedBoxManager.class, "openUI has wrong");
		}
		
	}
	/**
	 * 发红包
	 * @param hero
	 * @param fanum
	 * @param boxname
	 */
	public void faBoxs(Hero hero, long fanum, String boxname) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.REDBOX)) {
				return ;
			}
			int currentTime = TimeDateUtil.getCurrentTime();
			int todayZero = TimeDateUtil.getTodayZeroTimeReturnInt();
			int tomorrowZero = TimeDateUtil.getTomorrowZeroTimeReturnInt();
			int MaxTime=todayZero+23*3600+50*60;
			if (currentTime>=todayZero&&currentTime<=todayZero+RedBoxConst.NO_FATIME) {
				RedBoxSender.sendCmd_11764(hero.getId(), 5);
				return;
			}
			
			if (currentTime>=MaxTime&&currentTime<=tomorrowZero) {
				RedBoxSender.sendCmd_11764(hero.getId(), 5);
				return;
			}
			//取证
			fanum=(long) Math.ceil(fanum);
			/*if (fanum%100!=0) {
				//不能被100整除
				LogTool.warn(hero.getId()+" hid :fanum"+fanum, RedBoxManager.class);
				return;
			}*/
			Struct_xtcs_004 struct_xtcs_004 = Config_xtcs_004.getIns().get(RedBoxConst.MIN);
			int min=struct_xtcs_004.getNum();
			
			Struct_xtcs_004 struct_xtcs_004Max = Config_xtcs_004.getIns().get(RedBoxConst.MAX);
			int max=struct_xtcs_004Max.getNum();
			
			if (fanum<min) {
				return;
			}
			
			if (fanum>max) {
				return;
			}
			if (boxname==null) {
				return;
			}
			if (boxname.length()>18) {
				RedBoxSender.sendCmd_11764(hero.getId(), 4);
				return;
			}
			/*if(!IlliegalUtil.isWarnNameIll(boxname,18)){
				LogTool.warn("boxname:"+boxname+", is illegal!!",this);
				RedBoxSender.sendCmd_11764(hero.getId(), 3);
				return;
			}*/
			
			//敏感字
			String mingan = IlliegalUtil.isMingan(boxname,1);
			if(mingan!=null){
				boxname = mingan;
			}
			
			Struct_xtcs_004 struct_xtcs_004DayNum = Config_xtcs_004.getIns().get(RedBoxConst.DAX_NUM);
			int dayMaxNum=struct_xtcs_004DayNum.getNum();
			
			RedBox redBox = hero.getRedBox();
			if (redBox.getSendNum()>=dayMaxNum) {
				RedBoxSender.sendCmd_11764(hero.getId(), 1);
				return;
			}
			if (UseAddUtil.canUse(hero, GameConst.GOLDYUANBAO_COIN, (int)fanum)) {
				//
				RedBoxCrossIO.getIns().LTCfaRedBox(hero,(int)fanum,boxname,redBox);
			}else {
				RedBoxSender.sendCmd_11764(hero.getId(), 2);
				return;
			}
		} catch (Exception e) {
			LogTool.error(e, RedBoxManager.class, "faBoxs has wrong");
		}
		
	}
	/**
	 * 领红包
	 * @param hero
	 * @param boxid
	 */
	public void getBox(Hero hero, long boxid) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.REDBOX)) {
				return ;
			}
			RedBoxCross redBoxCross = RedBoxLocalCache.getRedBoxMap().get(boxid);
			if (redBoxCross==null) {
				LogTool.warn("redBoxCross==null boxid:"+boxid, RedBoxManager.class);
				RedBoxSender.sendCmd_11766(hero.getId(), 2, 0);
				return;
			}
			HashMap<Long, RedBoxGeter> redBoxGetInfo = redBoxCross.getRedBoxGetInfo();
			if (redBoxGetInfo.size()>=RedBoxConst.QIANG_NUM) {
				RedBoxSender.sendCmd_11766(hero.getId(), 1, 0);
				return;
			}
			if (redBoxGetInfo.containsKey(hero.getId())) {
				RedBoxSender.sendCmd_11766(hero.getId(), 3, 0);
				return;
			}
			RedBoxCrossIO.getIns().LTCGetBox(hero,boxid);
		} catch (Exception e) {
			LogTool.error(e, RedBoxManager.class, "getBox has wrong");
		}
		
	}

	

}
