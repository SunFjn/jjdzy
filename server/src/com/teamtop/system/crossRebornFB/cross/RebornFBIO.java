package com.teamtop.system.crossRebornFB.cross;

import java.lang.reflect.Type;
import java.util.List;

import com.alibaba.fastjson.TypeReference;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.CrossEnum;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.chat.ChatManager;
import com.teamtop.system.crossRebornFB.RebornFBFunction;
import com.teamtop.system.crossRebornFB.RebornFBManager;
import com.teamtop.system.crossRebornFB.RebornFBType;
import com.teamtop.system.crossRebornFB.model.RebornFBLocal;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.global.GlobalSender;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.util.log.LogTool;

import io.netty.channel.Channel;

public class RebornFBIO {
	private static RebornFBIO ins = null;

	public static RebornFBIO getIns() {
		if (ins == null) {
			ins = new RebornFBIO();
		}
		return ins;
	}

	/**
	 * 广播队伍信息到子服
	 */
	public void sendYaoQingCL(Channel channel, CrossData data) {
		int cmd = CrossConst.CROSS_REBORN_FB_YAOQING;
		String name = data.getObject(RebornFBType.data1, String.class);
		int fubenID = data.getObject(RebornFBType.data2, Integer.class);
		int teamID = data.getObject(RebornFBType.data3, Integer.class);

		ChatManager.getIns().broadCast(ChatConst.REBORN_FB_YAOQING, new Object[] { name, fubenID, teamID });
	}

	/**
	 * 中央服同步数据到子服
	 */
	public void saveBattleDataCL(Channel channel, CrossData data) {
		int cmd = CrossConst.CROSS_REBORN_FB_END;
		try {
			Long hid = data.getObject(CrossEnum.hid, Long.class);
			RebornFBLocal local = data.getObject(CrossEnum.data1, RebornFBLocal.class);
			int[][] drops = data.getObject(CrossEnum.data2, int[][].class);
			Type jType = new TypeReference<List<Object[]>>() {
			}.getType();
			List<Object[]> dropTips = data.getObject(CrossEnum.data3, jType);
			Hero hero = HeroCache.getHero(hid);
			if (hero != null) {
				hero.getRebornFBLocal().setHelpNum(local.getHelpNum());
				hero.getRebornFBLocal().setBatterInfoMap(local.getBatterInfoMap());
				if (drops != null) {
					UseAddUtil.add(hero, drops, SourceGoodConst.REBORN_FB_TIAO_ZHAN, UseAddUtil.getDefaultMail(), true);
				}
				if (dropTips != null) {
					// 弹出胜利界面
					GlobalSender.sendCmd_262(hid, 1, dropTips.toArray());
				}
				RebornFBFunction.getIns().updateRedPoint(hero);
				RebornFBManager.getIns().openUi(hero);
			}
		} catch (Exception e) {
			LogTool.error(e, this, "RebornFBIO connEvent Exception!");
		}
	}

	/**
	 * 0点 子服同步数据到中央服
	 */
	public void saveBattleDataLC(Channel channel, CrossData data) {
		int cmd = CrossConst.CROSS_REBORN_FB_ZERO;
		try {
			Long hid = data.getObject(CrossEnum.hid, Long.class);
			RebornFBLocal local = data.getObject(CrossEnum.data1, RebornFBLocal.class);
			Hero hero = HeroCache.getHero(hid);
			if (hero != null) {
				if (hero.getRebornFBLocal() != null) {
					hero.getRebornFBLocal().setHelpNum(local.getHelpNum());
					hero.getRebornFBLocal().setBatterInfoMap(local.getBatterInfoMap());
				}
			}
		} catch (Exception e) {
			LogTool.error(e, this, "RebornFBIO connEvent Exception!");
		}
	}
}
