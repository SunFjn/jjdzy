package com.teamtop.system.activity.ativitys.threeKingdomsCelebration.celebrationHaoLiZhuanPan.cross;

import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.CrossEnum;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.activity.ativitys.threeKingdomsCelebration.celebrationHaoLiZhuanPan.CelebrationHaoLiZhuanPanFunction;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.chat.ChatManager;

import io.netty.channel.Channel;

/**
 * 子服和中央服通讯IO
 * 
 * @author Administrator
 *
 */
public class CelebrationHaoLiZhuanPanIO {
	private static CelebrationHaoLiZhuanPanIO ins = null;

	public static CelebrationHaoLiZhuanPanIO getIns() {
		if (ins == null) {
			ins = new CelebrationHaoLiZhuanPanIO();
		}
		return ins;
	}

	public void sendRecordLC(Channel channel, CrossData data) {
		int cmd = CrossConst.CROSS_CELEBRATION_HAO_LI_ZHUAN_PAN_RECORD_LC;
		int partId = CrossCache.getPartId(channel);
		// 广播全服
		CelebrationHaoLiZhuanPanCrossToLocal.getIns().sendRecordCL(data, partId);
		data.finishGet();
		NettyWrite.writeCallbackData(channel, data, data.getCallbackCmd());
	}

	public void sendRecordCL(Channel channelCross, CrossData data) {
		int cmd = CrossConst.CROSS_CELEBRATION_HAO_LI_ZHUAN_PAN_RECORD_CL;
		String name = data.getObject(CrossEnum.data1, String.class);
		Integer[][] noticeArr = data.getObject(CrossEnum.data2, Integer[][].class);
		// 记录到缓存
		CelebrationHaoLiZhuanPanFunction.getIns().addRecord(name, noticeArr);
		for (int i = 0; i < noticeArr.length; i++) {
			Integer[] arr = noticeArr[i];
			ChatManager.getIns().broadCast(ChatConst.CELEBRATION_HAO_LI_ZHUAN_PAN,
					new Object[] { name, arr[0], arr[1] });
		}
	}

}
