package com.teamtop.system.scene;

import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;
import java.util.concurrent.ConcurrentSkipListSet;

import com.teamtop.system.NPC.NPC;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_map_200;
import excel.struct.Struct_map_200;

/**
 * 场景系统事件
 * @author Administrator
 *
 */
public class SceneEvent extends AbsSystemEvent {
	private static SceneEvent ins = null;
	public static SceneEvent getIns() {
		if (ins == null) {
			ins = new SceneEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero) {
		Scene scene = hero.getScene();
		if (scene==null) {
			scene=new Scene();
			scene.setHid(hero.getId());
			hero.setScene(scene);
		}
		scene.setSceneSysId(0);
		if(scene.getMoveSpeed()==0)
			scene.setMoveSpeed( SceneConst.SPEED_INIT);
	}

	@Override
	public void login(Hero hero) {
	}
	

	@Override
	public void logout(Hero hero) {
		SceneFunction.getIns().delHeroFromScene(hero);
		hero.getScene().setSceneSysId(0);
	}

	@Override
	public void loginReset(Hero hero,int now) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void fixTime(int cmdId, int now) {
		//check(now);
	}
	
	
	private void check(int now){
		//处理副本
		try {
			Iterator<Entry<Long, ConcurrentSkipListSet<NPC>>> it = SceneCache.copySceneNpcData.get().entrySet().iterator();
			while(it.hasNext()){
				Entry<Long, ConcurrentSkipListSet<NPC>> next = it.next();
				ConcurrentSkipListSet<NPC> set = next.getValue();
				if(set!=null){
					boolean del = false;
					for(NPC npc:set){
						if(now - npc.getCreateTime() > TimeDateUtil.ONE_DAY_INT){
							int sceneSysId = npc.getSceneSysId();
							Struct_map_200 map = Config_map_200.getIns().get(sceneSysId);
							if(map!=null){
								int type = map.getSevertype();
								if(type==SceneConst.IS_TASK_COPY_SCENE /*|| type==SceneConst.IS_ELITE_DUPLICATE_SCENE*/){
									del = true;
									SceneCache.removeFromNPCCache(npc.getId());
									LogTool.info("huishou npc,sceneid:"+sceneSysId+",npcid:"+npc.getSysId()+",createtime:"+npc.getCreateTime(), SceneEvent.class);
								}
							}
						}
					}
					try {
						if(del){
							it.remove();
							long sceneuid = next.getKey();
							ConcurrentSkipListSet<Hero> heroSet = SceneCache.copySceneHeroData.remove(sceneuid);
							if(heroSet!=null){
								heroSet.clear();
							}
						}
					} catch (Exception e) {
						LogTool.error(e, SceneEvent.class, "");
					}
				}
			}
		} catch (Exception e) {
			LogTool.error(e, SceneEvent.class, "");
		}
		
		//处理补给地图
		Iterator<Entry<Integer, Map<Long, Map<Integer, ConcurrentSkipListSet<Hero>>>>> it1 = SceneCache.supplySceneHeroData.get().entrySet().iterator();
		while(it1.hasNext()){
			Entry<Integer, Map<Long, Map<Integer, ConcurrentSkipListSet<Hero>>>> next = it1.next();
			Map<Long, Map<Integer, ConcurrentSkipListSet<Hero>>> v1 = next.getValue();
			Iterator<Entry<Long, Map<Integer, ConcurrentSkipListSet<Hero>>>> it2 = v1.entrySet().iterator();
			while(it2.hasNext()){
				Entry<Long, Map<Integer, ConcurrentSkipListSet<Hero>>> n2 = it2.next();
				Iterator<Entry<Integer, ConcurrentSkipListSet<Hero>>> it3 = n2.getValue().entrySet().iterator();
				while(it3.hasNext()){
					Entry<Integer, ConcurrentSkipListSet<Hero>> n3 = it3.next();
					Integer grid = n3.getKey();
					ConcurrentSkipListSet<Hero> set = n3.getValue();
					Iterator<Hero> it4 = set.iterator();
					while(it4.hasNext()){
						Hero hero = it4.next();
						if(!hero.isOnline()){
							LogTool.info("remove supply hero is not online,"+hero.getId()+",name:"+hero.getNameZoneid(), SceneEvent.class);
							it4.remove();
						}else{
							int posX = hero.getScene().getPosX();
							int posY = hero.getScene().getPosY();
							int rowcol = SceneFunction.getIns().getGridRowColMixByPosXY(posX, posY);
							if(grid!=rowcol){
								LogTool.info("remove supply hero is not online,"+hero.getId()+",name:"+hero.getNameZoneid()+",grid:"+grid+",rowcol:"+rowcol, SceneEvent.class);
								it4.remove();
							}
						}
					}
					if(set.size()==0){
						it3.remove();
					}
				}
			}
		}
	}
	
}
