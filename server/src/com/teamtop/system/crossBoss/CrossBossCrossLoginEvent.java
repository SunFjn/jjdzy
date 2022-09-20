package com.teamtop.system.crossBoss;

import java.util.HashMap;
import java.util.List;

import com.alibaba.fastjson.TypeReference;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.CrossEnum;
import com.teamtop.cross.connEvent.AbsCrossLoginEvent;
import com.teamtop.cross.connEvent.CrossSelectRoom;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.netty.server.server2.Client_2;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.threeKingdomsCelebration.activeGetGift.ActiveGetGiftFunction;
import com.teamtop.system.crossBoss.cross.ZSBoss;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.openDaysSystem.OpenDaysSystemFunction;

import excel.config.Config_hdfl_012;
import excel.config.Config_seven_223;
import excel.struct.Struct_seven_223;
import io.netty.channel.Channel;
/**
 * 跨服BOSS 客户端登陆事件
 * @author Administrator
 *
 */
public class CrossBossCrossLoginEvent extends AbsCrossLoginEvent{
	private static CrossBossCrossLoginEvent ins = null;

	public static CrossBossCrossLoginEvent getIns() {
		if (ins == null) {
			ins = new CrossBossCrossLoginEvent();
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
		if(CrossBossCache.CROSS_STATE!=CrossBossConst.STATE_START){
			CrossBossSender.sendCmd_1710(hero.getId(), 2, null, 0, 0, 0, 0, 0, 0);
			return;
		}
		ZSBoss zsBoss=null;
		for (Struct_seven_223 seven:Config_seven_223.getIns().getSortList()) {
			if (hero.getRebornlv()<=seven.getCon()[0][1]&&hero.getRebornlv()>=seven.getCon()[0][0]) {
				zsBoss = CrossBossCache.getZSBoss(hero,seven.getBoss());
				break;
			}
		}
		if(zsBoss==null){
			CrossBossSender.sendCmd_1710(hero.getId(), 1, null, 0, 0, 0, 0, 0, 0);
			return;
		}
		if (zsBoss.getBeatBossDeadTime()>0) {
			CrossBossSender.sendCmd_1710(hero.getId(), 3, null, 0, 0, 0, 0, 0, 0);
			return;
		}
		CrossBossFunction.getIns().onIn(zsBoss,hero);
	}
	
	@Override
	public void localBeforeUpload(Hero hero, Channel channel, Object[] crossLoginParam, CrossData crossData) {
		HashMap<Integer, Integer> actIds = hero.getActIds();
		if (actIds==null) {
			actIds=new HashMap<Integer,Integer>();
			hero.setActIds(actIds);
		}
		if (ActiveGetGiftFunction.getIns().checkIsStart(hero)) {
			actIds.put(ActivitySysId.ACT_ACTIVEGETGIFT,ActiveGetGiftFunction.getIns().getQs());
		}else {
			actIds.remove(ActivitySysId.ACT_ACTIVEGETGIFT);
		}
		if(OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.RUNE_GIFT)) {
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.RUNE_GIFT);
			int qs = Config_hdfl_012.getIns().get(uid).getQs();
			actIds.put(SystemIdConst.RUNE_GIFT, qs);
		}else {
			actIds.remove(SystemIdConst.RUNE_GIFT);
		}
		crossData.putObject( CrossEnum.data1, actIds);

	}
	
	@Override
	public CrossData crossAfterReciSucc(Hero hero, Channel channel, Object[] crossLoginParam, CrossData crossData) {
		HashMap<Integer,Integer> actIds  = crossData.getObject(CrossEnum.data1,new TypeReference<HashMap<Integer,Integer>>() {}.getType());
		hero.setActIds(actIds);
		return super.crossAfterReciSucc(hero, channel, crossLoginParam, crossData);
	}

	@Override
	public void crossLogout(Hero hero, CrossData crossData) {
		//
		CrossBossManager.getIns().exitCrossBoss(hero);
	}
	
	@Override
	public void localAfterLogout(Hero hero, CrossData crossData) {
		
	}
	
}
