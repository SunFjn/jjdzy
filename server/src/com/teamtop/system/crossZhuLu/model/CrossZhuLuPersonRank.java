package com.teamtop.system.crossZhuLu.model;

import com.teamtop.system.crossCommonRank.model.CommonRankModel;

public class CrossZhuLuPersonRank extends CommonRankModel {
    /**
     * 国家id
     */
    private int countryId;

    public CrossZhuLuPersonRank() {
    }

    public CrossZhuLuPersonRank(long hid, String name, int parameter, int countryId) {
        super(hid, name, parameter);
        this.countryId = countryId;
    }

    public int getCountryId() {
        return countryId;
    }

    public void setCountryId(int countryId) {
        this.countryId = countryId;
    }
}
