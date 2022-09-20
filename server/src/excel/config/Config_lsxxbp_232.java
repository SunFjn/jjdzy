package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_lsxxbp_232;
public class Config_lsxxbp_232 extends ConfigBase<Struct_lsxxbp_232> {
    private static Config_lsxxbp_232 ins = null;
    public static Config_lsxxbp_232 getIns(){
        if(ins==null){
            ins = new Config_lsxxbp_232();
        }
        return ins;
    }
    private Config_lsxxbp_232(){
        put(1,new Struct_lsxxbp_232(1,2,"[[1,410018,15],[9,0,4000]]"));
        put(2,new Struct_lsxxbp_232(2,4,"[[1,410018,15],[9,0,4000]]"));
        put(3,new Struct_lsxxbp_232(3,8,"[[1,410018,30],[9,0,6000]]"));
        put(4,new Struct_lsxxbp_232(4,12,"[[1,410018,35],[9,0,8000]]"));
        put(5,new Struct_lsxxbp_232(5,16,"[[1,410018,45],[9,0,10000]]"));
        put(6,new Struct_lsxxbp_232(6,20,"[[1,410018,50],[9,0,12000]]"));
        put(7,new Struct_lsxxbp_232(7,28,"[[1,410018,60],[9,0,14000]]"));
        put(8,new Struct_lsxxbp_232(8,36,"[[1,410018,75],[9,0,18000]]"));
        put(9,new Struct_lsxxbp_232(9,48,"[[1,410018,90],[9,0,20000]]"));
        put(10,new Struct_lsxxbp_232(10,60,"[[1,410018,120],[9,0,28000]]"));
    }
    public void reset(){
        ins = null;
    }
}