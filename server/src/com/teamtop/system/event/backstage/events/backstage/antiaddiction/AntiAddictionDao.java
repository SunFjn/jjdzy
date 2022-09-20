package com.teamtop.system.event.backstage.events.backstage.antiaddiction;

import java.util.Map;

import org.apache.ibatis.session.SqlSession;

import com.teamtop.cross.CrossZone;
import com.teamtop.system.antiAddictionSystem.model.AntiAddictionInfo;
import com.teamtop.util.db.orm.OrmSqlUtil;
import com.teamtop.util.mybatis.MybatisUtil;

public class AntiAddictionDao {

	private static AntiAddictionDao ins;

	private AntiAddictionDao() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized AntiAddictionDao getIns() {
		if (ins == null) {
			ins = new AntiAddictionDao();
		}
		return ins;
	}

	public AntiAddictionInfo findInfo(String openid) throws Exception {
		SqlSession session = MybatisUtil.getSession(CrossZone.houtai);
		if (session == null) {
			return null;
		}
		AntiAddictionInfo info = null;
		try {
			AntiAddictionMapper mapper = session.getMapper(AntiAddictionMapper.class);
			Map<String, Object> map = mapper.findInfo(openid);
			if (map != null) {
				info = OrmSqlUtil.getObjFromDB(map, AntiAddictionInfo.class);
			}
		} finally {
			MybatisUtil.closeSession(session);
		}
		return info;
	}

	public void insert(AntiAddictionInfo info) throws Exception {
		SqlSession session = MybatisUtil.getSession(CrossZone.houtai);
		if (session == null) {
			return;
		}
		try {
			AntiAddictionMapper mapper = session.getMapper(AntiAddictionMapper.class);
			long id = mapper.insert(info);
			session.commit();
		} finally {
			MybatisUtil.closeSession(session);
		}
	}

	public void update(AntiAddictionInfo info) throws Exception {
		SqlSession session = MybatisUtil.getSession(CrossZone.houtai);
		if (session == null) {
			return;
		}
		try {
			AntiAddictionMapper mapper = session.getMapper(AntiAddictionMapper.class);
			mapper.updateData(info);
			session.commit();
		} finally {
			MybatisUtil.closeSession(session);
		}
	}

}
