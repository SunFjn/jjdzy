package com.teamtop.system.activity.ativitys.threeKingdomsCelebration.celebrationHaoLiZhuanPan.cross;

import java.util.List;

import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.CrossEnum;
import com.teamtop.cross.callback.Callback;
import com.teamtop.netty.server.server2.Client_2;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.activity.ativitys.threeKingdomsCelebration.celebrationHaoLiZhuanPan.CelebrationHaoLiZhuanPanManager;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.log.LogTool;

import io.netty.channel.Channel;

public class CelebrationHaoLiZhuanPanLocalToCross {
	private static CelebrationHaoLiZhuanPanLocalToCross ins = null;

	public static CelebrationHaoLiZhuanPanLocalToCross getIns() {
		if (ins == null) {
			ins = new CelebrationHaoLiZhuanPanLocalToCross();
		}
		return ins;
	}

	/**
	 * 子服向中央服上传抽奖记录
	 */
	public void sendRecordLC(Hero hero, List<Integer[]> awardIdNoticeList) {
		try {
			Channel channel = Client_2.getIns().getCrossChannel();
			CrossData crossData = new CrossData();
			crossData.putObject(CrossEnum.data1, hero.getNameZoneid());
			crossData.putObject(CrossEnum.data2, awardIdNoticeList.toArray());
			NettyWrite.writeXData(channel, CrossConst.CROSS_CELEBRATION_HAO_LI_ZHUAN_PAN_RECORD_LC, crossData,
					new Callback() {
						@Override
						public void dataReci(Channel channel, CrossData crossData) {
							CelebrationHaoLiZhuanPanManager.getIns().openUI(hero);
						}
					});
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(), "CelebrationHaoLiZhuanPanLocalToCross sendRecordLC");
		}
	}

}
