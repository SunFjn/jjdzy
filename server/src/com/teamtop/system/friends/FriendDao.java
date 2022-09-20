package com.teamtop.system.friends;

import org.apache.ibatis.session.SqlSession;

import com.teamtop.system.friends.model.Friend;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.db.orm.OrmDmlMapper;
import com.teamtop.util.db.orm.OrmSqlUtil;
import com.teamtop.util.mybatis.DaoUtil;
import com.teamtop.util.mybatis.MybatisUtil;

/**
 * 好友dao
 * 
 * @author Administrator
 *
 */
public class FriendDao {
	private static FriendDao friendDao;

	public static FriendDao getIns() {
		if (friendDao == null) {
			friendDao = new FriendDao();
		}
		return friendDao;
	}

	private FriendDao() {
	}

	public Hero find(long hid) throws Exception {
		Hero hero = new Hero();
		hero.setId(hid);
		Friend friend = DaoUtil.find(hid, FriendMapper.class, Friend.class, CommonUtil.getZoneIdById((hid)));
		if (friend == null)
			return null;
		hero.setFriend(friend);
		return hero;
	}

	/**
	 * 更新缓存中的好友数据
	 */
	public void update(Hero hero) {
		SqlSession session = MybatisUtil.getSession(hero.getZoneid());
		try {
			OrmDmlMapper mapper = session.getMapper(OrmDmlMapper.class);
			Friend friend = hero.getFriend();
			String sql = OrmSqlUtil.makeInsertIntoOnDuplicate(friend, friend.getHid());
			if(sql!=null){
				mapper.insertOnDup(sql);
				session.commit();
			}
		} finally {
			session.close();
		}
	}
	/**
	 * 更新缓存中的好友数据
	 */
	public void update(Friend friend) {
		SqlSession session = MybatisUtil.getSession(CommonUtil.getZoneIdById(friend.getHid()));
		try {
			OrmDmlMapper mapper = session.getMapper(OrmDmlMapper.class);
			String sql = OrmSqlUtil.makeInsertIntoOnDuplicate(friend, friend.getHid());
			if(sql!=null){
				mapper.insertOnDup(sql);
				session.commit();
			}
		} finally {
			session.close();
		}
	}
}
