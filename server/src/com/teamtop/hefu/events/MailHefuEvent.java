package com.teamtop.hefu.events;

import java.util.List;

import com.teamtop.hefu.DelHero;
import com.teamtop.hefu.HefuDao;
import com.teamtop.hefu.IHefuEvent;
/**
 * 邮件合服处理
 * 删除已读没有附件的邮件
 * @author Administrator
 *
 */
public class MailHefuEvent implements IHefuEvent {

	@Override
	public void beforeDelHeros(List<DelHero> delList, int zoneid) throws Exception {
		// TODO Auto-generated method stub

	}

	@Override
	public void beforeHefu(int zoneid) throws Exception {
		HefuDao.getIns().delReadNoFjMail(zoneid);
	}

	@Override
	public void afterHefu(int firstZoneid) throws Exception {

	}

	@Override
	public void heCrossZu(int zoneid) throws Exception {
		// TODO Auto-generated method stub
		
	}

}
