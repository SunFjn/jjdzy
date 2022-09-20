package com.teamtop.system.event.backstage.events.backstage.rechargeWhiteList;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;

import com.teamtop.cross.CrossZone;
import com.teamtop.util.db.orm.OrmSqlUtil;
import com.teamtop.util.mybatis.MybatisUtil;

public class RechargeWhiteListDao {

	private static RechargeWhiteListDao dao;

	private RechargeWhiteListDao() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized RechargeWhiteListDao getIns() {
		if (dao == null) {
			dao = new RechargeWhiteListDao();
		}
		return dao;
	}

	/**
	 * 查找某个玩家账号的充值白名单信息
	 * 
	 * @param openid
	 * @return
	 * @throws Exception
	 */
	public M_RechargeWhiteList findByOpenid(String openid) throws Exception {
		SqlSession session = MybatisUtil.getSession(CrossZone.houtai);
		if (session == null) {
			return null;
		}
		M_RechargeWhiteList whiteList = null;
		try {
			RechargeWhiteListMapper mapper = session.getMapper(RechargeWhiteListMapper.class);
			Map<String, Object> map = mapper.findByOpenid(openid);
			if (map != null) {
				whiteList = OrmSqlUtil.getObjFromDB(map, M_RechargeWhiteList.class);
			}
		} finally {
			MybatisUtil.closeSession(session);
		}
		return whiteList;
	}

	/**
	 * 查询所有充值白名单
	 * 
	 * @return
	 * @throws Exception
	 */
	public List<M_RechargeWhiteList> findAll() throws Exception {
		SqlSession session = MybatisUtil.getSession(CrossZone.houtai);
		if (session == null) {
			return null;
		}
		try {
			RechargeWhiteListMapper mapper = session.getMapper(RechargeWhiteListMapper.class);
			List<M_RechargeWhiteList> list = mapper.findAll();
			if (list == null) {
				list = new ArrayList<>();
			}
			return list;
		} finally {
			MybatisUtil.closeSession(session);
		}
	}

	public void insert(M_RechargeWhiteList data) throws Exception {
		SqlSession session = MybatisUtil.getSession(CrossZone.houtai);
		if (session == null) {
			return;
		}
		try {
			RechargeWhiteListMapper mapper = session.getMapper(RechargeWhiteListMapper.class);
			long id = mapper.insert(data);
			session.commit();
		} finally {
			MybatisUtil.closeSession(session);
		}
	}

	public void update(M_RechargeWhiteList data) throws Exception {
		SqlSession session = MybatisUtil.getSession(CrossZone.houtai);
		if (session == null) {
			return;
		}
		try {
			RechargeWhiteListMapper mapper = session.getMapper(RechargeWhiteListMapper.class);
			mapper.updateData(data);
			session.commit();
		} finally {
			MybatisUtil.closeSession(session);
		}
	}

}
