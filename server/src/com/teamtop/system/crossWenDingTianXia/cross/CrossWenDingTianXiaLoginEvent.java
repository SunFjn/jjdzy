package com.teamtop.system.crossWenDingTianXia.cross;

import java.util.List;
import java.util.Map;

import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.connEvent.AbsCrossLoginEvent;
import com.teamtop.cross.connEvent.CrossSelectRoom;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.netty.server.server2.Client_2;
import com.teamtop.system.battle.BattleConst;
import com.teamtop.system.crossWenDingTianXia.CrossWenDingTianXiaConst;
import com.teamtop.system.crossWenDingTianXia.CrossWenDingTianXiaManager;
import com.teamtop.system.crossWenDingTianXia.CrossWenDingTianXiaSender;
import com.teamtop.system.crossWenDingTianXia.model.CrossWenDingTianXia;
import com.teamtop.system.crossWenDingTianXia.model.CrossWenDingTianXiaScoreRank;
import com.teamtop.system.event.backstage.events.flowHero.FlowHeroEvent;
import com.teamtop.system.hero.FinalFightAttr;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.hero.XTCS004Const;
import com.teamtop.system.scene.SceneEvent;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_xtcs_004;
import excel.struct.Struct_xtcs_004;
import io.netty.channel.Channel;
/**
 * 客户端登陆事件
 */
public class CrossWenDingTianXiaLoginEvent extends AbsCrossLoginEvent{
	private static CrossWenDingTianXiaLoginEvent ins = null;

	public static CrossWenDingTianXiaLoginEvent getIns() {
		if (ins == null) {
			ins = new CrossWenDingTianXiaLoginEvent();
		}
		return ins;
	}

	@Override
	public Channel localAsk(Hero hero, int type, List<Object[]> param) {
		return Client_2.getIns().getCrossChannel();
	}

	@Override
	public CrossSelectRoom crossSelectRoom(int type, String param) {
		return new CrossSelectRoom(1, GameProperties.cross_domainName_2, GameProperties.serverPort);
	}
	
	@Override
	public void crossAfterLoginSucc(Hero hero, int crossLoginRoomId) {
		//跨服初始化场景
		SceneEvent.getIns().init(hero);
		
		CrossWenDingTianXia wdtxData = hero.getCrossWenDingTianXia();
		if(wdtxData==null) {
			wdtxData = new CrossWenDingTianXia();
			hero.setCrossWenDingTianXia(wdtxData);
		}
		FinalFightAttr finalFightAttr = hero.getFinalFightAttr();
		long hpMax = finalFightAttr.getHpMax();
		wdtxData.setHp( hpMax);
		wdtxData.setHuDun( finalFightAttr.getHudun());
		
		CrossWenDingTianXiaScoreRank rankData = CrossWenDingTianXiaCrossFunction.getIns().getHeroRankData(hero.getId());
		int zid = hero.getBelongZoneid();
		int partId = CrossCache.getPartId(zid);
		Map<Integer, Integer> zidToRoomIDMap = CrossWenDingTianXiaCrossCache.getWdtxZidToRoomIDMap(partId);
		Integer roomID = zidToRoomIDMap.get( zid);
		if(roomID==null) {
			LogTool.info("WDTX CrossAfterLoginSucc.roomID is null.hid:"+hero.getId()+" zid:"+zid, this);
			return;
		}
		if(rankData == null) {
			Struct_xtcs_004 excel = Config_xtcs_004.getIns().get( XTCS004Const.WDTX_SCORE_INIT);
			int initScore = excel.getNum();
			//初始化玩家排行数据、副本数据
			CrossWenDingTianXiaCrossFunction.getIns().refreshHeroScoreRank(hero, initScore);
		}
		CrossWenDingTianXiaCrossFunction.getIns().goToNextLayer(hero);
		//通知前端初始化
		CrossWenDingTianXiaSender.sendCmd_4224(hero.getId(), 1, 0);
	}
	
	@Override
	public void localBeforeUpload(Hero hero, Channel channel, Object[] crossLoginParam, CrossData crossData) {
		String usesys = hero.getTempData().getAccount().getUsesys();
		FlowHeroEvent.addJoinSystemFlow(hero.getId(), hero.getLevel(), hero.getVipLv(), hero.getCreateJob(),
				hero.getTotalStrength(), SystemIdConst.CROSS_WEN_DING_TIAN_XIA, hero.getZoneid(), hero.getPf(), usesys,
				hero.getReincarnationLevel());
	}
	
	@Override
	public CrossData crossAfterReciSucc(Hero hero, Channel channel, Object[] crossLoginParam, CrossData crossData) {
		return super.crossAfterReciSucc(hero, channel, crossLoginParam, crossData);
	}
	
	@Override
	public void crossLogout(Hero hero, CrossData crossData) {
		int state = CrossWenDingTianXiaCrossCache.getState();
		if( state==CrossWenDingTianXiaConst.STATE_2) {
			//结算界面
			CrossWenDingTianXiaSender.sendCmd_4234( hero.getId(), 1, BattleConst.RESULT_ATT_LOSE, new Object[] {});
		}else {
			//扣积分
			CrossWenDingTianXiaCrossFunction.getIns().battleEnd( 0, hero.getId());
			//移除玉玺头衔
			CrossWenDingTianXiaCrossFunction.getIns().removeYuXiHero(hero.getId());
		}

		CrossWenDingTianXiaManager.getIns().battleMonsterEnd(hero, BattleConst.RESULT_ATT_LOSE);
		//TODO 移除场景中的本玩家
	}

	@Override
	public void localAfterLogout(Hero hero, CrossData crossData) {
		CrossWenDingTianXia data = hero.getCrossWenDingTianXia();
		data.setTimeLogout(TimeDateUtil.getCurrentTime());
	}
	
}
