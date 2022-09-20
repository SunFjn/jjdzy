package com.teamtop.system.event.backstage.events.backstage.oldPlayer;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;

import com.teamtop.cross.CrossZone;
import com.teamtop.util.db.orm.OrmSqlUtil;
import com.teamtop.util.mybatis.DaoUtil;
import com.teamtop.util.mybatis.MybatisUtil;

/**
 * 滚服玩家数据操作方法类
 * @author hepl
 *
 */
public class OldPlayerDao {
	private static OldPlayerDao ins = null;
	
	public static OldPlayerDao getIns(){
		if(ins == null){
			ins = new OldPlayerDao();
		}
		return ins;
	}
	
	/**
	 * 中央服查找某个玩家账号的滚服信息
	 * @param openid 玩家账号
	 * @return
	 * @throws Exception
	 */
	public M_OldPlayer findByOpenid(String openid) throws Exception{
		SqlSession session = MybatisUtil.getSession(CrossZone.houtai);
		M_OldPlayer oldPlayer = null;
		try {
			OldPlayerMapper mapper = session.getMapper(OldPlayerMapper.class);
			Map<String, Object> map = mapper.findByOpenid(openid);
			oldPlayer = OrmSqlUtil.getObjFromDB(map, M_OldPlayer.class);
		} finally {
			MybatisUtil.closeSession(session);
		}
		return oldPlayer;
	}
	
	/**
	 * 中央服更新某个玩家账号的滚服信息
	 * @param m_OldPlayer
	 * @throws Exception
	 */
	public void insertOrUpdateOldPlayer(M_OldPlayer m_OldPlayer) throws Exception{
		List<M_OldPlayer> collection = new ArrayList<M_OldPlayer>();
		collection.add(m_OldPlayer);
		DaoUtil.insertOnDuplicateBatch(collection, M_OldPlayer.class, OldPlayerMapper.class, CrossZone.houtai, null, DaoUtil.size_100);
	}

	/**
	 * 查找某个ip注册的账号数量
	 * @param createIp
	 * @return
	 */
	public int findSameIpOpenidNum(String createIp) throws Exception {
		SqlSession session = MybatisUtil.getSession(CrossZone.houtai);
		int totalNum = 0;
		try {
			OldPlayerMapper mapper = session.getMapper(OldPlayerMapper.class);
			totalNum = mapper.findSameIpOpenidNum(createIp);
		} finally {
			MybatisUtil.closeSession(session);
		}
		return totalNum;
	}

}
