package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_sgytgrpm_310;
public class Config_sgytgrpm_310 extends ConfigBase<Struct_sgytgrpm_310> {
    private static Config_sgytgrpm_310 ins = null;
    public static Config_sgytgrpm_310 getIns(){
        if(ins==null){
            ins = new Config_sgytgrpm_310();
        }
        return ins;
    }
    private Config_sgytgrpm_310(){
        put(1,new Struct_sgytgrpm_310(1,"[[1,1]]","[[4,0,5000],[1,400899,30]]","[[4,0,5000],[1,400899,30]]"));
        put(2,new Struct_sgytgrpm_310(2,"[[2,2]]","[[4,0,4000],[1,400899,25]]","[[4,0,4000],[1,400899,25]]"));
        put(3,new Struct_sgytgrpm_310(3,"[[3,3]]","[[4,0,4000],[1,400899,20]]","[[4,0,4000],[1,400899,20]]"));
        put(4,new Struct_sgytgrpm_310(4,"[[4,5]]","[[4,0,3000],[1,400899,15]]","[[4,0,3000],[1,400899,15]]"));
        put(5,new Struct_sgytgrpm_310(5,"[[6,10]]","[[4,0,2000],[1,400899,10]]","[[4,0,2000],[1,400899,10]]"));
        put(6,new Struct_sgytgrpm_310(6,"[[11,20]]","0","[[4,0,1000],[1,400899,5]]"));
    }
    public void reset(){
        ins = null;
    }
}