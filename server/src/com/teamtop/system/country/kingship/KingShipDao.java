package com.teamtop.system.country.kingship;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.apache.ibatis.session.SqlSession;

import com.teamtop.gameCommon.GameProperties;
import com.teamtop.system.country.kingship.model.KingShipData;
import com.teamtop.util.db.trans.ObjStrTransUtil;
import com.teamtop.util.mybatis.MybatisUtil;

public class KingShipDao {
	public static KingShipDao ins;
	public static KingShipDao getIns() {
		if(ins == null) {
			ins = new KingShipDao();
		}
		return ins;
	}
	
	@SuppressWarnings("unchecked")
	public Map<Long, KingShipData> findKingShipData() {
		List<Integer> zoneids = GameProperties.zoneids;
		Map<Long, KingShipData> hashMap = new ConcurrentHashMap<Long, KingShipData>();
		for(int zoneid : zoneids) {
		SqlSession session = MybatisUtil.getSession(zoneid);
		try {
			KingShipMapper mapper = session.getMapper(KingShipMapper.class);
			List<Object> findKingShipData = mapper.findKingShipData();
			for(Object obj : findKingShipData) {
				Map<String, Object> map = (Map<String, Object>)obj;
				KingShipData kingShipData = null;
				try {
					String content = (String) map.get("kingShipData");
					if (content == null || content.equals("") || content.equals("{}")) {
						kingShipData = new KingShipData();
					}else {
						kingShipData = ObjStrTransUtil.toObj(content, KingShipData.class);
					}
					if(kingShipData == null) {
						kingShipData = new KingShipData();
					}
				} catch (Exception e) {
					e.printStackTrace();
				}
				
				hashMap.put((Long)map.get("hid"), kingShipData);
			}
		} finally {
			MybatisUtil.closeSession(session);
			}
		}
		return hashMap;
	}

}
