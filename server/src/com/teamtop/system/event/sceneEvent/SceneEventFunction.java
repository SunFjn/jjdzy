package com.teamtop.system.event.sceneEvent;

import java.io.File;
import java.lang.reflect.Method;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.Set;

import org.dom4j.Document;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.scene.NewLocation;
import com.teamtop.system.scene.PreLocation;
import com.teamtop.system.scene.PreSupplyLocation;
import com.teamtop.system.scene.RowCol;
import com.teamtop.system.scene.Scene;
import com.teamtop.system.scene.SceneCache;
import com.teamtop.system.scene.SceneConst;
import com.teamtop.system.scene.SceneFunction;
import com.teamtop.system.scene.SceneJumpPoint;
import com.teamtop.system.scene.SceneSender;
import com.teamtop.system.scene.area.SceneCircleArea;
import com.teamtop.system.scene.area.ScenePosXYArea;
import com.teamtop.system.scene.area.SceneRectangleArea;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventUtil;
import com.teamtop.util.ProbabilityEvent.RandomUtil;
import com.teamtop.util.cache.MapOneKey;
import com.teamtop.util.file.FileUtils;
import com.teamtop.util.log.LogTool;
public class SceneEventFunction extends AbsServerEvent{

	@Override
	public void startServer() throws RunServerException {
		try {
			String realFile = FileUtils.getAbsFilePath("com/teamtop/system/event/sceneEvent/SceneEvents.xml");
			realFile = URLDecoder.decode(realFile,"utf-8");  
			File file = new File(realFile);
			SAXReader saxReader = new SAXReader();
			Document doc = saxReader.read(file);
			Element root = doc.getRootElement();
			Element bean = null;
			List<Integer> typeList = new ArrayList<Integer>();
			for(Iterator<?> it = root.elementIterator("bean");it.hasNext();){
				bean = (Element) it.next();
				int sceneType = Integer.parseInt(bean.attributeValue("sceneType"));
				String className = bean.attributeValue("class");
				Class<?> clazz = Class.forName(className);
				Method method = clazz.getMethod("getIns");
				AbsSceneEvent event = (AbsSceneEvent) method.invoke(null);
				sceneEventMap.put(sceneType, event);
				//预防场景类型填写重复
				if(typeList.contains(sceneType)){
					throw new RunServerException(null, "SceneEvents sceneType repeat,sceneType:"+sceneType);
				}else{
					typeList.add(sceneType);
				}
			}
		} catch (Exception e) {
			throw new RunServerException(e, "readConfig exception");
		}
	}
	private static Logger logger = LoggerFactory.getLogger(SceneEventFunction.class);
	/**
	 * 场景事件处理类缓存<br/>
	 * key:场景类型,value:场景事件处理类
	 */
	private static Map<Integer, AbsSceneEvent> sceneEventMap = new HashMap<Integer, AbsSceneEvent>();

	/**
	 * 获取场景事件处理类
	 * @param sceneType
	 * @return
	 */
	public static AbsSceneEvent getSceneEvent(int sceneType){
		return sceneEventMap.get(sceneType);
	}
	
	/**
	 * 跳转到新场景固定出生点
	 * @param hero 角色
	 * @param newSceneSysId 新场景系统id
	 * @param newSceneUnitId 新场景唯一id 若有唯一id,则传入;没有唯一id会在此自动生成
	 */
	public static void changeToStartPoint(Hero hero,int newSceneSysId,long newSceneUnitId){
		ScenePosXYArea posXY = SceneCache.getStartPoint(newSceneSysId);
		if(posXY!=null){
			SceneFunction.getIns().changeScene(hero, newSceneSysId, posXY.getPosX(), posXY.getPosY(),newSceneUnitId);
		}else {
			int[] rect = getRandomPosFromBornRect(newSceneSysId);
			if(rect==null)
				rect = getRandomPosFromCircle(newSceneSysId);
			if(rect != null){
				SceneFunction.getIns().changeScene(hero, newSceneSysId, rect[0], rect[1],newSceneUnitId);
			}else {
				logger.warn("changeToStartPoint,posXY is null,newSceneSysId:"+newSceneSysId);
				return;
			}
		}
	}
	/**
	 * 跳转到场景的随机点
	 * @param hero 角色
	 * @param newSceneSysId 新场景系统id
	 * @param newSceneUnitId 新场景唯一id
	 */
	public static void changeToRandomPoint(Hero hero,int newSceneSysId,long newSceneUnitId){
		int[] rect = getRandomPosFromAll(newSceneSysId);
		if(rect!=null){
			SceneFunction.getIns().changeScene(hero, newSceneSysId, rect[0], rect[1],newSceneUnitId);
		}else{
			ArrayList<RowCol> list = SceneCache.getCanWalk(newSceneSysId);
			if(list==null){
				LogTool.warn("hid: "+hero.getId()+" name:"+hero.getNameZoneid()+"changeToRandomPoint canwalk list is null,newSceneSysId:"+newSceneSysId, SceneEventFunction.class);
				return;
			}
			RowCol pos = getNewPosByRandom(list);
			int x = pos.getCol()*SceneConst.CANWARL_POSX_TRANS;
			int y = pos.getRow()*SceneConst.CANWARL_POSX_TRANS;
//			logger.info("x:"+x+",y:"+y+",id:"+newSceneSysId);
			
			SceneFunction.getIns().changeScene(hero, newSceneSysId, x, y,newSceneUnitId);
		}
	}
	/**
	 * 跳转到场景的随机点,在指定的点里面
	 * @param hero 角色
	 * @param newSceneSysId 新场景系统id
	 * @param newSceneUnitId 新场景唯一id
	 * @param list 指定的随机点
	 */
	public static void changeToRandomWithSpecialPoint(Hero hero,int newSceneSysId,long newSceneUnitId,List<ScenePosXYArea> list){
		Random random = new Random();
		ScenePosXYArea pos = list.get(random.nextInt(list.size()));
		if(pos==null){
			logger.warn("changeToRandomWithSpecialPoint,posXY is null,newSceneSysId:"+newSceneSysId);
			return;
		}
		SceneFunction.getIns().changeScene(hero, newSceneSysId, pos.getPosX(), pos.getPosY(),newSceneUnitId);
	}
	/**
	 * 跳转到指定位置
	 * @param hero 角色
	 * @param newSceneSysId 新场景系统id
	 * @param newSceneUnitId 新场景唯一id
	 * @param posX 坐标x
	 * @param posY 坐标y
	 */
	public static void changeToSpecialPoint(Hero hero,int newSceneSysId,long newSceneUnitId,int posX,int posY){
		SceneCache.doReadScene(newSceneSysId);
		SceneFunction.getIns().changeScene(hero, newSceneSysId, posX, posY, newSceneUnitId);
	}
	/**
	 * 跳转到指定位置
	 * @param hero 角色
	 * @param newSceneSysId 新场景系统id
	 * @param newSceneUnitId 新场景唯一id
	 * @param posX 坐标x
	 * @param posY 坐标y
	 * @param direction 方向
	 */
	public static void changeToSpecialPoint(Hero hero,int newSceneSysId,long newSceneUnitId,int posX,int posY, int direction, boolean isExitHang){
		hero.getScene().setDirection(direction);
		SceneFunction.getIns().changeScene(hero, newSceneSysId, posX, posY, newSceneUnitId, isExitHang);
	}	
	/**
	 * 跳转到子服最后的场景
	 * @param hero
	 */
	public static void changeToLocalScene(Hero hero){
		PreLocation preLocation = hero.getScene().getLocalScene();
		if(preLocation==null){
			//重置
			changeToPreSupplyScene(hero);
			return;
		}
		SceneFunction.getIns().changeScene(hero, preLocation.getPreSceneSysId(), preLocation.getPrePosX(), preLocation.getPrePosY(),preLocation.getPreSceneUnitId());
	}
	/**
	 * 跳转到进入前的场景
	 * @param hero 角色
	 */
	public static void changeToPreScene(Hero hero){
		PreLocation preLocation = hero.getScene().getPreLocation();
		if(preLocation==null /*preLocation.getPreSceneSysId()==hero.getScene().getSceneSysId()*/){
			//重置
			changeToPreSupplyScene(hero);
			return;
		}
		SceneFunction.getIns().changeScene(hero, preLocation.getPreSceneSysId(), preLocation.getPrePosX(), preLocation.getPrePosY(),preLocation.getPreSceneUnitId());
	}
	/**
	 * 跳到之前的补给地图
	 * @param hero 角色
	 */
	public static void changeToPreSupplyScene(Hero hero){
		PreSupplyLocation preSupplyLocation = hero.getScene().getPreSupplyLocation();
		if(preSupplyLocation==null){
			LogTool.warn("hid:"+hero.getId()+","+hero.getNameZoneid()+",changeToPreSupplyScene,but preSupplyLocation is null", SceneEventFunction.class);
			changeToStartPoint(hero, SceneConst.ID_SCENE_DONG_XI, SceneConst.ID_SCENE_DONG_XI);
			return;
		}
		int preSupplySceneSysId = preSupplyLocation.getPreSupplySceneSysId();
		if(preSupplyLocation.getPreSupplySceneSysId()==0 || preSupplySceneSysId==hero.getScene().getSceneSysId()){
			LogTool.warn("hid:"+hero.getId()+","+hero.getNameZoneid()+",changeToPreSupplyScene,but preSupplyLocation sysid is 0", SceneEventFunction.class);
			changeToStartPoint(hero, SceneConst.ID_SCENE_DONG_XI, SceneConst.ID_SCENE_DONG_XI);
			return;
		}
		int x = preSupplyLocation.getPreSupplyPosX();
		int y = preSupplyLocation.getPreSupplyPosY();
		ArrayList<RowCol> canWalk = SceneCache.getCanWalk(preSupplySceneSysId);
		if (canWalk == null || !canWalk.contains(new RowCol(y / SceneConst.CANWARL_POSX_TRANS, x / SceneConst.CANWARL_POSY_TRANS))) {
			ScenePosXYArea posxy = SceneCache.getStartPoint(preSupplySceneSysId);
			SceneFunction.getIns().changeScene(hero, preSupplySceneSysId, posxy.getPosX(), posxy.getPosY(),preSupplySceneSysId);
			return;
		}
		SceneFunction.getIns().changeScene(hero, preSupplySceneSysId, x, y,preSupplySceneSysId);
	}
	/**
	 * 跳转传送点指定的下一个地图的坐标
	 * @param hero 角色
	 * @param newSceneSysId 新场景系统id
	 */
	public static void changeFromJumpScene(Hero hero,int newSceneSysId , int newSceneUnitId){
		Scene scene = hero.getScene();
		SceneJumpPoint jp = SceneCache.getJumpPoint(scene.getSceneSysId(),newSceneSysId);
		if(jp==null){
			LogTool.warn("hid:"+hero.getId()+","+hero.getNameZoneid()+",changeToSupplyScene jump point is null,newSceneSysId:"+newSceneSysId+",nowSceneSysId:"+scene.getSceneSysId(), SceneEventFunction.class);
			return;
		}
		SceneFunction.getIns().changeScene(hero, newSceneSysId, jp.getNextPosx(), jp.getNextPosy(), newSceneUnitId);
	}
	/**
	 * 跳转到原始出生点(新建账号时的出生点)
	 * @param hero 角色
	 */
	public static void changeToOriBornScene(Hero hero){
		changeToStartPoint(hero, SceneConst.ID_SCENE_DONG_XI, SceneConst.ID_SCENE_DONG_XI);
	}
	/**
	 * 获取随机位置
	 * @param canWalkList 可行走区域
	 * @return 
	 */
	public static RowCol getNewPosByRandom(List<RowCol> canWalkList){
		Random random = new Random();
		return canWalkList.get(random.nextInt(canWalkList.size()));
	}
	/**
	 * 根据可行走区域获取随机位置 
	 * @param sceneSysId
	 */
	public static int[] getNewPosByRandom(int sceneSysId){
		ArrayList<RowCol> list = SceneCache.getCanWalk(sceneSysId);
		RowCol pos = SceneEventFunction.getNewPosByRandom(list);
		int x = pos.getCol()*SceneConst.CANWARL_POSX_TRANS;
		int y = pos.getRow()*SceneConst.CANWARL_POSX_TRANS;
		return new int[]{x,y};
	}
	/**
	 *  根据可行走区域获取随机位置  随机位置不在nolist中
	 * @param sceneSysId
	 * @param Nolist
	 * @return
	 */
	public static int[] getNewPosByRandomSpe(int sceneSysId,ArrayList<RowCol> Nolist) {
		ArrayList<RowCol> list = SceneCache.getCanWalk(sceneSysId);
		for (int i = 0; i < 100; i++) {
			RowCol pos = SceneEventFunction.getNewPosByRandom(list);
			//不重复的随机坐标点
			int x = pos.getCol()*SceneConst.CANWARL_POSX_TRANS;
			int y = pos.getRow()*SceneConst.CANWARL_POSX_TRANS;
			RowCol rowCol1=new RowCol(x, y);
			if (!Nolist.contains(rowCol1)) {
				return new int[]{x,y};
			}
		}
		
		RowCol pos = SceneEventFunction.getNewPosByRandom(list);
		int x = pos.getCol()*SceneConst.CANWARL_POSX_TRANS;
		int y = pos.getRow()*SceneConst.CANWARL_POSX_TRANS;
		return new int[]{x,y};
		
	}
	
	/**
	 *  根据可行走区域获取随机位置  随机位置不在nolist中
	 * @param sceneSysId
	 * @param Nolist
	 * @return
	 */
	public static int[] getNewPosByRandomSpe(int sceneSysId,Set<RowCol> Nolist) {
		ArrayList<RowCol> list = SceneCache.getCanWalk(sceneSysId);
		for (int i = 0; i < 100; i++) {
			RowCol pos = SceneEventFunction.getNewPosByRandom(list);
			//不重复的随机坐标点
			int x = pos.getCol()*SceneConst.CANWARL_POSX_TRANS;
			int y = pos.getRow()*SceneConst.CANWARL_POSX_TRANS;
			RowCol rowCol1=new RowCol(x, y);
			if (!Nolist.contains(rowCol1)) {
				return new int[]{x,y};
			}
		}
		
		RowCol pos = SceneEventFunction.getNewPosByRandom(list);
		int x = pos.getCol()*SceneConst.CANWARL_POSX_TRANS;
		int y = pos.getRow()*SceneConst.CANWARL_POSX_TRANS;
		return new int[]{x,y};
		
	}
	
	/**
	 * 获取所有类型关键字一个随机位置，目前适用于地图矩形元素、圆元素，后续可加
	 * </br>SceneConst.rdRectBorn、SceneConst.rdCircleBorn
	 * @param sceneSysId
	 * @return [0]-x pos;[1]-y pos
	 */
	public static int[] getRandomPosFromAll(int sceneSysId){
		int[] randomPos = getRandomPosFromBornRect(sceneSysId);
		if(randomPos==null)
			randomPos = getRandomPosFromCircle(sceneSysId);
		return randomPos;
	}
	
	/**
	 * 获取场景出生点矩形的随机位置，适用于地图中有多个出生点矩形元素   SceneConst.rdRectBorn
	 * @param sceneSysId
	 * @return [0]-x pos;[1]-y pos
	 */
	public static int[] getRandomPosFromBornRect(int sceneSysId){
		ProbabilityEventModel pe = SceneCache.getBirthRectAreaMap().get(sceneSysId);
		if(pe==null){
			SceneCache.doReadScene(sceneSysId);
			pe = SceneCache.getBirthRectAreaMap().get(sceneSysId);
			if(pe==null){
				return null;
			}
		}
		Random random = new Random();
		SceneRectangleArea sceneRectArea = (SceneRectangleArea) ProbabilityEventUtil.getEventByProbability(pe);
		int x = random.nextInt(sceneRectArea.getW())+sceneRectArea.getX();
		int y = random.nextInt(sceneRectArea.getH()) + sceneRectArea.getY();
		return new int[]{x,y};
	}
	
	/**
	 * 获取场景出生点圆形的随机位置，适用于地图中有且只有1个圆区域，取一个随机点   SceneConst.rdCircleBorn
	 * @param sceneSysId
	 * @return [0]-x pos;[1]-y pos
	 */
	public static int[] getRandomPosFromCircle(int sceneSysId){
		MapOneKey<Integer, ProbabilityEventModel> circleAreaMap = SceneCache.getCircleAreaMap();
		ProbabilityEventModel pe = circleAreaMap.get(sceneSysId);
		if(pe==null){
			SceneCache.doReadScene(sceneSysId);
			pe = circleAreaMap.get(sceneSysId);
			if(pe==null){
				return null;
			}
		}
		//感觉圆的总面积，概率抽出其中一个圆
		SceneCircleArea sceneCircleArea = (SceneCircleArea) ProbabilityEventUtil.getEventByProbability(pe);
		int r = sceneCircleArea.getRadius();
		int xRandom = RandomUtil.getRandomNumInAreas(0, r);
		int y=(int) Math.sqrt( r*r-xRandom*xRandom);
		int yRandom = RandomUtil.getRandomNumInAreas(0, y);
		
		int xType = RandomUtil.getRandomNumInAreas(0, 1);
		int yType = RandomUtil.getRandomNumInAreas(0, 1);
		if(xType==0)
			xRandom = xRandom*-1;
		if(yType==0)
			yRandom = yRandom*-1;
		xRandom = xRandom+sceneCircleArea.getPointX();
		yRandom = yRandom+sceneCircleArea.getPointY();
		
		return new int[]{ xRandom, yRandom};
	}
	
	/**
	 * 获取圆形+矩形随机位置，适用于地图中有圆+矩形区域，取一个随机点   SceneConst.rdCircleRect
	 */
	public static int[] getRandomPosFromCircleRect(int sceneSysId){
		MapOneKey<Integer, ProbabilityEventModel> circleRectAreaMap = SceneCache.getCircleRectAreaMap();
		ProbabilityEventModel pe = circleRectAreaMap.get(sceneSysId);
		if(pe==null){
			SceneCache.doReadScene(sceneSysId);
			pe = circleRectAreaMap.get(sceneSysId);
			if(pe==null){
				return null;
			}
		}
		//感觉圆的总面积，概率抽出其中一个圆
		Object object = ProbabilityEventUtil.getEventByProbability(pe);
		if(object instanceof SceneRectangleArea) {
			SceneRectangleArea areaTemp = (SceneRectangleArea)object;
			Random random = new Random();
			int x = random.nextInt(areaTemp.getW()) + areaTemp.getX();
			int y = random.nextInt(areaTemp.getH()) + areaTemp.getY();
			return new int[]{ x, y};
		}else {
			SceneCircleArea areaTemp = (SceneCircleArea)object;
			int r = areaTemp.getRadius();
			int xRandom = RandomUtil.getRandomNumInAreas(0, r);
			int y=(int) Math.sqrt( r*r-xRandom*xRandom);
			int yRandom = RandomUtil.getRandomNumInAreas(0, y);
			
			int xType = RandomUtil.getRandomNumInAreas(0, 1);
			int yType = RandomUtil.getRandomNumInAreas(0, 1);
			if(xType==0)
				xRandom = xRandom*-1;
			if(yType==0)
				yRandom = yRandom*-1;
			xRandom = xRandom+areaTemp.getPointX();
			yRandom = yRandom+areaTemp.getPointY();
			return new int[]{ xRandom, yRandom};
		}
	}
	
	/**
	 * 获取随机位置
	 * @param canWalkList 可行走区域
	 * @return [0]-x pos;[1]-y pos
	 */
	public static int[] getNewPointByRandom(List<RowCol> canWalkList){
		Random random = new Random();
		RowCol pos = canWalkList.get(random.nextInt(canWalkList.size()));
		return new int[]{pos.getCol()*SceneConst.CANWARL_POSX_TRANS, pos.getRow()*SceneConst.CANWARL_POSX_TRANS};
	}
	/**
	 * 同场景跳转到出生点
	 * @param hero
	 */
	public static void fuhuoJumpToBornPoint(Hero hero){
		ScenePosXYArea posXY = SceneCache.getStartPoint(hero.getScene().getSceneSysId());
		changeOnSameScene(hero, posXY.getPosX(), posXY.getPosY());
	}
	/**
	 * 同场景跳转
	 * @param hero hero
	 * @param posX 新的坐标x
	 * @param posY 新的坐标y
	 */
	public static void changeOnSameScene(Hero hero,int posX,int posY){
		hero.getTempVariables().setChangeSceneType(SceneConst.CHANGE_SCENE_TYPE_SAME);
		Scene scene = hero.getScene();
		int sceneSysId = scene.getSceneSysId();
		SceneFunction.getIns().delHeroFromScene(hero);
		NewLocation newLocation = new NewLocation(scene.getSceneUnitId(), sceneSysId, posX, posY);
		scene.setNewLocation(newLocation);
		SceneSender.sendCmd_3914(hero.getId(), posX, posY);
		
	}
	
	/**
	 * 跳转到同场景的随机点
	 * @param hero 角色
	 */
	public static void changeOnSameSceneToRandomPoint(Hero hero){
		Scene scene = hero.getScene();
		int sceneSysId = scene.getSceneSysId();
		ArrayList<RowCol> list = SceneCache.getCanWalk(sceneSysId);
		if(list==null){
			LogTool.warn("hid: "+hero.getId()+" name:"+hero.getNameZoneid()+"changeOnSameSceneToRandomPoint canwalk list is null,newSceneSysId:"+sceneSysId, SceneEventFunction.class);
			return;
		}
		RowCol pos = getNewPosByRandom(list);
		changeOnSameScene(hero,pos.getCol()*SceneConst.CANWARL_POSX_TRANS,pos.getRow()*SceneConst.CANWARL_POSX_TRANS);
	}
	
	/**
	 * 获取指定地图的随机点（除指定坐标距离 和 跳转点）
	 * @author lobbyer
	 * @param sceneId
	 * @param type 1.判断跳转点 2判断指定坐标3两个条件都判断 sceneconst
	 * @param point 判断坐标
	 * @param fromRect true:使用地图中矩形/圆形元素随机抽出生点（注:若使用该判断时可能没有跳转点 sceneJumpPoints 为null）
	 * </br>false:用可行走区域随机抽出生点
	 * @param dis 指定距离
	 * @date 2016年4月12日
	 */
	public static int[] getRandomWithoutStartPoint(int sceneId,int type,ScenePosXYArea point,boolean fromRect,int dis) {
		int[] points = null;
		try {
			ArrayList<RowCol> canWalkList = SceneCache.getCanWalk(sceneId);
			if(canWalkList==null){
				LogTool.warn("getRandomWithoutStartPoint canwalk list is null,sceneId:" + sceneId, SceneEventFunction.class);
				return null;
			}
			Map<Integer, SceneJumpPoint> sceneJumpPoints = SceneCache.getJumpPointMap(sceneId);
			//最大搜索100次，防止死循环
			int i = 0;
			while(i++ < 100){
				int[] temp = null;
				if(fromRect)
					temp = getRandomPosFromBornRect(sceneId);
				else
					temp = getNewPointByRandom(canWalkList);
				boolean flag = true;
				if(type == SceneConst.RANDOM_POINT_TYPE_JUMPPOINT || type == SceneConst.RANDOM_POINT_TYPE_ALL) {
					for(SceneJumpPoint jumpPoint : sceneJumpPoints.values()){
						//检查该点是否在传送点附近上
						if(SceneFunction.getIns().validateDistance(temp[0], 
								temp[1], jumpPoint.getNowPosx(), jumpPoint.getNowPosy(), dis)){
							flag = false;
							break;
						}
					}
				}
				if(type == SceneConst.RANDOM_POINT_TYPE_POINT || type == SceneConst.RANDOM_POINT_TYPE_ALL) {
					if(point != null && SceneFunction.getIns().validateDistance(temp[0], temp[1], point.getPosX(), point.getPosY(), dis)){
						flag = false;
					}
				}
				if(flag){
					points = temp;
					break;
				}
				if(i==99 && points == null) {
					//遍历完还取不到 则随机取一个
					points = temp;
				}
			}
			
			if(points == null){
				LogTool.warn("没有找到除了传送点以外的可挖宝区域,newSceneSysId:" + sceneId, SceneEventFunction.class);
				return null;
			}
		} catch (Exception e) {
			LogTool.error(e, SceneEventFunction.class, "getRandomWithoutStartPoint error type:"+type);
		}
		return points;
	}
}
