package com.teamtop.system.rankNew.dao;

import java.util.List;

import com.teamtop.system.rankNew.rankModel.ArchiveRankModel;
import com.teamtop.system.rankNew.rankModel.BingFaRankModel;
import com.teamtop.system.rankNew.rankModel.EquipRankModel;
import com.teamtop.system.rankNew.rankModel.ExcaliburRankModel;
import com.teamtop.system.rankNew.rankModel.GodBookRankModel;
import com.teamtop.system.rankNew.rankModel.GodEquipRankModel;
import com.teamtop.system.rankNew.rankModel.HuoShaoChiBiRankModel;
import com.teamtop.system.rankNew.rankModel.LevelRankModel;
import com.teamtop.system.rankNew.rankModel.PeacockRankModel;
import com.teamtop.system.rankNew.rankModel.StrengthRankModel;
import com.teamtop.system.rankNew.rankModel.TreasureRankModel;
import com.teamtop.system.rankNew.rankModel.WuJiangRankModel;
import com.teamtop.system.rankNew.rankModel.ZhanJiaRankModel;

public interface RankingMapper {

	public List<LevelRankModel> findLevel();

	public List<StrengthRankModel> findStrength();

	public List<PeacockRankModel> findPeacock();

	public List<EquipRankModel> findEquip();

	public List<ZhanJiaRankModel> findZhanJia();

	public List<WuJiangRankModel> findWuJiang();

	public List<ArchiveRankModel> findArchive();

	public List<GodBookRankModel> findGodBook();

	public List<GodEquipRankModel> findGodEquip();

	public List<ExcaliburRankModel> findExcalibur();

	public List<BingFaRankModel> findBingFa();

	public List<TreasureRankModel> findTreasure();

	public List<HuoShaoChiBiRankModel> findHuoShaoChiBi();

}
