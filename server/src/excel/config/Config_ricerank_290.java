package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_ricerank_290;
public class Config_ricerank_290 extends ConfigBase<Struct_ricerank_290> {
    private static Config_ricerank_290 ins = null;
    public static Config_ricerank_290 getIns(){
        if(ins==null){
            ins = new Config_ricerank_290();
        }
        return ins;
    }
    private Config_ricerank_290(){
        put(1,new Struct_ricerank_290(1,"[[1,1]]","[[10,0,1000],[4,0,4000],[1,402026,40]]"));
        put(2,new Struct_ricerank_290(2,"[[2,2]]","[[10,0,800],[4,0,3000],[1,402026,30]]"));
        put(3,new Struct_ricerank_290(3,"[[3,3]]","[[10,0,500],[4,0,2000],[1,402026,20]]"));
    }
    public void reset(){
        ins = null;
    }
}