package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * H_245_合成表.xlsx
 */
public class Struct_compose_245 {
    /**道具id*/
    private int id;
    /**合成所需道具*/
    private int[][] item;
    /**vip等级限制*/
    private int vip;
    /**
     * 道具id
     */
    public int getId() {
        return id;
    }
    /**
     * 合成所需道具
     */
    public int[][] getItem() {
        return item;
    }
    /**
     * vip等级限制
     */
    public int getVip() {
        return vip;
    }
    public Struct_compose_245(int id,String item,int vip) {
        this.id = id;
        this.item = ExcelJsonUtils.toObj(item,int[][].class);
        this.vip = vip;
    }
}