package com.teamtop.system.crossTeamKing;

import com.teamtop.cross.CrossZone;
import com.teamtop.util.exector.schedule.AbsScheduleExecutor;

public class CrossTeamKingSchedule extends AbsScheduleExecutor{
	
	private int send = 0;
	
	
	
	public CrossTeamKingSchedule(long delay, long interval, boolean useLong) {
		super(delay, interval, useLong);
		// TODO Auto-generated constructor stub
	}

	@Override
	public void execute(int now) {
		if(!CrossZone.isCrossServer()){
			//本服
			return;
		}
		boolean actSate = CrossTeamKingFunction.getIns().getActSate();
		if (actSate) {
			CrossTeamKingFunction.getIns().marryBattle1();
		}
		send++;
		if(send==20){
			send = 0;
			if (actSate) {
				CrossTeamKingFunction.getIns().noticeRank();
			}
		
		}
	}

}
