import React from "react";
import { useSelector } from "react-redux";
import Card from "../components/Card";
import { Grid } from "../elements";
import { realtime } from "../shared/firebase";


const Notification = (props) => {
  const user = useSelector(state => state.user.user);
  const [noti, setNoti] = React.useState([]);
  
  React.useEffect(() => {
    if(!user){
      return;
    }

    const notiDB = realtime.ref(`noti/${user.uid}/list`);

    const _noti = notiDB.orderByChild("insert_dt");

    _noti.once("value", snapshot => {
      if(snapshot.exists()){
        let _data = snapshot.val();

        let _noti_list = Object.keys(_data).reverse().map(s => {
          return _data[s];
        })

        console.log(_noti_list);
        setNoti(_noti_list);
      }
    })


  }, [user]);
  
  return (
    <React.Fragment>
      <Grid is_flex center margin="0px auto" padding="16px" bg="#EFF6FF">
        {noti.map((n, idx) => {
          return <Card key={`noti_${idx}`} {...n} />;
        })}
      </Grid>
    </React.Fragment>
  );
};

export default Notification;
