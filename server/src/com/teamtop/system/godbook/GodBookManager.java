package com.teamtop.system.godbook;

import java.util.HashMap;
import java.util.List;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.achievement.AchievementEnum;
import com.teamtop.system.achievement.AchievementFunction;
import com.teamtop.system.bag.BagFunction;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.chat.ChatManager;
import com.teamtop.system.daytask.DayTaskConst;
import com.teamtop.system.daytask.DayTaskFunction;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.FightCalcConst;
import com.teamtop.system.hero.FightCalcFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.promotion.PromotionFunction;
import com.teamtop.system.promotion.PromotionTaskType;
import com.teamtop.system.rankNew.RankingFunction;
import com.teamtop.system.skill.SkillConst;
import com.teamtop.system.skill.SkillFunction;
import com.teamtop.system.task.TaskUserConst;
import com.teamtop.system.task.TaskUserFunction;
import com.teamtop.system.wujiang.WuJiangConst;
import com.teamtop.system.zhanjia.ZhanJiaFunction;
import com.teamtop.util.log.LogTool;

import excel.config.Config_book_215;
import excel.config.Config_booklv_215;
import excel.config.Config_drug_200;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_book_215;
import excel.struct.Struct_booklv_215;

public class GodBookManager {
	
	private static GodBookManager ins;
	public static GodBookManager getIns(){
		if(ins == null) {
			ins = new GodBookManager();
		}
		return ins;
	}
	/**
	 * 打开ui
	 * @param hero
	 */
	public void openUi(Hero hero) {
		try {
			Object[] godbooks=new Object[] {};
			if (hero.getGodbook().getHasBooks()!=null&&hero.getGodbook().getHasBooks().size()>0) {
				godbooks=new Object[hero.getGodbook().getHasBooks().size()];
				int a=0;
				for(GodBookModel godBookModel:hero.getGodbook().getHasBooks().values()) {
					godbooks[a]=new Object[] {godBookModel.getId(),godBookModel.getStar()};
					a++;
				}
			}
			if (!hero.getDanyao().containsKey(GodBookConst.DAN8)) {
				hero.getDanyao().put(GodBookConst.DAN8, 0);
				LogTool.info(hero.getId(), hero.getName(), "GodBookConst.DAN8", GodBookManager.class);
			}
			int num=hero.getDanyao().get(GodBookConst.DAN8);
			GodBookSender.sendCmd_972(hero.getId(), hero.getGodbook().getWearid(),hero.getGodbook().getLevel(),hero.getGodbook().getExp(),godbooks,num);
		} catch (Exception e) {
			LogTool.error(e, GodBookManager.class, hero.getId(), hero.getName(), "openUi has wrong");
		}
		
	}
	/**
	 * 更换携带天书
	 * @param hero
	 * @param bookid
	 */
	public void charge(Hero hero, int bookid) {
		try {
			if (hero.getGodbook().getHasBooks().containsKey(bookid)) {
				hero.getGodbook().setWearid(bookid);
				int skill=Config_book_215.getIns().get(bookid).getSkill();
				int level=hero.getGodbook().getHasBooks().get(bookid).getStar();
				SkillFunction.getIns().changeSkill(hero, SkillConst.skiil_site_7, skill, level);
				GodBookSender.sendCmd_974(hero.getId(), hero.getGodbook().getWearid());
				return;
			}
		} catch (Exception e) {
			LogTool.error(e, GodBookManager.class, hero.getId(), hero.getName(), "charge has wrong");
		}
		
	}
	/**
	 * 升级天书
	 * @param hero
	 * @param type
	 * @param bookid
	 */
	public void upLevel(Hero hero, int type) {
		try {
			if(hero.getGodbook().getLevel() >= Config_booklv_215.getIns().size()) {
				hero.getGodbook().setExp(0);
				GodBookSender.sendCmd_976(hero.getId(), 1,  hero.getGodbook().getExp(), hero.getGodbook().getLevel());
				return;
			}
			//普通升阶
			if (type==0) {
				boolean isUpLevel=false;
				if (UseAddUtil.canUse(hero, GameConst.TOOL, 1, GodBookConst.BOOK_ITEMID)) {
					UseAddUtil.use(hero, GameConst.TOOL, 1, GodBookConst.BOOK_ITEMID, SourceGoodConst.ZHANJIA_UP_JIE, true);
					isUpLevel=addBookExp(hero,GodBookConst.BOOK_ADDEXP);
					GodBookSender.sendCmd_976(hero.getId(), 0,  hero.getGodbook().getExp(), hero.getGodbook().getLevel());
					//每日任务
					DayTaskFunction.getIns().successDayTaskType(hero, DayTaskConst.DATTASK_TYPE18);
				}
				if (isUpLevel) {
					FightCalcFunction.setRecalcAll(hero, FightCalcConst.STAR_BOOK,SystemIdConst.GodBook_SYSID);
					//任务
					TaskUserFunction.getIns().reshTaskUser(hero, TaskUserConst.TASK_TYPE_13, 0);
				}
			}else {
				boolean isUpLevel=false;
				int hasNum=BagFunction.getIns().getGoodsNumBySysId(hero.getId(), GodBookConst.BOOK_ITEMID);
				if (hasNum==0) {
					return;
				}
				int needExp=Config_booklv_215.getIns().get(hero.getGodbook().getLevel()).getExp()-hero.getGodbook().getExp();
				int needNum=needExp/GodBookConst.BOOK_ADDEXP;
				if (needNum==0) {
					needNum=1;
				}
				int addExp=0;
				if (needNum<=hasNum) {
					addExp=needNum*WuJiangConst.UP_JIE_EXP;
				}else {
					needNum=hasNum;
					addExp=hasNum*GodBookConst.BOOK_ADDEXP;
				}
				if (UseAddUtil.canUse(hero, GameConst.TOOL, needNum, GodBookConst.BOOK_ITEMID)) {
					UseAddUtil.use(hero, GameConst.TOOL, needNum, GodBookConst.BOOK_ITEMID, SourceGoodConst.ZHANJIA_UP_JIE, true);
					isUpLevel=addBookExp(hero,addExp);
					//每日任务
					DayTaskFunction.getIns().successDayTaskType(hero, DayTaskConst.DATTASK_TYPE18);
				}
				if (isUpLevel) {
					FightCalcFunction.setRecalcAll(hero, FightCalcConst.BOOK_UP_LEVL,SystemIdConst.GodBook_SYSID);
					//任务
					TaskUserFunction.getIns().reshTaskUser(hero, TaskUserConst.TASK_TYPE_13, 0);
				}
				GodBookSender.sendCmd_976(hero.getId(), 0,  hero.getGodbook().getExp(), hero.getGodbook().getLevel());
			}
			PromotionFunction.getIns().updatePromotionTask(hero.getId(), PromotionTaskType.GODBOOK_LEVEL, null);
			return;
		} catch (Exception e) {
			LogTool.error(e, GodBookManager.class, hero.getId(), hero.getName(), "upLevel has wrong");
		}
		
	}
	
	public boolean addBookExp(Hero hero,int exp){
		try {
			hero.getGodbook().setExp(hero.getGodbook().getExp() + exp);
			List<Struct_booklv_215> configs = Config_booklv_215.getIns().getSortList();
			boolean flag = false;
			for(int i=hero.getGodbook().getLevel();i<configs.size() ; i++){
				if(i >= configs.size()) {
					hero.getGodbook().setExp(0);
					break;
				}
				Struct_booklv_215 struct = configs.get(i-1);
				int upgradeExp =  struct.getExp();
				if(hero.getGodbook().getExp() >= upgradeExp){
					int defExp = hero.getGodbook().getExp() - upgradeExp;
					hero.getGodbook().setExp(defExp);
					hero.getGodbook().setLevel(struct.getLv()+1);
					flag = true;
				}else{
					break;
				}
			}
			return flag;
		} catch (Exception e) {
			LogTool.error(e, hero.getId(), hero.getName(), "addBookExp:"+exp);
		}
		return false;
		
	}
	/**
	 * 激活/升星天书
	 * @param hero
	 * @param bookid
	 */
	public void upStar(Hero hero, int bookid) {
		try {
			Struct_book_215 book=Config_book_215.getIns().get(bookid);
			if (book==null) {
				return;
			}
			if (hero.getGodbook().getHasBooks().containsKey(bookid)) {
				GodBookModel godBookModel=hero.getGodbook().getHasBooks().get(bookid);
				if (godBookModel.getStar()>=book.getStar()) {
					return;
				}
				if (UseAddUtil.canUse(hero, book.getItem())) {
					UseAddUtil.use(hero, book.getItem(), SourceGoodConst.STAR_BOOK, true);
					godBookModel.setStar(godBookModel.getStar()+1);
					FightCalcFunction.setRecalcAll(hero, FightCalcConst.STAR_BOOK,SystemIdConst.GodBook_SYSID);
					GodBookSender.sendCmd_978(hero.getId(), 0, bookid, godBookModel.getStar());
					// 成就
					AchievementFunction.getIns().checkTask(hero, AchievementEnum.GOAL_24, 0);
					if (godBookModel.getStar()>=book.getStar()) {
						//星级已经是最高    觉醒红点
						ZhanJiaFunction.getIns().jueXingRedPonint(hero,false);
					}
				}
				return;
			}else {
				//激活
				if (UseAddUtil.canUse(hero, book.getItem())) {
					UseAddUtil.use(hero, book.getItem(), SourceGoodConst.JIHUO_BOOK, true);
					GodBookModel godBookModel=new GodBookModel();
					godBookModel.setId(bookid);
					godBookModel.setStar(1);
					//觉醒之力
					HashMap<Integer, Integer> jueXingSkills=new HashMap<>();
					jueXingSkills.put(GameConst.JUEXING_SKILL1, 0);
					jueXingSkills.put(GameConst.JUEXING_SKILL2, 0);
					jueXingSkills.put(GameConst.JUEXING_SKILL3, 0);
					jueXingSkills.put(GameConst.JUEXING_SKILL4, 0);
					godBookModel.setJueXingSkills(jueXingSkills);
					
					hero.getGodbook().getHasBooks().put(bookid, godBookModel);
					FightCalcFunction.setRecalcAll(hero, FightCalcConst.JIHUO_BOOK,SystemIdConst.GodBook_SYSID);
					GodBookSender.sendCmd_978(hero.getId(), 0, bookid, godBookModel.getStar());
					// 成就
					AchievementFunction.getIns().checkTask(hero, AchievementEnum.GOAL_23, 0);
					PromotionFunction.getIns().updatePromotionTask(hero.getId(), PromotionTaskType.ACTIVATE_GODBOOK, null);
					if (book.getPin()>=Config_xtcs_004.getIns().get(ChatConst.BROCAST_GOODPING).getNum()) {
						ChatManager.getIns().broadCast(ChatConst.BROCAST_GODBOOK,
								new Object[] { hero.getName(), book.getId() }); // 全服广播
					}
				}
				return;
				
			}
		} catch (Exception e) {
			LogTool.error(e, GodBookManager.class, hero.getId(), hero.getName(), "upStar has wrong");
		}
		
	}
	/**
	 * 使用天书属性丹
	 * @param hero
	 * @param type
	 */
	public void eatDan(Hero hero, int type) {
		try {
			if (!hero.getDanyao().containsKey(GodBookConst.DAN8)) {
				hero.getDanyao().put(GodBookConst.DAN8, 0);
				LogTool.info(hero.getId(), hero.getName(), "eatDan GodBookConst.DAN8", GodBookManager.class);
			}
			
			int itemid=Config_drug_200.getIns().get(GodBookConst.DAN8).getId();
			int useNum=hero.getDanyao().get(GodBookConst.DAN8);
			int maxNum=getMaxDanNum(hero);
			int num=0;
			int canUseNum=0;
			
			if (useNum>=maxNum) {
				canUseNum=0;
				GodBookSender.sendCmd_980(hero.getId(), 1, hero.getDanyao().get(GodBookConst.DAN8));
				return;
			}else {
				canUseNum=maxNum-useNum;
			}
			
			int hasNum=BagFunction.getIns().getGoodsNumBySysId(hero.getId(), itemid);
			if (hasNum<=0) {
				GodBookSender.sendCmd_980(hero.getId(), 1, hero.getDanyao().get(GodBookConst.DAN8));
				return;
			}
			if (type==0) {
				num=1;
			}else {
				if (canUseNum>hasNum) {
					num=hasNum;
				}else {
					num=canUseNum;
				}
			}
			if (UseAddUtil.canUse(hero, GameConst.TOOL, num, itemid)) {
				UseAddUtil.use(hero, GameConst.TOOL, num, itemid, SourceGoodConst.BINGFA_DAN8, true);
				hero.getDanyao().put(GodBookConst.DAN8, hero.getDanyao().get(GodBookConst.DAN8)+num);
				FightCalcFunction.setRecalcAll(hero, FightCalcConst.BINGFA_DAN8,SystemIdConst.GodBook_SYSID);
				GodBookSender.sendCmd_980(hero.getId(), 0, hero.getDanyao().get(GodBookConst.DAN8));
				// 刷新排行
				RankingFunction.getIns().refreshGodBookRankList(hero);
				return;
			}
			
		} catch (Exception e) {
			LogTool.error(e, GodBookManager.class, hero.getId(), hero.getName(), "eatDan has wrong");
		}
		
	}
	
	
	/**
	 * 获得属性丹
	 * @param hero
	 * @return
	 */
	public int getMaxDanNum(Hero hero) {
		int danNums=0;
		for(GodBookModel godBookModel:hero.getGodbook().getHasBooks().values()) {
			danNums=danNums+Config_book_215.getIns().get(godBookModel.getId()).getMax()*godBookModel.getStar();
		}
		return danNums;
	}
	
	

}
