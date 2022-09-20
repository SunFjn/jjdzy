package com.teamtop.system.boss;

import com.teamtop.system.boss.personalBoss.model.PersonalBoss;
import com.teamtop.util.db.trans.FieldOrder;

/**
 * Boss系统数据
 * @author hzp
 *
 */
public class Boss {
	@FieldOrder(order = 1)
	private long hid;

	/**
	 * 个人Boss
	 */
	@FieldOrder(order = 2)
	private PersonalBoss personalBoss;

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public PersonalBoss getPersonalBoss() {
		return personalBoss;
	}

	public void setPersonalBoss(PersonalBoss personalBoss) {
		this.personalBoss = personalBoss;
	}

}
