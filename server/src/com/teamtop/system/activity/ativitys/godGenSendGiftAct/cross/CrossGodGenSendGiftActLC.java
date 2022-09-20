package com.teamtop.system.activity.ativitys.godGenSendGiftAct.cross;

import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.callback.Callback;
import com.teamtop.netty.server.server2.Client_2;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.HeroOpTaskRunnable;
import com.teamtop.system.activity.ativitys.godGenSendGiftAct.GodGenSendGiftActFunction;
import com.teamtop.system.activity.ativitys.godGenSendGiftAct.model.GodGenSendGiftAct;
import com.teamtop.system.activity.ativitys.godGenSendGiftAct.model.GodGenSendGiftActRankModel;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_huodong_009;
import excel.struct.Struct_huodong_009;
import io.netty.channel.Channel;

public class CrossGodGenSendGiftActLC {
	private static CrossGodGenSendGiftActLC ins = null;

	public static CrossGodGenSendGiftActLC getIns() {
		if (ins == null) {
			ins = new CrossGodGenSendGiftActLC();
		}
		return ins;
	}

	private CrossGodGenSendGiftActLC() {
	}

	/**
	 * 通知中央服增加更新排行榜数据(子服向中央服)
	 * 
	 * @param hero
	 * @param type     1为玩家消费更新，0为更改名字
	 * @param addTimes 增加次数
	 */
	public void addUpdateConsumeRankListToCen(Hero hero, GodGenSendGiftAct godGenSendGiftAct, int type, int addTimes) {
		try {
			if (!GodGenSendGiftActFunction.getIns().checkOpen(hero)) {
				return;

			}
			Channel crossChannel = Client_2.getIns().getCrossChannel();
			CrossData crossData = new CrossData();
			GodGenSendGiftActRankModel rankModel;
			if (type == 1) {
				int totalTimes = godGenSendGiftAct.getTotalTimes();
				int currentTime = TimeDateUtil.getCurrentTime();
				rankModel = new GodGenSendGiftActRankModel(hero.getId(), hero.getNameZoneid(), totalTimes, currentTime);
				rankModel.setAddTimes(addTimes);
				crossData.putObject(CrossGodGenSendGiftActEnum.qs, godGenSendGiftAct.getPeriods());
				Struct_huodong_009 struct_huodong_009 = Config_huodong_009.getIns().get(godGenSendGiftAct.getIndexId());
				int endTime = TimeDateUtil.getTimeIntByStrTime(struct_huodong_009.getHend(), "yyyy-MM-dd hh:mm:ss");
				crossData.putObject(CrossGodGenSendGiftActEnum.endTime, endTime);
			} else {
				// 拥有次数才改名
//				if (totalTimes > 0) {
				rankModel = new GodGenSendGiftActRankModel(hero.getId(), hero.getNameZoneid(), 0, 0);
//				} else {
//					return;
//				}
			}
			crossData.putObject(CrossGodGenSendGiftActEnum.addUpdateRankModel, rankModel);
			crossData.putObject(CrossGodGenSendGiftActEnum.type, type);
			NettyWrite.writeXData(crossChannel, CrossConst.CROSS_GODGENSENDGIFT_ADDUPDATERANK_LC, crossData,
					new Callback() {

						@Override
						public void dataReci(Channel channel, CrossData crossData) {
							// TODO Auto-generated method stub
							OpTaskExecutorService.DefaultService.execute(new HeroOpTaskRunnable() {

								@Override
								public void run() {
									if (godGenSendGiftAct == null) {
										return;
									}
									Boolean isUpdateSuccess = crossData
											.getObject(CrossGodGenSendGiftActEnum.isUpdateSuccess, Boolean.class);
									if (!isUpdateSuccess) {
										if (addTimes > 0) {
											updateFailHandle(hero, godGenSendGiftAct, addTimes);
										}
									}
									GodGenSendGiftActFunction.getIns().updateTargetAwardStateMap(hero,
											godGenSendGiftAct, addTimes);
								}

								@Override
								public Object getSession() {
									// TODO Auto-generated method stub
									return hero.getId();
								}
							});
						}
					});
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getNameZoneid(), "addUpdateConsumeRankListToCen");
		}
	}

	/**
	 * 更新失败处理
	 * 
	 * @param hero
	 * @param addAppraiseTimes
	 */
	public void updateFailHandle(Hero hero, GodGenSendGiftAct godGenSendGiftAct, int addTimes) {
		int totalTimes = godGenSendGiftAct.getTotalTimes();
		godGenSendGiftAct.setTotalTimes(totalTimes - addTimes);
		String currentDateTimeStr = TimeDateUtil.getCurrentDateTimeStr("yyyy-MM-dd HH:mm:ss");
		LogTool.warn("updateFailHandle: hid:" + hero.getId() + " totalTimes:" + totalTimes + " addTimes:" + addTimes
				+ " currentDateTimeStr:" + currentDateTimeStr, this);
	}

}
