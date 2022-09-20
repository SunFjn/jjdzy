package com.teamtop.system.chat.dao;

import org.apache.ibatis.session.SqlSession;

import com.teamtop.system.chat.Chat;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.db.orm.OrmDmlMapper;
import com.teamtop.util.db.orm.OrmSqlUtil;
import com.teamtop.util.mybatis.DaoUtil;
import com.teamtop.util.mybatis.MybatisUtil;

public class ChatDao {
	private static ChatDao friendDao;

	public static ChatDao getIns() {
		if (friendDao == null) {
			friendDao = new ChatDao();
		}
		return friendDao;
	}

	private ChatDao() {
	}

	public Hero find(long hid) throws Exception {
		Hero hero = new Hero();
		hero.setId(hid);
		Chat data = DaoUtil.find(hid, ChatMapper.class, Chat.class, CommonUtil.getZoneIdById((hid)));
		if (data == null)
			return null;
		hero.setChat(data);
		return hero;
	}

	public void update(Hero hero) {
		SqlSession session = MybatisUtil.getSession(hero.getZoneid());
		try {
			OrmDmlMapper mapper = session.getMapper(OrmDmlMapper.class);
			Chat data = hero.getChat();
			String sql = OrmSqlUtil.makeInsertIntoOnDuplicate(data, data.getHid());
			if(sql!=null){
				mapper.insertOnDup(sql);
				session.commit();
			}
		} finally {
			session.close();
		}
	}

	public void update(Chat data) {
		SqlSession session = MybatisUtil.getSession(CommonUtil.getZoneIdById(data.getHid()));
		try {
			OrmDmlMapper mapper = session.getMapper(OrmDmlMapper.class);
			String sql = OrmSqlUtil.makeInsertIntoOnDuplicate(data, data.getHid());
			if(sql!=null){
				mapper.insertOnDup(sql);
				session.commit();
			}
		} finally {
			session.close();
		}
	}
}
