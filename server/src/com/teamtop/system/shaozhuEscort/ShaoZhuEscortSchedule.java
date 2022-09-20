package com.teamtop.system.shaozhuEscort;

import java.util.List;

import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.OpTaskConst;
import com.teamtop.synHandleCore.orderedRunnable.RankingOpTaskRunnable;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.shaozhuEscort.model.ShaoZhuEscortInfo;
import com.teamtop.util.exector.schedule.AbsScheduleExecutor;

public class ShaoZhuEscortSchedule extends AbsScheduleExecutor {
	public ShaoZhuEscortSchedule(long delay, long interval, boolean useLong) {
		super(delay, interval, useLong);
	}

	@Override
	public void execute(int now) {
		OpTaskExecutorService.PublicOrderService.execute(new RankingOpTaskRunnable() {
			@Override
			public void run() {
				List<ShaoZhuEscortInfo> deleteList = ShaoZhuEscortFunction.getIns().deleteExpireAndFindHero(0);
				int size = deleteList.size();
				if (size == 0) {
					ShaoZhuEscortFunction.getIns().createShaoZhuEscortInfoList();
					return;
				}
				for (int i = 0; i < size; i++) {
					ShaoZhuEscortInfo shaoZhuEscortInfo = deleteList.get(i);
					long hid = shaoZhuEscortInfo.getHid();
					Hero hero = HeroCache.getHero(hid);
					if (hero != null && hero.isOnline() && hero.getChannel().isActive()) {
						// 提示少主护送完成的在线用户发奖励
						ShaoZhuEscortFunction.getIns().isGettedAward(hero);
					}
				}
				ShaoZhuEscortFunction.getIns().createShaoZhuEscortInfoList();
			}

			@Override
			public Object getSession() {
				// TODO Auto-generated method stub
				return OpTaskConst.SHAOZHU_ESCORT;
			}

		});
	}

}
