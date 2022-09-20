package com.teamtop.system.activity.ativitys.pixiutreasure;

public enum PiXiuTreasureEnum {
    NOT_REACH((byte) 0, "不可领取"),
    CAN_GET((byte) 1, "可领取"),
    GETTED((byte) 2, "已领取"),

    FAILURE_NOT_REACH((byte) 0, "不可领取"),
    SUCCESS((byte) 1, "成功"),
    FAILURE_NOT_REP((byte) 2, "不可重复领取");

    private Byte code;
    private String message;

    PiXiuTreasureEnum(Byte code, String message) {
        this.code = code;
        this.message = message;
    }

    public Byte getCode() {
        return code;
    }

}
