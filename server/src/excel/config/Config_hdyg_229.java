package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_hdyg_229;
public class Config_hdyg_229 extends ConfigBase<Struct_hdyg_229> {
    private static Config_hdyg_229 ins = null;
    public static Config_hdyg_229 getIns(){
        if(ins==null){
            ins = new Config_hdyg_229();
        }
        return ins;
    }
    private Config_hdyg_229(){
        put(2,new Struct_hdyg_229(2,"[1805]","11:31","13:00",1800,"[1,2,3,4,5,6,7]",4001));
        put(3,new Struct_hdyg_229(3,"[1805]","17:31","19:00",1800,"[1,2,3,4,5,6,7]",4002));
        put(4,new Struct_hdyg_229(4,"[3703]","19:31","20:20",1200,"[1,3,5]",6001));
        put(5,new Struct_hdyg_229(5,"[3705]","19:31","20:20",1200,"[2,4,6]",10001));
        put(6,new Struct_hdyg_229(6,"[3603]","19:00","20:20",3000,"[7]",8001));
        put(7,new Struct_hdyg_229(7,"[1603]","20:20","21:20",3000,"[1,2,3,4,5,6]",5001));
        put(8,new Struct_hdyg_229(8,"[1604]","20:20","21:20",3000,"[7]",9001));
        put(9,new Struct_hdyg_229(9,"[1805]","21:20","22:00",1800,"[1,2,3,4,5,6,7]",4003));
        put(10,new Struct_hdyg_229(10,"[6211]","23:31","00:31",60,"[1,2,3,4,5,6,7]",2001));
        put(11,new Struct_hdyg_229(11,"[6212]","23:31","00:31",60,"[1,2,3,4,5,6,7]",3001));
        put(12,new Struct_hdyg_229(12,"[6211]","00:31","02:31",60,"[1,2,3,4,5,6,7]",2002));
        put(13,new Struct_hdyg_229(13,"[6212]","00:31","02:31",60,"[1,2,3,4,5,6,7]",3002));
        put(14,new Struct_hdyg_229(14,"[6211]","02:31","09:31",60,"[1,2,3,4,5,6,7]",2003));
        put(15,new Struct_hdyg_229(15,"[6212]","02:31","09:31",60,"[1,2,3,4,5,6,7]",3003));
        put(18,new Struct_hdyg_229(18,"[6211]","13:00","13:31",60,"[1,2,3,4,5,6,7]",2005));
        put(19,new Struct_hdyg_229(19,"[6212]","13:00","13:31",60,"[1,2,3,4,5,6,7]",3005));
        put(20,new Struct_hdyg_229(20,"[6211]","13:31","15:31",60,"[1,2,3,4,5,6,7]",2006));
        put(21,new Struct_hdyg_229(21,"[6212]","13:31","15:31",60,"[1,2,3,4,5,6,7]",3006));
        put(22,new Struct_hdyg_229(22,"[6211]","15:31","17:31",60,"[1,2,3,4,5,6,7]",2007));
        put(23,new Struct_hdyg_229(23,"[6212]","15:31","17:31",60,"[1,2,3,4,5,6,7]",3007));
        put(24,new Struct_hdyg_229(24,"[6211]","19:00","19:31",60,"[1,2,3,4,5,6,7]",2008));
        put(25,new Struct_hdyg_229(25,"[6212]","19:00","19:31",60,"[1,2,3,4,5,6,7]",3008));
        put(26,new Struct_hdyg_229(26,"[6211]","22:00","23:31",60,"[1,2,3,4,5,6,7]",2010));
        put(27,new Struct_hdyg_229(27,"[6212]","22:00","23:31",60,"[1,2,3,4,5,6,7]",3010));
        put(28,new Struct_hdyg_229(28,"[3707]","19:00","19:50",1200,"[3,6]",10002));
        put(29,new Struct_hdyg_229(29,"[3610]","09:31","12:00",3600,"[1,2,3,4,5,6,7]",7001));
        put(30,new Struct_hdyg_229(30,"[3610]","21:45","23:00",3600,"[1,2,3,4,5,6,7]",7002));
    }
    public void reset(){
        ins = null;
    }
}