package excel.struct;
/**
 * C_716_充值.xlsx
 */
public class Struct_chongzhi_716 {
    /**序号*/
    private int ID;
    /**所需RMB*/
    private int RMB;
    /**所得元宝数*/
    private int COIN;
    /**商品ID*/
    private int shop;
    /**是否重置*/
    private int cz;
    /**
     * 序号
     */
    public int getID() {
        return ID;
    }
    /**
     * 所需RMB
     */
    public int getRMB() {
        return RMB;
    }
    /**
     * 所得元宝数
     */
    public int getCOIN() {
        return COIN;
    }
    /**
     * 商品ID
     */
    public int getShop() {
        return shop;
    }
    /**
     * 是否重置
     */
    public int getCz() {
        return cz;
    }
    public Struct_chongzhi_716(int ID,int RMB,int COIN,int shop,int cz) {
        this.ID = ID;
        this.RMB = RMB;
        this.COIN = COIN;
        this.shop = shop;
        this.cz = cz;
    }
}