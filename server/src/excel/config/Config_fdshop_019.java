package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_fdshop_019;
public class Config_fdshop_019 extends ConfigBase<Struct_fdshop_019> {
    private static Config_fdshop_019 ins = null;
    public static Config_fdshop_019 getIns(){
        if(ins==null){
            ins = new Config_fdshop_019();
        }
        return ins;
    }
    private Config_fdshop_019(){
        put(1001,new Struct_fdshop_019(1001,"[[1,416073,50]]","[[22,0,500]]",17000,10));
        put(1002,new Struct_fdshop_019(1002,"[[1,416074,1]]","[[22,0,1000]]",10000,5));
        put(1003,new Struct_fdshop_019(1003,"[[1,416088,50]]","[[22,0,500]]",17000,10));
        put(1004,new Struct_fdshop_019(1004,"[[1,416075,1]]","[[22,0,40000]]",1000,1));
        put(1005,new Struct_fdshop_019(1005,"[[1,416076,1]]","[[22,0,80000]]",1000,1));
        put(1006,new Struct_fdshop_019(1006,"[[1,410450,50]]","[[22,0,500]]",17000,10));
        put(1007,new Struct_fdshop_019(1007,"[[1,416090,50]]","[[22,0,500]]",17000,10));
        put(1008,new Struct_fdshop_019(1008,"[[1,416087,1]]","[[22,0,20000]]",10000,1));
        put(1009,new Struct_fdshop_019(1009,"[[1,410206,2]]","[[22,0,4000]]",5000,2));
        put(1010,new Struct_fdshop_019(1010,"[[1,410207,5]]","[[22,0,8000]]",5000,2));
    }
    public void reset(){
        ins = null;
    }
}