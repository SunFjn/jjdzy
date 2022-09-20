package com.teamtop.system.crossBoss.cross;

import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.callback.Callback;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.crossBoss.CrossBossCache;
import com.teamtop.system.crossBoss.CrossBossConst;
import com.teamtop.system.crossBoss.CrossBossEnum;
import com.teamtop.system.crossBoss.CrossBossFunction;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import io.netty.channel.Channel;
/**
 * 跨服事件
 * @author Administrator
 *
 */
public class CrossBossCrossEvent extends AbsSystemEvent{
	private static CrossBossCrossEvent ins = null;

	public static CrossBossCrossEvent getIns() {
		if (ins == null) {
			ins = new CrossBossCrossEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero) {
		
	}

	@Override
	public void login(Hero hero) {
	}

	@Override
	public void fixTime(int cmdId, int now) {
		if(cmdId==CrossBossConst.STATE_READY){
			//准备
			CrossBossFunction.getIns().ready();
			CrossBossCache.CROSS_STATE = cmdId;
			CTLActState();
		}else if(cmdId==CrossBossConst.STATE_START){
			//开始
			CrossBossFunction.getIns().start();
			CrossBossCache.CROSS_STATE = cmdId;
			CTLActState();
		}else if(cmdId==CrossBossConst.STATE_END){
			//结束
			CrossBossFunction.getIns().end();
			//
			CrossBossCache.updateGlobalData();
			CrossBossCache.CROSS_STATE = cmdId;
			CTLActState();
		}
		LogTool.info("CrossBossCrossEvent.fixTime cmdId:"+cmdId+" time:"+TimeDateUtil.printTime(now), this);
	}
	
	@Override
	public void zeroHero(Hero hero, int now) {
		
	}
	
	/**
	 * 通知子服新的状态
	 */
	public void CTLActState(){
		try {
			CrossData crossData = new CrossData(CrossBossEnum.state, CrossBossCache.CROSS_STATE);
			for (int partId:CrossCache.getZoneidToChannelMap().keySet()) {
				ConcurrentHashMap<Channel, List<Integer>> channelToZoneid = CrossCache.getChannelToZoneidByPartId(partId);
				for(Channel channel:channelToZoneid.keySet()) {
					NettyWrite.writeXData(channel, CrossConst.CROSSBOSS_TELL_LOCAL_STATE, crossData,new Callback() {
						@Override
						public void dataReci(Channel channel, CrossData crossData) {
							LogTool.info("CrossBossCrossEvent tell cross server done,matchServer:"+channel+",zoneids:"+channelToZoneid.get(channel), this);
						}
					});
				}
			}
		} catch (Exception e) {
			LogTool.error(e, this);
		}
	}
	
	
}
