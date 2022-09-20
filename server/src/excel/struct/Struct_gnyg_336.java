package excel.struct;
/**
 * G-336功能预告表.xlsx
 */
public class Struct_gnyg_336 {
    /**id*/
    private int id;
    /**预告内容*/
    private String nr;
    /**背景图
	 * 位于client\sanguo\resource\image\actCom
	 * 0表示没有背景图
	 * */
    private String bg;
    /**服务器开始时间*/
    private String hstart;
    /**服务器结束时间*/
    private String hend;
    /**
     * id
     */
    public int getId() {
        return id;
    }
    /**
     * 预告内容
     */
    public String getNr() {
        return nr;
    }
    /**
     * 背景图
	 * 位于client\sanguo\resource\image\actCom
	 * 0表示没有背景图
	 * 
     */
    public String getBg() {
        return bg;
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
    public Struct_gnyg_336(int id,String nr,String bg,String hstart,String hend) {
        this.id = id;
        this.nr = nr;
        this.bg = bg;
        this.hstart = hstart;
        this.hend = hend;
    }
}