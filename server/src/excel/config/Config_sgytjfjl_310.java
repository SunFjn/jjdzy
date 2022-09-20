package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_sgytjfjl_310;
public class Config_sgytjfjl_310 extends ConfigBase<Struct_sgytjfjl_310> {
    private static Config_sgytjfjl_310 ins = null;
    public static Config_sgytjfjl_310 getIns(){
        if(ins==null){
            ins = new Config_sgytjfjl_310();
        }
        return ins;
    }
    private Config_sgytjfjl_310(){
        put(1,new Struct_sgytjfjl_310(1,20,"[[4,0,250],[1,410002,2]]","[[4,0,250],[1,410002,2]]"));
        put(2,new Struct_sgytjfjl_310(2,40,"[[4,0,250],[1,410002,2]]","[[4,0,250],[1,410002,2]]"));
        put(3,new Struct_sgytjfjl_310(3,80,"[[4,0,250],[1,410002,2]]","[[4,0,250],[1,410002,2]]"));
        put(4,new Struct_sgytjfjl_310(4,120,"[[4,0,250],[1,410002,4]]","[[4,0,250],[1,410002,4]]"));
        put(5,new Struct_sgytjfjl_310(5,150,"[[4,0,250],[1,410002,4]]","[[4,0,250],[1,410002,4]]"));
        put(6,new Struct_sgytjfjl_310(6,200,"[[4,0,250],[1,410002,4]]","[[4,0,250],[1,410002,4]]"));
        put(7,new Struct_sgytjfjl_310(7,350,"[[4,0,500],[1,410002,6]]","[[4,0,500],[1,410002,6]]"));
        put(8,new Struct_sgytjfjl_310(8,500,"[[4,0,500],[1,410002,6]]","[[4,0,500],[1,410002,6]]"));
        put(9,new Struct_sgytjfjl_310(9,650,"[[4,0,500],[1,410002,6]]","[[4,0,500],[1,410002,6]]"));
        put(10,new Struct_sgytjfjl_310(10,800,"[[4,0,500],[1,410002,8]]","[[4,0,500],[1,410002,8]]"));
        put(11,new Struct_sgytjfjl_310(11,1000,"[[4,0,500],[1,410002,8]]","[[4,0,500],[1,410002,8]]"));
        put(12,new Struct_sgytjfjl_310(12,1200,"[[4,0,500],[1,410002,8]]","[[4,0,500],[1,410002,8]]"));
        put(13,new Struct_sgytjfjl_310(13,1500,"[[4,0,1000],[1,410002,11]]","[[4,0,1000],[1,410002,11]]"));
        put(14,new Struct_sgytjfjl_310(14,2000,"[[4,0,1000],[1,410002,11]]","[[4,0,1000],[1,410002,11]]"));
        put(15,new Struct_sgytjfjl_310(15,2500,"[[4,0,1750],[1,410002,12]]","[[4,0,1750],[1,410002,12]]"));
        put(16,new Struct_sgytjfjl_310(16,3000,"[[4,0,1750],[1,410002,15]]","[[4,0,1750],[1,410002,15]]"));
        put(17,new Struct_sgytjfjl_310(17,3500,"[[4,0,2250],[1,410002,17]]","[[4,0,2250],[1,410002,17]]"));
        put(18,new Struct_sgytjfjl_310(18,4000,"[[4,0,2750],[1,410002,21]]","[[4,0,2750],[1,410002,21]]"));
        put(19,new Struct_sgytjfjl_310(19,4500,"0","[[4,0,2750],[1,410002,21]]"));
        put(20,new Struct_sgytjfjl_310(20,5000,"0","[[4,0,2750],[1,410002,21]]"));
    }
    public void reset(){
        ins = null;
    }
}