package com.teamtop.system.event.backstage.events.backstage.adMark;

import java.util.Map;

import org.apache.ibatis.session.SqlSession;

import com.teamtop.cross.CrossZone;
import com.teamtop.util.db.orm.OrmSqlUtil;
import com.teamtop.util.mybatis.MybatisUtil;

public class AdMarkDao {

	private static AdMarkDao dao;

	private AdMarkDao() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized AdMarkDao getDao() {
		if (dao == null) {
			dao = new AdMarkDao();
		}
		return dao;
	}

	/**
	 * 查找某个玩家账号的广告号信息
	 * 
	 * @param openid
	 * @return
	 * @throws Exception
	 */
	public M_AdMark findByOpenid(String openid) throws Exception {
		SqlSession session = MybatisUtil.getSession(CrossZone.houtai);
		if (session == null) {
			return null;
		}
		M_AdMark m_AdMark = null;
		try {
			M_AdMarkMapper mapper = session.getMapper(M_AdMarkMapper.class);
			Map<String, Object> map = mapper.findByOpenid(openid);
			if (map != null) {
				m_AdMark = OrmSqlUtil.getObjFromDB(map, M_AdMark.class);
			}
		} finally {
			MybatisUtil.closeSession(session);
		}
		return m_AdMark;
	}

	public void insert(M_AdMark data) throws Exception {
		SqlSession session = MybatisUtil.getSession(CrossZone.houtai);
		if (session == null) {
			return;
		}
		try {
			M_AdMarkMapper mapper = session.getMapper(M_AdMarkMapper.class);
			long id = mapper.insert(data);
			session.commit();
		} finally {
			MybatisUtil.closeSession(session);
		}
	}

	public void update(M_AdMark data) throws Exception {
		SqlSession session = MybatisUtil.getSession(CrossZone.houtai);
		if (session == null) {
			return;
		}
		try {
			M_AdMarkMapper mapper = session.getMapper(M_AdMarkMapper.class);
			mapper.updateData(data);
			session.commit();
		} finally {
			MybatisUtil.closeSession(session);
		}
	}

}
