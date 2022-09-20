package com.teamtop.system.crossRebornFB;

import java.util.List;

import com.teamtop.cross.CrossData;
import com.teamtop.cross.CrossEnum;
import com.teamtop.cross.connEvent.AbsCrossLoginEvent;
import com.teamtop.cross.connEvent.CrossSelectRoom;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.netty.server.server2.Client_2;
import com.teamtop.system.crossRebornFB.model.RebornFBLocal;
import com.teamtop.system.hero.Hero;

import io.netty.channel.Channel;

/**
 * 轮回副本 客户端登陆事件
 */
public class RebornFBLoginEvent extends AbsCrossLoginEvent {
	private static RebornFBLoginEvent ins = null;

	public static RebornFBLoginEvent getIns() {
		if (ins == null) {
			ins = new RebornFBLoginEvent();
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
		RebornFBSender.sendCmd_11892(hero.getId(), 0);
	}

	@Override
	public void localBeforeUpload(Hero hero, Channel channel, Object[] crossLoginParam, CrossData crossData) {
		// 上传数据到中央服
		crossData.putObject(CrossEnum.data1, hero.getRebornFBLocal());
	}

	@Override
	public CrossData crossAfterReciSucc(Hero hero, Channel channel, Object[] crossLoginParam, CrossData crossData) {
		RebornFBLocal rebornFBLocal = crossData.getObject(CrossEnum.data1, RebornFBLocal.class);
		hero.setRebornFBLocal(rebornFBLocal);
		return super.crossAfterReciSucc(hero, channel, crossLoginParam, crossData);
	}

	@Override
	public void crossLogout(Hero hero, CrossData crossData) {
		RebornFBManager.getIns().exitTeam(hero);
	}

	@Override
	public void localAfterLogout(Hero hero, CrossData crossData) {
	}

}
