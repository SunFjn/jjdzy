package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_nzbzpoint_226;
public class Config_nzbzpoint_226 extends ConfigBase<Struct_nzbzpoint_226> {
    private static Config_nzbzpoint_226 ins = null;
    public static Config_nzbzpoint_226 getIns(){
        if(ins==null){
            ins = new Config_nzbzpoint_226();
        }
        return ins;
    }
    private Config_nzbzpoint_226(){
        put(10,new Struct_nzbzpoint_226(10,"[[1,400057,10],[4,0,750]]"));
        put(50,new Struct_nzbzpoint_226(50,"[[1,400057,10],[4,0,1500]]"));
        put(100,new Struct_nzbzpoint_226(100,"[[1,400057,10],[4,0,1500]]"));
        put(200,new Struct_nzbzpoint_226(200,"[[1,400057,20],[4,0,2250]]"));
        put(500,new Struct_nzbzpoint_226(500,"[[1,400057,20],[4,0,2250]]"));
        put(700,new Struct_nzbzpoint_226(700,"[[1,400057,30],[4,0,2750]]"));
        put(1000,new Struct_nzbzpoint_226(1000,"[[1,400057,30],[4,0,2750]]"));
        put(1300,new Struct_nzbzpoint_226(1300,"[[1,400057,40],[4,0,3500]]"));
        put(1750,new Struct_nzbzpoint_226(1750,"[[1,400057,40],[4,0,3500]]"));
        put(2000,new Struct_nzbzpoint_226(2000,"[[1,400057,40],[4,0,3500]]"));
        put(2500,new Struct_nzbzpoint_226(2500,"[[1,400057,40],[4,0,3500]]"));
        put(3500,new Struct_nzbzpoint_226(3500,"[[1,400057,40],[4,0,3750]]"));
        put(4000,new Struct_nzbzpoint_226(4000,"[[1,400057,40],[4,0,3750]]"));
        put(4500,new Struct_nzbzpoint_226(4500,"[[1,400057,40],[4,0,4000]]"));
        put(5000,new Struct_nzbzpoint_226(5000,"[[1,400057,40],[4,0,4000]]"));
    }
    public void reset(){
        ins = null;
    }
}