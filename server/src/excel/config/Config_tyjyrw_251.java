package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_tyjyrw_251;
public class Config_tyjyrw_251 extends ConfigBase<Struct_tyjyrw_251> {
    private static Config_tyjyrw_251 ins = null;
    public static Config_tyjyrw_251 getIns(){
        if(ins==null){
            ins = new Config_tyjyrw_251();
        }
        return ins;
    }
    private Config_tyjyrw_251(){
        put(1,new Struct_tyjyrw_251(1,1,"[[1,410003,5]]","[[1,410003,10]]","[[1,410003,20]]"));
        put(2,new Struct_tyjyrw_251(2,10,"[[1,400175,5]]","[[1,400175,8]]","[[1,400175,15]]"));
        put(3,new Struct_tyjyrw_251(3,5,"[[1,400175,5]]","[[1,400175,8]]","[[1,400175,15]]"));
        put(4,new Struct_tyjyrw_251(4,125000,"[[1,402030,1]]","[[1,402030,1]]","[[1,402030,2]]"));
        put(5,new Struct_tyjyrw_251(5,12,"[[10,0,25]]","[[10,0,60]]","[[10,0,150]]"));
        put(6,new Struct_tyjyrw_251(6,12,"[[1,411006,5]]","[[1,411006,8]]","[[1,411006,15]]"));
        put(7,new Struct_tyjyrw_251(7,1,"[[4,0,1000]]","[[4,0,1750]]","[[4,0,3000]]"));
    }
    public void reset(){
        ins = null;
    }
}