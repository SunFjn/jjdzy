package com.teamtop.system.activity.ativitys.godGenSendGiftAct.cross;

import java.util.Iterator;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.cross.CrossCache;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import io.netty.channel.Channel;

public class CrossGodGenSendGiftActEvent extends AbsSystemEvent {

	private static CrossGodGenSendGiftActEvent ins;

	private CrossGodGenSendGiftActEvent() {
		// TODO Auto-generated constructor stub
	}

	public static CrossGodGenSendGiftActEvent getIns() {
		if (ins == null) {
			ins = new CrossGodGenSendGiftActEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub

	}

	@Override
	public void login(Hero hero) {
		// TODO Auto-generated method stub

	}

	@Override
	public void zeroPub(int now) {
		// TODO Auto-generated method stub
		ConcurrentHashMap<Integer, ConcurrentHashMap<Integer, Channel>> zoneidToChannelMap = CrossCache.getZoneidToChannelMap();
		Iterator<Integer> iterator = zoneidToChannelMap.keySet().iterator();
		for(;iterator.hasNext();) {
			int partId = iterator.next();
			try {
				Integer endTime = CrossGodGenSendGiftActCache.getEndTime(partId);
				if(endTime==null) {
					endTime = 0;
				}
				int currentTime = TimeDateUtil.getCurrentTime();
				if (endTime != 0 && currentTime >= endTime) {
					CrossGodGenSendGiftActIO.getIns().sendMailAwardToLocal(partId);
				}
			} catch (Exception e) {
				LogTool.error(e, CrossGodGenSendGiftActEvent.class, "sendMailAwardToLocal partId="+partId);
			}
		}
	}

	@Override
	public void fixTime(int cmdId, int now) {
		// TODO Auto-generated method stub
		if (cmdId == 1) {
			ConcurrentHashMap<Integer, ConcurrentHashMap<Integer, Channel>> zoneidToChannelMap = CrossCache.getZoneidToChannelMap();
			Iterator<Integer> iterator = zoneidToChannelMap.keySet().iterator();
			for(;iterator.hasNext();) {
				int partId = iterator.next();
				try {
					int currentTime = TimeDateUtil.getCurrentTime();
					Integer endTime = CrossGodGenSendGiftActCache.getEndTime(partId);
					if (endTime == null) {
						// 还没更新到新一期
						return;
					}
					if(endTime == 0) {
						// 还没更新到新一期
						return;
					}
					// 中央服向各个子服发送排名列表,而这个排名是新一期的，防止各个子服数据清空时间不一致导致数据不同步问题
					CrossGodGenSendGiftActCL.getIns().sendRankList(partId);
				} catch (Exception e) {
					LogTool.error(e, CrossGodGenSendGiftActEvent.class, "sendRankList partId="+partId);
				}
			}
		}
	}

}
