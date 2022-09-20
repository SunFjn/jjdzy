package com.teamtop.util.db.blobTable;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;

import com.teamtop.gameCommon.GameProperties;
import com.teamtop.util.db.trans.crossTrans.CrossTrans;
import com.teamtop.util.mybatis.MybatisUtil;

public class BlobTableDao{
	private static BlobTableDao ins = null;
	public static BlobTableDao getIns(){
		if(ins==null){
			ins = new BlobTableDao();
		}
		return ins;
	}
	public long save(BlobTable bt,int zoneid) throws Exception {
		SqlSession session = MybatisUtil.getSession(zoneid);
		try {
			BlobTableMapper mapper = session.getMapper(BlobTableMapper.class);
			mapper.save(bt);
			session.commit();
			return bt.getId();
		}finally{
			MybatisUtil.closeSession(session);
		}
	}
	public <T> Map<Long,T> findAll(String tbname,Class<T> clazz) throws Exception {
		int zoneId = GameProperties.getFirstZoneId();
		SqlSession session = MybatisUtil.getSession(zoneId);
		try {
			BlobTableMapper mapper = session.getMapper(BlobTableMapper.class);
			List<BlobTable> rs = mapper.findAll(tbname);
			Map<Long,T> map = new HashMap<Long, T>();
			for(BlobTable bt:rs){
				if(bt.getData()==null) continue;
				T t = CrossTrans.read(bt.getData(), clazz);
				map.put(bt.getId(), t);
			}
			return map;
		}finally{
			session.close();
		}
	}
	
	public void delete(String tbname,long id,int zoneid) throws Exception{
		SqlSession session = MybatisUtil.getSession(zoneid);
		try {
			BlobTableMapper mapper = session.getMapper(BlobTableMapper.class);
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("tbname", tbname);
			map.put("id", id);
			mapper.delete(map);
			session.commit();
		}finally{
			MybatisUtil.closeSession(session);
		}
	}
}
