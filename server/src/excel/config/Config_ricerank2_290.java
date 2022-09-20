package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_ricerank2_290;
public class Config_ricerank2_290 extends ConfigBase<Struct_ricerank2_290> {
    private static Config_ricerank2_290 ins = null;
    public static Config_ricerank2_290 getIns(){
        if(ins==null){
            ins = new Config_ricerank2_290();
        }
        return ins;
    }
    private Config_ricerank2_290(){
        put(1,new Struct_ricerank2_290(1,"[[1,1]]","[[1,410118,20],[4,0,7500],[1,402026,20]]"));
        put(2,new Struct_ricerank2_290(2,"[[2,2]]","[[1,410118,15],[4,0,6000],[1,402026,16]]"));
        put(3,new Struct_ricerank2_290(3,"[[3,3]]","[[1,410118,10],[4,0,4500],[1,402026,16]]"));
        put(4,new Struct_ricerank2_290(4,"[[4,10]]","[[1,410118,5],[4,0,3000],[1,402026,12]]"));
        put(5,new Struct_ricerank2_290(5,"[[11,20]]","[[1,410118,2],[4,0,1500],[1,402026,8]]"));
    }
    public void reset(){
        ins = null;
    }
}