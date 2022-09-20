package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * Z_315_专属活动表.xlsx
 */
public class Struct_zshdb_315 {
    /**ID
	 * 1XXX：微端1
	 * 2XXX：微端2*/
    private int id;
    /**微端ID*/
    private String wdid;
    /**服务器区间*/
    private int[][] fwq;
    /**vip区间*/
    private int[][] vip;
    /**大活动类型
	 * 大活动的ID：
	 * 对应系统开启表
	 * 
	 * 4501 精彩活动
	 * 4601 超值返利
	 * 4701 全民狂欢
	 * 7101 专属活动*/
    private int type;
    /**活动ID*/
    private int hdid;
    /**期数
	 * 根据期数读对应专属活动的配置表
	 * */
    private int qs;
    /**活动名称*/
    private String name;
    /**活动内容
	 * 产品维护
	 * */
    private String nr;
    /**服务器开始时间
	 * 产品填写
	 * */
    private String hstart;
    /**服务器结束时间
	 * 产品填写*/
    private String hend;
    /**
     * ID
	 * 1XXX：微端1
	 * 2XXX：微端2
     */
    public int getId() {
        return id;
    }
    /**
     * 微端ID
     */
    public String getWdid() {
        return wdid;
    }
    /**
     * 服务器区间
     */
    public int[][] getFwq() {
        return fwq;
    }
    /**
     * vip区间
     */
    public int[][] getVip() {
        return vip;
    }
    /**
     * 大活动类型
	 * 大活动的ID：
	 * 对应系统开启表
	 * 
	 * 4501 精彩活动
	 * 4601 超值返利
	 * 4701 全民狂欢
	 * 7101 专属活动
     */
    public int getType() {
        return type;
    }
    /**
     * 活动ID
     */
    public int getHdid() {
        return hdid;
    }
    /**
     * 期数
	 * 根据期数读对应专属活动的配置表
	 * 
     */
    public int getQs() {
        return qs;
    }
    /**
     * 活动名称
     */
    public String getName() {
        return name;
    }
    /**
     * 活动内容
	 * 产品维护
	 * 
     */
    public String getNr() {
        return nr;
    }
    /**
     * 服务器开始时间
	 * 产品填写
	 * 
     */
    public String getHstart() {
        return hstart;
    }
    /**
     * 服务器结束时间
	 * 产品填写
     */
    public String getHend() {
        return hend;
    }
    public Struct_zshdb_315(int id,String wdid,String fwq,String vip,int type,int hdid,int qs,String name,String nr,String hstart,String hend) {
        this.id = id;
        this.wdid = wdid;
        this.fwq = ExcelJsonUtils.toObj(fwq,int[][].class);
        this.vip = ExcelJsonUtils.toObj(vip,int[][].class);
        this.type = type;
        this.hdid = hdid;
        this.qs = qs;
        this.name = name;
        this.nr = nr;
        this.hstart = hstart;
        this.hend = hend;
    }
}