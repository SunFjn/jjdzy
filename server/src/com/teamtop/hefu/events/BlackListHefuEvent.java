package com.teamtop.hefu.events;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;

import com.teamtop.hefu.DelHero;
import com.teamtop.hefu.IHefuEvent;
import com.teamtop.system.chat.Chat;
import com.teamtop.system.chat.dao.ChatDao;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroMapper;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.mybatis.DaoUtil;
/**
 * 邮件合服处理
 * 删除已读没有附件的邮件
 * @author Administrator
 *
 */
public class BlackListHefuEvent implements IHefuEvent {

	@Override
	public void beforeDelHeros(List<DelHero> delList, int zoneid) throws Exception {
		for(DelHero delHero:delList){
			long hid = delHero.getHid();
			Hero hero = ChatDao.getIns().find(hid);
			if( hero==null)
				continue;
			Chat chat = hero.getChat();
			if( chat==null)
				continue;
			HashMap<Long,String> inOthBlackMap = chat.getInOthBlackMap();
			if( inOthBlackMap==null|| inOthBlackMap.size()==0)
				continue;
			Iterator<Long> iterator = inOthBlackMap.keySet().iterator();
			while( iterator.hasNext()){
				Long hidOth = iterator.next();
				Hero heroOth = ChatDao.getIns().find(hidOth);
				if( heroOth==null)
					continue;
				Chat chatOth = heroOth.getChat();
				if( chatOth==null)
					continue;
				HashMap<Long,String> blackMap = chatOth.getBlackMap();
				String remove = blackMap.remove( hid);
				if( remove!=null)
					DaoUtil.update( chatOth, HeroMapper.class, CommonUtil.getZoneIdById(hid));
			}
		}
		
		
	}

	@Override
	public void beforeHefu(int zoneid) throws Exception {
	}

	@Override
	public void afterHefu(int firstZoneid) throws Exception {

	}

	@Override
	public void heCrossZu(int zoneid) throws Exception {
		// TODO Auto-generated method stub
		
	}

}
