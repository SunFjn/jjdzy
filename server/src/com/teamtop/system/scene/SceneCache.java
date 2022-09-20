package com.teamtop.system.scene;

import java.io.File;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentSkipListSet;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;

import com.teamtop.gameCommon.GamePath;
import com.teamtop.main.RunServerException;
import com.teamtop.system.NPC.NPC;
import com.teamtop.system.NPC.NPCType;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.scene.area.SceneCircleArea;
import com.teamtop.system.scene.area.ScenePosXYArea;
import com.teamtop.system.scene.area.SceneRectangleArea;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventFactory;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.astar.AStar;
import com.teamtop.util.cache.MapOneKey;
import com.teamtop.util.cache.MapThreeKey;
import com.teamtop.util.cache.MapTwoKey;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.db.trans.LMessageFormat;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_NPC_205;
import excel.config.Config_map_200;
import excel.struct.Struct_NPC_205;
import excel.struct.Struct_map_200;



/**
 * 场景缓存
 * 
 * @author Administrator
 * 
 */
public class SceneCache {
	/**
	 * 可行走区域缓存
	 */
	private static MapOneKey<Integer, ArrayList<RowCol>> canWalkMap = new MapOneKey<Integer, ArrayList<RowCol>>("canWalkMap", false);
	/**
	 * 阴影区域 key：sceneSysId，value:rowcol
	 */
	private static MapOneKey<Integer,ArrayList<RowCol>> shadowMap = new MapOneKey<Integer,ArrayList<RowCol>>("shadowMap", false);
	/**
	 * 二维数组保存的可行走区域
	 */
	private static MapOneKey<Integer,Canwalk> canWalkArr = new MapOneKey<Integer, Canwalk>("canWalkArr", false);
	/**
	 * 跳转到补给地图的跳转点缓存<br/>
	 * key1:场景id ,key2:新场景id,value:坐标
	 */
	private static MapTwoKey<Integer, Integer, SceneJumpPoint> jumpPointMap = new MapTwoKey<Integer, Integer, SceneJumpPoint>("jumpPointMap", false);
	/**
	 * 开始点缓存<br/>
	 * key:场景系统id,value:起始点 posX=pos/10000,posY=pos%10000
	 */
	public static MapOneKey<Integer, ScenePosXYArea> startPointMap = new MapOneKey<Integer, ScenePosXYArea>("startPointMap", false);
	/**
	 * 系统副本缓存
	 */
	private static MapOneKey<Integer, CopyScene> copySceneMap = new MapOneKey<Integer, CopyScene>("copySceneMap", false);
	/**
	 * 线路数量缓存,冗余数据 key:线路,value:容量
	 */
	public static MapOneKey<Integer, Integer> lineSizeMap = new MapOneKey<Integer, Integer>("lineSizeMap", true);

	/**
	 * 分线方式 默认是填充分线
	 */
	public static int lineMode = SceneConst.MODE_LINE_FULL;
	/**
	 * 分线最大的线路(平均模式)
	 */
	public static int MAX_LINE = 5;
	/**
	 * 每条线路最大人数(填充模式)
	 */
	public static int MAX_NUM_ONE_LINE = 500;
	/**
	 * 计算队员与队长距离角度数组
	 */
	public static int ANGEL_ARR[] = new int[] { 190, 200, 220, 240, 180, 150, 120, 90, 60, 30, 360, 330, 300, 270 };
	/**
	 * 局部广播的地图类型
	 */
	private static ArrayList<Integer> boardCastList = new ArrayList<Integer>(10);
	/**
	 * 被分线的场景
	 */
	public static List<Integer> lineSceneCache = Collections.synchronizedList(new ArrayList<Integer>());
	/**
	 * 分线锁
	 */
	private static Object lineLock = new Object();
	/**
	 * 线路数量缓存,冗余数据 key:线路,value:容量
	 */
	private static MapOneKey<Integer, Integer> lineSizeData = new MapOneKey<>("lineSizeData", true);
	/**
	 * 补给地图玩家数据<br/>
	 * key1:线路,key2:补给地图唯一id,key3:格子,value:hero的集合
	 */
	public static MapThreeKey<Integer, Long, Integer, ConcurrentSkipListSet<Hero>> supplySceneHeroData = 
			new MapThreeKey<Integer, Long, Integer, ConcurrentSkipListSet<Hero>>("supplySceneHeroData",true);
	/**
	 * npc在补给地图的缓存 key1:地图唯一id key:格子 value:npc的集合
	 */
	public static MapTwoKey<Long, Integer, ConcurrentSkipListSet<NPC>> supplySceneNpcCache = new MapTwoKey<Long, Integer, ConcurrentSkipListSet<NPC>>("supplySceneNpcCache", true);
	/**
	 * 挂机机器人的场景缓存 key1:地图唯一id key:格子 value:机器人的集合
	 */
/*	public static MapTwoKey<Integer, Integer, ConcurrentSkipListSet<HangRobbert>> hangRobbertSceneCache = new MapTwoKey<Integer, Integer, ConcurrentSkipListSet<HangRobbert>>("hangRobbertSceneCache", true);
	*//**
	 * 挂机机器人缓存 key:玩家id
	 *//*
	public static MapOneKey<Long, HangRobbert> hangRobbertCache = new MapOneKey<Long, HangRobbert>("hangRobbertCache", true);*/
	
	/**
	 * 副本地图玩家数据<br/>
	 * key:副本唯一id,value:hero的集合
	 */
	public static MapOneKey<Long, ConcurrentSkipListSet<Hero>> copySceneHeroData = new MapOneKey<Long, ConcurrentSkipListSet<Hero>>("copySceneHeroData", true);
	/**
	 * 副本地图npc数据<br/>
	 * key:副本唯一id,value:npc的集合
	 */
	public static MapOneKey<Long, ConcurrentSkipListSet<NPC>> copySceneNpcData = new MapOneKey<Long, ConcurrentSkipListSet<NPC>>("copySceneNpcData", true);
	/**
	 * NPC缓存 key:npc唯一id
	 */
	public static MapOneKey<Long, NPC> npcCache = new MapOneKey<Long, NPC>("npcCache", true);
	/**
	 * NPC缓存 key:npc系统id，用于不发送到前端的npc验证，如提交任务 读取地图文件得到的npcsysid
	 */
	public static MapTwoKey<Integer,Integer, int[]> npcSysCache = new MapTwoKey<Integer,Integer, int[]>("npcSysCache", true);
	
	/**
	 * NPC唯一ID
	 */
	private static AtomicLong npcUnitId = new AtomicLong(-1l);
	/**
	 * 副本唯一ID
	 */
	private static AtomicInteger copySceneUnitId = new AtomicInteger(2);
	public static int baseSceneUnitIdOnStart = 0;
	/**
	 * 补给地图广播的数量
	 */
	public static int boardNum = 10;
	/**
	 * 已经加载过的地图
	 */
	private static List<Integer> loadedScene = new ArrayList<Integer>();
	/**
	 * 长方形区域
	 * key：sceneSysId，value：pe
	 */
//	private static MapOneKey<Integer,ProbabilityEventModel> rectAreaMap = new MapOneKey<Integer, ProbabilityEventModel>("rectAreaMap",false);
	/**
	 * 长方形区域(取随机出生点用)<br/>
	 * 矩形，适用于地图中有多个矩形元素，且只有矩形元素，从所有矩形中随机抽取出生点
	 * key：sceneSysId，value：pe
	 */
	private static MapOneKey<Integer,ProbabilityEventModel> birthRectAreaMap = new MapOneKey<Integer, ProbabilityEventModel>("birthRectAreaMap",false);
	/**
	 * 圆区域缓存(取随机出生点用)<br/>
	 * 圆形，适用于地图中有多个圆形元素，且只有圆形元素，从所有圆中随机抽取出生点
	 * key:场景系统id, pe
	 */
	private static MapOneKey<Integer, ProbabilityEventModel> circleAreaMap = new MapOneKey<Integer, ProbabilityEventModel>("circleAreaMap", false);
	/**
	 * 圆区+矩形域缓存(取随机出生点用)<br/>
	 * key:场景系统id, pe
	 */
	private static MapOneKey<Integer, ProbabilityEventModel> circleRectAreaMap = new MapOneKey<Integer, ProbabilityEventModel>("circleRectAreaMap", false);
	/**
	 * 初始化局部广播类型
	 */
	public static void initBoardCast() {
		boardCastList.add(SceneConst.IS_SUPPLY_SCENE);
		boardCastList.add(SceneConst.IS_WEN_DING_TIAN_DAO);
		boardCastList.add(SceneConst.ZCBOSS);
		boardCastList.add(SceneConst.CROSS_ZCBOSS);
		boardCastList.add(SceneConst.UNIFYCOUNTRY);
		boardCastList.add(SceneConst.BATTLEGOODS);
		boardCastList.add(SceneConst.THREE_HERO_FIGHT_LVBU);
		boardCastList.add(SceneConst.HOUSE);
		boardCastList.add(SceneConst.YANHUI);
	}
	
	private static Map<Long, Boolean> sceneControl = new ConcurrentHashMap<Long, Boolean>();
	/**
	 * 场景类型应该由哪个服务器接收
	 */
	private static Map<Integer, Integer> sceneControlType = new HashMap<Integer, Integer>();
	
	public static void initSceneControlType(){
		sceneControlType.put(SceneConst.IS_SUPPLY_SCENE, SceneConst.SCENE_CONTROL_CROSS);
		sceneControlType.put(SceneConst.IS_WEN_DING_TIAN_DAO, SceneConst.SCENE_CONTROL_CROSS);
	}
	public static boolean isCrossSceneControl(int sceneSysId){
		Struct_map_200 Struct_map_200 = Config_map_200.getIns().get(sceneSysId);
		int type = Struct_map_200.getSevertype();
		Integer control = sceneControlType.get(type);
		if(control==null) return false;
		return control==SceneConst.SCENE_CONTROL_CROSS;
	}
	public static void setSceneControl(long hid,boolean control){
		sceneControl.put(hid, control);
	}
	public static boolean getSceneControl(long hid){
		return sceneControl.get(hid);
	}
	/**
	 * 是否进行局部广播
	 * 
	 * @param type
	 * @return
	 */
	public static boolean boardSupplyWay(int type) {
		return boardCastList.contains(type);
	}

	public static synchronized long getNPCUnitId() {
		if (npcUnitId.get() <= -20000000)
			npcUnitId.set(-1);
		return npcUnitId.getAndDecrement();
	}

	public static synchronized int getSceneUnitId() {
		if (copySceneUnitId.get() >= Integer.MAX_VALUE)
			copySceneUnitId.set(2);
		return copySceneUnitId.getAndIncrement();
	}

	public static void main(String[] args) throws RunServerException {
		/*File file = new File(GamePath.USER_DIR + GamePath.SEP + "bin" + GamePath.SEP + "com"
				+ GamePath.SEP + "teamtop"+ GamePath.SEP+"system"+ GamePath.SEP+"scene"+ GamePath.SEP+"sceneFile");
		File[] listFiles = file.listFiles();
		for(File f:listFiles){
			long a = System.currentTimeMillis();
			String name = f.getName();
			int sceneid = Integer.parseInt(name.substring(0, name.indexOf(".mcf")));
			doReadScene(sceneid);
			long b = System.currentTimeMillis();
			System.err.println("time:" + (b - a) + " ms");
		}*/
		doReadScene(30021001);
	}

	/**
	 * 读取地图文件
	 * 
	 * @throws RunServerException
	 */
	public static void readSceneFile() throws RunServerException {
		File file = new File(GamePath.USER_DIR + GamePath.SEP + "bin" + GamePath.SEP + "com"
				+ GamePath.SEP + "teamtop"+ GamePath.SEP+"system"+ GamePath.SEP+"scene"+ GamePath.SEP+"sceneFile");
		File[] listFiles = file.listFiles();
		for(File f:listFiles){
			String name = f.getName();
			int sceneid = Integer.parseInt(name.substring(0, name.indexOf(".mcf")));
			doReadScene(sceneid);
		}
	}
	
	public static void initSceneUnitId(){
		int currentTime = TimeDateUtil.getCurrentTime();
		baseSceneUnitIdOnStart = currentTime;
		copySceneUnitId.set(currentTime);
	}
	/*private static void readSceneFile0(int sceneid){
		File file = new File(FileUtils.getAbsFilePath("com/teamtop/system/scene/sceneFile/scene"+sceneid+".map"));
		readSceneFile0(file);
	}*/
	@SuppressWarnings("unused")
	private static void testAstar(Canwalk canwalk,List<RowCol> list){
		int[][] map = canwalk.getCanwalk();
//		int pos1 = SceneEventFunction.getNewPosByRandom(list);
//		int pos2 = SceneEventFunction.getNewPosByRandom(list);
//		int pos1 = 250155;
//		int pos2 = 390090;
//		System.err.println("pos1:"+pos1+",pos2:"+pos2);
//		int row1 = pos1/SceneConst.GRID_MIX;
//		int col1 = pos1%SceneConst.GRID_MIX;
//		int row2 = pos2/SceneConst.GRID_MIX;
//		int col2 = pos2%SceneConst.GRID_MIX;
//		posX:3376,posY:1648
//		posX:1424,posY:3120
//		posX:1104,posY:2960
		AStar aStar=new AStar(map, canwalk.getRow(), canwalk.getCol());
		int row1 = 1328/SceneConst.CANWARL_POSX_TRANS;
		int col1 = 3344/SceneConst.CANWARL_POSX_TRANS;
		int row2 = 2960/SceneConst.CANWARL_POSX_TRANS;
		int col2 = 1104/SceneConst.CANWARL_POSX_TRANS;
        int[][] flag=aStar.searchByRowCol(row1,col1,row2,col2);
//		int[][] flag=aStar.search(1424/SceneConst.CANWARL_POSX_TRANS,3184/SceneConst.CANWARL_POSX_TRANS,2960/SceneConst.CANWARL_POSX_TRANS,1104/SceneConst.CANWARL_POSX_TRANS);
        if(flag!=null){
            System.out.println("传输数据有误！");
        }else{
        	System.out.println(Arrays.deepToString(flag));
            for(int row=0;row< canwalk.getRow();row++){
                for(int col=0;col< canwalk.getCol();col++){
                    if(map[row][col]==1){
                        System.out.print("1");
                    }else if(map[row][col]==0){
                        System.out.print("0");
                    }else if(map[row][col]==2){//输出搜索路径
                    	if(row==row1 && col==col1){
                    		System.out.print("S");
                    	}else if(row==row2 && col==col2){
                    		System.out.print("E");
                    	}else{
                    		System.out.print("#");
                    	}
                    }else{
                    	System.err.println("kao:"+map[row][col]);
                    }
                }
                System.out.println();
            }
        }
	}
	@SuppressWarnings("unchecked")
	public static void doReadScene(int sceneid){
		if(loadedScene.contains(sceneid)) return;
		Struct_map_200 struct_map = Config_map_200.getIns().get(sceneid);
		if(struct_map==null){
//			LogTool.warn("doReadScene is null,sceneid:"+sceneid);
			return;
		}
		int sceneType = struct_map.getSevertype();
		if (sceneType==0) {
			return;
		}
		int mapUrl = struct_map.getS();//资源ID
		String filePath = GamePath.USER_DIR+"/bin/"+"com/teamtop/system/scene/sceneFile/"+mapUrl+".mcf";
		Object data = LMessageFormat.read(filePath);
		Map<String,Object> dataMap = (Map<String, Object>) data;
		//初始化
		initMapCache(mapUrl, sceneid, dataMap);
//		System.err.println("sceneid:"+sceneid+",height:"+height+",width:"+width);
		
		CopyScene copyScene = null;
		if (!boardCastList.contains(sceneType)) {
			copyScene = new CopyScene();
			copyScene.setSysId(sceneid);
		}
//		List<SceneRectangleArea> gangSideArea = null;
//		List<SceneRectangleArea> rectArea = null;
//		List<SceneRectangleArea> birthRectArea = null;
		List<SceneRectangleArea> randomBornRectArea = null;
		List<SceneCircleArea> randomBornCircleArea = null;
		List<Object> randomCircleRectArea = null;
		
//		testAstar(canwalk,areas);
//		System.err.println("sceneid:"+sceneid+","+name);
		List<Object> itemArr = (List<Object>) dataMap.get("items");
		for(Object itemObj:itemArr){
			Map<String,Object> itemMap = (Map<String, Object>) itemObj;
//			String itemName = (String) itemMap.get("name");
			List<Object> item1Arr = (List<Object>) itemMap.get("items");
			for(Object item1Obj:item1Arr){
				Map<String,Object> infoMap = (Map<String, Object>) item1Obj;
				String group = (String) infoMap.get("group");
				String type = (String) infoMap.get("type");
				int itemId = CommonUtil.transforObjtoInt(infoMap.get("sysID"));
				int posX = CommonUtil.transforObjtoInt(infoMap.get("x"));
				int posY = CommonUtil.transforObjtoInt(infoMap.get("y"));
//				System.err.println("infoMap:"+infoMap);
				//////////////1.根据关键字处理地图
				if("demo".equals(group) || "default".equals(group) || group.indexOf("wave")==0){
					if("npc".equals(type)){
						Struct_NPC_205 struct_NPC_307 = Config_NPC_205.getIns().get(itemId);
						if(struct_NPC_307 == null){
							LogTool.warn(("sceneid:"+sceneid+" has not npcid:"+itemId),SceneCache.class);
							continue;
						}
						int leixing = struct_NPC_307.getLeixing();
						if(leixing==NPCType.TYPE_FUN || leixing==NPCType.TYPE_TASK || leixing==NPCType.TYPE_DAILY_NPC){
							//功能NPC和任务NPC同时只有一个
							npcSysCache.put(sceneid, itemId, new int[]{posX,posY});
							continue;
						}
						if (sceneType == SceneConst.IS_SUPPLY_SCENE) {
							// 补给地图(局部广播地图)
							SceneFunction.getIns().addNpcToScene(itemId, posX, posY,-1, sceneid, sceneid, false);//加入场景
						} else if (!boardCastList.contains(sceneType)) {
							// 全局广播地图
							CopySceneItem item = new CopySceneItem();
							item.setItemId(itemId);
							item.setItemType(SceneConst.NPC);
							item.setItemX(posX);
							item.setItemY(posY);
							if(group.indexOf("wave")==0){
								String index = group.substring(4, group.length());
								item.setWave(CommonUtil.transforObjtoInt(index));
								copyScene.addToWaveItems(item);
							}else{
								copyScene.addToItems(item);
							}
						}
					}
				}else if("bron".equals(group)||"born".equals(group)){
					//出生点，该地图只有1个出生点
					startPointMap.put(sceneid, new ScenePosXYArea(posX, posY));
//					System.err.println("posX:"+posX+",posY:"+posY);
//				}else if("validArea".equals(group)){
//					//特定的矩形区域，可用于群雄逐鹿刷宝箱
//					int w = CommonUtil.transforObjtoInt(infoMap.get("width"));
//					int h = CommonUtil.transforObjtoInt(infoMap.get("height"));
//					if(rectArea==null){
//						rectArea = new ArrayList<SceneRectangleArea>();
//					}
//					SceneRectangleArea sceneRectArea = new SceneRectangleArea(posX, posY, w, h);
//					rectArea.add(sceneRectArea);
//				}else if("SideArea".equals(group)){
//					int w = CommonUtil.transforObjtoInt(infoMap.get("width"));
//					int h = CommonUtil.transforObjtoInt(infoMap.get("height"));
//					if(gangSideArea==null){
//						gangSideArea = new ArrayList<SceneRectangleArea>();
//					}
//					SceneRectangleArea sceneRectArea = new SceneRectangleArea(posX, posY, w, h);
//					gangSideArea.add(sceneRectArea);
//				}else if("bronRect".equals(group)){
//					//方形
//					int w = CommonUtil.transforObjtoInt(infoMap.get("width"));
//					int h = CommonUtil.transforObjtoInt(infoMap.get("height"));
//					if(birthRectArea==null){
//						birthRectArea = new ArrayList<SceneRectangleArea>();
//					}
//					SceneRectangleArea sceneRectArea = new SceneRectangleArea(posX, posY, w, h);
//					birthRectArea.add(sceneRectArea);
				}else if(SceneConst.rdRectBorn.equals(group)){//叫策划录地图时用 rdRectBorn 关键字
					//矩形，适用于地图中有多个矩形元素，且只有矩形元素，从所有矩形中随机抽取出生点
					int w = CommonUtil.transforObjtoInt(infoMap.get("width"));
					int h = CommonUtil.transforObjtoInt(infoMap.get("height"));
					if(randomBornRectArea==null){
						randomBornRectArea = new ArrayList<SceneRectangleArea>();
					}
					SceneRectangleArea sceneRectArea = new SceneRectangleArea(posX, posY, w, h);
					randomBornRectArea.add(sceneRectArea);
				}else if(SceneConst.rdCircleBorn.equals(group)){//叫策划录地图时用 rdCircleBorn 关键字
					//圆形，适用于地图中有多个圆形元素，且只有圆形元素，从所有圆中随机抽取出生点
					int x = CommonUtil.transforObjtoInt(infoMap.get("x"));
					int y = CommonUtil.transforObjtoInt(infoMap.get("y"));
					int radius = CommonUtil.transforObjtoInt(infoMap.get("radius"));
					SceneCircleArea area = new SceneCircleArea( x, y, radius);
					if(randomBornCircleArea==null)
						randomBornCircleArea = new ArrayList<>();
					randomBornCircleArea.add(area);
				}else if(SceneConst.rdCircleRect.equals(group)){//叫策划录地图时用 rdCircleRect 关键字
					//矩形+圆形随机出生点，地图含2中元素区域随机出生点
					//矩形
					int w = CommonUtil.transforObjtoInt(infoMap.get("width"));
					int h = CommonUtil.transforObjtoInt(infoMap.get("height"));
					if(randomCircleRectArea==null){
						randomCircleRectArea = new ArrayList<Object>();
					}
					if(w!=0|| h!=0) {
						SceneRectangleArea sceneRectArea = new SceneRectangleArea(posX, posY, w, h);
						randomCircleRectArea.add(sceneRectArea);
					}
					
					//圆形
					int x = CommonUtil.transforObjtoInt(infoMap.get("x"));
					int y = CommonUtil.transforObjtoInt(infoMap.get("y"));
					int radius = CommonUtil.transforObjtoInt(infoMap.get("radius"));
					SceneCircleArea area = new SceneCircleArea( x, y, radius);
					if(x!=0|| y!=0|| radius!=0) {
						randomBornCircleArea.add(area);
					}
				}else if("rdBorn".equals(group)){//叫策划录地图时用 rdBorn 关键字
					//多个点，随机出生点
					//还没地方用到，未实现，哈哈哈
				}
				
				//////////////2.根据类型处理地图
				if("transpoint".equals(type)){
					//跳转点
					//style=transpoint, rotation=0, distmapy=512, distmapx=512, group=default, type=transpoint, distmapid=30010006, y=906, x=2074
					int distmapid = CommonUtil.transforObjtoInt(infoMap.get("distmapid"));
					int distmapx = CommonUtil.transforObjtoInt(infoMap.get("distmapx"));
					int distmapy = CommonUtil.transforObjtoInt(infoMap.get("distmapy"));
					int x = CommonUtil.transforObjtoInt(infoMap.get("x"));
					int y = CommonUtil.transforObjtoInt(infoMap.get("y"));
					jumpPointMap.put(0, distmapid, new SceneJumpPoint(sceneid, x, y, distmapid, distmapx, distmapy));
				}else if("point".equals(type)){
					//圆形
				}else if("rect".equals(type)){
					//矩形
				}
				
				//////////////3.根据地图ID处理地图
//				if(sceneid== SceneConst.SCENE_ID_WDTX1||sceneid== SceneConst.SCENE_ID_WDTX2|| sceneid== SceneConst.SCENE_ID_WDTX3|| 
//						sceneid== SceneConst.SCENE_ID_WDTX4|| sceneid== SceneConst.SCENE_ID_WDTX5|| sceneid== SceneConst.SCENE_ID_WDTX6||
//						sceneid== SceneConst.SCENE_ID_WDTX7){
//					//问鼎天下地图，出生点圆形区域   暂时没用
//					if("born".equals(group)){
//						int x = CommonUtil.transforObjtoInt(infoMap.get("x"));
//						int y = CommonUtil.transforObjtoInt(infoMap.get("y"));
//						int radius = CommonUtil.transforObjtoInt(infoMap.get("radius"));
//						SceneCircleArea area = new SceneCircleArea( x, y, radius);
//						CrossWenDingTianXiaCrossCache.getWdtxCircleAreaMap().put( sceneid, area);
//					}
//				}
			}
		}
		
//		if(rectArea!=null){
//			ProbabilityEventModel pe = ProbabilityEventFactory.getProbabilityEvent();
//			for(SceneRectangleArea area:rectArea){
//				int t = area.getH() * area.getW();
//				pe.addProbabilityEvent(t,area);
//			}
//			rectAreaMap.put(sceneid, pe);
//		}
//		if(birthRectArea != null){
//			ProbabilityEventModel pe = ProbabilityEventFactory.getProbabilityEvent();
//			for(SceneRectangleArea area:birthRectArea){
//				int t = area.getH() * area.getW();
//				pe.addProbabilityEvent(t,area);
//			}
//			birthRectAreaMap.put(sceneid, pe);
//		}
		if(randomBornRectArea != null){
			ProbabilityEventModel pe = ProbabilityEventFactory.getProbabilityEvent();
			for(SceneRectangleArea area:randomBornRectArea){
				int t = area.getH() * area.getW();
				pe.addProbabilityEvent(t,area);
			}
			birthRectAreaMap.put(sceneid, pe);
		}
		if(randomBornCircleArea != null){
			ProbabilityEventModel pe = ProbabilityEventFactory.getProbabilityEvent();
			for( SceneCircleArea area:randomBornCircleArea) {
				int radius = area.getRadius();
				int t = (int)(radius*radius*3.14f);
				pe.addProbabilityEvent( t, area);
			}
			circleAreaMap.put(sceneid, pe);
		}
		if(randomCircleRectArea != null){
			ProbabilityEventModel pe = ProbabilityEventFactory.getProbabilityEvent();
			for( Object area:randomBornCircleArea) {
				int acreage = 0;
				if(area instanceof SceneRectangleArea) {
					SceneRectangleArea areaTemp = (SceneRectangleArea)area;
					acreage = areaTemp.getH() * areaTemp.getW();
				}else {
					SceneCircleArea areaTemp = (SceneCircleArea)area;
					int radius = areaTemp.getRadius();
					acreage = (int)(radius*radius*3.14f);
				}
				pe.addProbabilityEvent( acreage, area);
			}
			circleRectAreaMap.put(sceneid, pe);
		}
		if (!boardCastList.contains(sceneType)) {
			copySceneMap.put(sceneid, copyScene);
		}
		loadedScene.add(sceneid);
	}

	/**
	 * 初始化可行走区域缓存、阴影区域、二维数组保存的可行走区域
	 */
	private static void initMapCache(int mapUrl, int sceneid, Map<String,Object> dataMap) {
		int colSize = 0;
		ArrayList<RowCol> existAreas = canWalkMap.get(mapUrl);
		Canwalk existCanwalk = canWalkArr.get(mapUrl);
		ArrayList<RowCol> existShadow = shadowMap.get(mapUrl);
		if(existAreas!=null && existCanwalk!=null && existShadow!=null){
			canWalkMap.put(sceneid, existAreas);
			shadowMap.put(sceneid, existShadow);
			canWalkArr.put(sceneid, existCanwalk);
		}else{
			ArrayList<RowCol> areas = new ArrayList<RowCol>();
			ArrayList<RowCol> shadows = new ArrayList<RowCol>();
			// 保存可行走区
			List<Object> tileArr = (List<Object>) dataMap.get("tile");
			int tileArrSize = tileArr.size();
			int[][] canWalkarr = new int[tileArrSize][]; 
			
			for(int row=0;row<tileArrSize;row++){
				List<Object> tile1Arr=(List<Object>) tileArr.get(row);
				int tile1ArrSize = tile1Arr.size();
				colSize = tile1ArrSize;
//				System.err.println(colSize);
				canWalkarr[row] = new int[tile1ArrSize];
				for(int col=0;col<tile1ArrSize;col++){
					Object obj = tile1Arr.get(col);
					int tile1 = 0;
					if(obj!=null){
						tile1 = Integer.parseInt(obj.toString());
					}
					int astarData = 0;
					if((tile1 & 2)>0){
						//阴影区域
						shadows.add(new RowCol(row, col));
						astarData = 1;
					}else if((tile1 & 1)>0){
						//可行走区域
						areas.add(new RowCol(row, col));
						astarData = 1;
					}
					canWalkarr[row][col] = astarData;
//					System.err.print(tile1);
				}
//				System.err.println();
			}
			canWalkMap.put(sceneid, areas);
			shadowMap.put(sceneid, shadows);
			Canwalk canwalk = new Canwalk(canWalkarr,tileArrSize,colSize);
			canWalkArr.put(sceneid, canwalk);
		}
	}
	
	/**
	 * 角色进入游戏时，申请线路 分配方式:在确保第一条线路有X人情况下,在现在有的线路中寻找最小数量值,分配到此条线路.<br/>
	 * 线路可以通过后台增加,这种方式对于减压更好
	 * 
	 * @param sceneSysId
	 *            场景系统id
	 * @return 分配好的线路 不是新手地图不分线 统一返回1线路
	 */
	public static int getRoleSupplySceneLineOnAverage(Integer sceneSysId) {
		/*if (!lineSceneCache.contains(sceneSysId)) {
			// 不是分线地图不分线 统一返回1线路
			// System.err.println(LogFormat.rec("不是新手地图不分线 统一返回1线路,sceneSysId:"+sceneSysId));
			return 1;
		}
		int line = 0;
		synchronized (lineLock) {
			int lineSize = supplySceneHeroData.get().size();
			if (lineSize == 1 && lineSizeData.get(1) <= SceneConst.ROLE_NUM_LINE_ONE_FIRST_SCENE) {
				// 保证第一条线路有X人
				// System.err.println(LogFormat.rec("保证第一条线路有X人,sceneSysId:"+sceneSysId+",linesize:"+lineSize+",num:"+lineSizeData.get(1)));
				return 1;
			} else if (lineSize < SceneCache.MAX_LINE) {
				// 直接加入到新线路
				line = lineSize + 1;
				lineSizeData.put(line, 0); // 维护lineSizeData缓存
				// System.err.println(LogFormat.rec("直接加入到新线路,sceneSysId:"+sceneSysId+",line:"+line));
			} else {
				int maxNum = 0;
				for (Entry<Integer, Integer> entry : lineSizeData.get().entrySet()) {
					if (entry.getValue() < maxNum || maxNum == 0) {
						maxNum = entry.getValue();
						line = entry.getKey();
					}
				}
				// System.err.println(LogFormat.rec("使用线路,sceneSysId:"+sceneSysId+",line:"+line+",num:"+maxNum));
			}
		}*/
		return 1;
	}

	/**
	 * 角色进入游戏时,申请线路,分配方式:达到一条线路的上限人数时,自动增加新的线路,优先选择前面的线路<br/>
	 * 可以通过设定每条线路的人数来控制什么时候增加线路
	 * 
	 * @param sceneSysId
	 *            场景系统id
	 * @return 分配好的线路 不是新手地图不分线 统一返回1线路
	 */
	public static int getRoleSupplySceneLineOnFull(int sceneSysId) {
		if (!lineSceneCache.contains(sceneSysId)) {
			// 不是分线地图不分线 统一返回1线路
			// logger.info(LogFormat.rec("不是新手地图不分线 统一返回1线路,sceneSysId:"+sceneSysId));
			return 1;
		}
		int line = 0;
		synchronized (lineLock) {
			for (Entry<Integer, Integer> entry : lineSizeData.get().entrySet()) {
				if (entry.getValue() < SceneCache.MAX_NUM_ONE_LINE) {
					// 这条线路还没有满人 继续加人
					line = entry.getKey();
					// System.err.println("这条线路还没有满人 继续加人,分配线路:"+line+",当前人数:"+entry.getValue());
					break;
				}
			}
			if (line == 0) {
				// 所有线路都满人了 或者没有线路
				line = supplySceneHeroData.get().size() + 1;
				lineSizeData.put(line, 0);
				// System.err.println("所有线路都满人了 或者没有线路,分配线路:"+line);
			}
		}
		return line;
	}

	/**
	 * 将场景加入分线
	 * 
	 * @param sceneSysId
	 *            场景系统id
	 */
	public static void addLineScene(Integer sceneSysId) {
		if (!lineSceneCache.contains(sceneSysId)) {
			lineSceneCache.add(sceneSysId);
		}
	}

	/**
	 * 设置场景不分线
	 * 
	 * @param sceneSysId
	 *            场景系统id
	 */
	public static void removeLineScene(Integer sceneSysId) {
		lineSceneCache.remove(sceneSysId);
	}

	public static void addToNPCCache(NPC npc) {
		if (npc != null) {
			npcCache.put(npc.getId(), npc);
		}
	}

	public static NPC getFromNPCCache(long id) {
		return npcCache.get(id);
	}
	public static NPC removeFromNPCCache(long id){
		return npcCache.remove(id);
	}
	/**
	 * 加入挂机机器人缓存
	 * @param sceneuid 场景唯一id
	 * @param grid 格子
	 * @param hb 
	 */
	/*public static void addHangRobbert(int sceneuid,int grid,HangRobbert hb){
		if(hangRobbertCache.get().containsKey(hb.getHid())) return;
		ConcurrentSkipListSet<HangRobbert> set = hangRobbertSceneCache.get(sceneuid, grid);
		if(set==null){
			set = new ConcurrentSkipListSet<HangRobbert>();
			hangRobbertSceneCache.put(sceneuid, grid, set);
		}
		set.add(hb);
		hangRobbertCache.put(hb.getHid(), hb);
	}
	
	public static ConcurrentSkipListSet<HangRobbert> getHangRobbertSet(int sceneuid,int grid){
		return hangRobbertSceneCache.get(sceneuid, grid);
	}
	public static Map<Long, HangRobbert> getHangRobbertMap(){
		return hangRobbertCache.get();
	}
	*//**
	 * 获取挂机机器人
	 * @param hid
	 * @return
	 *//*
	public static HangRobbert getHangRobbert(long hid){
		return hangRobbertCache.get(hid);
	}
	*//**
	 * 移除挂机机器人
	 * @param sceneuid
	 * @param grid
	 * @param hb
	 *//*
	public static void removeHangRobbert(int sceneuid,int grid,HangRobbert hb){
		hangRobbertCache.remove(hb.getHid());
		ConcurrentSkipListSet<HangRobbert> set = hangRobbertSceneCache.get(sceneuid, grid);
		if(set!=null){
			set.remove(hb);
			if(set.size()==0){
				hangRobbertSceneCache.remove(sceneuid, grid);
			}
		}
	}*/
	/**
	 * 增加hero到补给地图缓存
	 * @param sceneId
	 * @param rowCol
	 * @param hero
	 * @param line
	 * @param checkLine
	 */
	public static void addHeroToSupplyScene(long sceneId, int rowCol, Hero hero, int line, boolean checkLine) {
		// 所有线路数据
		Map<Long, Map<Integer, ConcurrentSkipListSet<Hero>>> lineData = supplySceneHeroData.get(line);
		if (lineData == null) {
			lineData = new ConcurrentHashMap<Long, Map<Integer, ConcurrentSkipListSet<Hero>>>();
			supplySceneHeroData.put(line, lineData);
		}
		// 所有格子数据
		Map<Integer, ConcurrentSkipListSet<Hero>> gridData = lineData.get(sceneId);
		if (gridData == null) {
			gridData = new ConcurrentHashMap<Integer, ConcurrentSkipListSet<Hero>>();
			lineData.put(sceneId, gridData);
		}
		// 这个格子的所有角色
		ConcurrentSkipListSet<Hero> data = gridData.get(rowCol);
		if (data == null) {
			data = new ConcurrentSkipListSet<Hero>();
			gridData.put(rowCol, data);
		}
		if (data.add(hero)) {
//			System.err.println("添加角色:"+hero.getNameZoneid()+" 到场景"+sceneId+" grid:"+rowCol+" x:"+hero.getScene().getPosX()+" y:"+hero.getScene().getPosY());//TODO
			if(checkLine){
				// 维护lineSizeData缓存
				Integer num = lineSizeData.get(line);
				if (num == null) {
					num = 0;
				}
				num++;
//				System.err.println(hero.getNameZoneid()+"加入补给地图缓存,sceneSysId:"+sceneId+"line:"+line+",size:"+num);
				lineSizeData.put(line, num);
			}
		}else{
//			System.err.println("添加角色失败:"+hero.getNameZoneid()+" 到场景"+sceneId+" grid:"+rowCol+" x:"+hero.getScene().getPosX()+" y:"+hero.getScene().getPosY());//TODO
//			System.err.println("add hero fail:"+hero.getNameZoneid()+",grid:"+rowCol);
		}
	}
	/**
	 * 补给地图缓存移除hero
	 * @param sceneId
	 * @param rowCol
	 * @param unitId
	 * @param line
	 * @param checkLine
	 */
	public static void removeFromSupplyScene(long sceneId, int rowCol, Hero hero, int line, boolean checkLine) {
		Map<Long, Map<Integer, ConcurrentSkipListSet<Hero>>> lineData = supplySceneHeroData.get(line);
		if (lineData == null) {
			return;
		}
		Map<Integer, ConcurrentSkipListSet<Hero>> sceneData = lineData.get(sceneId);
		if (sceneData == null)
			return;
		ConcurrentSkipListSet<Hero> data = sceneData.get(rowCol);
		if (data != null) {
			if (data.remove(hero)) {
				if(data.size()==0) sceneData.remove(rowCol);
//				System.err.println("移除角色:"+hero.getNameZoneid()+" 到场景"+sceneId+" grid:"+rowCol+" x:"+hero.getScene().getPosX()+" y:"+hero.getScene().getPosY());//TODO
				if(checkLine){
					// 维护lineSizeData缓存
					Integer num = lineSizeData.get(line);
					if (num == null) {
						num = 0;
					}
					num = num - 1;
					if (num < 0) {
						num = 0;
					}
//					 logger.info(LogFormat.rec("从补给地图缓存删除,sceneSysId:"+sceneId+",size:"+num));
//					System.err.println(hreo.getNameZoneid()+"从补给地图缓存删除,sceneSysId:"+sceneId+",line:"+line+",size:"+num);
					lineSizeData.put(line, num);
				}
			}else{
				LogTool.warn("remove hero fail:"+hero.getNameZoneid()+",grid:"+rowCol,SceneCache.class);
			}
		}
	}
	/**
	 * 此副本是否有npc
	 * 
	 * @param sceneUnitId
	 *            场景唯一id
	 * @return ture为有,false为没有或者这个场景没有数据
	 */
	public static boolean isThisCopySceneHasNpc(long sceneUnitId) {
		ConcurrentSkipListSet<NPC> data = copySceneNpcData.get(sceneUnitId);
		if (data == null)
			return false;
		return data.size()>0;
	}
	public static void addNpcToSceneCache(long sceneUnitId, NPC npc){
		Struct_map_200 Struct_map_200 = Config_map_200.getIns().get(npc.getSceneSysId());
		int type = Struct_map_200.getSevertype();
		if(boardCastList.contains(type)){
			//补给地图
			addNpcToSupplyScene(sceneUnitId, SceneFunction.getIns().getGridRowColMixByPosXY(npc.getPosX(), npc.getPosY()), npc);
		}else{
			//副本
			addNpcToCopyScene(sceneUnitId, npc);
		}
		
	}
	
	/**
	 * 加入npc到补给地图缓存
	 * 
	 * @param sceneUnitId
	 *            场景唯一id
	 * @param rowCol
	 *            行列
	 * @param unitId
	 *            npc唯一id
	 */
	public static void addNpcToSupplyScene(long sceneUnitId, int rowCol, NPC npc) {
		Map<Integer, ConcurrentSkipListSet<NPC>> gridData = supplySceneNpcCache.get(sceneUnitId);
		if (gridData == null) {
			gridData = new ConcurrentHashMap<Integer, ConcurrentSkipListSet<NPC>>();
			supplySceneNpcCache.put(sceneUnitId, gridData);
		}
		ConcurrentSkipListSet<NPC> data = gridData.get(rowCol);
		if (data != null) {
			data.add(npc);
		} else {
			data = new ConcurrentSkipListSet<NPC>();
			data.add(npc);
			gridData.put(rowCol, data);
		}
	}
	/**
	 * 补给地图移除npc
	 * @param sceneUnitId
	 * @param rowCol
	 * @param npc
	 */
	public static void removeNpcFromSupplyScene(long sceneUnitId, int rowCol, NPC npc) {
		Map<Integer, ConcurrentSkipListSet<NPC>> gridData = supplySceneNpcCache.get(sceneUnitId);
		if (gridData != null) {
			ConcurrentSkipListSet<NPC> data = gridData.get(rowCol);
			if (data != null) {
				boolean remove = data.remove(npc);
//				logger.info("remove npc from scene,id:"+npc.getId()+",x:"+npc.getPosX()+",y:"+npc.getPosY()+",remove:"+remove+",rowCol:"+rowCol);
			}
		}
	}
	public static void addNpcToCopyScene(long sceneUnitId, NPC npc) {
		ConcurrentSkipListSet<NPC> data = copySceneNpcData.get(sceneUnitId);
		if (data != null) {
			data.add(npc);
		} else {
			data = new ConcurrentSkipListSet<NPC>();
			data.add(npc);
			copySceneNpcData.put(sceneUnitId, data);
		}
	}
	/**
	 * 副本移除npc
	 * @param sceneUnitId
	 * @param npc
	 */
	public static void removeNpcFromCopyScene(long sceneUnitId, NPC npc) {
		ConcurrentSkipListSet<NPC> data = copySceneNpcData.get(sceneUnitId);
		if (data != null) {
			data.remove(npc);
			if(data.size()==0) copySceneNpcData.remove(sceneUnitId);
		}
	}

	/**
	 * 根据npc唯一id找到npc系统id
	 * 
	 * @param npcSysId
	 *            npc系统id
	 * @return npc唯一id,其他情况返回null
	 */
	public static int getBattleNpcSysId(long npcSysUid) {
		NPC npc = npcCache.get(npcSysUid);
		if (npc != null) {
			return npc.getSysId();
		}
		return 0;
	}
	
	/**
	 * 根据副本唯一id和npc系统id找到npc唯一id
	 * @param sceneUnitId 副本场景唯一id
	 * @param npcSysId npc系统id
	 * @return npc唯一id,其他情况返回null
	 */
	public static Long getBattleNpcUnitId(Long sceneUnitId,int npcSysId){
		ConcurrentSkipListSet<NPC> data = copySceneNpcData.get(sceneUnitId);
		if(data==null) return null;
		for(NPC npc:data){
			return npc.getId();
		}
		LogTool.warn("get pingtower npc fail,npcSysId:"+npcSysId+",find null",SceneCache.class);
		return null;
	}

	// 获取所有线路
	public static Set<Integer> getAllLine() {
		return lineSizeData.get().keySet();
	}
	/**
	 * 获取可行走区域
	 * @param sceneid 地图系统id
	 * @return
	 */
	public static ArrayList<RowCol> getCanWalk(Integer sceneid){
		if(sceneid==0) return null;
		ArrayList<RowCol> arrayList = canWalkMap.get(sceneid);
		if(arrayList==null){
			doReadScene(sceneid);
			arrayList = canWalkMap.get(sceneid);
		}
		return arrayList;
	}
	/**
	 * 获取阴影区域
	 * @param sceneid 地图系统id
	 * @return
	 */
	public static ArrayList<RowCol> getShadow(Integer sceneid){
		if(sceneid==0) return null;
		ArrayList<RowCol> arrayList = shadowMap.get(sceneid);
		if(arrayList==null){
			doReadScene(sceneid);
			arrayList = shadowMap.get(sceneid);
		}
		return arrayList;
	}
	/**
	 * 获取某个场景的所有跳转点
	 * @param sceneid
	 * @return
	 */
	public static Map<Integer, SceneJumpPoint> getJumpPointMap(int sceneid){
		if(sceneid==0) return null;
		if(!loadedScene.contains(sceneid) ){
			doReadScene(sceneid);
		}
		return jumpPointMap.get(sceneid);
	}
	/**
	 * 获取跳转点
	 * @param nowSid 当前地图系统id
	 * @param newSid 新地图系统id
	 * @return
	 */
	public static SceneJumpPoint getJumpPoint(Integer nowSid,Integer newSid){
		if(nowSid==0 && newSid==0) return null;
		
		if(nowSid!=0&&!loadedScene.contains(nowSid) ){
			doReadScene(nowSid);
		}
		if (newSid!=0&&!loadedScene.contains(newSid)) {
			doReadScene(newSid);
		}
		SceneJumpPoint point = jumpPointMap.get(nowSid, newSid);
		return point;
	}
	/**
	 * 获取开始点
	 * @param sceneid 地图系统id
	 * @return
	 */
	public static ScenePosXYArea getStartPoint(Integer sceneid){
		if(sceneid==0) return null;
		ScenePosXYArea posXY = startPointMap.get(sceneid);
		if(posXY==null){
			doReadScene(sceneid);
			posXY = startPointMap.get(sceneid);
		}
		return posXY;
	}
	
	public static CopyScene getCopyScene(long sceneSysId){
		CopyScene copyScene = copySceneMap.get((int)sceneSysId);
		if(copyScene==null){
			doReadScene((int)sceneSysId);
			copyScene = copySceneMap.get((int)sceneSysId);
		}
		return copyScene;
	}
	
	public static Canwalk getCanwalk(int sceneSysId){
		Canwalk canwalk = canWalkArr.get(sceneSysId);
		if(canwalk==null){
			doReadScene(sceneSysId);
			canwalk = canWalkArr.get(sceneSysId);
		}
		return canwalk;
	}
//	public static Map<Integer, ProbabilityEventModel> getRectAreaMap() {
//		return rectAreaMap.get();
//	}
	public static Map<Integer, ProbabilityEventModel> getBirthRectAreaMap() {
		return birthRectAreaMap.get();
	}
	public static MapOneKey<Integer, ProbabilityEventModel> getCircleAreaMap() {
		return circleAreaMap;
	}
	public static void setCircleAreaMap(MapOneKey<Integer, ProbabilityEventModel> circleAreaMap) {
		SceneCache.circleAreaMap = circleAreaMap;
	}
	public static MapOneKey<Integer, ProbabilityEventModel> getCircleRectAreaMap() {
		return circleRectAreaMap;
	}
	public static void setCircleRectAreaMap(MapOneKey<Integer, ProbabilityEventModel> circleRectAreaMap) {
		SceneCache.circleRectAreaMap = circleRectAreaMap;
	}
	
}
