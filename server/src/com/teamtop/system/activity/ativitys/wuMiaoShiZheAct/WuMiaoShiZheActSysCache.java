package com.teamtop.system.activity.ativitys.wuMiaoShiZheAct;

import com.teamtop.cross.CrossZone;
import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import excel.config.Config_wmjf_779;
import excel.config.Config_wmpm_779;
import excel.config.Config_wmsz_779;
import excel.struct.Struct_wmjf_779;
import excel.struct.Struct_wmpm_779;
import excel.struct.Struct_wmsz_779;

import java.util.*;

public class WuMiaoShiZheActSysCache extends AbsServerEvent {
    /**
     * 排名配置，方便发奖励 第一层key:期数，第二层key:排名rank
     **/
    private static Map<Integer, Map<Integer, Struct_wmpm_779>> rankConfigMap = new HashMap<>();
    /**
     * 目标奖励配置 key:期数
     **/
    private static Map<Integer, List<Struct_wmjf_779>> targetConfigMap = new HashMap<>();

    /**
     * 消耗配置 第一层key:期数，第二层key:道具id，货币id
     **/
    private static Map<Integer, Map<Integer, Struct_wmsz_779>> consumeMap = new HashMap<>();

    public static Map<Integer, Map<Integer, Struct_wmpm_779>> getRankConfigMap() {
        return rankConfigMap;
    }

    public static Map<Integer, List<Struct_wmjf_779>> getTargetConfigMap() {
        return targetConfigMap;
    }

    public static Map<Integer, Map<Integer, Struct_wmsz_779>> getConsumeMap() {
        return consumeMap;
    }

    @Override
    public void initExcel() throws RunServerException {
        if (CrossZone.isCrossServer()) {
            return;
        }
        rankConfigMap.clear();
        targetConfigMap.clear();
        consumeMap.clear();
        List<Struct_wmpm_779> rankList = Config_wmpm_779.getIns().getSortList();
        for (Struct_wmpm_779 struct_wmpm_779 : rankList) {
            int qs = struct_wmpm_779.getId() / 100;
            Map<Integer, Struct_wmpm_779> map = rankConfigMap.get(qs);
            if (map == null) {
                map = new HashMap<>();
                rankConfigMap.put(qs, map);
            }
            int rankLow = struct_wmpm_779.getRank()[0][0];
            int rankHigh = struct_wmpm_779.getRank()[0][1];
            for (int i = rankLow; i <= rankHigh; i++) {
                map.put(i, struct_wmpm_779);
            }
        }

        List<Struct_wmjf_779> targetList = Config_wmjf_779.getIns().getSortList();
        for (Struct_wmjf_779 struct_godmb_288 : targetList) {
            int qs = struct_godmb_288.getId() / 100;
            List<Struct_wmjf_779> list = targetConfigMap.get(qs);
            if (list == null) {
                list = new ArrayList<>();
                targetConfigMap.put(qs, list);
            }
            list.add(struct_godmb_288);
        }

        List<Struct_wmsz_779> consumeList = Config_wmsz_779.getIns().getSortList();
        for (Struct_wmsz_779 struct_wmsz_779 : consumeList) {
            int qs = struct_wmsz_779.getId() / 100;
            Map<Integer, Struct_wmsz_779> map = consumeMap.get(qs);
            if (map == null) {
                map = new HashMap<>();
                consumeMap.put(qs, map);
            }
            int[][] item = struct_wmsz_779.getItem();
            int itemId = item[0][1];
            if (itemId == 0) {
                map.put(item[0][0], struct_wmsz_779);
            } else {
                map.put(itemId, struct_wmsz_779);
            }
        }
    }

    @Override
    public void startServer() throws RunServerException {
    }

}
