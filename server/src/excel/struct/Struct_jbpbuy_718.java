package excel.struct;
/**
 * J_718_聚宝盆消耗.xlsx
 */
public class Struct_jbpbuy_718 {
    /**类型
	 * 1登录返利
	 * 2闯关返利
	 * 3等级返利
	 * 4成长返利*/
    private int TYPE;
    /**元宝*/
    private int COIN;
    /**VIP等级*/
    private int VIP;
    /**充值id*/
    private int cz;
    /**人民币*/
    private int rmb;
    /**
     * 类型
	 * 1登录返利
	 * 2闯关返利
	 * 3等级返利
	 * 4成长返利
     */
    public int getTYPE() {
        return TYPE;
    }
    /**
     * 元宝
     */
    public int getCOIN() {
        return COIN;
    }
    /**
     * VIP等级
     */
    public int getVIP() {
        return VIP;
    }
    /**
     * 充值id
     */
    public int getCz() {
        return cz;
    }
    /**
     * 人民币
     */
    public int getRmb() {
        return rmb;
    }
    public Struct_jbpbuy_718(int TYPE,int COIN,int VIP,int cz,int rmb) {
        this.TYPE = TYPE;
        this.COIN = COIN;
        this.VIP = VIP;
        this.cz = cz;
        this.rmb = rmb;
    }
}