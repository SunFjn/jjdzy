package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_sgytgjpm_310;
public class Config_sgytgjpm_310 extends ConfigBase<Struct_sgytgjpm_310> {
    private static Config_sgytgjpm_310 ins = null;
    public static Config_sgytgjpm_310 getIns(){
        if(ins==null){
            ins = new Config_sgytgjpm_310();
        }
        return ins;
    }
    private Config_sgytgjpm_310(){
        put(1,new Struct_sgytgjpm_310(1,1,"[[1,410302,1]]","[[4,0,5000],[1,400899,30]]","[[1,410301,5]]","[[1,410302,1]]","[[4,0,5000],[1,400899,30]]","[[1,410301,7]]"));
        put(2,new Struct_sgytgjpm_310(2,2,"[[1,410303,1]]","[[4,0,4000],[1,400899,25]]","[[1,410301,3]]","[[1,410303,1]]","[[4,0,4000],[1,400899,25]]","[[1,410301,4]]"));
        put(3,new Struct_sgytgjpm_310(3,3,"[[1,410304,1]]","[[4,0,4000],[1,400899,20]]","[[1,410301,2]]","[[1,410304,1]]","[[4,0,4000],[1,400899,20]]","[[1,410301,3]]"));
    }
    public void reset(){
        ins = null;
    }
}