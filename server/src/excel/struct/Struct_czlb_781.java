package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * C_781_超值礼包表.xlsx
 */
public class Struct_czlb_781 {
    /**id*/
    private int id;
    /**礼包类型1=周礼包2=月礼包*/
    private int type;
    /**购买次数上限*/
    private int limit_buy;
    /**期数*/
    private int qs;
    /**购买价格元*/
    private int limit;
    /**礼包标题描述*/
    private String name;
    /**原价描述*/
    private String price;
    /**奖励*/
    private int[][] reward;
    /**关联的充值表id*/
    private int czid;
    /**广播id*/
    private int broadcast;
    /**
     * id
     */
    public int getId() {
        return id;
    }
    /**
     * 礼包类型1=周礼包2=月礼包
     */
    public int getType() {
        return type;
    }
    /**
     * 购买次数上限
     */
    public int getLimit_buy() {
        return limit_buy;
    }
    /**
     * 期数
     */
    public int getQs() {
        return qs;
    }
    /**
     * 购买价格元
     */
    public int getLimit() {
        return limit;
    }
    /**
     * 礼包标题描述
     */
    public String getName() {
        return name;
    }
    /**
     * 原价描述
     */
    public String getPrice() {
        return price;
    }
    /**
     * 奖励
     */
    public int[][] getReward() {
        return reward;
    }
    /**
     * 关联的充值表id
     */
    public int getCzid() {
        return czid;
    }
    /**
     * 广播id
     */
    public int getBroadcast() {
        return broadcast;
    }
    public Struct_czlb_781(int id,int type,int limit_buy,int qs,int limit,String name,String price,String reward,int czid,int broadcast) {
        this.id = id;
        this.type = type;
        this.limit_buy = limit_buy;
        this.qs = qs;
        this.limit = limit;
        this.name = name;
        this.price = price;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
        this.czid = czid;
        this.broadcast = broadcast;
    }
}