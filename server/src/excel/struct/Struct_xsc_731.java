package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * S_731新首充.xlsx
 */
public class Struct_xsc_731 {
    /**序号*/
    private int index;
    /**商品id*/
    private int id;
    /**职业
	 * 玩家创角时选择的武将职业
	 * 0：首冲界面通用
	 * 1：赵云
	 * 2：诸葛亮
	 * 3：貂蝉
	 * */
    private int zhiye;
    /**奖励*/
    private int[][] jiangli;
    /**监控ID*/
    private int jiankong;
    /**
     * 序号
     */
    public int getIndex() {
        return index;
    }
    /**
     * 商品id
     */
    public int getId() {
        return id;
    }
    /**
     * 职业
	 * 玩家创角时选择的武将职业
	 * 0：首冲界面通用
	 * 1：赵云
	 * 2：诸葛亮
	 * 3：貂蝉
	 * 
     */
    public int getZhiye() {
        return zhiye;
    }
    /**
     * 奖励
     */
    public int[][] getJiangli() {
        return jiangli;
    }
    /**
     * 监控ID
     */
    public int getJiankong() {
        return jiankong;
    }
    public Struct_xsc_731(int index,int id,int zhiye,String jiangli,int jiankong) {
        this.index = index;
        this.id = id;
        this.zhiye = zhiye;
        this.jiangli = ExcelJsonUtils.toObj(jiangli,int[][].class);
        this.jiankong = jiankong;
    }
}