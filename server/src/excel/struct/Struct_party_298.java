package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * Y_298_宴会表.xlsx
 */
public class Struct_party_298 {
    /**宴会id*/
    private int id;
    /**开启元宝消耗*/
    private int[][] consume;
    /**需要VIP等级*/
    private int vip;
    /**容纳人数*/
    private int num;
    /**
     * 宴会id
     */
    public int getId() {
        return id;
    }
    /**
     * 开启元宝消耗
     */
    public int[][] getConsume() {
        return consume;
    }
    /**
     * 需要VIP等级
     */
    public int getVip() {
        return vip;
    }
    /**
     * 容纳人数
     */
    public int getNum() {
        return num;
    }
    public Struct_party_298(int id,String consume,int vip,int num) {
        this.id = id;
        this.consume = ExcelJsonUtils.toObj(consume,int[][].class);
        this.vip = vip;
        this.num = num;
    }
}