package com.teamtop.system.event.backstage.events.backstage.kuaFuFenQu;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import com.teamtop.cross.CrossZone;
import com.teamtop.util.mybatis.MybatisUtil;

public class KuaFuFenQuDao {

	private static KuaFuFenQuDao dao;

	private KuaFuFenQuDao() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized KuaFuFenQuDao getDao() {
		if (dao == null) {
			dao = new KuaFuFenQuDao();
		}
		return dao;
	}

	public List<KuaFuFenQuInfo> findAllPlatform() throws Exception {
		SqlSession session = MybatisUtil.getSession(CrossZone.houtai);
		if (session == null) {
			return null;
		}
		List<KuaFuFenQuInfo> list = null;
		try {
			KuaFuFenQuMapper mapper = session.getMapper(KuaFuFenQuMapper.class);
			list = mapper.findKuaFuFenQuInfo();
		} finally {
			MybatisUtil.closeSession(session);
		}
		return list;
	}

}
