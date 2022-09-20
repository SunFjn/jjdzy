package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_shxbrank_268;
public class Config_shxbrank_268 extends ConfigBase<Struct_shxbrank_268> {
    private static Config_shxbrank_268 ins = null;
    public static Config_shxbrank_268 getIns(){
        if(ins==null){
            ins = new Config_shxbrank_268();
        }
        return ins;
    }
    private Config_shxbrank_268(){
        put(1,new Struct_shxbrank_268(1,"[[1,1]]","[[1,410058,2000],[1,400910,50]]","[[1,400916,2]]"));
        put(2,new Struct_shxbrank_268(2,"[[2,2]]","[[1,410058,1500],[1,400910,35]]","[[1,400916,1]]"));
        put(3,new Struct_shxbrank_268(3,"[[3,3]]","[[1,410058,1000],[1,400910,20]]","[[1,400916,1]]"));
        put(4,new Struct_shxbrank_268(4,"[[4,10]]","[[1,410058,500],[1,400910,15]]","[[1,400917,1]]"));
    }
    public void reset(){
        ins = null;
    }
}