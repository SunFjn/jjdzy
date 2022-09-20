package com.teamtop.system.battleGoods.event;

import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.houtaiHttp.events.crossActivitySwitch.CrossActivitySwitchCache;
import com.teamtop.netty.server.server2.Client_2;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.battleGoods.BattleGoodConst;
import com.teamtop.system.battleGoods.BattleGoodType;
import com.teamtop.system.battleGoods.BattleGoodsSender;
import com.teamtop.system.battleGoods.cache.BattleGoodSyscache;
import com.teamtop.system.battleGoods.cache.BattleGoodsLocalCache;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import io.netty.channel.Channel;

public class BattleGoodLocalSysEvent extends AbsSystemEvent{
	
	private static BattleGoodLocalSysEvent ins;

	private BattleGoodLocalSysEvent() {
		
	}
	public static BattleGoodLocalSysEvent getIns() {
		if (ins == null) {
			ins = new BattleGoodLocalSysEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero) {
		
		
	}

	@Override
	public void login(Hero hero) {
		if (BattleGoodsLocalCache.getState()==BattleGoodConst.ACT_STATE_2) {
			BattleGoodsSender.sendCmd_10100(hero.getId(), BattleGoodConst.ACT_STATE_2);
		}
		
	}
	
	
	
	@Override
	public void fixTime(int cmdId, int now) {
		int week = TimeDateUtil.getWeek();
		if (!BattleGoodSyscache.openDays.contains(week)) {
			return;
		}
		if (!CrossActivitySwitchCache.checkCrossOpen(SystemIdConst.CROSS_BTTLE_GOOD)) {
			return;
		}
		if (cmdId == 1) {
			//子服报名
			if (!HeroFunction.getIns().checkSystemOpenDay(SystemIdConst.CROSS_BTTLE_GOOD)) {
				return;
			}
			CrossData crossData = new CrossData();
			crossData.putObject(BattleGoodType.zoneId.name(), GameProperties.getFirstZoneId());
			Channel crossChannel = Client_2.getIns().getCrossChannel();
			NettyWrite.writeXData(crossChannel, CrossConst.BATTLEGOOD_SG_APPLY, crossData);
			LogTool.info("BattleGoodLocalSysEvent apply", BattleGoodLocalSysEvent.class);
		}
	}
	

}
