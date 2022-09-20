package com.teamtop.cross.connEvent;

import java.util.Map;

import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.CrossEnum;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.openDaysSystem.monsterKingSearchMonster.MonsterKingSearchMonsterSysCache;
import com.teamtop.system.openDaysSystem.monsterKingSearchMonster.model.MonsterKingSearchPartInfo;
import com.teamtop.util.log.LogTool;

import io.netty.channel.Channel;

public class MonsterKingSearchMonsterConnEvent extends CrossConnEvent {

	@Override
	public void conn(Channel channel) {
		try {
			int partId = CrossCache.getPartId(channel);
			Map<Integer, MonsterKingSearchPartInfo> partMap = MonsterKingSearchMonsterSysCache.getPartMap();
			MonsterKingSearchPartInfo info = partMap.get(partId);
			CrossData crossData = new CrossData();
			if (info == null) {
				crossData.putObject(CrossEnum.type.name(), -1);
			} else {
				crossData.putObject(CrossEnum.type.name(), 1);
				crossData.putObject(CrossEnum.data1.name(), info);
			}
			NettyWrite.writeXData(channel, CrossConst.CROSS_MK_SEARCH_MONSTER_CONN_CL, crossData);
		} catch (Exception e) {
			LogTool.error(e, MonsterKingSearchMonsterConnEvent.class, "MonsterKingSearchMonsterConnEvent conn");
		}
	}

}
