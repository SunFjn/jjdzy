package com.teamtop.system.event.backstage.events.backstage.ipWhiteList;

import java.util.Map;

import org.apache.ibatis.session.SqlSession;

import com.teamtop.cross.CrossZone;
import com.teamtop.util.db.orm.OrmSqlUtil;
import com.teamtop.util.mybatis.MybatisUtil;

public class IpWhiteListDao {

	private static IpWhiteListDao dao;

	private IpWhiteListDao() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized IpWhiteListDao getDao() {
		if (dao == null) {
			dao = new IpWhiteListDao();
		}
		return dao;
	}

	/**
	 * 查找某个玩家账号的白名单信息
	 * 
	 * @param openid
	 * @return
	 * @throws Exception
	 */
	public M_IpWhiteList findByIp(String ip) throws Exception {
		SqlSession session = MybatisUtil.getSession(CrossZone.houtai);
		if (session == null) {
			return null;
		}
		M_IpWhiteList whiteList = null;
		try {
			IpWhiteListMapper mapper = session.getMapper(IpWhiteListMapper.class);
			Map<String, Object> map = mapper.findByIp(ip);
			if (map != null) {
				whiteList = OrmSqlUtil.getObjFromDB(map, M_IpWhiteList.class);
			}
		} finally {
			MybatisUtil.closeSession(session);
		}
		return whiteList;
	}

	public void insert(M_IpWhiteList data) throws Exception {
		SqlSession session = MybatisUtil.getSession(CrossZone.houtai);
		if (session == null) {
			return;
		}
		try {
			IpWhiteListMapper mapper = session.getMapper(IpWhiteListMapper.class);
			long id = mapper.insert(data);
			session.commit();
		} finally {
			MybatisUtil.closeSession(session);
		}
	}

	public void update(M_IpWhiteList data) throws Exception {
		SqlSession session = MybatisUtil.getSession(CrossZone.houtai);
		if (session == null) {
			return;
		}
		try {
			IpWhiteListMapper mapper = session.getMapper(IpWhiteListMapper.class);
			mapper.updateData(data);
			session.commit();
		} finally {
			MybatisUtil.closeSession(session);
		}
	}

}
