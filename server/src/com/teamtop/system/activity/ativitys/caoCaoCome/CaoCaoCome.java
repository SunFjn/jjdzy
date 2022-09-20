package com.teamtop.system.activity.ativitys.caoCaoCome;

import com.teamtop.system.activity.model.ActivityData;
/**
 * 曹操来袭
 * @author jjjjyyy
 *
 */
public class CaoCaoCome  extends ActivityData{
	/**
	 * 上次进入时间
	 */
	private int joinerTime;
	

	public CaoCaoCome() {
		super();
	}
	public CaoCaoCome(long hid, int indexId, int actId, int periods) {
		super(hid, indexId, actId, periods);
	}
	public int getJoinerTime() {
		return joinerTime;
	}

	public void setJoinerTime(int joinerTime) {
		this.joinerTime = joinerTime;
	}
	
	
	

}
