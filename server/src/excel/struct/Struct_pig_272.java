package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * S_272_少主活动金猪送财表.xlsx
 */
public class Struct_pig_272 {
    /**id*/
    private int id;
    /**充值商品id*/
    private int shop;
    /**存入基础元宝*/
    private int[][] cun;
    /**立返元宝*/
    private int[][] reward;
    /**
     * id
     */
    public int getId() {
        return id;
    }
    /**
     * 充值商品id
     */
    public int getShop() {
        return shop;
    }
    /**
     * 存入基础元宝
     */
    public int[][] getCun() {
        return cun;
    }
    /**
     * 立返元宝
     */
    public int[][] getReward() {
        return reward;
    }
    public Struct_pig_272(int id,int shop,String cun,String reward) {
        this.id = id;
        this.shop = shop;
        this.cun = ExcelJsonUtils.toObj(cun,int[][].class);
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
    }
}