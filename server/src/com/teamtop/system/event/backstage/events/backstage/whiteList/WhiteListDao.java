package com.teamtop.system.event.backstage.events.backstage.whiteList;

import java.util.Map;

import org.apache.ibatis.session.SqlSession;

import com.teamtop.cross.CrossZone;
import com.teamtop.util.db.orm.OrmSqlUtil;
import com.teamtop.util.mybatis.MybatisUtil;

public class WhiteListDao {

	private static WhiteListDao ins;

	private WhiteListDao() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized WhiteListDao getIns() {
		if (ins == null) {
			ins = new WhiteListDao();
		}
		return ins;
	}

	/**
	 * 查找某个玩家账号的白名单信息
	 * 
	 * @param openid
	 * @return
	 * @throws Exception
	 */
	public M_WhiteList findByOpenid(String openid) throws Exception {
		SqlSession session = MybatisUtil.getSession(CrossZone.houtai);
		if (session == null) {
			return null;
		}
		M_WhiteList whiteList = null;
		try {
			WhiteListMapper mapper = session.getMapper(WhiteListMapper.class);
			Map<String, Object> map = mapper.findByOpenid(openid);
			if (map != null) {
				whiteList = OrmSqlUtil.getObjFromDB(map, M_WhiteList.class);
			}
		} finally {
			MybatisUtil.closeSession(session);
		}
		return whiteList;
	}

	public void insert(M_WhiteList data) throws Exception {
		SqlSession session = MybatisUtil.getSession(CrossZone.houtai);
		if (session == null) {
			return;
		}
		try {
			WhiteListMapper mapper = session.getMapper(WhiteListMapper.class);
			long id = mapper.insert(data);
			session.commit();
		} finally {
			MybatisUtil.closeSession(session);
		}
	}

	public void update(M_WhiteList data) throws Exception {
		SqlSession session = MybatisUtil.getSession(CrossZone.houtai);
		if (session == null) {
			return;
		}
		try {
			WhiteListMapper mapper = session.getMapper(WhiteListMapper.class);
			mapper.updateData(data);
			session.commit();
		} finally {
			MybatisUtil.closeSession(session);
		}
	}

}
