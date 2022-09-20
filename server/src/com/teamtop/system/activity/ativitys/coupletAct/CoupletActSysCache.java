package com.teamtop.system.activity.ativitys.coupletAct;

import com.teamtop.cross.CrossZone;
import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import excel.config.Config_ddl_297;
import excel.config.Config_ddlrank_297;
import excel.config.Config_ddlreward_297;
import excel.struct.Struct_ddl_297;
import excel.struct.Struct_ddlrank_297;
import excel.struct.Struct_ddlreward_297;

import java.util.*;

public class CoupletActSysCache extends AbsServerEvent {
    /**
     * 对对联(活动)排名配置，方便发奖励 第一层key:期数，第二层key:排名rank
     **/
    private static Map<Integer, Map<Integer, Struct_ddlrank_297>> rankConfigMap = new HashMap<>();
    /**
     * 对对联(活动)目标奖励配置 key:期数
     **/
    private static Map<Integer, List<Struct_ddlreward_297>> targetConfigMap = new HashMap<>();
    /**
     * 重复字 第一层key：对联id 第二次key：下标从1开始
     **/
    private static Map<Integer, Map<Integer, Set<Integer>>> repeatWord = new HashMap<>();

    public static Map<Integer, Map<Integer, Struct_ddlrank_297>> getRankConfigMap() {
        return rankConfigMap;
    }

    public static Map<Integer, List<Struct_ddlreward_297>> getTargetConfigMap() {
        return targetConfigMap;
    }

    public static boolean isRepeatWord(int id, int answerIndex, int userIndex) {
        return Optional.ofNullable(repeatWord).map(mapper -> mapper.get(id)).map(mapper -> mapper.get(answerIndex)).map(mapper -> mapper.contains(userIndex)).orElse(false);
    }

    @Override
    public void initExcel() throws RunServerException {
        // TODO Auto-generated method stub
        if (CrossZone.isCrossServer()) {
            return;
        }
        rankConfigMap.clear();
        targetConfigMap.clear();
        List<Struct_ddlrank_297> rankList = Config_ddlrank_297.getIns().getSortList();
        for (Struct_ddlrank_297 struct_ddlrank_297 : rankList) {
            int qs = struct_ddlrank_297.getQs();
            Map<Integer, Struct_ddlrank_297> map = rankConfigMap.get(qs);
            if (map == null) {
                map = new HashMap<>();
                rankConfigMap.put(qs, map);
            }
            int rankLow = struct_ddlrank_297.getRank()[0][0];
            int rankHigh = struct_ddlrank_297.getRank()[0][1];
            for (int i = rankLow; i <= rankHigh; i++) {
                map.put(i, struct_ddlrank_297);
            }
        }

        List<Struct_ddlreward_297> targetList = Config_ddlreward_297.getIns().getSortList();
        for (Struct_ddlreward_297 struct_ddlreward_297 : targetList) {
            int qs = struct_ddlreward_297.getQs();
            List<Struct_ddlreward_297> list = targetConfigMap.get(qs);
            if (list == null) {
                list = new ArrayList<>();
                targetConfigMap.put(qs, list);
            }
            list.add(struct_ddlreward_297);
        }

        List<Struct_ddl_297> sortList = Config_ddl_297.getIns().getSortList();
        for (Struct_ddl_297 struct_ddl_297 : sortList) {
            String down1 = struct_ddl_297.getDown1();
            String down2 = struct_ddl_297.getDown2();
            String down3 = struct_ddl_297.getDown3();
            String down4 = struct_ddl_297.getDown4();
            String down5 = struct_ddl_297.getDown5();
            String down6 = struct_ddl_297.getDown6();
            String down7 = struct_ddl_297.getDown7();
            String[] words = new String[]{down1, down2, down3, down4, down5, down6, down7};
            Map<String, Set<Integer>> map = new HashMap<>();
            for (int i = 0; i < words.length; i++) {
                String word = words[i];
                Set<Integer> set = map.get(word);
                if (set != null) {
                    set.add(i + 1);
                } else {
                    set = new HashSet<>();
                    set.add(i + 1);
                    map.put(word, set);
                }
            }
            Map<Integer, Set<Integer>> map1 = new HashMap<>();
            for (Set<Integer> value : map.values()) {
                if (value.size() > 1) {
                    for (Integer indel : value) {
                        map1.put(indel, value);
                    }
                }
            }

            repeatWord.put(struct_ddl_297.getId(), map1);
        }

    }


    @Override
    public void startServer() throws RunServerException {
        // TODO Auto-generated method stub
    }

}
