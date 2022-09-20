package com.teamtop.system.archive;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import com.teamtop.system.archive.model.ArchiveData;
import com.teamtop.system.archive.model.ArchiveModel;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;

public class ArchiveSysEvent extends AbsSystemEvent {

	private static ArchiveSysEvent archiveSysEvent;

	private ArchiveSysEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized ArchiveSysEvent getIns() {
		if (archiveSysEvent == null) {
			archiveSysEvent = new ArchiveSysEvent();
		}
		return archiveSysEvent;
	}

	@Override
	public void init(Hero hero) {
		ArchiveData archiveData = hero.getArchiveData();
		if (archiveData != null) {
			return;
		}
		Map<Integer, ArchiveModel> map = new HashMap<>();
		Set<Integer> setList = new HashSet<>();
		archiveData = new ArchiveData(hero.getId(), map, setList);
		hero.setArchiveData(archiveData);
	}

	@Override
	public void login(Hero hero) {
		boolean redPoint = ArchiveFunction.getIns().checkRedPoint(hero);
		if (redPoint) {
			RedPointFunction.getIns().addLoginRedPoint(hero, ArchiveConst.SysId, ArchiveConst.RedPoint,
					RedPointConst.HAS_RED);
		}
	}

	@Override
	public void passGuanqia(Hero hero, int passGuanqia) {
		// ArchiveData archiveData = hero.getArchiveData();
		// if (archiveData != null) {
		// return;
		// }
		// Struct_xitong_001 struct_xitong_001 =
		// Config_xitong_001.getIns().get(ArchiveConst.SysId);
		// int[][] open = struct_xitong_001.getOpen();
		// for (int[] condition : open) {
		// if (condition[0] == 1 && passGuanqia >= condition[1]) {
		// Map<Integer, ArchiveModel> map = new HashMap<>();
		// List<Integer> setList = new ArrayList<>();
		// archiveData = new ArchiveData(hero.getId(), map, setList);
		// hero.setArchiveData(archiveData);
		// }
		// }
	}

}
