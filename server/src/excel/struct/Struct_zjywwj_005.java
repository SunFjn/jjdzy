package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * Z_305_诸将演武武将表.xlsx
 */
public class Struct_zjywwj_005 {
    /**武将序列
	 * 1XXX：常驻武将
	 * 2001：活动专场武将*/
    private int id;
    /**地图*/
    private int map;
    /**武将
	 * [[A,B],[C,D]]
	 * A=武将模型ID1
	 * B=概率1
	 * C=武将模型ID2
	 * D=概率2
	 * 武将模型ID读取【Z_305_诸将演武掉落表.xlsx】；
	 * 场上不可出现相同武将，需要去重处理*/
    private int[][] wj;
    /**服务器开始时间*/
    private String hstart;
    /**服务器结束时间*/
    private String hend;
    /**
     * 武将序列
	 * 1XXX：常驻武将
	 * 2001：活动专场武将
     */
    public int getId() {
        return id;
    }
    /**
     * 地图
     */
    public int getMap() {
        return map;
    }
    /**
     * 武将
	 * [[A,B],[C,D]]
	 * A=武将模型ID1
	 * B=概率1
	 * C=武将模型ID2
	 * D=概率2
	 * 武将模型ID读取【Z_305_诸将演武掉落表.xlsx】；
	 * 场上不可出现相同武将，需要去重处理
     */
    public int[][] getWj() {
        return wj;
    }
    /**
     * 服务器开始时间
     */
    public String getHstart() {
        return hstart;
    }
    /**
     * 服务器结束时间
     */
    public String getHend() {
        return hend;
    }
    public Struct_zjywwj_005(int id,int map,String wj,String hstart,String hend) {
        this.id = id;
        this.map = map;
        this.wj = ExcelJsonUtils.toObj(wj,int[][].class);
        this.hstart = hstart;
        this.hend = hend;
    }
}