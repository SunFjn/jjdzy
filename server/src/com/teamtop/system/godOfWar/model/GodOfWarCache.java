package com.teamtop.system.godOfWar.model;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

import com.teamtop.gameCommon.GameProperties;
import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.godOfWar.GodOfWarConst;
import com.teamtop.system.godOfWar.GodOfWarFunction;
import com.teamtop.system.godOfWar.GodOfWarRankDao;
import com.teamtop.util.cache.union.UC;
import com.teamtop.util.log.LogTool;

import excel.config.Config_warbot_222;
import excel.struct.Struct_warbot_222;

public class GodOfWarCache extends AbsServerEvent{
	
	private static List<GodOfWarRank> godOfWarRankList = UC.reg("godOfWarRankList", Collections.synchronizedList(new ArrayList<GodOfWarRank>()));

	private static ConcurrentHashMap<Long, GodOfWarRank> godOfWarRankMap = UC.reg("godOfWarRankMap", new ConcurrentHashMap<Long, GodOfWarRank>());

	private static ConcurrentHashMap<Long, Integer> challengeMap = UC.reg("godOfWarChallengeMap", new ConcurrentHashMap<Long, Integer>());
	
	private static ConcurrentHashMap<Long, Object[]> challengeResultMap = UC.reg("godOfWarChallengeResultMap", new ConcurrentHashMap<Long, Object[]>());
	
	public static AtomicInteger totalRankSize = new AtomicInteger(GodOfWarConst.RANK_INIT_SIZE + 1);

	public static List<GodOfWarRank> getGodOfWarRankList() {
		return godOfWarRankList;
	}

	public static ConcurrentHashMap<Long, GodOfWarRank> getGodOfWarRankMap() {
		return godOfWarRankMap;
	}

	public static ConcurrentHashMap<Long, Integer> getChallengeMap() {
		return challengeMap;
	}

	public static ConcurrentHashMap<Long, Object[]> getChallengeResultMap() {
		return challengeResultMap;
	}

	@Override
	public void startServer() throws RunServerException {
		initRankList();
		List<GodOfWarRank> godOfWarRankList = GodOfWarCache.getGodOfWarRankList();
		int size = godOfWarRankList.size();
		if (size > GodOfWarConst.RANK_INIT_SIZE) {
			GodOfWarCache.totalRankSize.set(size + 1);
		}
	}

	/**
	 * 初始化排行榜
	 */
	public void initRankList() {
		try {
			List<GodOfWarRank> godOfWarRankList = GodOfWarCache.getGodOfWarRankList();
			ConcurrentHashMap<Long, GodOfWarRank> godOfWarRankMap = GodOfWarCache.getGodOfWarRankMap();
			List<GodOfWarRank> list = GodOfWarRankDao.getIns().findAllGodOfWarRank(GameProperties.zoneids.get(0));
			godOfWarRankList.addAll(list);
			if (godOfWarRankList.size() == 0) {
				// 初始化机器人进去
				List<Struct_warbot_222> sortList = Config_warbot_222.getIns().getSortList();
				int size = sortList.size();
				Struct_warbot_222 robot = null;
				for (int i = 0; i < size; i++) {
					robot = sortList.get(i);
					int[][] rank = robot.getRank();
					for (int j = rank[0][0]; j <= rank[0][1]; j++) {
						if (j > GodOfWarConst.RANK_INIT_SIZE) {
							break;
						}
						GodOfWarRank robotRank = new GodOfWarRank();
						robotRank.setHid(j);
						robotRank.setJob(robot.getJob());
						robotRank.setLevel(robot.getLv());
						robotRank.setName(robot.getName());
						robotRank.setStrength(robot.getPower());
						robotRank.setIcon(robot.getHead());
						robotRank.setFrame(robot.getHeadk());
						robotRank.setRanking(j);
						robotRank.setRobotId(robot.getId());
						robotRank.setZoneid(GameProperties.getFirstZoneId());
						godOfWarRankMap.put((long) j, robotRank);
					}
				}
				for(long i=1;i<=GodOfWarConst.RANK_INIT_SIZE;i++) {
					godOfWarRankList.add(godOfWarRankMap.get(i));
				}
				GodOfWarFunction.getIns().updateRankListCacheToDB();
			}else {
				int size = godOfWarRankList.size();
				for (int i = 0; i < size; i++) {
					GodOfWarRank rank = godOfWarRankList.get(i);
					godOfWarRankMap.put(rank.getHid(), rank);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, GodOfWarCache.class, "GodOfWar initRankList fail");
		}
	}

}
